import React, {
  useMemo,
  FC,
  useEffect,
  useRef,
  useCallback,
  CSSProperties,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  visible?: boolean;
  container?: HTMLElement;
  className?: string;
  style?: CSSProperties;
}

export const Portal: FC<PortalProps> = ({
  children,
  container,
  className,
  visible = false,
  style = {},
}) => {
  const [element, setElement] = useState<HTMLElement>();

  const portalContainer = useMemo(() => container || document.body, [
    container,
  ]);

  const addClass = useCallback(
    (dom: HTMLElement) => {
      dom.classList.add('portal');
      if (className) dom.classList.add(className);
    },
    [className],
  );

  const addStyle = useCallback(
    (dom: HTMLElement) => {
      dom.style.position = 'absolute';
      dom.style.width = '100%';
      dom.style.height = '0px';
      dom.style.top = '0px';
      dom.style.left = '0px';

      for (const key of Object.keys(style)) {
        dom.style[key] = style[key];
      }
    },
    [style],
  );

  useEffect(() => {
    let targetElement: HTMLElement | undefined = element;

    if (visible) {
      if (!targetElement) {
        targetElement = document.createElement('div');

        setElement(targetElement);
      }

      addClass(targetElement);
      addStyle(targetElement);

      // 让容器可定位
      if (
        portalContainer !== document.body &&
        getComputedStyle(portalContainer)?.position === 'static'
      ) {
        portalContainer.style.position = 'relative';
      }
      portalContainer.appendChild(targetElement);
    }

    return () => {
      if (
        targetElement &&
        portalContainer &&
        portalContainer.contains(targetElement)
      ) {
        portalContainer.removeChild(targetElement);
      }
    };
  }, [visible]);

  return element ? ReactDOM.createPortal(children, element) : null;
};
