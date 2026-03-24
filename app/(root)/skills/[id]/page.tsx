import { getSkillById } from "@/server/Skills";
import { getCurrentUser } from "@/server/Users";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Coins,
  Star,
  ShieldCheck,
  ArrowLeft,
  Settings2,
  Edit3,
  CheckCircle2,
} from "@/components/ui/Icons";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DeleteSkillButton } from "@/components/skills/DeleteSkillButton";
import { BookingButton } from "@/components/bookings/BookingButton";
import { hasUserBookedSkill } from "@/server/Bookings";

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const skill = await getSkillById(id);

  if (!skill) notFound();

  const { currentUser } = await getCurrentUser();
  const isOwner = currentUser?.id === skill.mentorId;

  const isAlreadyBooked = currentUser
    ? await hasUserBookedSkill(currentUser.id, id)
    : false;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Navigation */}
      <Link
        href="/skills"
        className="inline-flex items-center gap-2 text-outline hover:text-primary transition-colors font-bold uppercase text-[10px] tracking-widest group"
      >
        <ArrowLeft
          size={14}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Explore
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* CONTENU (2/3) */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                {skill.category}
              </span>
              {skill.isActive && (
                <span className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available Now
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-headline font-black text-on-surface tracking-tighter italic leading-[0.9]">
              {skill.title}
            </h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-on-surface-variant leading-relaxed font-medium">
              {skill.description}
            </p>
          </div>

          {/* Learning Outcomes dynamique */}
          {skill.learningOutcomes && skill.learningOutcomes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skill.learningOutcomes.map((outcome: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 rounded-[1.5rem] bg-surface-container-low border border-outline-variant/10"
                >
                  <ShieldCheck className="text-primary shrink-0" size={20} />
                  <span className="text-sm font-bold text-on-surface leading-tight">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR DE RÉSERVATION (1/3) */}
        <div className="relative">
          <div className="sticky top-28 p-8 rounded-[3rem] bg-surface border border-outline-variant/10 shadow-2xl shadow-primary/5 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 bg-on-surface text-surface px-5 py-3 rounded-2xl">
                <Coins size={20} className="text-primary" />
                <span className="text-2xl font-headline font-black italic">
                  {skill.tokenCost}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-outline tracking-widest leading-none mb-1">
                  Duration
                </p>
                <p className="font-bold text-on-surface">
                  {skill.duration} Min
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] text-center text-outline font-bold uppercase tracking-widest opacity-60">
                Tokens are escrowed until session end
              </p>
            </div>

            <div className="h-px bg-outline-variant/10" />

            {/* Mentor Info */}
            <div className="space-y-4">
              {isOwner ? (
                <div className="space-y-4">
                  {/* Status Label */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10">
                    <Settings2 size={14} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-primary">
                      You are the mentor of this workshop
                    </span>
                  </div>

                  {/* Management Actions */}
                  <div className="grid grid-cols-1 gap-3">
                    <Link href={`/skills/${id}/edit`} className="w-full">
                      <Button className="w-full h-14 rounded-2xl bg-on-surface text-surface hover:bg-primary transition-all font-headline font-black italic tracking-tight text-lg flex items-center justify-center gap-3 group">
                        <Edit3
                          size={18}
                          className="group-hover:rotate-12 transition-transform"
                        />
                        Update Workshop
                      </Button>
                    </Link>

                    <DeleteSkillButton skillId={id} />
                  </div>
                </div>
              ) : isAlreadyBooked ? (
                <div className="space-y-4">
                  <div className="w-full h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center gap-3 font-headline font-black italic text-lg">
                    <CheckCircle2 size={20} />
                    Already Booked
                  </div>
                  <Link href="/my-sessions" className="block">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-outline-variant/20 text-[10px] font-black uppercase tracking-widest"
                    >
                      View in my bookings
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <BookingButton
                    skillId={id}
                    tokenCost={skill.tokenCost}
                    isActive={skill.isActive}
                    isLoggedIn={!!currentUser}
                  />

                  <p className="text-[10px] text-center text-outline font-bold uppercase tracking-widest opacity-60">
                    Tokens are escrowed until session end
                  </p>
                </div>
              )}
              <p className="text-[10px] font-black uppercase text-outline tracking-widest">
                Hosted by
              </p>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/10">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-primary/10">
                  <Image
                    src={skill.mentor.image || "/avatar-placeholder.png"}
                    alt={skill.mentor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface leading-none mb-1">
                    {skill.mentor.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-black">
                      {Number(skill.mentor.reputationScore).toFixed(1)} Rep
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
