import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Regolamento Classifiche",
  description: "Regolamento delle classifiche e delle serie di tornei di Nettuno Gold, Bologna.",
};

const rules = [
  {
    title: "Punteggio",
    text: "Ogni torneo valido per la classifica assegna un punteggio in base al piazzamento finale e al numero di iscritti. Il dettaglio del punteggio è esposto in sala.",
  },
  {
    title: "Tornei validi",
    text: "Sono validi per la classifica generale tutti i tornei ufficiali del calendario Nettuno Gold. I tornei della Nettuno Gold Series concorrono anche alla classifica di serie dedicata.",
  },
  {
    title: "Parità di punteggio",
    text: "In caso di parità, prevale il giocatore con il maggior numero di piazzamenti a podio nella stagione; in caso di ulteriore parità, il numero di tornei disputati.",
  },
  {
    title: "Finale di stagione",
    text: "I primi classificati della Nettuno Gold Series al termine della stagione accedono alla finale, con pacchetti d'ingresso dedicati.",
  },
];

export default function RegolamentoPage() {
  return (
    <div className="py-16 md:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Classifiche"
          title="Regolamento"
          subtitle="Le regole generali di assegnazione punteggio per le classifiche di Nettuno Gold."
        />

        <div className="flex flex-col gap-6">
          {rules.map((rule) => (
            <div key={rule.title} className="rounded-lg border border-border-subtle bg-surface p-6">
              <h2 className="font-display text-xl text-gold-light">{rule.title}</h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">{rule.text}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted">
          Contenuto segnaposto: il regolamento definitivo va confermato con lo staff del
          circolo e sostituito con il testo ufficiale.
        </p>
      </Container>
    </div>
  );
}
