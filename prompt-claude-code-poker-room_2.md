# Prompt iniziale per Claude Code — Ricostruzione sito Poker Room

> Brand, design, obiettivi e struttura sono definiti (Nettuno Gold, scheletro derivato da theclubpokerbologna.com). Restano da compilare solo i placeholder tra parentesi quadre [COSÌ]: email, social nuovi, orari e dati societari.

---

## Contesto del progetto

Devo ricostruire da zero il sito web di una poker room di Bologna, Italia. Il locale ha cambiato nome e brand: il vecchio sito, attualmente online su **https://www.theclubpokerbologna.com/** (WordPress/Elementor, one-page con sezioni: The Club/storia, Servizi, Mission, Staff, Classifiche, Prossimi Eventi, News, Contatti), va completamente sostituito. Lo scheletro di partenza può ricalcare quella struttura di sezioni, ma ogni parte va ripensata e migliorata.

## ⭐ OBIETTIVI PRIORITARI — lo scopo di tutto il progetto

Questi tre obiettivi hanno priorità su ogni altra scelta. In caso di dubbio o trade-off, decidi sempre a favore di questi.

### 1. I tornei sono il cuore del sito
Sul vecchio sito la sezione "Prossimi Eventi" è solo uno slideshow di locandine cliccabili che rimandano a blogpost. **Questo è il difetto principale da correggere.** Nel nuovo sito la sezione tornei deve essere la parte più importante, curata e visibile:
- Un **widget interattivo stile calendario/agenda** degli eventi: vista mensile o settimanale con i tornei sui rispettivi giorni, più una vista lista "prossimi tornei" ordinata per data. Su mobile il calendario deve degradare elegantemente (es. agenda verticale scorrevole), mai una griglia illeggibile.
- Ogni evento nel calendario mostra a colpo d'occhio i **dati strutturati**: nome, data e ora, buy-in, stack iniziale, formato (freezeout/rebuy/bounty...), montepremi garantito, eventuale serie di appartenenza. Click/tap apre la pagina di dettaglio (`/eventi/[slug]`) con struttura livelli e info complete — non un blogpost, una scheda evento vera.
- Filtri semplici (per formato, per buy-in, per serie) se il volume di eventi lo giustifica (~150 tornei/anno).
- La Home dà **massima evidenza ai prossimi 3–4 tornei** subito dopo la hero, con CTA verso il calendario completo.
- Le locandine grafiche degli eventi restano come immagine *dentro* la scheda evento, non come unico veicolo dell'informazione.

