import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// import store from '@/store/index'

// const userId = store.state.user.userId
// const userName = store.state.user.name
// /syAdvertChannel/queryAdvertChannel
// 查询广告渠道接口 可测试
export function getAdvChanneList(param) {
  return request({
    url: '/syAdvertChannel/queryAdvertChannel',
    method: 'get',
    params: param
  })
}
// /syAdvertChannel/getAdvertChannel
// 获取单条广告渠道信息接口 可测试
export function getAdvChanneSingle(param) {
  return request({
    url: '/syAdvertChannel/getAdvertChannel',
    method: 'get',
    params: param
  })
}
// /syAdvertChannel/updateAdvertChannel
// 修改广告渠道接口 可测试
export function updateAdvChanneSingle(param) {
  return request({
    url: '/syAdvertChannel/updateAdvertChannel?redisKey=' + getToken(),
    method: 'post',
    data: param
  })
}
// /syAdvertChannel/addAdvertChannel
// 添加广告渠道接口 可测试
export function addAdvChanneSingle(param) {
  return request({
    url: '/syAdvertChannel/addAdvertChannel?redisKey=' + getToken(),
    method: 'post',
    data: param
  })
}
// /syAdvertChannel/updateT
// 修改广告渠道状态接口 可测试
export function changeAdvChanneSingle(param) {
  return request({
    url: '/syAdvertChannel/updateT',
    method: 'get',
    params: param
  })
}
// /syAdvertPoint/queryAdvertPoint
// 查询全部广告位数据接口 可测试
export function getAdvPoint(param) {
  return request({
    url: '/syAdvertPoint/queryAdvertPoint',
    method: 'get',
    params: param
  })
}
// /syAdvertPoint/getAdvertPoint
// 获取单条广告位信息接口 可测试
export function getAdvPointSingle(param) {
  return request({
    url: '/syAdvertPoint/getAdvertPoint',
    method: 'get',
    params: param
  })
}
// /syAdvertPoint/updateAdvertPoint
// 修改广告位接口 可测试
export function updateAdvPointSingle(param) {
  return request({
    url: '/syAdvertPoint/updateAdvertPoint?redisKey=' + getToken(),
    method: 'post',
    data: param
  })
}
// /syAdvertPoint/addAdvertPoint
// 添加广告位接口 可测试
export function addAdvPointSingle(param) {
  return request({
    url: '/syAdvertPoint/addAdvertPoint?redisKey=' + getToken(),
    method: 'post',
    data: param
  })
}
// /syAdvertPoint/updateDeleteFlag
// 修改广告位状态接口 可测试
export function changeAdvPointSingle(param) {
  return request({
    url: '/syAdvertPoint/updateDeleteFlag',
    method: 'get',
    params: param
  })
}
// /syAdvertChannel/getAllAdvertChannelName
// 查询广告渠道名称及id接口 可测试
export function getAllAdvertChannelName(param) {
  return request({
    url: '/syAdvertChannel/getAllAdvertChannelName',
    method: 'get',
    params: param
  })
}
// /syAdvertPoint/getAdvertPoint
// 获取单条广告位信息接口 可测试
export function getAdvertPointList(param) {
  return request({
    url: '/syAdvertPoint/getAdvertPoint',
    method: 'get',
    params: param
  })
}
// sy-advert-controller
// 广告入口
// /syAdvert/queryAdvert
// 查询全部广告数据接口 可测试
export function getQqueryAdvertPoint(param) {
  return request({
    url: '/syAdvert/queryAdvert',
    method: 'get',
    params: param
  })
}
// /syAdvert/getAdvertById
// 查询单条广告信息接口 可测试
export function getAdvertPointSingle(param) {
  return request({
    url: '/syAdvert/getAdvertById',
    method: 'get',
    params: param
  })
}
// /syAdvertPoint/getAdvertPointById
// 查询广告位名称接口 可测试
export function getAdvertPointByIdSingle(param) {
  return request({
    url: '/syAdvertPoint/getAdvertPointById',
    method: 'get',
    params: param
  })
}
// /syAdvert/updateAdvertFlag
// 修改广告状态接口 可测试
export function updateDeleteFlagSingle(param) {
  return request({
    url: '/syAdvert/updateAdvertFlag',
    method: 'get',
    params: param
  })
}
// /syAdvert/getAdvertById
// 查询单条广告信息接口 可测试
export function getAdvertByIdSingle(param) {
  return request({
    url: '/syAdvert/getAdvertById',
    method: 'get',
    params: param
  })
}
// /syAdvert/addAdvert
// 添加广告接口 可测试
export function addAdvertdSingle(param) {
  return request({
    url: '/syAdvert/addAdvert',
    method: 'post',
    data: param
  })
}
