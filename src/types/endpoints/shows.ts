import type { LanguageCode } from "@hongminhee/iso639-1";
import type { CountryCode } from "country-data-ts/countries";
import type { CalendarContractShow, CalendarIds } from "./calendars.ts";
import type {
  MovieAlias,
  MovieComment,
  MovieCommentSort,
  MovieCommentsQuery,
  MovieContractTranslation,
  MovieDetailQuery,
  MovieExtended,
  MovieId,
  MovieIdQuery,
  MovieIds,
  MovieList,
  MovieListSort,
  MovieListType,
  MoviePageQuery,
  MoviePeople,
  MoviePeriod,
  MovieRefreshResponse,
  MovieReport,
  MovieReportInput,
  MovieStats,
  MovieStreamingPeriod,
  MovieStudio,
  MovieTranslation,
  MovieTranslationsQuery,
  MovieUpdatesQuery,
  MovieVideo,
  MovieWatchingUser,
  MovieWatchNow,
  MovieWatchProviders,
  MovieWatchQuery,
  RatingSummary,
} from "./movies.ts";

export type ContractRatingSummary = {
  rating: number | null;
  votes: number;
  distribution: Record<string, number>;
};

export type ShowId = MovieId;
export type ShowIdType = "tmdb" | "imdb" | "tvdb";
export type ShowExtended = MovieExtended;
export type ShowPeriod = MoviePeriod;
export type ShowStreamingPeriod = MovieStreamingPeriod;
export type ShowCommentSort = MovieCommentSort;
export type ShowListType = MovieListType;
export type ShowListSort = MovieListSort;
export type ShowPageQuery = MoviePageQuery;
export type ShowCommentsQuery = MovieCommentsQuery;
export type ShowIdQuery = MovieIdQuery;
export type ShowDetailQuery = MovieDetailQuery;
export type ShowWatchQuery = MovieWatchQuery;
export type ShowTranslationsQuery = MovieTranslationsQuery;
export type ShowUpdatesQuery = MovieUpdatesQuery;
export type ShowLanguage = LanguageCode;
export type ShowCountry = CountryCode;
export type ShowAlias = MovieAlias;
export type ShowComment = MovieComment;
export type ShowList = MovieList;
export type ShowPeople = MoviePeople;
export type ShowWatchingUser = MovieWatchingUser;
export type ShowVideo = MovieVideo;
export type ShowStudio = MovieStudio;
export type ShowContractTranslation = MovieContractTranslation;
export type ShowTranslation = MovieTranslation;
export type ShowWatchProviders = MovieWatchProviders;
export type ShowWatchNow = MovieWatchNow;
export type ShowRefreshResponse = MovieRefreshResponse;
export type ShowReportInput = MovieReportInput;
export type ShowReport = MovieReport;

export type ShowNestedReportReason =
  | "duplicate"
  | "remove"
  | "data_refresh"
  | "metadata"
  | "adult"
  | "runtime"
  | "language"
  | "spam"
  | "tmdb"
  | "other";

export type ShowNestedReportInput = {
  reason: ShowNestedReportReason;
  message?: string;
};

export type ShowNestedReportResponse = Record<string, never>;

export type ShowImages = {
  fanart: string[];
  poster: string[];
  logo: string[];
  clearart: string[];
  banner: string[];
  thumb: string[];
};

export type SeasonImages = {
  poster: string[];
  thumb: string[];
};

export type EpisodeImages = {
  screenshot: string[];
};

export type SeasonResponse = {
  ids: MovieIds;
  path?: string;
  number: number;
  show_id: number;
  season_number: number;
  episode_count: number;
  aired_episodes?: number;
  title?: string;
  overview?: string;
  first_aired?: string;
  rating: number;
  votes: number;
  images: SeasonImages;
  rating_summary?: RatingSummary;
  aired_at?: string;
  updated_at?: string;
};

export type EpisodeResponse = {
  ids: MovieIds;
  path?: string;
  season: number;
  number: number;
  number_abs?: number;
  season_id: number;
  show_id: number;
  episode_number: number;
  title: string;
  overview?: string;
  runtime?: number;
  rating: number;
  votes: number;
  comment_count: number;
  images: EpisodeImages;
  rating_summary?: RatingSummary;
  first_aired?: string;
  aired_at?: string;
  absolute_number?: number;
  updated_at?: string;
};

export type ShowResponse = {
  ids: MovieIds;
  title: string;
  year: number;
  images: ShowImages;
  rating_summary?: RatingSummary;
  rating: number;
  votes: number;
  comment_count: number;
  trailer?: string;
  homepage?: string;
  country?: string;
  aired_episodes?: number;
  available_translations: string[];
  overview?: string;
  tagline?: string;
  runtime?: number;
  genres?: string[];
  certification?: string;
  language?: string;
  network?: string;
  status?: string;
  episode_count?: number;
  season_count?: number;
  first_aired?: string;
  last_aired?: string;
  updated_at?: string;
  metadata?: Record<string, unknown>;
  seasons: SeasonResponse[];
};

export type ShowStats = MovieStats & {
  collected_episodes?: number;
};

export type SeasonStats = {
  watchers: number;
  plays: number;
  collectors: number;
  comments: number;
  lists: number;
  votes: number;
};

export type EpisodeStats = SeasonStats;

export type ContractSeasonInfo = {
  number: number;
  ids: {
    trakt: number;
    tvdb: number | null;
    tmdb: number | null;
  };
  aired_episodes: number;
  rating: null;
  votes: number | null;
  episode_count: number;
  title: string | null;
  overview: string | null;
  first_aired: string | null;
  updated_at: string;
  total_runtime: null;
  network: string | null;
  images: SeasonImages;
};

export type ContractPerson = {
  name: string;
  ids: CalendarIds;
  social_ids: null;
  biography: string | null;
  summary: null;
  birthday: string | null;
  height: null;
  deathday: string | null;
  birthplace: null;
  homepage: null;
  gender: string | null;
  known_for_department: string | null;
  updated_at: string;
  images: {
    headshot: string[];
    fanart: string[];
  };
};

export type ContractCastMember = {
  character: string;
  characters: string[];
  episode_count: number | null;
  person: ContractPerson;
};

export type ContractCrewMember = {
  job: string;
  jobs: string[];
  episode_count: number | null;
  person: ContractPerson;
};

export type ContractPeople = {
  cast: ContractCastMember[];
  crew: Record<string, ContractCrewMember[]>;
};

export type ShowProgressEpisode = {
  number: number;
  completed: boolean;
  last_watched_at?: string;
  collected_at?: string;
};

export type ShowSeasonProgress = {
  number: number;
  aired: number;
  completed: number;
  episodes: ShowProgressEpisode[];
};

export type ShowProgress = {
  aired: number;
  completed: number;
  last_watched_at?: string;
  last_collected_at?: string;
  seasons: ShowSeasonProgress[];
  next_episode: EpisodeResponse | null;
};

export type ShowProgressReset = {
  reset_at: string;
};

export type ShowRankedEntry = {
  watcher_count: number;
  play_count: number;
  collected_count: number;
  collector_count: number;
  show: CalendarContractShow;
};

export type ShowHotEntry = {
  list_count: number;
  show: CalendarContractShow;
};

export type ShowAnticipatedEntry = {
  list_count: number;
  show: CalendarContractShow;
};

export type ShowStreamingEntry = {
  rank: number;
  delta: null;
  show: CalendarContractShow;
};

export type ShowUpdateEntry = ShowResponse;
