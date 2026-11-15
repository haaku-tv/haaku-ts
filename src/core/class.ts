import { AdminEndpoint } from "../endpoints/admin.ts";
import { AuthEndpoint } from "../endpoints/auth.ts";
import { CalendarEndpoint } from "../endpoints/calendars/index.ts";
import { EpisodeEndpoint } from "../endpoints/episodes/index.ts";
import { HealthCheckEndpoint } from "../endpoints/healthcheck.ts";
import { MovieEndpoint } from "../endpoints/movies/index.ts";
import { PersonEndpoint } from "../endpoints/people/index.ts";
import { SeasonEndpoint } from "../endpoints/seasons/index.ts";
import { ShowEndpoint } from "../endpoints/shows/index.ts";
import type { HaakuConfig } from "../types/class.ts";
import type { HealthcheckResponse } from "../types/endpoints/healthcheck.ts";

export class Haaku {
  private readonly config: HaakuConfig;

  constructor(config: HaakuConfig) {
    this.config = config;
  }

  get healthcheck(): () => Promise<HealthcheckResponse> {
    const endpoint = new HealthCheckEndpoint(this.config);
    return endpoint.healthcheck.bind(endpoint);
  }

  get admin(): AdminEndpoint {
    return new AdminEndpoint(this.config);
  }

  get auth(): AuthEndpoint {
    return new AuthEndpoint(this.config);
  }

  get calendars(): CalendarEndpoint {
    return new CalendarEndpoint(this.config);
  }

  get movies(): MovieEndpoint {
    return new MovieEndpoint(this.config);
  }

  get shows(): ShowEndpoint {
    return new ShowEndpoint(this.config);
  }

  get seasons(): SeasonEndpoint {
    return new SeasonEndpoint(this.config);
  }

  get episodes(): EpisodeEndpoint {
    return new EpisodeEndpoint(this.config);
  }

  get people(): PersonEndpoint {
    return new PersonEndpoint(this.config);
  }
}
