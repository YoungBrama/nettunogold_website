import { loadRawContent } from "@/lib/content-loader";
import { eventSchema, type Event } from "@/lib/schemas/event";

function formatZodIssues(issues: { path: PropertyKey[]; message: string }[]) {
  return issues
    .map((issue) => `  • campo "${issue.path.map(String).join(".") || "?"}": ${issue.message}`)
    .join("\n");
}

let cachedEvents: Event[] | null = null;

function parseAllEvents(): Event[] {
  if (cachedEvents) return cachedEvents;

  const rawEvents = loadRawContent("eventi");

  const parsed = rawEvents.map((raw, index) => {
    const result = eventSchema.safeParse(raw);
    if (!result.success) {
      throw new Error(
        `\n\nERRORE nel torneo #${index + 1} in content/eventi/:\n` +
          `${formatZodIssues(result.error.issues)}\n\n` +
          `Apri il file dell'evento indicato in "content/eventi/" e correggi i campi sopra elencati.\n`
      );
    }
    return result.data;
  });

  cachedEvents = parsed.sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  return cachedEvents;
}

export function getEvents(): Event[] {
  return parseAllEvents();
}

export function getUpcomingEvents(limit?: number): Event[] {
  const now = new Date();
  const todayISO = now.toISOString().slice(0, 10);
  const upcoming = parseAllEvents().filter((event) => event.date >= todayISO);
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export function getPastEvents(): Event[] {
  const todayISO = new Date().toISOString().slice(0, 10);
  return parseAllEvents()
    .filter((event) => event.date < todayISO)
    .sort((a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`));
}

export function getEventBySlug(slug: string): Event | undefined {
  return parseAllEvents().find((event) => event.slug === slug);
}

export function getEventFormats(): Event["format"][] {
  const formats = new Set(parseAllEvents().map((event) => event.format));
  return Array.from(formats);
}

// Tutti i flight/tornei collegati a una serie (es. tutti i Day di un
// festival), ordinati cronologicamente. Usata dalla pagina della serie.
export function getEventsBySeriesSlug(seriesSlug: string): Event[] {
  return parseAllEvents().filter((event) => event.seriesSlug === seriesSlug);
}
