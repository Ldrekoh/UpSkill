import { Coins, Star, Timer, ArrowUpRight } from "@/components/shared/Icons";
import Image from "next/image";
import Link from "next/link";

export const SkillCard = ({ skill }: { skill: any }) => {
  return (
    <div className="group relative bg-surface-container-lowest p-7 rounded-[2.5rem] border border-outline-variant/10 transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(var(--primary-rgb),0.15)] hover:-translate-y-2 flex flex-col h-full overflow-hidden">
      {/* 1. Header: Catégorie & Note */}
      <div className="flex justify-between items-center mb-6">
        <div className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/5">
          {skill.category}
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/50 text-on-surface font-bold text-xs">
          <Star size={14} className="text-amber-500 fill-amber-500" />
          <span>{skill.mentor?.reputationScore || "5.0"}</span>
        </div>
      </div>

      {/* 2. Corps: Titre & Description */}
      <div className="space-y-4 mb-8">
        <h3 className="font-headline text-2xl font-black text-on-surface leading-tight group-hover:text-primary transition-colors line-clamp-2 italic font-serif">
          {skill.title}
        </h3>
        <p className="text-on-surface-variant/70 text-sm leading-relaxed line-clamp-3 font-medium">
          {skill.description}
        </p>
      </div>

      {/* 3. Footer: Mentor & Action */}
      <div className="mt-auto pt-6 border-t border-outline-variant/5">
        <div className="flex items-center justify-between">
          {/* Info Mentor */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-xl bg-surface-container-highest shadow-inner">
              <Image
                alt={skill.mentor?.name || "Mentor"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                src={skill.mentor?.image || "/avatar-placeholder.png"}
              />
            </div>
            <div>
              <p className="text-xs font-black text-on-surface tracking-tight">
                {skill.mentor?.name}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-outline uppercase tracking-tighter">
                <Timer size={10} />
                <span>{skill.duration} MIN</span>
              </div>
            </div>
          </div>

          {/* Prix en Tokens */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="text-xl font-black font-headline tracking-tighter">
                {skill.tokenCost}
              </span>
              <Coins size={16} strokeWidth={2.5} />
            </div>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-outline opacity-50">
              per session
            </p>
          </div>
        </div>

        {/* Bouton d'action flottant ou lien complet */}
        <Link
          href={`/explore/skills/${skill.id}`}
          className="mt-6 w-full py-4 bg-surface-container-high text-on-surface rounded-2xl font-headline font-black text-sm flex items-center justify-center gap-2 transition-all hover:bg-on-surface hover:text-surface group-hover:shadow-lg active:scale-95"
        >
          Explore Workshop
          <ArrowUpRight
            size={18}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      {/* Effet de brillance au survol (Subtile) */}
      <div className="absolute inset-0 pointer-events-none border-[3px] border-primary/0 group-hover:border-primary/5 rounded-[2.5rem] transition-all duration-500" />
    </div>
  );
};
