// app/explore/page.tsx
import { SkillCard } from "@/components/skills/SkillCard";
import { getAllSkills, searchSkills } from "@/server/Skills"; // Assurez-vous d'importer searchSkills
import { SearchBar } from "@/components/skills/SearchBar";
import { Search, SlidersHorizontal } from "@/components/ui/Icons";

export default async function ExploreSkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query || "";

  // Si on a une recherche, on utilise searchSkills, sinon getAllSkills
  const skills = query ? await searchSkills(query) : await getAllSkills();

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
            Catalogue
          </div>
          <h1 className="text-5xl md:text-6xl font-headline font-black text-on-surface tracking-tighter italic leading-none">
            Explore <span className="text-primary">Skills.</span>
          </h1>
          <p className="text-on-surface-variant font-medium max-w-md">
            Découvrez des ateliers animés par des experts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Nouveau composant de recherche interactif */}
          <SearchBar />

          <button className="h-12 w-12 flex items-center justify-center rounded-2xl bg-on-surface text-surface hover:bg-primary transition-colors shadow-lg shadow-on-surface/5">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* --- GRILLE DE SKILLS --- */}
      {skills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skills.map((skill) => (
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
              {query ? `No results for "${query}"` : "No workshops found"}
            </h3>
            <p className="text-on-surface-variant text-sm font-medium">
              Try adjusting your search or create a new skill!
            </p>
          </div>
        </div>
      )}

      <div className="pt-12 border-t border-outline-variant/10 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-outline">
          Showing {skills.length} sessions
        </p>
      </div>
    </div>
  );
}
