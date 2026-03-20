import Link from "next/link";

export default function HomePage() {
  return (
    <main className="pt-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative px-8 py-20 md:py-32 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#252f3d] leading-[1.1] tracking-tight mb-8 font-headline">
              Partagez votre savoir-faire,{" "}
              <span className="text-[#424fbf]">gagnez des jetons.</span>
            </h1>
            <p className="text-xl text-[#525c6c] max-w-xl mb-10 leading-relaxed font-body">
              Rejoignez la plus grande académie fluide où chaque compétence a de
              la valeur. Échangez vos talents, apprenez de nouvelles disciplines
              et bâtissez votre réputation au sein d'une communauté d'élite.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="editorial-gradient text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-indigo-500/20 hover:brightness-110 transition-all active:scale-95">
                Commencer l'échange
              </button>
              <button className="bg-[#d5e3fb] text-[#424fbf] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#dce9ff] transition-all">
                Découvrir les talents
              </button>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="relative w-full aspect-square rounded-[2rem] editorial-gradient rotate-3 overflow-hidden shadow-2xl">
              <img
                alt="Student collaboration"
                className="absolute inset-0 w-full h-full object-cover -rotate-3 scale-110 opacity-90"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
              />
            </div>
            {/* Glass Card flottante */}
            <div className="absolute -bottom-8 -left-8 glass-nav p-6 rounded-2xl shadow-xl max-w-[240px] border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-[#00675e] fill-1">
                  stars
                </span>
                <span className="font-bold text-sm">Top Mentorat</span>
              </div>
              <p className="text-xs text-[#525c6c] leading-relaxed">
                "J'ai appris le design UI en échange de cours de cuisine
                italienne. Une expérience incroyable !"
              </p>
            </div>
          </div>
        </div>
        {/* Accent de fond */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#89f5e7]/30 rounded-full blur-[100px] -z-10"></div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-[#eaf1ff] py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "15k+", label: "Membres" },
            { val: "420", label: "Compétences" },
            { val: "85k", label: "Échanges" },
            { val: "4.9/5", label: "Note Moyenne" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-[#424fbf] mb-2">
                {stat.val}
              </div>
              <div className="text-sm font-medium text-[#525c6c] uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS (BENTO GRID) */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-headline">
            Comment ça marche ?
          </h2>
          <div className="h-1.5 w-24 editorial-gradient rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Large */}
          <div className="md:col-span-2 bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#424fbf] mb-6">
                <span className="material-symbols-outlined text-3xl">
                  psychology
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-4 font-headline">
                Créez votre profil de talent
              </h3>
              <p className="text-[#525c6c] text-lg max-w-md">
                Listez ce que vous savez faire. Du développement web au yoga,
                chaque savoir est une monnaie d'échange précieuse.
              </p>
            </div>
            <div className="flex gap-2 mt-8">
              {["Design UI", "Python", "Cuisine"].map((tag) => (
                <span
                  key={tag}
                  className="bg-[#89f5e7] text-[#004841] px-4 py-1.5 rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Step 02 */}
          <div className="bg-[#424fbf] p-10 rounded-[2rem] text-white flex flex-col justify-between shadow-xl">
            <div className="text-6xl font-black opacity-20">02</div>
            <div>
              <h3 className="text-2xl font-bold mb-4 font-headline">
                Gagnez des jetons
              </h3>
              <p className="opacity-90 font-medium">
                Donnez une heure de votre temps, recevez un jeton. C'est simple,
                équitable et transparent.
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <span className="material-symbols-outlined text-4xl text-[#89f5e7]">
                toll
              </span>
            </div>
          </div>

          {/* Card 3: Step 03 */}
          <div className="bg-[#d5e3fb] p-10 rounded-[2rem] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#424fbf] mb-6 shadow-sm">
                <span className="material-symbols-outlined text-3xl">
                  school
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-headline">
                Apprenez sans limite
              </h3>
              <p className="text-[#525c6c] font-medium">
                Utilisez vos jetons pour réserver des sessions avec n'importe
                quel membre de la communauté.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="#"
                className="text-[#424fbf] font-bold flex items-center gap-2 group"
              >
                Voir le catalogue
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Card 4: Image/Community */}
          <div className="md:col-span-2 bg-white rounded-[2rem] overflow-hidden shadow-sm relative group">
            <img
              alt="Community exchange"
              className="w-full h-full object-cover max-h-[300px] group-hover:scale-105 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
              <p className="text-white font-bold text-xl">
                Une communauté bâtie sur la confiance et l'entraide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="px-8 py-24">
        <div className="max-w-5xl mx-auto editorial-gradient rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight font-headline">
              Prêt à transformer vos compétences en opportunités ?
            </h2>
            <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto font-body">
              Rejoignez des milliers de passionnés qui échangent déjà leur
              savoir. L'inscription est gratuite et vous recevez 2 jetons de
              bienvenue.
            </p>
            <button className="bg-white text-[#424fbf] px-10 py-5 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-lg">
              Créer mon compte gratuitement
            </button>
          </div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#89f5e7]/20 rounded-full blur-3xl"></div>
        </div>
      </section>
    </main>
  );
}
