export type SmartListId = number;

export type SmartListFilters = Record<string, unknown>;

export type SmartListRecord = {
  id: number;
  user_id: string;
  name: string;
  filters: SmartListFilters;
  created_at: string;
  updated_at: string;
};

export type SmartListInput = {
  name?: string;
  filters?: SmartListFilters;
};

export type SmartListResolvedItem = {
  type: "movie" | "show";
  title: string;
  year: number;
  rating: number;
  poster: string;
  movie_id?: number;
  show_id?: number;
};

export type SmartListItemType =
  | "movie"
  | "show"
  | "movies"
  | "shows"
  | "media";

export type SmartListItemQuery = {
  type?: SmartListItemType;
  sortBy?: string;
  page?: number;
  limit?: number;
};

export type SmartListResolvedPage = {
  items: SmartListResolvedItem[];
  page: number;
  limit: number;
  row_count: number;
};

export type SmartListTemplate = Record<string, unknown>;
