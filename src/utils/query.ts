import type { SimpleObject } from "../types/api.ts";

export function compactQuery(
  params: Record<string, string | number | boolean | string[] | undefined>,
): SimpleObject | undefined {
  const query: SimpleObject = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue;
    }

    query[key] = Array.isArray(value) ? value.join(",") : value;
  }

  return Object.keys(query).length > 0 ? query : undefined;
}
