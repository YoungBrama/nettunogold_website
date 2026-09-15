import { getUpcomingEvents } from "@/lib/data/events";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/events/EventCard";

export function ProssimiTornei() {
  // Come in /tornei, i singoli flight di una serie non compaiono qui: hanno
  // la loro pagina serie dedicata, raggiungibile dal calendario completo.
  const events = getUpcomingEvents()
    .filter((event) => !event.seriesSlug)
    .slice(0, 4);

  return (
    <section className="bg-background py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Il cuore di Nettuno Gold"
          title="Prossimi Tornei"
          subtitle="I prossimi appuntamenti in sala. Buy-in, stack e garantito a colpo d'occhio: clicca su un torneo per la scheda completa."
        />

        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event, i) => (
              <EventCard key={event.slug} event={event} priority={i === 0} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">
            Nessun torneo programmato al momento. Torna a trovarci presto.
          </p>
        )}

        <div className="flex justify-center">
          <Button href="/tornei" variant="secondary" size="lg">
            Vedi il calendario completo
          </Button>
        </div>
      </Container>
    </section>
  );
}
