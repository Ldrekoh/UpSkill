"use server";

import { db } from "@/db/drizzle";
import { bookings, skills, transactions, user, reviews } from "@/db/schema";
import { and, eq, not, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/server/Users";

// ─── bookSkill ────────────────────────────────────────────────────────────────
//
// Flux escrow :
//   1. Validations (auth, ownership, solde, skill actif, pas de doublon actif)
//   2. Transaction atomique :
//      a. Débite l'apprenant
//      b. Crée le booking "scheduled"
//      c. Log dans transactions

export const bookSkill = async (skillId: string) => {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      message: "You must be logged in to book a session.",
    };
  }

  const skill = await db.query.skills.findFirst({
    where: eq(skills.id, skillId),
    with: { mentor: true },
  });

  if (!skill) return { success: false, message: "Skill not found." };
  if (!skill.isActive)
    return { success: false, message: "This skill is no longer available." };

  if (skill.mentorId === currentUser.id) {
    return { success: false, message: "You cannot book your own skill." };
  }

  const balance = currentUser.tokenBalance ?? 0;
  if (balance < skill.tokenCost) {
    return {
      success: false,
      message: `Insufficient tokens. You have ${balance}, this session costs ${skill.tokenCost}.`,
    };
  }

  const existingBooking = await db.query.bookings.findFirst({
    where: and(
      eq(bookings.skillId, skillId),
      eq(bookings.learnerId, currentUser.id),
    ),
  });

  if (
    existingBooking &&
    ["scheduled", "confirmed"].includes(existingBooking.status)
  ) {
    return {
      success: false,
      message: "You already have an active booking for this skill.",
    };
  }

  try {
    const newBooking = await db.transaction(async (tx) => {
      // a. Débite l'apprenant
      await tx
        .update(user)
        .set({ tokenBalance: balance - skill.tokenCost })
        .where(eq(user.id, currentUser.id));

      // b. Crée le booking avec mentorId dénormalisé
      const [booking] = await tx
        .insert(bookings)
        .values({
          skillId,
          learnerId: currentUser.id,
          mentorId: skill.mentorId,
          tokenAmount: skill.tokenCost,
          status: "scheduled",
        })
        .returning();

      // c. Log débit
      await tx.insert(transactions).values({
        userId: currentUser.id,
        amount: -skill.tokenCost,
        type: "booking_debit",
        bookingId: booking.id,
        description: `Booked: ${skill.title}`,
      });

      return booking;
    });

    revalidatePath(`/skills/${skillId}`);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/bookings");

    return {
      success: true,
      message: "Session booked! The mentor will confirm shortly.",
      booking: newBooking,
    };
  } catch (error) {
    console.error("Error booking skill:", error);
    return { success: false, message: "Booking failed. Please try again." };
  }
};

// ─── confirmBooking ───────────────────────────────────────────────────────────
// Mentor uniquement — scheduled → confirmed

export const confirmBooking = async (bookingId: string) => {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) return { success: false, message: "Unauthorized." };

  const booking = await db.query.bookings.findFirst({
    where: and(
      eq(bookings.id, bookingId),
      eq(bookings.mentorId, currentUser.id),
    ),
  });

  if (!booking) return { success: false, message: "Booking not found." };
  if (booking.status !== "scheduled") {
    return { success: false, message: "This booking is no longer pending." };
  }

  await db
    .update(bookings)
    .set({ status: "confirmed" })
    .where(eq(bookings.id, bookingId));

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/bookings");

  return { success: true, message: "Session confirmed!" };
};

// ─── completeBooking ──────────────────────────────────────────────────────────
// Apprenant uniquement — confirmed → completed
// C'est ici que les tokens sont versés au mentor (escrow libéré)

