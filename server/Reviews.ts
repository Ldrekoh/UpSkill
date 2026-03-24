"use server";

import { db } from "@/db/drizzle";
import { reviews, bookings, user } from "@/db/schema";
import { eq, avg, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./Users";

/**
 * Créer une nouvelle review et mettre à jour le score du mentor
 */
export const createReview = async ({
  bookingId,
  rating,
  comment,
}: {
  bookingId: string;
  rating: number;
  comment?: string;
}) => {
  try {
    // 0. Vérifier l'utilisateur connecté
    const { currentUser } = await getCurrentUser();
    if (!currentUser) return { success: false, message: "Non autorisé" };

    // 1. Trouver le booking pour identifier le mentor
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
    });

    if (!booking) return { success: false, message: "Booking introuvable" };

    const mentorId = booking.mentorId;

    // 2. Lancer une transaction pour tout faire d'un coup
    return await db.transaction(async (tx) => {
      // A. Insérer le nouvel avis
      await tx.insert(reviews).values({
        bookingId,
        rating,
        comment,
        mentorId,
        reviewerId: booking.learnerId,
      });

      // B. Calculer la nouvelle moyenne de TOUTES les reviews du mentor
      // On utilise 'avg' de drizzle-orm
      const result = await tx
        .select({
          newAverage: avg(reviews.rating),
        })
        .from(reviews)
        .where(eq(reviews.mentorId, mentorId));

      const newScore = result[0].newAverage || "0.00";

      // C. Mettre à jour la colonne 'reputationScore' de l'utilisateur
      await tx
        .update(user)
        .set({
          reputationScore: newScore.toString(), // On cast en string pour le type decimal
        })
        .where(eq(user.id, mentorId));

      revalidatePath(`/mentor/${mentorId}`);
      return { success: true, message: "Note mise à jour !" };
    });
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de la notation" };
  }
};
/**
 * Récupérer toutes les reviews d'un mentor
 */
export const getReviewsByMentor = async (mentorId: string) => {
  try {
    const data = await db.query.reviews.findMany({
      where: eq(reviews.mentorId, mentorId),
      with: {
        reviewer: true,
        booking: {
          with: { skill: true },
        },
      },
      orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
    });
    return data;
  } catch (error) {
    console.error("Error fetching mentor reviews:", error);
    return [];
  }
};

/**
 * Récupérer les reviews pour un skill spécifique (via les bookings)
 */
export const getReviewsBySkill = async (skillId: string) => {
  try {
    // On cherche les reviews dont le booking est lié à ce skillId
    const data = await db.query.reviews.findMany({
      with: {
        reviewer: true,
        booking: true,
      },
      // Filtrage via la relation booking
      where: sql`${reviews.bookingId} IN (SELECT id FROM ${bookings} WHERE skill_id = ${skillId})`,
      orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
    });
    return data;
  } catch (error) {
    console.error("Error fetching skill reviews:", error);
    return [];
  }
};
