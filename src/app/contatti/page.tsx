import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { businessInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contatti & Dove siamo",
  description:
    "Come raggiungere Nettuno Gold a Villanova di Castenaso (Bologna): indirizzo, telefono, WhatsApp, email e social.",
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title="Dove siamo"
        subtitle="Siamo a Villanova di Castenaso, a pochi minuti da Bologna. Scrivici o vieni a trovarci."
      />
      <div className="py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="overflow-hidden rounded-lg border border-border-subtle lg:col-span-3">
            <iframe
              title="Mappa: posizione di Nettuno Gold"
              src={businessInfo.mapEmbedSrc}
              className="h-96 w-full lg:h-full lg:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="flex flex-col gap-5 rounded-lg border border-border-subtle bg-surface p-6">
              <ContactRow icon={MapPin} label="Indirizzo">
                <a href={businessInfo.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">
                  {businessInfo.address.street}, {businessInfo.address.postalCode}{" "}
                  {businessInfo.address.city} ({businessInfo.address.region})
                </a>
              </ContactRow>

              <ContactRow icon={Phone} label="Telefono">
                <a href={businessInfo.phoneHref} className="hover:text-gold-light">
                  {businessInfo.phone}
                </a>
              </ContactRow>

              <ContactRow icon={MessageCircle} label="WhatsApp">
                <a href={businessInfo.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">
                  Scrivici su WhatsApp
                </a>
              </ContactRow>

              <ContactRow icon={Mail} label="Email">
                <a href={`mailto:${businessInfo.email}`} className="hover:text-gold-light">
                  {businessInfo.email}
                </a>
              </ContactRow>

              <ContactRow icon={Clock} label="Orari">
                <div className="flex flex-col gap-1">
                  {businessInfo.openingHours.map((slot) => (
                    <span key={slot.days}>
                      {slot.days}: {slot.hours}
                    </span>
                  ))}
                  <span className="text-xs text-muted/70">Orari indicativi, da confermare.</span>
                </div>
              </ContactRow>
            </div>

            <div className="flex gap-4">
              <a
                href={businessInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nettuno Gold su Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10"
              >
                <InstagramIcon width={20} height={20} />
              </a>
              <a
                href={businessInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nettuno Gold su Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10"
              >
                <FacebookIcon width={20} height={20} />
              </a>
            </div>
          </div>
        </div>
      </Container>
      </div>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={20} className="mt-0.5 shrink-0 text-gold" />
      <div>
        <div className="text-xs uppercase tracking-widest text-muted">{label}</div>
        <div className="text-foreground">{children}</div>
      </div>
    </div>
  );
}
