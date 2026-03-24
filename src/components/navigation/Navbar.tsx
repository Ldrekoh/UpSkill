import { getCurrentUser } from "@/server/Users";
import Image from "next/image";

import Link from "next/link";

import { SignOutButton } from "../auth/SignOutButton";

export async function Navbar() {
  const { currentUser } = await getCurrentUser();

  return (
    <header className="h-20 border-b border-outline-variant/10 flex items-center justify-between px-8 bg-surface-container-lowest/80 backdrop-blur-md z-10 sticky top-0">
      {/* Slogan de marque */}
      <div>
        <h2 className="text-sm font-bold text-outline uppercase tracking-[0.2em]">
          <span className="text-on-surface font-headline italic font-black uppercase tracking-tight">
            Partagez et apprenez
          </span>
        </h2>
      </div>

      {/* Actions Utilisateur */}
      <div className="flex items-center gap-4">
        {currentUser ? (
          <>
            {/* Badge de Tokens (Clickable vers le wallet ?) */}
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20 group hover:bg-primary/20 transition-all cursor-default">
              <span className="font-headline font-black italic text-primary">
                {currentUser.tokenBalance}{" "}
                <span className="text-[10px] uppercase ml-1 opacity-70">
                  Tokens
                </span>
              </span>
            </div>

            {/* Séparateur */}
            <div className="h-8 w-px bg-outline-variant/20 mx-2" />

            {/* Profil & Déconnexion */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black leading-none text-on-surface">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-tighter">
                  {currentUser.reputationScore} Rep
                </p>
              </div>

              {/* Avatar avec contouring */}
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-surface-container-high ring-2 ring-primary/5 shadow-sm">
                <Image
                  fill
                  src={currentUser.image || "/avatar-placeholder.png"}
                  alt={currentUser.name || "User"}
                  className="object-cover"
                />
              </div>

              {/* Le bouton SignOut déporté pour plus de clarté */}
              <SignOutButton className="p-2.5 rounded-xl hover:bg-error/10 hover:text-error text-outline transition-all border border-outline-variant/10 group" />
            </div>
          </>
        ) : (
          <Link
            href="/sign-in"
            className="bg-on-surface text-surface px-6 py-2.5 rounded-2xl font-black italic uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-lg shadow-on-surface/5"
          >
            Connect
          </Link>
        )}
      </div>
    </header>
  );
}
