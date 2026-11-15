import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  SyncCollectionAddInput,
  SyncCollectionAddResponse,
  SyncCollectionContractItem,
  SyncCollectionItem,
  SyncCollectionMediaItem,
  SyncCollectionMediaQuery,
  SyncCollectionRemoveInput,
  SyncCollectionRemoveResponse,
  SyncCollectionSeasonInput,
  SyncCollectionSegment,
  SyncCollectionShowInput,
  SyncCollectionTypeQuery,
  SyncDeletedResponse,
  SyncEpisodePlaybackItem,
  SyncFavoriteItem,
  SyncFavoritesAddInput,
  SyncFavoritesAddResponse,
  SyncFavoritesRemoveInput,
  SyncHistoryAddInput,
  SyncHistoryAddResponse,
  SyncHistoryItem,
  SyncHistoryQuery,
  SyncHistoryRemoveInput,
  SyncHistorySegment,
  SyncIdQuery,
  SyncIds,
  SyncIdsInput,
  SyncLastActivities,
  SyncListItemUpdateInput,
  SyncMinimalCollectionQuery,
  SyncMinimalShowsCollection,
  SyncMoviePlaybackItem,
  SyncPageQuery,
  SyncPlaybackItem,
  SyncPlaybackMediaType,
  SyncPlaybackProgressQuery,
  SyncPlaybackQuery,
  SyncProgressItem,
  SyncProgressQuery,
  SyncRatingItem,
  SyncRatingsAddInput,
  SyncRatingsAddResponse,
  SyncRatingsRemoveInput,
  SyncReorderInput,
  SyncReorderResponse,
  SyncSegment,
  SyncSession,
  SyncSessionCreateInput,
  SyncSessionItemsResponse,
  SyncTypeQuery,
  SyncUpNextNitroQuery,
  SyncWatchedItem,
  SyncWatchedProgressQuery,
  SyncWatchlistAddInput,
  SyncWatchlistAddResponse,
  SyncWatchlistItem,
  SyncWatchlistQuery,
  SyncWatchlistRemoveInput,
  SyncWatchlistReorderResponse,
  SyncWatchlistUpdateInput,
  SyncWatchlistUpdateResponse,
} from "../../types/endpoints/sync.ts";
import { formatDate } from "../../utils/dates.ts";
import { compactQuery } from "../../utils/query.ts";

const segment = (value: string | number): string =>
  encodeURIComponent(String(value));

const idsBody = (ids: SyncIds): Record<string, unknown> => {
  const body: Record<string, unknown> = {};
  if (ids.tmdb !== undefined) body.tmdb = ids.tmdb;
  if (ids.tvdb !== undefined) body.tvdb = ids.tvdb;
  if (ids.imdb !== undefined) body.imdb = ids.imdb;
  return body;
};

const historyMovieBody = (input: SyncIdsInput & { watchedAt?: string }) => ({
  ids: idsBody(input.ids),
  ...(input.watchedAt !== undefined ? { watched_at: input.watchedAt } : {}),
});

const historyEpisodeBody = (
  input: SyncIdsInput & {
    season?: number;
    number?: number;
    watchedAt?: string;
  },
) => ({
  ids: idsBody(input.ids),
  ...(input.season !== undefined ? { season: input.season } : {}),
  ...(input.number !== undefined ? { number: input.number } : {}),
  ...(input.watchedAt !== undefined ? { watched_at: input.watchedAt } : {}),
});

const historyShowBody = (
  input: SyncIdsInput & {
    seasons?: {
      number: number;
      episodes?: (SyncIdsInput & {
        season?: number;
        number?: number;
        watchedAt?: string;
      })[];
    }[];
  },
) => ({
  ids: idsBody(input.ids),
  ...(input.seasons !== undefined
    ? {
      seasons: input.seasons.map((season) => ({
        number: season.number,
        ...(season.episodes !== undefined
          ? { episodes: season.episodes.map(historyEpisodeBody) }
          : {}),
      })),
    }
    : {}),
});

