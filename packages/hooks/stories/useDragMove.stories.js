import React, { useMemo, useRef, useState } from 'react';

import { Box } from '@elonwu/web';
import { useDragMove } from '../src';

export default {
  title: 'Hooks/useDragMove',
};

export const UseDragMoveStory = () => {
  const targetRef = useRef();

  const [mover, setMover] = useState();

  const onComplete = () => {
    console.log('onComplete');
  };

  useDragMove(targetRef, setMover, onComplete);

  const [moveHorizontal, setMoveHorizontal] = useState(false);

  const sliderStyle = useMemo(() => {
    if (!mover?.offset) {
      return {
        cursor: 'pointer',
        background: '#fff',
      };
    }

    if (moveHorizontal) {
      return {
        cursor: 'ew-resize',
        background: `linear-gradient(to right, #444 ${mover?.offset.x}px, #fff ${mover?.offset.x}px)`,
      };
    }

    return {
      cursor: 'ns-resize',
      background: `linear-gradient(to bottom, #444 ${mover?.offset.y}px, #fff ${mover?.offset.y}px)`,
    };
  }, [mover, moveHorizontal]);

  const rectStyle = useMemo(() => {
    if (!mover) return { display: 'none' };

    const top = Math.min(mover?.offset.y, mover?.startOffset.y);
    const left = Math.min(mover?.offset.x, mover?.startOffset.x);

    const width = Math.abs(mover?.fromStart.x);
    const height = Math.abs(mover?.fromStart.y);

    return {
      position: 'absolute',
      top,
      left,
      width,
      height,
      background: '#6464ef44',
    };
  }, [mover]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeContent: 'center',
        gap: 8,
        placeItems: 'center',
      }}
    >
      <Box
        ref={targetRef}
        style={{
          width: 320,
          minHeight: 320,
          display: 'grid',
          gap: 8,
          placeContent: 'center',
          borderRadius: 0,
          borderLeft: '3px solid #ededed',

          position: 'relative',
          ...sliderStyle,
        }}
      >
        <div className="rect" style={rectStyle} />
        {mover ? (
          <>
            <Box>
              <p>
                ???????????????(
                {`${mover?.startPosition?.x},${mover?.startPosition?.y}`})
              </p>
              <p>
                ???????????????(
                {`${mover?.startOffset?.x},${mover?.startOffset?.y}`})
              </p>
              <p>
                ??????????????????(
                {`${mover?.startOffsetPercent?.x},${mover?.startOffsetPercent?.y}`}
                )
              </p>
            </Box>

            <Box>
              <p>
                ???????????????(
                {`${mover?.position?.x},${mover?.position?.y}`})
              </p>
              <p>
                ???????????????(
                {`${mover?.offset?.x},${mover?.offset?.y}`})
              </p>
              <p>
                ??????????????????(
                {`${mover?.offsetPercent?.x},${mover?.offsetPercent?.y}`})
              </p>
            </Box>

            <Box>
              <p>
                ???????????????(
                {`${mover?.velocity?.x},${mover?.velocity?.y}`})
              </p>
              <p>
                ???????????????(
                {`${mover?.maxVelocity.x},${mover?.maxVelocity.y}`})
              </p>

              <p>
                ?????????????????????(
                {`${mover?.maxVelocityX}`})
              </p>

              <p>
                ?????????????????????(
                {`${mover?.maxVelocityY}`})
              </p>
            </Box>

            <Box>
              <p>
                ???????????????(
                {`${mover?.fromStart?.x},${mover?.fromStart?.y}`})
              </p>
            </Box>
          </>
        ) : null}
      </Box>
    </div>
  );
};
