import { defineConfig } from '@umijs/max';

const isDev = process.env.NODE_ENV === 'development';
const base = '/portal/';
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  base,
  publicPath: isDev ? '/' : base,
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      name: '首页',
      path: '/',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
  qiankun: {
    slave: {},
  },
});
