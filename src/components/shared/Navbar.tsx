import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "../../lib/auth";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-extrabold text-indigo-700 tracking-tighter"
        >
          Editorial Exchange
        </Link>

        <div className="flex items-center gap-6">
          {session ? (
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                <span className="text-sm font-bold text-primary">
                  {session.user.tokenBalance} EXC
                </span>
              </div>
              <Link
                href="/profile"
                className="material-symbols-outlined p-2 hover:bg-indigo-50 rounded-lg"
              >
                account_circle
              </Link>
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
