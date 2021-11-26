import React, { FC, HTMLProps, ReactNode, useMemo } from 'react';
import cx from 'classnames';

import './index.css';
import { Icon, IconSize } from '@elonwu/web-icon';
import loadingIcon from './assets/loading.svg';

// 按钮变种
export const ButtonVariants = ['fill', 'outline', 'ghost'];
export type ButtonVariant = typeof ButtonVariants[number];

// 样式类型
export const ButtonTypes = ['primary', 'danger', 'info', 'warn', 'success'];
export type ButtonType = typeof ButtonTypes[number];

// 大小
export const ButtonSizes = ['xs', 'sm', 'md', 'lg'];
export type ButtonSize = typeof ButtonSizes[number];

export interface ButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  variant?: ButtonVariant;
  type?: ButtonType;
  size?: ButtonSize;

  loading?: boolean;
  wide?: boolean;
  block?: boolean;
  square?: boolean; // 相同 padding
  round?: boolean;
  icon?: string | ReactNode;
}

export const Button: FC<ButtonProps> = ({
  disabled,
  loading,
  wide,
  block,
  square,
  round,
  icon,
  children,
  className = '',
  variant = 'fill',
  type = 'primary',
  size = 'md',
  ...props
}) => {
  const cls = useMemo(() => {
    return cx(
      {
        'btn-loading': loading,
        'btn-wide': wide,
        'btn-block': block,
        'btn-square': square,
        'btn-round': round,
        [`btn-${variant}`]: variant && ButtonVariants.includes(variant),
        [`btn-${type}`]: type && ButtonTypes.includes(type),
        [`btn-${size}`]: size && ButtonSizes.includes(size),
      },
      className,
    );
  }, [className, loading, type, size, wide, block, square, round, variant]);

  const iconDom = useMemo(() => {
    return loading ? (
      <Icon
        className="animate-spin"
        src={loadingIcon}
        size={size as IconSize}
      />
    ) : typeof icon === 'string' ? (
      <Icon src={icon} size={size as IconSize} />
    ) : (
      icon
    );
  }, [loading, icon, size]);

  return (
    <button disabled={disabled || loading} className={`btn ${cls}`} {...props}>
      {iconDom}
      {loading ? null : children}
    </button>
  );
};
