# Integrazione schema tornei + pannello contenuti — Riepilogo

> Documento di riepilogo del lavoro svolto sul branch `schema_integration`:
> nuovo modello dati per i tornei (singoli, multiday, serie/festival),
> passaggio dei contenuti a file JSON e integrazione di un pannello di
> amministrazione (CMS) per lo staff. Scritto per essere leggibile sia da chi
> continuerà lo sviluppo sia da chi deve capire cosa è cambiato e cosa resta
> da fare per andare in produzione.

---

## 1. Perché questo lavoro

Il circolo gestisce un calendario reale molto vario: tornei singoli
ricorrenti (Monday Club, Mid Week...), eventi speciali one-off (Opening,
Capodanno...) e **festival multiday** con più flight di Day 1 (alcuni giocati
anche in altri circoli come satelliti), Day 2 e Final Day, che devono
risultare visibilmente collegati tra loro. Il vecchio schema evento (campi
fissi, un file per torneo, `series` come semplice testo libero) non
rappresentava questa realtà. Inoltre i contenuti vivevano in file `.ts`
scritti a mano: adatti a uno sviluppatore, non a un membro dello staff senza
competenze tecniche che dovrà gestire il sito nel tempo.

Questo lavoro affronta entrambi i problemi: un modello dati che rappresenta
davvero i tornei del circolo, e un pannello web (CMS) che permette di
inserirli senza toccare codice.

---

## 2. Schema dei contenuti

Tutti i contenuti sono validati con [Zod](https://zod.dev) in
`src/lib/schemas/`: se un campo manca o è scritto male, il sito non si
pubblica e compare un messaggio d'errore in italiano che indica cosa
correggere. Di seguito lo schema di ciascun tipo di contenuto.

### 2.1 Torneo (`src/lib/schemas/event.ts`, cartella `content/eventi/`)

Ogni file rappresenta **un singolo torneo o un singolo flight** di un
festival — non esiste un "torneo multiday" come oggetto unico: un Day 1A e
il relativo Final Day sono due file distinti, collegati tramite `seriesSlug`
(vedi sotto). Questa scelta evita una struttura annidata rigida e permette
allo staff di aggiungere/rimuovere flight semplicemente creando o togliendo
un file, senza editare un array complesso.

| Campo | Tipo | Obbligatorio | Significato |
|---|---|---|---|
| `title` | testo | sì | Nome del torneo, come appare sul sito |
| `slug` | testo (`a-z0-9-`) | sì | Indirizzo web della pagina evento (`/eventi/<slug>`). **Non** è il nome del torneo: è l'URL |
| `date` | `AAAA-MM-GG` | sì | Data del torneo |
| `time` | `HH:MM` | sì | Orario |
| `format` | uno tra un elenco chiuso | sì | Regola di gioco: `Freezeout`, `Rebuy`, `Bounty`, `Progressive Bounty`, `Mystery Bounty`, `Deepstack`, `Turbo`, `Speed`, `Satellite`, `6-Handed`, `8-Handed`, `Pot Limit Omaha`. Alimenta i filtri e i colori nel calendario |
| `buyIn` | numero (euro) | sì | Buy-in |
| `fee` | numero (euro) o `null` | no | Fee/rake, se separata dal buy-in |
| `startingStack` | numero (chips) | sì | Stack iniziale |
| `guaranteed` | numero (euro) o `null` | no | Montepremi garantito di questo torneo/flight |
| `seriesSlug` | testo o `null` | no | Collega il torneo a una **Serie** (vedi 2.2), riferendosi al suo `slug`. `null` se è un evento indipendente |
| `phase` | testo o `null` | no | Etichetta del flight dentro la serie, es. `"Day 1A"`, `"Day 2C"`, `"Final Day"`. Ha senso solo insieme a `seriesSlug` |
| `location` | testo o `null` | no | Da compilare solo se il torneo si gioca **altrove** rispetto a Nettuno Gold (flight satellite in un altro circolo/città) |
| `description` | testo | sì | Descrizione mostrata nella scheda evento |
| `image` | percorso immagine | no (ha un default) | Locandina |
| `lateRegistration` | testo o `null` | no | Fino a quando ci si può iscrivere |
| `structure` | elenco di livelli o `null` | no | Struttura blind (livello, SB, BB, ante, durata) |
| `extraFields` | elenco di `{label, value}` | no (default `[]`) | **Valvola di sfogo**: informazioni non previste dai campi sopra (es. "Qualifica" → "Day 2A", "Note" → "Stop al 12% del field"), a completa discrezione dello staff |

### 2.2 Serie/Festival (`src/lib/schemas/series.ts`, cartella `content/serie/`)

Rappresenta un festival multiday (es. "PGS Spring Edition", "The Gladiator").
Non contiene l'elenco dei flight al suo interno: sono i singoli file Torneo
a "puntare" alla serie tramite `seriesSlug`. La pagina `/tornei/serie/[slug]`
recupera automaticamente tutti i flight collegati.

| Campo | Tipo | Obbligatorio | Significato |
|---|---|---|---|
| `title` | testo | sì | Nome della serie |
| `slug` | testo (`a-z0-9-`) | sì | Indirizzo web (`/tornei/serie/<slug>`) |
| `description` | testo | sì | Descrizione del festival |
| `image` | percorso immagine | no (default) | Immagine di copertina |
| `guaranteed` | numero (euro) o `null` | no | Montepremi garantito **complessivo** (quello del Final Day) |
| `startDate` | `AAAA-MM-GG` | sì | Data del primo flight |
| `endDate` | `AAAA-MM-GG` | sì | Data del Final Day |

### 2.3 News (`src/lib/schemas/news.ts`, cartella `content/news/`)

`title`, `slug`, `date`, `category` (`Risultati` | `Comunicato` |
`Evento speciale`), `excerpt`, `body` (elenco di paragrafi), `image`.
Non modificato in questo lavoro, incluso qui per completezza.

### 2.4 Classifica (`src/lib/schemas/ranking.ts`, cartella `content/classifiche/`)

`title`, `slug`, `seriesActive`, `updatedAt`, `standings` (elenco di
`{position, playerName, points, events}`). Non modificato in questo lavoro.

### 2.5 Come si vedono sul sito

- **`/tornei`**: calendario/lista dei tornei "standalone" (esclude i singoli
  flight di una serie, che affollerebbero la vista) + una sezione **"Serie e
  Festival"** con una card per ogni serie attiva.
- **`/tornei/serie/[slug]`**: pagina dedicata alla serie, con tutti i suoi
  flight in ordine cronologico (location satellite incluse).
- **`/eventi/[slug]`**: scheda completa di ogni singolo torneo/flight, con
  badge che rimanda alla serie di appartenenza se presente.

---

## 3. Content layer: da file TypeScript a JSON

**Prima**: ogni contenuto era un file `.ts` che esportava un oggetto tipato,
più un file `index.ts` per cartella con l'elenco manuale degli import (uno
step in più da ricordare a ogni nuovo contenuto, e un formato non leggibile
da un pannello CMS).

