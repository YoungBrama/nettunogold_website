import { z } from "zod";

export const rankingEntrySchema = z.object({
  position: z.number("La posizione deve essere un numero").int().positive(),
  playerName: z.string("Il nome del giocatore è obbligatorio").min(2),
  points: z.number("I punti devono essere un numero").nonnegative(),
  events: z.number("Il numero di eventi giocati deve essere un numero").int().nonnegative().default(0),
});

export const rankingSchema = z.object({
  title: z.string("Il titolo della classifica è obbligatorio"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lo slug può contenere solo lettere minuscole, numeri e trattini"),
  seriesActive: z.boolean().default(true),
  updatedAt: z
    .string("La data di aggiornamento è obbligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La data deve essere nel formato AAAA-MM-GG"),
  standings: z.array(rankingEntrySchema).min(1, "La classifica deve avere almeno una riga"),
});

export type RankingEntry = z.infer<typeof rankingEntrySchema>;
export type Ranking = z.infer<typeof rankingSchema>;
