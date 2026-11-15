import type { MovieComment } from "./movies.ts";

export type CommentsComment = MovieComment;

export type CommentsCommentType = "shout" | "review";
export type CommentsMediaType =
  | "movie"
  | "show"
  | "season"
  | "episode"
  | "list";
export type CommentsContractCommentType = "all" | "shouts" | "reviews";
export type CommentsContractMediaType =
  | "movies"
  | "shows"
  | "episodes"
  | "seasons"
  | "lists";

export type CommentsReactionType =
  | "like"
  | "dislike"
  | "love"
  | "laugh"
  | "shocked"
  | "bravo"
  | "spoiler";

export type CommentsReportReason =
  | "spoilers"
  | "language"
  | "abusive"
  | "spam"
  | "bigotry"
  | "political"
  | "offtopic"
  | "duplicate"
  | "too_short"
  | "other";

export type CommentsEmojiReaction =
  | "👍"
  | "🔥"
  | "😂"
  | "😮"
  | "😢"
  | "😡";

export type CommentsPageQuery = {
  page?: number;
  limit?: number;
};

export type CommentsFeedQuery = CommentsPageQuery & {
  commentType?: string;
  mediaType?: string;
};

export type CommentsContractFeedQuery = CommentsPageQuery & {
  includeReplies?: boolean;
};

export type CommentsReactionsQuery = {
  page?: number;
  limit?: number | "all";
};

export type CommentsItemIds = {
  trakt: number;
};

export type CommentsItemId = number | { ids: CommentsItemIds };

export type CommentsGif = {
  url: string;
  slug?: string | null;
};

export type CommentsLegacyItem = {
  type: string;
  id: number;
};

export type CommentsItemTarget =
  | CommentsLegacyItem
  | {
    movie?: CommentsItemId;
    show?: CommentsItemId;
    season?: CommentsItemId;
    episode?: CommentsItemId;
    list?: CommentsItemId;
  };

export type CommentsCreateInput = {
  comment: string;
  spoiler?: boolean;
  review?: boolean;
  gif?: CommentsGif | null;
  movie?: CommentsItemId;
  show?: CommentsItemId;
  season?: CommentsItemId;
  episode?: CommentsItemId;
  list?: CommentsItemId;
  item?: CommentsItemTarget;
};

export type CommentsUpdateInput = {
  comment: string;
  spoiler?: boolean;
  review?: boolean;
  gif?: CommentsGif | null;
};

export type CommentsReplyInput = {
  comment: string;
  spoiler?: boolean;
};

export type CommentsReportInput = {
  reason: CommentsReportReason;
};

export type CommentsUser = {
  username: string;
  private: boolean;
  deleted: boolean;
  name?: string | null;
  ids: {
    trakt: number;
    slug: string | null;
  };
};

export type CommentsContractComment = {
  id: number;
  parent_id: number;
  created_at: string;
  updated_at: string;
  comment: string;
  gif: CommentsGif | null;
  spoiler: boolean;
  review: boolean;
  replies: number;
  likes: number;
  language: null;
  user_rating: null;
  user_stats: {
    rating: null;
    play_count: number;
    completed_count: number;
  };
  user: CommentsUser;
};

export type CommentsReactionEntry = {
  reacted_at: string;
  reaction: {
    type: CommentsReactionType;
  };
  user: CommentsUser;
};

export type CommentsReactionSummary = {
  reaction_count: number;
  user_count: number;
  distribution: Record<string, number>;
};

export type CommentsLikes = {
  users: string[];
};

export type CommentsItem = {
  media_type?: string;
  media_id?: number;
  list_id?: number;
};

export type CommentsPage = {
  data: CommentsComment[];
  page: number;
  limit: number;
  total_count: number;
};

export type CommentsStatus = {
  status: string;
};
