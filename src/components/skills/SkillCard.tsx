"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Coins, Star, ArrowUpRight } from "lucide-react";

// On définit un type local basé sur ton schéma
interface SkillCardProps {
  skill: {
    id: string;
    title: string;
    category: string;
    tokenCost: number;
    duration: number;
    mentor: {
      name: string;
      image: string | null;
      reputationScore: string | number | null;
    };
  };
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link href={`/skills/${skill.id}`} className="group block h-full">
      <div className="relative flex flex-col h-full p-6 rounded-[2.5rem] bg-surface border border-outline-variant/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden">
        {/* --- Header : Catégorie & Note --- */}
        <div className="flex items-center justify-between mb-6">
          <div className="px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
              {skill.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-500/5 text-amber-600">
            <Star size={12} fill="currentColor" className="text-amber-500" />
            <span className="text-xs font-black">
              {Number(skill.mentor.reputationScore).toFixed(1)}
            </span>
          </div>
        </div>

        {/* --- Title --- */}
        <div className="relative mb-6">
          <h3 className="text-2xl font-headline font-black leading-[1.1] text-on-surface group-hover:text-primary transition-colors italic tracking-tight line-clamp-2">
            {skill.title}
          </h3>
        </div>

        {/* --- Mentor Section --- */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border-2 border-surface-container-high shadow-sm">
            <Image
              src={skill.mentor.image || "/avatar-placeholder.png"}
              alt={skill.mentor.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black text-outline leading-none mb-1">
              Mentor
            </span>
            <span className="text-xs font-bold text-on-surface-variant">
              {skill.mentor.name}
            </span>
          </div>
        </div>

        {/* --- Footer : Stats & Price --- */}
        <div className="mt-auto pt-6 border-t border-outline-variant/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-outline">
              <Clock size={14} strokeWidth={2.5} />
              <span className="text-xs font-black uppercase tracking-tighter">
                {skill.duration}m
              </span>
            </div>
          </div>

          {/* Badge de prix style "Token" */}
          <div className="flex items-center gap-2 bg-on-surface text-surface px-4 py-2.5 rounded-[1.25rem] group-hover:bg-primary transition-colors duration-300">
            <Coins
              size={14}
              className="text-primary group-hover:text-white transition-colors"
            />
            <span className="text-sm font-headline font-black italic tracking-tight">
              {skill.tokenCost}{" "}
              <span className="text-[9px] uppercase ml-0.5 opacity-70">
                Tokens
              </span>
            </span>
          </div>
        </div>

        {/* Décoration Hover : Flèche sortante */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-primary">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </Link>
  );
}
