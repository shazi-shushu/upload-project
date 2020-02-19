import request from '@/utils/request'
// import store from '@/store/index'
// const userId = store.state.user.userId
// const userName = store.state.user.name
// /invoiceAdministration/selectAll
// 查询所有常用发票接口 by 张允龙
export function getQqueryinvoiceList(param) {
  return request({
    url: '/invoiceAdministration/selectAll',
    method: 'get',
    params: param
  })
}
// /invoiceAdministration/add
// 添加发票管理接口 by 张允龙
export function addInvoiceMsg(param) {
  return request({
    url: '/invoiceAdministration/add',
    method: 'post',
    data: param
  })
}
// /invoiceAdministration/updateById
// 修改常用发票接口 by 张允龙
export function editInvoiceMsg(param) {
  return request({
    url: '/invoiceAdministration/updateById',
    method: 'post',
    data: param
  })
}
// /invoiceAdministration/{id}/
// 查询单条发票管理接口 by 张允龙
export function getInvoiceSingle(param) {
  return request({
    url: '/invoiceAdministration/' + param + '/',
    method: 'get'
  })
}
