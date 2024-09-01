/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    name: 'login',
    path: '/login',
    layout: false,
    component: './User/Login',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/user',
    name: 'user',
    icon: 'user',
    routes: [
      {
        path: '/user',
        redirect: '/user/admin',
      },
      {
        name: 'user.admin',
        path: '/user/admin',
        routes: [
          {
            path: '/user/admin',
            redirect: '/user/admin/list',
          },
          {
            name: 'user.admin.list',
            path: '/user/admin/list',
            component: './User/Admin',
            hideInMenu: true,
          },
          {
            name: 'user.admin.add',
            path: '/user/admin/add',
            hideInMenu: true,
          },
          {
            name: 'user.admin.edit',
            path: '/user/admin/edit',
            hideInMenu: true,
          },
          {
            name: 'user.admin.delete',
            path: '/user/admin/delete',
            hideInMenu: true,
          }
        ],
      },
      {
        name: 'user.role',
        path: '/user/role',
        routes: [
          {
            path: '/user/role',
            redirect: '/user/role/list',
          },
          {
            name: 'user.role.list',
            path: '/user/role/list',
            component: './User/Role',
            hideInMenu: true,
          },
          {
            name: 'user.role.add',
            path: '/user/role/add',
            hideInMenu: true,
          },
          {
            name: 'user.role.edit',
            path: '/user/role/edit',
            hideInMenu: true,
          },
          {
            name: 'user.role.delete',
            path: '/user/role/delete',
            hideInMenu: true,
          }
        ]
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    icon: 'setting',
    routes: [
      {
        name: 'system.menu',
        path: '/system/menu',
        routes: [
          {
            path: '/system/menu',
            redirect: '/system/menu/list',
          },
          {
            name: 'system.menu.list',
            path: '/system/menu/list',
            component: './System/Menu',
            hideInMenu: true,
          },
          {
            name: 'system.menu.add',
            path: '/system/menu/add',
            hideInMenu: true,
          },
          {
            name: 'system.menu.edit',
            path: '/system/menu/edit',
            hideInMenu: true,
          },
          {
            name: 'system.menu.delete',
            path: '/system/menu/delete',
            hideInMenu: true,
          }
        ]
      },
      {
        name: 'system.department',
        path: '/system/department',
        routes: [
          {
            path: '/system/department',
            redirect: '/system/department/list',
          },
          {
            name: 'system.department.list',
            path: '/system/department/list',
            component: './System/Department',
            hideInMenu: true,
          },
          {
            name: 'system.department.add',
            path: '/system/department/add',
            hideInMenu: true,
          },
          {
            name: 'system.department.edit',
            path: '/system/department/edit',
            hideInMenu: true,
          },
          {
            name: 'system.department.delete',
            path: '/system/department/delete',
            hideInMenu: true,
          }
        ]
      },
      {
        name: 'system.post',
        path: '/system/post',
        routes: [
          {
            path: '/system/post',
            redirect: '/system/post/list',
          },
          {
            name: 'system.post.list',
            path: '/system/post/list',
            component: './System/Post',
            hideInMenu: true,
          },
          {
            name: 'system.post.add',
            path: '/system/post/add',
            hideInMenu: true,
          },
          {
            name: 'system.post.edit',
            path: '/system/post/edit',
            hideInMenu: true,
          },
          {
            name: 'system.post.delete',
            path: '/system/post/delete',
            hideInMenu: true,
          }
        ]
      },
      {
        name: 'system.dict',
        path: '/system/dict',
        routes: [
          {
            path: '/system/dict',
            redirect: '/system/dict/list',
          },
          {
            name: 'system.dict.list',
            path: '/system/dict/list',
            component: './System/Dict',
            hideInMenu: true,
          },
          {
            name: 'system.dict.add',
            path: '/system/dict/add',
            hideInMenu: true,
          },
          {
            name: 'system.dict.edit',
            path: '/system/dict/edit',
            hideInMenu: true,
          },
          {
            name: 'system.dict.delete',
            path: '/system/dict/delete',
            hideInMenu: true,
          }
        ]
      },
      {
        name: 'system.log',
        path: '/system/log',
      }
    ]
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
