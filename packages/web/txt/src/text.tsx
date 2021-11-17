import React, { FC, useMemo } from 'react';

/**
 *  Txt
 */
// 文本大小
export const txtSize: string[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
export type TxtSize = typeof txtSize[number];

// 文本参数
interface TxtProps {
  userSelect?: Boolean;
  bold?: Boolean;
  ellipsis?: Boolean | Number;
  size?: TxtSize;
}

const sizes: { [key in TxtSize]: string } = {
  xs: `text-xs leading-none`,
  sm: `text-sm leading-tight`,
  md: `text-base leading-normal`,
  lg: `text-lg leading-relaxed`,
  xl: `text-xl leading-loose`,
  '2xl': `text-2xl leading-loose font-normal`,
};

export const Txt: FC<TxtProps> = ({
  userSelect,
  ellipsis,
  size,
  bold,
  ...props
}) => {
  // tailwind style
  const cls = useMemo(() => {
    let cls: string[] = [
      `font-normal`,
      `text-gray-700 dark:text-gray-50`,
      userSelect ? `select-text` : `select-none`,
    ];
    // size
    if (size && txtSize.includes(size)) {
      cls = cls.concat(sizes[size] || sizes.md);
    }

    if (bold) {
      cls = cls.concat('text-bold');
    }

    return cls;
  }, [userSelect, size, bold]);

  // ellipsis style
  const styles = useMemo(() => {
    let styles = {};

    if (ellipsis) {
      if (typeof ellipsis === 'number' && ellipsis >= 2) {
        styles = Object.assign({}, styles, {
          overflow: 'hidden',
          display: ' -webkit-box',
          WebkitLineClamp: ellipsis,
          WebkitBoxOrient: 'vertical',
          wordBreak: 'break-all',
        });
      } else {
        styles = Object.assign({}, styles, {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        });
      }
    }
    return styles;
  }, [ellipsis]);

  return <p className={cls.join(' ')} style={styles} {...props} />;
};
