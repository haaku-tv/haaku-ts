import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  ContractPeople,
  ContractRatingSummary,
  ContractSeasonInfo,
  EpisodeResponse,
  EpisodeStats,
  SeasonResponse,
  SeasonStats,
  ShowAlias,
  ShowAnticipatedEntry,
  ShowComment,
  ShowCommentSort,
  ShowCommentsQuery,
  ShowContractTranslation,
  ShowCountry,
  ShowDetailQuery,
  ShowHotEntry,
  ShowId,
  ShowIdQuery,
  ShowLanguage,
  ShowList,
  ShowListSort,
  ShowListType,
  ShowNestedReportInput,
  ShowNestedReportResponse,
  ShowPageQuery,
  ShowPeople,
  ShowPeriod,
  ShowProgress,
  ShowProgressReset,
  ShowRankedEntry,
  ShowRefreshResponse,
  ShowReport,
  ShowReportInput,
  ShowResponse,
  ShowStats,
  ShowStreamingEntry,
  ShowStreamingPeriod,
  ShowStudio,
  ShowTranslation,
  ShowTranslationsQuery,
  ShowUpdateEntry,
  ShowUpdatesQuery,
  ShowVideo,
  ShowWatchingUser,
  ShowWatchNow,
  ShowWatchProviders,
  ShowWatchQuery,
} from "../../types/endpoints/shows.ts";
import type { RatingSummary } from "../../types/endpoints/movies.ts";
import { formatDate } from "../../utils/dates.ts";
import { compactQuery } from "../../utils/query.ts";

const idSegment = (id: ShowId): string => encodeURIComponent(String(id));

