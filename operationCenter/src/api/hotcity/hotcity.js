import request from '@/utils/request'
import { getToken } from '@/utils/auth'
//热门城市列表
export function hotList(param) {
    return request({
      url: '/syHotcityConfig/list',
      method: 'get',
      params: param
    })
}
//热门城市新增
export function hotAdd(obj) {
    return request({
      url: '/syHotcityConfig/add?redisKey=' +getToken(),
      method: 'post',
      data: obj
    })
}
export function hotUpdate(obj) {
    return request({
      url: '/syHotcityConfig/update',
      method: 'post',
      data: obj
    })
}