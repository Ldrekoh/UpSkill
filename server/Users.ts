"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import path from "path";

export const getCurrentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { session: null, currentUser: null };
    }

    const currentUser = await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
    });

    return {
      session,
      currentUser: currentUser ?? null,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return { session: null, currentUser: null };
  }
};
export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Signed up successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};

export async function uploadAvatarAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return { success: false, error: "Unauthorized" };

  const file = formData.get("avatar") as File;
  if (!file) return { success: false, error: "No file" };

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // OPTION A : Stockage Local (uniquement pour test/dev)
    // En prod, utilise un client S3 ici.
    const fileName = `avatar-${session.user.id}-${Date.now()}.${file.name.split(".").pop()}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(filePath, buffer);
    const publicUrl = `/uploads/${fileName}`;

    // Mise à jour Better Auth / Database
    await db
      .update(user)
      .set({ image: publicUrl })
      .where(eq(user.id, session.user.id));

    revalidatePath("/profile");
    return { success: true, url: publicUrl };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Upload failed" };
  }
}
