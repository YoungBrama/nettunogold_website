// ============================================================================
// TEMPLATE EVENTO — Nettuno Gold
// ============================================================================
// COME AGGIUNGERE UN NUOVO TORNEO (nessuna conoscenza di programmazione richiesta):
//
// 1. Fai una COPIA di questo file nella stessa cartella "content/eventi".
// 2. Rinomina la copia con la data e il nome del torneo, tutto minuscolo,
//    parole separate da trattini. Esempio: "2026-09-12-freezeout-garantito-3000.ts"
// 3. Compila i valori tra virgolette (o i numeri) qui sotto, seguendo i
//    commenti riga per riga. NON toccare i nomi dei campi a sinistra dei ":"
// 4. Apri il file "content/eventi/index.ts" e aggiungi UNA riga per il tuo
//    nuovo file, seguendo l'esempio già presente (import + aggiunta all'elenco).
// 5. Salva e pubblica (vedi il README.md nella cartella principale del sito
//    per la procedura completa passo-passo).
//
// Se un campo è sbagliato o mancante, il sito NON si pubblica e ti verrà
// mostrato un messaggio di errore in italiano che spiega cosa correggere.
// ============================================================================

import type { Event } from "@/lib/schemas/event";

const event: Event = {
  // Nome del torneo, come deve apparire sul sito.
  title: "Nome del Torneo",

  // Identificativo unico usato nell'indirizzo web della pagina evento.
  // Solo lettere minuscole, numeri e trattini. Deve essere DIVERSO per ogni evento.
  // Diventerà: nettunogold.it/eventi/nome-del-torneo
  slug: "nome-del-torneo",

  // Data del torneo, formato ANNO-MESE-GIORNO (con gli zeri davanti se serve).
  date: "2026-01-01",

  // Orario di inizio iscrizioni/torneo, formato ORE:MINUTI (24 ore).
  time: "20:00",

  // Formato di gioco. Scrivi ESATTAMENTE uno di questi valori:
  // "Freezeout" | "Rebuy" | "Bounty" | "Progressive Bounty" | "Deepstack" | "Turbo" | "Satellite"
  format: "Freezeout",

  // Buy-in in euro, solo numero (senza simbolo €). Esempio: 50
  buyIn: 50,

  // Fee/rake in euro (facoltativo). Se non c'è, scrivi: null
  fee: null,

  // Stack iniziale in chips, solo numero. Esempio: 20000
  startingStack: 20000,

  // Montepremi garantito in euro, solo numero. Se non garantito, scrivi: null
  guaranteed: null,

  // Nome della serie di appartenenza (facoltativo), es. "Nettuno Gold Series".
  // Se non appartiene a una serie, scrivi: null
  series: null,

  // Breve descrizione del torneo (qualche riga), mostrata nella scheda evento.
  description: "Descrizione del torneo: formato, punti di interesse, eventuali novità.",

  // Percorso dell'immagine/locandina. Se non hai un'immagine dedicata, lascia
  // il placeholder di default (già impostato automaticamente se ometti il campo).
  image: "/eventi/placeholder-torneo.svg",

  // Fino a quando ci si può iscrivere/rientrare (facoltativo, testo libero).
  // Esempio: "Fino al livello 8 (circa le 22:30)". Se non applicabile: null
  lateRegistration: null,

  // Struttura livelli (facoltativa). Se non la conosci ancora, lascia: null
  // Altrimenti compila un elenco così per ogni livello:
  // { level: 1, smallBlind: 25, bigBlind: 50, ante: 0, duration: 20 },
  structure: null,
};

export default event;
