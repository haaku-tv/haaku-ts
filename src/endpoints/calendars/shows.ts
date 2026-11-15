import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  CalendarInput,
  CalendarShowRelease,
} from "../../types/endpoints/calendars.ts";
import { calendarPath } from "./helpers.ts";

/**
 * The contract show calendars for one target (`all` or `my`).
 *
 * The plain feed and the new/premieres/finales feeds share a namespace, so the
 * plain feed is `.all(...)` rather than a callable that also carries methods.
 */
export class CalendarShowsEndpoint extends BaseEndpoint {
  constructor(
    config: HaakuConfig,
    private readonly basePath: string,
  ) {
    super(config);
  }

  all(input: CalendarInput = {}): Promise<CalendarShowRelease[]> {
    return this.api.get(calendarPath(this.basePath, input));
  }

  new(input: CalendarInput = {}): Promise<CalendarShowRelease[]> {
    return this.api.get(calendarPath(`${this.basePath}/new`, input));
  }

  premieres(input: CalendarInput = {}): Promise<CalendarShowRelease[]> {
    return this.api.get(calendarPath(`${this.basePath}/premieres`, input));
  }

  finales(input: CalendarInput = {}): Promise<CalendarShowRelease[]> {
    return this.api.get(calendarPath(`${this.basePath}/finales`, input));
  }
}
