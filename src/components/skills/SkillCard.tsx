import { Coins } from "@/components/shared/Icons";
import Link from "next/link";

export const SkillCard = ({ skill }: { skill: any }) => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl group transition-all hover:shadow-xl hover:shadow-primary/5 flex flex-col h-full border border-transparent hover:border-primary/10">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {skill.category}
        </span>
        <div className="flex items-center space-x-1 text-on-surface font-bold text-sm">
          <span
            className="material-symbols-outlined text-amber-500 text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span>{skill.mentor.reputationScore || "5.0"}</span>
        </div>
      </div>

      <h3 className="font-headline text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {skill.title}
      </h3>

      <p className="text-on-surface-variant text-sm mb-6 line-clamp-2 italic font-body">
        {skill.description}
      </p>

      <div className="mt-auto">
        <div className="flex items-center space-x-3 mb-6">
          <img
            alt="Mentor avatar"
            className="w-10 h-10 rounded-full bg-surface-container-highest object-cover"
            src={
              skill.mentor.image ||
              `https://ui-avatars.com/api/?name=${skill.mentor.name}`
            }
          />
          <div>
            <p className="text-sm font-bold text-on-surface">
              {skill.mentor.name}
            </p>
            <p className="text-[10px] uppercase tracking-tighter font-bold text-outline">
              Expertise • {skill.duration} MIN
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
          <div className="flex items-center text-primary font-bold">
            <span
              className="material-symbols-outlined mr-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            ></span>
            {skill.tokenCost} - <Coins size={16} />
          </div>
          <Link
            href={`/skills/${skill.id}`}
            className="px-4 py-2 bg-surface-container-high text-on-primary-fixed-variant rounded-lg font-bold text-sm hover:bg-primary hover:text-on-primary transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
