import Cookies from 'js-cookie'

const TokenKey = 'operation-Token'
const UserId = 'operation-userid'
const userName = 'operation-username'
const loginMsg = 'loginMsg'
export function getLoginMsg() {
  return Cookies.get(loginMsg)
}

export function setLoginMsg(lMsg) {
  return Cookies.set(loginMsg, lMsg)
}

export function removeLoginMsg() {
  return Cookies.remove(loginMsg)
}
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getUserId() {
  return Cookies.get(UserId)
}

export function setUserId(id) {
  return Cookies.set(UserId, id)
}

export function removeUserId() {
  return Cookies.remove(UserId)
}
export function getUserName() {
  return Cookies.get(userName)
}

export function setUserName(name) {
  return Cookies.set(userName, name)
}

export function removeUserName() {
  return Cookies.remove(userName)
}
