"use server";

import { db } from "@/db/drizzle";
import { skills } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./Users";

export const getLatestSkills = async () => {
  try {
    const data = await db.query.skills.findMany({
      where: eq(skills.isActive, true),
      with: {
        mentor: true,
      },
      orderBy: (skills, { desc }) => [desc(skills.createdAt)],
      limit: 8,
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

export const createSkill = async (
  title: string,
  description: string,
  category: string,
  token_cost: number,
  duration: number,
  isActive: boolean,
) => {
  try {
    const { currentUser } = await getCurrentUser();

    if (!currentUser) {
      return { success: false, message: "You must be logged in" };
    }

    const [newSkill] = await db
      .insert(skills)
      .values({
        title,
        description,
        category,
        tokenCost: token_cost,
        duration,
        isActive,
        mentorId: currentUser.id,
      })
      .returning();

    revalidatePath("/explore");
    revalidatePath("/dashboard/my-skills");

    return {
      success: true,
      message: "Skill created successfully",
      skill: newSkill,
    };
  } catch (error) {
    console.error("Error creating skill:", error);
    return { success: false, message: "Failed to create skill" };
  }
};

export const getMySkills = async () => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) return { success: false, message: "Unauthorized" };

    const data = await db.query.skills.findMany({
      where: eq(skills.mentorId, currentUser.id),
      with: {
        mentor: true,
      },
    });
    return {
      success: true,
      message: "My skills fetched successfully",
      skills: data,
    };
  } catch (error) {
    console.error("Error fetching my skills:", error);
    return [];
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

export const updateSkill = async (id: string, updates: any) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) return { success: false, message: "Unauthorized" };

    // 1. Vérification de propriété
    const existingSkill = await db.query.skills.findFirst({
      where: and(eq(skills.id, id), eq(skills.mentorId, currentUser.id)),
    });

    if (!existingSkill) {
      return {
        success: false,
        message: "Skill not found or unauthorized",
      };
    }

    // 2. Nettoyage des données (évite d'écraser avec du vide ou null)
    const cleanData = Object.entries(updates).reduce(
      (acc: any, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );

    // 3. Update
    const [updatedSkill] = await db
      .update(skills)
      .set(cleanData)
      .where(eq(skills.id, id))
      .returning();

    revalidatePath(`/skills/${id}`);
    revalidatePath("/explore");

    return { success: true, skill: updatedSkill };
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
