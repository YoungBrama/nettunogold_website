import { z } from "zod";
import { slugify, dateSlugSuffix } from "@/lib/slug";

export const NEWS_CATEGORIES = ["Risultati", "Comunicato", "Evento speciale"] as const;

const newsShape = z.object({
  title: z.string("Il titolo è obbligatorio").min(3, "Il titolo deve avere almeno 3 caratteri"),
  // Generato automaticamente da titolo + data se non specificato: lo staff
  // non deve mai compilarlo a mano (vedi .transform() più sotto).
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lo slug può contenere solo lettere minuscole, numeri e trattini")
    .nullable()
    .default(null),
  date: z
    .string("La data è obbligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La data deve essere nel formato AAAA-MM-GG"),
  category: z.enum(NEWS_CATEGORIES, `Categoria non valida. Valori ammessi: ${NEWS_CATEGORIES.join(", ")}`),
  excerpt: z.string("L'anteprima (excerpt) è obbligatoria").min(10, "L'anteprima deve avere almeno 10 caratteri"),
  body: z.array(z.string()).min(1, "Il corpo della news deve avere almeno un paragrafo"),
  image: z.string().default("/news/placeholder-news.svg"),
});

export const newsSchema = newsShape.transform((data) => ({
  ...data,
  slug: data.slug ?? `${slugify(data.title)}-${dateSlugSuffix(data.date)}`,
}));

export type NewsPost = z.infer<typeof newsSchema>;
