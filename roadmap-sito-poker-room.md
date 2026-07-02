# Roadmap — Sito Poker Room Bologna
### Da zero alla pubblicazione, con fase di modernizzazione via Claude Design

> Segui le fasi in ordine. Ogni fase ha un "risultato atteso": non passare alla successiva finché non è raggiunto.

---

## Fase 0 — Prerequisiti (½ giornata)

**Cosa raccogliere dal cliente:**
- [ ] Nuovo nome ufficiale e logo in formato vettoriale (SVG preferito, altrimenti PNG ad alta risoluzione)
- [ ] Colori esatti del brand (codici HEX) o conferma che vanno estratti dal logo
- [ ] Dati aggiornati: indirizzo, telefono, email, orari, social, P.IVA/ragione sociale
- [ ] Foto del locale (se disponibili) e lista dei servizi offerti
- [ ] Elenco eventi/tornei ricorrenti con dettagli (formato, buy-in, giorni)
- [ ] URL del vecchio sito, per recuperare contenuti ancora validi (FAQ, regolamento)
- [ ] Chi sarà l'intestatario del dominio (consigliato: il cliente, non tu)

**Cosa preparare tu:**
- [ ] Account GitHub (repository del progetto)
- [ ] Claude Desktop installato, con accesso a Claude Code e Claude Design (piano Pro o superiore)
- [ ] Node.js LTS installato in locale
- [ ] Il prompt iniziale già pronto (`prompt-claude-code-poker-room_2.md`), con i placeholder compilati con i dati reali

**Risultato atteso:** hai tutti gli asset e il prompt compilato al 100%, senza placeholder.

---

## Fase 1 — Scheletro del sito con Claude Code (1–2 giorni)

1. Crea una cartella vuota per il progetto e apri Claude Code al suo interno.
2. Lancia il prompt iniziale. Per come è scritto, Claude Code prima ti proporrà **struttura delle cartelle, design token e layout delle pagine**: rivedi e conferma prima che scriva codice.
3. Fai implementare in quest'ordine:
   - layout globale (header sticky, footer con dati legali e nota gioco responsabile 18+)
   - Home con hero *statica ma strutturata per evolvere* (la versione animata arriva in Fase 3)
   - Eventi & Tornei (lista + pagina dettaglio `/eventi/[slug]`, dati da file locali in `/content`)
   - Il Locale, Contatti & Dove siamo, eventuale Regolamento/FAQ
4. Verifica che il **layer dati sia davvero astratto**: le pagine devono chiamare solo funzioni tipo `getEvents()`, mai leggere file direttamente. È la garanzia per la futura migrazione alle API di prenotazione.
5. Chiedi a Claude Code di inizializzare git e creare il repository su GitHub con il primo push.
6. Testa in locale (`npm run dev`) su viewport mobile (~375px), tablet e desktop.

**Risultato atteso:** sito completo e navigabile in locale, con contenuti reali, design pulito ma ancora "di base", codice su GitHub.

---

## Fase 2 — Deploy di staging (½ giornata)

> Conviene mettere online una versione di anteprima *prima* di rifinire il design: la userai per farla vedere al cliente e per testare su dispositivi reali.

1. Crea un account Vercel (gratuito) e collega il repository GitHub: rileva Next.js automaticamente.
2. Ottieni l'URL temporaneo `*.vercel.app` e verificalo su smartphone reale, non solo con il DevTools.
3. Fai girare Lighthouse (mobile) e annota i punteggi di partenza.
4. Condividi l'anteprima col cliente per una prima validazione di struttura e contenuti.

**Risultato atteso:** URL di anteprima funzionante, deploy automatico a ogni push, primo feedback del cliente ricevuto.

---

## Fase 3 — Modernizzazione con Claude Design (2–3 giorni)

> Questa è la fase in cui il sito passa da "corretto" a "moderno e memorabile".

