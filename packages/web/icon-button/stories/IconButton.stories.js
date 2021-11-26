import React from 'react';
import { IconButton } from '../src';

/**
 * 素材
 */
import searchIcon from './assets/search.svg';

export default {
  title: 'Components/Base/IconButton',
  component: IconButton,

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
      defaultValue: true,
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: true,
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
  },
};

export const IconButtonStory = (args) => {
  return <IconButton src={searchIcon} {...args} />;
};
