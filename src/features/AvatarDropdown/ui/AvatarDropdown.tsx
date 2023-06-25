import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/uiKit/Avatar/ui/Avatar';
import { DropDown } from '@/shared/uiKit/Popups';
import {
  getUserAuthData,
  isUserAdmin,
  isUserDesigner,
  userActions,
} from '@/entities/User';
import cls from './AvatarDropdown.module.scss';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/route';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isDesigner = useSelector(isUserDesigner);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isDesigner;

  if (!authData) {
    return null;
  }

  return (
    <DropDown
      className={classNames(cls.avatarDropdown, {}, [className])}
      direction="bottom left"
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t('AdminPanel'),
                href: getRouteAdmin(),
              },
            ]
          : []),
        {
          content: t('Profile'),
          href: getRouteProfile(authData.id),
        },
        {
          content: t('Logout'),
          onClick: onLogout,
        },
      ]}
      trigger={
        <Avatar
          fallbackInverted
          size={30}
          src={authData.avatar}
        />
      }
    />
  );
};
