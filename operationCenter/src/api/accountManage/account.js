import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// import store from '@/store'
// 查找
export function searchData(param) {
  return request({
    url: '/syAccountOperation/getMerchant',
    method: 'get',
    params: param
  })
}
// 获取列表
export function getAccount(param) {
  return request({
    url: '/syAccountOperation/accountOperationPages?redisKey=' + getToken(),
    method: 'get',
    params: param
  })
}
// 添加账户
export function addAccount(param) {
  return request({
    url: '/syAccountOperation/add?redisKey=' + getToken(),
    method: 'post',
    data: param
  })
}

// 删除更新数据
export function updateAccount(param) {
  return request({
    url: '/syAccountOperation/update?redisKey=' + getToken(),
    method: 'post',
    params: param
  })
}
// 查询所有运营中心角色数据
export function getRole(param) {
  return request({
    url: '/syRole/selectRoleNames',
    method: 'get',
    params: param
  })
}
