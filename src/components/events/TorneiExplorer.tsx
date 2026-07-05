"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CalendarDays, List } from "lucide-react";
import { addMonths, subMonths } from "date-fns";
import type { Event } from "@/lib/schemas/event";
import { buildMonthGrid, isoDate, monthLabel, isSameMonth, isSameDay } from "@/lib/calendar";
import { cn, formatDateIt, formatEuro } from "@/lib/utils";
import { getTagColorClasses } from "@/lib/tagColors";
import { EventCard } from "@/components/events/EventCard";
import { Badge } from "@/components/ui/Badge";

export function TorneiExplorer({
  events,
  formats,
}: {
  events: Event[];
  formats: string[];
}) {
  const [format, setFormat] = useState<string>("all");
  const [view, setView] = useState<"calendario" | "lista">("lista");
  const [month, setMonth] = useState<Date>(() => new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return events.filter((event) => format === "all" || event.format === format);
  }, [events, format]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, Event[]>();
    for (const event of filtered) {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    return map;
  }, [filtered]);

  const monthDays = useMemo(() => buildMonthGrid(month), [month]);
  const selectedDayEvents = selectedDay ? (eventsByDay.get(selectedDay) ?? []) : [];

  return (
    <div className="flex flex-col gap-10">
      {/* Filtri */}
      <div className="flex flex-wrap items-end gap-3 rounded-lg border border-border-subtle bg-surface p-4">
        <FilterSelect
          label="Formato"
          value={format}
          onChange={setFormat}
          options={[{ value: "all", label: "Tutti i formati" }, ...formats.map((f) => ({ value: f, label: f }))]}
        />

        <div className="ml-auto hidden items-center gap-1 rounded-full border border-border-subtle p-1 lg:flex">
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
                    {dayEvents.slice(0, 2).map((event) => {
                      const colors = getTagColorClasses(event.format);
                      return (
                        <span
                          key={event.slug}
                          className={cn(
                            "truncate rounded px-2 py-1 text-xs font-medium leading-tight",
                            colors.bg,
                            colors.text
                          )}
                          title={event.title}
                        >
                          {event.title}
                        </span>
                      );
                    })}
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
                  <div className="flex items-center gap-3">
                    <Badge>{event.format}</Badge>
                    <span className="text-foreground">{event.title}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted">
                    <span>{event.time}</span>
                    <span>{formatEuro(event.buyIn)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Vista lista: griglia unica su tutti i tornei filtrati, sempre visibile su mobile */}
      <div className={cn("flex flex-col gap-6", view === "calendario" && "lg:hidden")}>
        {filtered.length === 0 ? (
          <p className="text-center text-muted">Nessun torneo trovato con questi filtri.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-muted">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[44px] rounded border border-border-subtle bg-background px-3 py-2 text-sm normal-case tracking-normal text-foreground focus:border-gold focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
