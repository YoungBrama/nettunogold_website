import { z } from "zod";

export const NEWS_CATEGORIES = ["Risultati", "Comunicato", "Evento speciale"] as const;

export const newsSchema = z.object({
  title: z.string("Il titolo è obbligatorio").min(3, "Il titolo deve avere almeno 3 caratteri"),
  slug: z
    .string("Lo slug è obbligatorio")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lo slug può contenere solo lettere minuscole, numeri e trattini"),
  date: z
    .string("La data è obbligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La data deve essere nel formato AAAA-MM-GG"),
  category: z.enum(NEWS_CATEGORIES, `Categoria non valida. Valori ammessi: ${NEWS_CATEGORIES.join(", ")}`),
  excerpt: z.string("L'anteprima (excerpt) è obbligatoria").min(10, "L'anteprima deve avere almeno 10 caratteri"),
  body: z.array(z.string()).min(1, "Il corpo della news deve avere almeno un paragrafo"),
  image: z.string().default("/news/placeholder-news.svg"),
});

export type NewsPost = z.infer<typeof newsSchema>;
