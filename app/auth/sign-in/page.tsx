"use client";
import { SignInForm } from "@/components/forms/SignInForm";
import { LayoutGrid, Sparkles } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row items-stretch bg-surface">
      {/* Left Panel - Atelier Feel */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary items-center justify-center p-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary-container blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary-container blur-[100px]"></div>
        </div>

        <div className="relative z-10 space-y-8 max-w-xl">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase">
              The Digital Atelier
            </span>
            <h1 className="font-headline text-6xl font-extrabold text-white tracking-tighter leading-none">
              Collaborative <br /> Authority.
            </h1>
          </div>
          <p className="text-xl text-white/80 font-medium leading-relaxed max-w-lg font-body">
            Access a curated space for high-end digital expertise. Join our
            atelier of mentors designed for professional growth.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-12">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <Sparkles className="text-white mb-3" />
              <h3 className="text-white font-bold text-lg">Curated</h3>
              <p className="text-white/60 text-sm">
                Direct access to verified experts.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <LayoutGrid className="text-white mb-3" />
              <h3 className="text-white font-bold text-lg">Workshops</h3>
              <p className="text-white/60 text-sm">
                Immersive collaborative sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Panel - Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-surface">
        <SignInForm />
      </section>
    </main>
  );
}
