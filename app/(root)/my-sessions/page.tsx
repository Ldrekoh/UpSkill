import { getMyBookings } from "@/server/Bookings";
import Image from "next/image";
import { BookOpen, Calendar, Clock, CheckCircle2 } from "@/components/ui/Icons";

import { CompleteBookingButton } from "@/components/bookings/CompleteBookingButton";
import { ConfirmBookingButton } from "@/components/bookings/ConfirmBookingButton";
import { CancelBookingButton } from "@/components/bookings/CancelBookingButton";
import { ClaimTokensButton } from "@/components/bookings/ClaimTokensButton";

export default async function MySessionsPage() {
  const { success, learning, teaching, message } = await getMyBookings();

  if (!success) {
    return (
      <div className="p-10 text-center bg-error/10 rounded-[2rem] border border-error/20">
        <p className="text-error font-black uppercase tracking-widest text-xs">
          Error: {message}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-10 px-4">
      <div className="space-y-2">
        <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter leading-none">
          MY <span className="text-primary">SESSIONS.</span>
        </h1>
        <p className="text-on-surface-variant font-medium tracking-tight">
          Gérez vos échanges de compétences et vos transferts de tokens.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* --- SECTION LEARNING (En tant qu'élève) --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-outline flex items-center gap-2">
              <BookOpen size={14} className="text-primary" /> Learning
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container-high text-outline">
              {learning.length} Sessions
            </span>
          </div>

          <div className="grid gap-4">
            {learning.length > 0 ? (
              learning.map((b) => (
                <BookingCard key={b.id} booking={b} role="student" />
              ))
            ) : (
              <EmptyState message="You haven't booked any skills yet." />
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-outline flex items-center gap-2">
              <Calendar size={14} className="text-primary" /> Teaching
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container-high text-outline">
              {teaching.length} Sessions
            </span>
          </div>

          <div className="grid gap-4">
            {teaching.length > 0 ? (
              teaching.map((b) => (
                <BookingCard key={b.id} booking={b} role="mentor" />
              ))
            ) : (
              <EmptyState message="No one has booked your skills yet." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- CARD COMPONENT ---
function BookingCard({
  booking,
  role,
}: {
  booking: any;
  role: "student" | "mentor";
}) {
  const person = role === "student" ? booking.skill.mentor : booking.learner;

  const isScheduled = booking.status === "scheduled";
  const isConfirmed = booking.status === "confirmed";
  const isCompleted = booking.status === "completed";

  return (
    <div className="p-6 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
            isCompleted
              ? "bg-emerald-500/10 text-emerald-500"
              : isConfirmed
                ? "bg-primary/10 text-primary"
                : "bg-on-surface text-surface"
          }`}
        >
          {isCompleted ? <CheckCircle2 size={12} /> : <Clock size={12} />}
          {booking.status}
        </div>
        <span className="text-primary font-bold">
          {booking.tokenAmount} Tokens
        </span>
      </div>

      <h3 className="text-xl font-headline font-black italic uppercase leading-tight">
        {booking.skill.title}
      </h3>

      {role === "mentor" && isConfirmed && (
        <div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center gap-2">
          <p className="text-[9px] font-bold text-outline text-center leading-tight">
            L&apos;élève doit valider pour libérer les tokens. <br />
            Si la session est finie et qu&apos;il oublie :
          </p>
          <ClaimTokensButton bookingId={booking.id} />
        </div>
      )}
      {role === "mentor" && isScheduled && (
        <ConfirmBookingButton bookingId={booking.id} />
      )}

      {role === "student" && isConfirmed && (
        <CompleteBookingButton bookingId={booking.id} />
      )}

      {role === "student" && isScheduled && (
        <p className="text-[10px] text-center text-outline font-bold uppercase italic mt-2">
          Waiting for mentor confirmation...
        </p>
      )}

      {role === "mentor" && isConfirmed && (
        <p className="text-[10px] text-center text-emerald-500/70 font-bold uppercase italic mt-2">
          Session accepted. Waiting for student to finish...
        </p>
      )}

      {role === "student" && isScheduled && (
        <CancelBookingButton bookingId={booking.id} />
      )}

      <div className="flex items-center gap-3 mt-2 border-t border-outline-variant/5 pt-4">
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-outline-variant/20">
          <Image
            src={person?.image || "/avatar.png"}
            alt="User"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-xs font-bold">
          {role === "student" ? "Mentor" : "Student"}:{" "}
          <span className="text-on-surface">{person?.name}</span>
        </p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-12 px-6 rounded-4xl border-2 border-dashed border-outline-variant/10 flex flex-col items-center justify-center text-center space-y-2">
      <Clock size={32} className="text-outline/20" />
      <p className="text-sm font-medium text-outline italic">{message}</p>
    </div>
  );
}
