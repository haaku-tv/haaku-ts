import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  PersonCredit,
  PersonDetail,
  PersonFilmography,
  PersonId,
  PersonIdQuery,
  PersonList,
  PersonListSort,
  PersonListType,
  PersonPageQuery,
  PersonReportInput,
  PersonReportResponse,
  PersonResponse,
} from "../../types/endpoints/people.ts";
import { formatDate } from "../../utils/dates.ts";
import { compactQuery } from "../../utils/query.ts";

const idSegment = (id: PersonId): string => encodeURIComponent(String(id));

export class PersonEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  get(id: PersonId, input: PersonIdQuery = {}): Promise<PersonDetail> {
    return this.api.get(`/v1/people/${idSegment(id)}`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  credits(
    id: PersonId,
    input: PersonIdQuery = {},
  ): Promise<PersonFilmography> {
    return this.api.get(`/v1/people/${idSegment(id)}/credits`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  movies(id: PersonId, input: PersonIdQuery = {}): Promise<PersonCredit[]> {
    return this.api.get(`/v1/people/${idSegment(id)}/movies`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  shows(id: PersonId, input: PersonIdQuery = {}): Promise<PersonCredit[]> {
    return this.api.get(`/v1/people/${idSegment(id)}/shows`, {
      params: compactQuery({ id_type: input.idType }),
    });
  }

  lists(
    id: PersonId,
    type: PersonListType,
    sort: PersonListSort,
    input: PersonPageQuery = {},
  ): Promise<PersonList[]> {
    return this.api.get(
      `/v1/people/${idSegment(id)}/lists/${type}/${sort}`,
      { params: compactQuery({ page: input.page, limit: input.limit }) },
    );
  }

  report(
    id: PersonId,
    input: PersonReportInput,
  ): Promise<PersonReportResponse> {
    return this.api.post(`/v1/people/${idSegment(id)}/report`, {
      body: {
        reason: input.reason,
        ...(input.message !== undefined ? { message: input.message } : {}),
      },
    });
  }

  updates(
    startDate: string | Date,
    input: PersonPageQuery = {},
  ): Promise<PersonResponse[]> {
    return this.api.get(`/v1/people/updates/${formatDate(startDate)}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  updatedIds(
    startDate: string | Date,
    input: PersonPageQuery = {},
  ): Promise<number[]> {
    return this.api.get(`/v1/people/updates/id/${formatDate(startDate)}`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }
}
