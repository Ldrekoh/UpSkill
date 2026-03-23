"use client";
import { SignUpForm } from "@/components/forms/SignUpForm";
import { Coins, Verified } from "lucide-react";

// Pas de "use client" — SignUpForm gère sa propre directive.
export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 md:p-12 bg-surface">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Section Gauche */}
        <div className="hidden lg:flex flex-col space-y-10">
          <div className="space-y-6">
            <span className="text-primary font-headline font-bold text-2xl tracking-tighter">
              Collaborative Authority
            </span>
            <h1 className="text-6xl font-headline font-extrabold text-on-surface leading-[1.1] tracking-tight">
              Enter the <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                Digital Atelier
              </span>{" "}
              <br />
              of expertise.
            </h1>
            <p className="text-on-surface-variant text-lg max-w-md leading-relaxed font-body">
              Join a curated ecosystem where global mentors and ambitious
              creators co-author the future of digital craft.
            </p>
          </div>

          <div className="flex items-center gap-5 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 max-w-sm shadow-sm">
            <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-white shadow-inner">
              <Verified size={28} />
            </div>
            <div>
              <p className="font-headline font-bold text-on-surface text-lg">
                Verified Community
              </p>
              <p className="text-sm text-on-surface-variant font-body">
                Join 12,000+ active mentors worldwide.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-primary-container p-8 rounded-2xl text-white shadow-xl shadow-primary/20 group">
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-secondary-fixed/20 rounded-lg">
                  <Coins size={16} className="text-secondary-fixed-dim" />
                </div>
                <span className="font-headline font-bold uppercase tracking-[0.2em] text-[10px] text-primary-fixed">
                  Limited Offer
                </span>
              </div>
              <h3 className="text-3xl font-headline font-extrabold">
                Bonus 2 Tokens
              </h3>
              <p className="text-sm opacity-80 font-body leading-snug max-w-70">
                Start your journey with complimentary access to premium workshop
                sessions upon registration.
              </p>
            </div>
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-secondary rounded-full blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity" />
          </div>
        </div>

        {/* Section Droite */}
        <div className="relative flex justify-center">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl lg:hidden" />
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
