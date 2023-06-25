import React, { memo, Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { Text, TextSize } from '@/shared/uiKit/Text';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/uiKit/Stack';
import { Loader } from '@/shared/uiKit/Loader';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo(
  (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useDispatch();

    const onSendComment = useCallback(
      (text: string) => {
        // @ts-ignore
        dispatch(addCommentForArticle(text));
      },
      [dispatch],
    );

    useInitialEffect(() => {
      // @ts-ignore
      dispatch(fetchCommentsByArticleId(id));
    });

    return (
      <VStack
        gap="16"
        max
        className={classNames('', {}, [className])}
      >
        <Text
          size={TextSize.L}
          title={t('Comments')}
        />
        <Suspense fallback={<Loader />}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>
        <CommentList
          isLoading={commentsIsLoading}
          comments={comments}
        />
      </VStack>
    );
  },
);
