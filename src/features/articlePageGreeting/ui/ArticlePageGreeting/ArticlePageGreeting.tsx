import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { ModalWindow } from '@/shared/uiKit/ModalWindow';
import { Text } from '@/shared/uiKit/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/uiKit/Drawer';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlesPageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
    }
  }, [dispatch, isArticlesPageWasOpened]);

  const onClose = () => setIsOpen(false);

  const text = (
    <Text
      title={t('Welcome to Articles Page')}
      text={t('Here you can search and view articles on various topics')}
    />
  );

  if (isMobile) {
    return (
      <Drawer
        lazy
        isOpen={isOpen}
        onClose={onClose}
      >
        {text}
      </Drawer>
    );
  }

  return (
    <ModalWindow
      lazy
      isOpen={isOpen}
      onClose={onClose}
    >
      {text}
    </ModalWindow>
  );
});
