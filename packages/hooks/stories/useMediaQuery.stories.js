import React from 'react';

import { Box } from '@elonwu/web';
import { MediaQueryProvider, useMediaQuery } from '../src';

export default {
  title: 'Hooks/useMediaQuery',
};

export const UseMediaQueryStory = () => {
  return (
    <MediaQueryProvider>
      <Page1 />
      <Page2 />
      <Page3 />
    </MediaQueryProvider>
  );
};

const Page1 = () => {
  const [isMobile, isTablet] = useMediaQuery();
  return <Box>isMobile: {isMobile ? 'true' : 'fasle'}</Box>;
};

const Page2 = () => {
  const [isMobile, isTablet] = useMediaQuery();
  return <Box>isTablet: {isTablet ? 'true' : 'fasle'}</Box>;
};

const Page3 = () => {
  const [isMobile, isTablet, isPC] = useMediaQuery();
  return (
    <>
      <Box>isPC: {isPC ? 'true' : 'fasle'}</Box>
      <Page4 />
    </>
  );
};

const Page4 = () => {
  const [isMobile, isTablet, isPC, isWideScreen] = useMediaQuery();
  return <Box>isWideScreen: {isWideScreen ? 'true' : 'fasle'}</Box>;
};
