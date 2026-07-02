import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Coins, Layers, Timer, ArrowLeft } from "lucide-react";
import { getEventBySlug, getEvents } from "@/lib/data/events";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateIt, formatEuro } from "@/lib/utils";

export function generateStaticParams() {
  return getEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [{ url: event.image }],
    },
  };
}

export default async function EventoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const stats = [
    { icon: CalendarDays, label: "Data", value: formatDateIt(event.date) },
    { icon: Clock, label: "Orario", value: event.time },
    { icon: Coins, label: "Buy-in", value: formatEuro(event.buyIn) },
    { icon: Layers, label: "Stack iniziale", value: event.startingStack.toLocaleString("it-IT") },
  ];

  return (
    <div className="py-12 md:py-20">
      <Container className="flex flex-col gap-10">
        <Link
          href="/tornei"
          className="inline-flex w-fit items-center gap-2 text-sm uppercase tracking-widest text-muted hover:text-gold"
        >
          <ArrowLeft size={16} /> Torna al calendario
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border-subtle">
              <Image
                src={event.image}
                alt={`Locandina ${event.title}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-3">
            <div className="flex flex-wrap gap-2">
              <Badge>{event.format}</Badge>
              {event.series && (
                <Badge className="border-gold-light/50 bg-gold-light/10 text-gold-light">
                  {event.series}
                </Badge>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-gold-gradient">
              {event.title}
            </h1>

            <p className="max-w-2xl text-foreground/85 leading-relaxed">{event.description}</p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border-subtle bg-surface p-4"
                >
                  <stat.icon size={18} className="text-gold" />
                  <div className="mt-2 text-xs uppercase tracking-widest text-muted">
                    {stat.label}
                  </div>
                  <div className="mt-1 font-medium text-foreground">{stat.value}</div>
                </div>
              ))}
            </div>

            {event.guaranteed ? (
              <div className="rounded-lg border border-gold/40 bg-gold/10 p-5">
                <div className="text-xs uppercase tracking-widest text-gold">Montepremi garantito</div>
                <div className="mt-1 font-display text-3xl text-gold-light">
                  {formatEuro(event.guaranteed)}
                </div>
              </div>
            ) : null}

            {event.lateRegistration && (
              <div className="flex items-center gap-2 text-sm text-muted">
                <Timer size={16} className="text-gold" />
                Late registration: {event.lateRegistration}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/contatti" size="lg">
                Prenota il tuo posto
              </Button>
              <Button href="/tornei" variant="secondary" size="lg">
                Altri tornei
              </Button>
            </div>
          </div>
        </div>

        {event.structure && event.structure.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-2xl text-gold-gradient">Struttura livelli</h2>
            <div className="overflow-x-auto rounded-lg border border-border-subtle">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-surface text-xs uppercase tracking-widest text-muted">
                  <tr>
                    <th className="px-4 py-3">Livello</th>
                    <th className="px-4 py-3">Small Blind</th>
                    <th className="px-4 py-3">Big Blind</th>
                    <th className="px-4 py-3">Ante</th>
                    <th className="px-4 py-3">Durata</th>
                  </tr>
                </thead>
                <tbody>
                  {event.structure.map((level) => (
                    <tr key={level.level} className="border-t border-border-subtle">
                      <td className="px-4 py-3 text-gold-light">{level.level}</td>
                      <td className="px-4 py-3">{level.smallBlind.toLocaleString("it-IT")}</td>
                      <td className="px-4 py-3">{level.bigBlind.toLocaleString("it-IT")}</td>
                      <td className="px-4 py-3">{level.ante ? level.ante.toLocaleString("it-IT") : "—"}</td>
                      <td className="px-4 py-3">{level.duration} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted">
              Struttura indicativa dei primi livelli; consulta lo staff in sala per i livelli successivi.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
