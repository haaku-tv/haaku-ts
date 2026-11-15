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

Deno.test("season endpoints build the correct requests", async (t) => {
  const cases: Array<{
    name: string;
    call: (haaku: Haaku) => Promise<unknown>;
    path: string;
    method?: string;
    body?: string;
  }> = [
    {
      name: "get",
      call: (h) => h.seasons.get(1, { extended: "full" }),
      path: "/v1/seasons/1?extended=full",
    },
    {
      name: "stats",
      call: (h) => h.seasons.stats(1),
      path: "/v1/seasons/1/stats",
    },
    {
      name: "ratings",
      call: (h) => h.seasons.ratings(1),
      path: "/v1/seasons/1/ratings",
    },
    {
      name: "report",
      call: (h) =>
        h.seasons.report(1, { reason: "incorrect", description: "wrong" }),
      path: "/v1/seasons/1/report",
      method: "POST",
      body: '{"reason":"incorrect","description":"wrong"}',
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
