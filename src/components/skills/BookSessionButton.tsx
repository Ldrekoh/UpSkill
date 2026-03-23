"use client";

import { useRouter } from "next/navigation";

type Props = {
  skillId: string;
  tokenCost: number;
  isAuthenticated: boolean;
  userBalance: number;
};

export function BookSessionButton({
  skillId,
  tokenCost,
  isAuthenticated,
  userBalance,
}: Props) {
  const router = useRouter();
  const hasEnoughTokens = userBalance >= tokenCost;

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push(`/auth/sign-in?redirect=/skills/${skillId}`);
      return;
    }
    // TODO: ouvrir modal de confirmation ou déclencher la Server Action de booking
    console.log("Book session:", skillId);
  };

  if (!isAuthenticated) {
    return (
      <button
        onClick={handleClick}
        className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
      >
        Sign in to Book
      </button>
    );
  }

  if (!hasEnoughTokens) {
    return (
      <div className="space-y-2">
        <button
          disabled
          className="w-full py-4 bg-outline/10 text-outline rounded-xl font-headline font-bold text-lg cursor-not-allowed"
        >
          Not enough tokens
        </button>
        <p className="text-center text-xs text-error">
          You have {userBalance} token{userBalance !== 1 ? "s" : ""}, need{" "}
          {tokenCost}.
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
    >
      Book this Session
    </button>
  );
}
