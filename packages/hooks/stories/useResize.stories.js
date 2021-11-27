import React, { useEffect, useRef, useState } from 'react';

import { Box } from '@elonwu/web';
import { useResize } from '../src';

export default {
  title: 'Hooks/useResize',
};

export const UseResizeStory = () => {
  const targetRef = useRef();
  const rect = useResize(targetRef);

  const [scale, setScale] = useState(1);

  const onScale = () => {
    setScale((prev) => {
      const result = prev === 1 ? 1.2 : 1;
      return result;
    });
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeContent: 'stretch',
        placeItems: 'center',
      }}
    >
      <Box
        ref={targetRef}
        style={{
          width: '50%',
          height: '50%',
          background: '#f3f4f5',
          display: 'grid',
          placeContent: 'center',
          position: 'relative',
          transform: `scale(${scale})`,
          transition: 'all .2s ease',
        }}
        onClick={onScale}
      >
        <p style={{ position: 'absolute', top: 8, left: 8 }}>
          ({rect.left},{rect.top})
        </p>

        <p style={{ position: 'absolute', bottom: 8, right: 8 }}>
          ({rect.right},{rect.bottom})
        </p>

        <h4>
          {rect.width}*{rect.height}
        </h4>
      </Box>
    </div>
  );
};
