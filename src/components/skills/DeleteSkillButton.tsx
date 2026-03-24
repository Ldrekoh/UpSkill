"use client"; // Indispensable pour le onClick

import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteSkill } from "@/server/Skills";
// import { deleteSkill } from "@/server/Skills"; // Ton action de suppression

export function DeleteSkillButton({ skillId }: { skillId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this session? This action is irreversible.",
      )
    )
      return;

    setIsLoading(true);

    const { success, message } = await deleteSkill(skillId);

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    router.push("/skills"); // On redirige vers l'exploration
    router.refresh();

    setIsLoading(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleDelete}
      disabled={isLoading}
      className="w-full h-14 rounded-2xl border-error/20 text-error hover:bg-error/5 hover:border-error/50 font-bold flex items-center justify-center gap-3 transition-colors"
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <Trash2 size={18} />
      )}
      Delete Session
    </Button>
  );
}
