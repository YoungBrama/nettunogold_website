import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { it } from "date-fns/locale";

export function buildMonthGrid(monthDate: Date) {
  const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end });
}

export function isoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function monthLabel(date: Date): string {
  return format(date, "LLLL yyyy", { locale: it });
}

export { isSameMonth, isSameDay };
