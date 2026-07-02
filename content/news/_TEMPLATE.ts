// ============================================================================
// TEMPLATE NEWS — Nettuno Gold
// ============================================================================
// Copia questo file, rinominalo (es. "2026-09-01-vincitore-torneo-x.ts"),
// compila i campi e aggiungilo a "content/news/index.ts" (import + elenco).
// ============================================================================

import type { NewsPost } from "@/lib/schemas/news";

const post: NewsPost = {
  title: "Titolo della news",
  slug: "titolo-della-news",
  date: "2026-01-01",
  // Una di: "Risultati" | "Comunicato" | "Evento speciale"
  category: "Risultati",
  excerpt: "Una riga di anteprima mostrata nell'elenco news.",
  // Un paragrafo per ogni riga dell'array.
  body: [
    "Primo paragrafo della news.",
    "Secondo paragrafo, se serve.",
  ],
  image: "/news/placeholder-news.svg",
};

export default post;
