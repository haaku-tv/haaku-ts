import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  CheckinInput,
  CheckinResponse,
} from "../../types/endpoints/checkin.ts";

export class CheckinEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  get(): Promise<CheckinResponse | undefined> {
    return this.api.get("/v1/checkin");
  }

  create(input: CheckinInput): Promise<CheckinResponse> {
    return this.api.post("/v1/checkin", {
      body: {
        ...(input.movie !== undefined ? { movie: input.movie } : {}),
        ...(input.episode !== undefined ? { episode: input.episode } : {}),
        ...(input.show !== undefined ? { show: input.show } : {}),
        ...(input.message !== undefined ? { message: input.message } : {}),
        ...(input.sharing !== undefined ? { sharing: input.sharing } : {}),
      },
    });
  }

  delete(): Promise<void> {
    return this.api.delete("/v1/checkin");
  }
}
