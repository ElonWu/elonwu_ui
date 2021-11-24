module.exports = {
  stories: [
    // '../packages/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/web/button/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/web/icon/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/web/tag/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/web/box/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/web/icon-button/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
};
