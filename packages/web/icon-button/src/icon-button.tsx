import React, { FC, useMemo } from 'react';

import { Icon, IconProps } from '@elonwu/web-icon';

import { Button, ButtonProps, ButtonSize } from '@elonwu/web-button';

export type IconButtonProps = Omit<ButtonProps, 'icon' | 'size'> & IconProps;

export const IconButton: FC<IconButtonProps> = ({
  src,
  size,
  square = true, // 默认等距
  ...props
}) => {
  return (
    <Button size={size as ButtonSize} square={square} {...props}>
      <Icon src={src} size={size} />
    </Button>
  );
};
