import type {
  CalendarContractEpisode,
  CalendarContractMovie,
  CalendarContractShow,
  CalendarMediaIds,
} from "./calendars.ts";
import type { MovieResponse } from "./movies.ts";

export type SyncMediaType = "movie" | "show" | "season" | "episode";
export type SyncCollectionMediaType = "movie" | "show" | "episode";
export type SyncPlaybackMediaType = "movie" | "show" | "episode";
export type SyncSegment = "movies" | "shows" | "seasons" | "episodes";
export type SyncCollectionSegment = "movies" | "shows" | "episodes";
export type SyncHistorySegment = "movies" | "episodes";
export type SyncSortHow = "asc" | "desc";
export type SyncWatchlistSortBy =
  | "rank"
  | "listed"
  | "added"
  | "title"
  | "popularity"
  | "released"
  | "runtime"
  | "votes"
  | "percentage"
  | "random";
export type SyncProgressSortBy = "last_watched_at" | "title" | "aired";
export type SyncUpNextIntent = "all" | "continue" | "start" | "completed";
export type SyncKind = "history" | "ratings";
export type SyncStatus = "pending" | "processing" | "completed" | "failed";
export type SyncOutcome = "added" | "not_found" | "duplicate" | "error";
export type SyncSessionErrorCode =
  | "not_found"
  | "invalid_payload"
  | "write_error";

export type SyncPageQuery = {
  page?: number;
  limit?: number;
};

export type SyncTypeQuery = SyncPageQuery & {
  type?: SyncMediaType;
};

export type SyncCollectionTypeQuery = SyncPageQuery & {
  type?: SyncCollectionMediaType;
};

export type SyncHistoryQuery = SyncPageQuery & {
  type?: "movie" | "episode";
  startAt?: string;
  endAt?: string;
};

export type SyncIdQuery = {
  idType?: "tmdb" | "imdb" | "tvdb";
};

export type SyncWatchlistQuery = SyncPageQuery & {
  type?: "movie" | "show";
  sortBy?: SyncWatchlistSortBy;
  sortHow?: SyncSortHow;
};

export type SyncPlaybackQuery = SyncPageQuery & {
  type?: SyncPlaybackMediaType;
};

export type SyncPlaybackProgressQuery = SyncPageQuery & {
  extended?: "min" | "full" | "metadata" | "images" | "all";
};

export type SyncProgressQuery = SyncPageQuery & {
  sortBy?: SyncProgressSortBy;
  sortHow?: SyncSortHow;
  includeStats?: boolean;
  lifetimeStats?: boolean;
};

export type SyncWatchedProgressQuery = SyncProgressQuery & {
  hideCompleted?: boolean;
  hideNotCompleted?: boolean;
  onlyRewatching?: boolean;
};

export type SyncUpNextNitroQuery = SyncProgressQuery & {
  intent?: SyncUpNextIntent;
  startDate?: string | Date;
  endDate?: string | Date;
  genres?: string[];
  years?: string[];
  ratings?: string[];
  statuses?: string[];
  certifications?: string[];
  runtimes?: string[];
};

export type SyncCollectionMediaQuery = SyncPageQuery & {
  availableOn?: string;
};

export type SyncMinimalCollectionQuery = {
  availableOn?: string;
};

export type SyncIds = {
  tmdb?: number;
  tvdb?: number | string;
  imdb?: string;
};

export type SyncIdsInput = {
  ids: SyncIds;
};

export type SyncHistoryMovieInput = SyncIdsInput & {
  watchedAt?: string;
};

export type SyncHistoryEpisodeInput = SyncIdsInput & {
  season?: number;
  number?: number;
  watchedAt?: string;
};

export type SyncHistorySeasonInput = {
  number: number;
  episodes?: SyncHistoryEpisodeInput[];
};

export type SyncHistoryShowInput = SyncIdsInput & {
  seasons?: SyncHistorySeasonInput[];
};

export type SyncHistoryAddInput = {
  movies?: SyncHistoryMovieInput[];
  shows?: SyncHistoryShowInput[];
  episodes?: SyncHistoryEpisodeInput[];
};

