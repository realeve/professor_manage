// import { IConfig } from 'umi-types';

// https://umijs.org/config/
import { defineConfig } from 'umi';
import theme from './config/theme';
import { routes } from './config/routes';

const DEV = process.env.NODE_ENV == 'development';

// ref: https://umijs.org/config/

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  mock: false,
  dynamicImport: {
    loading: '@/component/Loading',
  },
  title: 'dashboard',
  theme,
  // cssModulesTypescriptLoader: {
  //   // 对按照 css modules 方式引入的 css 或 less 等样式文件，自动生成 ts 类型定义文件。
  //   mode: 'emit',
  // },
  terserOptions: {
    compress: {
      drop_console: !DEV,
      drop_debugger: !DEV,
    },
  },
  devtool: DEV ? 'eval' : false,
  nodeModulesTransform: {
    type: 'none',
  },
  exportStatic: { htmlSuffix: false },
  routes,
  ignoreMomentLocale: true,
  targets: {
    chrome: 70,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  fastRefresh: {},
});
