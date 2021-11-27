import React, { FC, HTMLProps, ReactNode, useMemo } from 'react';
import cx from 'classnames';

import './index.css';
import { Icon, IconSize } from '@elonwu/web-icon';

// 按钮变种
export const TagVariants = ['fill', 'outline'];
export type TagVariant = typeof TagVariants[number];

// 样式类型
export const TagTypes = ['primary', 'danger', 'info', 'warn', 'success'];
export type TagType = typeof TagTypes[number];

// 大小
export const TagSizes = ['dot', 'sm', 'md', 'lg'];
export type TagSize = typeof TagSizes[number];

export interface TagProps extends Omit<HTMLProps<HTMLSpanElement>, 'size'> {
  variant?: TagVariant;
  type?: TagType;
  size?: TagSize;
  icon?: string | ReactNode;
}

export const Tag: FC<TagProps> = ({
  icon,
  children,
  className = '',
  type = 'info',
  size = 'md',
  variant = 'fill',
  ...props
}) => {
  const cls = useMemo(() => {
    return cx(
      {
        [`tag-${variant}`]: variant && TagVariants.includes(variant),
        [`tag-${type}`]: type && TagTypes.includes(type),
        [`tag-${size}`]: size && TagSizes.includes(size),
        [`rounded-full`]: !className?.includes('rounded'),
      },
      className,
    );
  }, [className, type, size, variant]);

  const iconDom = useMemo(() => {
    return typeof icon === 'string' ? (
      <Icon src={icon} size={size as IconSize} />
    ) : (
      icon
    );
  }, [icon, size]);

  const notDot = useMemo(() => size !== 'dot', [size]);

  return (
    <span className={`tag ${cls}`} {...props}>
      {notDot ? (
        <>
          {iconDom}
          {children}
        </>
      ) : null}
    </span>
  );
};
