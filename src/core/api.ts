import { ErrorEnvelope, HTTPMethods, SimpleObject, RequestOptions } from "../types/api.ts";
import { HaakuConfig } from "../types/class.ts";
import { isRecord, objectToParameters } from "../utils/utils.ts";

const createApi = (config: HaakuConfig) => {
  const baseFetch = async <T>(
    method: HTTPMethods,
    path: string,
    params?: SimpleObject | string,
    body?: Record<string, any>,
    headers?: Record<string, any>,
  ): Promise<T> => {
    if (isRecord(params)) {
      params = objectToParameters(params);
    }

    const response = await config.fetch(
      `${config.baseUrl}${path}${params ?? ""}`,
      {
        method,
        headers: {
          "X-API-Key": `${config.apiKey}`,
          "Content-Type": "application/json",
          ...headers,
        },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      },
    );

    if (!response.ok) {
      throw await response.json() as ErrorEnvelope;
    }

    return await response.json();
  };

  return {
    get: <T>(path: string, opts: RequestOptions = {}) =>
      baseFetch<T>("GET", path, opts.params, undefined, opts.headers),
    post: <T>(path: string, opts: RequestOptions = {}) =>
      baseFetch<T>("POST", path, opts.params, opts.body, opts.headers),
    put: <T>(path: string, opts: RequestOptions = {}) =>
      baseFetch<T>("PUT", path, opts.params, opts.body, opts.headers),
    patch: <T>(path: string, opts: RequestOptions = {}) =>
      baseFetch<T>("PATCH", path, opts.params, opts.body, opts.headers),
    delete: <T>(path: string, opts: RequestOptions = {}) =>
      baseFetch<T>("DELETE", path, opts.params, opts.body, opts.headers),
  };
};

export type ApiClient = ReturnType<typeof createApi>;

export class Api {
  private readonly client: ApiClient;

  constructor(config: HaakuConfig) {
    this.client = createApi(config);
  }

  get<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    return this.client.get<T>(path, opts);
  }

  post<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    return this.client.post<T>(path, opts);
  }

  put<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    return this.client.put<T>(path, opts);
  }

  patch<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    return this.client.patch<T>(path, opts);
  }

  delete<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    return this.client.delete<T>(path, opts);
  }
}