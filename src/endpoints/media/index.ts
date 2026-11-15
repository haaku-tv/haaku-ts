import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  MediaAnticipatedQuery,
  MediaAnticipatedResponse,
  MediaPageQuery,
  MediaPopularItem,
  MediaTrendingItem,
} from "../../types/endpoints/media.ts";
import { compactQuery } from "../../utils/query.ts";

export class MediaEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  anticipated(
    input: MediaAnticipatedQuery = {},
  ): Promise<MediaAnticipatedResponse> {
    return this.api.get("/v1/media/anticipated", {
      params: compactQuery({
        type: input.type,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  popular(input: MediaPageQuery = {}): Promise<MediaPopularItem[]> {
    return this.api.get("/v1/media/popular", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  trending(input: MediaPageQuery = {}): Promise<MediaTrendingItem[]> {
    return this.api.get("/v1/media/trending", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
      }),
    });
  }
}
