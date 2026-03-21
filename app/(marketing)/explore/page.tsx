import { SkillCard } from "@/components/skills/SkillCard"; // On va mettre à jour ce composant aussi
import { getLatestSkills } from "@/server/Skills";

export default async function ExplorePage() {
  const latestSkills = await getLatestSkills();

  return (
    <div className="bg-background text-on-background font-body antialiased">
      <main className="pt-24 pb-20 px-6 max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters - Gardée statique pour le design */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-10">
            <section>
              <h3 className="font-headline font-bold text-lg mb-6 text-on-surface">
                Category
              </h3>
              <div className="space-y-4">
                {["Tech", "Creative", "Lifestyle"].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center group cursor-pointer"
                  >
                    <input
                      className="rounded-lg border-outline-variant text-primary focus:ring-primary h-5 w-5 bg-surface-container-lowest"
                      type="checkbox"
                    />
                    <span className="ml-3 text-on-surface-variant group-hover:text-primary transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-headline font-bold text-lg mb-6 text-on-surface">
                Token Cost
              </h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-primary hover:text-primary transition-all text-sm font-medium">
                  1 Token
                </button>
                <button className="px-4 py-2 rounded-lg bg-primary text-on-primary shadow-lg shadow-primary/20 transition-all text-sm font-medium">
                  2 Tokens
                </button>
                <button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-primary hover:text-primary transition-all text-sm font-medium">
                  3+ Tokens
                </button>
              </div>
            </section>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-grow">
          {/* Search Bar Area */}
          <div className="mb-10 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">
                search
              </span>
              <input
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-lowest border-none shadow-sm focus:ring-2 focus:ring-primary-container transition-all text-on-surface placeholder:text-outline/60"
                placeholder="What skill do you want to master today?"
                type="text"
              />
            </div>
            <button className="w-full md:w-auto px-8 py-4 bg-primary text-on-primary rounded-xl font-headline font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              Search
            </button>
          </div>

          {/* Header Text */}
          <div className="mb-8">
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">
              Featured Skills
            </h1>
            <p className="text-on-surface-variant mt-2 font-body">
              Connect with verified experts in the Digital Atelier.
            </p>
          </div>

          {/* Skills Grid Dynamique */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {latestSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>

          {latestSkills.length === 0 && (
            <div className="py-20 text-center bg-surface-container-lowest rounded-3xl border border-dashed border-outline-variant/30">
              <p className="text-outline font-headline font-bold italic text-lg">
                No workshops available yet.
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 text-center">
            <button className="px-10 py-4 border border-outline-variant/40 rounded-full font-headline font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors">
              Load More Expert Sessions
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
