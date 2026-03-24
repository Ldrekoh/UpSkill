// components/bookings/CancelBookingButton.tsx
"use client";

import { useTransition } from "react";
import { cancelBooking } from "@/server/Bookings";
import { XCircle, Loader2 } from "@/components/ui/Icons";
import { toast } from "sonner";

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault(); // Important pour ne pas déclencher le Link parent
    if (
      !confirm(
        "Voulez-vous annuler cette réservation ? Vous serez remboursé intégralement.",
      )
    )
      return;

    startTransition(async () => {
      const res = await cancelBooking(bookingId);
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    });
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isPending}
      className=" flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-outline hover:text-red-500 transition-colors disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        <XCircle size={24} />
      )}
      Cancel & Refund
    </button>
  );
}
