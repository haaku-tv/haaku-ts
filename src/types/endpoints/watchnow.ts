export type WatchNowSourceImages = {
  logo: string | null;
  channel: null;
};

export type WatchNowSource = {
  source: string;
  name: string;
  type: null;
  free: boolean;
  cinema: boolean;
  amazon: boolean;
  color: string;
  link_count: number;
  images: WatchNowSourceImages;
};

export type WatchNowSourcesRecord = Record<string, WatchNowSource[]>;

export type WatchNowSourcesResponse = WatchNowSourcesRecord[];
