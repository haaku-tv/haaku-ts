import { AdminEndpoint } from "../endpoints/admin.ts";
import { AuthEndpoint } from "../endpoints/auth.ts";
import { CalendarEndpoint } from "../endpoints/calendars/index.ts";
import { HealthCheckEndpoint } from "../endpoints/healthcheck.ts";
import { HaakuConfig } from "../types/class.ts";
import { HealthcheckResponse } from "../types/endpoints/healthcheck.ts";

export class Haaku {
  private readonly config: HaakuConfig;

  constructor(config: HaakuConfig) {
    this.config = config;
  }

  get healthcheck(): () => Promise<HealthcheckResponse> {
    const endpoint = new HealthCheckEndpoint(this.config)
    return endpoint.healthcheck.bind(endpoint)
  }

  get admin() {
    return new AdminEndpoint(this.config)
  }

  get auth() {
    return new AuthEndpoint(this.config)
  }

  get calendars() {
    return new CalendarEndpoint(this.config)
  }
}
