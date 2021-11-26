import React, { useMemo, useRef, useState } from 'react';

import { Button } from '@elonwu/web-button';

import { Message } from '../src';

export default {
  title: 'Components/Portal/Message',
  component: Message,
  // 参数值、参数文档
  argTypes: {
    type: {
      name: 'type',
      description: '类型',
      defaultValue: 'info',
      options: ['info', 'notice', 'question', 'danger', 'warn', 'success'],
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'enum',
          detail: 'info; notice; question; danger; warn; success',
        },
        defaultValue: {
          summary: 'info',
        },
      },
    },
    message: {
      name: 'message',
      description: '按钮文字，可使用其他 ReactElement',
      // type: 'string',
      defaultValue: 'Elon Message',
      control: { type: 'text' },
      type: { required: true },
      table: {
        type: {
          summary: 'string / ReactElement',
        },
      },
    },
  },

  // 组件文档
  parameters: {
    docs: {
      // 组件整体描述
      description: {
        component: 'Message',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `
          <Message visible={visible} type="info" message="Elon Message" />
        `,
      },
    },
  },
};

export const MessageStory = (args) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          if (!visible) setVisible(true);
        }}
      >
        打开 Message
      </Button>

      <Message
        visible={visible}
        onChange={setVisible}
        type={args?.type}
        message={args?.message}
      />
    </div>
  );
};
