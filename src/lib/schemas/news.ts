import { z } from "zod";
import { slugify, dateSlugSuffix } from "@/lib/slug";
import { dayFieldSchema, monthFieldSchema, yearFieldSchema, isValidCalendarDate, dateFromParts } from "@/lib/schemas/date-parts";

export const NEWS_CATEGORIES = ["Risultati", "Comunicato", "Evento speciale"] as const;

export const DEFAULT_NEWS_IMAGE = "/news/placeholder-news.svg";

// Struttura a sezioni, una per ogni riquadro del pannello CMS (TITOLO E DATA,
// DETTAGLI, IMMAGINI, TESTO), come per tornei e series.
const notiziaGroupSchema = z
  .object({
    title: z.string("Il titolo è obbligatorio").min(3, "Il titolo deve avere almeno 3 caratteri"),
    day: dayFieldSchema,
    month: monthFieldSchema,
    year: yearFieldSchema,
  })
  .refine((data) => isValidCalendarDate(Number(data.day), Number(data.month), Number(data.year)), {
    message: "La data inserita non esiste nel calendario (controlla giorno e mese)",
    path: ["day"],
  });

const dettagliGroupSchema = z.object({
  category: z.enum(NEWS_CATEGORIES, `Categoria non valida. Valori ammessi: ${NEWS_CATEGORIES.join(", ")}`),
  excerpt: z.string("L'anteprima (excerpt) è obbligatoria").min(10, "L'anteprima deve avere almeno 10 caratteri"),
});

const newsShape = z.object({
  // Generato automaticamente da titolo + data se non specificato: lo staff
  // non deve mai compilarlo a mano (vedi .transform() più sotto).
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lo slug può contenere solo lettere minuscole, numeri e trattini")
    .nullable()
    .default(null),
  notizia: notiziaGroupSchema,
  dettagli: dettagliGroupSchema,
  // Una o più immagini, mostrate incolonnate nell'ordine in cui sono state
  // aggiunte. Lista vuota = immagine di default (che il pannello non mostra).
  images: z
    .array(z.string())
    .default([])
    .transform((list) => (list.length > 0 ? list : [DEFAULT_NEWS_IMAGE])),
  body: z.array(z.string()).min(1, "Il corpo della news deve avere almeno un paragrafo"),
});

export const newsSchema = newsShape.transform((data) => {
  const date = dateFromParts(data.notizia);

  return {
    title: data.notizia.title,
    slug: data.slug ?? `${slugify(data.notizia.title)}-${dateSlugSuffix(date)}`,
    date,
    category: data.dettagli.category,
    excerpt: data.dettagli.excerpt,
    body: data.body,
    images: data.images,
  };
});

export type NewsPost = z.infer<typeof newsSchema>;
