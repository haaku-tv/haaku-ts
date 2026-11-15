import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  IntegrationCreateInput,
  IntegrationCreateResponse,
  IntegrationReceiveInput,
  IntegrationReceiveResponse,
  IntegrationToken,
} from "../../types/endpoints/integrations.ts";

const idSegment = (id: number): string => encodeURIComponent(String(id));
const tokenSegment = (token: string): string => encodeURIComponent(token);

export class IntegrationEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  list(): Promise<IntegrationToken[]> {
    return this.api.get("/v1/integrations");
  }

  create(input: IntegrationCreateInput): Promise<IntegrationCreateResponse> {
    return this.api.post("/v1/integrations", {
      body: {
        name: input.name,
        ...(input.scopes !== undefined ? { scopes: input.scopes } : {}),
      },
    });
  }

  delete(id: number): Promise<void> {
    return this.api.delete(`/v1/integrations/${idSegment(id)}`);
  }

  receive(
    token: string,
    input: IntegrationReceiveInput,
  ): Promise<IntegrationReceiveResponse> {
    return this.api.post(`/v1/integrations/${tokenSegment(token)}`, {
      body: input,
    });
  }
}
