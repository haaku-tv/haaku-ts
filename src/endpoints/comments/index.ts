import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  CommentsComment,
  CommentsContractComment,
  CommentsContractCommentType,
  CommentsContractFeedQuery,
  CommentsContractMediaType,
  CommentsCreateInput,
  CommentsEmojiReaction,
  CommentsFeedQuery,
  CommentsItem,
  CommentsLikes,
  CommentsPage,
  CommentsPageQuery,
  CommentsReactionEntry,
  CommentsReactionsQuery,
  CommentsReactionSummary,
  CommentsReactionType,
  CommentsReplyInput,
  CommentsReportInput,
  CommentsStatus,
  CommentsUpdateInput,
} from "../../types/endpoints/comments.ts";
import { compactQuery } from "../../utils/query.ts";

export class CommentEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  trending(input: CommentsFeedQuery = {}): Promise<CommentsPage> {
    return this.api.get("/v1/comments/trending", {
      params: compactQuery({
        comment_type: input.commentType,
        media_type: input.mediaType,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  recent(input: CommentsFeedQuery = {}): Promise<CommentsPage> {
    return this.api.get("/v1/comments/recent", {
      params: compactQuery({
        comment_type: input.commentType,
        media_type: input.mediaType,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  updates(input: CommentsFeedQuery = {}): Promise<CommentsPage> {
    return this.api.get("/v1/comments/updates", {
      params: compactQuery({
        comment_type: input.commentType,
        media_type: input.mediaType,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  trendingByType(
    commentType: CommentsContractCommentType,
    type: CommentsContractMediaType,
    input: CommentsContractFeedQuery = {},
  ): Promise<CommentsContractComment[]> {
    return this.api.get(`/v1/comments/trending/${commentType}/${type}`, {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        include_replies: input.includeReplies,
      }),
    });
  }

  recentByType(
    commentType: CommentsContractCommentType,
    type: CommentsContractMediaType,
    input: CommentsContractFeedQuery = {},
  ): Promise<CommentsContractComment[]> {
    return this.api.get(`/v1/comments/recent/${commentType}/${type}`, {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        include_replies: input.includeReplies,
      }),
    });
  }

  updatesByType(
    commentType: CommentsContractCommentType,
    type: CommentsContractMediaType,
    input: CommentsContractFeedQuery = {},
  ): Promise<CommentsContractComment[]> {
    return this.api.get(`/v1/comments/updates/${commentType}/${type}`, {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        include_replies: input.includeReplies,
      }),
    });
  }

  get(id: number): Promise<CommentsComment> {
    return this.api.get(`/v1/comments/${id}`);
  }

  replies(
    id: number,
    input: CommentsPageQuery = {},
  ): Promise<CommentsPage> {
    return this.api.get(`/v1/comments/${id}/replies`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  createReply(
    id: number,
    input: CommentsReplyInput,
  ): Promise<CommentsComment> {
    return this.api.post(`/v1/comments/${id}/replies`, {
      body: {
        comment: input.comment,
        ...(input.spoiler !== undefined ? { spoiler: input.spoiler } : {}),
      },
    });
  }

  create(input: CommentsCreateInput): Promise<CommentsContractComment> {
    return this.api.post("/v1/comments", {
      body: {
        comment: input.comment,
        ...(input.spoiler !== undefined ? { spoiler: input.spoiler } : {}),
        ...(input.review !== undefined ? { review: input.review } : {}),
        ...(input.movie !== undefined ? { movie: input.movie } : {}),
        ...(input.show !== undefined ? { show: input.show } : {}),
        ...(input.season !== undefined ? { season: input.season } : {}),
        ...(input.episode !== undefined ? { episode: input.episode } : {}),
        ...(input.list !== undefined ? { list: input.list } : {}),
        ...(input.item !== undefined ? { item: input.item } : {}),
        ...(input.gif !== undefined ? { gif: input.gif } : {}),
      },
    });
  }

  update(
    id: number,
    input: CommentsUpdateInput,
  ): Promise<CommentsContractComment> {
    return this.api.put(`/v1/comments/${id}`, {
      body: {
        comment: input.comment,
        ...(input.spoiler !== undefined ? { spoiler: input.spoiler } : {}),
        ...(input.review !== undefined ? { review: input.review } : {}),
        ...(input.gif !== undefined ? { gif: input.gif } : {}),
      },
    });
  }

  delete(id: number): Promise<void> {
    return this.api.delete(`/v1/comments/${id}`);
  }

  like(id: number): Promise<CommentsStatus> {
    return this.api.post(`/v1/comments/${id}/like`);
  }

  unlike(id: number): Promise<void> {
    return this.api.delete(`/v1/comments/${id}/like`);
  }

  likes(id: number, input: CommentsPageQuery = {}): Promise<CommentsLikes> {
    return this.api.get(`/v1/comments/${id}/likes`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  reactions(
    id: number,
    input: CommentsReactionsQuery = {},
  ): Promise<CommentsReactionEntry[]> {
    return this.api.get(`/v1/comments/${id}/reactions`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  reactionSummary(id: number): Promise<CommentsReactionSummary> {
    return this.api.get(`/v1/comments/${id}/reactions/summary`);
  }

  addReaction(
    id: number,
    reactionType: CommentsReactionType,
  ): Promise<void> {
    return this.api.post(`/v1/comments/${id}/reactions/${reactionType}`);
  }

  removeReaction(
    id: number,
    reactionType: CommentsReactionType,
  ): Promise<void> {
    return this.api.delete(`/v1/comments/${id}/reactions/${reactionType}`);
  }

  addEmojiReaction(
    id: number,
    reaction: CommentsEmojiReaction,
  ): Promise<CommentsStatus> {
    return this.api.post(`/v1/comments/${id}/reactions`, {
      body: { reaction },
    });
  }

  removeEmojiReaction(
    id: number,
    reaction: CommentsEmojiReaction,
  ): Promise<void> {
    return this.api.delete(`/v1/comments/${id}/reactions`, {
      body: { reaction },
    });
  }

  report(
    id: number,
    input: CommentsReportInput,
  ): Promise<CommentsStatus> {
    return this.api.post(`/v1/comments/${id}/report`, {
      body: { reason: input.reason },
    });
  }

  item(id: number): Promise<CommentsItem> {
    return this.api.get(`/v1/comments/${id}/item`);
  }
}
