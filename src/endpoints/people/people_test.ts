import { assertEquals } from "@std/assert";
import { Haaku } from "../../../mod.ts";

function createClient(body: unknown = []) {
  const calls: Array<{ url: string; method: string; body?: string }> = [];
  const fetchStub = ((input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({
      url: String(input),
      method: init?.method ?? "GET",
      body: typeof init?.body === "string" ? init.body : undefined,
    });
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
  }) as typeof fetch;

  const haaku = new Haaku({
    baseUrl: "https://example.test",
    apiKey: "test",
    fetch: fetchStub,
  });

  return { haaku, calls };
}

Deno.test("person endpoints build the correct requests", async (t) => {
  const cases: Array<{
    name: string;
    call: (haaku: Haaku) => Promise<unknown>;
    path: string;
    method?: string;
    body?: string;
  }> = [
    {
      name: "get",
      call: (h) => h.people.get(3894, { idType: "tmdb" }),
      path: "/v1/people/3894?id_type=tmdb",
    },
    {
      name: "credits",
      call: (h) => h.people.credits(3894, { idType: "tmdb" }),
      path: "/v1/people/3894/credits?id_type=tmdb",
    },
    {
      name: "movies",
      call: (h) => h.people.movies(3894, { idType: "tmdb" }),
      path: "/v1/people/3894/movies?id_type=tmdb",
    },
    {
      name: "shows",
      call: (h) => h.people.shows(3894),
      path: "/v1/people/3894/shows",
    },
    {
      name: "lists",
      call: (h) =>
        h.people.lists(3894, "personal", "popular", { page: 1, limit: 25 }),
      path: "/v1/people/3894/lists/personal/popular?page=1&limit=25",
    },
    {
      name: "report",
      call: (h) => h.people.report(3894, { reason: "metadata" }),
      path: "/v1/people/3894/report",
      method: "POST",
      body: '{"reason":"metadata"}',
    },
    {
      name: "updates",
      call: (h) => h.people.updates("2026-11-01", { page: 1, limit: 25 }),
      path: "/v1/people/updates/2026-11-01?page=1&limit=25",
    },
    {
      name: "updated ids",
      call: (h) => h.people.updatedIds("2026-11-01", { page: 2, limit: 10 }),
      path: "/v1/people/updates/id/2026-11-01?page=2&limit=10",
    },
  ];

  for (const testCase of cases) {
    await t.step(testCase.name, async () => {
      const { haaku, calls } = createClient();
      await testCase.call(haaku);

      assertEquals(calls[0].url, `https://example.test${testCase.path}`);
      assertEquals(calls[0].method, testCase.method ?? "GET");
      assertEquals(calls[0].body, testCase.body);
    });
  }
});

Deno.test("person ids are URL-encoded", async () => {
  const { haaku, calls } = createClient();
  await haaku.people.get("some person");
  assertEquals(
    calls[0].url,
    "https://example.test/v1/people/some%20person",
  );
});
