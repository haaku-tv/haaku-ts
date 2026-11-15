import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  SmartListId,
  SmartListInput,
  SmartListItemQuery,
  SmartListItemType,
  SmartListRecord,
  SmartListResolvedItem,
  SmartListResolvedPage,
  SmartListTemplate,
} from "../../types/endpoints/smartLists.ts";
import { compactQuery } from "../../utils/query.ts";

export class SmartListEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  get(id: SmartListId): Promise<SmartListRecord> {
    return this.api.get(`/v1/smart-lists/${id}`);
  }

  update(id: SmartListId, input: SmartListInput): Promise<SmartListRecord> {
    return this.api.put(`/v1/smart-lists/${id}`, {
      body: {
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.filters !== undefined ? { filters: input.filters } : {}),
      },
    });
  }

  delete(id: SmartListId): Promise<void> {
    return this.api.delete(`/v1/smart-lists/${id}`);
  }

  items(
    id: SmartListId,
    input: SmartListItemQuery = {},
  ): Promise<SmartListResolvedPage> {
    return this.api.get(`/v1/smart-lists/${id}/items`, {
      params: compactQuery({
        type: input.type,
        sort_by: input.sortBy,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  itemsByType(
    id: SmartListId,
    type: SmartListItemType,
    sortBy: string,
    sortHow: string,
    input: { page?: number; limit?: number } = {},
  ): Promise<SmartListResolvedItem[]> {
    return this.api.get(
      `/v1/smart-lists/${id}/items/${type}/${sortBy}/${sortHow}`,
      { params: compactQuery({ page: input.page, limit: input.limit }) },
    );
  }

  templates(): Promise<SmartListTemplate[]> {
    return this.api.get("/v1/smart-lists/templates");
  }
}
