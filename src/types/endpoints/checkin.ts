export type CheckinIds = {
  tmdb: number | string;
};

export type CheckinMediaItem = {
  ids: CheckinIds;
  season?: number;
  number?: number;
};

export type CheckinSharing = {
  twitter: boolean;
  tumblr: boolean;
  facebook: boolean;
};

export type CheckinInput = {
  movie?: CheckinMediaItem;
  episode?: CheckinMediaItem;
  show?: CheckinMediaItem;
  message?: string;
  sharing?: CheckinSharing;
};

export type CheckinMediaRef = {
  ids: {
    tmdb: number;
  };
  title: string;
  year?: number;
};

export type CheckinResponse = {
  id: number;
  expires_at: string;
  watched_at: string;
  movie?: CheckinMediaRef;
  episode?: CheckinMediaRef;
  show?: CheckinMediaRef;
  message?: string;
};
