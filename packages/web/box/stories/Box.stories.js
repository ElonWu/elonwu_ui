import React from 'react';
import { Box } from '../src';

export default {
  title: 'Components/Base/Box',
  component: Box,
  // 参数值、参数文档
  argTypes: {
    size: {
      name: 'size',
      description: '盒子大小',
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
    border: {
      name: 'border',
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
    shadow: {
      name: 'shadow',
      description: '是否投影',
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
      description: '是否宽度充满',
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
    full: {
      name: 'full',
      description: '是否全部充满',
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
    screen: {
      name: 'screen',
      description: '是否满屏',
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
  },
};

export const BoxStory = (args) => {
  return <Box {...args}>box</Box>;
};
