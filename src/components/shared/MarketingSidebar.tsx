"use client";

import { SignOutButton } from "@/components/auth/SignOutButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  tokenBalance?: number | null;
} | null;

// ── Icons SVG inline ──────────────────────────────────────────────────────────

const IconExplore = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const IconMentors = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconWorkshops = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IconDashboard = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconSignIn = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

const IconCoins = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="8" r="6" />
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" />
    <path d="m16.71 13.88.7.71-2.82 2.82" />
  </svg>
);

const IconClose = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconMenu = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// ── Nav items ─────────────────────────────────────────────────────────────────

const navItems = [
  { href: "/explore", label: "Explore", icon: IconExplore },
  { href: "/mentors", label: "Mentors", icon: IconMentors },
  { href: "/workshops", label: "Workshops", icon: IconWorkshops },
];

// ── Sidebar content (shared between desktop & mobile drawer) ──────────────────

function SidebarContent({
  user,
  pathname,
  onClose,
}: {
  user: User;
  pathname: string;
  onClose?: () => void;
}) {
  const getInitials = (name = "U") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="flex flex-col h-full">
      {/* Logo + close (mobile) */}
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <Link
          href="/"
          onClick={onClose}
          className="font-headline font-extrabold text-xl text-white tracking-tight"
        >
          Collab<span className="text-primary-fixed-dim">Authority</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <IconClose />
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                active
                  ? "bg-white/10 text-white font-bold"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon />
              {label}
            </Link>
          );
        })}

        {/* Séparateur */}
        <div className="pt-4 pb-2 px-4">
          <div className="h-px bg-white/10" />
        </div>

        {/* Dashboard link (si connecté) */}
        {user && (
          <Link
            href="/dashboard"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              pathname.startsWith("/dashboard")
                ? "bg-white/10 text-white font-bold"
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            <IconDashboard />
            Dashboard
          </Link>
        )}
      </nav>

      {/* Token balance (si connecté) */}
      {user && (
        <div className="mx-3 mb-3 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-1">
            Token Balance
          </p>
          <div className="flex items-center gap-2">
            <IconCoins />
            <p className="font-headline text-2xl font-extrabold text-white">
              {user.tokenBalance ?? 0}
            </p>
          </div>
        </div>
      )}

      {/* User / Auth */}
      <div className="px-3 pb-6">
        {user ? (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            {user.image ? (
              <Image
                width={40} // Correspond à w-10 (10 * 4px)
                height={40} // Correspond à h-10
                src={user.image}
                alt={user.name ?? "User"}
                className="w-9 h-9 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm shrink-0">
                {getInitials(user.name ?? undefined)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-white text-sm truncate">
                {user.name}
              </p>
              <p className="text-white/40 text-xs truncate">{user.email}</p>
            </div>
            <SignOutButton />
          </div>
        ) : (
          <div className="space-y-2">
            <Link
              href="/sign-in"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-all font-medium"
            >
              <IconSignIn />
              Sign In
            </Link>
            <Link
              href="/sign-up"
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:scale-[1.02] transition-transform"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function MarketingSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Desktop sidebar (fixed, toujours visible ≥ lg) ───────────────── */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-inverse-surface flex-col z-40 shadow-xl">
        <SidebarContent user={user} pathname={pathname} />
      </aside>

      {/* ── Mobile burger button ──────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-inverse-surface text-white shadow-lg"
        aria-label="Open menu"
      >
        <IconMenu />
      </button>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-screen w-72 bg-inverse-surface z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          user={user}
          pathname={pathname}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  );
}
