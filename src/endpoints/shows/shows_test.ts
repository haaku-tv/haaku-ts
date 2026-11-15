import { assertEquals } from "@std/assert";
import { Haaku } from "../../../mod.ts";

type Call = {
  url: string;
  method: string;
  body?: string;
};

function createClient(body: unknown = [], status = 200) {
  const calls: Call[] = [];
  const fetchStub = ((input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({
      url: String(input),
      method: init?.method ?? "GET",
      body: typeof init?.body === "string" ? init.body : undefined,
    });
    const response = status === 204
      ? new Response(null, { status })
      : new Response(JSON.stringify(body), {
        status,
        headers: { "content-type": "application/json" },
      });
    return Promise.resolve(response);
  }) as typeof fetch;

  const haaku = new Haaku({
    baseUrl: "https://example.test",
    apiKey: "test",
    fetch: fetchStub,
  });

  return { haaku, calls };
}

type ShowCase = {
  name: string;
  call: (haaku: Haaku) => Promise<unknown>;
  path: string;
  method?: string;
  body?: string;
};

const cases: ShowCase[] = [
  {
    name: "get",
    call: (h) => h.shows.get(1, { idType: "tmdb", extended: "full" }),
    path: "/v1/shows/1?id_type=tmdb&extended=full",
  },
  {
    name: "aliases",
    call: (h) => h.shows.aliases(1, { idType: "tmdb" }),
    path: "/v1/shows/1/aliases?id_type=tmdb",
  },
  {
    name: "certifications",
    call: (h) => h.shows.certifications(1, { idType: "tmdb" }),
    path: "/v1/shows/1/certifications?id_type=tmdb",
  },
  {
    name: "comments",
    call: (h) =>
      h.shows.comments(1, "newest", {
        idType: "tmdb",
        page: 2,
        limit: 10,
      }),
    path: "/v1/shows/1/comments/newest?id_type=tmdb&page=2&limit=10",
  },
  {
    name: "last episode",
    call: (h) => h.shows.lastEpisode(1, { idType: "tmdb" }),
    path: "/v1/shows/1/last_episode?id_type=tmdb",
  },
  {
    name: "lists",
    call: (h) => h.shows.lists(1, { page: 1, limit: 25 }),
    path: "/v1/shows/1/lists?page=1&limit=25",
  },
  {
    name: "lists by type and sort",
    call: (h) => h.shows.listsByType(1, "personal", "popular", { page: 1 }),
    path: "/v1/shows/1/lists/personal/popular?page=1",
  },
  {
    name: "next episode",
    call: (h) => h.shows.nextEpisode(1, { idType: "tmdb" }),
    path: "/v1/shows/1/next_episode?id_type=tmdb",
  },
  {
    name: "people",
    call: (h) => h.shows.people(1, { idType: "tmdb" }),
    path: "/v1/shows/1/people?id_type=tmdb",
  },
  {
    name: "progress collection",
    call: (h) => h.shows.progressCollection(1, { idType: "tmdb" }),
    path: "/v1/shows/1/progress/collection?id_type=tmdb",
  },
  {
    name: "progress watched",
    call: (h) => h.shows.progressWatched(1, { idType: "tmdb" }),
    path: "/v1/shows/1/progress/watched?id_type=tmdb",
  },
  {
    name: "reset progress",
    call: (h) => h.shows.resetProgressWatched(1, { resetAt: "2026-11-01" }),
    path: "/v1/shows/1/progress/watched/reset",
    method: "POST",
    body: '{"reset_at":"2026-11-01"}',
  },
  {
    name: "undo reset progress",
    call: (h) => h.shows.undoResetProgressWatched(1),
    path: "/v1/shows/1/progress/watched/reset",
    method: "DELETE",
  },
  {
    name: "ratings",
    call: (h) => h.shows.ratings(1, { idType: "tmdb" }),
    path: "/v1/shows/1/ratings?id_type=tmdb",
  },
  {
    name: "refresh",
    call: (h) => h.shows.refresh(1),
    path: "/v1/shows/1/refresh/justwatch",
    method: "POST",
  },
  {
    name: "related",
    call: (h) => h.shows.related(1, { page: 1, limit: 5 }),
    path: "/v1/shows/1/related?page=1&limit=5",
  },
  {
    name: "report",
    call: (h) =>
      h.shows.report(1, { reason: "spam", description: "bad listing" }),
    path: "/v1/shows/1/report",
    method: "POST",
    body: '{"reason":"spam","description":"bad listing"}',
  },
  {
    name: "seasons",
    call: (h) => h.shows.seasons(1, { idType: "tmdb" }),
    path: "/v1/shows/1/seasons?id_type=tmdb",
  },
  {
    name: "season",
    call: (h) => h.shows.season(1, 2, { idType: "tmdb" }),
    path: "/v1/shows/1/seasons/2?id_type=tmdb",
  },
  {
    name: "season comments",
    call: (h) => h.shows.seasonComments(1, 2, "likes", { page: 1 }),
    path: "/v1/shows/1/seasons/2/comments/likes?page=1",
  },
  {
    name: "season episodes",
    call: (h) => h.shows.seasonEpisodes(1, 2, { page: 2, limit: 50 }),
    path: "/v1/shows/1/seasons/2/episodes?page=2&limit=50",
  },
  {
    name: "episode",
    call: (h) => h.shows.episode(1, 2, 3, { idType: "tmdb" }),
    path: "/v1/shows/1/seasons/2/episodes/3?id_type=tmdb",
  },
  {
    name: "episode comments",
    call: (h) => h.shows.episodeComments(1, 2, 3, "trending", { limit: 5 }),
    path: "/v1/shows/1/seasons/2/episodes/3/comments/trending?limit=5",
  },
  {
    name: "episode lists",
    call: (h) => h.shows.episodeLists(1, 2, 3, "movies", "added", { page: 1 }),
    path: "/v1/shows/1/seasons/2/episodes/3/lists/movies/added?page=1",
  },
  {
    name: "episode people",
    call: (h) => h.shows.episodePeople(1, 2, 3, { idType: "tmdb" }),
    path: "/v1/shows/1/seasons/2/episodes/3/people?id_type=tmdb",
  },
  {
    name: "episode ratings",
    call: (h) => h.shows.episodeRatings(1, 2, 3, { idType: "tmdb" }),
    path: "/v1/shows/1/seasons/2/episodes/3/ratings?id_type=tmdb",
  },
  {
    name: "episode report",
    call: (h) =>
      h.shows.episodeReport(1, 2, 3, {
        reason: "metadata",
        message: "wrong data",
      }),
    path: "/v1/shows/1/seasons/2/episodes/3/report",
    method: "POST",
    body: '{"reason":"metadata","message":"wrong data"}',
  },
  {
    name: "episode stats",
    call: (h) => h.shows.episodeStats(1, 2, 3, { idType: "tmdb" }),
    path: "/v1/shows/1/seasons/2/episodes/3/stats?id_type=tmdb",
  },
  {
    name: "episode translations",
    call: (h) =>
      h.shows.episodeTranslations(1, 2, 3, { idType: "tmdb", language: "en" }),
    path:
      "/v1/shows/1/seasons/2/episodes/3/translations?id_type=tmdb&language=en",
  },
  {
    name: "episode translation",
    call: (h) => h.shows.episodeTranslation(1, 2, 3, "en"),
    path: "/v1/shows/1/seasons/2/episodes/3/translations/en",
  },
  {
    name: "episode videos",
    call: (h) => h.shows.episodeVideos(1, 2, 3, { idType: "tmdb" }),
    path: "/v1/shows/1/seasons/2/episodes/3/videos?id_type=tmdb",
  },
  {
    name: "episode watching",
    call: (h) => h.shows.episodeWatching(1, 2, 3),
    path: "/v1/shows/1/seasons/2/episodes/3/watching",
  },
  {
    name: "episode watch now",
    call: (h) => h.shows.episodeWatchNow(1, 2, 3, "US"),
    path: "/v1/shows/1/seasons/2/episodes/3/watchnow/US",
  },
  {
    name: "season info",
    call: (h) => h.shows.seasonInfo(1, 2, { idType: "tmdb" }),
    path: "/v1/shows/1/seasons/2/info?id_type=tmdb",
  },
  {
    name: "season lists",
    call: (h) => h.shows.seasonLists(1, 2, "all", "likes"),
    path: "/v1/shows/1/seasons/2/lists/all/likes",
  },
  {
    name: "season people",
    call: (h) => h.shows.seasonPeople(1, 2),
    path: "/v1/shows/1/seasons/2/people",
  },
  {
    name: "season ratings",
    call: (h) => h.shows.seasonRatings(1, 2),
    path: "/v1/shows/1/seasons/2/ratings",
  },
  {
    name: "season report",
    call: (h) => h.shows.seasonReport(1, 2, { reason: "remove" }),
    path: "/v1/shows/1/seasons/2/report",
    method: "POST",
    body: '{"reason":"remove"}',
  },
  {
    name: "season stats",
    call: (h) => h.shows.seasonStats(1, 2),
    path: "/v1/shows/1/seasons/2/stats",
  },
  {
    name: "season translations",
    call: (h) =>
      h.shows.seasonTranslations(1, 2, { idType: "tmdb", language: "en" }),
    path: "/v1/shows/1/seasons/2/translations?id_type=tmdb&language=en",
  },
  {
    name: "season translation",
    call: (h) => h.shows.seasonTranslation(1, 2, "en"),
    path: "/v1/shows/1/seasons/2/translations/en",
  },
  {
    name: "season videos",
    call: (h) => h.shows.seasonVideos(1, 2),
    path: "/v1/shows/1/seasons/2/videos",
  },
  {
    name: "season watching",
    call: (h) => h.shows.seasonWatching(1, 2),
    path: "/v1/shows/1/seasons/2/watching",
  },
  {
    name: "stats",
    call: (h) => h.shows.stats(1),
    path: "/v1/shows/1/stats",
  },
  {
    name: "studios",
    call: (h) => h.shows.studios(1),
    path: "/v1/shows/1/studios",
  },
  {
    name: "translations",
    call: (h) => h.shows.translations(1, { language: "en" }),
    path: "/v1/shows/1/translations?language=en",
  },
  {
    name: "translation",
    call: (h) => h.shows.translation(1, "en"),
    path: "/v1/shows/1/translations/en",
  },
  {
    name: "videos",
    call: (h) => h.shows.videos(1),
    path: "/v1/shows/1/videos",
  },
  {
    name: "watch",
    call: (h) => h.shows.watch(1, { idType: "tmdb", country: "GB" }),
    path: "/v1/shows/1/watch?id_type=tmdb&country=GB",
  },
  {
    name: "watching",
    call: (h) => h.shows.watching(1),
    path: "/v1/shows/1/watching",
  },
  {
    name: "watch now",
    call: (h) => h.shows.watchNow(1, "US"),
    path: "/v1/shows/1/watchnow/US",
  },
  {
    name: "anticipated",
    call: (h) => h.shows.anticipated({ page: 1, limit: 20 }),
    path: "/v1/shows/anticipated?page=1&limit=20",
  },
  {
    name: "collected",
    call: (h) => h.shows.collected("weekly", { page: 1, limit: 25 }),
    path: "/v1/shows/collected/weekly?page=1&limit=25",
  },
  {
    name: "favorited",
    call: (h) => h.shows.favorited("monthly", { limit: 10 }),
    path: "/v1/shows/favorited/monthly?limit=10",
  },
  {
    name: "hot",
    call: (h) => h.shows.hot({ page: 1 }),
    path: "/v1/shows/hot?page=1",
  },
  {
    name: "played",
    call: (h) => h.shows.played("yearly"),
    path: "/v1/shows/played/yearly",
  },
  {
    name: "popular",
    call: (h) => h.shows.popular({ page: 1, limit: 20, extended: "full" }),
    path: "/v1/shows/popular?page=1&limit=20&extended=full",
  },
  {
    name: "recommendations",
    call: (h) => h.shows.recommendations(1, { page: 1, limit: 10 }),
    path: "/v1/shows/recommendations/1?page=1&limit=10",
  },
  {
    name: "streaming",
    call: (h) => h.shows.streaming("daily", { page: 1, limit: 20 }),
    path: "/v1/shows/streaming/daily?page=1&limit=20",
  },
  {
    name: "trending",
    call: (h) => h.shows.trending({ page: 1, limit: 20 }),
    path: "/v1/shows/trending?page=1&limit=20",
  },
  {
    name: "updates",
    call: (h) =>
      h.shows.updates("2026-11-01", {
        page: 1,
        limit: 25,
        extended: "min",
      }),
    path: "/v1/shows/updates/2026-11-01?page=1&limit=25&extended=min",
  },
  {
    name: "updated ids",
    call: (h) => h.shows.updatedIds("2026-11-01", { page: 2, limit: 10 }),
    path: "/v1/shows/updates/id/2026-11-01?page=2&limit=10",
  },
  {
    name: "watched",
    call: (h) => h.shows.watched("all", { page: 1, limit: 25 }),
    path: "/v1/shows/watched/all?page=1&limit=25",
  },
];

Deno.test("show endpoints build the correct requests", async (t) => {
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

Deno.test("show endpoints return undefined for 204 responses", async () => {
  const { haaku } = createClient(null, 204);
  assertEquals(await haaku.shows.nextEpisode(1), undefined);
  assertEquals(await haaku.shows.undoResetProgressWatched(1), undefined);
});

Deno.test("show ids are URL-encoded and reset dates accept Date values", async () => {
  const { haaku, calls } = createClient();
  await haaku.shows.get("the office");

  assertEquals(
    calls[0].url,
    "https://example.test/v1/shows/the%20office",
  );

  await haaku.shows.resetProgressWatched(1, {
    resetAt: new Date(Date.UTC(2026, 10, 25)),
  });

  assertEquals(
    calls[1].body,
    '{"reset_at":"2026-11-25T00:00:00.000Z"}',
  );
});
