export type FiltersSection =
  | "calendar"
  | "progress_watched"
  | "progress_collected"
  | "recommendations"
  | "comments"
  | "dropped";

export type FiltersSavedFilter = {
  id: number;
  user_id: string;
  section: FiltersSection | string;
  name: string;
  filter: Record<string, unknown>;
  created_at: string;
};

export type FiltersSaveInput = {
  section: FiltersSection;
  name: string;
  filter?: Record<string, unknown>;
};
