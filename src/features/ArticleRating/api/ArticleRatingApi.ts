import { rtkApi } from '@/shared/api/rtkApi';
import type { Rating } from '@/entities/Rating';

interface GetArticleRatingArg {
  userId: string;
  articleId: string;
}

interface RateArticleRatingArg extends GetArticleRatingArg {
  rate: number;
  feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      query: ({ userId, articleId }) => ({
        url: '/article-ratings',
        params: {
          userId,
          articleId,
        },
      }),
    }),
    rateArticleRating: build.mutation<void, RateArticleRatingArg>({
      query: (arg) => ({
        url: '/article-ratings',
        method: 'POST',
        body: arg,
      }),
    }),
  }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticleRating =
  articleRatingApi.useRateArticleRatingMutation;
