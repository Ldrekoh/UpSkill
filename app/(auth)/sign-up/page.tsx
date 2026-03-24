"use client";

import { SignUpForm } from "@/components/forms/SignUpForm";
import { Coins, Verified, Zap, Star, ShieldCheck } from "lucide-react";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row items-stretch bg-surface-container-lowest">
      {/* --- PANNEAU GAUCHE : L'OFFRE UPSKILL --- */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-on-surface items-center justify-center p-12 xl:p-24">
        {/* Effets de fond profonds */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-primary-container/10 blur-[80px]" />
        </div>

        <div className="relative z-10 space-y-12 max-w-2xl">
          {/* Badge & Titre */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Star size={14} className="text-primary fill-primary" />
              <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase">
                Join the Elite
              </span>
            </div>

            <h1 className="font-headline text-7xl xl:text-8xl font-black text-white tracking-tighter leading-[0.85] italic">
              Craft your <br />
              <span className="text-primary">Legacy.</span>
            </h1>

            <p className="text-xl text-white/60 font-medium leading-relaxed max-w-lg">
              Devenez mentor ou apprenez des meilleurs. Une économie basée sur
              le savoir, propulsée par la réputation.
            </p>
          </div>

          {/* Feature Card: Le Bonus de Bienvenue */}
          <div className="relative group p-8 rounded-[3rem] bg-primary text-white shadow-2xl shadow-primary/20 overflow-hidden transition-transform hover:scale-[1.02]">
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Coins size={20} className="text-white" />
                </div>
                <span className="font-black uppercase tracking-[0.2em] text-[10px] opacity-80">
                  Welcome Gift
                </span>
              </div>
              <h3 className="text-4xl font-headline font-black italic tracking-tight">
                +2 Tokens Free.
              </h3>
              <p className="text-sm font-bold opacity-90 leading-snug max-w-xs">
                Commencez votre voyage avec 2 jetons offerts pour accéder
                immédiatement aux meilleurs ateliers.
              </p>
            </div>
            {/* Décoration interne à la carte */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
          </div>

          {/* Social Proof Basique */}
          <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-primary" size={24} />
              <div className="text-white/60 text-[10px] font-black uppercase tracking-widest leading-tight">
                Verified
                <br />
                Mentors
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="text-primary" size={24} />
              <div className="text-white/60 text-[10px] font-black uppercase tracking-widest leading-tight">
                Instant
                <br />
                Access
              </div>
            </div>
          </div>
        </div>

        {/* Filigrane */}
        <div className="absolute top-10 right-12 text-white/5 font-headline font-black text-9xl italic select-none pointer-events-none">
          CREATE
        </div>
      </section>

      {/* --- PANNEAU DROIT : LE FORMULAIRE --- */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 bg-surface-container-lowest overflow-y-auto">
        {/* Navigation Mobile */}
        <div className="lg:hidden w-full max-w-md mb-8 flex items-center gap-2">
          <Zap size={20} className="text-primary fill-primary" />
          <span className="font-headline font-black italic text-xl tracking-tighter">
            UpSkill
          </span>
        </div>

        <SignUpForm />

        <footer className="mt-12 text-[10px] text-outline font-bold uppercase tracking-widest opacity-50">
          Atelier Registration • Reputation System v1.0
        </footer>
      </section>
    </main>
  );
}
