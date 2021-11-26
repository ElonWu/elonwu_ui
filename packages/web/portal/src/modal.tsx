import React, { CSSProperties, FC, useEffect } from 'react';

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import cls from 'classnames';
import { useControlled, useToggleWithDelay } from '@elonwu/hooks';

import { Box } from '@elonwu/web-box';
import { Portal } from './portal';

export interface ModalProps {
  visible: boolean;
  onChange?: (visible: boolean) => void;

  overlay?: boolean;
  overlayClosable?: boolean;

  style?: CSSProperties;
}

export const Modal: FC<ModalProps> = ({
  children,
  overlay = true,
  overlayClosable = true,
  style = {},
  ...props
}) => {
  const [visible, setVisible] = useControlled<boolean>(props, {
    key: 'visible',
  });

  // 延迟更新 visible， 并据此判断
  const [entering, leaving, realVisible] = useToggleWithDelay(!!visible, 250);

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
        role="modal-overlay"
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
        role="modal-container"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 inline-grid place-content-center "
      >
        <Box
          role="modal-content"
          className={cls('max-w-96 min-w-80 bg-gray-50 dark:bg-gray-700', {
            'animate-slide-in-top': entering,
            // 'animate-bounce-in-top': entering,
            'animate-slide-out-top': leaving,
          })}
          style={style}
        >
          {children}
        </Box>
      </div>
    </Portal>
  );
};
