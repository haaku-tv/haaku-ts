import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  CalendarMediaInput,
  CalendarMediaRelease,
} from "../../types/endpoints/calendars.ts";
import { calendarPath, calendarQuery } from "./helpers.ts";

/** The public hot-release feeds. */
export class CalendarReleasesEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  get hot(): CalendarHotEndpoint {
    return new CalendarHotEndpoint(this.config);
  }
}

export class CalendarHotEndpoint extends BaseEndpoint {
  constructor(
    config: HaakuConfig,
    private readonly basePath = "/v1/calendars/releases/hot",
  ) {
    super(config);
  }

  all(input: CalendarMediaInput = {}): Promise<CalendarMediaRelease[]> {
    return this.fetchWindow(this.basePath, input);
  }

  new(input: CalendarMediaInput = {}): Promise<CalendarMediaRelease[]> {
    return this.fetchWindow(`${this.basePath}/new`, input);
  }

  premieres(input: CalendarMediaInput = {}): Promise<CalendarMediaRelease[]> {
    return this.fetchWindow(`${this.basePath}/premieres`, input);
  }

  finales(input: CalendarMediaInput = {}): Promise<CalendarMediaRelease[]> {
    return this.fetchWindow(`${this.basePath}/finales`, input);
  }

  private fetchWindow(
    basePath: string,
    input: CalendarMediaInput,
  ): Promise<CalendarMediaRelease[]> {
    return this.api.get(calendarPath(basePath, input), {
      params: calendarQuery({ type: input.type }),
    });
  }
}