### 2. Gestione eventi in autonomia da parte di non-sviluppatori
Non sarò io a gestire il sito nel tempo. Chi lo amministrerà non è uno sviluppatore, quindi:
- **Da subito:** definisci uno **schema evento rigoroso con campi predefiniti** (title, slug, date, time, buyIn, startingStack, format, guaranteed, series, description, image, ...) validato con Zod. Gli eventi vivono come file in `/content/eventi/` con struttura autoesplicativa; fornisci un file `_TEMPLATE` commentato campo per campo da duplicare, e fai fallire la build con messaggi di errore chiari e in italiano se un campo è invalido o mancante.
- Documenta nel `README.md` la procedura "aggiungi un torneo" passo-passo, scritta per una persona non tecnica.
- **In una fase successiva** (non ora, ma l'architettura deve prevederlo): un'interfaccia di amministrazione semplice — un form con i campi predefiniti — tramite CMS headless leggero o mini pannello admin. Lo schema Zod definito oggi diventerà il contratto di quel form e delle future API di prenotazione: progettalo bene.

### 3. Partire dallo scheletro del vecchio sito, poi migliorarlo
Riprendi l'organizzazione dei contenuti del vecchio sito (che funziona a livello informativo) modernizzandola: storia del club, servizi, mission, staff, classifiche, eventi, news/risultati, contatti. Non copiare il design né il layout: ricostruisci tutto secondo il nuovo brand Nettuno Gold e i requisiti di questo documento.

**Nuovo brand: NETTUNO GOLD**

Descrizione del logo (file allegato: `logo-nettuno-gold` — richiedere versione SVG se disponibile):
- Emblema circolare in **oro metallico** su **sfondo nero pieno (solid black)**. Il tratto è interamente monocromatico oro, con gradiente metallico che va da un oro profondo/bronzeo nelle zone d'ombra a un giallo-oro brillante nei punti di luce, simulando l'effetto di metallo lucidato.
- Al centro del cerchio, la figura di **Nettuno** (dio del mare), rappresentato a mezzo busto in stile inciso/silhouette dorata: capelli e barba fluenti, torso muscoloso, che emerge da **onde stilizzate** a linee concentriche nella parte bassa del cerchio.
- Nettuno impugna un **tridente** verticale che rompe intenzionalmente il perimetro del cerchio, estendendosi oltre il bordo superiore — dettaglio dinamico che dà slancio verso l'alto alla composizione. Accanto al tridente, un ricciolo d'onda decorativo.
- Sotto l'emblema, il wordmark **"NETTUNO"** in caratteri serif maiuscoli eleganti (stile classico/lapidario, con grazie sottili), anch'esso in gradiente oro. Sotto, in corpo più piccolo, la parola **"GOLD"** in maiuscolo spaziato, affiancata da due linee orizzontali dorate a mo' di fregio.
- Impressione complessiva: **lusso, classicità mediterranea, prestigio** — un'identità imponente e premium, perfetta per un dark theme elegante.

Palette colori derivata dal logo (design token di partenza, raffinabili in fase di proposta):
- `background`: nero pieno `#0A0A0A` (base del sito), con variante `#141414` per superfici sollevate (card, header)
- `gold` (accento primario): `#C9A227`
- `gold-light` (highlight, hover, gradienti): `#F0C75E`
- `gold-dark` (ombre, bordi, gradienti): `#8C6A1D`
- Gradiente firma del brand: lineare da `gold-dark` → `gold` → `gold-light`, da usare per titoli display, bordi decorativi e CTA principali (con parsimonia: l'oro deve restare prezioso, non invadente)
- `foreground`: avorio/bianco caldo `#F5F0E6` per il testo su fondo scuro (evitare bianco puro, stona con l'oro)
- `muted`: grigio caldo `#9A948A` per testo secondario

Tono del brand: **elegante, premium, classico ma moderno**. Dark theme obbligatorio come base. L'oro è l'unico colore d'accento: niente colori aggiuntivi se non i neutri.

**Dati del locale (ripresi dal vecchio sito — da confermare col cliente, soprattutto quelli legati al vecchio nome):**
- Indirizzo: Via Toscanini 7/2, 40055 Villanova di Castenaso (BO)
- Telefono / WhatsApp: +39 347 495 1601
- Email: nettunogold@gmail.com
- Social: [Instagram : nettuno_gold : https://www.instagram.com/nettuno_gold/ / Facebook : NETTUNO GOLD BOLOGNA : https://www.facebook.com/groups/59628730776/ ]
- Numeri utili per i copy: circolo attivo dal 2007, ~2.000 soci, ~150 tornei l'anno, area di 500 m², 18 tavoli, fino a 180 giocatori in contemporanea [verificare che restino validi col rebrand]

## Obiettivo

Un sito vetrina moderno, veloce e facile da navigare, che presenta il locale, i tornei e gli eventi. Oggi non serve un vero backend (contenuti quasi statici), ma l'architettura deve essere pronta a scalare: in futuro il sito si collegherà ad API per la gestione delle prenotazioni tramite un'applicazione dedicata.

## Stack tecnico richiesto

- **Framework:** Next.js (App Router) con TypeScript. Motivazione: oggi posso esportare/renderizzare pagine statiche velocissime, domani posso aggiungere route API, server actions e fetch verso il backend prenotazioni senza cambiare stack.
- **Styling:** Tailwind CSS, con i colori del brand definiti come design token nel tema (`tailwind.config` / CSS variables), così tutto il sito è tematizzato in modo coerente e ricolorabile in un punto solo.
- **Animazioni:** predisponi Framer Motion (o Motion One) fin da ora, ma usalo con moderazione: transizioni leggere, micro-interazioni. La struttura della hero deve essere pensata per poter evolvere in una hero animata e reattiva allo scroll (parallax / scroll-driven animations) senza rifare il layout.
- **Contenuti:** eventi, classifiche e news vivono come file locali strutturati in `/content`, validati da **schemi Zod con campi predefiniti** (vedi Obiettivo 2), e letti tramite un layer di accesso dati astratto (es. `lib/data/events.ts` con funzioni tipo `getEvents()`, `getUpcomingEvents()`, `getEventBySlug()`). Questo layer domani verrà reimplementato per chiamare le API di prenotazione o un CMS: le pagine non devono cambiare.
- Niente CMS e niente database per ora.

## Struttura del sito

> Scheletro derivato dal vecchio sito, riorganizzato con i tornei al centro.

1. **Home** — hero d'impatto con emblema Nettuno Gold e CTA ("Calendario tornei", "Come raggiungerci"); subito dopo la hero, la sezione **Prossimi Tornei** (i 3–4 eventi più vicini, con dati strutturati in evidenza e link al calendario completo — vedi Obiettivo 1); poi presentazione breve del club con i numeri (soci, tornei/anno, tavoli), anteprima servizi, sezione contatti/mappa.
2. **Tornei** (`/tornei`) — **la pagina più importante del sito**: widget calendario/agenda interattivo + vista lista, filtri, e pagine di dettaglio evento (`/eventi/[slug]`) con scheda strutturata (buy-in, stack, formato, garantito, struttura livelli, locandina).
3. **Il Club** — storia (dal 2007, con le tappe principali), mission, staff (dealer e floorman professionisti, tournament director). Riscrivi i testi del vecchio sito adattandoli al nuovo brand, non copiarli parola per parola.
4. **Servizi / La Sala** — lista reale dal vecchio sito: 18 tavoli da Texas Hold'em, staff professionale, software gestione tornei, ampia zona bar con servizio al tavolo, wifi gratuito, 5 monitor, videosorveglianza (32 telecamere), aria condizionata, zona relax esterna, ampio parcheggio. Presentala con icone/griglia curata, non un elenco piatto.
5. **Classifiche** — sezione presente sul vecchio sito e importante per i soci: classifica della serie in corso e classifica generale. Per ora contenuto statico/aggiornabile via content layer (stesso pattern degli eventi: schema + file), in futuro alimentabile via API. Include link al **Regolamento**.
6. **News / Risultati** — brevi post sui risultati dei tornei (chipcount, vincitori), come le news del vecchio sito ma con template pulito. Anche queste come content file con schema dedicato.
7. **Contatti & Dove siamo** — mappa (embed Google Maps o link), indirizzo, telefono e WhatsApp cliccabili (`tel:` / `wa.me`), email, Telegram, social.
8. Footer con dati legali, P.IVA, link social, e nota su gioco responsabile (obbligatoria per il settore in Italia: includi riferimento al gioco vietato ai minori di 18 anni).

## Requisiti di design

- **Mobile-first, poi desktop:** la maggior parte degli utenti arriverà da mobile. Ogni sezione va progettata prima per viewport ~375px e poi estesa fino a desktop wide (1440px+). Testa i breakpoint intermedi (tablet).
- Menu di navigazione: header sticky con hamburger menu su mobile (drawer/overlay accessibile), nav orizzontale su desktop.
- Design moderno e all'avanguardia ma leggibile: gerarchia tipografica chiara, spaziature generose, contrasto sufficiente (WCAG AA), touch target di almeno 44px su mobile.
- **Dark theme come base, non negoziabile:** sfondo nero pieno con accenti oro, coerente con l'identità Nettuno Gold. Attenzione al contrasto: l'oro `#C9A227` su nero è adeguato per titoli e elementi grandi, ma per testo di corpo usa il `foreground` avorio; verifica sempre WCAG AA.
- **Direzione estetica:** lusso sobrio. L'oro va dosato — titoli display con gradiente dorato, sottili bordi/divisori dorati, CTA primaria oro su nero (testo scuro su bottone oro per il contrasto), tutto il resto in neutri. Evita l'effetto "casinò kitsch": niente oro a tappeto, niente glow eccessivi.
- **Richiami tematici discreti al brand:** pattern di onde stilizzate (come quelle del logo) utilizzabili come texture decorativa di sezione o divisori; il tridente/emblema può ispirare icone e bullet custom. La hero della Home mette in scena l'emblema Nettuno Gold su nero come elemento centrale, con spazio pensato per la futura versione animata (es. onde in movimento, parallax dell'emblema allo scroll).
- Tipografia coerente col wordmark: un **serif elegante per i display/titoli** (es. Cormorant Garamond, Playfair Display o simile via `next/font`) abbinato a un **sans-serif pulito per corpo e UI** (es. Inter). Maiuscolo spaziato (letter-spacing ampio) per label e sottotitoli, richiamando il trattamento di "GOLD" nel logo.
- Immagini ottimizzate con `next/image`, lazy loading, formati moderni (WebP/AVIF).
- Rispetta `prefers-reduced-motion` per tutte le animazioni.

## Requisiti tecnici e qualità

- SEO di base: metadata per pagina, Open Graph, sitemap, dati strutturati (LocalBusiness schema.org con indirizzo e orari).
- Lighthouse target: 90+ su Performance, Accessibility, Best Practices, SEO (mobile).
- Codice organizzato in componenti riutilizzabili (`components/ui`, `components/sections`), niente logica duplicata.
- Predisponi un file `README.md` con: istruzioni di avvio, come aggiungere/modificare un evento nel content layer, come cambiare i colori del tema, e note sull'architettura pensata per la futura integrazione API.
- Prepara anche un file `.env.example` vuoto ma commentato con le variabili che serviranno in futuro (es. `NEXT_PUBLIC_BOOKING_API_URL`).

## Come procedere

1. Prima di scrivere codice, proponimi: struttura delle cartelle, design token derivati dai colori del logo, e una breve descrizione del layout di ogni pagina. Aspetta la mia conferma.
2. Poi implementa il progetto pagina per pagina, partendo da layout globale + Home.
3. Usa contenuti segnaposto realistici in italiano dove non ti ho dato dati reali, e segnalami chiaramente ogni punto in cui hai usato un placeholder.