export const completeBooking = async (bookingId: string) => {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) return { success: false, message: "Unauthorized." };

  const booking = await db.query.bookings.findFirst({
    where: and(
      eq(bookings.id, bookingId),
      eq(bookings.learnerId, currentUser.id),
    ),
    with: { mentor: true },
  });

  if (!booking) return { success: false, message: "Booking not found." };
  if (booking.status === "completed")
    return { success: false, message: "Already completed." };
  if (booking.status === "cancelled")
    return { success: false, message: "Session was cancelled." };
  if (booking.status !== "confirmed") {
    return {
      success: false,
      message: "The mentor must confirm the session first.",
    };
  }

  const mentorBalance = booking.mentor.tokenBalance ?? 0;

  try {
    await db.transaction(async (tx) => {
      // a. Crédite le mentor + incrémente ses sessions
      await tx
        .update(user)
        .set({
          tokenBalance: sql`${mentorBalance + booking.tokenAmount}`,
          totalSessions: sql`${user.totalSessions ?? 0 + 1}`,
        })
        .where(eq(user.id, booking.mentorId));

      // b. Incrémente les sessions de l'apprenant
      await tx
        .update(user)
        .set({ totalSessions: (currentUser.totalSessions ?? 0) + 1 })
        .where(eq(user.id, currentUser.id));

      // c. Marque completed
      await tx
        .update(bookings)
        .set({ status: "completed", completedAt: new Date() })
        .where(eq(bookings.id, bookingId));

      // d. Log crédit mentor
      await tx.insert(transactions).values({
        userId: booking.mentorId,
        amount: booking.tokenAmount,
        type: "booking_credit",
        bookingId: booking.id,
        description: `Session completed — ${booking.tokenAmount} tokens received`,
      });
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/bookings");

    return {
      success: true,
      message: `Session completed! ${booking.tokenAmount} token${booking.tokenAmount > 1 ? "s" : ""} sent to the mentor.`,
    };
  } catch (error) {
    console.error("Error completing booking:", error);
    return { success: false, message: "Failed to complete session." };
  }
};

// ─── cancelBooking ────────────────────────────────────────────────────────────
// Apprenant uniquement — annulation possible seulement si "scheduled"
// Remboursement intégral + log

export const cancelBooking = async (bookingId: string) => {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) return { success: false, message: "Unauthorized." };

  const booking = await db.query.bookings.findFirst({
    where: and(
      eq(bookings.id, bookingId),
      eq(bookings.learnerId, currentUser.id),
    ),
  });

  if (!booking) return { success: false, message: "Booking not found." };
  if (booking.status !== "scheduled") {
    return {
      success: false,
      message:
        "Only unconfirmed bookings can be cancelled. Contact support for confirmed sessions.",
    };
  }

  const balance = currentUser.tokenBalance ?? 0;

  try {
    await db.transaction(async (tx) => {
      // a. Rembourse l'apprenant
      await tx
        .update(user)
        .set({ tokenBalance: balance + booking.tokenAmount })
        .where(eq(user.id, currentUser.id));

      // b. Marque cancelled
      await tx
        .update(bookings)
        .set({ status: "cancelled" })
        .where(eq(bookings.id, bookingId));

      // c. Log remboursement
      await tx.insert(transactions).values({
        userId: currentUser.id,
        amount: booking.tokenAmount,
        type: "booking_refund",
        bookingId: booking.id,
        description: "Booking cancelled — tokens refunded",
      });
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/bookings");

    return {
      success: true,
      message: `Booking cancelled. ${booking.tokenAmount} token${booking.tokenAmount > 1 ? "s" : ""} refunded.`,
    };
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return { success: false, message: "Cancellation failed." };
  }
};

// ─── submitReview ─────────────────────────────────────────────────────────────
// Apprenant uniquement, après completion. 1 review max par booking (contrainte DB unique)

export const submitReview = async (
  bookingId: string,
  rating: number,
  comment?: string,
) => {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) return { success: false, message: "Unauthorized." };

  if (rating < 1 || rating > 5) {
    return { success: false, message: "Rating must be between 1 and 5." };
  }

  const booking = await db.query.bookings.findFirst({
    where: and(
      eq(bookings.id, bookingId),
      eq(bookings.learnerId, currentUser.id),
      eq(bookings.status, "completed"),
    ),
  });

  if (!booking) {
    return {
      success: false,
      message: "Booking not found or session not yet completed.",
    };
  }

  try {
    await db.insert(reviews).values({
      bookingId,
      reviewerId: currentUser.id,
      mentorId: booking.mentorId,
      rating,
      comment,
    });

    revalidatePath(`/skills/${booking.skillId}`);

    return { success: true, message: "Review submitted. Thank you!" };
  } catch (error) {
    // Violation contrainte unique = review déjà soumise
    console.error("Error submitting review:", error);
    return {
      success: false,
      message: "You have already reviewed this session.",
    };
  }
};

export const hasUserBookedSkill = async (userId: string, skillId: string) => {
  const booking = await db.query.bookings.findFirst({
    where: and(
      eq(bookings.learnerId, userId),
      eq(bookings.skillId, skillId),
      not(eq(bookings.status, "cancelled")),
    ),
  });
  return !!booking;
};

export const getMyBookings = async () => {
  const { currentUser } = await getCurrentUser();
  const userId = currentUser?.id;

  if (!userId) {
    return {
      success: false,
      message: "User not authenticated",
      learning: [],
      teaching: [],
    };
  }
  try {
    // 1. Bookings en tant qu'élève (Learning)
    const learning = await db.query.bookings.findMany({
      where: eq(bookings.learnerId, userId),
      with: {
        skill: { with: { mentor: true } },
      },
      orderBy: (bookings, { desc }) => [desc(bookings.createdAt)],
    });

    // 2. Bookings en tant que mentor (Teaching)
    const teaching = await db.query.bookings.findMany({
      where: eq(bookings.mentorId, userId),
      with: {
        skill: true,
        learner: true,
      },
      orderBy: (bookings, { desc }) => [desc(bookings.createdAt)],
    });

    return { success: true, learning, teaching, userId };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message,
      learning: [],
      teaching: [],
    };
  }
};

