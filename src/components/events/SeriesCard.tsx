import Link from "next/link";
import Image from "next/image";
import { CalendarRange, Coins } from "lucide-react";
import type { Series } from "@/lib/schemas/series";
import { formatDateIt, formatEuro } from "@/lib/utils";

export function SeriesCard({ series, flightCount }: { series: Series; flightCount: number }) {
  return (
    <Link
      href={`/tornei/serie/${series.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gold/30 bg-surface transition-colors hover:border-gold/60"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-background">
        <Image
          src={series.image}
          alt={`Locandina ${series.title}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xs font-medium uppercase tracking-widest text-gold">
          Multi-day · {flightCount} {flightCount === 1 ? "tappa" : "tappe"}
        </span>
        <h3 className="font-sans text-lg font-bold sm:text-xl text-foreground group-hover:text-gold-light transition-colors">
          {series.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{series.description}</p>

        <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border-subtle pt-3 text-sm">
          <span className="flex items-center gap-1.5 text-muted">
            <CalendarRange size={15} className="text-gold" />
            {formatDateIt(series.startDate)} – {formatDateIt(series.endDate)}
          </span>
          {series.guaranteed ? (
            <span className="flex items-center gap-1.5 font-semibold text-gold-light">
              <Coins size={14} />
              {formatEuro(series.guaranteed)} garantiti
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
