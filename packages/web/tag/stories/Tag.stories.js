import React from 'react';
import { Tag } from '../src';

export default {
  title: 'Components/Base/Tag',
  // 参数值、参数文档
  argTypes: {
    variant: {
      name: 'variant',
      description: '标签类型',
      defaultValue: 'fill',
      options: ['fill', 'outline'],
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'enum',
          detail: `
            fill, outline
          `,
        },
        defaultValue: {
          summary: 'fill',
        },
      },
    },
    type: {
      name: 'type',
      description: '标签主题',
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
      description: '标签大小',
      defaultValue: 'md',
      options: ['dot', 'md', 'sm', 'lg'],
      control: {
        type: 'select',
        labels: { dot: 'dot', md: 'md', sm: 'sm', lg: 'lg' },
      },

      table: {
        type: {
          summary: 'enum',
          detail: `dot,md,sm,lg`,
        },
        defaultValue: {
          summary: 'md',
        },
      },
    },
    children: {
      name: 'children',
      description: '标签文字，可使用其他 ReactElement',
      // type: 'string',
      defaultValue: 'Elon Tag',
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
        component: '标签',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `<Tag type="fill" size="md">Elon Tag</Tag>`,
      },
    },
  },
};

export const TagStory = (args) => {
  return <Tag {...args} />;
};