const collectionMovieBody = (
  input: SyncIdsInput & { collectedAt?: string },
) => ({
  ids: idsBody(input.ids),
  ...(input.collectedAt !== undefined
    ? { collected_at: input.collectedAt }
    : {}),
});

const collectionEpisodeBody = (
  input: SyncIdsInput & {
    season?: number;
    number?: number;
    collectedAt?: string;
  },
) => ({
  ids: idsBody(input.ids),
  ...(input.season !== undefined ? { season: input.season } : {}),
  ...(input.number !== undefined ? { number: input.number } : {}),
  ...(input.collectedAt !== undefined
    ? { collected_at: input.collectedAt }
    : {}),
});

const collectionSeasonBody = (input: SyncCollectionSeasonInput) => ({
  ...(input.ids !== undefined ? { ids: idsBody(input.ids) } : {}),
  ...(input.number !== undefined ? { number: input.number } : {}),
  ...(input.episodes !== undefined
    ? { episodes: input.episodes.map(collectionEpisodeBody) }
    : {}),
  ...(input.collectedAt !== undefined
    ? { collected_at: input.collectedAt }
    : {}),
});

const collectionShowBody = (input: SyncCollectionShowInput) => ({
  ids: idsBody(input.ids),
  ...(input.seasons !== undefined
    ? { seasons: input.seasons.map(collectionSeasonBody) }
    : {}),
  ...(input.collectedAt !== undefined
    ? { collected_at: input.collectedAt }
    : {}),
});

const collectionBody = (input: SyncCollectionAddInput) => ({
  ...(input.movies !== undefined
    ? { movies: input.movies.map(collectionMovieBody) }
    : {}),
  ...(input.shows !== undefined
    ? { shows: input.shows.map(collectionShowBody) }
    : {}),
  ...(input.seasons !== undefined
    ? { seasons: input.seasons.map(collectionSeasonBody) }
    : {}),
  ...(input.episodes !== undefined
    ? { episodes: input.episodes.map(collectionEpisodeBody) }
    : {}),
});

const watchlistItemBody = (input: SyncIdsInput & { notes?: string }) => ({
  ids: idsBody(input.ids),
  ...(input.notes !== undefined ? { notes: input.notes } : {}),
});

const ratingsBody = (input: SyncRatingsAddInput) => ({
  ...(input.movies !== undefined
    ? {
      movies: input.movies.map((movie) => ({
        ids: idsBody(movie.ids),
        rating: movie.rating,
      })),
    }
    : {}),
  ...(input.shows !== undefined
    ? {
      shows: input.shows.map((show) => ({
        ids: idsBody(show.ids),
        rating: show.rating,
      })),
    }
    : {}),
  ...(input.seasons !== undefined
    ? {
      seasons: input.seasons.map((season) => ({
        ids: idsBody(season.ids),
        rating: season.rating,
      })),
    }
    : {}),
  ...(input.episodes !== undefined
    ? {
      episodes: input.episodes.map((episode) => ({
        ids: idsBody(episode.ids),
        season: episode.season,
        number: episode.number,
        rating: episode.rating,
      })),
    }
    : {}),
});

