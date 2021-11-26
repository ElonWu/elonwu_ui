import React, {
  useMemo,
  useState,
  EventHandler,
  FC,
  CSSProperties,
  MouseEventHandler,
  useRef,
  RefObject,
} from 'react';

import cls from 'classnames';
import moment, { Moment } from 'moment';
import { isFunction } from '@elonwu/utils';
import { createContext } from '@elonwu/hooks';

import leftIcon from './assets/left.svg';
import rightIcon from './assets/right.svg';

import { Box } from '@elonwu/web-box';
import { IconButton } from '@elonwu/web-icon-button';
import { Button } from '@elonwu/web-button';

export interface BasicDayFormat {
  key: string;
  date: number;
  mnt: Moment;
  inMonth: boolean;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  className?: string;
}

export interface CalendarProps {
  format?: (days: BasicDayFormat[], month?: Moment) => void;
  initialMonth?: Moment;
  onMouseLeave?: EventHandler<any>;
  style?: CSSProperties;
}

const { Provider, useContext } = createContext('Calendar');

export const useCalendar = useContext;

export const Calendar: FC<CalendarProps> = ({
  initialMonth = moment(),
  style = {},
  ...props
}) => {
  const calendarRef = useRef<HTMLDivElement>();

  const [month, setMonth] = useState(initialMonth);

  // 展示月份选择弹窗
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  // 展示时间选择弹窗
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  // 时间选择器结果
  const [timeSelected, setTimeSelected] = useState<Moment | null>(null);

  return (
    <Provider
      value={{ month, setMonth, timeSelected, setTimeSelected, ...props }}
    >
      <Box
        ref={calendarRef as RefObject<HTMLDivElement>}
        size="xs"
        shadow
        className="relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          maxWidth: 400,
          minWidth: 275,
          ...style,
        }}
      >
        <div
          className="px-2 pb-2 bg-white dark:bg-gray-800 backdrop-blur-sm"
          style={{
            opacity: 0.9,
            // backdropFilter: 'blur(8px)',
          }}
        >
          <div className="h-24 flex flex-col items-stretch justify-center pb-2 space-y-2">
            {/* 月份展示和切换 */}
            <Months />
            {/* 周天展示 */}
            <WeekDays />
          </div>

          {/* 日期展示 */}
          <Days />
        </div>
      </Box>

      {/* 选择月份 */}
      {/* <Modal visible={showMonthSelect} onCancel={() => setShowMonthSelect(false)} container={calendarRef?.current}>
        <MonthSelect 
          initail={month}
          onCancel={() => setShowMonthSelect(false)}
          onConfirm={(month: Moment) => {
            setMonth(month);
            setShowMonthSelect(false)
          }}
        />
      </Modal>

      <Modal visible={showTimeSelect} onCancel={() => setShowTimeSelect(false)} container={calendarRef?.current}>
        <TimeSelect 
          initail={timeSelected}
          onCancel={() => setShowTimeSelect(false)}
          onConfirm={(timeSelected: Moment) => {
            setTimeSelected(timeSelected);
            setShowTimeSelect(false)
          }}
        />
      </Modal> */}
    </Provider>
  );
};

const WeekDays = () => {
  const daysOfWeek = ['一', '二', '三', '四', '五', '六', '日'];

  return (
    <div className="grid gap-y-2 grid-cols-7 place-items-center rounded-sm py-2 bg-gray-100 dark:bg-gray-600">
      {daysOfWeek.map((day) => (
        <h4
          className="text-sm font-bold text-gray-500 dark:text-gray-100"
          key={day}
        >
          周{day}
        </h4>
      ))}
    </div>
  );
};

const Days = () => {
  const { month, onMouseLeave, format } = useCalendar();
  const days: Moment[] = useMemo(() => {
    const firstDayOfMonth = moment(month).startOf('month');
    const lastDayOfMonth = moment(month).endOf('month');

    const firstDayOfFirstWeek = moment(firstDayOfMonth).startOf('week');
    const lastDayOfLastWeek = moment(lastDayOfMonth).endOf('week');

    let days = [];

    for (
      let m = moment(firstDayOfFirstWeek);
      m.isBefore(lastDayOfLastWeek);
      m.add(1, 'day')
    ) {
      days.push(moment(m));
    }
    return days;
  }, [month]);

  const formatDays: BasicDayFormat[] = useMemo(() => {
    const basicFormatDays: BasicDayFormat[] = days.map((day) => {
      const inMonth = day.isSame(month, 'month');

      const className = cls({
        'text-gray-700 dark:text-gray-50 bg-transparent': inMonth,
        'text-gray-300 dark:text-gray-500 bg-transparent': !inMonth,
      });

      return {
        key: day.format('YYYY-MM-DD'),
        date: day.date(),
        mnt: day,
        inMonth,
        className,
      };
    });

    const formatDays =
      format && isFunction(format)
        ? format(basicFormatDays, month)
        : basicFormatDays;

    return formatDays;
  }, [days, month, format]);

  return (
    <div
      className="grid gap-y-2 grid-cols-7 place-items-center"
      onMouseLeave={onMouseLeave}
    >
      {formatDays?.map(({ key, date, mnt, className = '', ...rest }) => (
        <div
          className={`w-full min-w-min flex items-center justify-center transition cursor-pointer ${className}`}
          {...rest}
        >
          <p key={key} className={`w-8 h-8 flex items-center justify-center`}>
            {date}
          </p>
        </div>
      ))}
    </div>
  );
};

const Months = () => {
  const { month, setMonth } = useCalendar();

  return (
    <div className="flex items-center justify-center space-x-4">
      <IconButton
        key="minus"
        variant="ghost"
        src={leftIcon}
        onClick={() => {
          setMonth(moment(month)?.subtract(1, 'month').startOf('month'));
        }}
      />
      <Button variant="ghost" className="text-lg font-bold">
        {month?.format('YYYY-MM')}
      </Button>
      <IconButton
        key="plus"
        variant="ghost"
        src={rightIcon}
        onClick={() => {
          setMonth(moment(month)?.add(1, 'month').startOf('month'));
        }}
      />
    </div>
  );
};
