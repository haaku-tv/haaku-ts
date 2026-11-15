import type { LanguageCode } from "@hongminhee/iso639-1";
import type { CountryCode } from "country-data-ts/countries";
import type {
  CalendarContractMovie,
  CalendarImages,
  CalendarMediaIds,
  CalendarMovie,
  CalendarMovieExtended,
  CalendarRatingSummary,
} from "./calendars.ts";

export type MovieId = string | number;
export type MovieIdType = "tmdb" | "imdb" | "tvdb";
export type MovieExtended = CalendarMovieExtended;

export type MoviePeriod = "daily" | "weekly" | "monthly" | "yearly" | "all";
export type MovieStreamingPeriod = "daily" | "weekly" | "monthly";
export type MovieCommentSort =
  | "newest"
  | "oldest"
  | "likes"
  | "replies"
  | "trending";
export type MovieListType =
  | "all"
  | "personal"
  | "official"
  | "watchlist"
  | "favorites";
export type MovieListSort =
  | "popular"
  | "likes"
  | "comments"
  | "items"
  | "added"
  | "updated";
export type MovieReportReason =
  | "spam"
  | "spoiler"
  | "offensive"
  | "incorrect"
  | "duplicate"
  | "other";

export type MoviePageQuery = {
  page?: number;
  limit?: number;
};

export type MovieCommentsQuery = MoviePageQuery & {
  idType?: MovieIdType;
};

export type MovieIdQuery = {
  idType?: MovieIdType;
};

export type MovieDetailQuery = MovieIdQuery & {
  extended?: MovieExtended;
};

export type MovieWatchQuery = MovieIdQuery & {
  country?: CountryCode;
};

export type MovieTranslationsQuery = MovieIdQuery & {
  language?: LanguageCode;
};

export type MovieUpdatesQuery = MoviePageQuery & {
  extended?: MovieExtended;
};

export type MovieReportInput = {
  reason: MovieReportReason;
  description?: string;
};

export type MovieResponse = CalendarMovie;
export type MovieIds = CalendarMediaIds;
export type MovieImages = CalendarImages;
export type RatingSummary = CalendarRatingSummary;

export type MoviePerson = {
  ids: MovieIds;
  name: string;
  biography?: string;
  birthday?: string;
  deathday?: string;
  gender: number;
  known_for_department?: string;
  images: {
    headshot: string[];
    fanart: string[];
  };
};

export type MovieCastMember = {
  person: MoviePerson;
  character: string;
  order: number;
};

export type MovieCrewMember = {
  person: MoviePerson;
  job: string;
  department: string;
};

export type MoviePeople = {
  cast?: MovieCastMember[];
  crew?: MovieCrewMember[];
};

export type MovieStats = {
  watchers: number;
  plays: number;
  collectors: number;
  comments: number;
  lists: number;
  votes: number;
  favorited: number;
  recommended: number | null;
};

export type MovieComment = {
  id: number;
  user_id: string;
  parent_id?: number;
  media_type?: string;
  media_id?: number;
  list_id?: number;
  comment_type: string;
  body: string;
  spoiler: boolean;
  like_count: number;
  reply_count: number;
  edited_at?: string;
  created_at: string;
  updated_at: string;
};

export type MovieList = {
  name: string;
  description: string | null;
  privacy: string;
  share_link: string;
  type: string;
  display_numbers: boolean;
  allow_comments: boolean;
  sort_by: string;
  sort_how: string;
  created_at: string;
  updated_at: string;
  item_count: number;
  comment_count: number;
  likes: number;
  ids: {
    trakt: number;
    slug: string;
  };
  user: {
    username: string;
    private: boolean;
    deleted: boolean;
    name: string | null;
    ids: {
      trakt: number;
      slug: string | null;
    };
  };
  images: {
    posters: string[];
  };
};

export type MovieWatchingUser = {
  username: string;
  private: boolean;
  deleted: boolean;
  name: string | null;
  vip: boolean;
  vip_ep: boolean;
  director: boolean;
  ids: {
    slug: string | null;
    trakt: number;
  };
  joined_at: string;
  location: string | null;
  about: string | null;
  gender: null;
  age: null;
  images?: {
    avatar: {
      full: string;
    };
  };
};

export type MovieRankedEntry = {
  watcher_count: number;
  play_count: number;
  collected_count: number;
  movie: CalendarContractMovie;
};

export type MovieHotEntry = {
  list_count: number;
  movie: CalendarContractMovie;
};

export type MovieAnticipatedEntry = {
  list_count: number;
  movie: CalendarContractMovie;
};

export type MovieStreamingEntry = {
  rank: number;
  delta: null;
  movie: CalendarContractMovie;
};

export type MovieUpdateEntry = {
  updated_at: string;
  movie: MovieResponse;
};

export type MovieVideo = {
  title: string;
  url: string;
  site: string;
  type: string;
  size: number;
  official: boolean;
  published_at: string;
  country: CountryCode | "";
  language: LanguageCode | "";
};

export type MovieRelease = {
  country: CountryCode;
  certification: string | null;
  release_date: string;
  release_type: string;
  note: null;
};

export type MovieStudio = {
  name: string;
  country: CountryCode | null;
  ids: {
    slug: string;
    trakt: number;
    tmdb: number | null;
  };
};

export type MovieContractTranslation = {
  title: string | null;
  overview: string | null;
  tagline: string | null;
  language: LanguageCode;
  country: CountryCode | null;
};

export type MovieTranslation = {
  language: LanguageCode;
  title: string;
  overview: string;
  tagline?: string;
};

export type MovieAlias = {
  title: string;
  country: CountryCode | "";
};

export type MovieProvider = {
  provider_id: number;
  name: string;
  logo_path: string;
};

export type MovieWatchProviders = {
  link?: string;
  flatrate?: MovieProvider[];
  rent?: MovieProvider[];
  buy?: MovieProvider[];
};

export type MovieWatchNowProvider = {
  source: string;
  link: string;
  uhd: boolean;
  currency: null;
  prices: {
    rent: null;
    purchase: null;
  };
  link_tvos: null;
};

export type MovieWatchNow = {
  cable: MovieWatchNowProvider[];
  free: MovieWatchNowProvider[];
  cinema: MovieWatchNowProvider[];
  subscription: MovieWatchNowProvider[];
  purchase: MovieWatchNowProvider[];
};

export type MovieJustWatchLinks = {
  web?: string;
};

export type MovieRefreshResponse = Record<string, never>;

export type MovieReport = {
  id: number;
  reporter_id: string;
  media_type: string;
  media_id: number;
  reason: string;
  description: string;
  status: string;
  resolution_note?: string;
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
};
