import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  ScrobbleInput,
  ScrobbleResponse,
} from "../../types/endpoints/scrobble.ts";

export class ScrobbleEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  start(input: ScrobbleInput): Promise<ScrobbleResponse> {
    return this.api.post("/v1/scrobble/start", {
      body: {
        ...(input.movie !== undefined ? { movie: input.movie } : {}),
        ...(input.episode !== undefined ? { episode: input.episode } : {}),
        ...(input.show !== undefined ? { show: input.show } : {}),
        progress: input.progress,
      },
    });
  }

  pause(input: ScrobbleInput): Promise<ScrobbleResponse> {
    return this.api.post("/v1/scrobble/pause", {
      body: {
        ...(input.movie !== undefined ? { movie: input.movie } : {}),
        ...(input.episode !== undefined ? { episode: input.episode } : {}),
        ...(input.show !== undefined ? { show: input.show } : {}),
        progress: input.progress,
      },
    });
  }

  stop(input: ScrobbleInput): Promise<ScrobbleResponse> {
    return this.api.post("/v1/scrobble/stop", {
      body: {
        ...(input.movie !== undefined ? { movie: input.movie } : {}),
        ...(input.episode !== undefined ? { episode: input.episode } : {}),
        ...(input.show !== undefined ? { show: input.show } : {}),
        progress: input.progress,
      },
    });
  }
}
