// components/bookings/ConfirmBookingButton.tsx
"use client";

import { useTransition } from "react";
import { confirmBooking } from "@/server/Bookings";
import { Check, Loader2 } from "@/components/ui/Icons";
import { toast } from "sonner";

export function ConfirmBookingButton({ bookingId }: { bookingId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await confirmBooking(bookingId);
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    });
  };

  return (
    <button
      onClick={handleConfirm}
      disabled={isPending}
      className="w-full mt-4 h-12 rounded-2xl bg-primary hover:bg-primary/90 text-on-primary font-black italic transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <Check size={18} />
      )}
      {isPending ? "Confirming..." : "Accept Workshop"}
    </button>
  );
}
