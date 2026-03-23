import { getMySkills } from "@/server/Skills";
import Link from "next/link";
import { Wallet, Star, CalendarCheck } from "@/components/shared/Icons";

export default async function DashboardPage() {
  const { success, data } = await getMySkills();

  if (!success || !data) {
    return <div className="p-10 text-center">Failed to load dashboard.</div>;
  }

  const { skills, bookingsAsMentor, transactions, name, tokenBalance } = data;

  const activeSkillsCount = skills.filter((s) => s.isActive).length;

  // Calcul du total gagné via les transactions réelles
  const totalEarned = transactions
    .filter((t) => t.type === "booking_credit")
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">
          Welcome back,{" "}
          <span className="text-primary">{name?.split(" ")[0]}</span> 👋
        </h1>
        <p className="text-on-surface-variant mt-1">
          Here&apos;s your atelier's performance at a glance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            label: "Active Skills",
            value: activeSkillsCount,
            sub: `${skills.length} workshops created`,
            color: "bg-primary/10 text-primary",
            icon: Star,
          },
          {
            label: "Tokens Balance",
            value: tokenBalance,
            sub: `${totalEarned} tokens earned total`,
            color: "bg-secondary/10 text-secondary",
            icon: Wallet,
          },
          {
            label: "Sessions Done",
            value: bookingsAsMentor.filter((b) => b.status === "completed")
              .length,
            sub: "as a mentor",
            color: "bg-tertiary/10 text-tertiary",
            icon: CalendarCheck,
          },
        ].map(({ label, value, sub, color, icon: Icon }) => (
          <div
            key={label}
            className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/10 shadow-sm transition-all hover:shadow-md"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color}`}
            >
              <Icon size={24} />
            </div>
            <p className="text-3xl font-headline font-extrabold text-on-surface">
              {value}
            </p>
            <p className="text-on-surface font-semibold mt-1">{label}</p>
            <p className="text-on-surface-variant text-xs mt-1 opacity-70">
              {sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Real Skills Section */}
        <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
            <h2 className="font-headline font-bold text-on-surface text-lg">
              My Workshops
            </h2>
            <Link
              href="/dashboard/skills/new"
              className="text-primary text-xs font-bold hover:underline"
            >
              + Create New
            </Link>
          </div>
          <ul className="divide-y divide-outline-variant/5">
            {skills.length > 0 ? (
              skills.slice(0, 5).map((skill) => (
                <li
                  key={skill.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-low/30 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-on-surface text-sm truncate">
                      {skill.title}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {skill.tokenCost} tokens · {skill.duration}min
                    </p>
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${skill.isActive ? "bg-primary" : "bg-outline/30"}`}
                    title={skill.isActive ? "Live" : "Draft"}
                  />
                </li>
              ))
            ) : (
              <li className="px-6 py-10 text-center text-on-surface-variant text-sm italic">
                No workshops yet.
              </li>
            )}
          </ul>
        </section>

        {/* Real Bookings Section */}
        <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant/10">
            <h2 className="font-headline font-bold text-on-surface text-lg">
              Recent Bookings
            </h2>
          </div>
          <ul className="divide-y divide-outline-variant/5">
            {bookingsAsMentor.length > 0 ? (
              bookingsAsMentor.map((booking) => (
                <li
                  key={booking.id}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-on-surface text-sm truncate">
                      {booking.skill.title}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      with {booking.learner.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        booking.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                    <p className="text-[10px] text-outline mt-1 font-medium">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-6 py-10 text-center text-on-surface-variant text-sm italic">
                No bookings yet.
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
