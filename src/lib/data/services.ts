// Elenco servizi della sala. Contenuto quasi statico, ripreso dal vecchio
// sito e riorganizzato in griglia. "icon" è il nome di un'icona lucide-react.

export type Service = {
  icon:
    | "Grid3x3"
    | "Users"
    | "MonitorPlay"
    | "Coffee"
    | "Wifi"
    | "Tv"
    | "ShieldCheck"
    | "Snowflake"
    | "Sofa"
    | "ParkingCircle";
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: "Grid3x3",
    title: "18 tavoli da Texas Hold'em",
    description: "Sala principale con 18 tavoli regolamentari, fino a 180 giocatori in contemporanea.",
  },
  {
    icon: "Users",
    title: "Staff professionale",
    description: "Dealer, floorman e tournament director qualificati per la gestione di ogni evento.",
  },
  {
    icon: "MonitorPlay",
    title: "Software gestione tornei",
    description: "Struttura livelli, chip count e classifiche gestiti con software dedicato.",
  },
  {
    icon: "Coffee",
    title: "Zona bar con servizio al tavolo",
    description: "Ampia area bar interna, con servizio direttamente al tavolo di gioco.",
  },
  {
    icon: "Wifi",
    title: "Wi-Fi gratuito",
    description: "Connessione gratuita disponibile in tutta la sala.",
  },
  {
    icon: "Tv",
    title: "5 monitor in sala",
    description: "Aggiornamenti in tempo reale su tavoli, chip count e prossimi break.",
  },
  {
    icon: "ShieldCheck",
    title: "Videosorveglianza",
    description: "32 telecamere per la sicurezza di giocatori e struttura.",
  },
  {
    icon: "Snowflake",
    title: "Aria condizionata",
    description: "Clima controllato in tutti gli ambienti, tutto l'anno.",
  },
  {
    icon: "Sofa",
    title: "Zona relax esterna",
    description: "Spazio esterno dedicato alle pause tra un livello e l'altro.",
  },
  {
    icon: "ParkingCircle",
    title: "Ampio parcheggio",
    description: "Parcheggio gratuito riservato ai clienti del locale.",
  },
];
