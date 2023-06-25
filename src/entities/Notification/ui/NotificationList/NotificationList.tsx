import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/uiKit/Stack';
import { Skeleton } from '@/shared/uiKit/Skeleton/ui/Skeleton';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

import cls from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = (props: NotificationListProps) => {
  const { className } = props;
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.notificationList, {}, [className])}
      >
        <Skeleton
          width="100%"
          border="8px"
          height="80px"
        />
        <Skeleton
          width="100%"
          border="8px"
          height="80px"
        />
        <Skeleton
          width="100%"
          border="8px"
          height="80px"
        />
      </VStack>
    );
  }

  return (
    <VStack
      className={classNames(cls.notificationList, {}, [className])}
      gap="16"
      max
    >
      {data?.map((item) => (
        <NotificationItem
          key={item.id}
          item={item}
        />
      ))}
    </VStack>
  );
};
