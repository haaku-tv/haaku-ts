import { BaseEndpoint } from "../core/base.ts";
import type { HaakuConfig } from "../types/class.ts";
import type { AuthConfigResponse } from "../types/endpoints/auth.ts";

export class AuthEndpoint extends BaseEndpoint {
  constructor(
    config: HaakuConfig,
  ) {
    super(config);
  }

  async configuration(): Promise<AuthConfigResponse> {
    return await this.api.get("/v1/auth/config");
  }
}
