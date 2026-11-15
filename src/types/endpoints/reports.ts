import type { MovieReport } from "./movies.ts";

export type ReportsStatus = "open" | "resolved" | "dismissed";

export type ReportsTargetType =
  | "movie"
  | "show"
  | "season"
  | "episode"
  | "person";

export type ReportsQuery = {
  status?: ReportsStatus;
  targetType?: ReportsTargetType;
  page?: number;
  limit?: number;
};

export type ReportsActionInput = {
  note?: string;
};

export type ReportsReport = MovieReport;
