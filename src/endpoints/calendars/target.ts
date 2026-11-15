import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  CalendarCountriesInput,
  CalendarMediaInput,
  CalendarMediaRelease,
  CalendarMovieInput,
  CalendarMovieRelease,
  CalendarMovieResponse,
} from "../../types/endpoints/calendars.ts";
import { calendarPath, calendarQuery } from "./helpers.ts";
import { CalendarShowsEndpoint } from "./shows.ts";

/**
 * The `all` or `my` calendar scope.
 *
 * `all` is public; `my` is scoped to the caller's watchlist and history.
 */
export class CalendarTargetEndpoint extends BaseEndpoint {
  constructor(
    config: HaakuConfig,
    private readonly target: "all" | "my",
  ) {
    super(config);
  }

  private get basePath(): string {
    return `/v1/calendars/${this.target}`;
  }

  get shows(): CalendarShowsEndpoint {
    return new CalendarShowsEndpoint(this.config, `${this.basePath}/shows`);
  }

  movies(input: CalendarMovieInput = {}): Promise<CalendarMovieResponse[]> {
    return this.api.get(calendarPath(`${this.basePath}/movies`, input), {
      params: calendarQuery({ extended: input.extended }),
    });
  }

  dvd(input: CalendarCountriesInput = {}): Promise<CalendarMovieRelease[]> {
    return this.api.get(calendarPath(`${this.basePath}/dvd`, input), {
      params: calendarQuery({ countries: input.countries }),
    });
  }

  streaming(
    input: CalendarCountriesInput = {},
  ): Promise<CalendarMovieRelease[]> {
    return this.api.get(calendarPath(`${this.basePath}/streaming`, input), {
      params: calendarQuery({ countries: input.countries }),
    });
  }

  media(input: CalendarMediaInput = {}): Promise<CalendarMediaRelease[]> {
    return this.api.get(calendarPath(`${this.basePath}/media`, input), {
      params: calendarQuery({ type: input.type }),
    });
  }
}
