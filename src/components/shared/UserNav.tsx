"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client"; // Ton client Better-Auth
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

// ... (ton interface ou props si nécessaire)

export const UserNav = ({ currentUser }: { currentUser: any }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in");
          router.refresh();
        },
      },
    });
  };

  const initials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex items-center justify-center outline-none">
          {currentUser?.image ? (
            <img
              src={currentUser.image}
              alt={currentUser.name || "Avatar"}
              className="w-10 h-10 rounded-full border-2 border-primary/10 object-cover hover:border-primary transition-all shadow-md"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container text-white flex items-center justify-center text-sm font-bold shadow-md hover:scale-105 transition-transform">
              {initials}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none text-on-surface">
              {currentUser?.name}
            </p>
            <p className="text-xs leading-none text-on-surface-variant italic">
              {currentUser?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push("/dashboard/profile")}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/dashboard/settings")}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/dashboard/billing")}
          className="cursor-pointer"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-error focus:text-error focus:bg-error-container/20 cursor-pointer font-bold"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
