import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  MovieAlias,
  MovieAnticipatedEntry,
  MovieComment,
  MovieCommentSort,
  MovieCommentsQuery,
  MovieContractTranslation,
  MovieDetailQuery,
  MovieHotEntry,
  MovieId,
  MovieIdQuery,
  MovieJustWatchLinks,
  MovieList,
  MovieListSort,
  MovieListType,
  MoviePageQuery,
  MoviePeople,
  MoviePeriod,
  MovieRankedEntry,
  MovieRefreshResponse,
  MovieRelease,
  MovieReport,
  MovieReportInput,
  MovieResponse,
  MovieStats,
  MovieStreamingEntry,
  MovieStreamingPeriod,
  MovieStudio,
  MovieTranslation,
  MovieTranslationsQuery,
  MovieUpdateEntry,
  MovieUpdatesQuery,
  MovieVideo,
  MovieWatchingUser,
  MovieWatchNow,
  MovieWatchProviders,
  MovieWatchQuery,
  RatingSummary,
} from "../../types/endpoints/movies.ts";
import { formatDate } from "../../utils/dates.ts";
import { compactQuery } from "../../utils/query.ts";

const idSegment = (id: MovieId): string => encodeURIComponent(String(id));

/**
 * The `/v1/movies` group.
 *
 * Reads are flat methods that mirror the URL segments so the chain stays
 * predictable:
 *
 *   haaku.movies.get("550")
 *   haaku.movies.comments("550", "newest", { limit: 10 })
 *   haaku.movies.collected("weekly", { page: 2 })
 *   haaku.movies.watchNow("550", "us")
 */
