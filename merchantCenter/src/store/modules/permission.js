import { asyncRoutes, constantRoutes } from '@/router'
import { getLoginMsg } from '@/utils/auth'
// import router from '../../router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
export function filterRoutes(routes) {
  if (JSON.parse(getLoginMsg()).data.auths) {
    const res = []
    const rolesMsg = JSON.parse(getLoginMsg()).data.auths
    rolesMsg.forEach(item => {
      // if(!arrRoles.includes(item.authName) && !arrRoles.includes(item.authName)){
      res.push(item.authName)
      res.push(item.menuName)
      // }
    })
    const arrRoles = [...new Set(res)]
    // 发票订单
    // arrRoles.push('发票订单')
    // console.log(arrRoles)
    // console.log(rolesMsg)
    routes.forEach(route => {
      const tmp = { ...route }
      if (!route.hidden) {
        // const arrRoles = ['产品推荐', '新闻播报', '图文标签', '广告维护', '广告位维护', '广告频道维护', '广告管理', '发票订单', '酒店订单列表']
        const flag = arrRoles.includes(route.meta.title)
        if (flag) {
          route.hidden = false
        } else {
          route.hidden = true
        }
        if (tmp.children) {
          tmp.children = filterRoutes(tmp.children)
        }
        // res.push(tmp)
      }
    })
  }
  return routes
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      // console.log(routes)
      // console.log('------')
      // console.log(constantRoutes)
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        var newRouter = filterRoutes(accessedRoutes)
        // console.log(newRouter)
        // router.addRoutes(newRouter)
        commit('SET_ROUTES', newRouter)
        resolve(newRouter)
      })
    }
  }
}

export default permission
