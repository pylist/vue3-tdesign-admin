import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/admin',
    name: 'Admin',
    component: Layout,
    redirect: '/admin/user',
    meta: { title: { zh_CN: '超级管理员', en_US: 'Super Admin' }, icon: 'user-circle' },
    children: [
      {
        path: 'user',
        name: 'UserAdmin',
        component: () => import('@/pages/admin/user/index.vue'),
        meta: { title: { zh_CN: '用户管理', en_US: 'User Admin' } },
      },
      {
        path: 'menu',
        name: 'MenuAdmin',
        component: () => import('@/pages/admin/menu/index.vue'),
        meta: { title: { zh_CN: '菜单管理', en_US: 'Menu Admin' } },
      },
    ],
  },
];
