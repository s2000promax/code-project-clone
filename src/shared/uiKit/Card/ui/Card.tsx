import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardVariant {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  max?: boolean;
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    variant = CardVariant.NORMAL,
    max,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(cls.card, { [cls.max]: max }, [
        className,
        cls[variant],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
