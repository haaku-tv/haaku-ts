/**
 * Calendar responses come in two shapes:
 *
 * - The contract-shaped feeds (`all`/`my`, `releases/hot`) return a bare array
 *   of release entries, using the Trakt-style `ids`/`images` objects.
 * - The personal feeds (`favorites`/`friends`/`watched`) return the paginated
 *   `{ items, page, limit, row_count }` envelope with the internal media shape.
 *
 * The OpenAPI document only names these responses, so these types follow the
 * handlers that actually build them (`internal/handlers/calendar`).
 */

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------

/** A calendar window. `startDate` defaults to today and `days` to 7. */
export type CalendarInput = {
  /** A `YYYY-MM-DD` string or a Date, formatted from its local date parts. */
  startDate?: string | Date;
  /** Number of calendar days in the window. The server clamps this to 1-30. */
  days?: number;
};

/** The classification accepted by the personal show feeds and the `type` query. */
export type CalendarShowType = "new" | "premieres" | "finale";

/** Extended payload level accepted by the movie calendars. */
export type CalendarMovieExtended =
  | "min"
  | "full"
  | "metadata"
  | "images"
  | "all";

/** Media kinds accepted by the merged media calendars. */
export type CalendarMediaType = "movie" | "show";

export type CalendarPageInput = CalendarInput & {
  page?: number;
  limit?: number;
};

export type CalendarPersonalShowsInput = CalendarPageInput & {
  type?: CalendarShowType;
};

export type CalendarCountriesInput = CalendarInput & {
  /** ISO 3166-1 country codes. Accepts an array or a comma-separated string. */
  countries?: string[] | string;
};

export type CalendarMediaInput = CalendarInput & {
  type?: CalendarMediaType;
};

export type CalendarMovieInput = CalendarInput & {
  extended?: CalendarMovieExtended;
};

// ---------------------------------------------------------------------------
// Contract-shaped entries (all/my and releases/hot)
// ---------------------------------------------------------------------------

/** The contract's id object: every key is present, unheld ids are `null`. */
export type CalendarIds = {
  trakt: number;
  slug: string;
  imdb: string | null;
  tmdb: number | null;
  tvdb: number | null;
};

/** Artwork keys for movies and shows. Every key present, possibly empty. */
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

/** One episode airing in the window, as served by the show calendars. */
export type CalendarShowRelease = {
  first_aired: string;
  episode: CalendarContractEpisode;
  show: CalendarContractShow;
};

/** One movie release, as served by the DVD and streaming calendars. */
export type CalendarMovieRelease = {
  released: string;
  movie: CalendarContractMovie;
};

/** One row of the merged media calendar. */
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

// ---------------------------------------------------------------------------
// Rich movie response (all/my movies)
// ---------------------------------------------------------------------------

/** The standard media id object (`id` and `trakt` carry the same row id). */
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

/** The richer movie shape served by `/calendars/{target}/movies`. */
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

// ---------------------------------------------------------------------------
// Paginated personal feeds (favorites/friends/watched)
// ---------------------------------------------------------------------------

export type CalendarEnvelope<T> = {
  items: T[];
  page: number;
  limit: number;
  row_count: number;
};

/** The internal episode shape used inside the personal feed envelope. */
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
