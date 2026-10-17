"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CalendarDays, Clock, Coins, List } from "lucide-react";
import { addMonths, subMonths } from "date-fns";
import type { Event } from "@/lib/schemas/event";
import { buildMonthGrid, isoDate, monthLabel, isSameMonth, isSameDay } from "@/lib/calendar";
import { cn, formatDateIt, formatDayNumber, formatMonthFullIt, formatNumberIt } from "@/lib/utils";

export function TorneiExplorer({ events }: { events: Event[] }) {
  const [view, setView] = useState<"calendario" | "lista">("lista");
  const [month, setMonth] = useState<Date>(() => new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, Event[]>();
    for (const event of events) {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    return map;
  }, [events]);

  const monthDays = useMemo(() => buildMonthGrid(month), [month]);
  const selectedDayEvents = selectedDay ? (eventsByDay.get(selectedDay) ?? []) : [];

  return (
    <div className="flex flex-col gap-10">
      {/* Selettore vista */}
      <div className="flex items-center justify-end">
        <div className="hidden items-center gap-1 rounded-full border border-border-subtle p-1 lg:flex">
          <button
            type="button"
            onClick={() => setView("lista")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs uppercase tracking-widest transition-colors",
              view === "lista" ? "bg-gold-gradient text-background" : "text-muted hover:text-gold"
            )}
          >
            <List size={14} /> Lista
          </button>
          <button
            type="button"
            onClick={() => setView("calendario")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs uppercase tracking-widest transition-colors",
              view === "calendario" ? "bg-gold-gradient text-background" : "text-muted hover:text-gold"
            )}
          >
            <CalendarDays size={14} /> Calendario
          </button>
        </div>
      </div>

      {/* Calendario mensile: solo desktop/tablet largo, quando la vista è "calendario" */}
      {view === "calendario" && (
        <div className="hidden lg:block">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMonth((m) => subMonths(m, 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10"
              aria-label="Mese precedente"
            >
              <ChevronLeft size={18} />
            </button>
            <h3 className="font-display text-2xl capitalize text-gold-gradient">
              {monthLabel(month)}
            </h3>
            <button
              type="button"
              onClick={() => setMonth((m) => addMonths(m, 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10"
              aria-label="Mese successivo"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 overflow-hidden rounded-lg border border-border-subtle">
            {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((d) => (
              <div
                key={d}
                className="border-b border-border-subtle bg-surface py-2 text-center text-xs uppercase tracking-widest text-muted"
              >
                {d}
              </div>
            ))}
            {monthDays.map((day) => {
              const iso = isoDate(day);
              const dayEvents = eventsByDay.get(iso) ?? [];
              const inMonth = isSameMonth(day, month);
              const selected = selectedDay === iso;

              return (
                <button
                  type="button"
                  key={iso}
                  onClick={() => dayEvents.length > 0 && setSelectedDay(selected ? null : iso)}
                  className={cn(
                    "flex min-h-[122px] flex-col items-start gap-1.5 border-b border-r border-border-subtle p-2 text-left transition-colors last:border-r-0",
                    inMonth ? "bg-background" : "bg-background/40",
                    dayEvents.length > 0 && "cursor-pointer hover:bg-gold/5",
                    selected && "bg-gold/10 ring-1 ring-inset ring-gold/50"
                  )}
                >
                  <span
                    className={cn(
                      "text-xs",
                      inMonth ? "text-foreground/80" : "text-muted/40",
                      isSameDay(day, new Date()) && "font-bold text-gold"
                    )}
                  >
                    {day.getDate()}
                  </span>
                  <div className="flex w-full flex-col gap-1.5">
                    {dayEvents.slice(0, 2).map((event) => (
                      <span
                        key={event.slug}
                        className="truncate rounded bg-gold/15 px-2 py-1 text-xs font-medium leading-tight text-gold-light"
                        title={event.title}
                      >
                        {event.title}
                      </span>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-xs text-muted">+{dayEvents.length - 2} altri</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedDay && selectedDayEvents.length > 0 && (
            <div className="mt-6 flex flex-col gap-3 rounded-lg border border-gold/30 bg-surface p-5">
              <h4 className="font-display text-lg capitalize text-gold-light">
                {formatDateIt(selectedDay)}
              </h4>
              {selectedDayEvents.map((event) => (
                <Link
                  key={event.slug}
                  href={`/eventi/${event.slug}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded border border-border-subtle bg-background px-4 py-3 hover:border-gold/50"
                >
                  <span className="font-medium text-foreground">{event.title}</span>
                  <div className="flex items-center gap-4 text-sm text-muted">
                    <span>{event.time}</span>
                    <span>{formatNumberIt(event.buyIn)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Vista lista: elenco verticale, sempre visibile su mobile */}
      <div className={cn("flex flex-col gap-6", view === "calendario" && "lg:hidden")}>
        {events.length === 0 ? (
          <p className="text-center text-muted">Nessun torneo programmato al momento.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <TorneoRow key={event.slug} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TorneoRow({ event }: { event: Event }) {
  return (
    <Link
      href={`/eventi/${event.slug}`}
      className="group relative flex overflow-hidden rounded-2xl border border-border-subtle bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_24px_60px_-28px_rgba(201,162,39,0.5)]"
    >
      {/* Bagliore d'hover: spot dorato in alto a destra, invisibile a riposo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at 85% 0%, rgba(201,162,39,0.14), transparent 60%)",
        }}
      />

      {/* Locandina: grande, sfumata nel colore della card */}
      <div className="relative w-24 shrink-0 overflow-hidden sm:w-36 md:w-44">
        <Image
          src={event.images[0]}
          alt={`Locandina ${event.title}`}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 176px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent from-40% to-surface" />
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-surface" />
      </div>

      {/* Data: numero grande, mese completo sotto */}
      <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-0.5 border-r border-border-subtle/70 bg-surface-2/60 px-1 sm:w-24">
        <span className="font-sans text-3xl font-black leading-none tracking-tight text-gold-gradient sm:text-4xl">
          {formatDayNumber(event.date)}
        </span>
        <span className="text-center text-[9px] font-extrabold uppercase tracking-wide text-muted sm:text-[10px]">
          {formatMonthFullIt(event.date)}
        </span>
      </div>

      {/* Contenuto */}
      <div className="relative z-10 flex flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:px-6">
        <div className="flex min-w-[140px] flex-col gap-1.5">
          <span className="font-sans text-base font-bold text-foreground transition-colors group-hover:text-gold-light sm:text-lg">
            {event.title}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground/90">
            <Clock size={14} className="text-gold" />
            {event.time}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex flex-col items-end rounded-xl border border-border-subtle bg-background/60 px-3.5 py-2 transition-colors group-hover:border-gold/30">
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted">Buy-in</span>
            <span className="text-lg font-bold text-foreground">{formatNumberIt(event.buyIn)}</span>
          </div>

          {event.guaranteed ? (
            <div className="relative flex flex-col items-end overflow-hidden rounded-xl border border-gold/40 bg-gold/10 px-3.5 py-2 shadow-[0_0_24px_-6px_rgba(201,162,39,0.65)]">
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gold-gradient opacity-[0.07]"
              />
              <span className="relative flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-gold-light">
                <Coins size={11} /> Garantito
              </span>
              <span className="relative text-lg font-bold text-gold-gradient">
                {formatNumberIt(event.guaranteed)}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
