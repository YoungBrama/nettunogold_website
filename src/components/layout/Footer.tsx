import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { navLinks } from "./nav-links";
import { businessInfo } from "@/lib/site-config";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo/nettuno-gold-emblem-180.png"
                alt="Emblema Nettuno Gold"
                width={180}
                height={202}
                className="h-11 w-auto"
              />
              <span className="font-display text-xl text-gold-gradient">
                NETTUNO GOLD
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Poker room a Villanova di Castenaso, Bologna. Dal {businessInfo.foundedYear},
              tornei di Texas Hold&apos;em quasi ogni giorno.
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href={businessInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nettuno Gold su Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10"
              >
                <InstagramIcon width={18} height={18} />
              </a>
              <a
                href={businessInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nettuno Gold su Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10"
              >
                <FacebookIcon width={18} height={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Il sito
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/classifiche/regolamento"
                  className="text-sm text-muted hover:text-gold transition-colors"
                >
                  Regolamento
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Contatti
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <a href={businessInfo.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  {businessInfo.address.street}, {businessInfo.address.postalCode}{" "}
                  {businessInfo.address.city} ({businessInfo.address.region})
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href={businessInfo.phoneHref} className="hover:text-gold">
                  {businessInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-gold" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-gold">
                  {businessInfo.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Orari
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {businessInfo.openingHours.map((slot) => (
                <li key={slot.days} className="flex justify-between gap-4">
                  <span>{slot.days}</span>
                  <span className="text-foreground/80">{slot.hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted/70">
              Orari indicativi, da confermare — placeholder in attesa di dati definitivi.
            </p>
          </div>
        </div>

        <div className="divider-gold my-10" aria-hidden="true" />

        <div className="rounded border border-gold/20 bg-background/60 p-4 text-xs leading-relaxed text-muted">
          <p>
            <strong className="text-gold-light">Gioco vietato ai minori di 18 anni.</strong>{" "}
            Il gioco può causare dipendenza patologica. Osserva le probabilità di vincita
            indicate nei regolamenti dei singoli tornei. Per informazioni sul gioco
            responsabile e per un supporto in caso di ludopatia consulta il sito del
            Ministero della Salute o rivolgiti ai servizi ASL del territorio.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-muted/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {businessInfo.legalName} — P.IVA {businessInfo.vatNumber}
          </p>
          <p className="text-muted/50">
            Dati societari indicativi (placeholder): da confermare col cliente.
          </p>
        </div>
      </Container>
    </footer>
  );
}
