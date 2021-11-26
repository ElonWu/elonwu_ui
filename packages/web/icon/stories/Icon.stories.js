import React from 'react';
import { Box } from '@elonwu/web-box';

import { Icon } from '../src';

/**
 * 素材
 */
import searchIcon from './assets/search.svg';

export default {
  title: 'Components/Base/Icon',
};

export const IconStory = () => {
  return (
    <Box className="grid grid-flow-col gap-4 justify-start">
      <Icon src={searchIcon} className="text-primary-500" size="xs" />
      <Icon src={searchIcon} size="sm" />
      <Icon src={searchIcon} className="text-red-500" />
      <Icon src={searchIcon} className="text-yellow-500" size="lg" />
    </Box>
  );
};
