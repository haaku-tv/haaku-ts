import type { CountryCode } from "country-data-ts/countries";
import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  MoviePageQuery,
  MovieReport,
  MovieWatchNow,
  RatingSummary,
} from "../../types/endpoints/movies.ts";
import type {
  EpisodeCommentEnvelope,
  EpisodeDetail,
  EpisodeDetailQuery,
  EpisodeFlatStats,
  EpisodeListsEnvelope,
  EpisodeReportInput,
} from "../../types/endpoints/episodes.ts";
import { compactQuery } from "../../utils/query.ts";

export class EpisodeEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  get(id: number, input: EpisodeDetailQuery = {}): Promise<EpisodeDetail> {
    return this.api.get(`/v1/episodes/${id}`, {
      params: compactQuery({ extended: input.extended }),
    });
  }

  stats(id: number): Promise<EpisodeFlatStats> {
    return this.api.get(`/v1/episodes/${id}/stats`);
  }

  ratings(id: number): Promise<RatingSummary> {
    return this.api.get(`/v1/episodes/${id}/ratings`);
  }

  comments(
    id: number,
    input: MoviePageQuery = {},
  ): Promise<EpisodeCommentEnvelope> {
    return this.api.get(`/v1/episodes/${id}/comments`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  lists(
    id: number,
    input: MoviePageQuery = {},
  ): Promise<EpisodeListsEnvelope> {
    return this.api.get(`/v1/episodes/${id}/lists`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  report(id: number, input: EpisodeReportInput): Promise<MovieReport> {
    return this.api.post(`/v1/episodes/${id}/report`, {
      body: {
        reason: input.reason,
        ...(input.description !== undefined
          ? { description: input.description }
          : {}),
      },
    });
  }

  watchNow(id: number, country: CountryCode): Promise<MovieWatchNow> {
    return this.api.get(`/v1/episodes/${id}/watchnow/${country}`);
  }
}
