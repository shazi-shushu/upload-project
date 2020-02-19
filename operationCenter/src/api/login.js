import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    userLoginName: username,
    passWord: password,
    type: '1'
  }
  return request({
    url: '/userLogin/loginClient',
    method: 'post',
    params: data
  })
}

export function logout(param) {
  // console.log(param)
  return request({
    url: '/userLogin/logout',
    method: 'post',
    params: param
  })
}

export function getUserInfo(token) {
  return request({
    url: '/common/accessVerification',
    method: 'get',
    params: { token }
  })
}
// /userLogin/updatePassWord
// 修改密码接口 可测试
export function changePassword(param) {
  return request({
    url: '/userLogin/updatePassWord',
    method: 'post',
    params: param
  })
}
// /common/accessVerification
// accessVerification
export function accessVerificationLogin(param) {
  return request({
    url: '/common/accessVerification',
    method: 'get',
    params: param
  })
}
