// Elenco di tutti i tornei pubblicati sul sito.
// Per aggiungere un torneo: crea il file (vedi _TEMPLATE.ts), poi aggiungi
// qui una riga di import e una riga nell'array "rawEvents" qui sotto.
// L'ordine in questo elenco non conta: la data viene ordinata automaticamente.

import deepstack0704 from "./2026-07-04-deepstack-garantito-2000";
import bounty0705 from "./2026-07-05-bounty-domenica";
import giovedi0709 from "./2026-07-09-torneo-del-giovedi";
import deepstack0711 from "./2026-07-11-deepstack-garantito-2000";
import seriesTappa1 from "./2026-07-18-nettuno-gold-series-tappa-1";
import rebuy0719 from "./2026-07-19-rebuy-domenica";
import seriesTappa2 from "./2026-07-25-nettuno-gold-series-tappa-2";
import turboAgosto from "./2026-08-01-turbo-agostano";
import satelliteFinale from "./2026-08-15-satellite-finale-series";

export const rawEvents: unknown[] = [
  deepstack0704,
  bounty0705,
  giovedi0709,
  deepstack0711,
  seriesTappa1,
  rebuy0719,
  seriesTappa2,
  turboAgosto,
  satelliteFinale,
];
