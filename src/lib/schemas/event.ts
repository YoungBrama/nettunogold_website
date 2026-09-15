import { z } from "zod";

// Formati torneo ammessi. Se serve aggiungerne uno nuovo, aggiungilo qui
// (è l'unico punto da modificare per far accettare il nuovo valore).
export const EVENT_FORMATS = [
  "Freezeout",
  "Rebuy",
  "Bounty",
  "Progressive Bounty",
  "Mystery Bounty",
  "Deepstack",
  "Turbo",
  "Speed",
  "Satellite",
  "6-Handed",
  "8-Handed",
  "Pot Limit Omaha",
] as const;

export const extraFieldSchema = z.object({
  label: z.string("L'etichetta del campo extra è obbligatoria").min(1),
  value: z.string("Il valore del campo extra è obbligatorio").min(1),
});

export const blindLevelSchema = z.object({
  level: z.number("Il livello deve essere un numero").int().positive(),
  smallBlind: z.number("La small blind deve essere un numero").nonnegative(),
  bigBlind: z.number("La big blind deve essere un numero").nonnegative(),
  ante: z.number("L'ante deve essere un numero").nonnegative().default(0),
  duration: z
    .number("La durata del livello deve essere un numero (minuti)")
    .positive("La durata del livello deve essere maggiore di zero"),
});

export const eventSchema = z.object({
  title: z
    .string("Il titolo del torneo è obbligatorio")
    .min(3, "Il titolo del torneo deve avere almeno 3 caratteri"),

  slug: z
    .string("Lo slug è obbligatorio")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Lo slug può contenere solo lettere minuscole, numeri e trattini (es. 'freezeout-garantito-3000')"
    ),

  date: z
    .string("La data è obbligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La data deve essere nel formato AAAA-MM-GG (es. 2026-07-10)"),

  time: z
    .string("L'orario è obbligatorio")
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "L'orario deve essere nel formato HH:MM (es. 20:00)"),

  format: z.enum(
    EVENT_FORMATS,
    `Il formato non è valido. Valori ammessi: ${EVENT_FORMATS.join(", ")}`
  ),

  buyIn: z.number("Il buy-in deve essere un numero (in euro)").nonnegative("Il buy-in non può essere negativo"),

  fee: z.number("La fee/rake deve essere un numero (in euro)").nonnegative().nullable().default(null),

  startingStack: z
    .number("Lo stack iniziale deve essere un numero (in chips)")
    .positive("Lo stack iniziale deve essere maggiore di zero"),

  guaranteed: z
    .number("Il garantito deve essere un numero (in euro)")
    .nonnegative()
    .nullable()
    .default(null),

  // Collega questo torneo a una Serie (content/serie/): usa lo slug della
  // serie, es. "pgs-spring-edition". Se non appartiene a nessuna serie: null.
  seriesSlug: z.string().nullable().default(null),

  // Etichetta del flight dentro una serie multiday, es. "Day 1A", "Day 2C",
  // "Final Day". Ha senso solo se seriesSlug è compilato. Altrimenti: null.
  phase: z.string().nullable().default(null),

  // Località del torneo se diversa da Nettuno Gold (es. un flight satellite
  // giocato in un altro circolo/città). Se si gioca a Nettuno Gold: null.
  location: z.string().nullable().default(null),

  description: z
    .string("La descrizione è obbligatoria")
    .min(10, "La descrizione deve avere almeno 10 caratteri"),

  image: z.string().default("/eventi/placeholder-torneo.svg"),

  lateRegistration: z.string().nullable().default(null),

  structure: z.array(blindLevelSchema).nullable().default(null),

  // Informazioni aggiuntive libere, per casi non previsti dai campi sopra
  // (es. { label: "Qualifica", value: "Day 2A" }, { label: "Note", value: "Stop al 12% del field" }).
  extraFields: z.array(extraFieldSchema).default([]),
});

export type Event = z.infer<typeof eventSchema>;
export type BlindLevel = z.infer<typeof blindLevelSchema>;
export type ExtraField = z.infer<typeof extraFieldSchema>;
