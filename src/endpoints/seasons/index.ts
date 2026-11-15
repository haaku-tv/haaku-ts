import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  MovieReport,
  MovieReportInput,
  RatingSummary,
} from "../../types/endpoints/movies.ts";
import type {
  SeasonDetail,
  SeasonDetailQuery,
  SeasonFlatStats,
} from "../../types/endpoints/seasons.ts";
import { compactQuery } from "../../utils/query.ts";

export class SeasonEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  get(id: number, input: SeasonDetailQuery = {}): Promise<SeasonDetail> {
    return this.api.get(`/v1/seasons/${id}`, {
      params: compactQuery({ extended: input.extended }),
    });
  }

  stats(id: number): Promise<SeasonFlatStats> {
    return this.api.get(`/v1/seasons/${id}/stats`);
  }

  ratings(id: number): Promise<RatingSummary> {
    return this.api.get(`/v1/seasons/${id}/ratings`);
  }

  report(id: number, input: MovieReportInput): Promise<MovieReport> {
    return this.api.post(`/v1/seasons/${id}/report`, {
      body: {
        reason: input.reason,
        ...(input.description !== undefined
          ? { description: input.description }
          : {}),
      },
    });
  }
}
