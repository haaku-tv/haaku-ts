import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  ListCollaborator,
  ListCollaboratorInput,
  ListComment,
  ListCommentSort,
  ListContractCreateInput,
  ListContractItemsAddedResponse,
  ListContractItemsRemoveResponse,
  ListContractLike,
  ListContractRankResponse,
  ListContractUpdateInput,
  ListCreateInput,
  ListFeedItem,
  ListFeedResponse,
  ListFeedType,
  ListId,
  ListItem,
  ListItemsAddedResponse,
  ListItemsInput,
  ListItemSortBy,
  ListItemSortHow,
  ListItemsQuery,
  ListItemsRemoveInput,
  ListItemsRemoveResponse,
  ListItemType,
  ListItemUpdateInput,
  ListLike,
  ListLikeResponse,
  ListPageQuery,
  ListPinInput,
  ListPinResponse,
  ListPopularQuery,
  ListRankInput,
  ListRankResponse,
  ListReorderInput,
  ListReorderResponse,
  ListReportInput,
  ListReportResponse,
  ListResponse,
  ListSmartListDraft,
  ListSmartListDraftInput,
  ListSmartListResponse,
  ListUpdateInput,
  ListUserId,
} from "../../types/endpoints/lists.ts";
import { compactQuery } from "../../utils/query.ts";

const idSegment = (id: ListId): string => encodeURIComponent(String(id));

const listBody = (input: ListCreateInput | ListUpdateInput) => ({
  ...(input.name !== undefined ? { name: input.name } : {}),
  ...(input.description !== undefined
    ? { description: input.description }
    : {}),
  ...(input.privacy !== undefined ? { privacy: input.privacy } : {}),
  ...(input.sortBy !== undefined ? { sort_by: input.sortBy } : {}),
  ...(input.sortHow !== undefined ? { sort_how: input.sortHow } : {}),
  ...(input.isRanked !== undefined ? { is_ranked: input.isRanked } : {}),
  ...(input.coverUrl !== undefined ? { cover_url: input.coverUrl } : {}),
  ...(input.allowComments !== undefined
    ? { allow_comments: input.allowComments }
    : {}),
});

const contractListBody = (
  input: ListContractCreateInput | ListContractUpdateInput,
) => ({
  ...(input.name !== undefined ? { name: input.name } : {}),
  ...(input.description !== undefined
    ? { description: input.description }
    : {}),
  ...(input.privacy !== undefined ? { privacy: input.privacy } : {}),
  ...(input.displayNumbers !== undefined
    ? { display_numbers: input.displayNumbers }
    : {}),
  ...(input.allowComments !== undefined
    ? { allow_comments: input.allowComments }
    : {}),
  ...(input.sortBy !== undefined ? { sort_by: input.sortBy } : {}),
  ...(input.sortHow !== undefined ? { sort_how: input.sortHow } : {}),
});

const itemsBody = (input: ListItemsInput) => ({
  ...(input.movies !== undefined ? { movies: input.movies } : {}),
  ...(input.shows !== undefined ? { shows: input.shows } : {}),
  ...(input.seasons !== undefined ? { seasons: input.seasons } : {}),
  ...(input.episodes !== undefined ? { episodes: input.episodes } : {}),
});

const pageQuery = (input: ListPageQuery) =>
  compactQuery({ page: input.page, limit: input.limit });

