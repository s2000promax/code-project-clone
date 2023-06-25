import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardVariant } from '@/shared/uiKit/Card';
import { Text } from '@/shared/uiKit/Text';
import { Notification } from '../../model/types/notifications';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
  const { className, item } = props;

  const content = (
    <Card
      className={classNames(cls.notificationItem, {}, [className])}
      variant={CardVariant.OUTLINED}
    >
      <Text
        title={item.title}
        text={item.description}
      />
    </Card>
  );

  if (item.href) {
    return (
      <a
        className={cls.link}
        target="_blank"
        href={item.href}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
};
