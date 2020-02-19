import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 新闻播报分页
export function newPages(param) {
  return request({
    url: '/syNewReport/newReportPages',
    method: 'get',
    params: param
  })
}
// 新闻播报新增
export function addNews(obj) {
  return request({
    url: '/syNewReport/add?redisKey=' + getToken(),
    method: 'post',
    data: obj
  })
}
// 新闻播报编辑
export function update(obj) {
  return request({
    url: '/syNewReport/update?redisKey=' + getToken() ,
    method: 'post',
    data: obj
  })
}
