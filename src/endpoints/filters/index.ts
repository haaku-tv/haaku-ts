import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  FiltersSavedFilter,
  FiltersSaveInput,
  FiltersSection,
} from "../../types/endpoints/filters.ts";

export class FilterEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  list(section: FiltersSection): Promise<FiltersSavedFilter[]> {
    return this.api.get(`/v1/users/me/saved_filters/${section}`);
  }

  save(input: FiltersSaveInput): Promise<FiltersSavedFilter> {
    return this.api.post("/v1/users/me/saved_filters", {
      body: {
        section: input.section,
        name: input.name,
        ...(input.filter !== undefined ? { filter: input.filter } : {}),
      },
    });
  }

  delete(id: number): Promise<void> {
    return this.api.delete(`/v1/users/me/saved_filters/${id}`);
  }
}
