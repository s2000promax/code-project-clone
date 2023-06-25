import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './UserPage.module.scss';

interface UserPageProps {
  className?: string;
}

export const UserPage = memo((props: UserPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return <div className={classNames(cls.UserPage, {}, [className])} />;
});
