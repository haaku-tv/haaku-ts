import type {
  CalendarContractEpisode,
  CalendarContractMovie,
  CalendarContractShow,
} from "./calendars.ts";

export type NotesMediaType = "movie" | "show" | "season" | "episode";

export type NotesNote = {
  id: number;
  user_id: string;
  media_type: NotesMediaType | string;
  media_id: number;
  note: string;
  created_at: string;
  updated_at: string;
};

export type NotesCreateInput = {
  media_type: NotesMediaType;
  media_id: number;
  note: string;
};

export type NotesUpdateInput = {
  note: string;
};

export type NotesListQuery = {
  page?: number;
  limit?: number;
  mediaType?: NotesMediaType;
};

export type NotesList = {
  data: NotesNote[];
  page: number;
  limit: number;
  total_count: number;
};

export type NotesContractSeason = {
  number: number;
  ids: {
    trakt: number;
    tvdb: null;
    tmdb: null;
    imdb: null;
  };
  aired_episodes: number;
  episode_count: number;
  title: null;
  overview: null;
  rating: null;
  votes: null;
  total_runtime: null;
  network: null;
  updated_at: string;
  images: {
    poster: string[];
    thumb: string[];
  };
  first_aired?: string;
};

export type NotesItem =
  | { type: "movie"; movie: CalendarContractMovie }
  | { type: "show"; show: CalendarContractShow }
  | { type: "season"; season: NotesContractSeason }
  | { type: "episode"; episode: CalendarContractEpisode };
