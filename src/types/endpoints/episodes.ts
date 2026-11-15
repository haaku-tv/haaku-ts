import type { MovieExtended, MovieReport, MovieReportInput } from "./movies.ts";
import type { EpisodeResponse, SeasonResponse, ShowResponse } from "./shows.ts";

export type EpisodeDetailQuery = {
  extended?: MovieExtended;
};

export type EpisodeFlatStats = {
  watchers: number;
  plays: number;
  rating: number;
};

export type EpisodeDetail = EpisodeResponse & {
  show?: ShowResponse;
  season_detail?: SeasonResponse;
  stats: EpisodeFlatStats;
};

export type EpisodeComment = {
  id: number;
  user_id: string;
  parent_id?: number;
  media_type?: string;
  media_id?: number;
  comment_type: string;
  body: string;
  spoiler: boolean;
  like_count: number;
  reply_count: number;
  created_at: string;
};

export type EpisodeCommentEnvelope = {
  data: EpisodeComment[];
  page: number;
  limit: number;
  total_count: number;
};

export type EpisodeListItem = {
  id: number;
  list_id: number;
  media_type: string;
  media_id: number;
  rank: number;
  notes?: string;
  added_by: string;
  added_at: string;
};

export type EpisodeList = {
  id: number;
  user_id: string;
  name: string;
  description?: string;
  slug: string;
  privacy: string;
  sort_by?: string;
  sort_how?: string;
  is_ranked: boolean;
  cover_url?: string;
  allow_comments: boolean;
  pinned_comment_id?: number;
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
};

export type EpisodeListEntry = {
  list_item: EpisodeListItem;
  list: EpisodeList;
};

export type EpisodeListsEnvelope = {
  data: EpisodeListEntry[];
  page: number;
  limit: number;
  total_count: number;
};

export type EpisodeReportInput = MovieReportInput;
export type EpisodeReport = MovieReport;
