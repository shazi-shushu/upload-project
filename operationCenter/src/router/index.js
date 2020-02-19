import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";

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
export const constantRoutes = [{
  path: "/redirect",
  component: Layout,
  hidden: true,
  children: [{
    path: "/redirect/:path*",
    component: () => import("@/views/redirect/index")
  }]
}, ];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
});

export const asyncRoutes = [
  // { path: '*', redirect: '/404', hidden: true }
  {
    path: "/advManagement",
    component: Layout,
    redirect: "/advManagement/advMaintenance/advMaintenanceList",
    meta: {
      title: "广告管理",
      icon: "dingdan"
    },
    children: [{
        path: "/advMaintenanceList",
        component: () =>
          import(
            "@/views/advManagement/advMaintenance/advMaintenanceList/advMaintenanceList"
          ),
        name: "advMaintenanceList",
        meta: {
          title: "广告维护",
          icon: "guide",
          noCache: true
        }
      },
      {
        path: "/advSpaceMaintenanceList",
        component: () =>
          import(
            "@/views/advManagement/advSpaceMaintenance/advSpaceMaintenanceList/advSpaceMaintenanceList"
          ),
        name: "advSpaceMaintenanceList",
        meta: {
          title: "广告位维护",
          icon: "guide",
          noCache: true
        }
      },
      {
        path: "/advChanneMaintenanceList",
        component: () =>
          import(
            "@/views/advManagement/advChannelMaintenance/advChanneMaintenanceList/advChanneMaintenanceList"
          ),
        name: "advChanneMaintenanceList",
        meta: {
          title: "广告渠道维护",
          icon: "guide",
          noCache: true
        }
      }
    ]
  }
  // { path: '*', redirect: '/orderList/hotelList', meta: { title: '酒店订单列表', icon: 'dingdan' }}
];