export type SyncHistoryRemoveInput = {
  ids?: number[];
  movies?: SyncHistoryMovieInput[];
  shows?: SyncHistoryShowInput[];
  episodes?: SyncHistoryEpisodeInput[];
};

export type SyncCollectionMovieInput = SyncIdsInput & {
  collectedAt?: string;
};

export type SyncCollectionEpisodeInput = SyncIdsInput & {
  season?: number;
  number?: number;
  collectedAt?: string;
};

export type SyncCollectionSeasonInput = {
  ids?: SyncIds;
  number?: number;
  episodes?: SyncCollectionEpisodeInput[];
  collectedAt?: string;
};

export type SyncCollectionShowInput = SyncIdsInput & {
  seasons?: SyncCollectionSeasonInput[];
  collectedAt?: string;
};

export type SyncCollectionAddInput = {
  movies?: SyncCollectionMovieInput[];
  shows?: SyncCollectionShowInput[];
  seasons?: SyncCollectionSeasonInput[];
  episodes?: SyncCollectionEpisodeInput[];
};

export type SyncCollectionRemoveInput = SyncCollectionAddInput;

export type SyncWatchlistItemInput = SyncIdsInput & {
  notes?: string;
};

export type SyncWatchlistShowInput = SyncWatchlistItemInput;

export type SyncFavoritesAddInput = {
  movies?: SyncIdsInput[];
  shows?: SyncHistoryShowInput[];
};

export type SyncFavoritesRemoveInput = {
  movies?: SyncIdsInput[];
  shows?: SyncIdsInput[];
};

export type SyncWatchlistAddInput = {
  movies?: SyncWatchlistItemInput[];
  shows?: SyncWatchlistShowInput[];
};

export type SyncWatchlistUpdateInput = SyncWatchlistAddInput & {
  seasons?: Record<string, unknown>[];
  episodes?: Record<string, unknown>[];
};

export type SyncWatchlistRemoveInput = {
  movies?: SyncIdsInput[];
  shows?: SyncIdsInput[];
};

export type SyncListItemUpdateInput = {
  notes?: string;
  rank?: number;
};

export type SyncReorderInput = {
  rank: number[];
};

export type SyncRatingMovieInput = SyncIdsInput & {
  rating: number;
};

export type SyncRatingEpisodeInput = SyncIdsInput & {
  season: number;
  number: number;
  rating: number;
};

export type SyncRatingsAddInput = {
  movies?: SyncRatingMovieInput[];
  shows?: SyncRatingMovieInput[];
  seasons?: SyncRatingMovieInput[];
  episodes?: SyncRatingEpisodeInput[];
};

export type SyncRatingsRemoveInput = {
  movies?: SyncIdsInput[];
  shows?: SyncIdsInput[];
  seasons?: SyncIdsInput[];
  episodes?: SyncHistoryEpisodeInput[];
};

export type SyncTypeCounts = {
  movies: number;
  shows: number;
  episodes: number;
  seasons: number;
};

export type SyncDuplicateCounts = {
  movies: number;
  shows: number;
  seasons: number;
  episodes: number;
};

export type SyncNotFoundLists = {
  movies: unknown[];
  shows: unknown[];
  seasons: unknown[];
  episodes: unknown[];
};

export type SyncNestedNotFound = {
  movies: unknown[];
  shows: unknown[];
  seasons: unknown[];
  episodes: unknown[];
};

export type SyncHistoryAddResponse = {
  added: {
    movies: number;
    episodes: number;
  };
  not_found: SyncNestedNotFound;
  duplicates: {
    movies: number;
    episodes: number;
  };
};

export type SyncDeletedResponse = {
  deleted: number;
};

export type SyncCollectionAddResponse = {
  added: SyncTypeCounts;
  updated: SyncTypeCounts;
  existing: SyncTypeCounts;
  duplicates: SyncTypeCounts;
  not_found: Record<string, unknown>;
};

export type SyncCollectionRemoveResponse = {
  deleted: SyncTypeCounts;
  not_found: Record<string, unknown>;
};

export type SyncWatchlistAddResponse = {
  added: {
    movies: number;
    shows: number;
  };
  not_found: {
    movies: unknown[];
    shows: unknown[];
  };
  duplicates: {
    movies: number;
    shows: number;
  };
};

