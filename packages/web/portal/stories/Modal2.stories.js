import React, { useState } from 'react';

import { Button } from '@elonwu/web-button';
import { Title } from '@elonwu/web-text';
import { Card } from '@elonwu/web-card';

import { Modalv2 } from '../src';

export default {
  title: 'Components/Portal/Modalv2',
  component: Modalv2,
};

export const ModalStory = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Title>{visible ? '打开' : '关闭'}</Title>
      <Modalv2
        visible={visible}
        // onChange={setVisible}
        maskClosable
        onClose={() => setVisible(false)}
        trigger={<Button onClick={() => setVisible(true)}>Show Modal</Button>}
        width={400}
      >
        <Card>this is content.</Card>
      </Modalv2>
    </div>
  );
};
