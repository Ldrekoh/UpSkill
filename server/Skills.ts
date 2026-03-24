"use server";

import { db } from "@/db/drizzle";
import { skills, user } from "@/db/schema";
import { and, eq, like } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./Users";
import { SkillValues } from "@/lib/validations/skill";

export const getLatestSkills = async (limit: number) => {
  try {
    const data = await db.query.skills.findMany({
      where: eq(skills.isActive, true),
      with: {
        mentor: true,
      },
      orderBy: (skills, { desc }) => [desc(skills.createdAt)],
      limit: limit,
    });
    return data;
  } catch (error) {
    console.error("Error fetching latest skills:", error);
    return [];
  }
};

export const getAllSkills = async () => {
  try {
    const data = await db.query.skills.findMany({
      with: {
        mentor: true,
      },
      orderBy: (skills, { desc }) => [desc(skills.createdAt)],
    });
    return data;
  } catch (error) {
    console.error("Error fetching all skills:", error);
    return [];
  }
};

// search skills by title
export const searchSkills = async (title: string) => {
  try {
    const data = await db.query.skills.findMany({
      where: like(skills.title, `%${title}%`),
      with: {
        mentor: true,
      },
      orderBy: (skills, { desc }) => [desc(skills.createdAt)],
    });

    return data;
  } catch (error) {
    console.error("Error searching skills:", error);
    return [];
  }
};

export const createSkill = async (values: SkillValues) => {
  try {
    const { currentUser } = await getCurrentUser();

    if (!currentUser) {
      return { success: false, message: "You must be logged in" };
    }

    // On utilise le spread operator (...) pour passer toutes les valeurs d'un coup
    // en s'assurant que les noms correspondent à ton schéma Drizzle
    const [newSkill] = await db
      .insert(skills)
      .values({
        title: values.title,
        description: values.description,
        category: values.category,
        tokenCost: values.tokenCost,
        duration: values.duration,
        isActive: values.isActive,
        learningOutcomes: values.learningOutcomes,
        mentorId: currentUser.id,
      })
      .returning();

    // Revalidation des chemins pour mettre à jour le cache Next.js
    revalidatePath("/skills");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Workshop published successfully!",
      data: newSkill,
    };
  } catch (error) {
    console.error("Error creating skill:", error);
    return {
      success: false,
      message: "Failed to create skill. Check your database constraints.",
    };
  }
};

export const getMySkills = async () => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) return { success: false, data: null }; // Changé ici

    const userData = await db.query.user.findFirst({
      where: eq(user.id, currentUser.id),
      with: {
        skills: true,
        bookingsAsMentor: {
          with: { learner: true, skill: true },
          orderBy: (bookings, { desc }) => [desc(bookings.createdAt)],
          limit: 5,
        },
        transactions: true,
      },
    });

    return {
      success: true,
      message: "My dashboard data fetched successfully",
      data: userData, // On renvoie l'objet complet sous la clé 'data'
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { success: false, data: null };
  }
};

export const getSkillById = async (id: string) => {
  try {
    const data = await db.query.skills.findFirst({
      where: eq(skills.id, id),
      with: {
        mentor: true,
      },
    });
    return data || null;
  } catch (error) {
    console.error("Error fetching skill by ID:", error);
    return null;
  }
};

export const updateSkill = async (
  id: string,
  updates: Partial<SkillValues>,
) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) return { success: false, message: "Unauthorized" };

    // 1. On vérifie la propriété et on update en une seule fois pour l'efficacité
    // Utiliser .where(and(...)) directement dans l'update est plus performant
    const [updatedSkill] = await db
      .update(skills)
      .set({
        title: updates.title,
        description: updates.description,
        category: updates.category,
        tokenCost: updates.tokenCost,
        duration: updates.duration,
        isActive: updates.isActive,
        learningOutcomes: updates.learningOutcomes,
      })
      .where(and(eq(skills.id, id), eq(skills.mentorId, currentUser.id)))
      .returning();

    if (!updatedSkill) {
      return {
        success: false,
        message: "Skill not found or you're not the owner",
      };
    }

    // 2. Revalidation précise
    revalidatePath(`/skills/${id}`);
    revalidatePath("/skills"); // Ton catalogue principal
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Workshop updated!",
      skill: updatedSkill,
    };
  } catch (error) {
    console.error("Error updating skill:", error);
    return { success: false, message: "Update failed" };
  }
};

export const deleteSkill = async (id: string) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) return { success: false, message: "Unauthorized" };

    await db
      .delete(skills)
      .where(and(eq(skills.id, id), eq(skills.mentorId, currentUser.id)));

    revalidatePath("/explore");
    return { success: true, message: "Skill deleted" };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return { success: false, message: "Delete failed" };
  }
};
