import React from 'react';

import { Alert } from '../src';

export default {
  title: 'Components/Base/Alert',
  component: Alert,
  // 参数值、参数文档
  argTypes: {
    type: {
      name: 'type',
      description: '类型',
      defaultValue: 'primary',
      options: ['primary', 'danger', 'info', 'warn', 'success'],
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'enum',
          detail: 'primary; danger; info; warn; success',
        },
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    message: {
      name: 'message',
      description: '按钮文字，可使用其他 ReactElement',
      // type: 'string',
      defaultValue: 'Elon Alert',
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
        component: 'Alert',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `<Alert>Elon Alert</Alert>`,
      },
    },
  },
};

export const AlertStory = (args) => <Alert {...args} />;
