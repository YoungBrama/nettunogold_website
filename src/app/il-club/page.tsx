import type { Metadata } from "next";
import { Trophy, Target, Users2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { businessInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Il Club",
  description:
    "La storia di Nettuno Gold, poker room di Bologna dal 2007: mission, valori e lo staff che rende possibile ogni torneo.",
};

const milestones = [
  {
    year: businessInfo.stats.since,
    title: "Le origini",
    text: "Apre le porte il circolo che oggi conosciamo come Nettuno Gold: pochi tavoli, una community di appassionati e la voglia di fare del poker un punto di riferimento cittadino.",
  },
  {
    year: businessInfo.stats.since + 6,
    title: "Crescita della sala",
    text: "La sala si amplia fino agli attuali 18 tavoli, con l'introduzione di uno staff dedicato alla gestione dei tornei e delle serate a tema.",
  },
  {
    year: 2026,
    title: "Nasce Nettuno Gold",
    text: "Il circolo cambia identità e diventa Nettuno Gold: nuovo brand, nuovo sito, stessa community di quasi 2.000 soci e la stessa cura per ogni torneo.",
  },
];

const values = [
  {
    icon: Trophy,
    title: "Competenza",
    text: "Tornei gestiti da tournament director con anni di esperienza, per un gioco corretto e trasparente.",
  },
  {
    icon: Target,
    title: "Cura del dettaglio",
    text: "Dalla struttura livelli alla sala, ogni aspetto del torneo è pensato per l'esperienza del giocatore.",
  },
  {
    icon: Users2,
    title: "Community",
    text: "Quasi 2.000 soci: un club prima ancora che una sala da gioco, con eventi e serie stagionali dedicate.",
  },
  {
    icon: ShieldCheck,
    title: "Sicurezza",
    text: "Sala videosorvegliata e gioco regolamentato, per un ambiente affidabile in ogni torneo.",
  },
];

const staffRoles = [
  {
    role: "Tournament Director",
    text: "Coordina la struttura di ogni torneo, dalle blind ai regolamenti, garantendo il rispetto delle regole in ogni fase di gioco.",
  },
  {
    role: "Floorman",
    text: "Presente in sala durante tutto il torneo per gestire dispute, ruling e organizzazione dei tavoli.",
  },
  {
    role: "Dealer Team",
    text: "Squadra di dealer professionisti, formati per garantire ritmo di gioco e correttezza a ogni tavolo.",
  },
];

export default function IlClubPage() {
  return (
    <div className="py-16 md:py-24">
      <Container className="flex flex-col gap-20">
        <SectionHeading
          eyebrow="Dal 2007"
          title="Il Club"
          subtitle="La storia, la mission e le persone che ogni giorno rendono Nettuno Gold un punto di riferimento per il poker a Bologna."
        />

        {/* Storia */}
        <div className="flex flex-col gap-8">
          <h2 className="font-display text-2xl md:text-3xl text-gold-gradient">La nostra storia</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {milestones.map((m) => (
              <div key={m.title} className="rounded-lg border border-border-subtle bg-surface p-6">
                <div className="font-display text-3xl text-gold-light">{m.year}</div>
                <GoldDivider className="my-3 !mx-0 w-12" />
                <h3 className="text-lg text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="flex flex-col gap-8">
          <h2 className="font-display text-2xl md:text-3xl text-gold-gradient">La nostra mission</h2>
          <p className="max-w-3xl text-foreground/85 leading-relaxed">
            Offrire il miglior ambiente possibile per giocare a Texas Hold&apos;em a Bologna:
            tornei organizzati con rigore, uno staff sempre presente e una sala pensata per
            far sentire ogni giocatore a proprio agio, dal primo buy-in al tavolo finale.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg border border-border-subtle bg-surface p-6">
                <v.icon size={24} className="text-gold" />
                <h3 className="mt-3 text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Staff */}
        <div className="flex flex-col gap-8">
          <h2 className="font-display text-2xl md:text-3xl text-gold-gradient">Il nostro staff</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {staffRoles.map((s) => (
              <div key={s.role} className="rounded-lg border border-border-subtle bg-surface p-6">
                <h3 className="font-display text-xl text-gold-light">{s.role}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
