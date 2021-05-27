export const systemName = '专家人才库管理系统';
export const routes = [
  {
    path: '/',
    component: '@/layouts/',
    routes: [
      { path: '/', component: '@/pages/index', title: systemName + ' - 首页' },

      { path: '/excel', component: '@/pages/excel', title: systemName + ' - 文件解析' },

      { path: '/config/tags', component: '@/pages/config/tags', title: systemName + ' - 标签管理' },
      { path: '/config/user', component: '@/pages/config/user', title: systemName + ' - 人员管理' },

      {
        path: '/invalid',
        component: './invalid',
      },
    ],
  },
];
