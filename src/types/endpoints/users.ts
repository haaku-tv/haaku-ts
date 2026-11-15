import type {
  CalendarContractEpisode,
  CalendarContractMovie,
  CalendarContractShow,
} from "./calendars.ts";
import type { FiltersSavedFilter, FiltersSaveInput } from "./filters.ts";
import type {
  ListComment,
  ListContractCreateInput,
  ListContractItemsAddedResponse,
  ListContractItemsRemoveResponse,
  ListContractLike,
  ListContractRankResponse,
  ListContractUpdateInput,
  ListCreateInput,
  ListItem,
  ListItemsInput,
  ListItemType,
  ListItemUpdateInput,
  ListRankInput,
  ListRankResponse,
  ListResponse,
  ListSmartListDraft,
  ListSmartListDraftInput,
  ListSmartListResponse,
} from "./lists.ts";
import type { MovieComment, MovieList } from "./movies.ts";
import type { NotesList, NotesNote } from "./notes.ts";
import type {
  SyncCollectionItem,
  SyncFavoriteItem,
  SyncHistoryItem,
  SyncRatingItem,
  SyncWatchedSeason,
  SyncWatchlistItem,
} from "./sync.ts";

export type UserId = string | number;
export type UserMediaType = "movie" | "show" | "season" | "episode";
export type UserMediaTypePath =
  | "movies"
  | "shows"
  | "seasons"
  | "episodes"
  | "movie"
  | "show"
  | "season"
  | "episode"
  | "all";
export type UserCommentType = "all" | "reviews" | "shouts";
export type UserCommentMediaType =
  | "all"
  | "movies"
  | "shows"
  | "seasons"
  | "episodes"
  | "lists";
export type UserActivityFeedType = "friends" | "followers" | "following";
export type UserHiddenSection =
  | "calendar"
  | "progress_watched"
  | "progress_collected"
  | "recommendations"
  | "comments"
  | "dropped";
export type UserSavedFilterSection =
  | "calendar"
  | "progress_watched"
  | "progress_collected"
  | "recommendations"
  | "comments"
  | "dropped";
export type UserContractSavedFilterSection =
  | "movies"
  | "shows"
  | "calendars"
  | "search";
export type UserListSortBy = "rank" | "added" | "listed" | "title" | "released";
export type UserListSortHow = "asc" | "desc";
export type UserListCommentSort =
  | "newest"
  | "oldest"
  | "likes"
  | "replies"
  | "trending";
export type UserWatchlistSort =
  | "rank"
  | "added"
  | "listed"
  | "title"
  | "released";
export type UserWatchlistHide =
  | "collected"
  | "listed"
  | "nonotes"
  | "notes"
  | "rated"
  | "uncollected"
  | "unrated"
  | "unwatched"
  | "unwatchlisted";
export type UserReportReason = "spam" | "adult" | "language" | "other";

export type UserPageQuery = {
  page?: number;
  limit?: number;
};

export type UserExtendedQuery = UserPageQuery & {
  extended?: string;
};

export type UserCatalogueFilterQuery = {
  genres?: string;
  years?: string;
  ratings?: string;
  runtimes?: string;
  statuses?: string;
  certifications?: string;
  languages?: string;
  countries?: string;
};

export type UserHistoryQuery = UserExtendedQuery & UserCatalogueFilterQuery & {
  idType?: string;
  startAt?: string | Date;
  endAt?: string | Date;
  startDate?: string | Date;
  endDate?: string | Date;
};

export type UserRatingsQuery = UserExtendedQuery & {
  idType?: string;
};

export type UserCollectionQuery = UserPageQuery;

export type UserFavoritesQuery =
  & UserExtendedQuery
  & UserCatalogueFilterQuery
  & {
    sortBy?: UserListSortBy;
    sortHow?: UserListSortHow;
  };

