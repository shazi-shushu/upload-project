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
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/authredirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "home_page",
          noCache: true,
          affix: true
        }
      }
    ]
  },
  // {
  //   path: '/businessbullmange',
  //   component: Layout,
  //   redirect: '/businessbullmange/businessBullMangeList',
  //   meta: { title: '内容管理', icon: 'dingdan' },
  //   children: [
  //     {
  //       path: 'businessBullMangeList',
  //       component: () => import('@/views/contentcenter/businessBullMangeList.vue'),
  //       name: 'businessBullMangeList',
  //       meta: { title: '商户公告管理', icon: 'guide' }
  //     },
  //     {
  //       path: '/businessbullmange/seebusinessmanage/:ncId',
  //       component: () => import('@/views/contentcenter/Seebusinessmanage.vue'),
  //       name: 'Seebusinessmanage',
  //       hidden: true,
  //       meta: { title: '公告查看', icon: 'guide' }
  //     },
  //     {
  //       path: 'hotCityPage',
  //       component: () => import('@/views/contentcenter/hotCityPage.vue'),
  //       name: 'hotCityPage',
  //       meta: { title: '热门城市配置', icon: 'guide' }
  //     },
  //     {
  //       path: 'labelMangePage',
  //       name: 'labelMangePage',
  //       component: () => import('@/views/contentcenter/labelMangePage.vue'),
  //       meta: { title: '标签管理', icon: 'guide' },
  //       children: [
  //         {
  //           path: 'pictureLabelPage',
  //           component: () => import('@/views/contentcenter/lableMange/pictureLabelPage.vue'),
  //           name: 'pictureLabelPage',
  //           meta: { title: '图文标签', icon: 'guide' }
  //         },
  //         {
  //           path: 'shoppingLabelPage',
  //           component: () => import('@/views/contentcenter/lableMange/shoppingLabelPage.vue'),
  //           name: 'shoppingLabelPage',
  //           meta: { title: '商品标签', icon: 'guide' }
  //         },
  //         {
  //           path: 'searchLabelPage',
  //           component: () => import('@/views/contentcenter/lableMange/searchLabelPage.vue'),
  //           name: 'searchLabelPage',
  //           meta: { title: '搜索标签', icon: 'guide' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'newsBroadcastPage',
  //       component: () => import('@/views/contentcenter/newsBroadcastPage.vue'),
  //       name: 'newsBroadcastPage',
  //       meta: { title: '新闻播报', icon: 'guide' }
  //     },
  //     {
  //       path: 'productRecommendPage',
  //       component: () => import('@/views/contentcenter/productRecommendPage.vue'),
  //       name: 'productRecommendPage',
  //       meta: { title: '产品推荐', icon: 'guide' }
  //     },

  //     {
  //       path: '/associatedgoods',
  //       component: () => import('@/views/contentcenter/component/Associatedgoods.vue'),
  //       name: 'Associatedgoods',
  //       hidden: true,
  //       meta: { title: '关联商品', icon: 'guide' }
  //     },
  //     {
  //       path: '/ticket',
  //       component: () => import('@/views/contentcenter/component/Ticket.vue'),
  //       name: 'Ticket',
  //       hidden: true,
  //       meta: { title: '玩转门票节', icon: 'guide' }
  //     },
  //     {
  //       path: '/mustplay',
  //       component: () => import('@/views/contentcenter/component/Mustplay.vue'),
  //       name: 'Mustplay',
  //       hidden: true,
  //       meta: { title: '人气必玩', icon: 'guide' }
  //     },
  //     {
  //       path: '/hotplay',
  //       component: () => import('@/views/contentcenter/component/Hotplay.vue'),
  //       name: 'Hotplay',
  //       hidden: true,
  //       meta: { title: '热门景点', icon: 'guide' }
  //     },
  //     {
  //       path: '/searchresult',
  //       component: () => import('@/views/contentcenter/component/Searchresult.vue'),
  //       name: 'Searchresult',
  //       hidden: true,
  //       meta: { title: '搜索结果页推荐', icon: 'guide' }
  //     },
  //     {
  //       path: '/scenicSpotPage',
  //       component: () => import('@/views/contentcenter/lableMange/scenicSpotPage.vue'),
  //       name: 'scenicSpotPage',
  //       hidden: true,
  //       meta: { title: '景区门票', icon: 'guide' }
  //     },
  //     {
  //       path: '/addSaveEditPage',
  //       component: () => import('@/views/contentcenter/lableMange/addSaveEditPage'),
  //       name: 'addSaveEditPage',
  //       hidden: true,
  //       meta: { title: '图文标签新增、编辑', icon: 'guide' }
  //     },
  //     {
  //       path: '/editShoppingPage',
  //       name: 'editShoppingPage',
  //       component: () => import('@/views/contentcenter/lableMange/editShoppingPage'),
  //       hidden: true,
  //       meta: { title: '编辑商品', icon: 'guide' }
  //     },
  //     {
  //       path: '/addEditScenicPage',
  //       component: () => import('@/views/contentcenter/lableMange/addEditScenicPage'),
  //       name: 'addEditScenicPage',
  //       hidden: true,
  //       meta: { title: '景区门票新增、编辑', icon: 'guide' }
  //     },
  //     {
  //       path: '/associatedGoodsPage',
  //       component: () => import('@/views/contentcenter/lableMange/associatedGoodsPage'),
  //       name: 'associatedGoodsPage',
  //       hidden: true,
  //       meta: { title: '关联商品', icon: 'guide' }
  //     }
  //   ]
  // },
  {
    path: "lookAdvChanneMaintenanceList",
    component: Layout,
    redirect: "/lookAdvChanneMaintenanceList",
    hidden: true,
    children: [
      {
        path:
          "/advManagement/advSpaceMaintenanceList/lookAdvChanneMaintenanceList",
        component: () =>
          import(
            "@/views/advManagement/advSpaceMaintenance/lookAdvSpaceMaintenanceList/lookAdvSpaceMaintenanceList"
          ),
        name: "advSpaceMaintenanceList",
        meta: { title: "广告查看", noCache: true }
      }
    ]
  },
  {
    path: "addAdvMaintenance",
    component: Layout,
    redirect: "/addAdvMaintenance",
    hidden: true,
    children: [
      {
        path: "/advManagement/addAdvMaintenance",
        component: () =>
          import(
            "@/views/advManagement/advMaintenance/addAdvMaintenance/addAdvMaintenance"
          ),
        name: "addAdvMaintenance",
        meta: { title: "新增广告", noCache: true }
      }
    ]
  },
  {
    path: "editAdvMaintenance",
    component: Layout,
    redirect: "/editAdvMaintenance",
    hidden: true,
    children: [
      {
        path: "/advManagement/editAdvMaintenance",
        component: () =>
          import(
            "@/views/advManagement/advMaintenance/editAdvMaintenance/editAdvMaintenance"
          ),
        name: "editAdvMaintenance",
        meta: { title: "编辑广告", noCache: true }
      }
    ]
  },

  {
    path: "hotelManagementDetails",
    component: Layout,
    redirect: "/hotelManagementDetails",
    hidden: true,
    children: [
      {
        path: "/hotelManagement/hotelManagementDetails",
        component: () =>
          import(
            "@/views/hotelManagement/hotelManagementList/hotelManagementDetails/hotelManagementDetails"
          ),
        name: "hotelManagementDetails",
        meta: { title: "查看酒店详情", noCache: true }
      }
    ]
  },
  {
    path: "housinglManagementDetails",
    component: Layout,
    redirect: "/housinglManagementDetails",
    hidden: true,
    children: [
      {
        path: "/hotelManagement/housinglManagementDetails",
        component: () =>
          import(
            "@/views/hotelManagement/housingManagement/housingManagementDetails/housinglManagementDetails"
          ),
        name: "housinglManagementDetails",
        meta: { title: "查看房型详情", noCache: true }
      }
    ]
  },
  {
    path: "addSupplyServices",
    component: Layout,
    redirect: "/addSupplyServices",
    hidden: true,
    children: [
      {
        path: "/supplyServices/addSupplyServices",
        component: () =>
          import(
            "@/views/hotelManagement/supplyServices/addSupplyServices/addSupplyServices"
          ),
        name: "addSupplyServices",
        meta: { title: "添加房型服务", noCache: true }
      }
    ]
  },
  {
    path: "setPrice",
    component: Layout,
    redirect: "/setPrice",
    hidden: true,
    children: [
      {
        path: "/supplyServices/setPrice",
        component: () =>
          import("@/views/hotelManagement/supplyServices/setPrice/setPrice"),
        name: "setPrice",
        meta: { title: "设置价格", noCache: true }
      }
    ]
  },

  {
    path: "orderDetails",
    component: Layout,
    redirect: "/orderDetails",
    hidden: true,
    children: [
      {
        path: "/orderDetails",
        component: () => import("@/views/orderList/orderDetails/orderDetails"),
        name: "orderDetails",
        meta: { title: "酒店订单详情", noCache: true }
      }
    ]
  },

  {
    path: "/addrole",
    component: Layout,
    redirect: "/addrole",
    hidden: true,
    children: [
      {
        path: "/addrole",
        component: () =>
          import("@/views/accountmanage/rolepermissions/addrole/addrole"),
        name: "addrole",
        meta: { title: "添加角色", noCache: true }
      }
    ]
  },
  {
    path: "/editrole",
    component: Layout,
    redirect: "/editrole",
    hidden: true,
    children: [
      {
        path: "/editrole",
        component: () =>
          import("@/views/accountmanage/rolepermissions/editrole/editrole"),
        name: "editrole",
        meta: { title: "添加角色", noCache: true }
      }
    ]
  },
  { path: "*", redirect: "dashboard" }
  // /////
  // ,
  // {
  //   path: '/orderDetails',
  //   component: () => import('@/views/orderList/orderDetails/orderDetails'),
  //   // name: 'orderDetails',
  //   meta: { title: '酒店订单详情（7299）', noCache: true },
  //   hidden: true
  // }
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

