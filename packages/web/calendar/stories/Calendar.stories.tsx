import React, { useState } from 'react';
import moment from 'moment';
import { Box } from '@elonwu/web-box';
import { Calendar, DatePicker, DateRangePicker } from '../src';

export default {
  title: 'Components/Date',
};

export const CalendarStory = () => <Calendar />;

export const DatePickerStory = () => {
  const [mnt, setMnt] = useState(moment('2021-11-12'));
  return (
    <DatePicker
      value={mnt}
      onChange={setMnt}
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1637773509361-d1f772379021?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60")`,
      }}
    />
  );
};

export const DateRangePickerStory = () => (
  <DateRangePicker
    value={[moment('2021-12-10'), moment('2021-12-15')]}
    onChange={(value) => value.forEach((val) => console.log(val.format()))}
  />
);
