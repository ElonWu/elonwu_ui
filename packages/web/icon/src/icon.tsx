import React, { CSSProperties, FC, useMemo } from 'react';
import cx from 'classnames';
import SVG from 'react-inlinesvg';

import './index.css';

// 大小
export const IconSizes = ['xs', 'sm', 'md', 'lg'];
export type IconSize = typeof IconSizes[number];

export interface IconProps {
  src: string;
  className?: string;
  style?: CSSProperties;
  size?: IconSize;
}

export const Icon: FC<IconProps> = ({
  src,
  size = 'md',
  className = '',
  ...props
}) => {
  const cls = useMemo(() => {
    return cx(
      {
        [`icon-${size}`]: size && IconSizes.includes(size),
        'text-current': !className.includes('text-'), // 未主动设置 icon 颜色时
      },
      className,
    );
  }, [size, className]);

  return (
    <span className={`icon ${cls}`} {...props}>
      <SVG src={src} />
    </span>
  );
};
