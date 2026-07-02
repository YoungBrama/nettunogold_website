import type { Ranking } from "@/lib/schemas/ranking";

// Classifica della serie in corso. Aggiorna "standings" dopo ogni tappa
// e ricordati di aggiornare anche "updatedAt".
const ranking: Ranking = {
  title: "Nettuno Gold Series 2026",
  slug: "nettuno-gold-series-2026",
  seriesActive: true,
  updatedAt: "2026-06-28",
  standings: [
    { position: 1, playerName: "Marco T.", points: 0, events: 0 },
    { position: 2, playerName: "Sara B.", points: 0, events: 0 },
    { position: 3, playerName: "Luca F.", points: 0, events: 0 },
    { position: 4, playerName: "Andrea P.", points: 0, events: 0 },
    { position: 5, playerName: "Giulia R.", points: 0, events: 0 },
  ],
};

export default ranking;
