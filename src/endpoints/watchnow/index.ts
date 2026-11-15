import type { CountryCode } from "country-data-ts/countries";
import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type { WatchNowSourcesResponse } from "../../types/endpoints/watchnow.ts";

export class WatchNowEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  sources(): Promise<WatchNowSourcesResponse> {
    return this.api.get("/v1/watchnow/sources");
  }

  sourcesByCountry(countryCode: CountryCode): Promise<WatchNowSourcesResponse> {
    return this.api.get(
      `/v1/watchnow/sources/${encodeURIComponent(countryCode)}`,
    );
  }
}
