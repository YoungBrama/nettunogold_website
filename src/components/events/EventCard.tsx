import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, Coins, Layers } from "lucide-react";
import type { Event } from "@/lib/schemas/event";
import { Badge } from "@/components/ui/Badge";
import { formatDateIt, formatEuro, formatNumberIt } from "@/lib/utils";

export function EventCard({ event, priority = false }: { event: Event; priority?: boolean }) {
  return (
    <Link
      href={`/eventi/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface transition-colors hover:border-gold/60"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        <Image
          src={event.image}
          alt={`Locandina ${event.title}`}
          fill
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge>{event.format}</Badge>
          {event.series && (
            <Badge className="border-gold-light/50 bg-gold-light/10 text-gold-light">
              {event.series}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-sans text-lg font-bold sm:text-xl text-foreground group-hover:text-gold-light transition-colors">
          {event.title}
        </h3>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-1.5 capitalize">
            <CalendarDays size={15} className="text-gold" />
            {formatDateIt(event.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} className="text-gold" />
            {event.time}
          </span>
        </div>

        <div className="mt-1 grid grid-cols-2 gap-3 border-t border-border-subtle pt-3 text-sm">
          <div>
            <div className="text-muted text-xs uppercase tracking-wide">Buy-in</div>
            <div className="text-foreground font-medium">{formatEuro(event.buyIn)}</div>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wide">Stack iniziale</div>
            <div className="text-foreground font-medium flex items-center gap-1">
              <Layers size={13} className="text-gold" />
              {formatNumberIt(event.startingStack)}
            </div>
          </div>
          {event.guaranteed ? (
            <div className="col-span-2">
              <div className="text-muted text-xs uppercase tracking-wide">Garantito</div>
              <div className="text-gold-light font-semibold flex items-center gap-1">
                <Coins size={14} />
                {formatEuro(event.guaranteed)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
