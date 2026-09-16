import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formattazione data/numeri con date-fns (dati locale inclusi nel bundle)
// invece di Intl.DateTimeFormat/NumberFormat: questi ultimi dipendono dai
// dati ICU disponibili a runtime e possono differire tra server e browser
// (mismatch di idratazione). date-fns dà lo stesso risultato ovunque.

export function formatDateIt(dateISO: string): string {
  const date = new Date(`${dateISO}T00:00:00`);
  return format(date, "EEEE d MMMM yyyy", { locale: it });
}

export function formatDateShortIt(dateISO: string): string {
  const date = new Date(`${dateISO}T00:00:00`);
  return format(date, "d MMM", { locale: it });
}

export function formatNumberIt(value: number): string {
  const rounded = Math.round(value);
  const negative = rounded < 0;
  const digits = Math.abs(rounded).toString();
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return negative ? `-${grouped}` : grouped;
}

export function formatEuro(amount: number): string {
  return `${formatNumberIt(amount)} €`;
}

export function formatDateRangeIt(startISO: string, endISO: string): string {
  const start = new Date(`${startISO}T00:00:00`);
  const end = new Date(`${endISO}T00:00:00`);
  return `${format(start, "d MMMM yyyy", { locale: it })} – ${format(end, "d MMMM yyyy", { locale: it })}`;
}
