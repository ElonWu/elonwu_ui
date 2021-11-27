import React, { useCallback, useMemo, useRef, useState } from 'react';

import { Box, Button } from '@elonwu/web';
import { formatRound } from '@elonwu/utils';
import { useIntersection } from '../src';

export default {
  title: 'Hooks/useIntersection',
};

export const UseIntersectionStory = () => {
  const list = useMemo(() => new Array(50).fill(1).map((_, i) => i), []);

  const rootRef = useRef();
  const targetRef = useRef();

  const { visible, ratio, scrollIntoView } = useIntersection({
    rootRef, //未指定时默认为 ducument
    targetRef,
    options: {
      // step: 0.05,
      // margin: 16,

      step: 0.01,
      margin: 8,
    },
  });

  return (
    <div
      style={{
        width: 'calc(100vw - 32px)',
        height: 'calc(100vh - 32px)',

        background: `linear-gradient(to top right, #459 ${ratio * 100}%, #945 ${
          ratio * 100
        }%)`,
      }}
    >
      <h4>
        {visible ? '视野内' : '视野外'}; 可见比例 {formatRound(ratio * 100, 0)}%
      </h4>

      <Button
        onClick={() =>
          scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          })
        }
      >
        滚动至可见
      </Button>

      <div
        // ref={rootRef}
        style={{
          // width: 400,
          height: 400,
          overflow: 'auto',
          border: '1px solid #ededed',
        }}
      >
        {list.map((key) => (
          // <p key={`prev-${key}`}>{key}</p>
          <div style={{ height: 30 }} key={`prev-${key}`} />
        ))}

        <Box
          ref={targetRef}
          style={{
            height: 300,
            width: 300,
          }}
        />

        {list.map((key) => (
          <p key={`next-${key}`}>{key}</p>
        ))}
      </div>
    </div>
  );
};
