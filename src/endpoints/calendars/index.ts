import { BaseEndpoint } from "../../core/base.ts";
import { CalendarPersonalEndpoint } from "./personal.ts";
import { CalendarReleasesEndpoint } from "./releases.ts";
import { CalendarTargetEndpoint } from "./target.ts";

/**
 * Calendar endpoints, grouped by scope so the chain reads like the URLs:
 *
 *   haaku.calendars.all.shows.all({ startDate: "2026-11-25" })
 *   haaku.calendars.my.dvd({ countries: ["us", "gb"] })
 *   haaku.calendars.favorites.shows({ page: 1, limit: 25 })
 *   haaku.calendars.releases.hot.new()
 */
export class CalendarEndpoint extends BaseEndpoint {
  get all(): CalendarTargetEndpoint {
    return new CalendarTargetEndpoint(this.config, "all");
  }

  get my(): CalendarTargetEndpoint {
    return new CalendarTargetEndpoint(this.config, "my");
  }

  get favorites(): CalendarPersonalEndpoint {
    return new CalendarPersonalEndpoint(
      this.config,
      "/v1/calendars/favorites/shows",
    );
  }

  get friends(): CalendarPersonalEndpoint {
    return new CalendarPersonalEndpoint(
      this.config,
      "/v1/calendars/friends/shows",
    );
  }

  get watched(): CalendarPersonalEndpoint {
    return new CalendarPersonalEndpoint(
      this.config,
      "/v1/calendars/watched/shows",
    );
  }

  get releases(): CalendarReleasesEndpoint {
    return new CalendarReleasesEndpoint(this.config);
  }
}
