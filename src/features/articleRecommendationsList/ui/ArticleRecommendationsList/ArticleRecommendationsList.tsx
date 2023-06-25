import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/uiKit/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/uiKit/Stack';
import { useArticleRecommendations } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { isLoading, data: articles, error } = useArticleRecommendations(3);

    if (isLoading || error || !articles) {
      return null;
    }

    return (
      <VStack
        gap="8"
        className={classNames('', {}, [className])}
      >
        <Text
          size={TextSize.L}
          title={t('Recommendations')}
        />
        <ArticleList
          articles={articles}
          target="_blank"
          virtualized={false}
        />
      </VStack>
    );
  },
);