export type UserWatchlistQuery = UserFavoritesQuery & {
  hide?: string;
  ignoreWatched?: boolean;
  ignoreCollected?: boolean;
  ignoreWatchlisted?: boolean;
};

export type UserWatchedQuery = UserExtendedQuery & {
  specials?: boolean;
  hidden?: boolean;
  countSpecials?: boolean;
};

export type UserWatchedShowsQuery = UserExtendedQuery & {
  specials?: boolean;
  seasonNumbers?: boolean;
};

export type UserActivityQuery = UserExtendedQuery & UserCatalogueFilterQuery & {
  startDate?: string | Date;
  endDate?: string | Date;
};

export type UserMeActivityQuery = UserPageQuery & {
  type?: UserActivityFeedType;
  startAt?: string | Date;
};

export type UserMeNotesQuery = UserPageQuery & {
  mediaType?: string;
};

export type UserBlockedQuery = UserPageQuery;

export type UserHiddenQuery = UserPageQuery & {
  type?: UserMediaTypePath;
};

export type UserProfile = {
  id: string;
  username: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  timezone?: string;
  language?: string;
  is_private: boolean;
  is_admin: boolean;
  is_moderator: boolean;
  status: string;
  plan: string;
  created_at: string;
};

export type UserStatsSummary = {
  watched?: number;
  lists?: number;
  followers: number;
  following: number;
};

export type UserReferenceIds = {
  trakt: number;
  slug: string | null;
};

export type UserReference = {
  username: string;
  private: boolean;
  deleted: boolean;
  name: string | null;
  ids: UserReferenceIds;
};

export type UserPublicProfile = {
  id: string;
  username: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  is_private: boolean;
  stats_summary?: UserStatsSummary;
  recent_activity?: unknown[];
  private: boolean;
  deleted: boolean;
  ids: {
    slug: string | null;
    trakt: number;
  };
  joined_at: string;
  about: string | null;
  vip: null;
  vip_ep: null;
  director: null;
  gender: null;
  age: null;
  images: {
    avatar: {
      full: string;
    };
  };
  vip_og: null;
  vip_years: null;
  vip_cover_image: null;
  vip_veteran_since: null;
  vip_veteran_years: null;
  vip_veteran_tier: null;
  vip_veteran_title: null;
  vip_grace_ends_at: null;
};

export type UserUpdateInput = {
  bio?: string;
  location?: string;
  timezone?: string;
  language?: string;
  is_private?: boolean;
};

export type UserPrivacySettings = {
  profile: string;
  history: string;
  ratings: string;
  activity: string;
};

export type UserNotificationSettings = {
  follows: boolean;
  replies: boolean;
  import_complete: boolean;
  weekly_digest: boolean;
};

export type UserSettings = {
  privacy: UserPrivacySettings;
  notifications: UserNotificationSettings;
};

export type UserSettingsUpdateInput = {
  privacy?: UserPrivacySettings;
  notifications?: UserNotificationSettings;
};

export type UserSettingsUser = {
  email: string;
  username: string;
  private: boolean;
  name: string | null;
  vip: boolean;
  vip_ep: boolean;
  director: boolean;
  vip_og: boolean;
  vip_years: number;
  ids: {
    slug: string;
    uuid: string;
  };
  joined_at: string;
  location: string | null;
  about: string | null;
  images: {
    avatar: {
      full: string;
    };
  };
};

export type UserContractSettings = {
  user: UserSettingsUser;
  permissions: {
    commenting: boolean;
    liking: boolean;
    following: boolean;
  };
  account: {
    timezone: string;
    date_format: string;
    time_24hr: boolean;
  };
};

export type UserContractSettingsUpdateInput = {
  user?: {
    name?: string;
    about?: string;
    location?: string;
    private?: boolean;
  };
  account?: Record<string, unknown>;
  browsing?: Record<string, unknown>;
  sharing?: Record<string, unknown>;
  limits?: Record<string, unknown>;
};

export type UserLookup = {
  id: string;
  username: string;
  name: string;
};

