import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId, getUserName, setUserName, removeUserName, getMerchantId, setMerchantId, removeMerchantId } from '@/utils/auth'
import { getLoginMsg, setLoginMsg, removeLoginMsg } from '@/utils/auth'
import { Message } from 'element-ui'

const user = {
  state: {
    user: '',
    userId: getUserId(),
    merchantId: getMerchantId(),
    // userId: '2',
    status: '',
    code: '',
    token: getToken(),
    url: 'https://ctrip-manager-api.youpinsanyue.com',
    // url: 'https://test-ctrip-manager-api.youpinsanyue.com',
    newUrl: 'http://ctrip-hotel-api.youpinsanyue.com', // 目前尚未使用
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
    SET_MERCHANTID: (state, merchantId) => {
      state.merchantId = merchantId
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
            // console.log(this)
            // alert('用户名密码不对')
            return false
          }
          const data = response.data.data
          commit('SET_TOKEN', data.redisKey)
          commit('SET_USERID', data.userId)
          // 商户id merchantId
          if (response.data.message === '商户子账号登录成功') {
            commit('SET_MERCHANTID', data.merchantId)
          }

          commit('SET_LOGININFOR', response.data)
          setLoginMsg(response.data)
          setToken(data.redisKey)
          setUserId(data.userId)
          setMerchantId(data.merchantId)
          // setUserName(data.userLoginName)
          // lwd 改
          setUserName(username)
          commit('SET_NAME', username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
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
      return new Promise((resolve, reject) => {
        const param = {
          userId: state.userId,
          type: '0'
        }
        logout(param).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_NAME', [])
          commit('SET_USERID', [])
          // commit('SET_LOGININFO', {})
          removeToken()
          removeUserId()
          removeLoginMsg()
          removeMerchantId()
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
