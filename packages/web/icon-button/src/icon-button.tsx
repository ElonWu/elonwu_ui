import React, { FC, forwardRef, useMemo } from 'react';

import { Icon, IconProps } from '@elonwu/web-icon';

import { Button, ButtonProps, ButtonSize } from '@elonwu/web-button';

export type IconButtonProps = Omit<ButtonProps, 'icon' | 'size'> & IconProps;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      src,
      size,
      square = true, // 默认等距
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref as any}
        size={size as ButtonSize}
        square={square}
        {...props}
      >
        <Icon src={src} size={size} />
      </Button>
    );
  },
);
