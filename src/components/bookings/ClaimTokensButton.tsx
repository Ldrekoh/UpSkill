"use client";

import { useTransition } from "react";
import { autoReleaseTokens } from "@/server/Bookings";
import { toast } from "sonner";

export function ClaimTokensButton({ bookingId }: { bookingId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const res = await autoReleaseTokens(bookingId);
          if (res.success) toast.success(res.message);
          else toast.error(res.message);
        });
      }}
      disabled={isPending}
      className="text-[10px] font-black text-primary underline decoration-2 underline-offset-4 hover:text-primary/70 transition-all uppercase"
    >
      {isPending ? "Claiming..." : "Claim Tokens (Student forgot?)"}
    </button>
  );
}
