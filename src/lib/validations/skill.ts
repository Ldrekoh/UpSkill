import * as z from "zod";

export const skillSchema = z.object({
  title: z.string().min(5, "Le titre doit faire au moins 5 caractères"),
  description: z
    .string()
    .min(20, "Décrivez un peu plus votre expertise (20 car. min)"),
  category: z.string().min(1, "Choisissez une catégorie"),
  tokenCost: z.coerce.number().min(1, "Le coût doit être d'au moins 1 jeton"),
  duration: z.coerce
    .number()
    .min(15, "La session doit durer au moins 15 minutes"),
  isActive: z.boolean().default(true),
  learningOutcomes: z.array(z.string()).default([]),
});

export type SkillValues = z.infer<typeof skillSchema>;
