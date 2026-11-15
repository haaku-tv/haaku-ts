import type {
  ErrorEnvelope,
  HTTPMethods,
  RequestOptions,
  SimpleObject,
} from "../types/api.ts";
import type { HaakuConfig } from "../types/class.ts";
import { isRecord, objectToParameters } from "../utils/utils.ts";

export type ApiClient = {
  get<T>(path: string, opts?: RequestOptions): Promise<T>;
  post<T>(path: string, opts?: RequestOptions): Promise<T>;
  put<T>(path: string, opts?: RequestOptions): Promise<T>;
  patch<T>(path: string, opts?: RequestOptions): Promise<T>;
  delete<T>(path: string, opts?: RequestOptions): Promise<T>;
};

const createApi = (config: HaakuConfig): ApiClient => {
  const baseFetch = async <T>(
    method: HTTPMethods,
    path: string,
    params?: SimpleObject | string,
    body?: Record<string, unknown>,
    headers?: Record<string, string>,
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

    if (response.status === 204) {
      return undefined as T;
    }

    const text = await response.text();
    return (text.length > 0 ? JSON.parse(text) : undefined) as T;
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
