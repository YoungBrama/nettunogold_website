import { z } from "zod";
import { slugify } from "@/lib/slug";
import { dayFieldSchema, monthFieldSchema, yearFieldSchema, isValidCalendarDate, dateFromParts } from "@/lib/schemas/date-parts";
import { optionalNumber } from "@/lib/schemas/optional-number";

export const DEFAULT_SERIES_IMAGE = "/eventi/placeholder-torneo.svg";

// Una Serie rappresenta un festival/circuito multiday (es. "PGS Spring Edition",
// "The Gladiator"): raccoglie più tornei/flight (vedi campo "seriesSlug" e
// "phase" in event.ts) sotto un unico filone, con la propria pagina dedicata.

const dateGroupSchema = (label: string) =>
  z
    .object({
      day: dayFieldSchema,
      month: monthFieldSchema,
      year: yearFieldSchema,
    })
    .refine((data) => isValidCalendarDate(Number(data.day), Number(data.month), Number(data.year)), {
      message: `La ${label} inserita non esiste nel calendario (controlla giorno e mese)`,
      path: ["day"],
    });

// Struttura a sezioni, una per ogni riquadro del pannello CMS (NOME E DATE,
// DETTAGLI, LOCANDINA, DESCRIZIONE), come per i tornei singoli.
const informazioniGroupSchema = z.object({
  title: z
    .string("Il titolo della serie è obbligatorio")
    .min(3, "Il titolo della serie deve avere almeno 3 caratteri"),

  inizio: dateGroupSchema("data di inizio"),
  fine: dateGroupSchema("data di fine"),
});

const dettagliGroupSchema = z.object({
  guaranteed: optionalNumber(z.number("Il garantito complessivo deve essere un numero (in euro)").nonnegative()),
});

const seriesShape = z.object({
  // Generato automaticamente da titolo + anno di inizio se non specificato:
  // lo staff non deve mai compilarlo a mano (vedi .transform() più sotto).
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Lo slug può contenere solo lettere minuscole, numeri e trattini (es. 'pgs-spring-edition')"
    )
    .nullable()
    .default(null),

  informazioni: informazioniGroupSchema,
  dettagli: dettagliGroupSchema.default({ guaranteed: null }),

  // Una o più locandine, mostrate incolonnate nell'ordine in cui sono state
  // aggiunte. Il pannello salva una lista vuota quando non ce ne sono: in
  // quel caso si usa quella di default (che il pannello non mostra mai).
  images: z
    .array(z.string())
    .default([])
    .transform((list) => (list.length > 0 ? list : [DEFAULT_SERIES_IMAGE])),

  // Facoltativa, come per i tornei singoli: vuota = nessuna descrizione.
  description: z
    .string()
    .nullable()
    .default(null)
    .transform((value) => (value && value.trim().length > 0 ? value : null)),
});

export const seriesSchema = seriesShape.transform((data) => {
  const startDate = dateFromParts(data.informazioni.inizio);
  const endDate = dateFromParts(data.informazioni.fine);

  return {
    title: data.informazioni.title,
    slug: data.slug ?? `${slugify(data.informazioni.title)}-${startDate.slice(0, 4)}`,
    description: data.description,
    images: data.images,
    guaranteed: data.dettagli.guaranteed,
    startDate,
    endDate,
  };
});

export type Series = z.infer<typeof seriesSchema>;
