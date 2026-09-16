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

  // I singoli flight di un multi-day (Day 1A, 2B, Final Day...) non
  // compaiono qui: sono coperti dalla sezione "Multi-Day in programma" (con
  // link alla pagina della serie, che li elenca tutti). Questa lista/
  // calendario mostra solo i tornei a sé stanti.
  const standaloneEvents = upcomingEvents.filter((event) => !event.seriesSlug);

  const today = new Date().toISOString().slice(0, 10);
  const activeSeries = getAllSeries().filter((series) => series.endDate >= today);

  return (
    <>
      <PageHero eyebrow="Calendario" title="Tornei" />
      <div className="py-16 md:py-24">
        <Container className="flex flex-col gap-16">
          {activeSeries.length > 0 && (
            <div className="flex flex-col gap-6">
              <SectionTag>Multi-Day in programma</SectionTag>
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

          <div className="flex flex-col gap-6">
            <SectionTag>Tornei in Programma</SectionTag>
            <TorneiExplorer events={standaloneEvents} />
          </div>
        </Container>
      </div>
    </>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-fit rounded-full border border-gold/30 bg-surface px-4 py-1.5">
      <span className="text-xs font-medium uppercase tracking-widest text-gold">{children}</span>
    </div>
  );
}
