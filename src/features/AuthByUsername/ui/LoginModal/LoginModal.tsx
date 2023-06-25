import React, { Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ModalWindow } from '@/shared/uiKit/ModalWindow';
import { Loader } from '@/shared/uiKit/Loader';
import cls from './LoginModal.module.scss';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const { className, isOpen, onClose } = props;
  return (
    <ModalWindow
      className={classNames(cls.loginModal, {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </ModalWindow>
  );
};