export class ShowEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  get(id: ShowId, input: ShowDetailQuery = {}): Promise<ShowResponse> {
    return this.api.get(`/v1/shows/${idSegment(id)}`, {
      params: compactQuery({
        id_type: input.idType,
        extended: input.extended,
      }),
    });
  }

  aliases(id: ShowId, input: ShowIdQuery = {}): Promise<ShowAlias[]> {
    return this.api.get(`/v1/shows/${idSegment(id)}/aliases`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  certifications(id: ShowId, input: ShowIdQuery = {}): Promise<string> {
    return this.api.get(`/v1/shows/${idSegment(id)}/certifications`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  comments(
    id: ShowId,
    sort: ShowCommentSort,
    input: ShowCommentsQuery = {},
  ): Promise<ShowComment[]> {
    return this.api.get(`/v1/shows/${idSegment(id)}/comments/${sort}`, {
      params: compactQuery({
        id_type: input.idType,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  lastEpisode(
    id: ShowId,
    input: ShowIdQuery = {},
  ): Promise<EpisodeResponse | undefined> {
    return this.api.get(`/v1/shows/${idSegment(id)}/last_episode`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  lists(id: ShowId, input: ShowPageQuery = {}): Promise<ShowList[]> {
    return this.api.get(`/v1/shows/${idSegment(id)}/lists`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  listsByType(
    id: ShowId,
    type: ShowListType,
    sort: ShowListSort,
    input: ShowPageQuery = {},
  ): Promise<ShowList[]> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/lists/${type}/${sort}`,
      { params: compactQuery({ page: input.page, limit: input.limit }) },
    );
  }

  nextEpisode(
    id: ShowId,
    input: ShowIdQuery = {},
  ): Promise<EpisodeResponse | undefined> {
    return this.api.get(`/v1/shows/${idSegment(id)}/next_episode`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  people(id: ShowId, input: ShowIdQuery = {}): Promise<ShowPeople> {
    return this.api.get(`/v1/shows/${idSegment(id)}/people`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  progressCollection(
    id: ShowId,
    input: ShowIdQuery = {},
  ): Promise<ShowProgress> {
    return this.api.get(`/v1/shows/${idSegment(id)}/progress/collection`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  progressWatched(
    id: ShowId,
    input: ShowIdQuery = {},
  ): Promise<ShowProgress> {
    return this.api.get(`/v1/shows/${idSegment(id)}/progress/watched`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  resetProgressWatched(
    id: ShowId,
    input: { resetAt?: string | Date } = {},
  ): Promise<ShowProgressReset> {
    const resetAt = input.resetAt instanceof Date
      ? input.resetAt.toISOString()
      : input.resetAt;

    return this.api.post(`/v1/shows/${idSegment(id)}/progress/watched/reset`, {
      ...(resetAt !== undefined ? { body: { reset_at: resetAt } } : {}),
    });
  }

  undoResetProgressWatched(id: ShowId): Promise<void> {
    return this.api.delete(
      `/v1/shows/${idSegment(id)}/progress/watched/reset`,
    );
  }

  ratings(id: ShowId, input: ShowIdQuery = {}): Promise<RatingSummary> {
    return this.api.get(`/v1/shows/${idSegment(id)}/ratings`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  refresh(id: ShowId): Promise<ShowRefreshResponse> {
    return this.api.post(`/v1/shows/${idSegment(id)}/refresh/justwatch`);
  }

  related(id: ShowId, input: ShowPageQuery = {}): Promise<ShowResponse[]> {
    return this.api.get(`/v1/shows/${idSegment(id)}/related`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  report(id: ShowId, input: ShowReportInput): Promise<ShowReport> {
    return this.api.post(`/v1/shows/${idSegment(id)}/report`, {
      body: {
        reason: input.reason,
        ...(input.description !== undefined
          ? { description: input.description }
          : {}),
      },
    });
  }

  seasons(id: ShowId, input: ShowIdQuery = {}): Promise<SeasonResponse[]> {
    return this.api.get(`/v1/shows/${idSegment(id)}/seasons`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  season(
    id: ShowId,
    season: number,
    input: ShowIdQuery = {},
  ): Promise<SeasonResponse> {
    return this.api.get(`/v1/shows/${idSegment(id)}/seasons/${season}`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  seasonComments(
    id: ShowId,
    season: number,
    sort: ShowCommentSort,
    input: ShowCommentsQuery = {},
  ): Promise<ShowComment[]> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/comments/${sort}`,
      {
        params: compactQuery({
          id_type: input.idType,
          page: input.page,
          limit: input.limit,
        }),
      },
    );
  }

  seasonEpisodes(
    id: ShowId,
    season: number,
    input: ShowPageQuery = {},
  ): Promise<EpisodeResponse[]> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/episodes`,
      { params: compactQuery({ page: input.page, limit: input.limit }) },
    );
  }

  episode(
    id: ShowId,
    season: number,
    episode: number,
    input: ShowIdQuery = {},
  ): Promise<EpisodeResponse> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/episodes/${episode}`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  episodeComments(
    id: ShowId,
    season: number,
    episode: number,
    sort: ShowCommentSort,
    input: ShowCommentsQuery = {},
  ): Promise<ShowComment[]> {
    return this.api.get(
      `/v1/shows/${
        idSegment(id)
      }/seasons/${season}/episodes/${episode}/comments/${sort}`,
      {
        params: compactQuery({
          id_type: input.idType,
          page: input.page,
          limit: input.limit,
        }),
      },
    );
  }

  episodeLists(
    id: ShowId,
    season: number,
    episode: number,
    type: "movies" | "shows" | "people",
    sort: "added" | "popular" | "likes" | "comments",
    input: ShowPageQuery = {},
  ): Promise<ShowList[]> {
    return this.api.get(
      `/v1/shows/${
        idSegment(id)
      }/seasons/${season}/episodes/${episode}/lists/${type}/${sort}`,
      { params: compactQuery({ page: input.page, limit: input.limit }) },
    );
  }

  episodePeople(
    id: ShowId,
    season: number,
    episode: number,
    input: ShowIdQuery = {},
  ): Promise<ContractPeople> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/episodes/${episode}/people`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  episodeRatings(
    id: ShowId,
    season: number,
    episode: number,
    input: ShowIdQuery = {},
  ): Promise<ContractRatingSummary> {
    return this.api.get(
      `/v1/shows/${
        idSegment(id)
      }/seasons/${season}/episodes/${episode}/ratings`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  episodeReport(
    id: ShowId,
    season: number,
    episode: number,
    input: ShowNestedReportInput,
  ): Promise<ShowNestedReportResponse> {
    return this.api.post(
      `/v1/shows/${idSegment(id)}/seasons/${season}/episodes/${episode}/report`,
      {
        body: {
          reason: input.reason,
          ...(input.message !== undefined ? { message: input.message } : {}),
        },
      },
    );
  }

  episodeStats(
    id: ShowId,
    season: number,
    episode: number,
    input: ShowIdQuery = {},
  ): Promise<EpisodeStats> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/episodes/${episode}/stats`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  episodeTranslations(
    id: ShowId,
    season: number,
    episode: number,
    input: ShowTranslationsQuery = {},
  ): Promise<ShowContractTranslation[]> {
    return this.api.get(
      `/v1/shows/${
        idSegment(id)
      }/seasons/${season}/episodes/${episode}/translations`,
      {
        params: compactQuery({
          id_type: input.idType,
          language: input.language,
        }),
      },
    );
  }

  episodeTranslation(
    id: ShowId,
    season: number,
    episode: number,
    language: ShowLanguage,
    input: ShowIdQuery = {},
  ): Promise<ShowTranslation[]> {
    return this.api.get(
      `/v1/shows/${
        idSegment(id)
      }/seasons/${season}/episodes/${episode}/translations/${language}`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  episodeVideos(
    id: ShowId,
    season: number,
    episode: number,
    input: ShowIdQuery = {},
  ): Promise<ShowVideo[]> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/episodes/${episode}/videos`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  episodeWatching(
    id: ShowId,
    season: number,
    episode: number,
    input: ShowIdQuery = {},
  ): Promise<ShowWatchingUser[]> {
    return this.api.get(
      `/v1/shows/${
        idSegment(id)
      }/seasons/${season}/episodes/${episode}/watching`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  episodeWatchNow(
    id: ShowId,
    season: number,
    episode: number,
    country: ShowCountry,
    input: ShowIdQuery = {},
  ): Promise<ShowWatchNow> {
    return this.api.get(
      `/v1/shows/${
        idSegment(id)
      }/seasons/${season}/episodes/${episode}/watchnow/${country}`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  seasonInfo(
    id: ShowId,
    season: number,
    input: ShowIdQuery = {},
  ): Promise<ContractSeasonInfo> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/info`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  seasonLists(
    id: ShowId,
    season: number,
    type: ShowListType,
    sort: ShowListSort,
    input: ShowPageQuery = {},
  ): Promise<ShowList[]> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/lists/${type}/${sort}`,
      { params: compactQuery({ page: input.page, limit: input.limit }) },
    );
  }

  seasonPeople(
    id: ShowId,
    season: number,
    input: ShowIdQuery = {},
  ): Promise<ContractPeople> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/people`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  seasonRatings(
    id: ShowId,
    season: number,
    input: ShowIdQuery = {},
  ): Promise<ContractRatingSummary> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/ratings`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  seasonReport(
    id: ShowId,
    season: number,
    input: ShowNestedReportInput,
  ): Promise<ShowNestedReportResponse> {
    return this.api.post(
      `/v1/shows/${idSegment(id)}/seasons/${season}/report`,
      {
        body: {
          reason: input.reason,
          ...(input.message !== undefined ? { message: input.message } : {}),
        },
      },
    );
  }

  seasonStats(
    id: ShowId,
    season: number,
    input: ShowIdQuery = {},
  ): Promise<SeasonStats> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/stats`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  seasonTranslations(
    id: ShowId,
    season: number,
    input: ShowTranslationsQuery = {},
  ): Promise<ShowContractTranslation[]> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/translations`,
      {
        params: compactQuery({
          id_type: input.idType,
          language: input.language,
        }),
      },
    );
  }

  seasonTranslation(
    id: ShowId,
    season: number,
    language: ShowLanguage,
    input: ShowIdQuery = {},
  ): Promise<ShowTranslation[]> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/translations/${language}`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  seasonVideos(
    id: ShowId,
    season: number,
    input: ShowIdQuery = {},
  ): Promise<ShowVideo[]> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/videos`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  seasonWatching(
    id: ShowId,
    season: number,
    input: ShowIdQuery = {},
  ): Promise<ShowWatchingUser[]> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/seasons/${season}/watching`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  stats(id: ShowId, input: ShowIdQuery = {}): Promise<ShowStats> {
    return this.api.get(`/v1/shows/${idSegment(id)}/stats`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  studios(id: ShowId, input: ShowIdQuery = {}): Promise<ShowStudio[]> {
    return this.api.get(`/v1/shows/${idSegment(id)}/studios`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  translations(
    id: ShowId,
    input: ShowTranslationsQuery = {},
  ): Promise<ShowContractTranslation[]> {
    return this.api.get(`/v1/shows/${idSegment(id)}/translations`, {
      params: compactQuery({
        id_type: input.idType,
        language: input.language,
      }),
    });
  }

  translation(
    id: ShowId,
    language: ShowLanguage,
    input: ShowIdQuery = {},
  ): Promise<ShowTranslation[]> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/translations/${language}`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  videos(id: ShowId, input: ShowIdQuery = {}): Promise<ShowVideo[]> {
    return this.api.get(`/v1/shows/${idSegment(id)}/videos`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  watch(
    id: ShowId,
    input: ShowWatchQuery = {},
  ): Promise<ShowWatchProviders> {
    return this.api.get(`/v1/shows/${idSegment(id)}/watch`, {
      params: compactQuery({
        id_type: input.idType,
        country: input.country,
      }),
    });
  }

  watching(
    id: ShowId,
    input: ShowIdQuery = {},
  ): Promise<ShowWatchingUser[]> {
    return this.api.get(`/v1/shows/${idSegment(id)}/watching`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  watchNow(
    id: ShowId,
    country: ShowCountry,
    input: ShowIdQuery = {},
  ): Promise<ShowWatchNow> {
    return this.api.get(
      `/v1/shows/${idSegment(id)}/watchnow/${country}`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  anticipated(input: ShowPageQuery = {}): Promise<ShowAnticipatedEntry[]> {
    return this.api.get("/v1/shows/anticipated", {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  collected(
    period: ShowPeriod,
    input: ShowPageQuery = {},
  ): Promise<ShowRankedEntry[]> {
    return this.ranking("collected", period, input);
  }

  favorited(
    period: ShowPeriod,
    input: ShowPageQuery = {},
  ): Promise<ShowRankedEntry[]> {
    return this.ranking("favorited", period, input);
  }

  played(
    period: ShowPeriod,
    input: ShowPageQuery = {},
  ): Promise<ShowRankedEntry[]> {
    return this.ranking("played", period, input);
  }

  watched(
    period: ShowPeriod,
    input: ShowPageQuery = {},
  ): Promise<ShowRankedEntry[]> {
    return this.ranking("watched", period, input);
  }

  hot(input: ShowPageQuery = {}): Promise<ShowHotEntry[]> {
    return this.api.get("/v1/shows/hot", {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  popular(input: ShowUpdatesQuery = {}): Promise<ShowResponse[]> {
    return this.api.get("/v1/shows/popular", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        extended: input.extended,
      }),
    });
  }

  recommendations(
    id: ShowId,
    input: ShowPageQuery = {},
  ): Promise<ShowResponse[]> {
    return this.api.get(`/v1/shows/recommendations/${idSegment(id)}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  streaming(
    period: ShowStreamingPeriod,
    input: ShowPageQuery = {},
  ): Promise<ShowStreamingEntry[]> {
    return this.api.get(`/v1/shows/streaming/${period}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  trending(input: ShowUpdatesQuery = {}): Promise<ShowResponse[]> {
    return this.api.get("/v1/shows/trending", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        extended: input.extended,
      }),
    });
  }

  updates(
    startDate: string | Date,
    input: ShowUpdatesQuery = {},
  ): Promise<ShowUpdateEntry[]> {
    return this.api.get(`/v1/shows/updates/${formatDate(startDate)}`, {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        extended: input.extended,
      }),
    });
  }

  updatedIds(
    startDate: string | Date,
    input: ShowPageQuery = {},
  ): Promise<number[]> {
    return this.api.get(`/v1/shows/updates/id/${formatDate(startDate)}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  private ranking(
    kind: "collected" | "favorited" | "played" | "watched",
    period: ShowPeriod,
    input: ShowPageQuery,
  ): Promise<ShowRankedEntry[]> {
    return this.api.get(`/v1/shows/${kind}/${period}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }
}
