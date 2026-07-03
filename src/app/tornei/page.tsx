import type { Metadata } from "next";
import { getUpcomingEvents, getEventFormats, getEventSeries } from "@/lib/data/events";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { TorneiExplorer } from "@/components/events/TorneiExplorer";

export const metadata: Metadata = {
  title: "Calendario Tornei",
  description:
    "Calendario dei prossimi tornei di poker a Nettuno Gold Bologna: date, buy-in, stack iniziale, formato e montepremi garantito.",
};

export default function TorneiPage() {
  const events = getUpcomingEvents();
  const formats = getEventFormats();
  const series = getEventSeries();

  return (
    <>
      <PageHero
        eyebrow="Calendario"
        title="Tornei"
        subtitle="Tutti i prossimi appuntamenti in sala, con dati strutturati a colpo d'occhio. Filtra per formato, serie o buy-in, oppure sfoglia il calendario mensile."
      />
      <div className="py-16 md:py-24">
        <Container className="flex flex-col gap-12">
          <TorneiExplorer events={events} formats={formats} series={series} />
        </Container>
      </div>
    </>
  );
}
