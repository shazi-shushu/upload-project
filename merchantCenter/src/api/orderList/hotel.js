import request from '@/utils/request'
import store from '@/store/index'
// GET /orders/hotel
// 用户酒店订单列表-web后台
// { orderNo, linkPhone, isPay, status, queryType, startTime, endTime, pageNo, pageSize, platform }
const userId = store.state.user.userId
const userName = store.state.user.name
export function getOrderList(param) {
  return request({
    url: '/orders/manager/hotel',
    method: 'get',
    params: param
  })
}
// /export/exportOrderInfoToExcel
// 酒店订单导出
// export function exportOrderList(param) {
//   return request({
//     url: '/export/exportOrderInfoToExcel',
//     method: 'get',
//     responseType: 'blob',
//     params: param
//   })
// }
export function exportOrderList(params) {
  // var url = process.env.BASE_API + 'hotel/exportRefundByQuery?';
  var url = process.env.BASE_API + '/export/exportOrderInfoToExcel?'
  for (const key in params) {
    url += key + '=' + params[key] + '&'
  }
  window.open(url, false)
}

// 酒店退款单导出
// export function exportRefundList(param) {
//   return request({
//     url: '/export/exportOrderRefundToExcel',
//     method: 'get',
//     params: param
//   })
// }
export function exportRefundList(params) {
  var url = process.env.BASE_API + '/export/exportOrderRefundToExcel?'
  for (const key in params) {
    url += key + '=' + params[key] + '&'
  }
  window.open(url, false)
}
// 获取酒店订单详情
export function getOrderDetails(orderNo) {
  return request({
    url: '/orders/manager/hotel/' + orderNo,
    method: 'get'
  })
}
// 获取酒店退款列表
export function getOrderRefundList(param) {
  return request({
    url: '/refundList',
    method: 'get',
    params: param
  })
}
// 获取酒店退款详情
export function getOrderRefundDetails(param) {
  return request({
    url: '/refundDetail',
    method: 'get',
    params: param
  })
}
// 获取酒店日志
export function getHotelReplyMessage(param) {
  param.outUserId = userId
  return request({
    url: '/orders/operationlogs',
    method: 'get',
    params: param
  })
}
// 保存酒店详情备注信息
export function saveHotelRemarkMessage(param) {
  param.outUserId = userId
  param.userName = userName
  return request({
    url: '/orders/manager/messager/platformMessage',
    method: 'get',
    params: param
    // ,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'outUserId': param.outUserId
    // }
  })
}
// 保存商户卖家回复信息
export function saveHotelSellMessage(param) {
  param.userName = userName
  param.outUserId = userId
  return request({
    url: '/orders/manager/messager/sellerMessage',
    method: 'get',
    params: param
    // ,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'outUserId': param.outUserId
    // }
  })
}
// GET /agreeRefund 商户同意退款
export function agreeRefundMessage(param) {
  param.outUserId = userId
  return request({
    url: '/agreeRefund',
    method: 'get',
    params: param
    // ,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'outUserId': param.outUserId
    // }
  })
}
// GET /rejectRefund 商户拒绝退款
export function rejectRefundMessage(param) {
  param.outUserId = userId
  return request({
    url: '/rejectRefund',
    method: 'get',
    params: param
    // ,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'outUserId': param.outUserId
    // }
  })
}
