import React from 'react';
import { Card } from '@elonwu/web-card';
import { Calendar, DatePicker, DateRangePicker } from '../src';

export default {
  title: 'Components/Date',
};

export const CalendarStory = () => (
  <div style={{ width: '80%', maxWidth: 400, margin: 'auto' }}>
    <Calendar />
  </div>
);

export const DatePickerStory = () => (
  <div style={{ width: '80%', maxWidth: 400, margin: 'auto' }}>
    <DatePicker onChange={(value) => console.log(value.format())} />
  </div>
);

export const DateRangePickerStory = () => (
  <div style={{ width: '80%', maxWidth: 400, margin: 'auto' }}>
    <DateRangePicker
      onChange={(value) => value.forEach((val) => console.log(val.format()))}
    />
  </div>
);
