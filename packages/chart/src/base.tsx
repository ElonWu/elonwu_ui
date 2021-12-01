import React, {
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  MutableRefObject,
  Ref,
} from 'react';
import { Chart as G2Chart, registerTheme } from '@antv/g2';

// utils
import { isValidArray, isFunction, isArray } from '@elonwu/utils';

// @ts-ignore
import resolveConfig from 'tailwindcss/resolveConfig';
// @ts-ignore
import * as tailwindConfig from '../tailwind.config';

const twConfig = resolveConfig(tailwindConfig);

export interface ChartEvents {
  [key: string]: (e: any) => void;
}

export interface ArrayChartItem {
  x: string;
  y: number;
  z?: number | string;
}

export type ChartRenderer = ({
  chart,
  source,
}: {
  chart: G2Chart;
  source: any;
}) => void;

export interface ChartProps {
  chartKey: string;
  loading?: boolean;
  dataSource?: any;

  configChart?: ChartRenderer;
  overrideConfigChart?: ChartRenderer;
  setConfig?: ChartRenderer;

  events?: ChartEvents;
  width?: number;
  height?: number;
  dataMarkers?: DataMarker[];
}

export interface UseChartProps {
  chartKey: string;
  events: ChartEvents;
  dataSource: any;
  width?: number;
  height?: number;
}

export interface UseChartUpdateProps {
  chartRef: MutableRefObject<G2Chart | undefined | null>;
  source: any;
  setConfig?: ChartRenderer;
  configChart?: ChartRenderer;
  dataMarkers?: DataMarker[];
}

export interface DataMarker {
  x: number | string;
  content: string;
}

// 设置数据标识
const setDataMarkers = ({
  chart,
  dataMarkers,
  source,
}: {
  chart: G2Chart;
  dataMarkers: DataMarker[] | undefined;
  source: any;
}): void => {
  if (isValidArray(dataMarkers)) {
    // @ts-ignore
    dataMarkers.forEach(({ x, content }) => {
      const position = source.find((data: ArrayChartItem) => data.x === x);

      if (position) {
        chart.annotation().dataMarker({
          animate: true,
          point: {
            style: {
              lineWidth: 1,
              stroke: colors10[3],
            },
          },
          line: {
            length: 32,
            style: {
              lineWidth: 1,
              stroke: colors10[3],
            },
          },
          text: {
            content,
            autoEllipsis: true, // 自动ellipsis
            // 文本样式
            style: {
              textAlign: 'center',
              fontSize: 16,
              fill: colors10[3],
            },
            // 背景样式
            background: {
              padding: 4,
              style: { fill: '#f5f5f5', fillOpacity: 0.4 },
            },
          },
          position,
        });
      }
    });
  }
};

// 初始化 chart 对象
const useChart = ({
  chartKey,
  events = {},
  dataSource,
  ...rest
}: UseChartProps) => {
  // 图表实例
  const chartRef = useRef<G2Chart | null | undefined>();

  // 初始化
  useLayoutEffect(() => {
    // 注册主题
    registerChartTheme();

    const chart = new G2Chart({
      container: `Chart-${chartKey}`,
      appendPadding: 8,
      syncViewPadding: true,
      autoFit: true,
      height: 420,
      theme: 'ELonTheme',
      ...rest,
    });
    chartRef.current = chart;
  }, []);

  // 事件绑定
  useEffect(() => {
    const chart = chartRef?.current;

    if (!chart) return;

    // 事件绑定
    const eventKeys = Object.keys(events);

    if (isValidArray(eventKeys)) {
      eventKeys.forEach((eventKey) => {
        const callback = events[eventKey];
        // console.log(`attaching ${eventKey}`);
        if (isFunction(callback)) chart.on(eventKey, callback);
      });
    }

    // 事件解绑
    return () => {
      if (isValidArray(eventKeys)) {
        eventKeys.forEach((eventKey) => {
          const callback = events[eventKey];
          if (isFunction(callback)) chart.off(eventKey, callback);
        });
      }
    };
  }, [events, dataSource]);

  return chartRef;
};

