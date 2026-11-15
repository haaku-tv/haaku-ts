import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  WebhookClerkInput,
  WebhookClerkResponse,
  WebhookCreateInput,
  WebhookCreateResponse,
  WebhookDeliveriesQuery,
  WebhookDelivery,
  WebhookEndpointResponse,
  WebhookSecretResponse,
  WebhookTestResponse,
  WebhookUpdateInput,
} from "../../types/endpoints/webhooks.ts";
import { compactQuery } from "../../utils/query.ts";

const idSegment = (id: number): string => encodeURIComponent(String(id));

export class WebhookEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  list(): Promise<WebhookEndpointResponse[]> {
    return this.api.get("/v1/webhooks");
  }

  create(input: WebhookCreateInput): Promise<WebhookCreateResponse> {
    return this.api.post("/v1/webhooks", {
      body: {
        url: input.url,
        events: input.events,
        ...(input.secret !== undefined ? { secret: input.secret } : {}),
      },
    });
  }

  update(
    id: number,
    input: WebhookUpdateInput,
  ): Promise<WebhookEndpointResponse> {
    return this.api.put(`/v1/webhooks/${idSegment(id)}`, {
      body: {
        ...(input.url !== undefined ? { url: input.url } : {}),
        ...(input.events !== undefined ? { events: input.events } : {}),
        ...(input.active !== undefined ? { active: input.active } : {}),
      },
    });
  }

  delete(id: number): Promise<void> {
    return this.api.delete(`/v1/webhooks/${idSegment(id)}`);
  }

  deliveries(
    id: number,
    input: WebhookDeliveriesQuery = {},
  ): Promise<WebhookDelivery[]> {
    return this.api.get(`/v1/webhooks/${idSegment(id)}/deliveries`, {
      params: compactQuery({ page: input.page, limit: input.limit }),
    });
  }

  rotateSecret(id: number): Promise<WebhookSecretResponse> {
    return this.api.post(`/v1/webhooks/${idSegment(id)}/rotate-secret`);
  }

  test(id: number): Promise<WebhookTestResponse> {
    return this.api.post(`/v1/webhooks/${idSegment(id)}/test`);
  }

  clerk(
    input: WebhookClerkInput,
    headers: Record<string, string> = {},
  ): Promise<WebhookClerkResponse> {
    return this.api.post("/v1/webhooks/clerk", {
      body: input,
      headers,
    });
  }
}
