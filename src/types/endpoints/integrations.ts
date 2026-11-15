export type IntegrationToken = {
  id: number;
  name: string;
  scopes: string[];
  active: boolean;
  created_at: string;
};

export type IntegrationCreateInput = {
  name: string;
  scopes?: string[];
};

export type IntegrationCreateResponse = IntegrationToken & {
  token: string;
};

export type IntegrationReceiveInput = {
  event?: unknown;
  type?: string;
  [key: string]: unknown;
};

export type IntegrationReceiveResponse = {
  status: "accepted";
};
