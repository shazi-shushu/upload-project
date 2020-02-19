import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId, getUserName, setUserName, removeUserName } from '@/utils/auth'
import { Message } from 'element-ui'
import { getLoginMsg, setLoginMsg, removeLoginMsg } from '@/utils/auth'

const user = {
  state: {
    user: '',
    userId: getUserId(),
    // userId: '2',
    status: '',
    code: '',
    token: getToken(),
    url: 'https://ctrip-manager-api.youpinsanyue.com',
    // url: 'https://test-ctrip-manager-api.youpinsanyue.com',
    newUrl: 'https://ctrip-hotel-api.youpinsanyue.com',
    // token: '123',
    name: getUserName(),
    // name: '刘世涛',
    avatar: '',
    introduction: '',
    roles: [],
    loginInfor: getLoginMsg(),
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOGININFOR: (state, loginInfor) => {
      state.loginInfor = loginInfor
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          if (response.data.code === 500) {
            Message({
              message: '账号或密码请重新输入',
              type: 'error',
              duration: 5 * 1000
            })
            // alert('用户名密码不对')
            return false
          }
          const data = response.data.data
          commit('SET_TOKEN', data.redisKey)
          commit('SET_USERID', data.userId)
          commit('SET_NAME', data.operationLoginName)
          commit('SET_LOGININFOR', response.data)
          setLoginMsg(response.data)
          setToken(data.redisKey)
          setUserId(data.userId)
          setUserName(data.operationLoginName)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getUserInfo(state.token).then(response => {
        //   // 由于mockjs 不支持自定义状态码只能这样hack
        //   if (!response.data) {
        //     reject('Verification failed, please login again.')
        //   }
        //   const data = response.data

        //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array!')
        //   }

        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   commit('SET_INTRODUCTION', data.introduction)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
        commit('SET_ROLES', 'admin')
        resolve('admin')
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      // console.log(state)
      return new Promise((resolve, reject) => {
        const param = {
          userId: state.userId,
          type: '1'
        }
        logout(param).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_NAME', [])
          commit('SET_USERID', [])
          // commit('SET_LOGININFO', {})
          removeToken()
          removeLoginMsg()
          removeUserId()
          removeUserName()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        // removeLoginInfor()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
