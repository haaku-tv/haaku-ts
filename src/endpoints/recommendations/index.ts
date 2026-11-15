import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  PersonalizedRecommendationPage,
  RecommendationMovie,
  RecommendationPage,
  RecommendationQuery,
  RecommendationShow,
  SocialRecommendationMovie,
  SocialRecommendationQuery,
  SocialRecommendationShow,
} from "../../types/endpoints/recommendations.ts";
import { compactQuery } from "../../utils/query.ts";

const segment = (value: number): string => encodeURIComponent(String(value));

export class RecommendationEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  movies(
    input: RecommendationQuery = {},
  ): Promise<PersonalizedRecommendationPage<RecommendationMovie>> {
    return this.api.get("/v1/recommendations/movies", {
      params: compactQuery({
        genre: input.genre,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  dismissMovie(id: number): Promise<void> {
    return this.api.delete(`/v1/recommendations/movies/${segment(id)}`);
  }

  shows(
    input: RecommendationQuery = {},
  ): Promise<PersonalizedRecommendationPage<RecommendationShow>> {
    return this.api.get("/v1/recommendations/shows", {
      params: compactQuery({
        genre: input.genre,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  dismissShow(id: number): Promise<void> {
    return this.api.delete(`/v1/recommendations/shows/${segment(id)}`);
  }

  socialMovies(
    input: SocialRecommendationQuery = {},
  ): Promise<RecommendationPage<SocialRecommendationMovie>> {
    return this.api.get("/v1/social_recommendations/movies", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  socialShows(
    input: SocialRecommendationQuery = {},
  ): Promise<RecommendationPage<SocialRecommendationShow>> {
    return this.api.get("/v1/social_recommendations/shows", {
      params: compactQuery({
        page: input.page,
        limit: input.limit,
      }),
    });
  }
}
