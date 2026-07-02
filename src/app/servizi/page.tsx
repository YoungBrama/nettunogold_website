import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "La Sala e i Servizi",
  description:
    "18 tavoli da Texas Hold'em, staff professionale, bar con servizio al tavolo e tutti i servizi della sala di Nettuno Gold a Bologna.",
};

export default function ServiziPage() {
  return (
    <div className="py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="La Sala"
          title="Servizi"
          subtitle="500 m² pensati per il gioco: dai tavoli regolamentari ai comfort per giocatori e ospiti."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-6"
            >
              <ServiceIcon name={service.icon} size={28} className="text-gold" />
              <h3 className="font-display text-lg text-foreground">{service.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
