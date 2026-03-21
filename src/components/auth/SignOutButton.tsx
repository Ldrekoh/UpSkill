"use client";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignOutButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    setIsPending(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in");
          router.refresh();
        },
      },
    });
    setIsPending(false);
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-error hover:bg-error/10 transition-colors disabled:opacity-50",
        className,
      )}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      <span>Sign Out</span>
    </button>
  );
};
