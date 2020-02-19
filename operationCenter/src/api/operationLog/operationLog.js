import request from '@/utils/request'
// import store from '@/store'
// 查找
// export function searchData(param) {
//   return request({
//     url: '/syAccountOperation/getMerchant',
//     method: 'get',
//     params: param
//   })
// }
// 获取列表
export function getData(param) {
  console.log(param)
  return request({
    url: '/syOperationLog/operationLogPages',
    method: 'get',
    params: param
  })
}

// 添加账户
// import axios from 'axios'
// import qs from 'Qs'
// let data = {"code":"1234","name":"yyyy"};

// export function addAccount(param) {
//   console.log(123)
//   console.log(store)
//   console.log(param)
//   const datas = {
//     redisKey: 'userId100',
//     view: param
//   }
//   axios.post(`https://biztriptest.youpinsanyue.com/tripManager/syAccountOperation/add`, datas)
//     .then(res => {
//       console.log(11111111)
//       console.log(res)
//     })
// }

// export function addAccount(param) {
//   console.log(123)
//   console.log(param)
//   return request({
//     url: '/syAccountOperation/add',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded, multipart/form-data'
//     },
//     dataType: 'json',
//     method: 'post',
//     data: param
//   })
// }
// 删除更新数据
// export function updateAccount(param) {
//   return request({
//     url: '/syAccountOperation/update',
//     method: 'post',
//     params: param
//   })
// }
// 查询所有运营中心角色数据
// export function getRole(param) {
//   return request({
//     url: '/syRole/selectRoleNames',
//     method: 'get',
//     params: param
//   })
// }
