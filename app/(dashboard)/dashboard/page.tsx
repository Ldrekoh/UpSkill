import { getMySkills } from "@/server/Skills";
import { getCurrentUser } from "@/server/Users";
import Link from "next/link";

export default async function DashboardPage() {
  const { currentUser } = await getCurrentUser();
  // On utilise 'skills' en minuscule pour correspondre à ton action serveur
  const { skills = [] } = await getMySkills();

  const activeSkillsCount = skills.filter((s) => s.isActive).length;

  const totalTokensEarned = skills.reduce(
    (acc, s) => acc + (s.tokenCost ?? 0),
    0,
  );

  // Bookings statiques (à brancher plus tard)
  const recentBookings = [
    {
      id: "1",
      skill: "Brand Identity Design",
      learner: "Alex M.",
      date: "2026-03-18",
      status: "completed",
      tokens: 2,
    },
    {
      id: "2",
      skill: "Next.js Performance",
      learner: "Sofia R.",
      date: "2026-03-20",
      status: "upcoming",
      tokens: 1,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">
          Welcome back,{" "}
          <span className="text-primary">
            {currentUser?.name?.split(" ")[0]}
          </span>{" "}
          👋
        </h1>
        <p className="text-on-surface-variant mt-1">
          Here&apos;s what&apos;s happening in your atelier today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            label: "Active Skills",
            value: activeSkillsCount,
            sub: `${skills.length} total published`, // Correction ici (skills vs Skill)
            color: "bg-primary/10 text-primary",
            emoji: "🎯",
          },
          {
            label: "Tokens Balance",
            value: currentUser?.tokenBalance ?? 0,
            sub: `${totalTokensEarned} potential earned`,
            color: "bg-secondary/10 text-secondary",
            emoji: "🪙",
          },
          {
            label: "Sessions Done",
            value: recentBookings.filter((b) => b.status === "completed")
              .length,
            sub: "all time",
            color: "bg-tertiary/10 text-tertiary",
            emoji: "✅",
          },
        ].map(({ label, value, sub, color, emoji }) => (
          <div
            key={label}
            className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 ${color}`}
            >
              {emoji}
            </div>
            <p className="text-3xl font-headline font-extrabold text-on-surface">
              {value}
            </p>
            <p className="text-on-surface font-semibold mt-0.5">{label}</p>
            <p className="text-on-surface-variant text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Skills Section */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10 bg-surface-container-low/30">
            <h2 className="font-headline font-bold text-on-surface text-lg">
              My Skills
            </h2>
            <Link
              href="/dashboard/skills/new"
              className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:scale-[1.02] transition-transform"
            >
              + New Skill
            </Link>
          </div>

          {skills.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-4xl mb-3">🎓</p>
              <p className="font-headline font-bold text-on-surface text-sm">
                No skills yet
              </p>
              <Link
                href="/dashboard/skills/new"
                className="mt-4 inline-block text-primary text-sm font-bold hover:underline"
              >
                Create your first workshop
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-outline-variant/10">
              {skills.slice(0, 4).map((skill) => (
                <li
                  key={skill.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-low/50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-on-surface text-sm truncate">
                      {skill.title}
                    </p>
                    <p className="text-on-surface-variant text-xs mt-0.5">
                      {skill.tokenCost} tokens · {skill.duration}min
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      skill.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {skill.isActive ? "Live" : "Draft"}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {skills.length > 4 && (
            <div className="px-6 py-3 border-t border-outline-variant/10 text-center">
              <Link
                href="/dashboard/skills"
                className="text-xs font-bold text-outline hover:text-primary transition-colors"
              >
                View all workshops →
              </Link>
            </div>
          )}
        </section>

        {/* Recent Bookings Section */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant/10 bg-surface-container-low/30">
            <h2 className="font-headline font-bold text-on-surface text-lg">
              Upcoming Sessions
            </h2>
          </div>
          <ul className="divide-y divide-outline-variant/10">
            {recentBookings.map((booking) => (
              <li
                key={booking.id}
                className="px-6 py-4 hover:bg-surface-container-low/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-bold text-on-surface text-sm truncate">
                      {booking.skill}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      with{" "}
                      <span className="text-primary font-medium">
                        {booking.learner}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-on-surface">
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-[10px] text-outline uppercase font-bold tracking-tighter">
                      {booking.status}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
