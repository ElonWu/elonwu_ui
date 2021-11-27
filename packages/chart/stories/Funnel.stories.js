import React from 'react';

import { Funnel, Chart } from '../index';
import { colors10 } from '../src';

export default {
  title: 'Components/Chart/Funnel',
  component: Funnel,
};

export const FunnelStory = () => (
  <Funnel
    chartKey="FunnelStory"
    dataSource={[
      { x: '浏览网站', y: 50000 },
      { x: '放入购物车', y: 35000 },
      { x: '生成订单', y: 25000 },
      { x: '支付订单', y: 15000 },
      { x: '完成交易', y: 8000 },
    ]}
    height={400}
    width={600}
    setConfig={({ chart }) => {
      chart.scale('y', {
        alias: '访问量',
      });
    }}
    baseColor={colors10[0]}
    reverseColor
  />
);
