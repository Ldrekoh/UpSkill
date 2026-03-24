import { SkillForm } from "@/components/skills/SkillForm";
import { ArrowLeft, Sparkles } from "@/components/ui/Icons";
import Link from "next/link";

export default function CreateSkillPage() {
  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* --- HEADER DE LA PAGE --- */}
        <div className="space-y-6">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-outline hover:text-primary transition-colors font-bold uppercase text-[10px] tracking-widest group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Explore
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary text-[10px] font-black uppercase tracking-[0.2em] border border-secondary/10">
              <Sparkles size={12} className="fill-secondary" />
              New Workshop
            </div>

            <h1 className="text-5xl md:text-7xl font-headline font-black text-on-surface tracking-tighter italic leading-[0.85]">
              Share your <br />
              <span className="text-primary">Craft.</span>
            </h1>

            <p className="text-lg text-on-surface-variant font-medium max-w-xl leading-relaxed">
              Transformez votre expertise en opportunités. Définissez votre
              programme, fixez votre prix en tokens et commencez à bâtir votre
              réputation dans l'Atelier.
            </p>
          </div>
        </div>

        {/* --- FORMULAIRE --- */}
        <section className="relative">
          {/* Décoration subtile en arrière-plan */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />

          <SkillForm />
        </section>

        {/* --- FOOTER DE LA PAGE --- */}
        <footer className="pt-12 border-t border-outline-variant/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
                <span className="font-black text-xs">?</span>
              </div>
              <p className="text-xs text-outline font-bold max-w-[200px]">
                Besoin d'aide pour structurer votre atelier ?
                <Link
                  href="/guide"
                  className="text-primary hover:underline ml-1"
                >
                  Consultez notre guide.
                </Link>
              </p>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-outline/50 italic">
              UpSkill Atelier • Reputation System v1.0
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
