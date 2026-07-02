import type { Event } from "@/lib/schemas/event";

const event: Event = {
  title: "Torneo del Giovedì",
  slug: "torneo-del-giovedi-09-07",
  date: "2026-07-09",
  time: "20:30",
  format: "Freezeout",
  buyIn: 30,
  fee: 5,
  startingStack: 12000,
  guaranteed: 500,
  series: null,
  description:
    "L'appuntamento fisso del giovedì sera a Nettuno Gold: freezeout classico, buy-in accessibile e un piccolo garantito. Il modo migliore per iniziare la settimana di poker.",
  image: "/eventi/placeholder-torneo.svg",
  lateRegistration: "Fino al livello 7 (circa le 22:00)",
  structure: null,
};

export default event;
