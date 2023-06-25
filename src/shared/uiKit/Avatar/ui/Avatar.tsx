import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../AppImage';
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Icon } from '../../Icon';
import { Skeleton } from '../../Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const { className, src, size = 100, alt, fallbackInverted } = props;
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size || 100,
      height: size || 100,
    }),
    [size],
  );

  const fallback = (
    <Skeleton
      width={size}
      height={size}
      border="50%"
    />
  );
  const errorFallback = (
    <Icon
      Svg={UserIcon}
      widths={size}
      height={size}
      inverted={fallbackInverted}
    />
  );

  return (
    <AppImage
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.avatar, mods, [className])}
      fallback={fallback}
      errorFallback={errorFallback}
    />
  );
};
