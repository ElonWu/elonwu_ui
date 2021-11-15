import React, { useState } from 'react';

import { Button } from '@elonwu/web-button';
import { Title } from '@elonwu/web-text';
import { Card } from '@elonwu/web-card';

import { Portal } from '../src';

export default {
  title: 'Components/Portal/Portal',
  component: Portal,
};

export const DrawerStory = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Title onClick={() => setVisible(true)}>
        {visible ? '打开' : '关闭'}
      </Title>

      {visible && (
        <Portal>
          <Card onClick={() => setVisible(false)}>this is content.</Card>
        </Portal>
      )}
    </div>
  );
};
