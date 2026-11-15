import type { CalendarInput } from "../../types/endpoints/calendars.ts";
import { formatDate } from "../../utils/dates.ts";
import { compactQuery } from "../../utils/query.ts";

export { compactQuery as calendarQuery };

export function calendarWindow(input: CalendarInput = {}): {
  startDate: string;
  days: number;
} {
  return {
    startDate: input.startDate === undefined
      ? formatDate(new Date())
      : formatDate(input.startDate),
    days: input.days ?? 7,
  };
}

export function calendarPath(
  basePath: string,
  input: CalendarInput = {},
): string {
  const { startDate, days } = calendarWindow(input);
  return `${basePath}/${startDate}/${days}`;
}
