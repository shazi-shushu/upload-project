import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// import store from '@/store'
// 添加
export function addLabelPage(param) {
  if (param.labelId) {
    return request({
      url: '/syCommodityLabel/commodityLabelUpdate?redisKey=' + getToken(),
      method: 'put',
      data: param
    })
  } else {
    return request({
      url: '/syCommodityLabel/commodityLabelAdd?redisKey=' + getToken(),
      method: 'post',
      data: param
    })
  }
}
// 更新
export function update(param) {
  return request({
    url: '/syAccountOperation/accountOperationPages?redisKey=' + getToken(),
    method: 'get',
    params: param
  })
}

// 分页
export function newPages(param, pageNum, pageSize) {
  return request({
    url: '/syCommodityLabel/commodityLabelPages?pageNum=' + pageNum + '&pageSize=' + pageSize,
    method: 'get',
    timeout: 0,
    params: param
  })
}

// 删除更新数据
export function updateAccount(param) {
  return request({
    url: '/syAccountOperation/update',
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
