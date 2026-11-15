export type WebhookEndpointResponse = {
  id: number;
  url: string;
  events: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type WebhookCreateInput = {
  url: string;
  events: string[];
  secret?: string;
};

export type WebhookCreateResponse = WebhookEndpointResponse & {
  secret: string;
};

export type WebhookUpdateInput = {
  url?: string;
  events?: string[];
  active?: boolean;
};

export type WebhookDeliveriesQuery = {
  page?: number;
  limit?: number;
};

export type WebhookDelivery = {
  id: number;
  event_id: string;
  event_type: string;
  status: string;
  attempts: number;
  response_code?: number;
  response_body?: string;
  duration_ms?: number;
  created_at: string;
};

export type WebhookSecretResponse = {
  secret: string;
};

export type WebhookTestResponse = {
  status: "queued";
};

export type WebhookClerkInput = {
  type: string;
  data: Record<string, unknown>;
  [key: string]: unknown;
};

export type WebhookClerkResponse = {
  status: "ok";
};