export type UserFollowAction = {
  follower_id: string;
  following_id: string;
  status: "approved" | "pending";
  created_at: string;
  approved_at?: string;
};

export type UserProfileStub = {
  id: string;
  username: string;
  name: string;
  avatar_url?: string;
};

export type UserFollowRequest = {
  follower_id: string;
  username: string;
  name: string;
  avatar_url?: string;
  created_at: string;
};

export type UserFollowRequestApproval = {
  status: "approved";
};

export type UserBlockedEntry = {
  blocked_at: string;
  user: UserReference;
};

export type UserContractComment = {
  id: number;
  parent_id: number;
  created_at: string;
  updated_at: string;
  comment: string;
  gif?: unknown;
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
  user: UserReference;
  pinned?: boolean;
};

export type UserCommentReaction = {
  reacted_at: string;
  reaction: {
    type: string;
  };
  type: "comment";
  comment: UserContractComment;
};

export type UserHistoryItem = SyncHistoryItem;
export type UserRatingItem = SyncRatingItem;
export type UserWatchlistItem = SyncWatchlistItem;
export type UserCollectionItem = SyncCollectionItem;
export type UserFavoriteItem = SyncFavoriteItem;
export type UserContractSeason = SyncWatchedSeason;
export type UserNote = NotesNote;
export type UserNotesPage = NotesList;
export type UserListComment = ListComment;
export type UserListItem = ListItem;
export type UserListType = ListItemType;
export type UserListLike = ListContractLike;
export type UserListResponse = ListResponse;
export type UserListItemsAddResult = ListContractItemsAddedResponse;
export type UserListItemsRemoveResult = ListContractItemsRemoveResponse;
export type UserListReorderResult = ListContractRankResponse;
export type UserListsReorderResult = ListRankResponse;
export type UserListItemUpdateInput = ListItemUpdateInput;
export type UserListCreateInput = ListCreateInput;
export type UserListContractCreateInput = ListContractCreateInput;
export type UserListContractUpdateInput = ListContractUpdateInput;
export type UserListUpdateInput = ListContractUpdateInput;
export type UserListItemsInput = ListItemsInput;
export type UserListRankInput = ListRankInput;
export type UserSmartListDraft = ListSmartListDraft;
export type UserSmartListDraftInput = ListSmartListDraftInput;
export type UserSmartListCreateResult = ListSmartListResponse;
export type UserSmartListInput = {
  name: string;
  source?: string;
  media_type?: string;
  filters?: Record<string, unknown>;
};
export type UserSavedFilter = FiltersSavedFilter;
export type UserSavedFilterInput = FiltersSaveInput;

export type UserPaged<T> = {
  items: T[];
  page?: number;
  limit?: number;
  row_count: number;
};

export type UserDataPaged<T> = {
  data: T[];
  page: number;
  limit: number;
  total_count: number;
};

export type UserHistoryPage = UserPaged<UserHistoryItem>;
export type UserRatingsPage = UserPaged<UserRatingItem>;
export type UserWatchlistPage = UserPaged<UserWatchlistItem>;
export type UserCollectionPage = UserPaged<UserCollectionItem>;
export type UserCommentsPage = UserDataPaged<MovieComment>;
export type UserLikedCommentsPage = UserPaged<UserLikedCommentEntry>;
export type UserLikedListsPage = UserPaged<UserLikedListEntry>;

export type UserLikedCommentEntry = {
  liked_at: string;
  type: "comment";
  comment: MovieComment;
};

export type UserLikedListEntry = {
  liked_at: string;
  type: "list";
  list: MovieList;
};

export type UserFavoriteEntry = {
  rank: number;
  id: number;
  listed_at: string;
  type: string;
  notes: string | null;
  movie?: CalendarContractMovie;
  show?: CalendarContractShow;
};

export type UserWatchlistEntry = {
  rank: number;
  id: number;
  listed_at: string;
  type: string;
  notes: string | null;
  movie?: CalendarContractMovie;
  show?: CalendarContractShow;
};

