import React from 'react';

import { Point, Chart } from '../src';
import { Box } from '@elonwu/web-box';

export default {
  title: 'Components/Chart/Point',
  component: Point,
};

export const PointStory = () => (
  <Box block className="p-4 bg-gray-700">
    <Point
      theme="dark"
      chartKey="Story-PointChart"
      dataSource={[
        { x: '2020-07-25', y: 100, z: '类型1', size: 10 },
        { x: '2020-07-26', y: 120, z: '类型1', size: 12 },
        { x: '2020-07-27', y: 70, z: '类型1', size: 7 },
        { x: '2020-07-28', y: 140, z: '类型1', size: 14 },
        { x: '2020-07-29', y: 110, z: '类型1', size: 11 },
        { x: '2020-07-30', y: 30, z: '类型1', size: 8 },
        { x: '2020-07-31', y: 60, z: '类型1', size: 6 },

        { x: '2020-07-25', y: 140, z: '类型2', size: 14 },
        { x: '2020-07-26', y: 110, z: '类型2', size: 11 },
        { x: '2020-07-27', y: 30, z: '类型2', size: 8 },
        { x: '2020-07-28', y: 60, z: '类型2', size: 6 },
        { x: '2020-07-29', y: 110, z: '类型2', size: 11 },
        { x: '2020-07-30', y: 30, z: '类型2', size: 8 },
        { x: '2020-07-31', y: 60, z: '类型2', size: 6 },

        { x: '2020-07-25', y: 110, z: '类型3', size: 11 },
        { x: '2020-07-26', y: 30, z: '类型3', size: 8 },
        { x: '2020-07-27', y: 60, z: '类型3', size: 6 },
        { x: '2020-07-28', y: 140, z: '类型3', size: 14 },
        { x: '2020-07-29', y: 110, z: '类型3', size: 11 },
        { x: '2020-07-30', y: 30, z: '类型3', size: 8 },
        { x: '2020-07-31', y: 60, z: '类型3', size: 6 },
      ]}
      height={400}
    />
  </Box>
);

export const MobileLineStory = () => (
  <Box style={{ width: 275, margin: 'auto' }}>
    <Point
      height={240}
      chartKey="Story-MobilePoint"
      dataSource={[
        { x: '2020-07-25', y: 100 },
        { x: '2020-07-26', y: 120 },
        { x: '2020-07-27', y: 70 },
        { x: '2020-07-28', y: 140 },
        { x: '2020-07-29', y: 110 },
        { x: '2020-07-30', y: 30 },
        { x: '2020-07-31', y: 60 },
      ]}
      setConfig={({ chart, source }) => {
        chart.legend({ position: 'top' });
        chart.axis(false);
      }}
    />
  </Box>
);
