import React, {
  useEffect,
  useState,
  forwardRef,
  CSSProperties,
  useMemo,
  FC,
} from 'react';

import cls from 'classnames';

const ImgRatios = ['1/1', '2/1', '3/2', '4/3', '16/9'];
export type ImgRatio = typeof ImgRatios[number];

export interface ImgProps {
  src: string;
  ratio?: ImgRatio;
  border?: boolean;
  shadow?: boolean;
  full?: boolean;
  style?: CSSProperties;
  className?: string;
}

export const Img: FC<ImgProps> = ({
  src,
  ratio,
  border = false,
  shadow = false,
  className = '',
  style = {},
  ...props
}) => {
  const [bgImg, setBgImg] = useState<string | null>(null);

  // 加载图片
  useEffect(() => {
    if (bgImg || !src) return;

    // 加载图片
    const img = new Image();
    img.onload = () => setBgImg(src);
    img.src = src;

    return () => {
      img.onload = null;
    };
  }, [bgImg, src]);

  const ratioStyle = useMemo(() => {
    if (!ratio || !ImgRatios.includes(ratio)) return { paddingTop: '100%' };

    const [w, h]: number[] = ratio.split('/').map((n) => parseInt(n));

    return {
      paddingTop: `${Math.floor((h / w) * 10000) / 100}%`,
    };
  }, [ratio]);

  return (
    <div role="img-container" className="w-full" {...props}>
      <div
        role="img-border"
        className={cls(
          className,
          'bg-gray-300 overflow-hidden bg-cover bg-center bg-no-repeat',
          {
            'border-4 border-gray-300 dark:border-gray-100': border,
            'shadow-md': shadow,
          },
        )}
        style={{
          backgroundImage: bgImg
            ? `url(${bgImg})`
            : `linear-gradient(#e66465, #9198e5)`,
          ...ratioStyle,
          ...style,
        }}
      />
    </div>
  );
};
