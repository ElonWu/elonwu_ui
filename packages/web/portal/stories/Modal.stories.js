import React, { useMemo, useRef, useState } from 'react';

import { Button } from '@elonwu/web-button';

import { Modal } from '../src';
import zeroDown from './assets/zero-down.png';

export default {
  title: 'Components/Portal/Modal',
  component: Modal,
  // 参数值、参数文档
  argTypes: {},

  // 组件文档
  parameters: {
    docs: {
      // 组件整体描述
      description: {
        component: 'Modal',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `
          <Modal visible={visible}>
            Elon Modal
          </Modal>
        `,
      },
    },
  },
};

export const ModalStory = (args) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          if (!visible) setVisible(true);
        }}
      >
        打开 Modal
      </Button>

      <Modal
        visible={visible}
        onChange={setVisible}
        overlay={false}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
        }}
      >
        <div
          className="w-full h-full bg-cover bg-center grid place-content-center"
          style={{
            width: 740,
            height: 400,
            backgroundImage: `url(${zeroDown})`,
          }}
        >
          <div
            className="inline-block p-4 rounded-md bg-gradient-to-br bg-opacity-25	from-gray-50 to-gray-100 animate-bounce-in-top"
            style={{ animationDelay: 0.8 }}
          >
            <h3 className="font-bold text-primary-500 bg:text-primary-50">
              This is ElonWu Modal
            </h3>
          </div>
        </div>
      </Modal>
    </div>
  );
};
