"use client";

import { CreateSkillForm } from "@/components/forms/CreateSkillForm";
import { ChevronLeft, Sparkles, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function NewSkillPage() {
  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-12">
      {/* Navigation & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-3 text-on-surface-variant hover:text-primary transition-all group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary transition-all shadow-sm">
            <ChevronLeft size={20} />
          </div>
          <span className="text-sm font-bold tracking-tight">
            Return to Atelier
          </span>
        </Link>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest border border-secondary/20">
          <Sparkles size={14} />
          <span>Mentorship Mode</span>
        </div>
      </div>

      {/* Hero Section : Le "Studio" Header */}
      <div className="relative overflow-hidden rounded-[3rem] bg-on-surface p-8 md:p-14 text-surface shadow-2xl">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1 space-y-6">
            <div className="inline-flex p-3 rounded-2xl bg-surface/10 backdrop-blur-md border border-surface/10">
              <GraduationCap size={28} className="text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-headline font-black tracking-tighter leading-[1.1]">
                Launch your <br />
                <span className="text-primary italic font-serif">
                  Workshop.
                </span>
              </h1>
              <p className="text-surface-variant/70 max-w-lg font-body text-lg leading-relaxed">
                Transform your knowledge into a tangible learning experience.
                Set your terms, define your value, and inspire the next wave.
              </p>
            </div>
          </div>

          {/* Stats rapides ou info à droite */}
          <div className="hidden lg:block w-px h-32 bg-surface/10" />
          <div className="hidden lg:block space-y-4 text-right">
            <div>
              <p className="text-2xl font-black text-primary">100%</p>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">
                Token Security
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-secondary">∞</p>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">
                Growth Potential
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content : Le Formulaire dans un container épuré */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="bg-surface-container-lowest rounded-[2.5rem] p-8 md:p-12 border border-outline-variant/10 shadow-sm relative overflow-hidden">
            {/* Une subtile ligne de gradient en haut du formulaire */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <CreateSkillForm />
          </div>
        </div>

        {/* Sidebar d'astuces / Guidelines */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-[2rem] bg-surface-container-low border border-outline-variant/5">
            <h3 className="font-headline font-bold text-on-surface mb-4">
              Quick Tips
            </h3>
            <ul className="space-y-4">
              {[
                {
                  title: "Duration",
                  desc: "60 min is the sweet spot for most technical skills.",
                },
                {
                  title: "Pricing",
                  desc: "Start with 1-2 tokens to build your initial reputation.",
                },
                {
                  title: "Description",
                  desc: "Be specific about the deliverables (e.g. 'A coded landing page').",
                },
              ].map((tip, i) => (
                <li key={i} className="space-y-1">
                  <p className="text-xs font-black uppercase text-primary tracking-tighter">
                    {tip.title}
                  </p>
                  <p className="text-sm text-on-surface-variant leading-snug">
                    {tip.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">
              Trust Policy
            </p>
            <p className="text-xs text-primary/80 leading-relaxed font-medium">
              Every session is backed by our escrow system. You get paid
              instantly when the learner marks the session as complete.
            </p>
          </div>
        </aside>
      </div>

      <footer className="pt-10 border-t border-outline-variant/10 text-center">
        <p className="text-xs text-outline font-medium max-w-sm mx-auto">
          Need help structuring your workshop?
          <Link href="/help" className="text-primary hover:underline ml-1">
            Read our Mentor Guide
          </Link>
        </p>
      </footer>
    </div>
  );
}
