import React, {
  useCallback,
  useEffect,
  useState,
  FC,
  CSSProperties,
} from 'react';
import cls from 'classnames';
import moment, { Moment } from 'moment';

import { Calendar, BasicDayFormat } from './Calendar';
import { useControlled } from '@elonwu/hooks';

export interface DatePickerProps {
  value?: Moment;
  onChange?: (m: Moment) => void;
  style?: CSSProperties;
}

export const DatePicker: FC<DatePickerProps> = (props) => {
  const [value, onChange] = useControlled<Moment>(props, {
    initialValue: props?.value || moment(),
    diff: (local, current) =>
      !!(current && (!local || !current.isSame(local, 'day'))),
  });

  const [hoveringDay, setHoveringDay] = useState<Moment>();

  const format = useCallback(
    (days, month) => {
      return days.map((day: BasicDayFormat) => {
        const { mnt, inMonth } = day;

        const active = value && mnt.isSame(value, 'day');

        const hover = hoveringDay && mnt.isSame(hoveringDay, 'day');

        // 非 active 的 hover
        const onlyHover = !active && hover;

        // 未交互的，本月的
        const outRangeInMonth = !(active || hover) && inMonth;
        // 未交互的, 非本月的
        const outRangeOutOfMonth = !(active || hover) && !inMonth;

        const className = cls('border rounded-md', {
          'border-primary-500 text-primary-500 bg-primary-100 dark:bg-gray-50': active,
          'border-transparent text-primary-500 bg-primary-100 dark:bg-primary-300': onlyHover,
          'border-transparent text-gray-700 dark:text-gray-50': outRangeInMonth,
          'border-transparent text-gray-300 bg-transparent dark:text-gray-500': outRangeOutOfMonth,
        });

        return Object.assign({}, day, {
          className,
          onClick: () => onChange(mnt),
          onMouseEnter: () => setHoveringDay(mnt),
        });
      });
    },
    [value, onChange, hoveringDay],
  );

  return (
    <Calendar
      format={format}
      style={props?.style}
      initialMonth={moment(value)}
      onMouseLeave={() => setHoveringDay(undefined)}
    />
  );
};
