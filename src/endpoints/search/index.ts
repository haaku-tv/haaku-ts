import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  SearchContractItem,
  SearchContractType,
  SearchExactQuery,
  SearchExactResponse,
  SearchExactType,
  SearchExternalIdQuery,
  SearchExternalIdType,
  SearchItem,
  SearchLookupQuery,
  SearchLookupResponse,
  SearchPostInput,
  SearchQuery,
  SearchRecentByIdItem,
  SearchRecentEntry,
  SearchRecentGlobalType,
  SearchRecentInput,
  SearchRecentQuery,
  SearchRecordRecentInput,
  SearchResolveQuery,
  SearchResolveResponse,
  SearchTypeQuery,
} from "../../types/endpoints/search.ts";
import { compactQuery } from "../../utils/query.ts";

const segment = (value: string | number): string =>
  encodeURIComponent(String(value));

export class SearchEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  search(input: SearchQuery = {}): Promise<SearchItem[]> {
    return this.api.get("/v1/search", {
      params: compactQuery({
        query: input.query,
        type: input.type,
        page: input.page,
        limit: input.limit,
        fields: input.fields,
        genre: input.genre,
        year: input.year,
      }),
    });
  }

  searchPost(input: SearchPostInput): Promise<SearchItem[]> {
    return this.api.post("/v1/search", {
      body: {
        query: input.query,
        type: input.type,
        types: input.types,
        year: input.year,
        genre: input.genre,
        genres: input.genres,
        page: input.page,
        limit: input.limit,
        fields: input.fields,
      },
    });
  }

  searchType(
    type: SearchContractType,
    input: SearchTypeQuery,
  ): Promise<SearchContractItem[]> {
    return this.api.get(`/v1/search/${type}`, {
      params: compactQuery({
        query: input.query,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  searchTypeExact(
    type: SearchExactType,
    input: SearchTypeQuery,
  ): Promise<SearchContractItem[]> {
    return this.api.get(`/v1/search/${type}/exact`, {
      params: compactQuery({
        query: input.query,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  searchExact(input: SearchExactQuery): Promise<SearchExactResponse> {
    return this.api.get("/v1/search/exact", {
      params: compactQuery({
        query: input.query,
        type: input.type,
      }),
    });
  }

  searchLookup(input: SearchLookupQuery): Promise<SearchLookupResponse> {
    return this.api.get("/v1/search/lookup", {
      params: compactQuery({
        id_type: input.idType,
        id: input.id,
      }),
    });
  }

  searchByExternalId(
    idType: SearchExternalIdType,
    id: string | number,
    input: SearchExternalIdQuery = {},
  ): Promise<SearchContractItem[]> {
    return this.api.get(`/v1/search/${idType}/${segment(id)}`, {
      params: compactQuery({ type: input.type }),
    });
  }

  searchRecent(input: SearchRecentInput): Promise<void> {
    return this.api.post("/v1/search/recent", {
      body: {
        query: input.query,
        id: input.id,
        type: input.type,
      },
    });
  }

  searchRecentByIdGlobal(
    type: SearchRecentGlobalType,
    input: SearchRecentQuery = {},
  ): Promise<SearchRecentByIdItem[]> {
    return this.api.get(`/v1/search/recent_by_id/global/${type}`, {
      params: compactQuery({
        query: input.query,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  searchRecents(): Promise<SearchRecentEntry[]> {
    return this.api.get("/v1/search/recents");
  }

  recordRecent(input: SearchRecordRecentInput): Promise<SearchRecentEntry> {
    return this.api.post("/v1/search/recents", {
      body: {
        query: input.query,
        type: input.type,
      },
    });
  }

  deleteRecent(id: number): Promise<void> {
    return this.api.delete(`/v1/search/recents/${segment(id)}`);
  }

  clearRecents(): Promise<void> {
    return this.api.delete("/v1/search/recents");
  }

  mediaResolve(input: SearchResolveQuery): Promise<SearchResolveResponse> {
    return this.api.get("/v1/media/resolve", {
      params: compactQuery({
        type: input.type,
        id_type: input.idType,
        id: input.id,
      }),
    });
  }
}
