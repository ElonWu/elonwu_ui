import React, { useCallback } from 'react';
import { Chart, ChartRenderer, ChartProps } from './base';
import { colors10 } from './theme';

export const LineGroup = React.forwardRef(
  ({ chartKey, ...props }: ChartProps, ref) => {
    // 渲染配置
    const configChart = useCallback<ChartRenderer>(({ chart, source }) => {
      chart.clear();

      chart.data(source);

      // 绘制多个折线图
      chart.line().position('x*y').color('z').size(3).shape('smooth');
      // 绘制点图
      chart.point().position('x*y').size(2).tooltip(false);

      chart.legend({
        position: 'bottom',
      });
    }, []);

    return (
      <Chart
        ref={ref}
        // @ts-ignore
        chartKey={`LineGroup-${chartKey}`}
        configChart={configChart}
        {...props}
      />
    );
  },
);