1. **Onboarding del brand in Claude Design:** carica logo, colori e (se vuoi) punta Claude al codebase del progetto — costruirà un design system coerente con i token già presenti nel codice.
2. **Esplora più direzioni per la Home/hero:** chiedi 2–3 varianti (es. dark elegante, dinamica con motivi ispirati alle carte, minimale). Rifinisci con commenti inline e slider fino a scegliere la direzione.
3. **Ridisegna i componenti chiave:** hero, card evento, sezione contatti/mappa, header. Non serve ridisegnare tutto: concentrati su ciò che dà identità.
4. **Handoff a Claude Code:** quando un design è approvato, genera il bundle di handoff e passalo a Claude Code con l'istruzione di **adattarlo all'architettura esistente** (componenti in `components/sections`, colori solo via design token, nessuna duplicazione di stili).
5. **Revisiona il codice generato:** trattalo come una base di alta qualità, non come codice definitivo. Verifica responsive, accessibilità e coerenza con il resto del progetto.
6. Aggiungi ora le **animazioni**: hero animata, micro-interazioni, effetti scroll-driven con Framer Motion. Rispetta sempre `prefers-reduced-motion`.
7. Nuovo giro di feedback col cliente sull'URL di staging.

**Risultato atteso:** design distintivo e coerente col brand, hero animata, cliente che approva la versione finale.

---

## Fase 4 — Rifinitura tecnica pre-lancio (1 giorno)

- [ ] SEO: metadata per ogni pagina, Open Graph, sitemap, dati strutturati LocalBusiness (indirizzo e orari)
- [ ] Lighthouse ≥ 90 su Performance, Accessibility, Best Practices, SEO (mobile)
- [ ] Immagini ottimizzate (`next/image`, WebP/AVIF), font con `next/font`
- [ ] Test su dispositivi reali: iPhone, Android, tablet, desktop wide
- [ ] Controllo legale: nota 18+/gioco responsabile, privacy policy e cookie banner se usi analytics o mappe embed, dati societari nel footer
- [ ] Pagina 404 personalizzata
- [ ] `README.md` aggiornato: come aggiungere eventi, come cambiare i colori, note sull'architettura per la futura API

**Risultato atteso:** sito tecnicamente pronto per la produzione.

---

## Fase 5 — Dominio e messa in produzione (½ giornata)

1. **Registra il dominio** con il nuovo nome del brand (es. su Cloudflare Registrar, OVH, Register.it per il `.it`). Consiglio: intestalo al cliente ed eventualmente prendi sia `.it` che `.com`.
2. **Collega il dominio a Vercel:** aggiungilo nelle impostazioni del progetto e configura i record DNS indicati (A/CNAME). HTTPS viene attivato automaticamente.
3. Imposta il redirect da `www` al dominio principale (o viceversa, ma scegli una sola versione canonica).
4. **Vecchio sito:** se il vecchio dominio resta attivo per un po', configura redirect 301 verso il nuovo dominio per non perdere il traffico e il posizionamento esistente.
5. Verifica finale sull'URL definitivo: navigazione completa, form/link `tel:` e mappa funzionanti da mobile.

**Risultato atteso:** sito live sul dominio definitivo, HTTPS attivo, redirect configurati.

---

## Fase 6 — Post-lancio (continuativo)

- [ ] Registra il sito su Google Search Console e invia la sitemap
- [ ] Aggiorna/crea la scheda **Google Business Profile** del locale con il nuovo nome e il link al sito (fondamentale per un'attività locale)
- [ ] Aggiungi analytics rispettoso della privacy (es. Plausible/Umami, o GA4 con cookie banner)
- [ ] Definisci col cliente il flusso di aggiornamento eventi: per ora modifichi i file in `/content` e fai push (deploy automatico)
- [ ] Documenta i punti di aggancio per la **futura API prenotazioni**: quando arriverà, si reimplementa solo il layer dati (`lib/data/*`) e si compilano le variabili in `.env`

**Risultato atteso:** sito indicizzato, misurabile, aggiornabile, pronto a scalare verso la gestione prenotazioni.

---

## Timeline indicativa

| Fase | Durata | Milestone |
|------|--------|-----------|
| 0 — Prerequisiti | ½ g | Asset e prompt pronti |
| 1 — Scheletro | 1–2 g | Sito funzionante in locale + GitHub |
| 2 — Staging | ½ g | Anteprima online su Vercel |
| 3 — Claude Design | 2–3 g | Design moderno + animazioni |
| 4 — Rifinitura | 1 g | Qualità production-ready |
| 5 — Dominio & go-live | ½ g | Sito pubblicato |
| 6 — Post-lancio | — | Indicizzazione e manutenzione |

**Totale stimato: 6–8 giorni lavorativi** (esclusi i tempi di attesa del cliente per asset e feedback).