export const autoReleaseTokens = async (bookingId: string) => {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) return { success: false, message: "Unauthorized." };

  const booking = await db.query.bookings.findFirst({
    where: and(
      eq(bookings.id, bookingId),
      eq(bookings.mentorId, currentUser.id), // Seul le mentor peut trigger l'auto-release
      eq(bookings.status, "confirmed"),
    ),
    with: { mentor: true },
  });

  if (!booking)
    return { success: false, message: "Booking not found or not eligible." };

  // VERIFICATION DU DELAI (Ex: 48h après la confirmation)
  // Note: Idéalement, compare avec la date du cours. Ici on utilise createdAt + 2 jours par défaut.
  const now = new Date();
  const waitPeriod = 48 * 60 * 60 * 1000; // 48 heures en ms
  const eligibleDate = new Date(booking.createdAt.getTime() + waitPeriod);

  if (now < eligibleDate) {
    return {
      success: false,
      message: "You must wait 48h after the booking before claiming tokens.",
    };
  }

  // REUTILISATION DE TA LOGIQUE DE COMPLETION
  try {
    await db.transaction(async (tx) => {
      // 1. Créditer le mentor
      await tx
        .update(user)
        .set({
          tokenBalance: sql`${user.tokenBalance} + ${booking.tokenAmount}`,
          totalSessions: sql`${user.totalSessions} + 1`,
        })
        .where(eq(user.id, booking.mentorId));

      // 2. Incrémenter sessions élève
      await tx
        .update(user)
        .set({ totalSessions: sql`${user.totalSessions} + 1` })
        .where(eq(user.id, booking.learnerId));

      // 3. Statut Completed
      await tx
        .update(bookings)
        .set({ status: "completed", completedAt: new Date() })
        .where(eq(bookings.id, bookingId));

      // 4. Log Transaction
      await tx.insert(transactions).values({
        userId: booking.mentorId,
        amount: booking.tokenAmount,
        type: "booking_credit",
        bookingId: booking.id,
        description: `Auto-release: Session completed (48h delay passed)`,
      });
    });

    revalidatePath("/dashboard/bookings");
    return { success: true, message: "Tokens released successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to release tokens." };
  }
};
