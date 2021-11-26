import React, { FC, useEffect } from 'react';

import cls from 'classnames';
import { useControlled, useToggleWithDelay } from '@elonwu/hooks';

import { Alert, AlertType } from '@elonwu/web-alert';
import { Portal } from './portal';

export interface MessageProps {
  visible: boolean;
  onChange?: (visible: boolean) => void;
  type?: AlertType;
  message: string;
}

export const Message: FC<MessageProps> = ({ type, message, ...props }) => {
  const [visible, setVisible] = useControlled<boolean>(props, {
    key: 'visible',
  });

  // 自动关闭
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!!visible) timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [visible]);

  // 延迟更新 visible， 并据此判断
  const [entering, leaving, realVisible] = useToggleWithDelay(!!visible, 250);

  return (
    <Portal visible={realVisible}>
      <div
        role="message-container"
        className="absolute top-4 left-1/2 transform -translate-x-1/2"
      >
        <Alert
          type={type}
          message={message}
          className={cls({
            'animate-slide-in-top': entering,
            'animate-slide-out-right': leaving,
          })}
        />
      </div>
    </Portal>
  );
};
