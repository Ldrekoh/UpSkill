import { getSkillById } from "@/server/Skills";
import { getCurrentUser } from "@/server/Users";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookSessionButton } from "@/components/skills/BookSessionButton";
import Image from "next/image";
import { ReviewForm } from "@/components/review/forms/ReviewForm";

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconClock = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconCoin = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="8" r="6" />
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" />
  </svg>
);

const IconStar = ({ filled }: { filled?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconTag = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const IconArrowLeft = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconVerified = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const getInitials = (name = "U") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

// Avis statiques — à remplacer par une vraie table reviews plus tard
const MOCK_REVIEWS = [
  {
    id: "1",
    author: "Camille D.",
    rating: 5,
    date: "2026-03-10",
    body: "Session incroyable, très bien structurée. J'ai appris plus en 90 minutes qu'en des semaines de tutos YouTube.",
  },
  {
    id: "2",
    author: "Lucas M.",
    rating: 4,
    date: "2026-03-05",
    body: "Mentor très disponible, pédagogue et précis. Je recommande sans hésiter à quiconque veut progresser rapidement.",
  },
  {
    id: "3",
    author: "Sarah K.",
    rating: 5,
    date: "2026-02-28",
    body: "La meilleure session que j'ai bookée sur la plateforme. Qualité pro, réponses claires à toutes mes questions.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-yellow-500">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-outline/30"}
        >
          <IconStar filled={i <= rating} />
        </span>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function SkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [skill, { currentUser }] = await Promise.all([
    getSkillById(id),
    getCurrentUser(),
  ]);

  if (!skill) notFound();

  const avgRating =
    MOCK_REVIEWS.reduce((acc, r) => acc + r.rating, 0) / MOCK_REVIEWS.length;

  const mentor = skill.mentor;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-inverse-surface">
        {/* Blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-secondary/20 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-10 pb-16">
          {/* Back */}
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">
              <IconArrowLeft />
            </span>
            <span className="text-sm font-medium">Back to Explore</span>
          </Link>

          {/* Category badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-bold uppercase tracking-widest">
              <IconTag />
              {skill.category}
            </span>
            {skill.isActive && (
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-fixed-dim text-xs font-bold uppercase tracking-widest">
                Available
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] max-w-3xl">
            {skill.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-white/60">
              <IconClock />
              <span className="text-sm font-medium">{skill.duration} min</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <IconCoin />
              <span className="text-sm font-medium">
                {skill.tokenCost} token{skill.tokenCost > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-white/40 text-sm">
                {avgRating.toFixed(1)} ({MOCK_REVIEWS.length} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Left col : description + reviews ──────────────────────────── */}
        <div className="lg:col-span-2 space-y-12">
          {/* Description */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">
              About this session
            </h2>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              {skill.description}
            </p>
          </section>

          {/* What you'll learn — placeholder structuré */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-6 italic font-serif">
              What you&apos;ll learn
            </h2>

            {skill.learningOutcomes && skill.learningOutcomes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skill.learningOutcomes.map((item, index) => (
                  <div
                    key={index} // On utilise l'index car les phrases peuvent être similaires
                    className="flex items-start gap-4 p-5 rounded-[2rem] bg-surface-container-low border border-outline-variant/5 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                      <span className="text-[14px] font-black">✓</span>
                    </div>
                    <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* État de repli si aucun point n'est renseigné */
              <div className="p-8 rounded-[2rem] border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center text-center">
                <p className="text-outline text-sm italic">
                  No specific learning outcomes listed for this workshop yet.
                </p>
              </div>
            )}
          </section>

          {/* Reviews */}
          {/*<section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-2xl font-bold text-on-surface">
                Reviews
              </h2>
              <div className="flex items-center gap-2">
                <StarRating rating={Math.round(avgRating)} />
                <span className="font-headline font-bold text-on-surface">
                  {avgRating.toFixed(1)}
                </span>
                <span className="text-on-surface-variant text-sm">/ 5</span>
              </div>
            </div>

            <div className="space-y-4">
              {MOCK_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {getInitials(review.author)}
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface text-sm">
                          {review.author}
                        </p>
                        <p className="text-on-surface-variant text-xs">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {review.body}
                  </p>
                </div>
              ))}
            </div>
          </section>*/}
        </div>

        {/* ── Right col : booking card + mentor ─────────────────────────── */}
        <div className="space-y-6">
          {/* Booking card (sticky) */}
          <div className="sticky top-8 space-y-6">
            <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/10 shadow-lg overflow-hidden">
              {/* Price header */}
              <div className="bg-inverse-surface px-6 py-5">
                <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-1">
                  Session price
                </p>
                <div className="flex items-end gap-2">
                  <p className="font-headline text-4xl font-extrabold text-white">
                    {skill.tokenCost}
                  </p>
                  <p className="text-white/60 mb-1 font-medium">
                    token{skill.tokenCost > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="px-6 py-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <IconClock /> Duration
                  </span>
                  <span className="font-semibold text-on-surface">
                    {skill.duration} min
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <IconTag /> Category
                  </span>
                  <span className="font-semibold text-on-surface">
                    {skill.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant">Format</span>
                  <span className="font-semibold text-on-surface">
                    1-on-1 live session
                  </span>
                </div>

                <div className="pt-2">
                  <BookSessionButton
                    skillId={id}
                    tokenCost={skill.tokenCost}
                    isAuthenticated={!!currentUser}
                    userBalance={currentUser?.tokenBalance ?? 0}
                  />
                </div>

                <p className="text-center text-xs text-outline leading-relaxed">
                  Tokens are transferred only after session completion.
                </p>
              </div>
            </div>

            {/* Mentor card */}
            {mentor && (
              <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/10 p-6 space-y-4">
                <h3 className="font-headline font-bold text-on-surface text-sm uppercase tracking-widest">
                  Your Mentor
                </h3>

                <div className="flex items-center gap-4">
                  {mentor.image ? (
                    <Image
                      width={40} // Correspond à w-10 (10 * 4px)
                      height={40} // Correspond à h-10
                      src={mentor.image}
                      alt={mentor.name ?? "Mentor"}
                      className=" rounded-full object-cover border-2 border-primary/10"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {getInitials(mentor.name ?? undefined)}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-headline font-bold text-on-surface">
                        {mentor.name}
                      </p>
                      <span className="text-primary">
                        <IconVerified />
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-xs mt-0.5">
                      Verified Expert
                    </p>
                  </div>
                </div>

                {mentor.bio && (
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {mentor.bio}
                  </p>
                )}

                <div className="pt-4 border-t border-outline-variant/5 mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-black tracking-widest text-outline">
                        Reputation
                      </span>
                      {/* On affiche le nombre de sessions si tu l'as, sinon un label */}
                      <span className="text-[10px] font-medium text-on-surface-variant italic">
                        {Number(mentor.totalSessions) > 0
                          ? `${mentor.totalSessions} workshops completed`
                          : "New Mentor"}
                      </span>
                    </div>
                    <div className="">
                      <ReviewForm bookingId={mentor.id} />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                        <StarRating rating={Number(mentor.reputationScore)} />
                        <span className="font-headline font-black text-amber-600 text-sm leading-none mt-0.5">
                          {Number(mentor.reputationScore).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
