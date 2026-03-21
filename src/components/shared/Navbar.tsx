import { Bell, Coins, Search } from "@/components/shared/Icons";
import { getCurrentUser } from "@/server/Users";
import Link from "next/link";

export const Navbar = async () => {
  const { session, currentUser } = await getCurrentUser();

  // Fonction pour extraire les initiales (ex: "John Doe" -> "JD")
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm dark:shadow-none border-b border-outline-variant/10">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-primary font-headline"
        >
          Collaborative Authority
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/explore"
            className="text-on-surface-variant hover:text-primary transition-colors font-headline font-semibold tracking-tight"
          >
            Explore
          </Link>
          <Link
            href="/mentors"
            className="text-on-surface-variant hover:text-primary transition-colors font-headline font-semibold tracking-tight"
          >
            Mentors
          </Link>
          <Link
            href="/workshops"
            className="text-on-surface-variant hover:text-primary transition-colors font-headline font-semibold tracking-tight"
          >
            Workshops
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant/20 mr-2">
            <Search className="text-outline w-4 h-4" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-40 font-body placeholder:text-outline outline-none"
              placeholder="Find a skill..."
              type="text"
            />
          </div>

          {session ? (
            <>
              {/* Tokens Counter */}
              <div className="flex items-center gap-2 bg-secondary-container/10 px-3 py-1.5 rounded-full border border-secondary-container/20 group hover:bg-secondary-container/20 transition-all cursor-help">
                <Coins className="w-4 h-4 text-secondary" />
                <span className="text-sm font-bold text-secondary font-headline">
                  {currentUser?.tokenBalance || 0}{" "}
                  {/* Remplace par ta propriété réelle de tokens */}
                </span>
              </div>

              {/* Notifications */}
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
                <Bell className="w-5 h-5" />
              </button>

              {/* User Avatar / Initials */}
              <Link
                href="/dashboard/profile"
                className="flex items-center justify-center"
              >
                {currentUser?.image ? (
                  <img
                    src={currentUser.image}
                    alt={currentUser.name || "Avatar"}
                    className="w-10 h-10 rounded-full border-2 border-primary/10 object-cover hover:border-primary transition-all"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container text-white flex items-center justify-center text-sm font-bold shadow-md hover:scale-105 transition-transform">
                    {getInitials(currentUser?.name || "User")}
                  </div>
                )}
              </Link>
            </>
          ) : (
            /* Button for Guest */
            <Link
              href="/auth/sign-in"
              className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2 rounded-lg font-semibold shadow-md active:scale-95 transition-transform"
            >
              Get Started
            </Link>
          )}

          {/* Booking CTA (Always visible or only if logged in?) */}
          {session && (
            <Link
              href="/dashboard/bookings/new"
              className="hidden sm:block bg-on-surface text-surface px-5 py-2 rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-opacity"
            >
              Book Session
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
