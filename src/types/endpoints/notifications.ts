export type NotificationsPageQuery = {
  page?: number;
  limit?: number;
};

export type NotificationsMediaRef = {
  type: string;
  ids: Record<string, unknown>;
  title?: string;
};

export type NotificationsItem = {
  id: number;
  user_id: string;
  type: string;
  actor_id?: string;
  payload: Record<string, unknown>;
  ref?: NotificationsMediaRef;
  read: boolean;
  created_at: string;
};

export type NotificationsInbox = {
  data: NotificationsItem[];
  page: number;
  limit: number;
  total_count: number;
  unread_count: number;
};

export type NotificationsMarkReadInput = {
  ids?: number[];
};

export type NotificationsSettings = {
  follows: boolean;
  replies: boolean;
  list_invite: boolean;
  import_complete: boolean;
};

export type NotificationsStatus = {
  status: string;
};
