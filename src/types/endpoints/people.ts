import type { MovieListSort, MovieListType, MoviePerson } from "./movies.ts";
import type { ContractPerson, ShowList } from "./shows.ts";

export type PersonId = string | number;
export type PersonIdType = "tmdb" | "imdb" | "tvdb";
export type PersonListType = MovieListType;
export type PersonListSort = MovieListSort;

export type PersonIdQuery = {
  idType?: PersonIdType;
};

export type PersonPageQuery = {
  page?: number;
  limit?: number;
};

export type PersonDetail = ContractPerson;
export type PersonList = ShowList;

export type PersonCredit = {
  media_type: string;
  media_id: number;
  title?: string;
  year?: number;
  credit_type: string;
  job?: string;
  character?: string;
  department?: string;
  series_regular?: boolean;
  episode_count?: number;
};

export type PersonCredits = {
  cast?: PersonCredit[];
  crew?: PersonCredit[];
};

export type PersonResponse = MoviePerson & {
  credits?: PersonCredits;
};

export type PersonUpdateEntry = PersonResponse;

export type PersonCreditIds = {
  id: number;
  trakt: number;
  tmdb: number;
};

export type PersonCreditTitle = {
  type: string;
  title: string;
  year?: number;
  ids: PersonCreditIds;
  images: {
    poster: string;
  };
  in_catalog: boolean;
};

export type PersonCastCredit = {
  character?: string;
  title: PersonCreditTitle;
};

export type PersonCrewCredit = {
  job?: string;
  department?: string;
  title: PersonCreditTitle;
};

export type PersonFilmography = {
  cast: PersonCastCredit[];
  crew: Record<string, PersonCrewCredit[]>;
};

export type PersonReportReason =
  | "duplicate"
  | "remove"
  | "data_refresh"
  | "metadata"
  | "adult"
  | "language"
  | "spam"
  | "tmdb"
  | "other";

export type PersonReportInput = {
  reason: PersonReportReason;
  message?: string;
};

export type PersonReportResponse = Record<string, never>;