export const asyncRoutes = [
  // { path: '*', redirect: '/404', hidden: true }
  {
    path: "/advManagement",
    component: Layout,
    redirect: "/advManagement/advMaintenance/advMaintenanceList",
    meta: { title: "广告管理", icon: "dingdan" },
    children: [
      {
        path: "/advMaintenanceList",
        component: () =>
          import(
            "@/views/advManagement/advMaintenance/advMaintenanceList/advMaintenanceList"
          ),
        name: "advMaintenanceList",
        meta: { title: "广告维护", icon: "guide", noCache: true }
      },
      {
        path: "/advSpaceMaintenanceList",
        component: () =>
          import(
            "@/views/advManagement/advSpaceMaintenance/advSpaceMaintenanceList/advSpaceMaintenanceList"
          ),
        name: "advSpaceMaintenanceList",
        meta: { title: "广告位维护", icon: "guide", noCache: true }
      },
      {
        path: "/advChanneMaintenanceList",
        component: () =>
          import(
            "@/views/advManagement/advChannelMaintenance/advChanneMaintenanceList/advChanneMaintenanceList"
          ),
        name: "advChanneMaintenanceList",
        meta: { title: "广告渠道维护", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/hotelManagement",
    component: Layout,
    redirect: "/hotelManagement/hotelManagementList",
    meta: { title: "酒店管理", icon: "dingdan" },
    children: [
      {
        path: "/hotelManagementList",
        component: () =>
          import(
            "@/views/hotelManagement/hotelManagementList/hotelManagementList"
          ),
        name: "hotelManagementList",
        meta: { title: "酒店管理", icon: "guide", noCache: true }
      },
      {
        path: "/housingManagementList",
        component: () =>
          import(
            "@/views/hotelManagement/housingManagement/housingManagementList/housingManagementList"
          ),
        name: "housingManagementList",
        meta: { title: "房型管理", icon: "guide", noCache: true }
      },
      {
        path: "/supplyServicesList",
        component: () =>
          import(
            "@/views/hotelManagement/supplyServices/supplyServicesList/supplyServicesList"
          ),
        name: "supplyServicesList",
        meta: { title: "供应服务", icon: "guide", noCache: true }
      }
    ]
  },
  // {
  //   path: '/businessbullmange',
  //   component: Layout,
  //   redirect: '/businessbullmange/businessBullMangeList',
  //   meta: { title: '内容管理', icon: 'dingdan' },
  //   children: [
  //     {
  //       path: 'businessBullMangeList',
  //       component: () => import('@/views/contentcenter/businessBullMangeList.vue'),
  //       name: 'businessBullMangeList',
  //       meta: { title: '商户公告管理', icon: 'guide' }
  //     },
  //     {
  //       path: '/businessbullmange/seebusinessmanage/:ncId',
  //       component: () => import('@/views/contentcenter/Seebusinessmanage.vue'),
  //       name: 'Seebusinessmanage',
  //       hidden: true,
  //       meta: { title: '公告查看', icon: 'guide' }
  //     },
  //     {
  //       path: 'hotCityPage',
  //       component: () => import('@/views/contentcenter/hotCityPage.vue'),
  //       name: 'hotCityPage',
  //       meta: { title: '热门城市配置', icon: 'guide' }
  //     },
  //     {
  //       path: 'labelMangePage',
  //       name: 'labelMangePage',
  //       // component: Layout,
  //       // redirect: '/businessbullmange/labelMangePage/pictureLabelPage',
  //       component: () => import('@/views/contentcenter/labelMangePage.vue'),
  //       meta: { title: '标签管理', icon: 'guide' },
  //       children: [
  //         {
  //           path: 'pictureLabelPage',
  //           component: () => import('@/views/contentcenter/lableMange/pictureLabelPage.vue'),
  //           name: 'pictureLabelPage',
  //           meta: { title: '图文标签', icon: 'guide' }
  //         },
  //         {
  //           path: 'shoppingLabelPage',
  //           component: () => import('@/views/contentcenter/lableMange/shoppingLabelPage.vue'),
  //           name: 'shoppingLabelPage',
  //           meta: { title: '商品标签', icon: 'guide' }
  //         },
  //         {
  //           path: 'searchLabelPage',
  //           component: () => import('@/views/contentcenter/lableMange/searchLabelPage.vue'),
  //           name: 'searchLabelPage',
  //           meta: { title: '搜索标签', icon: 'guide' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'newsBroadcastPage',
  //       component: () => import('@/views/contentcenter/newsBroadcastPage.vue'),
  //       name: 'newsBroadcastPage',
  //       meta: { title: '新闻播报', icon: 'guide' }
  //     },
  //     {
  //       path: 'productRecommendPage',
  //       component: () => import('@/views/contentcenter/productRecommendPage.vue'),
  //       name: 'productRecommendPage',
  //       meta: { title: '产品推荐', icon: 'guide' }
  //     },

  //     {
  //       path: '/associatedgoods',
  //       component: () => import('@/views/contentcenter/component/Associatedgoods.vue'),
  //       name: 'Associatedgoods',
  //       hidden: true,
  //       meta: { title: '关联商品', icon: 'guide' }
  //     },
  //     {
  //       path: '/ticket',
  //       component: () => import('@/views/contentcenter/component/Ticket.vue'),
  //       name: 'Ticket',
  //       hidden: true,
  //       meta: { title: '玩转门票节', icon: 'guide' }
  //     },
  //     {
  //       path: '/mustplay',
  //       component: () => import('@/views/contentcenter/component/Mustplay.vue'),
  //       name: 'Mustplay',
  //       hidden: true,
  //       meta: { title: '人气必玩', icon: 'guide' }
  //     },
  //     {
  //       path: '/hotplay',
  //       component: () => import('@/views/contentcenter/component/Hotplay.vue'),
  //       name: 'Hotplay',
  //       hidden: true,
  //       meta: { title: '热门景点', icon: 'guide' }
  //     },
  //     {
  //       path: '/searchresult',
  //       component: () => import('@/views/contentcenter/component/Searchresult.vue'),
  //       name: 'Searchresult',
  //       hidden: true,
  //       meta: { title: '搜索结果页推荐', icon: 'guide' }
  //     },
  //     {
  //       path: '/scenicSpotPage',
  //       component: () => import('@/views/contentcenter/lableMange/scenicSpotPage.vue'),
  //       name: 'scenicSpotPage',
  //       hidden: true,
  //       meta: { title: '景区门票', icon: 'guide' }
  //     },
  //     {
  //       path: '/addSaveEditPage',
  //       component: () => import('@/views/contentcenter/lableMange/addSaveEditPage'),
  //       name: 'addSaveEditPage',
  //       hidden: true,
  //       meta: { title: '图文标签新增、编辑', icon: 'guide' }
  //     },
  //     {
  //       path: '/editShoppingPage',
  //       name: 'editShoppingPage',
  //       component: () => import('@/views/contentcenter/lableMange/editShoppingPage'),
  //       hidden: true,
  //       meta: { title: '编辑商品', icon: 'guide' }
  //     },
  //     {
  //       path: '/addEditScenicPage',
  //       component: () => import('@/views/contentcenter/lableMange/addEditScenicPage'),
  //       name: 'addEditScenicPage',
  //       hidden: true,
  //       meta: { title: '景区门票新增、编辑', icon: 'guide' }
  //     },
  //     {
  //       path: '/associatedGoodsPage',
  //       component: () => import('@/views/contentcenter/lableMange/associatedGoodsPage'),
  //       name: 'associatedGoodsPage',
  //       hidden: true,
  //       meta: { title: '关联商品', icon: 'guide' }
  //     }
  //   ]
  // },
  {
    path: "/orderList",
    component: Layout,
    redirect: "/orderList/hotelList",
    meta: { title: "订单管理", icon: "dingdan" },
    children: [
      {
        path: "hotelList",
        component: () => import("@/views/orderList/hotelList/hotelList"),
        name: "hotelList",
        meta: {
          title: "酒店订单列表",
          icon: "guide",
          noCache: false,
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/orderRefundList",
    component: Layout,
    redirect: "/orderRefundList/hotelRefundList",
    meta: { title: "退款管理", icon: "dingdan" },
    children: [
      {
        path: "hotelRefundList",
        component: () =>
          import("@/views/orderRefundList/hotelRefundList/hotelRefundList"),
        name: "hotelRefundList",
        meta: { title: "酒店退款", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "orderRefundDetails",
    component: Layout,
    redirect: "/orderRefundDetails",
    hidden: true,
    children: [
      {
        path: "/orderRefundDetails",
        component: () =>
          import(
            "@/views/orderRefundList/orderRefundDetails/orderRefundDetails"
          ),
        name: "orderRefundDetails",
        meta: { title: "酒店退款详情", noCache: true }
      }
    ]
  },
  {
    path: "/merchantMaintenance",
    component: Layout,
    redirect: "/merchantMaintenance/merchantMaintenanceList",
    meta: { title: "商户管理", icon: "dingdan" },
    children: [
      {
        path: "merchantMaintenanceList",
        component: () =>
          import(
            "@/views/merchantManagement/merchantMaintenance/merchantMaintenanceList/merchantMaintenanceList"
          ),
        name: "merchantMaintenanceList",
        meta: { title: "商户维护", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "setMerchantMaintenance",
    component: Layout,
    redirect: "/setMerchantMaintenance",
    hidden: true,
    children: [
      {
        path: "/merchantMaintenance/setMerchantMaintenance",
        component: () =>
          import(
            "@/views/merchantManagement/merchantMaintenance/setMerchantMaintenance/setMerchantMaintenance"
          ),
        name: "setMerchantMaintenance",
        meta: { title: "添加商户", noCache: true }
      }
    ]
  },
  {
    path: "editMerchantMaintenance",
    component: Layout,
    redirect: "/editMerchantMaintenance",
    hidden: true,
    children: [
      {
        path: "/merchantMaintenance/editMerchantMaintenance",
        component: () =>
          import(
            "@/views/merchantManagement/merchantMaintenance/editMerchantMaintenance/editMerchantMaintenance"
          ),
        name: "editMerchantMaintenance",
        meta: { title: "编辑商户", noCache: true }
      }
    ]
  },
  {
    path: "/accountManage",
    component: Layout,
    redirect: "/accountManage/accountMaintain",
    meta: { title: "账号管理", icon: "guide" },
    children: [
      {
        path: "accountMaintain",
        component: () =>
          import("@/views/accountmanage/accountmaintenance/accountmaintenance"),
        name: "accountMaintain",
        meta: { title: "账号维护", icon: "guide", noCache: true }
      },
      {
        path: "rolepermissions",
        component: () =>
          import("@/views/accountmanage/rolepermissions/rolepermissions"),
        name: "rolepermissions",
        meta: { title: "角色权限", icon: "guide", noCache: true }
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
    path: "/operationLog",
    component: Layout,
    redirect: "/operationLog/log",
    meta: { title: "操作日志", icon: "guide" },
    children: [
      {
        path: "log",
        component: () => import("@/views/operationLog/operationLog"),
        name: "log",
        meta: { title: "操作日志", icon: "guide", noCache: true }
      }
    ]
  }

  // { path: '*', redirect: '/orderList/hotelList', meta: { title: '酒店订单列表', icon: 'dingdan' }}
];
