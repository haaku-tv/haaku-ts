import { BaseEndpoint } from "../../core/base.ts";
import { CalendarPersonalEndpoint } from "./personal.ts";
import { CalendarReleasesEndpoint } from "./releases.ts";
import { CalendarTargetEndpoint } from "./target.ts";

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