// chart 动态配置
const useChartUpdate = ({
  chartRef,
  source,
  setConfig,
  dataMarkers,
  configChart,
}: UseChartUpdateProps) => {
  useEffect(() => {
    const chart = chartRef?.current;
    if (!chart) return;

    const onUpdate = async () => {
      chart.tooltip({
        showTitle: true,
        showMarkers: false,
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'xy',
          follow: false,
          line: {
            style: {
              opacity: 0.5,
              stroke: colors10[0],
              lineDash: [6, 6, 6],
            },
          },
        },
      });

      // 预设的图表配置， 如 LineEnhance
      // @ts-ignore
      if (isFunction(configChart)) await configChart({ chart, source });
      // 消费组件时 定义配置项
      // @ts-ignore
      if (isFunction(setConfig)) await setConfig({ chart, source });

      // 添加 dataMarker
      await setDataMarkers({ chart, dataMarkers, source });

      chart.render();
      chart.forceFit();
    };

    onUpdate();
  }, [chartRef, source, configChart, dataMarkers]);
};

// dom 渲染 chart
export const Chart = React.forwardRef(
  (
    {
      chartKey,
      loading,
      dataSource,

      configChart,
      overrideConfigChart,
      setConfig,

      dataMarkers,
      events = {},
      height = 320,
    }: ChartProps,
    ref,
  ) => {
    // 格式化 source
    const source = useMemo(
      () =>
        isValidArray(dataSource) || isValidArray(Object.keys(dataSource))
          ? dataSource
          : [],
      [dataSource],
    );

    // 加载完成且数据为空
    const empty = useMemo(
      () => !loading && isArray(source) && !isValidArray(source),
      [loading, source],
    );

    // 图表实例
    const chartRef = useChart({
      chartKey,
      events,
      dataSource,
      height,
    });

    // 更新渲染
    useChartUpdate({
      chartRef,
      source,
      configChart: overrideConfigChart || configChart,
      setConfig,
      dataMarkers,
    });

    // 实际渲染的 DOM
    return (
      <div style={{ position: 'relative' }}>
        {/* loading */}
        {/* {loading && (
          <Loading
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
            }}
          />
        )} */}

        {/* empty */}
        {/* {empty && (
          <Empty
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
            }}
          />
        )} */}

        {/* chart */}
        <div
          id={`Chart-${chartKey}`}
          ref={ref as Ref<HTMLDivElement>}
          style={{
            display: 'grid',
            placeItems: 'center',
            height,
            opacity: empty ? 0 : 1,
          }}
        />
      </div>
    );
  },
);

/**************
 * 主题配置
 ***************/

const { colors } = twConfig.theme;

export const textStyle = {
  fontFamily: `Noto, serif`,
  fontSize: 10,
  fill: colors.gray[500],
};

export const colors10 = [
  colors.primary[500],
  colors.red[500],
  colors.yellow[500],
  colors.green[500],
  colors.blue[500],
  colors.indigo[500],
  colors.purple[500],
  colors.pink[500],
  colors.red[300],
  colors.yellow[300],
];

export const colors20 = [
  colors.primary[500],
  colors.red[500],
  colors.yellow[500],
  colors.green[500],
  colors.blue[500],
  colors.indigo[500],
  colors.purple[500],
  colors.pink[500],
  colors.primary[300],
  colors.red[300],
  colors.yellow[300],
  colors.green[300],
  colors.blue[300],
  colors.indigo[300],
  colors.purple[300],
  colors.pink[300],

  colors.primary[900],
  colors.red[900],
  colors.yellow[900],
  colors.green[900],
];

const registerChartTheme = () => {
  const axis = {
    title: null,
    tickLine: null,
    subTickLine: null,
    line: { style: { opacity: 0.45, fill: colors.gray[500] } },
    grid: {
      line: {
        style: { opacity: 0.15, fill: colors.gray[500], lineDash: [8, 8, 8] },
      },
    },
    label: {
      style: textStyle,
    },
  };

  const legend = {
    title: { style: textStyle },
    itemName: { spacing: 8, style: { ...textStyle, lineHeight: 1.5 } },
  };
  const tooltip = {};
  const annotation = {};

  registerTheme('ELonTheme', {
    defaultColor: colors.primary[500],
    subColor: colors.gray[500],
    semanticRed: colors.red[500],
    semanticGreen: colors.green[500],
    fontFamily: `Noto, serif`,
    padding: 'auto',

    minColumnWidth: 2, // 柱状图最小宽度，像素值

    colors10,
    colors20,

    labels: {
      style: textStyle,
    },
    pieLabels: {
      style: textStyle,
    },
    components: {
      axis: { common: axis },
      legend: { common: legend },
      tooltip: { common: tooltip },
      annotation: { common: annotation },
    },
  });
};