export class SyncProgressEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  upNext(input: SyncProgressQuery = {}): Promise<SyncProgressItem[]> {
    return this.api.get("/v1/sync/progress/up_next", {
      params: compactQuery({
        sort_by: input.sortBy,
        sort_how: input.sortHow,
        page: input.page,
        limit: input.limit,
        include_stats: input.includeStats,
        lifetime_stats: input.lifetimeStats,
      }),
    });
  }

  upNextNitro(input: SyncUpNextNitroQuery = {}): Promise<SyncProgressItem[]> {
    return this.api.get("/v1/sync/progress/up_next_nitro", {
      params: compactQuery({
        intent: input.intent,
        start_date: input.startDate !== undefined
          ? formatDate(input.startDate)
          : undefined,
        end_date: input.endDate !== undefined
          ? formatDate(input.endDate)
          : undefined,
        genres: input.genres,
        years: input.years,
        ratings: input.ratings,
        statuses: input.statuses,
        certifications: input.certifications,
        runtimes: input.runtimes,
        sort_by: input.sortBy,
        sort_how: input.sortHow,
        page: input.page,
        limit: input.limit,
        include_stats: input.includeStats,
        lifetime_stats: input.lifetimeStats,
      }),
    });
  }

  watched(input: SyncWatchedProgressQuery = {}): Promise<SyncProgressItem[]> {
    return this.api.get("/v1/sync/progress/watched", {
      params: compactQuery({
        sort_by: input.sortBy,
        sort_how: input.sortHow,
        page: input.page,
        limit: input.limit,
        lifetime_stats: input.lifetimeStats,
        hide_completed: input.hideCompleted,
        hide_not_completed: input.hideNotCompleted,
        only_rewatching: input.onlyRewatching,
      }),
    });
  }
}

