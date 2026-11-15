import type { CountryCode } from "country-data-ts/countries";

export type CalendarInput = {
  startDate?: string | Date;
  days?: number;
};

export type CalendarShowType = "new" | "premieres" | "finale";

export type CalendarMovieExtended =
  | "min"
  | "full"
  | "metadata"
  | "images"
  | "all";

export type CalendarMediaType = "movie" | "show";

export type CalendarPageInput = CalendarInput & {
  page?: number;
  limit?: number;
};

export type CalendarPersonalShowsInput = CalendarPageInput & {
  type?: CalendarShowType;
};

export type CalendarCountriesInput = CalendarInput & {
  countries?: CountryCode[] | CountryCode;
};

export type CalendarMediaInput = CalendarInput & {
  type?: CalendarMediaType;
};

export type CalendarMovieInput = CalendarInput & {
  extended?: CalendarMovieExtended;
};

export type CalendarIds = {
  trakt: number;
  slug: string;
  imdb: string | null;
  tmdb: number | null;
  tvdb: number | null;
};

export type CalendarImages = {
  fanart: string[];
  poster: string[];
  logo: string[];
  clearart: string[];
  banner: string[];
  thumb: string[];
};

export type CalendarEpisodeImages = {
  screenshot: string[];
};

export type CalendarContractMovie = {
  title: string;
  year: number | null;
  ids: CalendarIds;
  images: CalendarImages;
  tagline: string | null;
  overview: string | null;
  released: string | null;
  runtime: number | null;
  status: string | null;
  rating: number;
  votes: number;
  language: string | null;
  genres: string[];
  certification: string | null;
  original_title: string | null;
  available_translations: string[];
};

export type CalendarContractShow = {
  title: string;
  year: number | null;
  ids: CalendarIds;
  images: CalendarImages;
  overview: string | null;
  first_aired: string | null;
  last_aired: string | null;
  aired_episodes: number;
  runtime: null;
  network: string | null;
  status: string | null;
  rating: number;
  votes: number;
  language: string | null;
  genres: string[];
  certification: string | null;
  original_title: string | null;
  available_translations: string[];
};

export type CalendarContractEpisode = {
  season: number;
  number: number;
  title: string | null;
  first_aired: string | null;
  released: null;
  effective_release_date: null;
  number_abs: number | null;
  rating: null;
  votes: null;
  comment_count: null;
  updated_at: string;
  available_translations: null;
  runtime: number | null;
  overview: string | null;
  episode_type: null;
  ids: CalendarIds;
  original_title: null;
  after_credits: null;
  during_credits: null;
  images: CalendarEpisodeImages;
};

export type CalendarShowRelease = {
  first_aired: string;
  episode: CalendarContractEpisode;
  show: CalendarContractShow;
};

export type CalendarMovieRelease = {
  released: string;
  movie: CalendarContractMovie;
};

export type CalendarMediaRelease =
  | {
    released: string | null;
    movie: CalendarContractMovie;
    first_aired?: never;
    episode?: never;
    show?: never;
  }
  | {
    first_aired: string | null;
    episode: CalendarContractEpisode;
    show: CalendarContractShow;
    released?: never;
    movie?: never;
  };

export type CalendarMediaIds = {
  id: number;
  trakt: number;
  slug: string;
  tmdb?: number;
  imdb?: string;
  tvdb?: string;
};

export type CalendarRatingSummary = {
  rating: number;
  votes: number;
  distribution: Record<string, number>;
};

export type CalendarMovie = {
  ids: CalendarMediaIds;
  title: string;
  year: number;
  images: CalendarImages;
  rating_summary?: CalendarRatingSummary;
  released?: string;
  original_title?: string;
  rating: number;
  votes: number;
  comment_count: number;
  trailer?: string;
  homepage?: string;
  country?: string;
  available_translations: string[];
  overview?: string;
  tagline?: string;
  runtime?: number;
  genres?: string[];
  certification?: string;
  language?: string;
  trailer_url?: string;
  status?: string;
  updated_at?: string;
  metadata?: Record<string, unknown>;
};

export type CalendarMovieResponse = {
  released: string;
  movie: CalendarMovie;
};

export type CalendarEnvelope<T> = {
  items: T[];
  page: number;
  limit: number;
  row_count: number;
};

export type CalendarEpisode = {
  ids: CalendarMediaIds;
  season: number;
  number: number;
  season_id: number;
  show_id: number;
  episode_number: number;
  title: string;
  overview?: string;
  runtime?: number;
  rating: number;
  votes: number;
  comment_count: number;
  images: Record<string, unknown>;
  rating_summary?: CalendarRatingSummary;
  first_aired?: string;
  aired_at?: string;
  absolute_number?: number;
  updated_at?: string;
};

export type CalendarShowSummary = {
  title: string;
  ids: CalendarMediaIds;
};

export type CalendarEpisodeEntry = {
  episode: CalendarEpisode;
  show: CalendarShowSummary;
  season: {
    number: number;
  };
};
