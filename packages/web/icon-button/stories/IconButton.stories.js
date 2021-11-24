import React from 'react';
import { IconButton } from '../src';

/**
 * 素材
 */
import searchIcon from './assets/search.svg';

export default {
  title: 'Components/Base/IconButton',
};

export const IconButtonStory = () => {
  return <IconButton src={searchIcon} round />;
};
