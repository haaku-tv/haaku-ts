export type SimpleObject = Record<string, string | number | boolean>;

export type ErrorEnvelope = {
  code: string;
  message: string;
};

export type HTTPMethods =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

export type RequestOptions = {
  params?: SimpleObject | string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
};
