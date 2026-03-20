import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "../db/drizzle";
import { schema } from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      tokenBalance: { type: "number" },
      headline: { type: "string" },
      reputationScore: { type: "string" },
      totalSessions: { type: "number" },
    },
  },

  plugins: [nextCookies()],
});
