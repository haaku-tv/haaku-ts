export type RecommendationMovie = {
  id: number;
  tmdb_id: number;
  title: string;
  overview?: string;
  popularity: number;
  genres: string[];
  released?: string;
  runtime?: number;
  rating_avg: number;
  poster?: string;
};

export type RecommendationShow = {
  id: number;
  tmdb_id: number;
  title: string;
  overview?: string;
  popularity: number;
  genres: string[];
  first_aired?: string;
  status?: string;
  episode_count: number;
  rating_avg: number;
  poster?: string;
};

export type SocialRecommendationMovie = {
  id: number;
  tmdb_id: number;
  title: string;
  overview?: string;
  popularity: number;
  genres: string[];
  released?: string;
  friend_count: number;
  rating_avg: number;
  poster?: string;
};

export type SocialRecommendationShow = {
  id: number;
  tmdb_id: number;
  title: string;
  overview?: string;
  popularity: number;
  genres: string[];
  first_aired?: string;
  status?: string;
  friend_count: number;
  rating_avg: number;
  poster?: string;
};

export type RecommendationQuery = {
  genre?: string;
  page?: number;
  limit?: number;
};

export type SocialRecommendationQuery = {
  page?: number;
  limit?: number;
};

export type RecommendationPage<T> = {
  items: T[];
  page: number;
  limit: number;
  row_count: number;
};

export type PersonalizedRecommendationPage<T> = RecommendationPage<T> & {
  personalised: boolean;
};
