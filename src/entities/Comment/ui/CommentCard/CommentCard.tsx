import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/uiKit/Avatar/ui/Avatar';
import { Text } from '@/shared/uiKit/Text';
import { Skeleton } from '@/shared/uiKit/Skeleton/ui/Skeleton';
import { AppLink } from '@/shared/uiKit/AppLink/ui/AppLink';
import { VStack } from '@/shared/uiKit/Stack';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/const/route';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.commentCard, {}, [className, cls.loading])}
      >
        <div className={cls.header}>
          <Skeleton
            width={30}
            height={30}
            border="50%"
          />
          <Skeleton
            height={16}
            width={100}
            className={cls.username}
          />
        </div>
        <Skeleton
          className={cls.text}
          width="100%"
          height={50}
        />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }
  return (
    <VStack
      gap="8"
      max
      className={classNames(cls.commentCard, {}, [className])}
    >
      <AppLink
        className={cls.header}
        to={getRouteProfile(comment.user.id)}
      >
        {comment.user.avatar ? (
          <Avatar
            size={30}
            src={comment.user.avatar}
          />
        ) : null}
        <Text
          className={cls.username}
          title={comment.user.username}
        />
      </AppLink>
      <Text
        className={cls.text}
        text={comment.text}
      />
    </VStack>
  );
});
