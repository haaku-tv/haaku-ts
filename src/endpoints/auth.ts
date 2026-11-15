import { BaseEndpoint } from "../index.ts";
import { HaakuConfig } from "../types/class.ts";
import { AuthConfigResponse } from "../types/endpoints/auth.ts";

export class AuthEndpoint extends BaseEndpoint {
    constructor (
        config: HaakuConfig
    ) {
        super(config)
    }

    async configuration(): Promise<AuthConfigResponse> {
        return await this.api.get('/v1/auth/config')
    }

    
}