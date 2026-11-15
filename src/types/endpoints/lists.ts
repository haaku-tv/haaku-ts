import type {
  CalendarContractEpisode,
  CalendarContractMovie,
  CalendarContractShow,
} from "./calendars.ts";
import type { MovieList } from "./movies.ts";
import type { ContractSeasonInfo } from "./shows.ts";

export type ListId = string | number;
export type ListUserId = string | number;
export type ListPrivacy = "public" | "shared" | "link_only" | "private";
export type ListItemType = "movie" | "show" | "season" | "episode";
export type ListItemSortBy = "rank" | "added";
export type ListItemSortHow = "asc" | "desc";
export type ListFeedType = "movies" | "shows" | "people";
export type ListPeriod = "weekly" | "monthly" | "all";
export type ListCommentSort =
  | "newest"
  | "oldest"
  | "likes"
  | "replies"
  | "trending";
export type ListCollaboratorRole = "editor" | "viewer";
export type ListReportReason =
  | "duplicate"
  | "remove"
  | "metadata"
  | "adult"
  | "language"
  | "spam"
  | "other";

export type ListPageQuery = {
  page?: number;
  limit?: number;
};

export type ListPopularQuery = ListPageQuery & {
  period?: ListPeriod;
};

export type ListItemsQuery = ListPageQuery & {
  type?: ListItemType;
};

export type ListResponse = MovieList;

export type ListUser = MovieList["user"];

export type ListItem = {
  rank: number;
  id: number;
  listed_at: string;
  notes: string | null;
  type: ListItemType;
  movie?: CalendarContractMovie | null;
  show?: CalendarContractShow | null;
  season?: ContractSeasonInfo | null;
  episode?: CalendarContractEpisode | null;
};

export type ListFeedItem = {
  list: ListResponse;
  like_count: number;
  comment_count: number;
};

export type ListFeedResponse = {
  items: ListFeedItem[];
  page: number;
  limit: number;
  row_count: number;
};

export type ListCommentGif = {
  url: string;
  slug: string | null;
};

export type ListCommentUserStats = {
  rating: null;
  play_count: number;
  completed_count: number;
};

export type ListComment = {
  id: number;
  parent_id: number;
  created_at: string;
  updated_at: string;
  comment: string;
  gif: ListCommentGif | null;
  spoiler: boolean;
  review: boolean;
  replies: number;
  likes: number;
  language: null;
  user_rating: null;
  user_stats: ListCommentUserStats;
  user: ListUser;
  pinned: boolean;
};

export type ListLike = {
  user_id: string;
  created_at: string;
};

export type ListContractLike = {
  liked_at: string;
  user: ListUser;
};

export type ListLikeResponse = {
  liked: boolean;
};

export type ListPinInput = {
  commentId: number;
};

export type ListPinResponse = {
  pinned_comment_id: number;
};

export type ListReportInput = {
  reason: ListReportReason;
  message?: string;
};

export type ListReportResponse = Record<string, never>;

export type ListCollaborator = {
  user_id: string;
  role: ListCollaboratorRole;
  invited_at: string;
  accepted_at?: string;
};

export type ListCollaboratorInput = {
  username: string;
  role: ListCollaboratorRole;
};

export type ListMediaIds = {
  trakt?: number | string;
  tmdb?: number | string;
  imdb?: string;
  slug?: string;
};

export type ListMediaRef = {
  ids: ListMediaIds;
  rank?: number;
  notes?: string;
};

export type ListItemsInput = {
  movies?: ListMediaRef[];
  shows?: ListMediaRef[];
  seasons?: ListMediaRef[];
  episodes?: ListMediaRef[];
};

export type ListNotFoundRef = {
  ids: ListMediaIds;
};

export type ListNotFoundItem = ListNotFoundRef & {
  type: string;
};

export type ListItemsAddedResponse = {
  added: Record<string, number>;
  not_found: ListNotFoundItem[];
  duplicate: Record<string, number>;
};

export type ListContractNotFound = {
  movies: ListNotFoundRef[];
  shows: ListNotFoundRef[];
  seasons: ListNotFoundRef[];
  episodes: ListNotFoundRef[];
};

export type ListContractItemsAddedResponse = {
  added: Record<string, number>;
  existing: Record<string, number>;
  not_found: ListContractNotFound;
  list: {
    updated_at: string;
    item_count: number;
  };
};

export type ListItemsRemoveInput = {
  ids?: number[];
  movies?: ListMediaRef[];
  shows?: ListMediaRef[];
};

export type ListItemsRemoveResponse = {
  removed: number;
};

export type ListContractItemsRemoveResponse = {
  deleted: Record<string, number>;
  not_found: ListContractNotFound;
};

export type ListReorderInput = {
  order: number[];
};

export type ListReorderResponse = {
  status: string;
  count: number;
};

export type ListRankInput = {
  rank: number[];
};

export type ListRankResponse = {
  updated: number;
  skipped_ids: number[];
};

export type ListContractRankResponse = ListRankResponse & {
  list: {
    updated_at: string;
    item_count: number;
  };
};

export type ListItemUpdateInput = {
  notes?: string;
  rank?: number;
};

export type ListCreateInput = {
  name: string;
  description?: string;
  privacy?: ListPrivacy;
  sortBy?: string;
  sortHow?: string;
  isRanked?: boolean;
  coverUrl?: string;
  allowComments?: boolean;
};

export type ListUpdateInput = {
  name?: string;
  description?: string;
  privacy?: ListPrivacy;
  sortBy?: string;
  sortHow?: string;
  isRanked?: boolean;
  coverUrl?: string;
  allowComments?: boolean;
};

export type ListContractCreateInput = {
  name: string;
  description?: string;
  privacy?: ListPrivacy;
  displayNumbers?: boolean;
  allowComments?: boolean;
  sortBy?: string;
  sortHow?: string;
};

export type ListContractUpdateInput = {
  name?: string;
  description?: string;
  privacy?: ListPrivacy;
  displayNumbers?: boolean;
  allowComments?: boolean;
  sortBy?: string;
  sortHow?: string;
};

export type ListSmartListDraft = {
  list: {
    ids: {
      trakt: number;
      slug: string;
    };
  };
  origin_url: null;
  source: string;
  media_type: string;
  filters: Record<string, unknown>;
};

export type ListSmartListDraftInput = {
  name: string;
  source?: string;
  mediaType?: string;
  filters?: Record<string, unknown>;
};

export type ListSmartListResponse = {
  ids: {
    trakt: number;
    slug: string;
  };
};