**Ora**: ogni contenuto è un file `.json` semplice. Non serve più alcun
`index.ts`: `src/lib/content-loader.ts` legge automaticamente **tutti** i
file `.json` presenti in una cartella di `content/` con `fs.readdirSync`,
uno alla volta, e li passa allo schema Zod corrispondente per la validazione
(stessa identica garanzia di prima: errori in italiano se qualcosa non va).
Questo ha due effetti:

1. **Un passaggio manuale in meno** per lo staff (niente più file indice da
   aggiornare).
2. È il formato che un pannello CMS può leggere e scrivere direttamente,
   condizione necessaria per il punto successivo.

I file toccati: `src/lib/data/events.ts`, `series.ts`, `news.ts`,
`rankings.ts` (tutti ora usano `loadRawContent(cartella)` invece di
importare un `index.ts`).

---

## 4. Pannello contenuti (CMS): Decap CMS

**Scelta**: [Decap CMS](https://decapcms.org/) invece di TinaCMS (valutato
nel piano iniziale). Motivo: Decap è un bundle statico completamente
indipendente dalla versione di Next.js/React del progetto (caricato via
script da CDN in `public/admin/index.html`), quindi zero rischio di
incompatibilità con uno stack recente come Next 16 + React 19. TinaCMS, al
contrario, si integra più a fondo nel runtime dell'app e avrebbe richiesto
verifiche di compatibilità più delicate per un guadagno equivalente.

**Cosa è stato aggiunto:**

- `public/admin/index.html` — pagina che carica il pannello.
- `public/admin/config.yml` — definisce le collection (Tornei, Serie, News,
  Classifiche) con un campo form per ognuno dei campi schema descritti sopra
  (incluso il collegamento `seriesSlug` come menu a tendina che pesca dalla
  collection Serie, e i campi ripetibili `structure`/`extraFields`/`body`/
  `standings`).
- `next.config.ts` — un rewrite per servire `/admin` (senza `.html`) al
  posto giusto (Next serve i file di `/public` solo al loro percorso
  esatto).
- `decap-server` come devDependency + script `npm run cms`, per testare il
  pannello in locale senza bisogno di login (scrive direttamente sui file).

