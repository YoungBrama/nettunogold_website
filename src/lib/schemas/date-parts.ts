import { z } from "zod";

// Validazione condivisa per i campi data compilati come 3 caselle di testo
// separate (GG/MM/AAAA) nel pannello CMS, invece di un calendario a click.
// Usata sia dai tornei singoli (event.ts) sia dalle serie multiday (series.ts).
export function isValidCalendarDate(day: number, month: number, year: number): boolean {
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

export const dayFieldSchema = z
  .string("Il giorno è obbligatorio")
  .regex(/^(0[1-9]|[12]\d|3[01])$/, "Il giorno deve essere nel formato GG (es. 05, 21)");

export const monthFieldSchema = z
  .string("Il mese è obbligatorio")
  .regex(/^(0[1-9]|1[0-2])$/, "Il mese deve essere nel formato MM (es. 03, 11)");

export const yearFieldSchema = z
  .string("L'anno è obbligatorio")
  .regex(/^\d{4}$/, "L'anno deve essere nel formato AAAA (es. 2026)");

export function dateFromParts(parts: { day: string; month: string; year: string }): string {
  return `${parts.year}-${parts.month}-${parts.day}`;
}
