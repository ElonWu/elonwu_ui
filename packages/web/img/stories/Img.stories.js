import React, { useEffect, useState } from 'react';
import { Img } from '../src';

/**
 * 素材
 */
import leaves from './assets/leaves.jpeg';
import leaves2 from './assets/leaves2.jpeg';

export default {
  title: 'Components/Base/Img',
  component: Img,
  // 参数值、参数文档
  argTypes: {
    ratio: {
      name: 'ratio',
      description: '比例',
      defaultValue: '1/1',
      options: ['1/1', '2/1', '3/2', '4/3', '16/9'],
      control: {
        type: 'select',
        labels: {
          '1/1': '1/1',
          '2/1': '2/1',
          '3/2': '3/2',
          '4/3': '4/3',
          '16/9': '16/9',
        },
      },

      table: {
        type: {
          summary: 'enum',
          detail: `1/1, 2/1, 3/2, 4/3, 16/9`,
        },
        defaultValue: {
          summary: '1/1',
        },
      },
    },
    border: {
      name: 'border',
      description: '是否边框',
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
  },
};

export const ImgStory = (args) => {
  const [src, setSrc] = useState();
  const [src2, setSrc2] = useState();

  useEffect(() => {
    setTimeout(() => {
      setSrc2(leaves2);
    }, 400);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSrc(leaves);
    }, 1200);
  }, []);

  return (
    <div className="flex items-center justify-between space-x-10 w-96">
      <Img key="img1" src={src} {...args} />
      <Img key="img2" src={src2} {...args} className="rounded-full" />
    </div>
  );
};
