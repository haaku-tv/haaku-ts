export type ScrobbleIds = {
  tmdb: number | string;
};

export type ScrobbleMediaItem = {
  ids: ScrobbleIds;
  season?: number;
  number?: number;
};

export type ScrobbleInput = {
  movie?: ScrobbleMediaItem;
  episode?: ScrobbleMediaItem;
  show?: ScrobbleMediaItem;
  progress: number;
};

export type ScrobbleResponse = {
  id?: number;
  action: string;
  progress: number;
  watched_at?: string;
};
