import { BaseEndpoint } from "../index.ts";
import { HaakuConfig } from "../types/class.ts";
import { HealthcheckResponse } from "../types/endpoints/healthcheck.ts";

export class HealthCheckEndpoint extends BaseEndpoint {
    constructor (
        config: HaakuConfig
    ) {
        super(config)
    }
    async healthcheck(): Promise<HealthcheckResponse> {
        return await this.api.get('/healthz')
    }
}