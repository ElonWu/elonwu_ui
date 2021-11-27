import React, { useEffect, useRef, useState } from 'react';

import { Button, Box } from '@elonwu/web';
import { useStateWithDelay } from '../src';

export default {
  title: 'Hooks/useStateEnhance',
};

export const UseResizeStory = () => {
  const [curr, setCurr, { prev, next, setting }] = useStateWithDelay(10, 3000);
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        gap: 12,
        placeContent: 'flex-start',
        placeItems: 'flex-start',
      }}
    >
      <Box>prev: {prev}</Box>
      <Box>curr: {curr}</Box>
      <Box>next: {next}</Box>
      <Box>setting: {setting ? '更新中' : '已完成'}</Box>
      <Button onClick={() => setCurr(curr + 1)}>Plus</Button>
      <Button onClick={() => setCurr(curr - 2)}>Minus</Button>
    </div>
  );
};
