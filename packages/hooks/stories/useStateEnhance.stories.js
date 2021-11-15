import React, { useEffect, useRef, useState } from 'react';

import { Button, Text, Card } from '@elonwu/web';
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
      <Card>prev: {prev}</Card>
      <Card>curr: {curr}</Card>
      <Card>next: {next}</Card>
      <Card>setting: {setting ? '更新中' : '已完成'}</Card>
      <Button onClick={() => setCurr(curr + 1)}>Plus</Button>
      <Button onClick={() => setCurr(curr - 2)}>Minus</Button>
    </div>
  );
};
