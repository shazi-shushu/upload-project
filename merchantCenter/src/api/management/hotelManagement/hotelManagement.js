import request from '@/utils/request'
// import axios from 'axios'
// /hotelManager/getHotelManagerInfo
// Manager酒店管理列表
export function getHotelManagementList(param) {
  return request({
    url: '/hotelManager/getHotelManagerInfo',
    method: 'get',
    params: param
  })
}
// /hotelManager/getHotelManaRatePlan
// Manager房型价格信息列表 可测试
export function getHotelHousingList(param) {
  return request({
    url: '/hotelManager/getHotelManaRatePlan',
    method: 'get',
    params: param
  })
}
// /hotelManager/getRatePlanById
// 查询价格详情列表 (可测试)
export function getHotelSupplyServerList(param) {
  return request({
    url: '/hotelManager/getRatePlanById',
    method: 'get',
    params: param
  })
}
// /hotelManager/getHotelInfoDetail
// 查看商户中心酒店详情
export function getHotelInfoDetail(param) {
  return request({
    url: '/hotelManager/getHotelInfoDetail',
    method: 'get',
    params: param
  })
}
