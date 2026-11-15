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

Deno.test("episode endpoints build the correct requests", async (t) => {
  const cases: Array<{
    name: string;
    call: (haaku: Haaku) => Promise<unknown>;
    path: string;
    method?: string;
    body?: string;
  }> = [
    {
      name: "get",
      call: (h) => h.episodes.get(1, { extended: "full" }),
      path: "/v1/episodes/1?extended=full",
    },
    {
      name: "stats",
      call: (h) => h.episodes.stats(1),
      path: "/v1/episodes/1/stats",
    },
    {
      name: "ratings",
      call: (h) => h.episodes.ratings(1),
      path: "/v1/episodes/1/ratings",
    },
    {
      name: "comments",
      call: (h) => h.episodes.comments(1, { page: 2, limit: 10 }),
      path: "/v1/episodes/1/comments?page=2&limit=10",
    },
    {
      name: "lists",
      call: (h) => h.episodes.lists(1, { page: 1, limit: 25 }),
      path: "/v1/episodes/1/lists?page=1&limit=25",
    },
    {
      name: "report",
      call: (h) => h.episodes.report(1, { reason: "spam", description: "bad" }),
      path: "/v1/episodes/1/report",
      method: "POST",
      body: '{"reason":"spam","description":"bad"}',
    },
    {
      name: "watch now",
      call: (h) => h.episodes.watchNow(1, "US"),
      path: "/v1/episodes/1/watchnow/US",
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
