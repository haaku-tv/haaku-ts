import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  UserActivity,
  UserActivityFeedType,
  UserActivityQuery,
  UserApiKey,
  UserApiKeyCreated,
  UserApiKeyCreateInput,
  UserApiKeyRevokeResult,
  UserBlockedEntry,
  UserBlockedQuery,
  UserCollectionPage,
  UserCollectionQuery,
  UserCommentMediaType,
  UserCommentReaction,
  UserCommentsPage,
  UserCommentType,
  UserContractActivity,
  UserContractSavedFilter,
  UserContractSavedFilterSection,
  UserContractSettings,
  UserContractSettingsUpdateInput,
  UserExportArchive,
  UserFavoriteEntry,
  UserFavoritesQuery,
  UserFollowAction,
  UserFollowRequest,
  UserFollowRequestApproval,
  UserHiddenInput,
  UserHiddenItem,
  UserHiddenQuery,
  UserHiddenRemoveResult,
  UserHiddenSection,
  UserHistoryEntry,
  UserHistoryPage,
  UserHistoryQuery,
  UserId,
  UserLikedCommentsPage,
  UserLikedListsPage,
  UserListComment,
  UserListCommentSort,
  UserListContractCreateInput,
  UserListContractUpdateInput,
  UserListCreateInput,
  UserListItem,
  UserListItemsAddResult,
  UserListItemsInput,
  UserListItemsRemoveResult,
  UserListItemUpdateInput,
  UserListLike,
  UserListRankInput,
  UserListReorderResult,
  UserListReportResponse,
  UserListResponse,
  UserListsReorderResult,
  UserListType,
  UserLookup,
  UserMeActivityQuery,
  UserMeNotesQuery,
  UserNotesPage,
  UserPageQuery,
  UserProfile,
  UserProfileStub,
  UserProfileSummary,
  UserPublicProfile,
  UserRatingEntry,
  UserRatingsPage,
  UserRatingsQuery,
  UserReportInput,
  UserReportResult,
  UserSavedFilter,
  UserSavedFilterInput,
  UserSavedFilterSection,
  UserSettings,
  UserSettingsUpdateInput,
  UserSmartList,
  UserSmartListCreateResult,
  UserSmartListDraft,
  UserSmartListDraftInput,
  UserSmartListDrafts,
  UserSmartListInput,
  UserSmartListRecord,
  UserSmartListRecordInput,
  UserStats,
  UserUpdateInput,
  UserWatchedAggregate,
  UserWatchedMovies,
  UserWatchedQuery,
  UserWatchedShows,
  UserWatchedShowsQuery,
  UserWatching,
  UserWatchlistEntry,
  UserWatchlistPage,
  UserWatchlistQuery,
} from "../../types/endpoints/users.ts";
import type { ListReportInput } from "../../types/endpoints/lists.ts";
import { formatDate } from "../../utils/dates.ts";
import { compactQuery } from "../../utils/query.ts";

const segment = (value: string | number): string =>
  encodeURIComponent(String(value));

const iso = (value: string | Date | undefined): string | undefined =>
  value instanceof Date ? value.toISOString() : value;

const dateOnly = (value: string | Date | undefined): string | undefined =>
  value === undefined ? undefined : formatDate(value);

const pageQuery = (input: UserPageQuery) =>
  compactQuery({ page: input.page, limit: input.limit });

const historyQuery = (input: UserHistoryQuery) =>
  compactQuery({
    page: input.page,
    limit: input.limit,
    extended: input.extended,
    genres: input.genres,
    years: input.years,
    ratings: input.ratings,
    runtimes: input.runtimes,
    statuses: input.statuses,
    certifications: input.certifications,
    languages: input.languages,
    countries: input.countries,
    id_type: input.idType,
    start_at: iso(input.startAt),
    end_at: iso(input.endAt),
    start_date: dateOnly(input.startDate),
    end_date: dateOnly(input.endDate),
  });

const favoritesQuery = (input: UserFavoritesQuery) =>
  compactQuery({
    page: input.page,
    limit: input.limit,
    extended: input.extended,
    sort_by: input.sortBy,
    sort_how: input.sortHow,
    genres: input.genres,
    years: input.years,
    ratings: input.ratings,
    runtimes: input.runtimes,
    statuses: input.statuses,
    certifications: input.certifications,
    languages: input.languages,
    countries: input.countries,
  });

