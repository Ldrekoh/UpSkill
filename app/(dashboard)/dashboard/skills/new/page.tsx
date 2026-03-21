"use client";

import { CreateSkillForm } from "@/components/forms/CreateSkillForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewSkillPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Navigation de retour */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-outline hover:text-primary transition-colors group"
      >
        <div className="p-2 rounded-full bg-surface-container-low group-hover:bg-primary/10">
          <ChevronLeft size={18} />
        </div>
        <span className="text-sm font-bold uppercase tracking-widest">
          Back to Dashboard
        </span>
      </Link>

      {/* En-tête */}
      <div className="relative p-10 rounded-[2.5rem] bg-on-surface text-surface overflow-hidden shadow-2xl shadow-primary/10">
        <div className="relative z-10 space-y-2">
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter">
            Create a{" "}
            <span className="text-primary italic font-serif">Masterclass.</span>
          </h1>
          <p className="text-surface-variant/80 max-w-md font-body text-lg leading-relaxed">
            Share your unique expertise with the community and start earning
            tokens. Be precise, be inspiring.
          </p>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-20%] left-[10%] w-40 h-40 bg-secondary/20 rounded-full blur-[60px]" />
      </div>

      {/* Formulaire */}
      <section className="relative">
        <CreateSkillForm />
        <p className="mt-8 text-center text-xs text-outline font-medium px-10 leading-loose">
          By publishing this skill, you agree to host a high-quality
          collaborative session. Tokens transfer once the learner confirms
          completion.
        </p>
      </section>
    </div>
  );
}
