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

  const description = event.description ?? event.title;

  return {
    title: event.title,
    description,
    openGraph: {
      title: event.title,
      description,
      images: event.images.map((url) => ({ url })),
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
    event.startingStack
      ? { icon: Layers, label: "Stack iniziale", value: formatNumberIt(event.startingStack) }
      : null,
    {
      icon: Timer,
      label: "Durata livelli",
      value: event.levelDurationMinutes ? `${event.levelDurationMinutes} min` : "—",
    },
  ].filter((stat) => stat !== null);

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

          <div className="flex flex-col gap-4">
            {event.images.map((src, i) => (
              <div
                key={src + i}
                className="relative w-full overflow-hidden rounded-lg border border-border-subtle bg-surface"
              >
                <Image
                  src={src}
                  alt={`Locandina ${event.title}${event.images.length > 1 ? ` ${i + 1}` : ""}`}
                  width={0}
                  height={0}
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 672px"
                  style={{ width: "100%", height: "auto" }}
                  className="object-contain"
                />
              </div>
            ))}
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
              <div className="mt-1 font-sans text-3xl font-bold text-gold-light">
                {formatNumberIt(event.guaranteed)}
              </div>
            </div>
          ) : null}

          {event.description ? (
            <p className="text-foreground/85 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          ) : null}

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
