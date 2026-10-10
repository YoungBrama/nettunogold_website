import { z } from "zod";
import { slugify, dateSlugSuffix } from "@/lib/slug";
import { dayFieldSchema, monthFieldSchema, yearFieldSchema, isValidCalendarDate } from "@/lib/schemas/date-parts";
import { optionalNumber } from "@/lib/schemas/optional-number";

const torneoGroupSchema = z
  .object({
    title: z
      .string("Il titolo del torneo è obbligatorio")
      .min(3, "Il titolo del torneo deve avere almeno 3 caratteri"),

    day: dayFieldSchema,
    month: monthFieldSchema,
    year: yearFieldSchema,

    time: z
      .string("L'orario è obbligatorio")
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "L'orario deve essere nel formato HH:MM (es. 20:00)"),
  })
  .refine((data) => isValidCalendarDate(Number(data.day), Number(data.month), Number(data.year)), {
    message: "La data inserita non esiste nel calendario (controlla giorno e mese)",
    path: ["day"],
  });

const serieGroupSchema = z.object({
  // Collega questo torneo a una Serie (content/serie/): usa lo slug della
  // serie, es. "pgs-spring-edition". Se non appartiene a nessuna serie: null.
  seriesSlug: z.string().nullable().default(null),

  // Etichetta del flight dentro una serie multiday, es. "Day 1A", "Day 2C",
  // "Final Day". Ha senso solo se seriesSlug è compilato. Altrimenti: null.
  phase: z.string().nullable().default(null),
});

const dettagliGroupSchema = z.object({
  buyIn: z.number("Il buy-in deve essere un numero (in euro)").nonnegative("Il buy-in non può essere negativo"),

  guaranteed: optionalNumber(z.number("Il garantito deve essere un numero (in euro)").nonnegative()),

  startingStack: optionalNumber(
    z.number("Lo stack iniziale deve essere un numero (in chips)").positive("Lo stack iniziale deve essere maggiore di zero")
  ),

  // Durata di un livello di blind, in minuti (dato rapido mostrato nella
  // scheda torneo). Se non nota/variabile: null.
  levelDurationMinutes: optionalNumber(
    z.number("La durata dei livelli deve essere un numero (minuti)").int().positive()
  ),
});

const eventShape = z.object({
  // Generato automaticamente da titolo + data se non specificato: lo staff
  // non deve mai compilarlo a mano (vedi .transform() più sotto).
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Lo slug può contenere solo lettere minuscole, numeri e trattini (es. 'freezeout-garantito-3000')"
    )
    .nullable()
    .default(null),

  torneo: torneoGroupSchema,
  serie: serieGroupSchema.default({ seriesSlug: null, phase: null }),
  dettagli: dettagliGroupSchema,

  description: z
    .string()
    .nullable()
    .default(null)
    .transform((value) => (value && value.trim().length > 0 ? value : null)),

  // Una o più locandine: mostrate incolonnate, nell'ordine in cui sono
  // state aggiunte, nella scheda torneo.
  images: z
    .array(z.string())
    .min(1, "Serve almeno un'immagine")
    .default(["/eventi/placeholder-torneo.svg"]),
});

export const eventSchema = eventShape.transform((data) => {
  const date = `${data.torneo.year}-${data.torneo.month}-${data.torneo.day}`;

  return {
    title: data.torneo.title,
    slug: data.slug ?? `${slugify(data.torneo.title)}-${dateSlugSuffix(date)}`,
    date,
    time: data.torneo.time,
    buyIn: data.dettagli.buyIn,
    guaranteed: data.dettagli.guaranteed,
    startingStack: data.dettagli.startingStack,
    levelDurationMinutes: data.dettagli.levelDurationMinutes,
    seriesSlug: data.serie.seriesSlug,
    phase: data.serie.phase,
    description: data.description,
    images: data.images,
  };
});

export type Event = z.infer<typeof eventSchema>;
