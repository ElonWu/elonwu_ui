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
import { isNil, notNil } from '@elonwu/utils';

export interface DateRangePickerProps {
  value?: [Moment, Moment];
  onChange?: ([start, end]: [Moment, Moment]) => void;
  style?: CSSProperties;
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  value,
  onChange,
  style,
}) => {
  const [startDay, setStartDay] = useState<Moment | undefined>(value?.[0]);
  const [endDay, setEndDay] = useState<Moment | undefined>(value?.[1]);
  const [hoveringDay, setHoveringDay] = useState<Moment>();

  useEffect(() => {
    if (Array.isArray(value) && value?.length === 2) {
      setStartDay(value[0]);
      setEndDay(value[1]);
    }
  }, [value]);

  const selectDay = useCallback(
    (mnt) => {
      if (startDay && !endDay) {
        const [prev, next] = mnt.isBefore(startDay)
          ? [mnt, startDay]
          : [startDay, mnt];

        setStartDay(prev);
        setEndDay(next);

        if (prev && next && onChange) {
          onChange([prev, next]);
        }
      } else {
        setStartDay(mnt);
        setEndDay(undefined);
      }
    },
    [startDay, endDay],
  );

  const format = useCallback(
    (days, month) => {
      return days.map((day: BasicDayFormat) => {
        const { mnt, inMonth } = day;

        let hover = hoveringDay && mnt.isSame(hoveringDay, 'day');

        let isStart = startDay && mnt.isSame(startDay, 'day');

        let isEnd = endDay && mnt.isSame(endDay, 'day');

        let isBetween = false,
          active = Boolean(isStart || isEnd);

        if (startDay && endDay) {
          isBetween = mnt.isBetween(startDay, endDay);
        } else if (startDay && hoveringDay) {
          const [prev, next] = hoveringDay.isBefore(startDay)
            ? [hoveringDay, startDay]
            : [startDay, hoveringDay];

          isBetween = mnt.isBetween(prev, next);

          isStart = prev && mnt.isSame(prev, 'day');
          isEnd = next && mnt.isSame(next, 'day');
        }

        // 确认被选中
        const selected = active || (isBetween && notNil(endDay));

        // 非 active 的 hover
        const onlyHover = !selected && hover;

        // 未决定时的中间值
        const indeterminedBetween = isBetween && isNil(endDay);

        // 未交互的，本月的
        const outRangeInMonth = !(active || hover || isBetween) && inMonth;
        // 未交互的, 非本月的
        const outRangeOutOfMonth = !(active || hover || isBetween) && !inMonth;

        const className = cls(
          {
            'text-white bg-primary-500': selected,
            'text-primary-400 bg-primary-100 dark:bg-primary-400 dark:text-gray-50':
              onlyHover || indeterminedBetween,
            'text-gray-700 dark:text-gray-50 bg-transparent': outRangeInMonth,
            'text-gray-300 dark:text-gray-500 bg-transparent': outRangeOutOfMonth,
          },

          {
            'rounded-l-md': isStart,
            'rounded-r-md': isEnd,
          },
        );

        return Object.assign({}, day, {
          className,
          onClick: () => selectDay(mnt),
          onMouseEnter: () => setHoveringDay(mnt),
        });
      });
    },
    [startDay, endDay, hoveringDay, selectDay],
  );

  return (
    <Calendar
      format={format}
      style={style}
      initialMonth={moment(value?.[0])?.startOf('month')}
      onMouseLeave={() => setHoveringDay(undefined)}
    />
  );
};
