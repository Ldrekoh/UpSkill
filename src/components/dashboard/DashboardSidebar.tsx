"use client";

import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Wallet,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type User = {
  name?: string | null;
  email: string;
  image?: string | null;
  tokenBalance?: number | null;
};

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/skills/my-skills", label: "My Skills", icon: Sparkles },
  { href: "/dashboard/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/explore", label: "Explore", icon: CalendarDays },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export function DashboardSidebar({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest border-r border-outline-variant/10 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-outline-variant/10">
        <Link
          href="/"
          className="font-headline font-extrabold text-xl text-on-surface tracking-tighter"
        >
          Collab<span className="text-primary italic">Authority</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                active
                  ? "bg-on-surface text-surface font-bold shadow-lg shadow-on-surface/10"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-medium"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Token balance */}
      <div className="mx-3 mb-4 p-5 rounded-3xl bg-primary text-on-primary shadow-xl shadow-primary/20 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <Wallet size={14} />
            <p className="text-[10px] font-bold uppercase tracking-widest">
              Balance
            </p>
          </div>
          <p className="font-headline text-3xl font-extrabold">
            {user.tokenBalance ?? 0}{" "}
            <span className="text-sm font-body font-medium opacity-70">
              TKNS
            </span>
          </p>
        </div>
        {/* Décoration abstraite */}
        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
      </div>

      {/* User Section */}
      <div className="px-3 pb-6">
        <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-surface-container-low/50 border border-outline-variant/5">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={40} // Correspond à w-10 (10 * 4px)
              height={40} // Correspond à h-10
              className="rounded-full border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-on-surface text-surface flex items-center justify-center font-bold text-xs shrink-0">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="font-bold text-on-surface text-[13px] truncate leading-tight">
              {user.name}
            </p>
            <p className="text-outline text-[11px] truncate">{user.email}</p>
          </div>

          <button className="text-outline hover:text-error transition-colors p-2 hover:bg-error/10 rounded-xl group">
            <LogOut
              size={18}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
