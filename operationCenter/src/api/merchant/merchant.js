import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// /syAccountMerchant/merchantPages
// 商户账号分页
export function getmerchantPages(param) {
  return request({
    url: '/syAccountMerchant/merchantPages',
    method: 'get',
    params: param
  })
}
// /syAccountMerchant/add
// 商户add
export function addmerchant(param) {
  return request({
    url: '/syAccountMerchant/add?redisKey=' + getToken(),
    method: 'post',
    data: param
  })
}
// /syAccountMerchant/getMerchant
// 商户账号单个查询
export function getMerchantSingle(param) {
  return request({
    url: '/syAccountMerchant/getMerchant',
    method: 'get',
    data: param
  })
}
// /syAccountMerchant/update
// update
export function updateMerchant(param) {
  return request({
    url: '/syAccountMerchant/update?redisKey=' + getToken(),
    method: 'post',
    data: param
  })
}
// /syAccountMerchant/getAuths
// 商户中心全部权限
export function getAuths(param) {
  return request({
    url: '/syAccountMerchant/getAuths',
    method: 'get'
  })
}
