import { config } from "dotenv";
import { neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
import ws from "ws";

config({ path: ".env" });

// Configuration pour supporter les WebSockets en environnement Node.js (Vercel/Local)
if (!process.env.VERCEL) {
  neonConfig.webSocketConstructor = ws;
}

/**
 * On utilise 'neon-serverless' au lieu de 'neon-http' pour
 * débloquer le support complet des transactions (ACID).
 */
export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  schema,
});
