import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, Timer } from "lucide-react";
import { getAllSeries, getSeriesBySlug } from "@/lib/data/series";
import { getEventsBySeriesSlug } from "@/lib/data/events";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateIt, formatDateRangeIt, formatNumberIt } from "@/lib/utils";

export function generateStaticParams() {
  return getAllSeries().map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) return {};

  return {
    title: series.title,
    description: series.description,
    openGraph: {
      title: series.title,
      description: series.description,
      images: [{ url: series.image }],
    },
  };
}

export default async function SeriePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();

  const flights = getEventsBySeriesSlug(series.slug);

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
            {series.title}
          </h1>

          <div className="relative w-full overflow-hidden rounded-lg border border-border-subtle bg-surface">
            <Image
              src={series.image}
              alt={`Locandina ${series.title}`}
              width={0}
              height={0}
              priority
              sizes="(max-width: 768px) 100vw, 672px"
              style={{ width: "100%", height: "auto" }}
              className="object-contain"
            />
          </div>

          <span className="text-center text-sm text-muted">
            {formatDateRangeIt(series.startDate, series.endDate)}
          </span>

          {series.guaranteed ? (
            <div className="rounded-lg border border-gold/40 bg-gold/10 p-5 text-center">
              <div className="text-xs uppercase tracking-widest text-gold">
                Montepremi garantito complessivo
              </div>
              <div className="mt-1 font-display text-3xl text-gold-light">
                {formatNumberIt(series.guaranteed)}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-4">
            <h2 className="font-display text-2xl text-gold-gradient">Tappe e flight</h2>

            {flights.length === 0 ? (
              <p className="text-muted">Nessuna tappa pubblicata per il momento.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {flights.map((flight) => (
                  <Link
                    key={flight.slug}
                    href={`/eventi/${flight.slug}`}
                    className="flex flex-col gap-2 rounded-lg border border-border-subtle bg-surface px-5 py-4 transition-colors hover:border-gold/50"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {flight.phase && (
                        <Badge className="border-gold-light/50 bg-gold-light/10 text-gold-light">
                          {flight.phase}
                        </Badge>
                      )}
                      <span className="font-medium text-foreground">{series.title}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={15} className="text-gold" />
                        {formatDateIt(flight.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={15} className="text-gold" />
                        {flight.time}
                      </span>
                      {flight.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={15} className="text-gold" />
                          {flight.location}
                        </span>
                      )}
                      <span>buy-in: {formatNumberIt(flight.buyIn)}</span>
                      <span>stack: {formatNumberIt(flight.startingStack)}</span>
                      {flight.levelDurationMinutes && (
                        <span className="flex items-center gap-1.5">
                          <Timer size={15} className="text-gold" />
                          {flight.levelDurationMinutes} min
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <p className="text-foreground/85 leading-relaxed whitespace-pre-line">
            {series.description}
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
