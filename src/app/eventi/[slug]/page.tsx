import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Coins, Layers, Timer, ArrowLeft } from "lucide-react";
import { getEventBySlug, getEvents } from "@/lib/data/events";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { formatDateIt, formatNumberIt } from "@/lib/utils";

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

  const quickStats = [
    {
      icon: Coins,
      label: "Buy-in",
      value: formatNumberIt(event.buyIn),
      highlight: true,
    },
    { icon: Layers, label: "Stack iniziale", value: formatNumberIt(event.startingStack) },
    {
      icon: Timer,
      label: "Durata livelli",
      value: event.levelDurationMinutes ? `${event.levelDurationMinutes} min` : "—",
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <Container className="flex flex-col gap-8">
        <Link
          href="/tornei"
          className="inline-flex w-fit items-center gap-2 text-sm uppercase tracking-widest text-muted hover:text-gold"
        >
          <ArrowLeft size={16} /> Torna al calendario
        </Link>

        <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
          <h1 className="text-center font-display text-3xl sm:text-4xl md:text-5xl text-gold-gradient">
            {event.title}
          </h1>

          <div className="relative w-full overflow-hidden rounded-lg border border-border-subtle bg-surface">
            <Image
              src={event.image}
              alt={`Locandina ${event.title}`}
              width={0}
              height={0}
              priority
              sizes="(max-width: 768px) 100vw, 672px"
              style={{ width: "100%", height: "auto" }}
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-center gap-8 rounded-lg border border-border-subtle bg-surface p-4">
            <span className="flex items-center gap-2 font-medium text-foreground">
              <CalendarDays size={18} className="text-gold" />
              {formatDateIt(event.date)}
            </span>
            <span className="flex items-center gap-2 font-medium text-foreground">
              <Clock size={18} className="text-gold" />
              {event.time}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className={
                  stat.highlight
                    ? "rounded-lg border border-gold/40 bg-gold/10 p-4"
                    : "rounded-lg border border-border-subtle bg-surface p-4"
                }
              >
                <stat.icon size={18} className="text-gold" />
                <div className="mt-2 text-xs uppercase tracking-widest text-muted">
                  {stat.label}
                </div>
                <div
                  className={
                    stat.highlight ? "mt-1 font-semibold text-gold-light" : "mt-1 font-medium text-foreground"
                  }
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {event.guaranteed ? (
            <div className="rounded-lg border border-gold/40 bg-gold/10 p-5 text-center">
              <div className="text-xs uppercase tracking-widest text-gold">Montepremi garantito</div>
              <div className="mt-1 font-display text-3xl text-gold-light">
                {formatNumberIt(event.guaranteed)}
              </div>
            </div>
          ) : null}

          <p className="text-foreground/85 leading-relaxed whitespace-pre-line">
            {event.description}
          </p>

          <div className="flex justify-center">
            <Button href="/tornei" size="lg">
              Altri tornei
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
