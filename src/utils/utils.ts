import type { SimpleObject } from "../types/api.ts";

export function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}

export function objectToParameters(params: SimpleObject): string {
  const stringifiedParams = Object.fromEntries(
    Object.entries(params).map(([key, val]) => [key, String(val)]),
  );

  return `?${new URLSearchParams(stringifiedParams).toString()}`;
}
