import React from 'react';
import { Icon } from '../src';

/**
 * 素材
 */
import searchIcon from './assets/search.svg';

export default {
  title: 'Components/Base/Icon',
};

export const IconStory = () => {
  return <Icon src={searchIcon} round />;
};
