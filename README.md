# Nettuno Gold — Sito Web

Sito vetrina della poker room **Nettuno Gold** (Villanova di Castenaso, Bologna).
Next.js (App Router) + TypeScript + Tailwind CSS, contenuti (tornei, classifiche,
news) gestiti come file locali validati con Zod, pronti a migrare in futuro
verso un'API di prenotazione senza toccare le pagine.

---

## Avvio in locale

Requisiti: Node.js 20+ (consigliato) e npm.

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

Altri comandi utili:

```bash
npm run build   # build di produzione (fallisce se un contenuto non è valido)
npm run start   # avvia la build di produzione
npm run lint    # controllo qualità del codice
```

---

## Come aggiungere un nuovo torneo (nessuna competenza tecnica richiesta)

1. Vai nella cartella `content/eventi/`.
2. Copia il file `_TEMPLATE.ts` e rinomina la copia con data e nome del
   torneo, es: `2026-09-12-freezeout-garantito-3000.ts`.
3. Apri il nuovo file e compila i campi seguendo i commenti (sono scritti
   pensando a chi non programma). Non modificare i nomi a sinistra dei `:`.
4. Apri `content/eventi/index.ts` e aggiungi il tuo file: una riga di
   `import` in cima (copia lo stile delle righe già presenti) e una riga
   nell'elenco `rawEvents` più sotto.
5. Salva. Se qualcosa non va (es. un campo mancante o scritto male), al
   prossimo avvio (`npm run dev` o `npm run build`) comparirà un messaggio
   di errore **in italiano** che indica esattamente cosa correggere.
6. Fai commit e push: se il sito è collegato a Vercel (vedi roadmap), la
   pubblicazione avviene automaticamente ad ogni push.

La stessa identica procedura vale per:

- **News**: cartella `content/news/`, template `_TEMPLATE.ts`, indice `content/news/index.ts`.
- **Classifiche**: cartella `content/classifiche/`, un file per classifica (es.
  `nettuno-gold-series-2026.ts`), indice `content/classifiche/index.ts`. Per
  aggiornare i punteggi di una classifica esistente, modifica direttamente
  l'array `standings` nel suo file.

---

## Struttura del progetto

```
content/                  Contenuti "editoriali" (tornei, news, classifiche)
  eventi/                 Un file per torneo + index.ts che li elenca
  news/                   Un file per news + index.ts
  classifiche/             Un file per classifica + index.ts

src/
  app/                    Route Next.js (App Router)
    page.tsx              Home
    tornei/                Calendario tornei
    eventi/[slug]/          Scheda torneo
    il-club/, servizi/, classifiche/, news/, contatti/
    sitemap.ts, robots.ts, not-found.tsx
  components/
    ui/                   Componenti base (Button, Badge, SectionHeading...)
    layout/               Header, Footer, link di navigazione
    sections/             Blocchi di sezione della Home
    events/               Componenti specifici tornei (card, calendario, filtri)
  lib/
    schemas/              Schemi Zod: definiscono i campi validi dei contenuti
    data/                 Layer di accesso ai dati (getEvents, getNews, ...)
    site-config.ts        Dati societari e di contatto
    calendar.ts, utils.ts  Helper
```

### Il layer dati astratto

Le pagine **non leggono mai** i file in `/content` direttamente: chiamano
funzioni come `getEvents()`, `getUpcomingEvents()`, `getEventBySlug(slug)`
definite in `src/lib/data/events.ts` (stesso pattern per `news.ts` e
`rankings.ts`). Questo è intenzionale: quando in futuro arriverà il backend
di prenotazione, basterà **riscrivere queste funzioni** per chiamare le API
invece di leggere i file — nessuna pagina dovrà cambiare.

Le variabili d'ambiente per quella futura integrazione sono già previste in
[`.env.example`](.env.example) (`NEXT_PUBLIC_BOOKING_API_URL`, `BOOKING_API_KEY`).

---

## Colori e tema

Tutti i colori del brand sono definiti come CSS variable in
[`src/app/globals.css`](src/app/globals.css) (blocco `:root` e `@theme inline`,
sintassi Tailwind CSS v4):

- `--background` (#0A0A0A), `--surface` (#141414): sfondi
- `--gold`, `--gold-light`, `--gold-dark`: la palette oro del brand
- `--foreground` (avorio), `--muted` (grigio caldo): testo

Per cambiare un colore, modifica il valore lì: si applica automaticamente
a tutte le classi Tailwind (`bg-gold`, `text-gold-light`, ecc.) e alle utility
`text-gold-gradient` / `bg-gold-gradient` usate per titoli e bottoni.

I font sono caricati con `next/font` in `src/app/layout.tsx`: Cormorant
Garamond per i titoli (`font-display`), Inter per il corpo del testo.

---

## Placeholder da confermare col cliente

Questi contenuti sono segnaposto realistici, non dati reali — vanno
confermati prima della pubblicazione:

- **Orari di apertura** (`src/lib/site-config.ts`, `businessInfo.openingHours`)
- **Ragione sociale e P.IVA** (`src/lib/site-config.ts`, `legalName`, `vatNumber`)
- **Tutti i tornei, news e classifiche in `/content`**: sono esempi
  realistici per mostrare la struttura, non l'attuale calendario del locale
- **Locandine tornei e immagini news**: al momento è usata un'unica immagine
  SVG generica (`public/eventi/placeholder-torneo.svg`,
  `public/news/placeholder-news.svg`); da sostituire con le locandine grafiche
  reali dei singoli eventi
- **Testi di storia/mission/staff** in `/il-club`: riscritti in stile
  Nettuno Gold ma senza dati specifici (nomi dello staff, tappe esatte della
  storia) che andranno raccolti dal cliente
- **Logo**: nel file `.ai` fornito non era presente/estraibile una versione
  SVG vettoriale pulita; gli asset in `public/logo/` sono stati esportati
  come PNG ad alta risoluzione con trasparenza a partire dal livello PDF
  del file `.ai`. Per un risultato ottimale (icone piccole, favicon nitida
  a ogni risoluzione) sarebbe utile un vero export SVG da Illustrator.

Tutto il resto (indirizzo, telefono, email, social, numeri del club) proviene
dai dati confermati nel prompt di progetto.

---

## SEO

- Metadata per pagina (title/description) impostati in ogni `page.tsx`
- Open Graph di base in `src/app/layout.tsx`
- `sitemap.xml` e `robots.txt` generati automaticamente (`src/app/sitemap.ts`,
  `src/app/robots.ts`), includono tutte le pagine statiche + tornei + news
- Dati strutturati `LocalBusiness` (schema.org) iniettati nel layout globale

Ricorda di impostare `NEXT_PUBLIC_SITE_URL` in produzione (vedi `.env.example`).
