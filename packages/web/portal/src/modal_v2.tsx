import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  FC,
  MouseEventHandler,
  useRef,
} from 'react';

import { Card } from '@elonwu/web-card';
import { isNil, notNil } from '@elonwu/utils';

import { Portal } from './portal';
import { ModalZIndex, OverlayZIndex } from '../../constants/zindex';

export interface ModalV2Props {
  width?: number;

  trigger?: ReactNode;
  visible?: boolean;

  maskClosable?: boolean;
  onClose?: () => void;
  onChange?: () => void;
}

export const Modalv2: FC<ModalV2Props> = ({
  children,
  trigger,
  visible,
  onChange,
  onClose,
  maskClosable,

  width = 600,
}) => {
  const [
    modalVisible,
    setModalVisible,
    prevModalVisible,
  ] = useStateWithPrev<Boolean>(false);

  // 受控
  useEffect(() => {
    if (typeof visible === 'boolean' && visible !== modalVisible) {
      setModalVisible(visible);
    }
  }, [visible]);

  // 触发关闭
  useEffect(() => {
    if (typeof onChange === 'function' && prevModalVisible !== modalVisible) {
      onChange();
    }
  }, [modalVisible, prevModalVisible, onChange]);

  const onMaskClose = useCallback(() => {
    if (maskClosable && typeof onClose === 'function') onClose();
  }, [maskClosable, onClose]);

  return (
    <>
      {trigger}
      {modalVisible && (
        <>
          <Overlay onClick={onMaskClose} />
          <Portal>
            <div
              className="ModalContainer"
              style={{
                position: 'absolute',
                top: '50vh',
                left: '50vw',
                transform: 'translate(-50%, -50%)',
                width,
                zIndex: ModalZIndex,
              }}
            >
              {children}
            </div>
          </Portal>
        </>
      )}
    </>
  );
};

export interface OverlayProps {
  onClick?: MouseEventHandler;
}

const Overlay: FC<OverlayProps> = ({ onClick }) => (
  <div
    className="overlay"
    onClick={onClick}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: OverlayZIndex,
      background: '#00000033',
    }}
  />
);

// 保留前值的 useState
const useStateWithPrev = function <T>(
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

// 延迟更新的 useState
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
