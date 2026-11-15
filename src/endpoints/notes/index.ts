import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  NotesCreateInput,
  NotesItem,
  NotesList,
  NotesListQuery,
  NotesNote,
  NotesUpdateInput,
} from "../../types/endpoints/notes.ts";
import { compactQuery } from "../../utils/query.ts";

export class NoteEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  create(input: NotesCreateInput): Promise<NotesNote> {
    return this.api.post("/v1/notes", {
      body: {
        media_type: input.media_type,
        media_id: input.media_id,
        note: input.note,
      },
    });
  }

  get(id: number): Promise<NotesNote> {
    return this.api.get(`/v1/notes/${id}`);
  }

  item(id: number): Promise<NotesItem> {
    return this.api.get(`/v1/notes/${id}/item`);
  }

  update(id: number, input: NotesUpdateInput): Promise<NotesNote> {
    return this.api.put(`/v1/notes/${id}`, {
      body: { note: input.note },
    });
  }

  delete(id: number): Promise<void> {
    return this.api.delete(`/v1/notes/${id}`);
  }

  list(input: NotesListQuery = {}): Promise<NotesList> {
    return this.api.get("/v1/users/me/notes", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
        media_type: input.mediaType,
      }),
    });
  }
}
