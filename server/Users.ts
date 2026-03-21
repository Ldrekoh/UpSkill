"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Si pas de session, on renvoie null proprement, SANS REDIRECT
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
