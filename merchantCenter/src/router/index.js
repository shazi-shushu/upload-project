import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import treeTableRouter from './modules/tree-table'
// import nestedRouter from './modules/nested'

/** note: sub-menu only appear when children.length>=1
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
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRoutes = [
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
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'home_page', noCache: true, affix: true }
      }
    ]
  },
  // {
  //   path: '/hotelManagement',
  //   component: Layout,
  //   redirect: '/hotelManagement/hotelManagementList',
  //   meta: { title: '酒店管理', icon: 'dingdan' },
  //   children: [
  //     {
  //       path: '/hotelManagementList',
  //       component: () => import('@/views/hotelManagement/hotelManagementList/hotelManagementList'),
  //       name: 'hotelManagementList',
  //       meta: { title: '酒店管理', icon: 'guide', noCache: true }
  //     },
  //     {
  //       path: '/housingManagementList',
  //       component: () => import('@/views/hotelManagement/housingManagement/housingManagementList/housingManagementList'),
  //       name: 'housingManagementList',
  //       meta: { title: '房型管理', icon: 'guide', noCache: true }
  //     },
  //     {
  //       path: '/supplyServicesList',
  //       component: () => import('@/views/hotelManagement/supplyServices/supplyServicesList/supplyServicesList'),
  //       name: 'supplyServicesList',
  //       meta: { title: '供应服务', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: 'hotelManagementDetails',
    component: Layout,
    redirect: '/hotelManagementDetails',
    hidden: true,
    children: [
      {
        path: '/hotelManagement/hotelManagementDetails',
        component: () =>
          import(
            '@/views/hotelManagement/hotelManagementList/hotelManagementDetails/hotelManagementDetails'
          ),
        name: 'hotelManagementDetails',
        meta: { title: '查看酒店详情', noCache: true }
      }
    ]
  },
  {
    path: 'housinglManagementDetails',
    component: Layout,
    redirect: '/housinglManagementDetails',
    hidden: true,
    children: [
      {
        path: '/hotelManagement/housinglManagementDetails',
        component: () =>
          import(
            '@/views/hotelManagement/housingManagement/housingManagementDetails/housinglManagementDetails'
          ),
        name: 'housinglManagementDetails',
        meta: { title: '查看房型详情', noCache: true }
      }
    ]
  },
  {
    path: 'addSupplyServices',
    component: Layout,
    redirect: '/addSupplyServices',
    hidden: true,
    children: [
      {
        path: '/supplyServices/addSupplyServices',
        component: () =>
          import(
            '@/views/hotelManagement/supplyServices/addSupplyServices/addSupplyServices'
          ),
        name: 'addSupplyServices',
        meta: { title: '添加房型服务', noCache: true }
      }
    ]
  },
  {
    path: 'setPrice',
    component: Layout,
    redirect: '/setPrice',
    hidden: true,
    children: [
      {
        path: '/supplyServices/setPrice',
        component: () =>
          import('@/views/hotelManagement/supplyServices/setPrice/setPrice'),
        name: 'setPrice',
        meta: { title: '设置价格', noCache: true }
      }
    ]
  },
  {
    path: 'orderDetails',
    component: Layout,
    redirect: '/orderDetails',
    hidden: true,
    children: [
      {
        path: '/orderDetails',
        component: () => import('@/views/orderList/orderDetails/orderDetails'),
        name: 'orderDetails',
        meta: { title: '酒店订单详情', noCache: true }
      }
    ]
  },
  {
    path: 'orderRefundDetails',
    component: Layout,
    redirect: '/orderRefundDetails',
    hidden: true,
    children: [
      {
        path: '/orderRefundDetails',
        component: () =>
          import(
            '@/views/orderRefundList/orderRefundDetails/orderRefundDetails'
          ),
        name: 'orderRefundDetails',
        meta: { title: '酒店退款详情', noCache: true }
      }
    ]
  },

  {
    path: '/addrole',
    component: Layout,
    redirect: '/addrole',
    hidden: true,
    children: [
      {
        path: '/addrole',
        component: () =>
          import('@/views/accountmanage/rolepermissions/addrole/addrole'),
        name: 'addrole',
        meta: { title: '添加角色', noCache: true }
      }
    ]
  },
  {
    path: '/editrole',
    component: Layout,
    redirect: '/editrole',
    hidden: true,
    children: [
      {
        path: '/editrole',
        component: () =>
          import('@/views/accountmanage/rolepermissions/editrole/editrole'),
        name: 'editrole',
        meta: { title: '添加角色', noCache: true }
      }
    ]
  },
  { path: '*', redirect: 'dashboard' }
  // ,
  // {
  //   path: '/orderDetails',
  //   component: () => import('@/views/orderList/orderDetails/orderDetails'),
  //   // name: 'orderDetails',
  //   meta: { title: '酒店订单详情（7299）', noCache: true },
  //   hidden: true
  // }
]

export default new Router({
  // mode: "history", // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const asyncRoutes = [
  // {
  //   path: '/hotelManagement',
  //   component: Layout,
  //   redirect: '/hotelManagement/hotelManagementList',
  //   meta: { title: '酒店管理', icon: 'dingdan' },
  //   children: [
  //     {
  //       path: '/hotelManagementList',
  //       component: () => import('@/views/hotelManagement/hotelManagementList/hotelManagementList'),
  //       name: 'hotelManagementList',
  //       meta: { title: '酒店管理', icon: 'guide', noCache: true }
  //     },
  //     {
  //       path: '/housingManagementList',
  //       component: () => import('@/views/hotelManagement/housingManagement/housingManagementList/housingManagementList'),
  //       name: 'housingManagementList',
  //       meta: { title: '房型管理', icon: 'guide', noCache: true }
  //     },
  //     {
  //       path: '/supplyServicesList',
  //       component: () => import('@/views/hotelManagement/supplyServices/supplyServicesList/supplyServicesList'),
  //       name: 'supplyServicesList',
  //       meta: { title: '供应服务', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/orderList',
    component: Layout,
    redirect: '/orderList/hotelList',
    meta: { title: '订单管理', icon: 'dingdan' },
    children: [
      {
        path: 'hotelList',
        component: () => import('@/views/orderList/hotelList/hotelList'),
        name: 'HotelLists',
        meta: {
          keepAlive: true,
          title: '酒店订单列表',
          icon: 'guide',
          noCache: false
        }
      }
      // ,
      // {
      //   path: 'invoiceOrderList',
      //   component: () => import('@/views/orderList/invoiceList/invoiceOrderList'),
      //   name: 'invoiceOrderList',
      //   meta: { title: '发票订单', icon: 'guide', noCache: true }
      // }
    ]
  },
  {
    path: '/orderRefundList',
    component: Layout,
    redirect: '/orderRefundList/hotelRefundList',
    meta: { title: '退款管理', icon: 'dingdan' },
    children: [
      {
        path: 'hotelRefundList',
        component: () =>
          import('@/views/orderRefundList/hotelRefundList/hotelRefundList'),
        name: 'hotelRefundList',
        meta: { title: '酒店退款', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/invoiceList',
    component: Layout,
    redirect: '/invoiceManagement/invoiceList',
    meta: { title: '发票管理', icon: 'dingdan' },
    children: [
      {
        path: '/invoiceList',
        component: () =>
          import('@/views//invoiceManagement/invoiceList/invoiceList'),
        name: 'invoiceList',
        meta: { title: '发票管理', icon: 'guide', noCache: true }
      }
    ]
  },
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/svg-icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/accountManage',
    component: Layout,
    redirect: '/accountManage/accountMaintain',
    meta: { title: '账号管理', icon: 'guide' },
    children: [
      {
        path: 'accountMaintain',
        component: () =>
          import('@/views/accountmanage/accountmaintenance/accountmaintenance'),
        name: 'accountMaintain',
        meta: { title: '账号维护', icon: 'guide', noCache: true }
      },
      {
        path: 'rolepermissions',
        component: () =>
          import('@/views/accountmanage/rolepermissions/rolepermissions'),
        name: 'rolepermissions',
        meta: { title: '角色权限', icon: 'guide', noCache: true }
      }
      // ,
      // {
      //   path: 'addrole',
      //   // component: Layout,
      //   redirect: '/addrole',
      //   hidden: true,
      //   children: [
      //     {
      //       path: '/role/addrole',
      //       component: () => import('@/views/accountmanage/rolepermissions/addrole/addrole'),
      //       name: 'addrole',
      //       meta: { title: '添加角色', noCache: true }
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '/operationLog',
    component: Layout,
    redirect: '/operationLog/log',
    meta: { title: '操作日志', icon: 'guide' },
    children: [
      {
        path: 'log',
        component: () => import('@/views/operationLog/operationLog'),
        name: 'log',
        meta: { title: '操作日志', icon: 'guide', noCache: true }
      }
    ]
  }
]
