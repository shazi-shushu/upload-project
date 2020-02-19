import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { accessVerificationLogin } from '@/api/login'
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.includes('admin')) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(getToken())
  NProgress.start() // start progress bar
  if (getToken()) {
  //   // determine if there has token
    // if (to.meta && to.meta.title && to.meta.title !== 'dashboard') {
    // const param = {
    //   authName: '',
    //   key: getToken(),
    //   platform: 0
    // }
    // accessVerificationLogin(param).then((res) => {
    //   console.log('accessVerificationLogin res')
    //   console.log(res)
    //   if (res.data.code !== 200) {
    //     // removeToken()
    //     store.dispatch('LogOut').then(() => {
    //       Message({
    //         message: '用户登陆超时',
    //         type: 'error'
    //       })
    //       if (to.path === '/login') {
    //         next()
    //       } else {
    //         next(`/login?redirect=${to.path}`)
    //         NProgress.done()
    //       }
    //     })
    //   }
    // })
    // }
    //   /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
    // NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // console.log('store.getters.roles')
      // console.log(store.getters.roles)
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetUserInfo')
          .then(res => {
            // console.log('GetUserInfo')
            // console.log(res)
            const roles = ['admin'] // note: roles must be a object array! such as: [{id: '1', name: 'editor'}, {id: '2', name: 'developer'}]
            store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
              // 根据roles权限生成可访问的路由表
              // console.log('accessRoutes')
              // console.log(accessRoutes)
              router.addRoutes(accessRoutes) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