export class ListEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  get(id: ListId): Promise<ListResponse> {
    return this.api.get(`/v1/lists/${idSegment(id)}`);
  }

  update(id: ListId, input: ListUpdateInput): Promise<ListResponse> {
    return this.api.put(`/v1/lists/${idSegment(id)}`, {
      body: listBody(input),
    });
  }

  delete(id: ListId): Promise<void> {
    return this.api.delete(`/v1/lists/${idSegment(id)}`);
  }

  items(id: ListId, input: ListItemsQuery = {}): Promise<ListItem[]> {
    return this.api.get(`/v1/lists/${idSegment(id)}/items`, {
      params: compactQuery({
        type: input.type,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  itemsMovie(id: ListId, input: ListPageQuery = {}): Promise<ListItem[]> {
    return this.api.get(`/v1/lists/${idSegment(id)}/items/movie`, {
      params: pageQuery(input),
    });
  }

  itemsShow(id: ListId, input: ListPageQuery = {}): Promise<ListItem[]> {
    return this.api.get(`/v1/lists/${idSegment(id)}/items/show`, {
      params: pageQuery(input),
    });
  }

  itemsMovieShow(id: ListId, input: ListPageQuery = {}): Promise<ListItem[]> {
    return this.api.get(`/v1/lists/${idSegment(id)}/items/movie,show`, {
      params: pageQuery(input),
    });
  }

  itemsAll(id: ListId, input: ListPageQuery = {}): Promise<ListItem[]> {
    return this.api.get(
      `/v1/lists/${idSegment(id)}/items/movie,show,episode,season`,
      { params: pageQuery(input) },
    );
  }

  itemsByType(
    id: ListId,
    type: ListItemType | ListItemType[] | string,
    sortBy: ListItemSortBy,
    sortHow: ListItemSortHow,
    input: ListPageQuery = {},
  ): Promise<ListItem[]> {
    const typeSegment = Array.isArray(type) ? type.join(",") : type;
    return this.api.get(
      `/v1/lists/${idSegment(id)}/items/${typeSegment}/${sortBy}/${sortHow}`,
      { params: pageQuery(input) },
    );
  }

  addItems(
    id: ListId,
    input: ListItemsInput,
  ): Promise<ListItemsAddedResponse> {
    return this.api.post(`/v1/lists/${idSegment(id)}/items`, {
      body: itemsBody(input),
    });
  }

  removeItems(
    id: ListId,
    input: ListItemsRemoveInput,
  ): Promise<ListItemsRemoveResponse> {
    return this.api.post(`/v1/lists/${idSegment(id)}/items/remove`, {
      body: {
        ...(input.ids !== undefined ? { ids: input.ids } : {}),
        ...(input.movies !== undefined ? { movies: input.movies } : {}),
        ...(input.shows !== undefined ? { shows: input.shows } : {}),
      },
    });
  }

  reorderItems(
    id: ListId,
    input: ListReorderInput,
  ): Promise<ListReorderResponse> {
    return this.api.put(`/v1/lists/${idSegment(id)}/items/reorder`, {
      body: { order: input.order },
    });
  }

  likes(id: ListId): Promise<ListLike[]> {
    return this.api.get(`/v1/lists/${idSegment(id)}/likes`);
  }

  like(id: ListId): Promise<ListLikeResponse> {
    return this.api.post(`/v1/lists/${idSegment(id)}/like`);
  }

  unlike(id: ListId): Promise<void> {
    return this.api.delete(`/v1/lists/${idSegment(id)}/like`);
  }

  comments(id: ListId, input: ListPageQuery = {}): Promise<ListComment[]> {
    return this.api.get(`/v1/lists/${idSegment(id)}/comments`, {
      params: pageQuery(input),
    });
  }

  commentsBySort(
    id: ListId,
    sort: ListCommentSort,
    input: ListPageQuery = {},
  ): Promise<ListComment[]> {
    return this.api.get(`/v1/lists/${idSegment(id)}/comments/${sort}`, {
      params: pageQuery(input),
    });
  }

  pin(id: ListId, input: ListPinInput): Promise<ListPinResponse> {
    return this.api.put(`/v1/lists/${idSegment(id)}/pin`, {
      body: { comment_id: input.commentId },
    });
  }

  unpin(id: ListId): Promise<void> {
    return this.api.delete(`/v1/lists/${idSegment(id)}/pin`);
  }

  report(
    id: ListId,
    input: ListReportInput,
  ): Promise<ListReportResponse> {
    return this.api.post(`/v1/lists/${idSegment(id)}/report`, {
      body: {
        reason: input.reason,
        ...(input.message !== undefined ? { message: input.message } : {}),
      },
    });
  }

  collaborators(id: ListId): Promise<ListCollaborator[]> {
    return this.api.get(`/v1/lists/${idSegment(id)}/collaborators`);
  }

  addCollaborator(
    id: ListId,
    input: ListCollaboratorInput,
  ): Promise<ListCollaborator> {
    return this.api.post(`/v1/lists/${idSegment(id)}/collaborators`, {
      body: { username: input.username, role: input.role },
    });
  }

  removeCollaborator(id: ListId, userId: ListId): Promise<void> {
    return this.api.delete(
      `/v1/lists/${idSegment(id)}/collaborators/${idSegment(userId)}`,
    );
  }

  popular(input: ListPopularQuery = {}): Promise<ListFeedResponse> {
    return this.api.get("/v1/lists/popular", {
      params: compactQuery({
        period: input.period,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  popularByType(
    type: ListFeedType,
    input: ListPageQuery = {},
  ): Promise<ListFeedItem[]> {
    return this.api.get(`/v1/lists/popular/${type}`, {
      params: pageQuery(input),
    });
  }

  trending(input: ListPageQuery = {}): Promise<ListFeedResponse> {
    return this.api.get("/v1/lists/trending", {
      params: pageQuery(input),
    });
  }

  trendingByType(
    type: ListFeedType,
    input: ListPageQuery = {},
  ): Promise<ListFeedItem[]> {
    return this.api.get(`/v1/lists/trending/${type}`, {
      params: pageQuery(input),
    });
  }

  create(input: ListCreateInput): Promise<ListResponse> {
    return this.api.post("/v1/users/me/lists", {
      body: listBody(input),
    });
  }

  userLists(
    userId: ListUserId,
    input: ListPageQuery = {},
  ): Promise<ListResponse[]> {
    return this.api.get(`/v1/users/${idSegment(userId)}/lists`, {
      params: pageQuery(input),
    });
  }

  createForUser(
    userId: ListUserId,
    input: ListContractCreateInput,
  ): Promise<ListResponse> {
    return this.api.post(`/v1/users/${idSegment(userId)}/lists`, {
      body: contractListBody(input),
    });
  }

  userList(userId: ListUserId, listId: ListId): Promise<ListResponse> {
    return this.api.get(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/`,
    );
  }

  updateForUser(
    userId: ListUserId,
    listId: ListId,
    input: ListContractUpdateInput,
  ): Promise<ListResponse> {
    return this.api.put(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/`,
      { body: contractListBody(input) },
    );
  }

  deleteForUser(userId: ListUserId, listId: ListId): Promise<void> {
    return this.api.delete(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/`,
    );
  }

  userCollaborations(userId: ListUserId): Promise<ListResponse[]> {
    return this.api.get(
      `/v1/users/${idSegment(userId)}/lists/collaborations`,
    );
  }

  reorderUserLists(
    userId: ListUserId,
    input: ListRankInput,
  ): Promise<ListRankResponse> {
    return this.api.post(
      `/v1/users/${idSegment(userId)}/lists/reorder`,
      { body: { rank: input.rank } },
    );
  }

  userListAddItems(
    userId: ListUserId,
    listId: ListId,
    input: ListItemsInput,
  ): Promise<ListContractItemsAddedResponse> {
    return this.api.post(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/items`,
      { body: itemsBody(input) },
    );
  }

  userListRemoveItems(
    userId: ListUserId,
    listId: ListId,
    input: ListItemsInput,
  ): Promise<ListContractItemsRemoveResponse> {
    return this.api.post(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/items/remove`,
      { body: itemsBody(input) },
    );
  }

  userListReorderItems(
    userId: ListUserId,
    listId: ListId,
    input: ListRankInput,
  ): Promise<ListContractRankResponse> {
    return this.api.post(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/items/reorder`,
      { body: { rank: input.rank } },
    );
  }

  userListReorder(
    userId: ListUserId,
    listId: ListId,
    input: ListRankInput,
  ): Promise<ListContractRankResponse> {
    return this.api.post(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/reorder`,
      { body: { rank: input.rank } },
    );
  }

  userListItemUpdate(
    userId: ListUserId,
    listId: ListId,
    itemId: number,
    input: ListItemUpdateInput,
  ): Promise<void> {
    return this.api.put(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/items/${
        idSegment(itemId)
      }`,
      {
        body: {
          ...(input.notes !== undefined ? { notes: input.notes } : {}),
          ...(input.rank !== undefined ? { rank: input.rank } : {}),
        },
      },
    );
  }

  userListItemsMovie(
    userId: ListUserId,
    listId: ListId,
    input: ListPageQuery = {},
  ): Promise<ListItem[]> {
    return this.api.get(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/items/movie`,
      { params: pageQuery(input) },
    );
  }

  userListItemsShow(
    userId: ListUserId,
    listId: ListId,
    input: ListPageQuery = {},
  ): Promise<ListItem[]> {
    return this.api.get(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/items/show`,
      { params: pageQuery(input) },
    );
  }

  userListItemsMovieShow(
    userId: ListUserId,
    listId: ListId,
    input: ListPageQuery = {},
  ): Promise<ListItem[]> {
    return this.api.get(
      `/v1/users/${idSegment(userId)}/lists/${
        idSegment(listId)
      }/items/movie,show`,
      { params: pageQuery(input) },
    );
  }

  userListItemsAll(
    userId: ListUserId,
    listId: ListId,
    input: ListPageQuery = {},
  ): Promise<ListItem[]> {
    return this.api.get(
      `/v1/users/${idSegment(userId)}/lists/${
        idSegment(listId)
      }/items/movie,show,season,episode`,
      { params: pageQuery(input) },
    );
  }

  userListItemsByType(
    userId: ListUserId,
    listId: ListId,
    type: ListItemType | ListItemType[] | string,
    sortBy: ListItemSortBy,
    sortHow: ListItemSortHow,
    input: ListPageQuery = {},
  ): Promise<ListItem[]> {
    const typeSegment = Array.isArray(type) ? type.join(",") : type;
    return this.api.get(
      `/v1/users/${idSegment(userId)}/lists/${
        idSegment(listId)
      }/items/${typeSegment}/${sortBy}/${sortHow}`,
      { params: pageQuery(input) },
    );
  }

  userListLikes(
    userId: ListUserId,
    listId: ListId,
  ): Promise<ListContractLike[]> {
    return this.api.get(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/likes`,
    );
  }

  userListLike(userId: ListUserId, listId: ListId): Promise<void> {
    return this.api.post(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/like`,
    );
  }

  userListUnlike(userId: ListUserId, listId: ListId): Promise<void> {
    return this.api.delete(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/like`,
    );
  }

  userListComments(
    userId: ListUserId,
    listId: ListId,
    sort: ListCommentSort,
    input: ListPageQuery = {},
  ): Promise<ListComment[]> {
    return this.api.get(
      `/v1/users/${idSegment(userId)}/lists/${
        idSegment(listId)
      }/comments/${sort}`,
      { params: pageQuery(input) },
    );
  }

  userListReport(
    userId: ListUserId,
    listId: ListId,
    input: ListReportInput,
  ): Promise<ListReportResponse> {
    return this.api.post(
      `/v1/users/${idSegment(userId)}/lists/${idSegment(listId)}/report`,
      {
        body: {
          reason: input.reason,
          ...(input.message !== undefined ? { message: input.message } : {}),
        },
      },
    );
  }

  smartListDraft(
    userId: ListUserId,
    listId: ListId,
  ): Promise<ListSmartListDraft> {
    return this.api.get(
      `/v1/users/${idSegment(userId)}/lists/${
        idSegment(listId)
      }/smart-list-draft`,
    );
  }

  convertSmartListDraft(
    userId: ListUserId,
    listId: ListId,
    input: ListSmartListDraftInput,
  ): Promise<ListSmartListResponse> {
    return this.api.post(
      `/v1/users/${idSegment(userId)}/lists/${
        idSegment(listId)
      }/smart-list-draft/convert`,
      {
        body: {
          name: input.name,
          ...(input.source !== undefined ? { source: input.source } : {}),
          ...(input.mediaType !== undefined
            ? { media_type: input.mediaType }
            : {}),
          ...(input.filters !== undefined ? { filters: input.filters } : {}),
        },
      },
    );
  }
}
