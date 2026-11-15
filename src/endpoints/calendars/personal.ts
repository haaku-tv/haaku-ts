import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  CalendarEnvelope,
  CalendarEpisodeEntry,
  CalendarPersonalShowsInput,
} from "../../types/endpoints/calendars.ts";
import { calendarPath, calendarQuery } from "./helpers.ts";

export class CalendarPersonalEndpoint extends BaseEndpoint {
  constructor(
    config: HaakuConfig,
    private readonly basePath: string,
  ) {
    super(config);
  }

  shows(
    input: CalendarPersonalShowsInput = {},
  ): Promise<CalendarEnvelope<CalendarEpisodeEntry>> {
    return this.api.get(calendarPath(this.basePath, input), {
      params: calendarQuery({
        page: input.page,
        limit: input.limit,
        type: input.type,
      }),
    });
  }
}
