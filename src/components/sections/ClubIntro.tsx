import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { businessInfo } from "@/lib/site-config";
import { formatNumberIt } from "@/lib/utils";

const stats = [
  { value: `${new Date().getFullYear() - businessInfo.stats.since}+`, label: "Anni di attività" },
  { value: `${formatNumberIt(businessInfo.stats.members)}+`, label: "Soci" },
  { value: `${businessInfo.stats.tournamentsPerYear}`, label: "Tornei l'anno" },
  { value: `${businessInfo.stats.tables}`, label: "Tavoli da gioco" },
];

const introText = `Nato nel ${businessInfo.stats.since}, Nettuno Gold è oggi uno dei punti di riferimento del Texas Hold'em nel bolognese: ${businessInfo.stats.areaSqm} m² di sala, ${businessInfo.stats.tables} tavoli e uno staff che segue ogni torneo dal primo all'ultimo livello.`;

export function ClubIntro() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <Container className="flex flex-col gap-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Il Club"
              title="Una casa per il poker a Bologna"
              align="left"
            />
            <p className="text-foreground/85 leading-relaxed">{introText}</p>
            <p className="text-foreground/85 leading-relaxed">
              Un ambiente elegante e curato, pensato per chi il poker lo vive con passione:
              dai tornei settimanali alle tappe della nostra serie stagionale.
            </p>
            <div>
              <Button href="/il-club" variant="secondary">
                Scopri la storia del club
              </Button>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border-subtle bg-background p-6 text-center"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-4xl text-gold-gradient">{stat.value}</dd>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
