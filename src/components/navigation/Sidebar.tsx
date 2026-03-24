"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Search,
  PlusCircle,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "My Sessions", href: "/my-sessions", icon: LayoutDashboard },
  { label: "Explore", href: "/skills", icon: Search },
  { label: "Create Skill", href: "/skills/create", icon: PlusCircle },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-outline-variant/10 bg-surface-container-lowest h-screen sticky top-0 flex flex-col p-6">
      {/* Logo UpSkill */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <Zap size={24} fill="currentColor" />
        </div>
        <Link
          href="/"
          className="font-headline font-black italic text-2xl tracking-tighter text-on-surface"
        >
          UpSkill
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                isActive
                  ? "bg-on-surface text-surface shadow-md"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
              )}
            >
              <Icon
                size={22}
                className={cn(
                  "transition-transform group-hover:scale-110",
                  isActive ? "text-primary" : "text-outline",
                )}
              />
              <span
                className={cn(
                  "text-sm font-bold tracking-tight",
                  isActive
                    ? "opacity-100"
                    : "opacity-70 group-hover:opacity-100",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Sidebar (User Status) */}
      <div className="pt-6 border-t border-outline-variant/10">
        <div className="p-4 rounded-[2rem] bg-primary/5 border border-primary/10">
          <p className="text-[10px] uppercase font-black tracking-widest text-primary mb-1">
            Pro Mentor
          </p>
          <p className="text-xs font-bold text-on-surface-variant">
            Level up your reputation to earn more tokens.
          </p>
        </div>
      </div>
    </aside>
  );
}