export type SyncWatchlistUpdateResponse = {
  added: SyncTypeCounts;
  existing: SyncTypeCounts;
  not_found: SyncNotFoundLists;
};

export type SyncReorderResponse = {
  updated: number;
  skipped_ids: number[];
  list: {
    updated_at: string;
    item_count: number;
  };
};

export type SyncWatchlistReorderResponse = {
  success: boolean;
  count: number;
};

export type SyncRatingsAddResponse = {
  added: SyncTypeCounts;
  not_found: {
    movies: unknown[];
  };
};

export type SyncFavoritesAddResponse = {
  added: {
    movies: number;
    shows: number;
  };
  not_found: {
    movies: unknown[];
    shows: unknown[];
  };
  duplicates: {
    movies: number;
    shows: number;
  };
};

export type SyncContractMovie = CalendarContractMovie;
export type SyncContractShow = CalendarContractShow;
export type SyncContractEpisode = CalendarContractEpisode;

export type SyncSeasonImages = {
  poster: string[];
  thumb: string[];
};

export type SyncWatchedSeason = {
  number: number;
  ids: {
    trakt: number;
    tvdb: null;
    tmdb: null;
    imdb: null;
  };
  episode_count: number;
  aired_episodes: number;
  title: null;
  overview: null;
  images: SyncSeasonImages;
};

export type SyncHistoryItem = {
  id: number;
  watched_at: string;
  action: string;
  type: string;
  media_type: SyncMediaType;
  media_id: number;
  source?: string;
  season_id?: number;
  episode_id?: number;
  movie?: SyncContractMovie;
  show?: SyncContractShow;
  season?: SyncWatchedSeason;
  episode?: SyncContractEpisode;
};

export type SyncCollectionItem = {
  id: number;
  collected_at: string;
  type: SyncCollectionMediaType;
  media_type: SyncCollectionMediaType;
  media_id: number;
  movie?: SyncContractMovie;
  show?: SyncContractShow;
  episode?: SyncContractEpisode;
};

export type SyncCollectionContractItem = {
  type: string;
  collected_at: string;
  updated_at: string;
  movie?: SyncContractMovie;
  show?: SyncContractShow;
  episode?: SyncContractEpisode;
};

export type SyncCollectionMediaItem = {
  type: string;
  collected_at?: string;
  updated_at?: string;
  last_collected_at?: string;
  last_updated_at?: string;
  seasons?: unknown[];
  movie?: SyncContractMovie;
  show?: SyncContractShow;
  episode?: SyncContractEpisode;
};

export type SyncWatchlistItem = {
  id: number;
  rank: number;
  listed_at: string;
  type: SyncMediaType;
  media_type: SyncMediaType;
  media_id: number;
  notes?: string;
  movie?: SyncContractMovie;
  show?: SyncContractShow;
};

export type SyncFavoriteItem = {
  id: number;
  rank: number;
  listed_at: string;
  favorited_at: string;
  type: SyncMediaType;
  media_type: SyncMediaType;
  media_id: number;
  movie?: SyncContractMovie;
  show?: SyncContractShow;
};

export type SyncRatingItem = {
  id: number;
  rated_at: string;
  rating: number;
  type: SyncMediaType;
  media_type: SyncMediaType;
  media_id: number;
  movie?: SyncContractMovie;
  show?: SyncContractShow;
  season?: SyncWatchedSeason;
  episode?: SyncContractEpisode;
};

export type SyncWatchedMovieItem = {
  plays: number;
  last_watched_at: string;
  type: "movie";
  movie: SyncContractMovie;
};

export type SyncWatchedShowItem = {
  plays: number;
  last_watched_at: string;
  type: "show";
  show: SyncContractShow;
};

export type SyncWatchedEpisodeItem = {
  plays: number;
  last_watched_at: string;
  type: "episode";
  episode: SyncContractEpisode;
  show: SyncContractShow;
};

export type SyncWatchedSeasonItem = {
  plays: number;
  last_watched_at: string;
  type: "season";
  season: SyncWatchedSeason;
  show?: SyncContractShow;
};

export type SyncWatchedItem =
  | SyncWatchedMovieItem
  | SyncWatchedShowItem
  | SyncWatchedEpisodeItem
  | SyncWatchedSeasonItem;

