import React, { FC, HTMLProps, useMemo } from 'react';
import cx from 'classnames';

import './index.css';

// 按钮变种
export const BoxVariants = ['fill', 'outline'];
export type BoxVariant = typeof BoxVariants[number];

// 样式类型
export const BoxTypes = ['primary', 'danger', 'info', 'warn', 'success'];
export type BoxType = typeof BoxTypes[number];

// 大小
export const BoxSizes = ['xs', 'sm', 'md', 'lg', 'xs'];
export type BoxSize = typeof BoxSizes[number];

export interface BoxProps extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  rounded?: boolean;
  border?: boolean;
  shadow?: boolean;
  block?: boolean;
  full?: boolean;
  screen?: boolean;
  size?: BoxSize;
}

export const Box: FC<BoxProps> = ({
  shadow,
  full,
  screen,
  children,
  className = '',
  size = 'md',
  rounded = true,
  border = true,
  block = true,
  ...props
}) => {
  const cls = useMemo(() => {
    return cx(
      {
        'box-block': block,
        'box-full': full,
        'box-screen': screen,
        'box-border': border,
        'box-shadow': shadow,
        'box-rounded': rounded,
        'bg-transparent': !className.includes('bg-'),
        [`box-${size}`]: size && BoxSizes.includes(size),
      },
      className,
    );
  }, [className, size, block, full, screen, border, shadow, rounded]);

  return (
    <div className={`box ${cls}`} {...props}>
      {children}
    </div>
  );
};
