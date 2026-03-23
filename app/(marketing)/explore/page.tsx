import { SkillCard } from "@/components/skills/SkillCard";
import { getLatestSkills } from "@/server/Skills";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from "@/components/shared/Icons";

export default async function ExplorePage() {
  const latestSkills = await getLatestSkills();

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      {/* 1. Hero Header Section */}
      <section className="relative pt-32 pb-20 px-6 bg-on-surface text-surface overflow-hidden">
        {/* Cercles décoratifs en arrière-plan */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={12} />
            <span>The Digital Atelier</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-[0.9]">
            Master new <br />
            <span className="text-primary italic font-serif">Horizons.</span>
          </h1>
          <p className="text-surface-variant/60 max-w-xl text-lg font-medium leading-relaxed">
            Exchange your expertise for tokens. Connect with mentors from around
            the globe in 1-on-1 collaborative sessions.
          </p>
        </div>
      </section>

      {/* 2. Floating Search Bar */}
      <div className="max-w-screen-2xl mx-auto px-6 relative z-20">
        <div className="relative -mt-10">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
              <input
                type="text"
                placeholder="What skill do you want to master today?"
                className="w-full pl-16 pr-6 py-6 rounded-3xl bg-surface text-on-surface shadow-2xl border border-outline-variant/10 focus:ring-2 focus:ring-primary transition-all text-lg font-medium placeholder:text-outline/50"
              />
            </div>
            <button className="px-10 py-6 bg-primary text-on-primary rounded-3xl font-headline font-black flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
              <Zap size={20} fill="currentColor" />
              Find Mentor
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-screen-2xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        {/* 3. Sidebar Filters */}
        <aside className="w-full lg:w-80 shrink-0 space-y-10">
          <div className="sticky top-24 p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/5">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-headline font-bold text-xl text-on-surface">
                Filters
              </h3>
              <SlidersHorizontal size={18} className="text-outline" />
            </div>

            <section className="mb-10">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">
                Categories
              </h4>
              <div className="space-y-3">
                {["Development", "Design", "Business", "Lifestyle"].map(
                  (cat) => (
                    <label
                      key={cat}
                      className="flex items-center group cursor-pointer"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer rounded-lg border-outline-variant text-primary focus:ring-primary h-6 w-6 transition-all"
                        />
                      </div>
                      <span className="ml-3 text-on-surface-variant font-bold group-hover:text-primary transition-colors">
                        {cat}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </section>

            <section>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">
                Token Investment
              </h4>
              <div className="flex flex-wrap gap-2">
                {["1", "2", "3+"].map((price) => (
                  <button
                    key={price}
                    className="flex-1 px-4 py-3 rounded-2xl border border-outline-variant/20 text-xs font-black hover:border-primary hover:text-primary transition-all text-on-surface-variant"
                  >
                    {price} {price === "1" ? "Token" : "Tokens"}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </aside>

        {/* 4. Skills Grid Area */}
        <section className="grow">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-headline text-3xl font-black text-on-surface tracking-tight">
                Featured Workshops
              </h2>
              <p className="text-on-surface-variant mt-1 font-medium opacity-70">
                Explore our hand-picked expert sessions.
              </p>
            </div>
            <div className="hidden sm:block h-px grow mx-8 bg-outline-variant/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {latestSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>

          {latestSkills.length === 0 && (
            <div className="py-32 text-center bg-surface-container-low rounded-[3rem] border border-dashed border-outline-variant/20">
              <div className="bg-surface-container-highest w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={24} className="text-outline" />
              </div>
              <p className="text-on-surface font-headline font-bold text-xl mb-2">
                No workshops found.
              </p>
              <p className="text-outline text-sm">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-20 text-center">
            <button className="group px-12 py-5 bg-on-surface text-surface rounded-full font-headline font-black hover:bg-primary transition-all shadow-xl flex items-center gap-3 mx-auto">
              Load More Sessions
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

// Petit utilitaire Icon pour le bouton
function ArrowRight(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className="w-5 h-5"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}
