import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/Icons";
import { getLatestSkills } from "@/server/Skills";
import { SkillCard } from "@/components/skills/SkillCard";
import Link from "next/link";

export default async function UpSkillLandingPage() {
  const latestSkills = await getLatestSkills(4);
  return (
    <div className="space-y-20 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20">
            The Future of Peer Learning
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-black text-on-surface tracking-tighter leading-[0.85] mb-8 italic">
            Master new <br />
            <span className="text-primary">Skills</span> with <br />
            Experts.
          </h1>
          <p className="text-xl text-on-surface-variant font-medium max-w-xl leading-relaxed mb-10">
            Une plateforme d'échange de compétences basée sur les jetons.
            Apprenez, enseignez, et faites grimper votre réputation.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              className="rounded-2xl h-14 px-8 font-bold text-lg bg-on-surface text-surface hover:bg-primary transition-all"
            >
              Explore Workshops
            </Button>
            <Link href="/skills/create">
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl h-14 px-8 font-bold text-lg border-outline-variant/20"
              >
                Become a Mentor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- LATEST SKILLS GRID --- */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-black italic tracking-tight">
              Latest Workshops.
            </h2>
            <p className="text-on-surface-variant font-medium">
              Handpicked sessions from our top-rated mentors.
            </p>
          </div>
          <Link
            href="/skills"
            className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary"
          >
            View All
          </Link>
        </div>
        {latestSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {latestSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-surface-container-low rounded-[3rem] border border-dashed border-outline-variant/30">
            <div className="w-16 h-16 rounded-full bg-outline-variant/10 flex items-center justify-center text-outline">
              <Search size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-headline font-black italic">
                No workshops found
              </h3>
              <p className="text-on-surface-variant text-sm font-medium">
                Be the first one to create a skill in this category!
              </p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
      </section>
    </div>
  );
}