export type UserHistoryEntry = {
  id: number;
  watched_at: string;
  action: string;
  type: string;
  movie?: CalendarContractMovie;
  episode?: CalendarContractEpisode;
  show?: CalendarContractShow;
};

export type UserRatingEntry = {
  rated_at: string;
  rating: number;
  type: string;
  movie?: CalendarContractMovie;
  show?: CalendarContractShow;
  season?: UserContractSeason;
  episode?: CalendarContractEpisode;
};

export type UserWatchedAggregate = {
  plays: number;
  last_watched_at: string;
  last_updated_at: string;
  season?: UserContractSeason;
  episode?: CalendarContractEpisode;
};

export type UserWatchedMovies = Record<string, string[]>;
export type UserWatchedShows = Record<
  string,
  Record<string, Record<string, string[]>>
>;

export type UserContractActivity = {
  id: number;
  activity_at: string;
  action: string;
  user: UserReference;
  type: string;
  movie?: CalendarContractMovie;
  episode?: CalendarContractEpisode;
};

export type UserWatching = {
  type: string;
  media_type: string;
  media_id: number;
  season_id?: number;
  episode_id?: number;
  progress: number;
  action: string;
  started_at: string;
  expires_at: string;
};

export type UserActivity = {
  id: number;
  actor_id: string;
  event_type: string;
  media_type?: string;
  media_id?: number;
  payload: Record<string, unknown>;
  created_at: string;
};

export type UserMediaStats = {
  plays: number;
  minutes: number;
  watched: number;
  collected: number;
  ratings: number;
  comments: number;
};

export type UserShowStats = {
  watched: number;
  collected: number;
  ratings: number;
  comments: number;
};

export type UserSeasonStats = {
  ratings: number;
  comments: number;
};

export type UserNetworkStats = {
  friends: number;
  followers: number;
  following: number;
};

export type UserRatingStats = {
  total: number;
  distribution: Record<string, number>;
};

export type UserStats = {
  seasons: UserSeasonStats;
  shows: UserShowStats;
  movies: UserMediaStats;
  episodes: UserMediaStats;
  network: UserNetworkStats;
  ratings: UserRatingStats;
  total_plays: number;
  total_minutes: number;
};

export type UserProfileGenreCount = {
  genre: string;
  count: number;
};

export type UserProfileTopRated = {
  rating: number;
  rated_at: string;
  type: string;
  id: number;
  movie?: CalendarContractMovie;
  show?: CalendarContractShow;
};

export type UserProfileSummary = {
  top_rated: UserProfileTopRated[];
  favourite_genres: UserProfileGenreCount[];
  list_count: number;
};

export type UserHiddenItem = {
  user_id: string;
  section: string;
  media_type: string;
  media_id: number;
  hidden_at: string;
};

export type UserHiddenInput = {
  media_type: string;
  media_id: number;
};

export type UserHiddenRemoveResult = {
  deleted: number;
};

export type UserContractSavedFilter = {
  rank: number;
  id: number;
  name: string;
  path: string;
  query: string;
  updated_at: string;
  section: string;
};

export type UserApiKey = {
  id: string;
  name: string;
  prefix: string;
  masked_key: string;
  created_at: string;
  last_used?: string;
  expires_at?: string;
};

export type UserApiKeyCreated = {
  id: string;
  key: string;
  name: string;
  prefix: string;
  expires_at?: string;
};

export type UserApiKeyCreateInput = {
  name?: string;
  expires_in_days?: number;
};

export type UserApiKeyRevokeResult = {
  status: "revoked";
};

export type UserReportInput = {
  reason: UserReportReason;
  message?: string;
};

export type UserReportResult = Record<string, never>;

export type UserListReportResponse = Record<string, never>;

