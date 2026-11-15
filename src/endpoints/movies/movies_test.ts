import { assertEquals } from "@std/assert";
import { Haaku } from "../../../mod.ts";

type RecordedCall = {
  url: string;
  method: string;
  body?: string;
};

function createClient(body: unknown = []) {
  const calls: RecordedCall[] = [];
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

type MovieCase = {
  name: string;
  call: (haaku: Haaku) => Promise<unknown>;
  path: string;
  method?: string;
  body?: string;
};

const cases: MovieCase[] = [
  {
    name: "get",
    call: (h) => h.movies.get(550, { idType: "tmdb", extended: "full" }),
    path: "/v1/movies/550?id_type=tmdb&extended=full",
  },
  {
    name: "aliases",
    call: (h) => h.movies.aliases("heat", { idType: "imdb" }),
    path: "/v1/movies/heat/aliases?id_type=imdb",
  },
  {
    name: "comments",
    call: (h) =>
      h.movies.comments(550, "newest", {
        idType: "tmdb",
        page: 2,
        limit: 10,
      }),
    path: "/v1/movies/550/comments/newest?id_type=tmdb&page=2&limit=10",
  },
  {
    name: "lists",
    call: (h) => h.movies.lists(550, { page: 1, limit: 25 }),
    path: "/v1/movies/550/lists?page=1&limit=25",
  },
  {
    name: "lists by type and sort",
    call: (h) => h.movies.listsByType(550, "personal", "popular", { page: 1 }),
    path: "/v1/movies/550/lists/personal/popular?page=1",
  },
  {
    name: "people",
    call: (h) => h.movies.people(550, { idType: "tmdb" }),
    path: "/v1/movies/550/people?id_type=tmdb",
  },
  {
    name: "ratings",
    call: (h) => h.movies.ratings(550),
    path: "/v1/movies/550/ratings",
  },
  {
    name: "refresh",
    call: (h) => h.movies.refresh(550),
    path: "/v1/movies/550/refresh/justwatch",
    method: "POST",
  },
  {
    name: "related",
    call: (h) => h.movies.related(550, { page: 1, limit: 5 }),
    path: "/v1/movies/550/related?page=1&limit=5",
  },
  {
    name: "releases",
    call: (h) => h.movies.releases(550, "US", { idType: "tmdb" }),
    path: "/v1/movies/550/releases/US?id_type=tmdb",
  },
  {
    name: "report",
    call: (h) =>
      h.movies.report(550, { reason: "spam", description: "bad listing" }),
    path: "/v1/movies/550/report",
    method: "POST",
    body: '{"reason":"spam","description":"bad listing"}',
  },
  {
    name: "stats",
    call: (h) => h.movies.stats(550),
    path: "/v1/movies/550/stats",
  },
  {
    name: "studios",
    call: (h) => h.movies.studios(550),
    path: "/v1/movies/550/studios",
  },
  {
    name: "translations",
    call: (h) => h.movies.translations(550, { idType: "tmdb", language: "en" }),
    path: "/v1/movies/550/translations?id_type=tmdb&language=en",
  },
  {
    name: "translation",
    call: (h) => h.movies.translation(550, "en", { idType: "tmdb" }),
    path: "/v1/movies/550/translations/en?id_type=tmdb",
  },
  {
    name: "videos",
    call: (h) => h.movies.videos(550),
    path: "/v1/movies/550/videos",
  },
  {
    name: "watch",
    call: (h) => h.movies.watch(550, { idType: "tmdb", country: "GB" }),
    path: "/v1/movies/550/watch?id_type=tmdb&country=GB",
  },
  {
    name: "watching",
    call: (h) => h.movies.watching(550),
    path: "/v1/movies/550/watching",
  },
  {
    name: "watch now",
    call: (h) => h.movies.watchNow(550, "US", { idType: "tmdb" }),
    path: "/v1/movies/550/watchnow/US?id_type=tmdb",
  },
  {
    name: "justwatch links",
    call: (h) => h.movies.justWatchLinks(550, "US"),
    path: "/v1/movies/550/watchnow/justwatch_links/US",
  },
  {
    name: "anticipated",
    call: (h) => h.movies.anticipated({ page: 1, limit: 20 }),
    path: "/v1/movies/anticipated?page=1&limit=20",
  },
  {
    name: "collected",
    call: (h) => h.movies.collected("weekly", { page: 1, limit: 25 }),
    path: "/v1/movies/collected/weekly?page=1&limit=25",
  },
  {
    name: "favorited",
    call: (h) => h.movies.favorited("monthly", { limit: 10 }),
    path: "/v1/movies/favorited/monthly?limit=10",
  },
  {
    name: "hot",
    call: (h) => h.movies.hot({ page: 1 }),
    path: "/v1/movies/hot?page=1",
  },
  {
    name: "played",
    call: (h) => h.movies.played("yearly"),
    path: "/v1/movies/played/yearly",
  },
  {
    name: "popular",
    call: (h) => h.movies.popular({ page: 1, limit: 20, extended: "full" }),
    path: "/v1/movies/popular?page=1&limit=20&extended=full",
  },
  {
    name: "recommendations",
    call: (h) => h.movies.recommendations(550, { page: 1, limit: 10 }),
    path: "/v1/movies/recommendations/550?page=1&limit=10",
  },
  {
    name: "streaming",
    call: (h) => h.movies.streaming("daily", { page: 1, limit: 20 }),
    path: "/v1/movies/streaming/daily?page=1&limit=20",
  },
  {
    name: "trending",
    call: (h) => h.movies.trending({ page: 1, limit: 20 }),
    path: "/v1/movies/trending?page=1&limit=20",
  },
  {
    name: "updates",
    call: (h) =>
      h.movies.updates("2026-11-01", {
        page: 1,
        limit: 25,
        extended: "min",
      }),
    path: "/v1/movies/updates/2026-11-01?page=1&limit=25&extended=min",
  },
  {
    name: "updated ids",
    call: (h) => h.movies.updatedIds("2026-11-01", { page: 2, limit: 10 }),
    path: "/v1/movies/updates/id/2026-11-01?page=2&limit=10",
  },
  {
    name: "watched",
    call: (h) => h.movies.watched("all", { page: 1, limit: 25 }),
    path: "/v1/movies/watched/all?page=1&limit=25",
  },
];

Deno.test("movie endpoints build the correct requests", async (t) => {
  for (const testCase of cases) {
    await t.step(testCase.name, async () => {
      const { haaku, calls } = createClient();
      await testCase.call(haaku);

      assertEquals(calls.length, 1);
      assertEquals(calls[0].url, `https://example.test${testCase.path}`);
      assertEquals(calls[0].method, testCase.method ?? "GET");
      assertEquals(calls[0].body, testCase.body);
    });
  }
});

Deno.test("movie ids are URL-encoded", async () => {
  const { haaku, calls } = createClient();
  await haaku.movies.get("the matrix");
  assertEquals(
    calls[0].url,
    "https://example.test/v1/movies/the%20matrix",
  );
});

Deno.test("movie update dates accept Date values", async () => {
  const { haaku, calls } = createClient();
  await haaku.movies.updates(new Date(2026, 10, 25));
  assertEquals(
    calls[0].url,
    "https://example.test/v1/movies/updates/2026-11-25",
  );
});
