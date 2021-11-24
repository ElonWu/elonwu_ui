// 插件
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import styles from 'rollup-plugin-styles';
import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss';

import svg from 'rollup-plugin-svg';

export const override = (pkg, callback) => {
  // 打包代码
  const jsConfig = {
    input: pkg.source,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
    ],
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      del({ targets: ['dist/*'] }),
      // json
      json(),
      postcss({
        plugins: [
          require('postcss-import'),
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      }),
      scss(),
      styles(),
      // jsx
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx'],
        presets: [
          '@babel/preset-react',
          ['@babel/preset-env', { targets: { node: 'current' } }],
        ],
      }),
      commonjs({
        transformMixedEsModules: true,
        defaultIsModuleExports: 'auto',
      }),

      svg({ base64: true }),
    ],
  };

  // 打包代码
  const tsConfig = {
    input: pkg.source,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
    ],
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      del({ targets: ['dist/*'] }),
      // json
      json(),
      styles(),
      // jsx
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
        presets: [
          '@babel/preset-react',
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
        ],
      }),

      commonjs({
        extensions: ['.ts', '.tsx'],
        exclude: 'node_modules/**',
        transformMixedEsModules: true,
        defaultIsModuleExports: 'auto',
      }),

      svg({ base64: true }),
    ],
  };

  const dtsConfig = {
    input: pkg.source,
    output: [{ file: pkg.types, format: 'es' }],
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      dts(),
      styles(),
      commonjs({
        transformMixedEsModules: true,
        defaultIsModuleExports: 'auto',
      }),
    ],
  };

  return callback({ jsConfig, tsConfig, dtsConfig });
};
