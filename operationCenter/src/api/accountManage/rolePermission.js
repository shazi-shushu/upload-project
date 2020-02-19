import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// import store from '@/store'
// 获取列表
export function getAccount(param) {
  return request({
    url: '/syRole/rolePages',
    method: 'get',
    params: param
  })
}
// 获取权限
export function getAuths(param) {
  return request({
    url: '/syAuth/all',
    method: 'get',
    params: param
  })
}
// 操作日志获取功能模块
export function getModel(param) {
  return request({
    url: '/syOperationLog/getAllAuthName',
    method: 'get',
    params: param
  })
}
// 禁用
export function stop(param) {
  return request({
    url: '/syRole/update?redisKey=' + getToken(),
    method: 'put',
    data: param
  })
}

// 添加
export function addData(param) {
  return request({
    url: '/syRole/add?redisKey=' + getToken(),
    method: 'post',
    data: param
  })
}

// 编辑更新
export function update(param) {
  return request({
    url: '/syRole/update?redisKey=' + getToken(),
    method: 'put',
    data: param
  })
}
