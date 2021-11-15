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
  container?: HTMLElement;
  className?: string;
  style?: CSSProperties;
}

export const Portal: FC<PortalProps> = ({
  children,
  container,
  className,
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
      dom.style.width = '100vw';
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

    if (!targetElement) {
      targetElement = document.createElement('div');

      setElement(targetElement);
    }

    addClass(targetElement);
    addStyle(targetElement);

    portalContainer.appendChild(targetElement);

    return () => {
      if (targetElement) portalContainer.removeChild(targetElement);
    };
  }, []);

  return element ? ReactDOM.createPortal(children, element) : null;
};
