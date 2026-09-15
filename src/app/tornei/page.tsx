import type { Metadata } from "next";
import { getUpcomingEvents } from "@/lib/data/events";
import { getAllSeries } from "@/lib/data/series";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { TorneiExplorer } from "@/components/events/TorneiExplorer";
import { SeriesCard } from "@/components/events/SeriesCard";

export const metadata: Metadata = {
  title: "Calendario Tornei",
  description:
    "Calendario dei prossimi tornei di poker a Nettuno Gold Bologna: date, buy-in, stack iniziale, formato e montepremi garantito.",
};

export default function TorneiPage() {
  const upcomingEvents = getUpcomingEvents();

  // I singoli flight di una serie/festival (Day 1A, 2B, Final Day...) non
  // affollano la lista/calendario principale: hanno una loro pagina serie
  // dedicata (vedi sezione sotto), raggiungibile anche dalla scheda del
  // singolo evento tramite il badge collegato alla serie.
  const standaloneEvents = upcomingEvents.filter((event) => !event.seriesSlug);
  const formats = Array.from(new Set(standaloneEvents.map((event) => event.format)));

  const today = new Date().toISOString().slice(0, 10);
  const activeSeries = getAllSeries().filter((series) => series.endDate >= today);

  return (
    <>
      <PageHero
        eyebrow="Calendario"
        title="Tornei"
        subtitle="Tutti i prossimi appuntamenti in sala, con dati strutturati a colpo d'occhio. Filtra per formato, oppure sfoglia il calendario mensile."
      />
      <div className="py-16 md:py-24">
        <Container className="flex flex-col gap-16">
          {activeSeries.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-2xl text-gold-gradient">Serie e Festival</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {activeSeries.map((series) => (
                  <SeriesCard
                    key={series.slug}
                    series={series}
                    flightCount={
                      upcomingEvents.filter((event) => event.seriesSlug === series.slug).length
                    }
                  />
                ))}
              </div>
            </div>
          )}

          <TorneiExplorer events={standaloneEvents} formats={formats} />
        </Container>
      </div>
    </>
  );
}
