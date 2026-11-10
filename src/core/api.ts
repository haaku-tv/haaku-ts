import { SimpleObject } from "../types/api.ts";
import { HaakuConfig } from "../types/class.ts";
import { isRecord, objectToParameters } from "../utils/utils.ts";

export class Api {
  private readonly config: HaakuConfig;

  constructor(config: HaakuConfig) {
    this.config = config;
  }

  async get<T>(
    path: string,
    params: SimpleObject | string | undefined,
    body: Record<string, any>,
    headers: Record<string, any> | undefined,
  ): Promise<T> {
    if (isRecord(params)) {
      params = objectToParameters(params);
    }

    const response = await this.config.fetch(
      `${this.config.baseUrl}${path}${params}`,
      {
        method: "GET",
        headers: {
          "X-API-Key": `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok || !response) {
      throw new Error("Error");
    }

    return await response.json();
  }

  async post<T>(
    path: string,
    params: SimpleObject | string | undefined,
    body: Record<string, any>,
    headers: Record<string, any> | undefined,
  ): Promise<T> {
    if (isRecord(params)) {
      params = objectToParameters(params);
    }

    const response = await this.config.fetch(
      `${this.config.baseUrl}${path}${params}`,
      {
        method: "POST",
        headers: {
          "X-API-Key": `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok || !response) {
      throw new Error("Error");
    }

    return await response.json();
  }
  async put<T>(
    path: string,
    params: SimpleObject | string | undefined,
    body: Record<string, any>,
    headers: Record<string, any> | undefined,
  ): Promise<T> {
    if (isRecord(params)) {
      params = objectToParameters(params);
    }

    const response = await this.config.fetch(
      `${this.config.baseUrl}${path}${params}`,
      {
        method: "PUT",
        headers: {
          "X-API-Key": `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok || !response) {
      throw new Error("Error");
    }

    return await response.json();
  }
  async patch<T>(
    path: string,
    params: SimpleObject | string | undefined,
    body: Record<string, any>,
    headers: Record<string, any> | undefined,
  ): Promise<T> {
    if (isRecord(params)) {
      params = objectToParameters(params);
    }

    const response = await this.config.fetch(
      `${this.config.baseUrl}${path}${params}`,
      {
        method: "PATCH",
        headers: {
          "X-API-Key": `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok || !response) {
      throw new Error("Error");
    }

    return await response.json();
  }
  async delete<T>(
    path: string,
    params: SimpleObject | string | undefined,
    body: Record<string, any>,
    headers: Record<string, any> | undefined,
  ): Promise<T> {
    if (isRecord(params)) {
      params = objectToParameters(params);
    }

    const response = await this.config.fetch(
      `${this.config.baseUrl}${path}${params}`,
      {
        method: "DELETE",
        headers: {
          "X-API-Key": `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok || !response) {
      throw new Error("Error");
    }

    return await response.json();
  }
}