export type SyncProgressStats = {
  play_count: number;
  minutes_watched: number;
  minutes_left: number;
};

export type SyncProgress = {
  aired: number;
  completed: number;
  last_watched_at: string | null;
  reset_at: null;
  next_episode: SyncContractEpisode | null;
  last_episode: SyncContractEpisode | null;
  stats?: SyncProgressStats;
};

export type SyncProgressItem = {
  show: SyncContractShow;
  progress: SyncProgress;
};

export type SyncPlaybackItem = {
  media_type: SyncPlaybackMediaType;
  media_id: number;
  progress: number;
  paused_at: string;
};

export type SyncMoviePlaybackItem = {
  progress: number;
  paused_at: string;
  movie: MovieResponse;
};

export type SyncEpisodePlaybackInfo = {
  title: string;
  season: number;
  number: number;
};

export type SyncShowPlaybackInfo = {
  title: string;
  ids: CalendarMediaIds;
};

export type SyncEpisodePlaybackItem = {
  progress: number;
  paused_at: string;
  episode: SyncEpisodePlaybackInfo;
  show: SyncShowPlaybackInfo;
};

export type SyncActivity = {
  updated_at: string | null;
};

export type SyncMovieActivities = {
  watched_at: string | null;
  collected_at: string | null;
  rated_at: string | null;
  watchlisted_at: string | null;
  favorited_at: string | null;
  commented_at: string | null;
  paused_at: string | null;
  hidden_at: string | null;
};

export type SyncEpisodeActivities = {
  watched_at: string | null;
  collected_at: string | null;
  rated_at: string | null;
  watchlisted_at: string | null;
  commented_at: string | null;
  paused_at: string | null;
};

export type SyncShowActivities = {
  rated_at: string | null;
  watchlisted_at: string | null;
  favorited_at: string | null;
  commented_at: string | null;
  hidden_at: string | null;
};

export type SyncSeasonActivities = {
  rated_at: string | null;
  watchlisted_at: string | null;
  commented_at: string | null;
  hidden_at: string | null;
};

export type SyncCommentActivities = {
  liked_at: string | null;
};

export type SyncListActivities = {
  liked_at: string | null;
  updated_at: string | null;
  commented_at: string | null;
};

export type SyncLastActivities = {
  all: string | null;
  movies: SyncMovieActivities | null;
  episodes: SyncEpisodeActivities | null;
  shows: SyncShowActivities | null;
  seasons: SyncSeasonActivities | null;
  ratings: SyncActivity | null;
  watchlist: SyncActivity | null;
  favorites: SyncActivity | null;
  collection: SyncActivity | null;
  history: SyncActivity | null;
  comments: SyncCommentActivities | null;
  notes: SyncActivity | null;
  lists: SyncListActivities | null;
  follows: SyncActivity | null;
  checkins: SyncActivity | null;
  playback: SyncActivity | null;
};

export type SyncMinimalShowsCollection = Record<
  string,
  Record<string, Record<string, string>>
>;

export type SyncSessionCreateInput = {
  kind: SyncKind;
  items: Record<string, unknown>[];
};

export type SyncErrorCounts = {
  added: number;
  not_found: number;
  duplicate: number;
  error: number;
};

export type SyncItemError = {
  item_id: number;
  seq: number;
  code: SyncSessionErrorCode;
  message: string;
  ids?: Record<string, unknown>;
};

export type SyncErrors = {
  counts: SyncErrorCounts;
  items: SyncItemError[];
};

export type SyncSession = {
  id: number;
  user_id: string;
  kind: SyncKind;
  status: SyncStatus;
  total_items: number;
  processed_items: number;
  errors: SyncErrors;
  created_at: string;
  updated_at: string;
};

export type SyncSessionItem = {
  id: number;
  seq: number;
  media_type?: string;
  media_id?: number;
  outcome: SyncOutcome;
  error_code?: string;
  error?: string;
  watched_at?: string;
  rating?: number;
  payload?: Record<string, unknown>;
  processed_at?: string;
};

export type SyncSessionItemsResponse = {
  session_id: number;
  status: SyncStatus;
  items: SyncSessionItem[];
  page: number;
  limit: number;
  row_count: number;
};
