import { lazy, Suspense } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/uiKit/Skeleton/ui/Skeleton';

const ArticleRatingLazy = lazy(async () => await import('./ArticleRating'));
export const ArticleRatingAsync = (props: ArticleRatingProps) => (
  <Suspense
    fallback={
      <Skeleton
        width="100%"
        height={120}
      />
    }
  >
    <ArticleRatingLazy {...props} />
  </Suspense>
);
