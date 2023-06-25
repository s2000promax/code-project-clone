import React from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Overlay } from '../../Overlay/ui/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { ANIMATION_DELAY } from '@/shared/const/common';
import { Portal } from '../../Portal/ui/Portal';
import cls from './ModalWindow.module.scss';

interface ModalWindowProps {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const ModalWindow = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
}: ModalWindowProps) => {
  const { theme } = useTheme();

  const { isClosing, isMounted, close } = useModal({
    animationDelay: ANIMATION_DELAY,
    isOpen,
    onClose,
  });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(cls.modalWindow, mods, [
          className,
          theme,
          'app_modal',
        ])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
