import React from 'react';
import { Txt } from '../src';
import { Card } from '@elonwu/web-card';

export default {
  title: 'Components/Base/Txt',
  component: Txt,
};

const txt = `思源黑体和思源宋体项目的成功离不开我们与 Google 的合作关系，Google
帮助我们启动此项目，并且提供了指导、测试资源和财务支持。思源黑体和思源宋体字体集成到
Google 的泛 Unicode 字体系列（称为 Noto）中。`;

export const Paragraph = () => (
  <Card style={{ display: 'grid', gap: 16, padding: 16 }}>
    <Txt size="xs">{txt}</Txt>

    <Txt size="sm" ellipsis>
      {txt}
    </Txt>

    <Txt size="base" ellipsis={2}>
      {txt}
    </Txt>

    <Txt size="lg">{txt}</Txt>

    <Txt size="xl">{txt}</Txt>
  </Card>
);
