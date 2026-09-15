import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { getAllSeries, getSeriesBySlug } from "@/lib/data/series";
import { getEventsBySeriesSlug } from "@/lib/data/events";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { formatDateIt, formatEuro } from "@/lib/utils";

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
                src={series.image}
                alt={`Locandina ${series.title}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-3">
            <Badge className="w-fit border-gold-light/50 bg-gold-light/10 text-gold-light">
              Serie/Festival
            </Badge>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-gold-gradient">
              {series.title}
            </h1>

            <p className="max-w-2xl text-foreground/85 leading-relaxed">{series.description}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={16} className="text-gold" />
                {formatDateIt(series.startDate)} – {formatDateIt(series.endDate)}
              </span>
            </div>

            {series.guaranteed ? (
              <div className="rounded-lg border border-gold/40 bg-gold/10 p-5">
                <div className="text-xs uppercase tracking-widest text-gold">
                  Montepremi garantito complessivo
                </div>
                <div className="mt-1 font-display text-3xl text-gold-light">
                  {formatEuro(series.guaranteed)}
                </div>
              </div>
            ) : null}
          </div>
        </div>

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
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border-subtle bg-surface px-5 py-4 transition-colors hover:border-gold/50"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    {flight.phase && (
                      <Badge className="border-gold-light/50 bg-gold-light/10 text-gold-light">
                        {flight.phase}
                      </Badge>
                    )}
                    <Badge>{flight.format}</Badge>
                    <span className="font-medium text-foreground">{flight.title}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
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
                    <span>{formatEuro(flight.buyIn)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
