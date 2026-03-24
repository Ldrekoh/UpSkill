"use client";

import { useState } from "react";
import { bookSkill } from "@/server/Bookings";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Zap, ArrowRight } from "lucide-react"; // Ajout de ArrowRight
import { useRouter } from "next/navigation";
import Link from "next/link"; // Ajout de Link

interface BookingButtonProps {
  skillId: string;
  tokenCost: number;
  isActive: boolean;
  isLoggedIn: boolean; // Nouvelle prop indispensable
}

export function BookingButton({
  skillId,
  tokenCost,
  isActive,
  isLoggedIn,
}: BookingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBooking = async () => {
    setIsLoading(true);
    try {
      const result = await bookSkill(skillId);

      if (result.success) {
        toast.success(result.message);
        router.refresh();
        router.push("/my-sessions"); // Rediriger vers les bookings plutôt que la même page
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDU SI NON CONNECTÉ ---
  if (!isLoggedIn) {
    return (
      <Link href="/sign-in" className="block w-full group">
        <Button className="w-full h-20 rounded-[2rem] bg-surface-container-high border-2 border-outline-variant text-on-surface font-headline font-black italic text-2xl hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative shadow-xl">
          <div className="flex items-center justify-center gap-3 relative z-10">
            <span>Login to Book</span>
            <ArrowRight
              size={24}
              className="group-hover:translate-x-2 transition-transform"
            />
          </div>
        </Button>
        <p className="text-[10px] text-center text-outline font-black uppercase tracking-[0.2em] opacity-60 mt-4">
          You need an account to spend tokens
        </p>
      </Link>
    );
  }

  // --- RENDU SI CONNECTÉ ---
  return (
    <div className="space-y-4 w-full">
      <Button
        onClick={handleBooking}
        disabled={isLoading || !isActive}
        className="w-full h-20 rounded-[2rem] bg-primary text-white font-headline font-black italic text-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />

        <div className="flex items-center justify-center gap-3 relative z-10">
          {isLoading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              <Zap size={24} className="fill-current" />
              <span>Book Session • {tokenCost} Tokens</span>
            </>
          )}
        </div>
      </Button>

      <div className="flex flex-col items-center gap-2">
        <p className="text-[10px] text-center text-outline font-black uppercase tracking-[0.2em] opacity-60">
          Tokens are held in escrow until completion
        </p>
        {!isActive && (
          <span className="text-[10px] text-error font-black uppercase tracking-widest bg-error/10 px-3 py-1 rounded-full">
            Currently Unavailable
          </span>
        )}
      </div>
    </div>
  );
}
