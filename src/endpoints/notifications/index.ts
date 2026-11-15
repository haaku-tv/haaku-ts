import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  NotificationsInbox,
  NotificationsMarkReadInput,
  NotificationsPageQuery,
  NotificationsSettings,
  NotificationsStatus,
} from "../../types/endpoints/notifications.ts";
import { compactQuery } from "../../utils/query.ts";

export class NotificationEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  list(input: NotificationsPageQuery = {}): Promise<NotificationsInbox> {
    return this.api.get("/v1/notifications", {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  markRead(
    input: NotificationsMarkReadInput = {},
  ): Promise<NotificationsStatus> {
    return this.api.post("/v1/notifications/read", {
      body: { ids: input.ids ?? [] },
    });
  }

  settings(): Promise<NotificationsSettings> {
    return this.api.get("/v1/notifications/settings");
  }
}
