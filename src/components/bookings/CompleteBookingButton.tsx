// components/bookings/CompleteBookingButton.tsx
"use client";

import { useState } from "react";
import { completeBooking } from "@/server/Bookings"; // Ajuste le chemin
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "@/components/ui/Icons";
import { toast } from "sonner"; // Ou ta librairie de notification

export function CompleteBookingButton({ bookingId }: { bookingId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    if (
      !confirm(
        "Confirm that the session is finished? This will transfer the tokens.",
      )
    )
      return;

    setIsLoading(true);
    try {
      const res = await completeBooking(bookingId);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleComplete}
      disabled={isLoading}
      className="w-full mt-4 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10"
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <>
          <CheckCircle2 size={18} />
          Mark as Completed
        </>
      )}
    </Button>
  );
}