export class SyncEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  get progress(): SyncProgressEndpoint {
    return new SyncProgressEndpoint(this.config);
  }

  collection(
    input: SyncCollectionTypeQuery = {},
  ): Promise<SyncCollectionItem[]> {
    return this.api.get("/v1/sync/collection", {
      params: compactQuery({
        type: input.type,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  collectionAdd(
    input: SyncCollectionAddInput,
  ): Promise<SyncCollectionAddResponse> {
    return this.api.post("/v1/sync/collection", {
      body: collectionBody(input),
    });
  }

  collectionRemove(
    input: SyncCollectionRemoveInput,
  ): Promise<SyncCollectionRemoveResponse> {
    return this.api.post("/v1/sync/collection/remove", {
      body: collectionBody(input),
    });
  }

  collectionType(
    type: SyncCollectionSegment,
    input: SyncPageQuery = {},
  ): Promise<SyncCollectionContractItem[]> {
    return this.api.get(`/v1/sync/collection/${segment(type)}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  collectionMovies(
    input: SyncPageQuery = {},
  ): Promise<SyncCollectionContractItem[]> {
    return this.collectionType("movies", input);
  }

  collectionShows(
    input: SyncPageQuery = {},
  ): Promise<SyncCollectionContractItem[]> {
    return this.collectionType("shows", input);
  }

  collectionEpisodes(
    input: SyncPageQuery = {},
  ): Promise<SyncCollectionContractItem[]> {
    return this.collectionType("episodes", input);
  }

  collectionMedia(
    input: SyncCollectionMediaQuery = {},
  ): Promise<SyncCollectionMediaItem[]> {
    return this.api.get("/v1/sync/collection/media", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        available_on: input.availableOn,
      }),
    });
  }

  collectionMinimalMovies(
    input: SyncMinimalCollectionQuery = {},
  ): Promise<Record<string, string>> {
    return this.api.get("/v1/sync/collection/minimal/movies", {
      params: compactQuery({ available_on: input.availableOn }),
    });
  }

  collectionMinimalShows(
    input: SyncMinimalCollectionQuery = {},
  ): Promise<SyncMinimalShowsCollection> {
    return this.api.get("/v1/sync/collection/minimal/shows", {
      params: compactQuery({ available_on: input.availableOn }),
    });
  }

  collectionMinimalEpisodes(
    input: SyncMinimalCollectionQuery = {},
  ): Promise<Record<string, string>> {
    return this.api.get("/v1/sync/collection/minimal/episodes", {
      params: compactQuery({ available_on: input.availableOn }),
    });
  }

  favorites(input: SyncTypeQuery = {}): Promise<SyncFavoriteItem[]> {
    return this.api.get("/v1/sync/favorites", {
      params: compactQuery({
        type: input.type,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  favoritesAdd(
    input: SyncFavoritesAddInput,
  ): Promise<SyncFavoritesAddResponse> {
    return this.api.post("/v1/sync/favorites", {
      body: {
        ...(input.movies !== undefined
          ? { movies: input.movies.map(historyMovieBody) }
          : {}),
        ...(input.shows !== undefined
          ? { shows: input.shows.map(historyShowBody) }
          : {}),
      },
    });
  }

  favoritesRemove(
    input: SyncFavoritesRemoveInput,
  ): Promise<SyncDeletedResponse> {
    return this.api.post("/v1/sync/favorites/remove", {
      body: {
        ...(input.movies !== undefined
          ? { movies: input.movies.map(historyMovieBody) }
          : {}),
        ...(input.shows !== undefined
          ? { shows: input.shows.map(historyShowBody) }
          : {}),
      },
    });
  }

  favoritesReorder(input: SyncReorderInput): Promise<SyncReorderResponse> {
    return this.api.post("/v1/sync/favorites/reorder", {
      body: { rank: input.rank },
    });
  }

  favoriteUpdate(
    listItemId: string | number,
    input: SyncListItemUpdateInput,
  ): Promise<void> {
    return this.api.put(
      `/v1/sync/favorites/${segment(listItemId)}`,
      {
        body: {
          ...(input.notes !== undefined ? { notes: input.notes } : {}),
          ...(input.rank !== undefined ? { rank: input.rank } : {}),
        },
      },
    );
  }

  favoritesType(
    type: "movies" | "shows",
    sortBy: string,
    sortHow: string,
    input: SyncPageQuery = {},
  ): Promise<SyncFavoriteItem[]> {
    return this.api.get(
      `/v1/sync/favorites/${segment(type)}/${segment(sortBy)}/${
        segment(sortHow)
      }`,
      { params: compactQuery({ page: input.page, limit: input.limit }) },
    );
  }

  favoritesMovies(
    input: SyncPageQuery = {},
  ): Promise<SyncFavoriteItem[]> {
    return this.api.get("/v1/sync/favorites/movies", {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  favoritesShows(
    input: SyncPageQuery = {},
  ): Promise<SyncFavoriteItem[]> {
    return this.api.get("/v1/sync/favorites/shows", {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  history(input: SyncHistoryQuery = {}): Promise<SyncHistoryItem[]> {
    return this.api.get("/v1/sync/history", {
      params: compactQuery({
        type: input.type,
        page: input.page,
        limit: input.limit,
        start_at: input.startAt,
        end_at: input.endAt,
      }),
    });
  }

  historyAdd(input: SyncHistoryAddInput): Promise<SyncHistoryAddResponse> {
    return this.api.post("/v1/sync/history", {
      body: {
        ...(input.movies !== undefined
          ? { movies: input.movies.map(historyMovieBody) }
          : {}),
        ...(input.shows !== undefined
          ? { shows: input.shows.map(historyShowBody) }
          : {}),
        ...(input.episodes !== undefined
          ? { episodes: input.episodes.map(historyEpisodeBody) }
          : {}),
      },
    });
  }

  historyRemove(
    input: SyncHistoryRemoveInput,
  ): Promise<SyncDeletedResponse> {
    return this.api.post("/v1/sync/history/remove", {
      body: {
        ...(input.ids !== undefined ? { ids: input.ids } : {}),
        ...(input.movies !== undefined
          ? { movies: input.movies.map(historyMovieBody) }
          : {}),
        ...(input.shows !== undefined
          ? { shows: input.shows.map(historyShowBody) }
          : {}),
        ...(input.episodes !== undefined
          ? { episodes: input.episodes.map(historyEpisodeBody) }
          : {}),
      },
    });
  }

  historyItem(
    mediaType: SyncSegment,
    mediaId: string | number,
    input: SyncIdQuery = {},
  ): Promise<SyncHistoryItem[]> {
    return this.api.get(
      `/v1/sync/history/${segment(mediaType)}/${segment(mediaId)}`,
      { params: compactQuery({ id_type: input.idType }) },
    );
  }

  historyMovies(input: SyncPageQuery = {}): Promise<SyncHistoryItem[]> {
    return this.historySegment("movies", input);
  }

  historyEpisodes(input: SyncPageQuery = {}): Promise<SyncHistoryItem[]> {
    return this.historySegment("episodes", input);
  }

  lastActivities(): Promise<SyncLastActivities> {
    return this.api.get("/v1/sync/last_activities");
  }

  playback(input: SyncPlaybackQuery = {}): Promise<SyncPlaybackItem[]> {
    return this.api.get("/v1/sync/playback", {
      params: compactQuery({
        type: input.type,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  playbackMovies(
    input: SyncPlaybackProgressQuery = {},
  ): Promise<SyncMoviePlaybackItem[]> {
    return this.api.get("/v1/sync/playback/movies", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        extended: input.extended,
      }),
    });
  }

  playbackEpisodes(
    input: SyncPageQuery = {},
  ): Promise<SyncEpisodePlaybackItem[]> {
    return this.api.get("/v1/sync/playback/episodes", {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  playbackRemove(
    mediaType: SyncPlaybackMediaType,
    mediaId: string | number,
  ): Promise<void> {
    return this.api.delete(
      `/v1/sync/playback/${segment(mediaType)}/${segment(mediaId)}`,
    );
  }

  playbackRemoveById(id: string | number): Promise<void> {
    return this.api.delete(`/v1/sync/playback/${segment(id)}`);
  }

  ratings(input: SyncTypeQuery = {}): Promise<SyncRatingItem[]> {
    return this.api.get("/v1/sync/ratings", {
      params: compactQuery({
        type: input.type,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  ratingsAdd(input: SyncRatingsAddInput): Promise<SyncRatingsAddResponse> {
    return this.api.post("/v1/sync/ratings", {
      body: ratingsBody(input),
    });
  }

  ratingsRemove(input: SyncRatingsRemoveInput): Promise<SyncDeletedResponse> {
    return this.api.post("/v1/sync/ratings/remove", {
      body: {
        ...(input.movies !== undefined
          ? { movies: input.movies.map(historyMovieBody) }
          : {}),
        ...(input.shows !== undefined
          ? { shows: input.shows.map(historyShowBody) }
          : {}),
        ...(input.seasons !== undefined
          ? { seasons: input.seasons.map(historyMovieBody) }
          : {}),
        ...(input.episodes !== undefined
          ? { episodes: input.episodes.map(historyEpisodeBody) }
          : {}),
      },
    });
  }

  ratingsType(
    type: SyncSegment,
    rating: number,
    input: SyncPageQuery = {},
  ): Promise<SyncRatingItem[]> {
    return this.api.get(
      `/v1/sync/ratings/${segment(type)}/${segment(rating)}`,
      { params: compactQuery({ page: input.page, limit: input.limit }) },
    );
  }

  ratingsMovies(input: SyncPageQuery = {}): Promise<SyncRatingItem[]> {
    return this.ratingsSegment("movies", input);
  }

  ratingsShows(input: SyncPageQuery = {}): Promise<SyncRatingItem[]> {
    return this.ratingsSegment("shows", input);
  }

  ratingsSeasons(input: SyncPageQuery = {}): Promise<SyncRatingItem[]> {
    return this.ratingsSegment("seasons", input);
  }

  ratingsEpisodes(input: SyncPageQuery = {}): Promise<SyncRatingItem[]> {
    return this.ratingsSegment("episodes", input);
  }

  watched(type: SyncSegment): Promise<SyncWatchedItem[]> {
    return this.api.get(`/v1/sync/watched/${segment(type)}`);
  }

  watchlist(input: SyncWatchlistQuery = {}): Promise<SyncWatchlistItem[]> {
    return this.api.get("/v1/sync/watchlist", {
      params: compactQuery({
        type: input.type,
        sort_by: input.sortBy,
        sort_how: input.sortHow,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  watchlistAdd(
    input: SyncWatchlistAddInput,
  ): Promise<SyncWatchlistAddResponse> {
    return this.api.post("/v1/sync/watchlist", {
      body: {
        ...(input.movies !== undefined
          ? { movies: input.movies.map(watchlistItemBody) }
          : {}),
        ...(input.shows !== undefined
          ? { shows: input.shows.map(watchlistItemBody) }
          : {}),
      },
    });
  }

  watchlistUpdate(
    input: SyncWatchlistUpdateInput,
  ): Promise<SyncWatchlistUpdateResponse> {
    return this.api.put("/v1/sync/watchlist", {
      body: {
        ...(input.movies !== undefined
          ? { movies: input.movies.map(watchlistItemBody) }
          : {}),
        ...(input.shows !== undefined
          ? { shows: input.shows.map(watchlistItemBody) }
          : {}),
        ...(input.seasons !== undefined ? { seasons: input.seasons } : {}),
        ...(input.episodes !== undefined ? { episodes: input.episodes } : {}),
      },
    });
  }

  watchlistRemove(
    input: SyncWatchlistRemoveInput,
  ): Promise<SyncDeletedResponse> {
    return this.api.post("/v1/sync/watchlist/remove", {
      body: {
        ...(input.movies !== undefined
          ? { movies: input.movies.map(historyMovieBody) }
          : {}),
        ...(input.shows !== undefined
          ? { shows: input.shows.map(historyShowBody) }
          : {}),
      },
    });
  }

  watchlistReorder(input: SyncReorderInput): Promise<SyncReorderResponse> {
    return this.api.post("/v1/sync/watchlist/reorder", {
      body: { rank: input.rank },
    });
  }

  watchlistReorderAll(
    input: SyncReorderInput,
  ): Promise<SyncWatchlistReorderResponse> {
    return this.api.put("/v1/sync/watchlist/reorder", {
      body: { rank: input.rank },
    });
  }

  watchlistItemUpdate(
    listItemId: string | number,
    input: SyncListItemUpdateInput,
  ): Promise<void> {
    return this.api.put(
      `/v1/sync/watchlist/${segment(listItemId)}`,
      {
        body: {
          ...(input.notes !== undefined ? { notes: input.notes } : {}),
          ...(input.rank !== undefined ? { rank: input.rank } : {}),
        },
      },
    );
  }

  watchlistType(
    type: "movies" | "shows",
    sortBy: string,
    sortHow: string,
    input: SyncPageQuery = {},
  ): Promise<SyncWatchlistItem[]> {
    return this.api.get(
      `/v1/sync/watchlist/${segment(type)}/${segment(sortBy)}/${
        segment(sortHow)
      }`,
      { params: compactQuery({ page: input.page, limit: input.limit }) },
    );
  }

  watchlistMovies(input: SyncPageQuery = {}): Promise<SyncWatchlistItem[]> {
    return this.api.get("/v1/sync/watchlist/movies", {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  watchlistShows(input: SyncPageQuery = {}): Promise<SyncWatchlistItem[]> {
    return this.api.get("/v1/sync/watchlist/shows", {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  syncCreate(input: SyncSessionCreateInput): Promise<SyncSession> {
    return this.api.post("/v1/syncs", {
      body: { kind: input.kind, items: input.items },
    });
  }

  syncGet(id: string | number): Promise<SyncSession> {
    return this.api.get(`/v1/syncs/${segment(id)}`);
  }

  syncPaused(
    id: string | number,
    input: SyncPageQuery = {},
  ): Promise<SyncSessionItemsResponse> {
    return this.api.get(`/v1/syncs/${segment(id)}/paused`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  syncSkipped(
    id: string | number,
    input: SyncPageQuery = {},
  ): Promise<SyncSessionItemsResponse> {
    return this.api.get(`/v1/syncs/${segment(id)}/skipped`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  private historySegment(
    type: SyncHistorySegment,
    input: SyncPageQuery,
  ): Promise<SyncHistoryItem[]> {
    return this.api.get(`/v1/sync/history/${segment(type)}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  private ratingsSegment(
    type: SyncSegment,
    input: SyncPageQuery,
  ): Promise<SyncRatingItem[]> {
    return this.api.get(`/v1/sync/ratings/${segment(type)}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }
}
