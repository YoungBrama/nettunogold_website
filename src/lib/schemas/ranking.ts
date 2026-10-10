import { z } from "zod";
import { slugify } from "@/lib/slug";
import { dayFieldSchema, monthFieldSchema, yearFieldSchema, isValidCalendarDate, dateFromParts } from "@/lib/schemas/date-parts";

export const rankingEntrySchema = z.object({
  position: z.number("La posizione deve essere un numero").int().positive(),
  playerName: z.string("Il nome del giocatore è obbligatorio").min(2),
  points: z.number("I punti devono essere un numero").nonnegative(),
  events: z.number("Il numero di eventi giocati deve essere un numero").int().nonnegative().default(0),
});

// Struttura a sezioni, una per ogni riquadro del pannello CMS (NOME E DATA,
// CLASSIFICA), come per tornei e series. La data è quella di ultimo
// aggiornamento della classifica.
const classificaGroupSchema = z
  .object({
    title: z.string("Il titolo della classifica è obbligatorio").min(3, "Il titolo deve avere almeno 3 caratteri"),
    day: dayFieldSchema,
    month: monthFieldSchema,
    year: yearFieldSchema,
    seriesActive: z.boolean().default(true),
  })
  .refine((data) => isValidCalendarDate(Number(data.day), Number(data.month), Number(data.year)), {
    message: "La data inserita non esiste nel calendario (controlla giorno e mese)",
    path: ["day"],
  });

const rankingShape = z.object({
  // Generato automaticamente dal titolo se non specificato: lo staff non
  // deve mai compilarlo a mano (vedi .transform() più sotto).
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lo slug può contenere solo lettere minuscole, numeri e trattini")
    .nullable()
    .default(null),
  classifica: classificaGroupSchema,
  standings: z.array(rankingEntrySchema).min(1, "La classifica deve avere almeno una riga"),
});

export const rankingSchema = rankingShape.transform((data) => ({
  title: data.classifica.title,
  slug: data.slug ?? slugify(data.classifica.title),
  seriesActive: data.classifica.seriesActive,
  updatedAt: dateFromParts(data.classifica),
  standings: data.standings,
}));

export type RankingEntry = z.infer<typeof rankingEntrySchema>;
export type Ranking = z.infer<typeof rankingSchema>;