const watchlistQuery = (input: UserWatchlistQuery) =>
  compactQuery({
    page: input.page,
    limit: input.limit,
    extended: input.extended,
    sort_by: input.sortBy,
    sort_how: input.sortHow,
    hide: input.hide,
    ignore_watched: input.ignoreWatched,
    ignore_collected: input.ignoreCollected,
    ignore_watchlisted: input.ignoreWatchlisted,
    genres: input.genres,
    years: input.years,
    ratings: input.ratings,
    runtimes: input.runtimes,
    statuses: input.statuses,
    certifications: input.certifications,
    languages: input.languages,
    countries: input.countries,
  });

const ratingsQuery = (input: UserRatingsQuery) =>
  compactQuery({
    page: input.page,
    limit: input.limit,
    extended: input.extended,
    id_type: input.idType,
  });

const listBody = (input: UserListCreateInput) => ({
  name: input.name,
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
  input: UserListContractCreateInput | UserListContractUpdateInput,
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

const itemsBody = (input: UserListItemsInput) => ({
  ...(input.movies !== undefined ? { movies: input.movies } : {}),
  ...(input.shows !== undefined ? { shows: input.shows } : {}),
  ...(input.seasons !== undefined ? { seasons: input.seasons } : {}),
  ...(input.episodes !== undefined ? { episodes: input.episodes } : {}),
});

const smartListBody = (input: UserSmartListInput) => ({
  name: input.name,
  ...(input.source !== undefined ? { source: input.source } : {}),
  ...(input.media_type !== undefined ? { media_type: input.media_type } : {}),
  ...(input.filters !== undefined ? { filters: input.filters } : {}),
});

const smartListRecordBody = (input: UserSmartListRecordInput) => ({
  name: input.name,
  ...(input.filters !== undefined ? { filters: input.filters } : {}),
});

export class UserApiKeysEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  list(): Promise<UserApiKey[]> {
    return this.api.get("/v1/users/me/api_keys");
  }

  create(input: UserApiKeyCreateInput = {}): Promise<UserApiKeyCreated> {
    return this.api.post("/v1/users/me/api_keys", {
      body: {
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.expires_in_days !== undefined
          ? { expires_in_days: input.expires_in_days }
          : {}),
      },
    });
  }

  revoke(keyId: string): Promise<UserApiKeyRevokeResult> {
    return this.api.delete(`/v1/users/me/api_keys/${segment(keyId)}`);
  }
}

export class UserSavedFiltersEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  list(section: UserSavedFilterSection): Promise<UserSavedFilter[]> {
    return this.api.get(`/v1/users/me/saved_filters/${segment(section)}`);
  }

  create(input: UserSavedFilterInput): Promise<UserSavedFilter> {
    return this.api.post("/v1/users/me/saved_filters", {
      body: {
        section: input.section,
        name: input.name,
        ...(input.filter !== undefined ? { filter: input.filter } : {}),
      },
    });
  }

  delete(id: number): Promise<void> {
    return this.api.delete(`/v1/users/me/saved_filters/${segment(id)}`);
  }

  contractList(
    section: UserContractSavedFilterSection,
    input: UserPageQuery = {},
  ): Promise<UserContractSavedFilter[]> {
    return this.api.get(`/v1/users/saved_filters/${segment(section)}`, {
      params: pageQuery(input),
    });
  }
}

export class UsersEndpoint extends BaseEndpoint {
  readonly apiKeys: UserApiKeysEndpoint;
  readonly savedFilters: UserSavedFiltersEndpoint;

  constructor(config: HaakuConfig) {
    super(config);
    this.apiKeys = new UserApiKeysEndpoint(config);
    this.savedFilters = new UserSavedFiltersEndpoint(config);
  }

  get(id: UserId): Promise<UserPublicProfile> {
    return this.api.get(`/v1/users/${segment(id)}`);
  }

  me(): Promise<UserProfile> {
    return this.api.get("/v1/users/me");
  }

  updateMe(input: UserUpdateInput): Promise<UserProfile> {
    return this.api.put("/v1/users/me", {
      body: {
        ...(input.bio !== undefined ? { bio: input.bio } : {}),
        ...(input.location !== undefined ? { location: input.location } : {}),
        ...(input.timezone !== undefined ? { timezone: input.timezone } : {}),
        ...(input.language !== undefined ? { language: input.language } : {}),
        ...(input.is_private !== undefined
          ? { is_private: input.is_private }
          : {}),
      },
    });
  }

