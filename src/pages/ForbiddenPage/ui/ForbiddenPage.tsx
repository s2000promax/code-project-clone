import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

interface ForbiddenPageProps {
  className?: string;
}

export const ForbiddenPage = (props: ForbiddenPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return <Page>{t('You have no access this page')}</Page>;
};
