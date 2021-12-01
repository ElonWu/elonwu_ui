import React, { useState } from 'react';

import { AreaStack } from '../src';
import { Button } from '@elonwu/web-button';
import { Box } from '@elonwu/web-box';

export default {
  title: 'Components/Chart/AreaStack',
  component: AreaStack,
};

export const AreaStackStory = () => {
  const [theme, setTheme] = useState('light');

  return (
    <div>
      <Button
        onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      >
        {theme}
      </Button>

      <Box block className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}>
        <AreaStack
          theme={theme}
          chartKey="Story-AreaStack"
          dataSource={[
            { x: '2020-07-25', y: 100, z: '类型1' },
            { x: '2020-07-26', y: 120, z: '类型1' },
            { x: '2020-07-27', y: 70, z: '类型1' },
            { x: '2020-07-28', y: 140, z: '类型1' },
            { x: '2020-07-29', y: 110, z: '类型1' },
            { x: '2020-07-30', y: 30, z: '类型1' },
            { x: '2020-07-31', y: 60, z: '类型1' },

            { x: '2020-07-25', y: 180, z: '类型2' },
            { x: '2020-07-26', y: 20, z: '类型2' },
            { x: '2020-07-27', y: 60, z: '类型2' },
            { x: '2020-07-28', y: 120, z: '类型2' },
            { x: '2020-07-29', y: 60, z: '类型2' },
            { x: '2020-07-30', y: 30, z: '类型2' },
            { x: '2020-07-31', y: 40, z: '类型2' },
          ]}
          height={450}
        />
      </Box>
    </div>
  );
};

export const MobileAreaStackStory = () => (
  <Box style={{ width: 275, margin: 'auto' }}>
    <AreaStack
      chartKey="Story-MobileAreaStack"
      dataSource={[
        { x: '2020-07-25', y: 100, z: '类型1' },
        { x: '2020-07-26', y: 120, z: '类型1' },
        { x: '2020-07-27', y: 70, z: '类型1' },
        { x: '2020-07-28', y: 140, z: '类型1' },
        { x: '2020-07-29', y: 110, z: '类型1' },
        { x: '2020-07-30', y: 30, z: '类型1' },
        { x: '2020-07-31', y: 60, z: '类型1' },

        { x: '2020-07-25', y: 180, z: '类型2' },
        { x: '2020-07-26', y: 20, z: '类型2' },
        { x: '2020-07-27', y: 60, z: '类型2' },
        { x: '2020-07-28', y: 120, z: '类型2' },
        { x: '2020-07-29', y: 60, z: '类型2' },
        { x: '2020-07-30', y: 30, z: '类型2' },
        { x: '2020-07-31', y: 40, z: '类型2' },
      ]}
      height={240}
      setConfig={({ chart }) => {
        chart.axis(false);
        chart.legend(false);
      }}
    />
  </Box>
);
