import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
import Rem from '@/views/layout/rem'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

import shujuguanliRouter from './modules/shujuguanli'
import youpinyewuRouter from './modules/youpinyewu'
import shangpinyewuRouter from './modules/shangpinyewu'
import cuxiaoRouter from './modules/cuxiao'
import zongheRouter from './modules/zongheguanli'
import caiwuguanliRouter from './modules/financial'
import shanghuRouter from './modules/merchant'
import diaoduRouter from './modules/dispatch'
import yingxiaoRouter from './modules/marketing'
import fenxiRouter from './modules/yonghufenxi'
import huiyuanglRouter from './modules/huiyuanguanli'
import jifenscRouter from './modules/integral'
import yyhezuoRouter from './modules/hezuo'
import zhanghuglRouter from './modules/zhanghugl'
import qitawentiRouter from './modules/qitawenti'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/checkIn',
    component: () => import('@/views/checkIn/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    hidden: true,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    hidden: true,
    meta: { title: 'guides' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    hidden: true,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'realtime',
    name: 'overviewDemo',
    meta: {
      title: '概览',
      icon: '绿洲_概览',
      noCache: true
    },
    children: [
      {
        path: 'realtime',
        component: () => import('@/views/overview/realtime'),
        name: 'realtimeDemo',
        meta: { title: '实时数据', noCache: true }  //集团的
      },
      {
        path: 'overall',
        component: () => import('@/views/overview/overall'),
        name: 'overviewsDemo',
        meta: { title: '整体趋势' } //集团的
      },

    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'realtime_m',
    name: 'overviewDemoM',
    meta: {
      title: '概览',
      icon: '绿洲_概览',
      noCache: true
    },
    children: [
      {
        path: 'realtime_m',
        component: () => import('@/views/overview/realtime_m'),
        name: 'realtimeDemoM',
        meta: { title: '实时数据', noCache: true }  //商户的
      },
      {
        path: 'overall-m',
        component: () => import('@/views/overview/overall-m'),
        name: 'overviewsDemoM',
        meta: { title: '整体趋势' } //商户的
      },

    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'realtime_o',
    name: 'overviewDemoO',
    meta: {
      title: '概览',
      icon: '绿洲_概览',
      noCache: true
    },
    children: [
      {
        path: 'realtime_o',
        component: () => import('@/views/overview/realtime_o'),
        name: 'realtimeDemoO',
        meta: { title: '实时数据', noCache: true }  //油站的
      },
      {
        path: 'overall-o',
        component: () => import('@/views/overview/overall-o'),
        name: 'overviewsDemoO',
        meta: { title: '整体趋势' } //油站的
      },

    ]
  },

  /** When your routing table is too long, you can split it into small modules**/

  /* 数据管理*/
  shujuguanliRouter,
  /* 油品业务*/
  youpinyewuRouter,
  /* 商品业务*/
  shangpinyewuRouter,
  /* 促销管理*/
  cuxiaoRouter,
  /* 综合管理*/
  zongheRouter,
  /* 财务管理*/
  caiwuguanliRouter,
  /* 商户管理*/
  shanghuRouter,
  /* 调度管理*/
  diaoduRouter,
  /* 营销管理*/
  yingxiaoRouter,
  /* 用户分析*/
  fenxiRouter,
  /* 会员管理*/
  huiyuanglRouter,
  /* account*/
  zhanghuglRouter,
  /* 积分商城*/
  jifenscRouter,
  /* 异业合作*/
  yyhezuoRouter,
  /* 账户管理*/
  qitawentiRouter,

  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/icon',
    component: Layout,
    meta: {
      title: 'Layout'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    meta: { title: 'Tabs' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: 'error_logs' },
    children: [
      {
        path: 'log',
        component: () => import('@/views/errorLog/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: 'themes' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: 'clipboards' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    meta: { title: 'i18ns' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    meta: { title: 'links' },
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true, meta: { title: '404s' }}
]
