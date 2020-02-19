import request from '@/utils/request'
import axios from 'axios'
import store from '@/store/index'
const rootUrl = store.state.user.newUrl
// GET /hotelInfo/hotelList
// Manager酒店管理列表
export function getHotelManagementList(param) {
  return request({
    // url: rootUrl + '/hotelInfo/hotelList',
    url: '/hotelNewManager/getHotelList',
    method: 'get',
    params: param
  })
}
// /hotel/standard/cityListByKey
// 根据关键字查询城市列表,传空时查询全国所有城市 （可测试）
export function getcityList(param) {
  return request({
    // url: rootUrl + '/hotelInfo/hotelList',
    url: '/hotel/standard/cityListByKey?keyWords=',
    method: 'get'
  })
}
// /hotelNewManager/findConstantsCategory
// 根据分类码查询酒店集团和品牌数据 可测试
export function getConstantsCategory(param) {
  return request({
    url: '/hotelNewManager/findConstantsCategory?code=' + param,
    method: 'get'
  })
}
// GET /roomType/findPage
// 房型列表查询(乔亚涛)
// export function getHotelHousingList(param) {
//   return axios({
//     url: rootUrl + '/roomType/findPage',
//     method: 'get',
//     params: param
//   })
// }
// /roomType/roomTypeList
// 房型列表查询
export function getHotelHousingList(param) {
  return request({
    url: '/roomType/roomTypeList',
    method: 'post',
    data: param
  })
}
// GET /services/findPage
// 服务列表查询(乔亚涛
export function getHotelSupplyServerList(param) {
  return axios({
    url: rootUrl + '/services/findPage',
    method: 'get',
    params: param
  })
}
// /hotelManager/getHotelInfoDetail
// 查看商户中心酒店详情
export function getHotelInfoDetail(param) {
  return request({
    // url: '/hotelManager/getHotelInfoDetail',
    url: '/hotelNewManager/getHotelInfoById?hotelId=' + param.hotelId,
    method: 'get'
    // params: param.hotelId
  })
}
// /hotelNewManager/getHotelFacilityList
// 查询酒店服务设施
export function getHotelFacilityList(param) {
  return request({
    url: '/hotelNewManager/getHotelFacilityList?hotelId=' + param.hotelId,
    method: 'get'
  })
}

// /hotelNewManager/getFindHotelImgs
// 酒店图片分类统计 可测试
export function getFindHotelImgs(param) {
  return request({
    url: '/hotelNewManager/getFindHotelImgs?hotelId=' + param.hotelId,
    method: 'get'
  })
}
// /hotelNewManager/getFindHotelImgsByType
// 按分类查询酒店图片 可测试
export function getFindHotelImgsByType(param) {
  return request({
    url: '/hotelNewManager/getFindHotelImgsByType',
    method: 'get',
    params: param
  })
}
// /hotelNewManager/findRoomTypesImgs
// 酒店详情查询房型图片
export function getRoomTypesImgs(param) {
  return request({
    url: '/hotelNewManager/findRoomTypesImgs?hotelId=' + param,
    method: 'get'
  })
}
// /roomType/roomTypeRoomTypeFacility
// 房型设施
export function getRoomTypeFacility(param) {
  return request({
    url: '/roomType/roomTypeRoomTypeFacility?roomTypeId=' + param,
    method: 'get'
  })
}
