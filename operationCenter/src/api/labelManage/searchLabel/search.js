import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 获取列表
export function getList(param) {
  return request({
    url: '/sySearchLabel/searchLabelPages',
    method: 'get',
    params: param
  })
}
//搜索标签新增
export function searchAdd(obj) {
  return request({
    url: '/sySearchLabel/searchLabelAdd?redisKey='+getToken(),
    method: 'post',
    params: obj
  })
}
//搜索标签编辑
export function searchUpdate(obj) {
  return request({
    url: '/sySearchLabel/searchLabelUpdate?redisKey='+getToken(),
    method: 'put',
    params: obj
  })
}
//搜索标签查询
export function search(param) {
  return request({
    url: '/sySearchLabel/getSearchLabel',
    method: 'get',
    params: param
  })
}
