import type { Event } from "@/lib/schemas/event";

const event: Event = {
  title: "Deepstack Garantito 2.000€",
  slug: "deepstack-garantito-2000-04-07",
  date: "2026-07-04",
  time: "19:30",
  format: "Deepstack",
  buyIn: 80,
  fee: 10,
  startingStack: 30000,
  guaranteed: 2000,
  series: null,
  description:
    "Il weekend di Nettuno Gold parte con uno stack profondo e un montepremi garantito da 2.000€. Struttura pensata per chi ama il gioco post-flop e i tavoli finali combattuti.",
  image: "/eventi/placeholder-torneo.svg",
  lateRegistration: "Fino al livello 10 (circa le 22:00)",
  structure: [
    { level: 1, smallBlind: 50, bigBlind: 100, ante: 0, duration: 25 },
    { level: 2, smallBlind: 100, bigBlind: 200, ante: 0, duration: 25 },
    { level: 3, smallBlind: 150, bigBlind: 300, ante: 300, duration: 25 },
    { level: 4, smallBlind: 200, bigBlind: 400, ante: 400, duration: 25 },
    { level: 5, smallBlind: 300, bigBlind: 600, ante: 600, duration: 25 },
  ],
};

export default event;
