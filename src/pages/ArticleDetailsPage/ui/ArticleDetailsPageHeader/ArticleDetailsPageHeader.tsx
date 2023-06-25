import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, VariantButton } from '@/shared/uiKit/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/uiKit/Stack';
import { getCanEditArticle } from '../../model/selectors/article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/route';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      navigate(getRouteArticleEdit(article!.id));
    }, [article, navigate]);

    return (
      <HStack
        justify="between"
        max
        className={classNames('', {}, [className])}
      >
        <Button
          variant={VariantButton.OUTLINE}
          onClick={onBackToList}
        >
          {t('Back to list')}
        </Button>
        {canEdit && (
          <Button
            variant={VariantButton.OUTLINE}
            onClick={onEditArticle}
          >
            {t('Edit')}
          </Button>
        )}
      </HStack>
    );
  },
);