export class MovieEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  // --- Detail and relations ------------------------------------------------

  get(id: MovieId, input: MovieDetailQuery = {}): Promise<MovieResponse> {
    return this.api.get(`/v1/movies/${idSegment(id)}`, {
      params: compactQuery({
        id_type: input.idType,
        extended: input.extended,
      }),
    });
  }

  aliases(id: MovieId, input: MovieIdQuery = {}): Promise<MovieAlias[]> {
    return this.api.get(`/v1/movies/${idSegment(id)}/aliases`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  people(id: MovieId, input: MovieIdQuery = {}): Promise<MoviePeople> {
    return this.api.get(`/v1/movies/${idSegment(id)}/people`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  ratings(id: MovieId, input: MovieIdQuery = {}): Promise<RatingSummary> {
    return this.api.get(`/v1/movies/${idSegment(id)}/ratings`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  stats(id: MovieId, input: MovieIdQuery = {}): Promise<MovieStats> {
    return this.api.get(`/v1/movies/${idSegment(id)}/stats`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  lists(id: MovieId, input: MoviePageQuery = {}): Promise<MovieList[]> {
    return this.api.get(`/v1/movies/${idSegment(id)}/lists`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  listsByType(
    id: MovieId,
    type: MovieListType,
    sort: MovieListSort,
    input: MoviePageQuery = {},
  ): Promise<MovieList[]> {
    return this.api.get(
      `/v1/movies/${idSegment(id)}/lists/${type}/${sort}`,
      {
        params: compactQuery({ page: input.page, limit: input.limit }),
      },
    );
  }

  watching(
    id: MovieId,
    input: MovieIdQuery = {},
  ): Promise<MovieWatchingUser[]> {
    return this.api.get(`/v1/movies/${idSegment(id)}/watching`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  comments(
    id: MovieId,
    sort: MovieCommentSort,
    input: MovieCommentsQuery = {},
  ): Promise<MovieComment[]> {
    return this.api.get(`/v1/movies/${idSegment(id)}/comments/${sort}`, {
      params: compactQuery({
        id_type: input.idType,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  related(id: MovieId, input: MoviePageQuery = {}): Promise<MovieResponse[]> {
    return this.api.get(`/v1/movies/${idSegment(id)}/related`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  // --- Provider metadata ---------------------------------------------------

  releases(
    id: MovieId,
    country: string,
    input: MovieIdQuery = {},
  ): Promise<MovieRelease[]> {
    return this.api.get(
      `/v1/movies/${idSegment(id)}/releases/${country}`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  studios(id: MovieId, input: MovieIdQuery = {}): Promise<MovieStudio[]> {
    return this.api.get(`/v1/movies/${idSegment(id)}/studios`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  translations(
    id: MovieId,
    input: MovieTranslationsQuery = {},
  ): Promise<MovieContractTranslation[]> {
    return this.api.get(`/v1/movies/${idSegment(id)}/translations`, {
      params: compactQuery({
        id_type: input.idType,
        language: input.language,
      }),
    });
  }

  translation(
    id: MovieId,
    language: string,
    input: MovieIdQuery = {},
  ): Promise<MovieTranslation[]> {
    return this.api.get(
      `/v1/movies/${idSegment(id)}/translations/${language}`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  videos(id: MovieId, input: MovieIdQuery = {}): Promise<MovieVideo[]> {
    return this.api.get(`/v1/movies/${idSegment(id)}/videos`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  // --- Watch providers -----------------------------------------------------

  watch(
    id: MovieId,
    input: MovieWatchQuery = {},
  ): Promise<MovieWatchProviders> {
    return this.api.get(`/v1/movies/${idSegment(id)}/watch`, {
      params: compactQuery({
        id_type: input.idType,
        country: input.country,
      }),
    });
  }

  watchNow(
    id: MovieId,
    country: string,
    input: MovieIdQuery = {},
  ): Promise<MovieWatchNow> {
    return this.api.get(
      `/v1/movies/${idSegment(id)}/watchnow/${country}`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  justWatchLinks(
    id: MovieId,
    country: string,
    input: MovieIdQuery = {},
  ): Promise<MovieJustWatchLinks> {
    return this.api.get(
      `/v1/movies/${idSegment(id)}/watchnow/justwatch_links/${country}`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  refresh(id: MovieId): Promise<MovieRefreshResponse> {
    return this.api.post(`/v1/movies/${idSegment(id)}/refresh/justwatch`);
  }

  // --- Discovery and rankings ---------------------------------------------

  trending(input: MovieUpdatesQuery = {}): Promise<MovieResponse[]> {
    return this.api.get("/v1/movies/trending", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        extended: input.extended,
      }),
    });
  }

  popular(input: MovieUpdatesQuery = {}): Promise<MovieResponse[]> {
    return this.api.get("/v1/movies/popular", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        extended: input.extended,
      }),
    });
  }

  recommendations(
    id: MovieId,
    input: MoviePageQuery = {},
  ): Promise<MovieResponse[]> {
    return this.api.get(`/v1/movies/recommendations/${idSegment(id)}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  anticipated(input: MoviePageQuery = {}): Promise<MovieAnticipatedEntry[]> {
    return this.api.get("/v1/movies/anticipated", {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  collected(
    period: MoviePeriod,
    input: MoviePageQuery = {},
  ): Promise<MovieRankedEntry[]> {
    return this.ranking("collected", period, input);
  }

  favorited(
    period: MoviePeriod,
    input: MoviePageQuery = {},
  ): Promise<MovieRankedEntry[]> {
    return this.ranking("favorited", period, input);
  }

  played(
    period: MoviePeriod,
    input: MoviePageQuery = {},
  ): Promise<MovieRankedEntry[]> {
    return this.ranking("played", period, input);
  }

  watched(
    period: MoviePeriod,
    input: MoviePageQuery = {},
  ): Promise<MovieRankedEntry[]> {
    return this.ranking("watched", period, input);
  }

  hot(input: MoviePageQuery = {}): Promise<MovieHotEntry[]> {
    return this.api.get("/v1/movies/hot", {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  streaming(
    period: MovieStreamingPeriod,
    input: MoviePageQuery = {},
  ): Promise<MovieStreamingEntry[]> {
    return this.api.get(`/v1/movies/streaming/${period}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  updates(
    startDate: string | Date,
    input: MovieUpdatesQuery = {},
  ): Promise<MovieUpdateEntry[]> {
    return this.api.get(`/v1/movies/updates/${formatDate(startDate)}`, {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        extended: input.extended,
      }),
    });
  }

  updatedIds(
    startDate: string | Date,
    input: MoviePageQuery = {},
  ): Promise<number[]> {
    return this.api.get(`/v1/movies/updates/id/${formatDate(startDate)}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  // --- Reports -------------------------------------------------------------

  report(id: MovieId, input: MovieReportInput): Promise<MovieReport> {
    return this.api.post(`/v1/movies/${idSegment(id)}/report`, {
      body: {
        reason: input.reason,
        ...(input.description !== undefined
          ? { description: input.description }
          : {}),
      },
    });
  }

  private ranking(
    kind: "collected" | "favorited" | "played" | "watched",
    period: MoviePeriod,
    input: MoviePageQuery,
  ): Promise<MovieRankedEntry[]> {
    return this.api.get(`/v1/movies/${kind}/${period}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }
}
