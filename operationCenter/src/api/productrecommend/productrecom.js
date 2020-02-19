import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 产品推荐查询详情
export function getProduct(id) {
  return request({
    url: '/getProduct?id=' + id,
    method: 'get'
    // params: id
  })
}
// 产品推荐新增
export function addProduct(obj) {
  return request({
    url: '/add?redisKey=' +getToken(),
    method: 'post',
    data: obj
  })
}
// 产品推荐分页
export function getPages(param) {
  return request({
    url: '/productPages',
    method: 'get',
    params: param
  })
}

// 产品推荐编辑
export function update(obj1) {
  return request({
    url: '/update?redisKey=' +getToken(),
    method: 'post',
    data: obj1
  })
}

// 频道
export function chanel() {
  return request({
    url: '/syChannelDictionary/getAllChannelInfo',
    method: 'get'
  })
}
// 展位名称
export function booth() {
  return request({
    url: '/syBoothDictionary/getAllBoothInfo',
    method: 'get'
  })
}
//关联商品查询
export function associatePages(param) {
  return request({
    url: '/hotelNewManager/getShoppingHotelList',
    method: 'get',
    params: param
  })
}

//关联商品添加
export function addAssociatedGoods(param) {
  return request({
    url: '/syAssociatedGoods/addAssociatedGoods?redisKey=' +getToken(),
    method: 'post',
    data: param
  }) 
}
//添加城市
export function City(param) {
  return request({
    url: '/hotel/standard/cityListByKey',
    method: 'get',
    params: param
  }) 
}
//关联商品分页
export function getAssociatedGoods(param) {
  return request({
    url: '/syAssociatedGoods/getAssociatedGoods',
    method: 'get',
    params: param
  }) 
}
//关联商品编辑和删除
export function updateGood(obj) {
  return request({
    url: '/syAssociatedGoods/update?redisKey='+getToken() ,
    method: 'post',
    data: obj
  }) 
}