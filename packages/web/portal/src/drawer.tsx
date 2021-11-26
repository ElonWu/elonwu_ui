import React, { CSSProperties, FC, useEffect, useMemo } from 'react';

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import cls from 'classnames';
import { useControlled, useToggleWithDelay } from '@elonwu/hooks';

import { Box } from '@elonwu/web-box';
import { Portal } from './portal';

export interface DrawerProps {
  visible: boolean;
  onChange?: (visible: boolean) => void;

  overlay?: boolean;
  overlayClosable?: boolean;

  position?: 'left' | 'right' | 'bottom' | 'top';

  style?: CSSProperties;
}

export const Drawer: FC<DrawerProps> = ({
  children,
  overlay = true,
  overlayClosable = true,
  position = 'left',
  style = {},
  ...props
}) => {
  const [visible, setVisible] = useControlled<boolean>(props, {
    key: 'visible',
  });

  // 延迟更新 visible， 并据此判断
  const [entering, leaving, realVisible] = useToggleWithDelay(!!visible, 250);

  // 所处位置
  const [fromLeft, fromRight, fromTop, fromBottom] = useMemo(
    () => [
      position === 'left',
      position === 'right',
      position === 'top',
      position === 'bottom',
    ],
    [position],
  );

  // 禁止滚动
  useEffect(() => {
    if (visible) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }

    return () => enableBodyScroll(document.body);
  }, [visible]);

  return (
    <Portal visible={realVisible}>
      <div
        role="drawer-overlay"
        className={`fixed z-30 w-screen h-screen ${cls({
          'bg-gray-700 bg-opacity-20': overlay,
          'cursor-pointer': overlay && overlayClosable,
          'animate-fade-in': overlay && entering,
          'animate-fade-out': overlay && leaving,
        })}`}
        onClick={() => {
          if (overlayClosable) setVisible(false);
        }}
      />

      <div
        role="drawer-container"
        className={cls('fixed z-40 flex', {
          'top-0 bottom-0 left-0 justify-start': fromLeft,
          'top-0 bottom-0 right-0 justify-end': fromRight,
          'left-0 right-0 top-0 justify-start': fromTop,
          'left-0 right-0 bottom-0 justify-end': fromBottom,
        })}
      >
        <Box
          role="drawer-content"
          border={false}
          block={false}
          shadow
          className={cls('overflow-y-auto bg-gray-50 dark:bg-gray-700', {
            'h-full w-96': fromLeft || fromRight,
            'w-full h-96': fromTop || fromBottom,

            'animate-slide-in-left': fromLeft && entering,
            'animate-slide-out-left': fromLeft && leaving,

            'animate-slide-in-right': fromRight && entering,
            'animate-slide-out-right': fromRight && leaving,

            'animate-slide-in-top': fromTop && entering,
            'animate-slide-out-top': fromTop && leaving,

            'animate-slide-in-bottom': fromBottom && entering,
            'animate-slide-out-bottom': fromBottom && leaving,
          })}
          style={style}
        >
          {children}
        </Box>
      </div>
    </Portal>
  );
};