  deleteMe(): Promise<void> {
    return this.api.delete("/v1/users/me");
  }

  lookup(username: string): Promise<UserLookup> {
    return this.api.get("/v1/users/lookup", {
      params: compactQuery({ username }),
    });
  }

  stats(id: UserId): Promise<UserStats> {
    return this.api.get(`/v1/users/${segment(id)}/stats`);
  }

  activities(
    id: UserId,
    type: UserActivityFeedType,
    input: UserActivityQuery = {},
  ): Promise<UserContractActivity[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/${segment(type)}/activities`,
      {
        params: compactQuery({
          page: input.page,
          limit: input.limit,
          extended: input.extended,
          start_date: dateOnly(input.startDate),
          end_date: dateOnly(input.endDate),
          genres: input.genres,
          years: input.years,
          ratings: input.ratings,
          runtimes: input.runtimes,
          statuses: input.statuses,
          certifications: input.certifications,
        }),
      },
    );
  }

  settings(): Promise<UserSettings> {
    return this.api.get("/v1/users/me/settings");
  }

  updateSettings(input: UserSettingsUpdateInput): Promise<UserSettings> {
    return this.api.put("/v1/users/me/settings", {
      body: {
        ...(input.privacy !== undefined ? { privacy: input.privacy } : {}),
        ...(input.notifications !== undefined
          ? { notifications: input.notifications }
          : {}),
      },
    });
  }

  contractSettings(): Promise<UserContractSettings> {
    return this.api.get("/v1/users/settings");
  }

  updateContractSettings(
    input: UserContractSettingsUpdateInput,
  ): Promise<UserContractSettings> {
    return this.api.put("/v1/users/settings", {
      body: {
        ...(input.user !== undefined ? { user: input.user } : {}),
        ...(input.account !== undefined ? { account: input.account } : {}),
        ...(input.browsing !== undefined ? { browsing: input.browsing } : {}),
        ...(input.sharing !== undefined ? { sharing: input.sharing } : {}),
        ...(input.limits !== undefined ? { limits: input.limits } : {}),
      },
    });
  }

  profileSummary(): Promise<UserProfileSummary> {
    return this.api.get("/v1/users/me/profile-summary");
  }

  myActivity(input: UserMeActivityQuery = {}): Promise<
    { data: UserActivity[]; page: number; limit: number; total_count: number }
  > {
    return this.api.get("/v1/users/me/activity", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        type: input.type,
        start_at: iso(input.startAt),
      }),
    });
  }

  export(): Promise<UserExportArchive> {
    return this.api.get("/v1/users/me/export");
  }

  follow(id: UserId): Promise<UserFollowAction> {
    return this.api.post(`/v1/users/${segment(id)}/follow`);
  }

  unfollow(id: UserId): Promise<void> {
    return this.api.delete(`/v1/users/${segment(id)}/follow`);
  }

  followers(
    id: UserId,
    input: UserPageQuery = {},
  ): Promise<UserProfileStub[]> {
    return this.api.get(`/v1/users/${segment(id)}/followers`, {
      params: pageQuery(input),
    });
  }

  following(
    id: UserId,
    input: UserPageQuery = {},
  ): Promise<UserProfileStub[]> {
    return this.api.get(`/v1/users/${segment(id)}/following`, {
      params: pageQuery(input),
    });
  }

  friends(id: UserId, input: UserPageQuery = {}): Promise<UserProfileStub[]> {
    return this.api.get(`/v1/users/${segment(id)}/friends`, {
      params: pageQuery(input),
    });
  }

  followRequests(input: UserPageQuery = {}): Promise<UserFollowRequest[]> {
    return this.api.get("/v1/users/me/follow_requests", {
      params: pageQuery(input),
    });
  }

  approveFollowRequest(
    followerId: string,
  ): Promise<UserFollowRequestApproval> {
    return this.api.post(
      `/v1/users/me/follow_requests/${segment(followerId)}/approve`,
    );
  }

  denyFollowRequest(followerId: string): Promise<void> {
    return this.api.delete(
      `/v1/users/me/follow_requests/${segment(followerId)}`,
    );
  }

  block(id: UserId): Promise<void> {
    return this.api.post(`/v1/users/${segment(id)}/block`);
  }

  unblock(id: UserId): Promise<void> {
    return this.api.delete(`/v1/users/${segment(id)}/block`);
  }

  blocked(input: UserBlockedQuery = {}): Promise<UserBlockedEntry[]> {
    return this.api.get("/v1/users/blocked", {
      params: pageQuery(input),
    });
  }

  report(id: UserId, input: UserReportInput): Promise<UserReportResult> {
    return this.api.post(`/v1/users/${segment(id)}/report`, {
      body: {
        reason: input.reason,
        ...(input.message !== undefined ? { message: input.message } : {}),
      },
    });
  }

  hidden(
    section: UserHiddenSection,
    input: UserHiddenQuery = {},
  ): Promise<UserHiddenItem[]> {
    return this.api.get(`/v1/users/hidden/${segment(section)}`, {
      params: compactQuery({
        type: input.type,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  addHidden(
    section: UserHiddenSection,
    input: UserHiddenInput,
  ): Promise<UserHiddenItem> {
    return this.api.post(`/v1/users/hidden/${segment(section)}`, {
      body: { media_type: input.media_type, media_id: input.media_id },
    });
  }

  removeHidden(
    section: UserHiddenSection,
    input: UserHiddenInput,
  ): Promise<void> {
    return this.api.delete(`/v1/users/hidden/${segment(section)}`, {
      body: { media_type: input.media_type, media_id: input.media_id },
    });
  }

  hiddenRemove(
    section: UserHiddenSection,
    input: UserHiddenInput,
  ): Promise<UserHiddenRemoveResult> {
    return this.api.post(`/v1/users/hidden/${segment(section)}/remove`, {
      body: { media_type: input.media_type, media_id: input.media_id },
    });
  }

  hiddenCalendarRemove(
    input: UserHiddenInput,
  ): Promise<UserHiddenRemoveResult> {
    return this.api.post("/v1/users/hidden/calendar/remove", {
      body: { media_type: input.media_type, media_id: input.media_id },
    });
  }

  hiddenDropped(input: UserHiddenQuery = {}): Promise<UserHiddenItem[]> {
    return this.api.get("/v1/users/hidden/dropped", {
      params: compactQuery({
        type: input.type,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  hiddenProgressWatched(
    input: UserHiddenQuery = {},
  ): Promise<UserHiddenItem[]> {
    return this.api.get("/v1/users/hidden/progress_watched", {
      params: compactQuery({
        type: input.type,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  hiddenProgressWatchedRemove(
    input: UserHiddenInput,
  ): Promise<UserHiddenRemoveResult> {
    return this.api.post("/v1/users/hidden/progress_watched/remove", {
      body: { media_type: input.media_type, media_id: input.media_id },
    });
  }

  commentReactions(input: UserPageQuery = {}): Promise<UserCommentReaction[]> {
    return this.api.get("/v1/users/reactions/comments", {
      params: pageQuery(input),
    });
  }

  history(
    id: UserId,
    input: UserHistoryQuery = {},
  ): Promise<UserHistoryPage> {
    return this.api.get(`/v1/users/${segment(id)}/history`, {
      params: historyQuery(input),
    });
  }

  historyByType(
    id: UserId,
    mediaType: string,
    input: UserHistoryQuery = {},
  ): Promise<UserHistoryPage> {
    return this.api.get(
      `/v1/users/${segment(id)}/history/${segment(mediaType)}`,
      { params: historyQuery(input) },
    );
  }

  historyItem(
    id: UserId,
    mediaType: string,
    mediaId: string | number,
    input: UserHistoryQuery = {},
  ): Promise<UserHistoryPage> {
    return this.api.get(
      `/v1/users/${segment(id)}/history/${segment(mediaType)}/${
        segment(mediaId)
      }`,
      { params: historyQuery(input) },
    );
  }

  historyMovies(
    id: UserId,
    input: UserHistoryQuery = {},
  ): Promise<UserHistoryEntry[]> {
    return this.api.get(`/v1/users/${segment(id)}/history/movies`, {
      params: historyQuery(input),
    });
  }

  historyShows(
    id: UserId,
    input: UserHistoryQuery = {},
  ): Promise<UserHistoryEntry[]> {
    return this.api.get(`/v1/users/${segment(id)}/history/shows`, {
      params: historyQuery(input),
    });
  }

  historyEpisodes(
    id: UserId,
    input: UserHistoryQuery = {},
  ): Promise<UserHistoryEntry[]> {
    return this.api.get(`/v1/users/${segment(id)}/history/episodes`, {
      params: historyQuery(input),
    });
  }

  historyMovieItem(
    id: UserId,
    itemId: string | number,
    input: UserHistoryQuery = {},
  ): Promise<UserHistoryEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/history/movies/${segment(itemId)}`,
      { params: historyQuery(input) },
    );
  }

  historyShowItem(
    id: UserId,
    itemId: string | number,
    input: UserHistoryQuery = {},
  ): Promise<UserHistoryEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/history/shows/${segment(itemId)}`,
      { params: historyQuery(input) },
    );
  }

  historyEpisodeItem(
    id: UserId,
    itemId: string | number,
    input: UserHistoryQuery = {},
  ): Promise<UserHistoryEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/history/episodes/${segment(itemId)}`,
      { params: historyQuery(input) },
    );
  }

  ratings(id: UserId, input: UserRatingsQuery = {}): Promise<UserRatingsPage> {
    return this.api.get(`/v1/users/${segment(id)}/ratings`, {
      params: ratingsQuery(input),
    });
  }

  ratingsByType(
    id: UserId,
    mediaType: string,
    input: UserRatingsQuery = {},
  ): Promise<UserRatingsPage> {
    return this.api.get(
      `/v1/users/${segment(id)}/ratings/${segment(mediaType)}`,
      { params: ratingsQuery(input) },
    );
  }

  ratingsByValue(
    id: UserId,
    type: string,
    rating: number,
    input: UserRatingsQuery = {},
  ): Promise<UserRatingEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/ratings/${segment(type)}/${segment(rating)}`,
      { params: ratingsQuery(input) },
    );
  }

  ratingMovies(
    id: UserId,
    input: UserRatingsQuery = {},
  ): Promise<UserRatingEntry[]> {
    return this.api.get(`/v1/users/${segment(id)}/ratings/movies`, {
      params: ratingsQuery(input),
    });
  }

  ratingShows(
    id: UserId,
    input: UserRatingsQuery = {},
  ): Promise<UserRatingEntry[]> {
    return this.api.get(`/v1/users/${segment(id)}/ratings/shows`, {
      params: ratingsQuery(input),
    });
  }

  ratingEpisodes(
    id: UserId,
    input: UserRatingsQuery = {},
  ): Promise<UserRatingEntry[]> {
    return this.api.get(`/v1/users/${segment(id)}/ratings/episodes`, {
      params: ratingsQuery(input),
    });
  }

  collection(
    id: UserId,
    input: UserCollectionQuery = {},
  ): Promise<UserCollectionPage> {
    return this.api.get(`/v1/users/${segment(id)}/collection`, {
      params: pageQuery(input),
    });
  }

  collectionByType(
    id: UserId,
    mediaType: string,
    input: UserCollectionQuery = {},
  ): Promise<UserCollectionPage> {
    return this.api.get(
      `/v1/users/${segment(id)}/collection/${segment(mediaType)}`,
      { params: pageQuery(input) },
    );
  }

  watchlist(
    id: UserId,
    input: UserWatchlistQuery = {},
  ): Promise<UserWatchlistPage> {
    return this.api.get(`/v1/users/${segment(id)}/watchlist`, {
      params: watchlistQuery(input),
    });
  }

  watchlistByType(
    id: UserId,
    mediaType: string,
    input: UserWatchlistQuery = {},
  ): Promise<UserWatchlistPage> {
    return this.api.get(
      `/v1/users/${segment(id)}/watchlist/${segment(mediaType)}`,
      { params: watchlistQuery(input) },
    );
  }

  watchlistSorted(
    id: UserId,
    type: string,
    sortBy: string,
    sortHow: string,
    input: UserWatchlistQuery = {},
  ): Promise<UserWatchlistEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/watchlist/${segment(type)}/${segment(sortBy)}/${
        segment(sortHow)
      }`,
      { params: watchlistQuery(input) },
    );
  }

  watchlistComments(
    id: UserId,
    sort: UserListCommentSort,
    input: UserPageQuery = {},
  ): Promise<UserListComment[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/watchlist/comments/${segment(sort)}`,
      { params: pageQuery(input) },
    );
  }

  watchlistMovies(
    id: UserId,
    sort: string,
    input: UserWatchlistQuery = {},
  ): Promise<UserWatchlistEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/watchlist/movies/${segment(sort)}`,
      { params: watchlistQuery(input) },
    );
  }

  watchlistShows(
    id: UserId,
    sort: string,
    input: UserWatchlistQuery = {},
  ): Promise<UserWatchlistEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/watchlist/shows/${segment(sort)}`,
      { params: watchlistQuery(input) },
    );
  }

  watchlistMedia(
    id: UserId,
    sort: string,
    input: UserWatchlistQuery = {},
  ): Promise<UserWatchlistEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/watchlist/movie,show/${segment(sort)}`,
      { params: watchlistQuery(input) },
    );
  }

  favorites(
    id: UserId,
    type: string,
    sortBy: string,
    sortHow: string,
    input: UserFavoritesQuery = {},
  ): Promise<UserFavoriteEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/favorites/${segment(type)}/${segment(sortBy)}/${
        segment(sortHow)
      }`,
      { params: favoritesQuery(input) },
    );
  }

  favoriteMovies(
    id: UserId,
    sort: string,
    input: UserFavoritesQuery = {},
  ): Promise<UserFavoriteEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/favorites/movies/${segment(sort)}`,
      { params: favoritesQuery(input) },
    );
  }

  favoriteShows(
    id: UserId,
    sort: string,
    input: UserFavoritesQuery = {},
  ): Promise<UserFavoriteEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/favorites/shows/${segment(sort)}`,
      { params: favoritesQuery(input) },
    );
  }

  favoriteMedia(
    id: UserId,
    sort: string,
    input: UserFavoritesQuery = {},
  ): Promise<UserFavoriteEntry[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/favorites/media/${segment(sort)}`,
      { params: favoritesQuery(input) },
    );
  }

  favoriteComments(
    id: UserId,
    sort: UserListCommentSort,
    input: UserPageQuery = {},
  ): Promise<UserListComment[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/favorites/comments/${segment(sort)}`,
      { params: pageQuery(input) },
    );
  }

  watched(
    id: UserId,
    type: string,
    input: UserWatchedQuery = {},
  ): Promise<UserWatchedAggregate[]> {
    return this.api.get(`/v1/users/${segment(id)}/watched/${segment(type)}`, {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        extended: input.extended,
        specials: input.specials,
        hidden: input.hidden,
        count_specials: input.countSpecials,
      }),
    });
  }

  watchedMovies(
    id: UserId,
    input: UserWatchedQuery = {},
  ): Promise<UserWatchedMovies> {
    return this.api.get(`/v1/users/${segment(id)}/watched/movies`, {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        extended: input.extended,
      }),
    });
  }

  watchedShows(
    id: UserId,
    input: UserWatchedShowsQuery = {},
  ): Promise<UserWatchedShows> {
    return this.api.get(`/v1/users/${segment(id)}/watched/shows`, {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        extended: input.extended,
        specials: input.specials,
        season_numbers: input.seasonNumbers,
      }),
    });
  }

  watching(id: UserId): Promise<UserWatching | Record<string, never>> {
    return this.api.get(`/v1/users/${segment(id)}/watching`);
  }

  comments(
    id: UserId,
    commentType: UserCommentType,
    mediaType: UserCommentMediaType,
    input: UserPageQuery = {},
  ): Promise<UserCommentsPage> {
    return this.api.get(
      `/v1/users/${segment(id)}/comments/${segment(commentType)}/${
        segment(mediaType)
      }`,
      { params: pageQuery(input) },
    );
  }

  notes(
    id: UserId,
    mediaType: string,
    input: UserPageQuery = {},
  ): Promise<UserNotesPage> {
    return this.api.get(
      `/v1/users/${segment(id)}/notes/${segment(mediaType)}`,
      { params: pageQuery(input) },
    );
  }

  myNotes(input: UserMeNotesQuery = {}): Promise<UserNotesPage> {
    return this.api.get("/v1/users/me/notes", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        media_type: input.mediaType,
      }),
    });
  }

  likesComments(
    id: UserId,
    input: UserPageQuery = {},
  ): Promise<UserLikedCommentsPage> {
    return this.api.get(`/v1/users/${segment(id)}/likes/comments`, {
      params: pageQuery(input),
    });
  }

  likesLists(
    id: UserId,
    input: UserPageQuery = {},
  ): Promise<UserLikedListsPage> {
    return this.api.get(`/v1/users/${segment(id)}/likes/lists`, {
      params: pageQuery(input),
    });
  }

  myLikesComments(input: UserPageQuery = {}): Promise<UserLikedCommentsPage> {
    return this.api.get("/v1/users/me/likes/comments", {
      params: pageQuery(input),
    });
  }

  myLikesLists(input: UserPageQuery = {}): Promise<UserLikedListsPage> {
    return this.api.get("/v1/users/me/likes/lists", {
      params: pageQuery(input),
    });
  }

  lists(id: UserId, input: UserPageQuery = {}): Promise<UserListResponse[]> {
    return this.api.get(`/v1/users/${segment(id)}/lists`, {
      params: pageQuery(input),
    });
  }

  createList(input: UserListCreateInput): Promise<UserListResponse> {
    return this.api.post("/v1/users/me/lists", {
      body: listBody(input),
    });
  }

  createUserList(
    id: UserId,
    input: UserListContractCreateInput,
  ): Promise<UserListResponse> {
    return this.api.post(`/v1/users/${segment(id)}/lists`, {
      body: contractListBody(input),
    });
  }

  list(id: UserId, listId: string | number): Promise<UserListResponse> {
    return this.api.get(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/`,
    );
  }

  updateList(
    id: UserId,
    listId: string | number,
    input: UserListContractUpdateInput,
  ): Promise<UserListResponse> {
    return this.api.put(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/`,
      { body: contractListBody(input) },
    );
  }

  deleteList(id: UserId, listId: string | number): Promise<void> {
    return this.api.delete(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/`,
    );
  }

  listComments(
    id: UserId,
    listId: string | number,
    sort: UserListCommentSort,
    input: UserPageQuery = {},
  ): Promise<UserListComment[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/comments/${
        segment(sort)
      }`,
      { params: pageQuery(input) },
    );
  }

  listItems(
    id: UserId,
    listId: string | number,
    type: UserListType | UserListType[] | string,
    sortBy: string,
    sortHow: string,
    input: UserPageQuery = {},
  ): Promise<UserListItem[]> {
    const typeSegment = Array.isArray(type) ? type.join(",") : type;
    return this.api.get(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/items/${typeSegment}/${
        segment(sortBy)
      }/${segment(sortHow)}`,
      { params: pageQuery(input) },
    );
  }

  listItemsMovie(
    id: UserId,
    listId: string | number,
    input: UserPageQuery = {},
  ): Promise<UserListItem[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/items/movie`,
      { params: pageQuery(input) },
    );
  }

  listItemsShow(
    id: UserId,
    listId: string | number,
    input: UserPageQuery = {},
  ): Promise<UserListItem[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/items/show`,
      { params: pageQuery(input) },
    );
  }

  listItemsMovieShow(
    id: UserId,
    listId: string | number,
    input: UserPageQuery = {},
  ): Promise<UserListItem[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/items/movie,show`,
      { params: pageQuery(input) },
    );
  }

  listItemsAll(
    id: UserId,
    listId: string | number,
    input: UserPageQuery = {},
  ): Promise<UserListItem[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/lists/${
        segment(listId)
      }/items/movie,show,season,episode`,
      { params: pageQuery(input) },
    );
  }

  addListItems(
    id: UserId,
    listId: string | number,
    input: UserListItemsInput,
  ): Promise<UserListItemsAddResult> {
    return this.api.post(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/items`,
      { body: itemsBody(input) },
    );
  }

  removeListItems(
    id: UserId,
    listId: string | number,
    input: UserListItemsInput,
  ): Promise<UserListItemsRemoveResult> {
    return this.api.post(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/items/remove`,
      { body: itemsBody(input) },
    );
  }

  reorderListItems(
    id: UserId,
    listId: string | number,
    input: UserListRankInput,
  ): Promise<UserListReorderResult> {
    return this.api.post(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/items/reorder`,
      { body: { rank: input.rank } },
    );
  }

  updateListItem(
    id: UserId,
    listId: string | number,
    itemId: string | number,
    input: UserListItemUpdateInput,
  ): Promise<void> {
    return this.api.put(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/items/${
        segment(itemId)
      }`,
      {
        body: {
          ...(input.notes !== undefined ? { notes: input.notes } : {}),
          ...(input.rank !== undefined ? { rank: input.rank } : {}),
        },
      },
    );
  }

  listLikes(
    id: UserId,
    listId: string | number,
  ): Promise<UserListLike[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/likes`,
    );
  }

  likeList(id: UserId, listId: string | number): Promise<void> {
    return this.api.post(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/like`,
    );
  }

  unlikeList(id: UserId, listId: string | number): Promise<void> {
    return this.api.delete(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/like`,
    );
  }

  reorderList(
    id: UserId,
    listId: string | number,
    input: UserListRankInput,
  ): Promise<UserListReorderResult> {
    return this.api.post(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/reorder`,
      { body: { rank: input.rank } },
    );
  }

  reportList(
    id: UserId,
    listId: string | number,
    input: ListReportInput,
  ): Promise<UserListReportResponse> {
    return this.api.post(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/report`,
      {
        body: {
          reason: input.reason,
          ...(input.message !== undefined ? { message: input.message } : {}),
        },
      },
    );
  }

  listSmartListDraft(
    id: UserId,
    listId: string | number,
  ): Promise<UserSmartListDraft> {
    return this.api.get(
      `/v1/users/${segment(id)}/lists/${segment(listId)}/smart-list-draft`,
    );
  }

  convertListSmartListDraft(
    id: UserId,
    listId: string | number,
    input: UserSmartListDraftInput,
  ): Promise<UserSmartListCreateResult> {
    return this.api.post(
      `/v1/users/${segment(id)}/lists/${
        segment(listId)
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

  listCollaborations(id: UserId): Promise<UserListResponse[]> {
    return this.api.get(
      `/v1/users/${segment(id)}/lists/collaborations`,
    );
  }

  myListCollaborations(): Promise<UserListResponse[]> {
    return this.api.get("/v1/users/me/lists/collaborations");
  }

  reorderLists(
    id: UserId,
    input: UserListRankInput,
  ): Promise<UserListsReorderResult> {
    return this.api.post(`/v1/users/${segment(id)}/lists/reorder`, {
      body: { rank: input.rank },
    });
  }

  listsContaining(
    mediaType: string,
    mediaId: number,
  ): Promise<UserListResponse[]> {
    return this.api.get("/v1/users/me/lists/containing", {
      params: compactQuery({ type: mediaType, media_id: mediaId }),
    });
  }

  smartLists(id: UserId): Promise<UserSmartList[]> {
    return this.api.get(`/v1/users/${segment(id)}/smart-lists`);
  }

  createSmartList(
    id: UserId,
    input: UserSmartListInput,
  ): Promise<UserSmartListCreateResult> {
    return this.api.post(`/v1/users/${segment(id)}/smart-lists`, {
      body: smartListBody(input),
    });
  }

  smartList(id: UserId, listId: string | number): Promise<UserSmartList> {
    return this.api.get(
      `/v1/users/${segment(id)}/smart-lists/${segment(listId)}/`,
    );
  }

  updateSmartList(
    id: UserId,
    listId: string | number,
    input: UserSmartListInput,
  ): Promise<UserSmartList> {
    return this.api.put(
      `/v1/users/${segment(id)}/smart-lists/${segment(listId)}/`,
      { body: smartListBody(input) },
    );
  }

  deleteSmartList(id: UserId, listId: string | number): Promise<void> {
    return this.api.delete(
      `/v1/users/${segment(id)}/smart-lists/${segment(listId)}/`,
    );
  }

  smartListDrafts(id: UserId): Promise<UserSmartListDrafts> {
    return this.api.get(`/v1/users/${segment(id)}/smart-list-drafts`);
  }

  mySmartLists(): Promise<UserSmartListRecord[]> {
    return this.api.get("/v1/users/me/smart-lists");
  }

  createMySmartList(
    input: UserSmartListRecordInput,
  ): Promise<UserSmartListRecord> {
    return this.api.post("/v1/users/me/smart-lists", {
      body: smartListRecordBody(input),
    });
  }
}
