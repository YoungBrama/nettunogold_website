import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/lib/data/services";

export function ServiziPreview() {
  const preview = services.slice(0, 6);

  return (
    <section className="bg-background py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="La Sala"
          title="Tutto quello che serve per giocare bene"
          subtitle="Uno spazio pensato nei dettagli, dalla struttura dei tavoli ai comfort per giocatori e ospiti."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((service) => (
            <div
              key={service.title}
              className="flex gap-4 rounded-lg border border-border-subtle bg-surface p-6"
            >
              <ServiceIcon name={service.icon} size={26} className="mt-1 shrink-0 text-gold" />
              <div>
                <h3 className="font-display text-lg text-foreground">{service.title}</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button href="/servizi" variant="secondary" size="lg">
            Vedi tutti i servizi
          </Button>
        </div>
      </Container>
    </section>
  );
}
