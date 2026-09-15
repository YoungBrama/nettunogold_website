import { z } from "zod";

// Una Serie rappresenta un festival/circuito multiday (es. "PGS Spring Edition",
// "The Gladiator"): raccoglie più tornei/flight (vedi campo "seriesSlug" e
// "phase" in event.ts) sotto un unico filone, con la propria pagina dedicata.
export const seriesSchema = z.object({
  title: z
    .string("Il titolo della serie è obbligatorio")
    .min(3, "Il titolo della serie deve avere almeno 3 caratteri"),

  slug: z
    .string("Lo slug è obbligatorio")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Lo slug può contenere solo lettere minuscole, numeri e trattini (es. 'pgs-spring-edition')"
    ),

  description: z
    .string("La descrizione è obbligatoria")
    .min(10, "La descrizione deve avere almeno 10 caratteri"),

  image: z.string().default("/eventi/placeholder-torneo.svg"),

  guaranteed: z
    .number("Il garantito complessivo deve essere un numero (in euro)")
    .nonnegative()
    .nullable()
    .default(null),

  startDate: z
    .string("La data di inizio è obbligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La data deve essere nel formato AAAA-MM-GG (es. 2026-07-10)"),

  endDate: z
    .string("La data di fine è obbligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La data deve essere nel formato AAAA-MM-GG (es. 2026-07-20)"),
});

export type Series = z.infer<typeof seriesSchema>;
