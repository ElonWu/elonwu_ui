import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { notNil } from '@elonwu/utils';

/**
 * 保留前值的 useState
 */
export const useStateWithPrev = function <T>(
  value: T,
): [visible: T, setVisible: (val: T) => void, prevVisible: T | null] {
  const [prev, setPrev] = useState<T | null>(null);
  const [curr, setCurr] = useState<T>(value);

  const setValue = useCallback(
    (val: T) => {
      setPrev(curr);
      setCurr(val);
    },
    [curr],
  );

  return [curr, setValue, prev];
};

interface StateDetail<T> {
  setting: Boolean;
  next: T | null;
  prev: T | null;
}

/**
 * 延迟更新的 useState
 */
export const useStateWithDelay = function <T>(
  value: T,
  delay: number = 200,
): [value: T, setValue: (val: T) => void, detail: StateDetail<T>] {
  const [next, setNext] = useState<T | null>(null);
  const [curr, setCurr, prev] = useStateWithPrev<T>(value);

  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (next === null) return; // 首次或者手动设置为 null 时无法更新 curr
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setCurr(next);
      setNext(null);
    }, delay);
  }, [next, delay]);

  return [
    curr,
    setNext,
    {
      setting: notNil(next),
      next,
      prev,
    },
  ];
};

export const useToggleWithDelay = (
  value: boolean,
  delay: number = 2000,
): [entering: boolean, leaving: boolean, realVisible: boolean] => {
  const [prev, setPrev] = useState<boolean>(false);

  const [{ entering, leaving }, setAnimState] = useState({
    entering: false,
    leaving: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (value !== prev) {
      if (value === true) {
        setAnimState({
          entering: true,
          leaving: false,
        });
      } else {
        setAnimState({
          entering: false,
          leaving: true,
        });
      }

      timer = setTimeout(() => setPrev(value), delay);
    } else {
      setAnimState({
        entering: false,
        leaving: false,
      });
    }

    return () => clearTimeout(timer);
  }, [prev, value, delay]);

  const realVisible = useMemo(() => value || entering || leaving, [
    value,
    entering,
    leaving,
  ]);

  return [entering, leaving, realVisible];
};
