import { AdminEndpoint } from "../endpoints/admin.ts";
import { AuthEndpoint } from "../endpoints/auth.ts";
import { CalendarEndpoint } from "../endpoints/calendars/index.ts";
import { HealthCheckEndpoint } from "../endpoints/healthcheck.ts";
import { MovieEndpoint } from "../endpoints/movies/index.ts";
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
}
