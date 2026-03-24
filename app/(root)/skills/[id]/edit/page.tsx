// app/(root)/skills/[id]/edit/page.tsx
import { getSkillById } from "@/server/Skills";
import { SkillForm } from "@/components/skills/SkillForm";
import { notFound } from "next/navigation";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await getSkillById(id);

  if (!skill) notFound();

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-headline font-black italic mb-8">
        Update your <span className="text-primary">Craft.</span>
      </h1>
      {/* Tu passes les données existantes au formulaire */}
      <SkillForm initialData={skill} />
    </div>
  );
}
