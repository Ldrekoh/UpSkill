import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { skills, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SkillCard } from "@/components/skills/SkillCard";
import { AvatarUpload } from "@/components/auth/AvatarUpload"; // Composant à créer
import {
  Settings,
  Mail,
  Calendar,
  Award,
  Plus,
} from "@/components/shared/Icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/server/Users";

export default async function ProfilePage() {
  const { currentUser } = await getCurrentUser();

  if (!currentUser) {
    redirect("/sign-in");
  }

  // Récupérer les skills créés par cet utilisateur
  const userSkills = await db.query.skills.findMany({
    where: eq(skills.mentorId, currentUser.id),
    orderBy: (skills, { desc }) => [desc(skills.createdAt)],
  });

  return (
    <div className="min-h-screen bg-surface-container-lowest pb-20">
      {/* Header de profil avec dégradé */}
      <div className="h-64 w-full bg-gradient-to-r from-on-surface to-surface-container-highest relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <main className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 -mt-24 relative z-10">
          {/* Sidebar: Infos Utilisateur */}
          <aside className="w-full lg:w-96 space-y-6">
            <div className="bg-surface p-8 rounded-[3rem] shadow-2xl shadow-on-surface/5 border border-outline-variant/10 text-center">
              {/* Upload d'avatar lié à Better Auth */}
              <AvatarUpload
                initialImage={currentUser.image || undefined}
                userId={currentUser.id}
              />

              <h1 className="mt-6 text-3xl font-headline font-black text-on-surface tracking-tighter">
                {currentUser.name}
              </h1>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mt-1">
                Expert Mentor
              </p>

              <div className="mt-8 space-y-4 text-left border-t border-outline-variant/10 pt-8">
                <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                  <Mail size={16} className="text-outline" />
                  <span>{currentUser.email}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                  <Award size={16} className="text-outline" />
                  <span>
                    Reputation:{" "}
                    <span className="text-on-surface font-bold">4.9/5</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                  <Calendar size={16} className="text-outline" />
                  <span>
                    {new Date(currentUser.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-10 rounded-2xl border-outline-variant/20 gap-2 font-bold group"
              >
                <Settings
                  size={16}
                  className="group-hover:rotate-90 transition-transform"
                />
                Edit Profile
              </Button>
            </div>

            {/* Stats Rapides */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 text-center">
                <p className="text-2xl font-black text-primary">
                  {userSkills.length}
                </p>
                <p className="text-[10px] uppercase font-bold text-primary/60">
                  Skills
                </p>
              </div>
              <div className="bg-secondary/5 p-6 rounded-[2rem] border border-secondary/10 text-center">
                <p className="text-2xl font-black text-secondary">24</p>
                <p className="text-[10px] uppercase font-bold text-secondary/60">
                  Sessions
                </p>
              </div>
            </div>
          </aside>

          {/* Zone Principale: Mes Skills */}
          <section className="flex-1 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-headline font-black text-on-surface tracking-tighter">
                  My{" "}
                  <span className="text-primary italic font-serif">
                    Workshop.
                  </span>
                </h2>
                <p className="text-on-surface-variant font-medium">
                  Manage your active mentorship listings.
                </p>
              </div>

              <Link href="/skills/new">
                <Button className="bg-on-surface text-surface hover:bg-primary rounded-2xl px-6 h-14 font-bold shadow-xl flex gap-2 transition-all">
                  <Plus size={20} />
                  New Skill
                </Button>
              </Link>
            </div>

            {/* Grid des Skills de l'utilisateur */}
            {userSkills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {userSkills.map((skill) => (
                  <div key={skill.id} className="relative group">
                    <SkillCard skill={skill} />
                    {/* Badge "Owner" optionnel */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-lg"
                      >
                        <Settings size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-surface-container-low rounded-[3rem] border-2 border-dashed border-outline-variant/20">
                <div className="bg-surface-container-highest w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award size={32} className="text-outline" />
                </div>
                <h3 className="text-2xl font-black text-on-surface tracking-tight mb-2">
                  No active skills yet
                </h3>
                <p className="text-outline max-w-xs mx-auto mb-8">
                  Ready to share your craft? Start by creating your first
                  workshop session.
                </p>
                <Link href="/skills/new">
                  <Button
                    variant="link"
                    className="text-primary font-black uppercase text-xs tracking-widest"
                  >
                    Create my first skill →
                  </Button>
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
