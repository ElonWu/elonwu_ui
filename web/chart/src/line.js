import React, { useCallback } from 'react';
import { Chart } from './base';

export const Line = React.forwardRef(({ chartKey, ...props }, ref) => {
  // 渲染配置
  const configChart = useCallback(({ chart, source }) => {
    chart.data(source);
    // 绘制线图
    chart.line().position('x*y').shape('smooth').size(3);

    chart.legend({
      position: 'bottom',
    });
  }, []);

  return (
    <Chart
      ref={ref}
      chartKey={`Line-${chartKey}`}
      configChart={configChart}
      {...props}
    />
  );
});
