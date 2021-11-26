import React, { forwardRef, ReactNode, useMemo } from 'react';
import cx from 'classnames';

import { Box, BoxProps } from '@elonwu/web-box';
import { Icon } from '@elonwu/web-icon';

// 素材
import mailIcon from './assets/icons/mail.svg';
import questionIcon from './assets/icons/question.svg';
import warnIcon from './assets/icons/warn.svg';
import infoIcon from './assets/icons/info.svg';
import checkCircleIcon from './assets/icons/check-circle.svg';
import closeCircleIcon from './assets/icons/close-circle.svg';

// 样式类型
export const AlertTypes = [
  'info',
  'notice',
  'question',
  'danger',
  'warn',
  'success',
];

export type AlertType = typeof AlertTypes[number];

export interface AlertProps extends BoxProps {
  message: string;
  type?: AlertType;
  icon?: string | ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { icon, message, children, className = '', type = 'info', ...props },
    ref,
  ) => {
    const { iconDom, color, bg } = useMemo(() => {
      const alertProps: { [key: AlertType]: any } = {
        danger: {
          icon: closeCircleIcon,
          color: 'text-red-500',
          bg: 'bg-red-100',
        },
        warn: {
          icon: warnIcon,
          color: 'text-yellow-500',
          bg: 'bg-yellow-100',
        },
        success: {
          icon: checkCircleIcon,
          color: 'text-green-500',
          bg: 'bg-green-100',
        },
        info: {
          icon: infoIcon,
          color: 'text-primary-500',
          bg: 'bg-primary-100',
        },
        notice: {
          icon: mailIcon,
          color: 'text-indigo-500',
          bg: 'bg-indigo-100',
        },
        question: {
          icon: questionIcon,
          color: 'text-pink-500',
          bg: 'bg-pink-100',
        },
      };

      let alertProp = alertProps.info;
      if (type && AlertTypes.includes(type)) alertProp = alertProps[type];

      const { icon: iconSrc, color, bg } = alertProp;

      let iconDom = <Icon src={iconSrc} className={color} />;

      if (typeof icon === 'string') {
        iconDom = <Icon src={icon} className={color} />;
      } else if (icon) {
        iconDom = icon as any;
      }

      return { iconDom, color, bg };
    }, [icon, type]);

    const cls = useMemo(() => {
      return cx(
        {
          [`alert-${type}`]: type && AlertTypes.includes(type),
        },
        bg,
        className,
      );
    }, [className, type, bg]);

    return (
      <Box
        className={`flex items-start justify-between ${cls}`}
        ref={ref as any}
        {...props}
      >
        <span style={{ height: 24, paddingTop: 2 }}>{iconDom}</span>
        {children || (
          <p className={`ml-4 flex-1 break-word ${color}`}>{message}</p>
        )}
      </Box>
    );
  },
);
