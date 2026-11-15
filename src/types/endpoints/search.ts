import type {
  CalendarContractMovie,
  CalendarContractShow,
} from "./calendars.ts";
import type { MovieIds, MovieList, MovieResponse } from "./movies.ts";
import type { ContractPerson, ShowResponse } from "./shows.ts";

export type SearchType = "movie" | "show" | "episode" | "person" | "list";
export type SearchContractType = "movie" | "show" | "person";
export type SearchExactType = "movie" | "show";
export type SearchExternalIdType = "trakt" | "imdb" | "tmdb" | "tvdb";
export type SearchResolveIdType = "tmdb" | "tvdb" | "imdb";
export type SearchResolveType = "movie" | "show";
export type SearchSource = "catalog" | "tmdb";
export type SearchRecentRequestType = "movies" | "shows" | "people" | "lists";
export type SearchRecentGlobalType = "movies" | "shows" | "people";

export type SearchQuery = {
  query?: string;
  type?: SearchType | SearchType[];
  page?: number;
  limit?: number;
  fields?: string | string[];
  genre?: string | string[];
  year?: number;
};

export type SearchPostInput = {
  query?: string;
  type?: SearchType;
  types?: SearchType[];
  year?: number;
  genre?: string;
  genres?: string[];
  page?: number;
  limit?: number;
  fields?: string[];
};

export type SearchPageQuery = {
  page?: number;
  limit?: number;
};

export type SearchTypeQuery = SearchPageQuery & {
  query: string;
};

export type SearchExactQuery = {
  query: string;
  type: SearchExactType;
};

export type SearchLookupQuery = {
  idType: SearchExternalIdType;
  id: string | number;
};

export type SearchExternalIdQuery = {
  type?: SearchContractType;
};

export type SearchRecentQuery = SearchPageQuery & {
  query?: string;
};

export type SearchRecentInput = {
  query: string;
  id: number;
  type: SearchRecentRequestType;
};

export type SearchRecordRecentInput = {
  query: string;
  type?: SearchType;
};

export type SearchResolveQuery = {
  type: SearchResolveType;
  idType?: SearchResolveIdType;
  id: string | number;
};

export type SearchMedia = {
  ids: MovieIds;
  title: string;
  year: number;
  overview?: string;
  images: Record<string, unknown>;
  rating?: number;
  votes?: number;
  genres?: string[];
  network?: string;
  in_catalog: boolean;
};

export type SearchPerson = {
  ids: MovieIds;
  name: string;
  known_for?: string;
  images: Record<string, unknown>;
  in_catalog: boolean;
};

export type SearchEpisode = {
  ids: MovieIds;
  show_ids: MovieIds;
  title: string;
  season: number;
  number: number;
  overview?: string;
  images: Record<string, unknown>;
  runtime?: number;
  first_aired?: string;
  show_title?: string;
};

export type SearchListItem = MovieList & {
  user?: MovieList["user"] & {
    ids: MovieList["user"]["ids"] & {
      local?: number;
    };
  };
};

export type SearchItem = {
  type: SearchType;
  score?: number;
  source: SearchSource;
  movie?: SearchMedia;
  show?: SearchMedia;
  episode?: SearchEpisode;
  person?: SearchPerson;
  list?: SearchListItem;
};

export type SearchContractItem = {
  score: number;
  type: string;
  movie?: CalendarContractMovie;
  show?: CalendarContractShow;
  person?: ContractPerson;
};

export type SearchExactResponse = {
  type: SearchExactType;
  movie?: Record<string, unknown>;
  show?: Record<string, unknown>;
  not_found?: boolean;
  candidates?: string[];
};

export type SearchLookupResponse = {
  type: string;
  movie?: Record<string, unknown>;
  show?: Record<string, unknown>;
};

export type SearchRecentEntry = {
  id: number;
  query: string;
  type?: string;
  searched_at: string;
};

export type SearchRecentByIdItem = {
  id: number;
  count: number;
  type: string;
  movie?: CalendarContractMovie;
  show?: CalendarContractShow;
  person?: ContractPerson;
};

export type SearchResolveResponse = MovieResponse | ShowResponse;
