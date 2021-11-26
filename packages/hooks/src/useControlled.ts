import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { isObject } from '@elonwu/utils';

export function useControlled<T>(
  props: any,
  options: {
    initialValue?: T;
    key?: string;
    diff?: (local: T | undefined, current: T | undefined) => boolean;
  },
): [value: T | undefined, onChange: (value: T | undefined) => void] {
  const valueKey = useMemo(() => options?.key || 'value', [options]);

  // 局部值
  const [value, setValue] = useState<T | undefined>(options?.initialValue);

  // 确认是受控组件
  const isControlled = useMemo(() => {
    return isObject(props) && valueKey in props;
  }, [valueKey, props]);

  // 对比受控的值和局部的值
  const diff = useCallback(
    (local: T | undefined, current: T | undefined) => {
      if (options?.diff) return options.diff(local, current);
      return () => local !== current;
    },
    [options],
  );

  // 自动同步到受控的值
  useEffect(() => {
    if (isControlled && diff(value, props?.[valueKey])) {
      setValue(props?.[valueKey]);
    }
  }, [isControlled, props, value, diff, valueKey]);

  // 更新
  const onChange = useCallback(
    (value: T | undefined) => {
      // 更新局域
      setValue(value);

      // 更新外部
      if (isControlled && props?.onChange) {
        props.onChange(value);
      }
    },
    [isControlled, props],
  );

  return [value, onChange];
}
