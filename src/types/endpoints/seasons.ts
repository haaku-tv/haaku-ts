import type { MovieExtended, MovieReport } from "./movies.ts";
import type { SeasonResponse, ShowResponse } from "./shows.ts";

export type SeasonDetailQuery = {
  extended?: MovieExtended;
};

export type SeasonFlatStats = {
  watchers: number;
  plays: number;
  episodes_count: number;
  rating: number;
};

export type SeasonDetail = SeasonResponse & {
  show: ShowResponse | null;
  stats: SeasonFlatStats;
};

export type SeasonReport = MovieReport;
