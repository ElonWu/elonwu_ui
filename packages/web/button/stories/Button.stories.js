import React from 'react';

import { Button } from '../src';

export default {
  title: 'Components/Base/Button',
  component: Button,
  // 参数值、参数文档
  argTypes: {
    variant: {
      name: 'variant',
      description: '按钮类型',
      defaultValue: 'fill',
      options: ['fill', 'outline', 'ghost'],
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'enum',
          detail: `
            fill, outline, ghost
          `,
        },
        defaultValue: {
          summary: 'fill',
        },
      },
    },
    type: {
      name: 'type',
      description: '按钮主题',
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
    size: {
      name: 'size',
      description: '按钮大小',
      defaultValue: 'md',
      options: ['xs', 'md', 'sm', 'lg'],
      control: {
        type: 'select',
        labels: { xs: 'xs', md: 'md', sm: 'sm', lg: 'lg' },
      },

      table: {
        type: {
          summary: 'enum',
          detail: `xs,md,sm,lg`,
        },
        defaultValue: {
          summary: 'md',
        },
      },
    },
    wide: {
      name: 'wide',
      description: '是否加宽',
      defaultValue: false,
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    round: {
      name: 'round',
      description: '是否圆角',
      defaultValue: false,
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    square: {
      name: 'square',
      description: '是否等 padding',
      defaultValue: false,
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    block: {
      name: 'block',
      description: '宽度为父容器宽度',
      defaultValue: false,
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    loading: {
      name: 'loading',
      description: '是否 loading',
      defaultValue: false,
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    disabled: {
      name: 'disabled',
      description: '是否禁用',
      defaultValue: false,
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    children: {
      name: 'children',
      description: '按钮文字，可使用其他 ReactElement',
      // type: 'string',
      defaultValue: 'Elon Button',
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
        component: '按钮',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `<Button>Elon Button</Button>`,
      },
    },
  },
};

export const ButtonStory = (args) => <Button {...args} />;
