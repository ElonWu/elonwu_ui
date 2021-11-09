import { debounce } from '@elonwu/utils';
import { formatRound, throttle } from '@elonwu/utils';
import { MutableRefObject, useCallback, useEffect } from 'react';
import { Position } from './usePortal';

const { useRef } = require('react');

export interface Vector {
  x: number;
  y: number;
}
export interface DragMover {
  startPosition: Vector;
  startOffset: Vector;
  startOffsetPercent: Vector;

  position: Vector;
  offset: Vector;
  offsetPercent: Vector;

  fromStart: Vector;
  velocity: Vector;
  maxVelocity: Vector;
  maxVelocityX: number;
  maxVelocityY: number;
}

export const useDragMove = (
  targetRef: MutableRefObject<HTMLElement>,
  onUpdate: (mover: DragMover) => void,
  onComplete: () => void,
  options: {
    position?: Position;
    threshhold?: number;
    deltaTime?: number;
  },
) => {
  const moverRef = useRef(null);
  const startRef = useRef(null);

  const move = useCallback(
    (e: MouseEvent | Touch) => {
      const rect = targetRef?.current.getBoundingClientRect();

      const prevPosition = moverRef.current?.position;
      const prevMaxVelocity = moverRef.current?.maxVelocity;
      const prevMaxVelocityX = moverRef.current?.maxVelocityX;
      const prevMaxVelocityY = moverRef.current?.maxVelocityY;

      // 起始位置
      const startPosition = startRef.current?.position;
      // 相对 tagrte 偏移量
      const startOffset = {
        x: formatRound(startPosition.x - rect.x),
        y: formatRound(startPosition.y - rect.y),
      };
      // 相对 tagrte 偏移比例
      const startOffsetPercent = {
        x: formatRound(startOffset.x / rect.width),
        y: formatRound(startOffset.y / rect.height),
      };

      // 位置
      const position = { x: formatRound(e.clientX), y: formatRound(e.clientY) };
      // 相对 起始点 偏移量
      const fromStart = {
        x: formatRound(position.x - startPosition?.x),
        y: formatRound(position.y - startPosition?.y),
      };
      // 相对 tagrte 偏移量
      const offset = {
        x: formatRound(position.x - rect.x),
        y: formatRound(position.y - rect.y),
      };
      // 相对 tagrte 偏移比例
      const offsetPercent = {
        x: formatRound(offset.x / rect.width),
        y: formatRound(offset.y / rect.height),
      };

      // 移动速度
      const velocity = {
        x: formatRound(
          (e.clientX - prevPosition.x) / (options?.deltaTime || 10),
        ),
        y: formatRound(
          (e.clientY - prevPosition.y) / (options?.deltaTime || 10),
        ),
      };

      // 记录最大速度值（并保留记录其方向）
      const maxVelocity =
        Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2)) >=
        Math.sqrt(
          Math.pow(prevMaxVelocity.x, 2) + Math.pow(prevMaxVelocity.y, 2),
        )
          ? { x: velocity.x, y: velocity.y }
          : prevMaxVelocity;

      const maxVelocityX =
        Math.abs(velocity.x) >= Math.abs(prevMaxVelocityX)
          ? velocity.x
          : prevMaxVelocityX;

      // 记录速度值以及方向
      const maxVelocityY =
        Math.abs(velocity.y) >= Math.abs(prevMaxVelocityY)
          ? velocity.y
          : prevMaxVelocityY;

      const mover: DragMover = {
        startPosition,
        startOffset,
        startOffsetPercent,

        position,
        offset,
        offsetPercent,

        fromStart,
        velocity,
        maxVelocity,
        maxVelocityX,
        maxVelocityY,
      };

      // 更新位置和速度
      moverRef.current = mover;

      onUpdate(mover);
    },
    [onUpdate, options],
  );

  const onMove = useCallback(
    throttle((e: MouseEvent) => {
      move(e);
    }, options?.deltaTime || 10),
    [move, options],
  );

  // 保证最后一次更新, 将速度归零
  const onMoveEnd = useCallback(
    debounce((e: MouseEvent) => {
      move(e);
    }, 200),
    [move],
  );

  const removeListener = useCallback(() => {
    document.removeEventListener('mousemove', onMove, false);
    document.removeEventListener('mousemove', onMoveEnd, false);
    onComplete();
  }, [onMove, onComplete]);

  useEffect(() => {
    // 按下鼠标后监听移动
    targetRef?.current.addEventListener('mousedown', (e) => {
      // 记录初始位置和速度
      startRef.current = {
        position: { x: e.clientX, y: e.clientY },
      };

      // 记录初始位置和速度
      moverRef.current = {
        position: { x: e.clientX, y: e.clientY },
        velocity: { x: 0, y: 0 },
        maxVelocity: { x: 0, y: 0 },
        maxVelocityX: 0,
        maxVelocityY: 0,
      };
      // 第一次触发
      onMove(e);

      // 监听移动
      document.addEventListener('mousemove', onMove, false);
      document.addEventListener('mousemove', onMoveEnd, false);

      // 监听松开
      document.addEventListener('mouseup', removeListener, false);
    });

    // 移除监听
    return () => {
      document.removeEventListener('mouseup', removeListener, false);
      removeListener();
    };
  }, []);

  const onTouchMove = useCallback(
    throttle((e: TouchEvent) => {
      move(e.targetTouches[0]);
    }, options?.deltaTime || 10),
    [move, options],
  );

  // 保证最后一次更新, 将速度归零
  const onTouchMoveEnd = useCallback(
    debounce((e: TouchEvent) => {
      move(e.targetTouches[0]);
    }, 200),
    [move],
  );

  const removeTouchListener = useCallback(() => {
    document.removeEventListener('touchmove', onTouchMove, false);
    document.removeEventListener('touchmove', onTouchMoveEnd, false);
    onComplete();
  }, [onMove, onComplete]);

  // 移动端使用 touch
  useEffect(() => {
    // 按下鼠标后监听移动
    targetRef?.current.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();

      // 记录初始位置和速度
      startRef.current = {
        position: {
          x: formatRound(e.targetTouches[0].clientX),
          y: formatRound(e.targetTouches[0].clientY),
        },
      };

      // 记录初始位置和速度
      moverRef.current = {
        position: {
          x: formatRound(e.targetTouches[0].clientX),
          y: formatRound(e.targetTouches[0].clientY),
        },
        velocity: { x: 0, y: 0 },
        maxVelocity: 0,
      };

      // 第一次触发
      onTouchMove(e);

      // 监听移动
      document.addEventListener('touchmove', onTouchMove, false);
      document.addEventListener('touchmove', onTouchMoveEnd, false);

      // 监听松开
      document.addEventListener('touchend', removeListener, false);
      document.addEventListener('touchcancel', removeListener, false);
    });

    // 移除监听
    return () => {
      document.removeEventListener('touchend', removeListener, false);
      document.removeEventListener('touchcancel', removeListener, false);
      removeTouchListener();
    };
  }, []);
};
