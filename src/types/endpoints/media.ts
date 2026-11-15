import type {
  CalendarContractMovie,
  CalendarContractShow,
} from "./calendars.ts";

export type MediaAnticipatedType = "movies" | "shows";

export type MediaPageQuery = {
  page?: number;
  limit?: number;
};

export type MediaAnticipatedQuery = MediaPageQuery & {
  type?: MediaAnticipatedType;
};

export type MediaAnticipatedItem = {
  media_type: string;
  id: number;
  tmdb_id: number;
  title: string;
  overview?: string;
  popularity: number;
  genres: string[];
  watchlist_count: number;
  score: number;
  release_date?: string;
  next_air_date?: string;
  status?: string;
  poster?: string;
};

export type MediaAnticipatedResponse = {
  items: MediaAnticipatedItem[];
  page: number;
  limit: number;
  row_count: number;
};

export type MediaPopularItem = CalendarContractMovie | CalendarContractShow;

export type MediaTrendingItem = {
  watchers: number;
  movie?: CalendarContractMovie;
  show?: CalendarContractShow;
};