**Come si usa in locale:**

```bash
npm run cms   # terminale 1: server locale del pannello
npm run dev   # terminale 2: sito
```

Poi apri `http://localhost:3000/admin`.

**Cosa resta da fare per l'attivazione in produzione (passo esterno, non
automatizzabile da qui):** il backend `github` configurato in `config.yml`
richiede una OAuth App GitHub e un piccolo servizio di login (Decap ne
fornisce uno pronto, deployabile su Vercel in pochi minuti — vedi la
[guida ufficiale](https://decapcms.org/docs/github-backend/)). Questo
richiede un account GitHub con permessi di amministrazione sul repository,
quindi va fatto da chi gestisce il progetto. I passaggi esatti sono
documentati anche nel `README.md`, sezione "Pannello contenuti (CMS)".

---

## 5. Stato della roadmap generale

Riferimento: `documentazione/piano-cms-e-pubblicazione.md` (non su GitHub,
solo locale) per il piano completo con costi e alternative.

| Fase | Stato | Note |
|---|---|---|
| 1 — Modello dati tornei/serie | ✅ Completa | Schema Zod, content layer, pagine `/tornei` e `/tornei/serie/[slug]` |
| 2 — Refactor content layer | ✅ Completa | JSON + lettura automatica da cartella, niente più `index.ts` |
| 3 — Integrazione CMS | ✅ Completa lato codice | Decap CMS configurato e testato in locale; **attivazione produzione è un passo esterno** (OAuth App GitHub, vedi sopra) |
| 4 — Rifinitura tecnica pre-lancio | ⏳ Parziale | SEO/metadata/sitemap/404 già presenti da prima; build e lint puliti verificati ad ogni step. Restano da fare, quando il sito sarà su un URL reale: audit Lighthouse su dispositivi reali, test cross-device, eventuale cookie banner (solo se/quando si aggiungono analytics) |
| 5 — Dominio e produzione | ⛔ Da fare (esterno) | Richiede un account Vercel del cliente/agenzia, l'acquisto di un dominio e il collegamento DNS: azioni reali con costi e credenziali che non posso eseguire da qui |
| 6 — Post-lancio | ⛔ Da fare (esterno) | Google Search Console, Google Business Profile, analytics: da fare a sito pubblicato |

**In sintesi**: tutto ciò che è codice/architettura (Fasi 1-3, con Fase 4
già in buona parte soddisfatta dall'impostazione esistente del progetto) è
stato completato e verificato con build (`npm run build`) e lint
(`npm run lint`) puliti a ogni passaggio. Le Fasi 5-6 richiedono azioni reali
(account, pagamenti, DNS) che spettano a chi gestisce il progetto — il
`README.md` e questo documento riportano i passi esatti da seguire quando si
è pronti.

---

## 6. File principali toccati in questo lavoro

```
src/lib/schemas/event.ts        campi seriesSlug, phase, location, extraFields
src/lib/schemas/series.ts        nuovo schema Serie
src/lib/content-loader.ts        nuovo: lettura generica cartelle content/*/*.json
src/lib/data/events.ts           legge JSON, nuova getEventsBySeriesSlug()
src/lib/data/series.ts           nuovo: getAllSeries(), getSeriesBySlug()
src/lib/data/news.ts             legge JSON invece di index.ts
src/lib/data/rankings.ts         legge JSON invece di index.ts

content/eventi/*.json            9 tornei di esempio migrati al nuovo schema
content/serie/*.json             1 serie di esempio
content/news/*.json              3 news migrate
content/classifiche/*.json       2 classifiche migrate

src/components/events/SeriesCard.tsx      nuovo
src/components/events/EventCard.tsx        badge serie ora passato come prop (vedi nota sotto)
src/app/tornei/page.tsx                    esclude i flight, mostra sezione Serie
src/app/tornei/serie/[slug]/page.tsx       nuova pagina serie
src/app/eventi/[slug]/page.tsx             badge serie, location, extraFields
src/app/sitemap.ts                         include le pagine serie

public/admin/index.html          nuovo: pannello CMS
public/admin/config.yml          nuovo: configurazione collection CMS
next.config.ts                   rewrite per servire /admin
package.json                     script "cms", devDependency decap-server
README.md                        procedura aggiornata (CMS + fallback manuale)
```

**Nota tecnica**: `EventCard` non risolve più da sé il titolo della serie
(non può importare il layer dati basato su `fs` perché viene usato anche
dentro un componente client per il calendario interattivo) — riceve invece
un `seriesTitle` già risolto dal componente server che lo chiama, quando
serve mostrarlo.