export type UserSmartList = {
  name: string;
  privacy: string;
  created_at: string;
  updated_at: string;
  ids: {
    trakt: number;
    slug: string;
  };
  images: {
    posters: string[];
  };
  source: string;
  media_type: string;
  filters: Record<string, unknown>;
};

export type UserSmartListItem = {
  type: string;
  title: string;
  year: number;
  rating: number;
  poster: string;
  movie_id?: number;
  show_id?: number;
};

export type UserSmartListDrafts = {
  convertible_count: number;
  best_confidence: null;
  lists: Record<string, unknown>[];
};

export type UserSmartListRecord = {
  id: number;
  user_id: string;
  name: string;
  filters: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  item_count?: number;
};

export type UserSmartListRecordInput = {
  name: string;
  filters?: Record<string, unknown>;
};

export type UserExportUser = UserProfile & {
  email?: string;
  updated_at: string;
};

export type UserExportHistory = {
  id: number;
  media_type: string;
  media_id: number;
  season_id?: number;
  episode_id?: number;
  watched_at: string;
  source: string;
  source_id?: string;
};

export type UserExportRating = {
  id: number;
  media_type: string;
  media_id: number;
  rating: number;
  rated_at: string;
};

export type UserExportWatchlist = {
  id: number;
  media_type: string;
  media_id: number;
  rank: number;
  notes?: string;
  listed_at: string;
};

export type UserExportCollection = {
  id: number;
  media_type: string;
  media_id: number;
  collected_at: string;
};

export type UserExportFavorite = {
  id: number;
  media_type: string;
  media_id: number;
  rank: number;
  favorited_at: string;
};

export type UserExportListItem = {
  id: number;
  media_type: string;
  media_id: number;
  rank: number;
  notes?: string;
  added_by: string;
  added_at: string;
};

export type UserExportList = {
  id: number;
  name: string;
  slug: string;
  description: string;
  privacy: string;
  sort_by: string;
  sort_how: string;
  is_ranked: boolean;
  cover_url: string;
  allow_comments: boolean;
  created_at: string;
  updated_at: string;
  items: UserExportListItem[];
};

export type UserExportComment = {
  id: number;
  parent_id?: number;
  media_type?: string;
  media_id?: number;
  list_id?: number;
  comment_type: string;
  body: string;
  spoiler: boolean;
  like_count: number;
  reply_count: number;
  edited_at?: string;
  created_at: string;
  updated_at: string;
};

export type UserExportNote = {
  id: number;
  media_type: string;
  media_id: number;
  note: string;
  created_at: string;
  updated_at: string;
};

export type UserExportHidden = {
  section: string;
  media_type: string;
  media_id: number;
  hidden_at: string;
};

export type UserExportFollow = {
  user_id: string;
  approved_at?: string;
  created_at: string;
};

export type UserExportBlock = {
  blocked_id: string;
  created_at: string;
};

export type UserExportCheckin = {
  id: number;
  media_type: string;
  media_id: number;
  season_id?: number;
  episode_id?: number;
  message?: string;
  expires_at: string;
  created_at: string;
};

export type UserExportPlayback = {
  media_type: string;
  media_id: number;
  progress: number;
  paused_at: string;
};

export type UserExportWebhookEndpoint = {
  id: number;
  url: string;
  events: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type UserExportArchive = {
  version: number;
  exported_at: string;
  user: UserExportUser;
  settings: UserSettings;
  history: UserExportHistory[];
  ratings: UserExportRating[];
  watchlist: UserExportWatchlist[];
  collection: UserExportCollection[];
  favorites: UserExportFavorite[];
  lists: UserExportList[];
  comments: UserExportComment[];
  notes: UserExportNote[];
  hidden: UserExportHidden[];
  follows: {
    following: UserExportFollow[];
    followers: UserExportFollow[];
  };
  blocks: UserExportBlock[];
  checkins: UserExportCheckin[];
  playback: UserExportPlayback[];
  webhook_endpoints: UserExportWebhookEndpoint[];
};
