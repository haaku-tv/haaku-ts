import { BaseEndpoint } from "../core/base.ts";
import type { HaakuConfig } from "../types/class.ts";
import type { HealthcheckResponse } from "../types/endpoints/healthcheck.ts";

export class HealthCheckEndpoint extends BaseEndpoint {
  constructor(
    config: HaakuConfig,
  ) {
    super(config);
  }
  async healthcheck(): Promise<HealthcheckResponse> {
    return await this.api.get("/healthz");
  }
}
