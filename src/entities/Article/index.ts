export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export type { Article } from './model/types/article';
export {
  ArticleView,
  ArticleSortField,
  ArticleType,
} from './model/types/article';
export {
  articleDetailsReducer,
  articleDetailsActions,
} from './model/slice/articleDetailsSlice';

export { ArticleList } from './ui/ArticleList';

export { getArticleDetailsData } from './model/selectors/articleDetails';
