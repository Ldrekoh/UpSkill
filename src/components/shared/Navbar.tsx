import { SignOutButton } from "@/components/auth/SignOutButton";
import { Bell, Coins, Search } from "@/components/shared/Icons";
import { getCurrentUser } from "@/server/Users";
import Link from "next/link";

export const Navbar = async () => {
  const { session, currentUser } = await getCurrentUser();

  const getInitials = (name: string = "User") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-outline-variant/10">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-2xl mx-auto">
        {/* --- LOGO --- */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-primary font-headline hover:opacity-90 transition-opacity"
        >
          Collaborative Authority
        </Link>

        {/* --- NAVIGATION LINKS (Desktop) --- */}
        <div className="hidden md:flex items-center space-x-1">
          {["Explore", "Mentors", "Workshops"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="px-4 py-2 text-sm font-headline font-semibold text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search (Desktop) */}
          <div className="hidden lg:flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant/10 focus-within:border-primary/30 transition-all">
            <Search className="text-outline w-4 h-4" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-32 xl:w-48 font-body placeholder:text-outline/60 ml-2 outline-none"
              placeholder="Search skills..."
              type="text"
            />
          </div>

          {session ? (
            <div className="flex items-center gap-2 md:gap-3">
              {/* Token Balance */}
              <div className="flex items-center gap-2 bg-secondary-container/10 px-3 py-1.5 rounded-full border border-secondary-container/20 shadow-sm">
                <Coins className="w-4 h-4 text-secondary" />
                <span className="text-sm font-bold text-secondary font-headline">
                  {currentUser?.tokenBalance ?? 0}
                </span>
              </div>

              {/* Notifications */}
              <button className="hidden sm:flex p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
                <Bell className="w-5 h-5" />
              </button>

              {/* User Identity */}
              <div className="flex items-center gap-3 pl-2 border-l border-outline-variant/20">
                <Link href="/dashboard/profile" className="relative group">
                  {currentUser?.image ? (
                    <img
                      src={currentUser.image}
                      alt={currentUser.name || "User"}
                      className="w-9 h-9 rounded-full border-2 border-primary/10 object-cover group-hover:border-primary transition-all"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-container text-white flex items-center justify-center text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
                      {getInitials(currentUser?.name)}
                    </div>
                  )}
                </Link>

                {/* Sign Out direct */}
                <SignOutButton />
              </div>

              {/* Desktop CTA */}
              <Link
                href="/dashboard/bookings/my-skills"
                className="hidden xl:block bg-on-surface text-surface px-5 py-2 rounded-lg font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                Book Session
              </Link>
            </div>
          ) : (
            /* Guest State */
            <div className="flex items-center gap-4">
              <Link
                href="/auth/sign-up"
                className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
