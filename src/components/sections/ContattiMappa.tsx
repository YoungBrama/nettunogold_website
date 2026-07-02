import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { businessInfo } from "@/lib/site-config";

export function ContattiMappa() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Dove siamo" title="Vieni a trovarci" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-border-subtle">
            <iframe
              title="Mappa: posizione di Nettuno Gold"
              src={businessInfo.mapEmbedSrc}
              className="h-80 w-full lg:h-full lg:min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col justify-center gap-5 rounded-lg border border-border-subtle bg-background p-8">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-gold" />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted">Indirizzo</div>
                <a
                  href={businessInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-gold-light"
                >
                  {businessInfo.address.street}, {businessInfo.address.postalCode}{" "}
                  {businessInfo.address.city} ({businessInfo.address.region})
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={20} className="mt-0.5 shrink-0 text-gold" />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted">Telefono</div>
                <a href={businessInfo.phoneHref} className="text-foreground hover:text-gold-light">
                  {businessInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle size={20} className="mt-0.5 shrink-0 text-gold" />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted">WhatsApp</div>
                <a
                  href={businessInfo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-gold-light"
                >
                  Scrivici su WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={20} className="mt-0.5 shrink-0 text-gold" />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted">Email</div>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="text-foreground hover:text-gold-light"
                >
                  {businessInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
