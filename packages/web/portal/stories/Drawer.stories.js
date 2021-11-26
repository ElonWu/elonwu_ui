import React, { useMemo, useRef, useState } from 'react';

import { Button } from '@elonwu/web-button';
import { Box } from '@elonwu/web-box';

import { Drawer } from '../src';

export default {
  title: 'Components/Portal/Drawer',
  component: Drawer,
  // 参数值、参数文档
  argTypes: {
    position: {
      name: 'position',
      description: '位置',
      defaultValue: 'left',
      options: ['left', 'right', 'top', 'bottom'],
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'enum',
          detail: 'left; right; top; bottom;',
        },
        defaultValue: {
          summary: 'left',
        },
      },
    },
  },

  // 组件文档
  parameters: {
    docs: {
      // 组件整体描述
      description: {
        component: 'Drawer',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `
          <Drawer visible={visible}>
            Elon Drawer
          </Drawer>
        `,
      },
    },
  },
};

export const DrawerStory = (args) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          if (!visible) setVisible(true);
        }}
      >
        打开 Drawer
      </Button>

      <Drawer visible={visible} onChange={setVisible} position={args?.position}>
        <Box>
          <p className="dark:text-gray-50">This is ElonWu Drawer</p>
        </Box>
      </Drawer>
    </div>
  );
};
