import type { NewsPost } from "@/lib/schemas/news";

const post: NewsPost = {
  title: "Nuovi monitor in sala per seguire i tavoli in tempo reale",
  slug: "nuovi-monitor-in-sala",
  date: "2026-06-10",
  category: "Comunicato",
  excerpt:
    "Aggiornato il sistema di gestione tornei: da oggi chip count e tavoli aggiornati in tempo reale sui monitor della sala.",
  body: [
    "Continua l'aggiornamento tecnologico della sala di Nettuno Gold: il software di gestione tornei è stato collegato ai monitor distribuiti nel locale, così da mostrare in tempo reale chip count, tavoli attivi e prossimi break.",
    "L'obiettivo è rendere l'esperienza in sala più comoda per i giocatori, che potranno controllare a colpo d'occhio la propria posizione in classifica durante il torneo.",
  ],
  image: "/news/placeholder-news.svg",
};

export default post;
