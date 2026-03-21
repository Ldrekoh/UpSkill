import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center px-6">
        {/* Blobs décoratifs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-tertiary/8 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texte */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
                The Digital Atelier
              </span>
            </div>

            <h1 className="font-headline text-6xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-[1.05]">
              Share what
              <br />
              you{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] animate-[gradient_4s_ease_infinite]">
                  master.
                </span>
              </span>
              <br />
              Learn what
              <br />
              you{" "}
              <span className="italic font-serif text-on-surface/40">
                desire.
              </span>
            </h1>

            <p className="text-on-surface-variant text-xl leading-relaxed max-w-lg font-body">
              A curated marketplace where experts exchange knowledge using
              tokens. No money — pure value for value.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/explore"
                className="group px-8 py-4 bg-primary text-on-primary rounded-2xl font-headline font-bold text-lg hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg shadow-primary/25 flex items-center gap-3"
              >
                Explore Skills
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 border border-outline-variant/50 text-on-surface rounded-2xl font-headline font-bold text-lg hover:bg-surface-container transition-colors"
              >
                Join for free
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {["#004ac6", "#712ae2", "#943700", "#2563eb", "#8a4cfc"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-background"
                      style={{ backgroundColor: color }}
                    />
                  ),
                )}
              </div>
              <p className="text-sm text-on-surface-variant">
                <span className="font-bold text-on-surface">12,000+</span>{" "}
                mentors worldwide
              </p>
            </div>
          </div>

          {/* Card flottante décorative */}
          <div className="hidden lg:flex flex-col gap-4">
            {/* Skill card preview */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-xl border border-outline-variant/10 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                  🎨
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-xs font-bold">
                  Creative
                </span>
              </div>
              <h3 className="font-headline font-bold text-on-surface text-lg mb-1">
                Brand Identity Design
              </h3>
              <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
                From concept to final assets — logos, typography system, color
                palette.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary" />
                  <span className="text-sm text-on-surface-variant">
                    Marie L.
                  </span>
                </div>
                <span className="font-headline font-bold text-primary">
                  2 Tokens
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/10 shadow-md hover:-translate-y-0.5 transition-transform">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-headline font-bold text-on-surface text-sm mb-1">
                  Next.js Performance
                </h4>
                <p className="text-xs text-on-surface-variant">90min session</p>
                <p className="text-primary font-bold mt-2 text-sm">1 Token</p>
              </div>
              <div className="bg-primary rounded-2xl p-5 shadow-md hover:-translate-y-0.5 transition-transform">
                <div className="text-2xl mb-2">🎵</div>
                <h4 className="font-headline font-bold text-on-primary text-sm mb-1">
                  Music Production
                </h4>
                <p className="text-xs text-on-primary/60">120min session</p>
                <p className="text-on-primary font-bold mt-2 text-sm">
                  3 Tokens
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-outline uppercase tracking-widest">
            Explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-outline to-transparent" />
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="py-16 border-y border-outline-variant/10 bg-surface-container-low/50">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "12K+", label: "Active Mentors" },
            { value: "340+", label: "Skills Available" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "50K+", label: "Sessions Done" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-headline text-4xl font-extrabold text-primary">
                {value}
              </p>
              <p className="text-on-surface-variant text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-28 px-6 max-w-screen-xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
            How it works
          </span>
          <h2 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface mt-3">
            Value for value.
            <br />
            <span className="text-on-surface/30">No subscriptions.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              emoji: "🎯",
              title: "Offer your expertise",
              description:
                "Create a skill session — set your topic, duration, and token price. Your knowledge has real value.",
              color: "bg-primary/5 border-primary/10",
              accent: "text-primary",
            },
            {
              step: "02",
              emoji: "🔍",
              title: "Discover & book",
              description:
                "Browse the atelier. Filter by category, cost, and availability. Book with a single click.",
              color: "bg-secondary/5 border-secondary/10",
              accent: "text-secondary",
            },
            {
              step: "03",
              emoji: "✨",
              title: "Grow together",
              description:
                "Complete the session. Tokens transfer automatically. Both sides level up.",
              color: "bg-tertiary/5 border-tertiary/10",
              accent: "text-tertiary",
            },
          ].map(({ step, emoji, title, description, color, accent }) => (
            <div
              key={step}
              className={`relative p-8 rounded-3xl border ${color} group hover:-translate-y-1 transition-transform`}
            >
              <span className={`text-6xl font-headline font-extrabold ${accent} opacity-10 absolute top-6 right-8`}>
                {step}
              </span>
              <div className="text-4xl mb-6">{emoji}</div>
              <h3 className="font-headline font-bold text-xl text-on-surface mb-3">
                {title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto relative overflow-hidden bg-on-surface rounded-[2.5rem] p-16 text-center">
          {/* Blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/30 rounded-full blur-[80px]" />

          <div className="relative z-10 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-[0.2em] uppercase">
              Ready to start?
            </span>
            <h2 className="font-headline text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Enter the Atelier.
            </h2>
            <p className="text-white/60 text-xl max-w-lg mx-auto font-body">
              Join thousands of experts already exchanging knowledge. Your first
              2 tokens are on us.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link
                href="/auth/sign-up"
                className="px-10 py-4 bg-white text-on-surface rounded-2xl font-headline font-bold text-lg hover:scale-[1.03] transition-transform shadow-xl"
              >
                Create your account
              </Link>
              <Link
                href="/explore"
                className="px-10 py-4 border border-white/20 text-white rounded-2xl font-headline font-bold text-lg hover:bg-white/5 transition-colors"
              >
                Browse skills
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
