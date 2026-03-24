"use client";

import { SignInForm } from "@/components/forms/SignInForm";
import { LayoutGrid, Zap, Users } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row items-stretch bg-surface-container-lowest">
      {/* --- PANNEAU GAUCHE : L'IDENTITÉ UPSKILL --- */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-on-surface items-center justify-center p-12 xl:p-24">
        {/* Background Effects: Des gradients plus subtils et profonds */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-primary-container/10 blur-[100px]" />
        </div>

        <div className="relative z-10 space-y-12 max-w-2xl">
          {/* Badge de marque */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Zap size={14} className="text-primary fill-primary" />
              <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase">
                UpSkill
              </span>
            </div>

            <h1 className="font-headline text-7xl xl:text-8xl font-black text-white tracking-tighter leading-[0.85] italic">
              Share. <br />
              <span className="text-primary">Learn.</span> <br />
              Grow.
            </h1>
          </div>

          <p className="text-xl text-white/60 font-medium leading-relaxed max-w-lg">
            Rejoignez la première plateforme d'échange de compétences où votre
            réputation est votre monnaie.
          </p>

          {/* Features Grid : Plus "Clean" et arrondi */}
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="group p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <h3 className="text-white font-headline font-black italic text-xl mb-2">
                Verified
              </h3>
              <p className="text-white/40 text-sm font-medium leading-snug">
                Accès direct à des mentors validés par la communauté.
              </p>
            </div>

            <div className="group p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <LayoutGrid size={24} />
              </div>
              <h3 className="text-white font-headline font-black italic text-xl mb-2">
                Tokens
              </h3>
              <p className="text-white/40 text-sm font-medium leading-snug">
                Gagnez des jetons en enseignant ce que vous maîtrisez.
              </p>
            </div>
          </div>
        </div>

        {/* Filigrane décoratif en fond */}
        <div className="absolute bottom-10 left-12 text-white/5 font-headline font-black text-9xl italic select-none pointer-events-none">
          UPSKILL
        </div>
      </section>

      {/* --- PANNEAU DROIT : LE FORMULAIRE --- */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 bg-surface-container-lowest overflow-y-auto">
        {/* Navigation de retour rapide pour Mobile */}
        <div className="lg:hidden w-full max-w-md mb-8">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-primary fill-primary" />
            <span className="font-headline font-black italic text-xl tracking-tighter">
              UpSkill
            </span>
          </div>
        </div>

        <SignInForm />

        {/* Footer discret */}
        <footer className="mt-12 text-[10px] text-outline font-bold uppercase tracking-widest opacity-50">
          © 2024 UpSkill Atelier • Secure Authentication
        </footer>
      </section>
    </main>
  );
}
