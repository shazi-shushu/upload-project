import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 图文标签列表
export function pictureLabel(param) {
  return request({
    url: '/syGraphic/queryGraphic',
    method: 'get',
    data: param
  })
}
// 添加图文标签
export function addLabel(param) {
  return request({
    url: '/syGraphic/addSyGraphic2',
    method: 'get',
    data: param
  })
}
// 编辑图文标签
export function editLabel(param) {
  return request({
    url: '/syGraphic/updateGraphic',
    method: 'post',
    data: param
  })
}
// 商品标签列表
export function commodityPage(param) {
  return request({
    url: '/syCommodityLabelInner/commodityLabelInnerPages',
    method: 'get',
    data: param
  })
}
// 商品标签关联商品添加
export function allAdd(param) {
  return request({
    url: '/syCommodityLabelInner/commodityLabelInnerListAdd?redisKey=' + getToken(),
    method: 'post',
    data: param
  })
}
//图文启用停用改变状态接口
export function updateStatus(param){
  return request({
    url:"/syGraphic/updateStatus",
    methods:"get",
    data:param
  })
}
//景区查询列表
export function scenicList(param) {
  return request({
    url:"/syGraphicScenic/queryGraphic",
    methods:"get",
    params:param
  })
}
//景区停用启用接口
export function changeStatus(param){
  return request({
    url:"/syGraphicScenic/updateStatus",
    methods:"get",
    data:param
  })
}
//景区新增接口
export function addScenic(param){
  return request({
    url:"/syGraphicScenic/addSyGraphicScenic2",
    methods:"post",
    data:param
  })
}
//景区编辑保存接口
export function editScenic(param) {
  return request({
    url:"/syGraphicScenic/updateSyGraphicScenic2",
    methods:"post",
    data:param
  })
}
export function editFanScenic(param){
  return request({
    url:"/syGraphicScenic/getGraphicScenicById",
    methods:"get",
    data:param
  })
}

