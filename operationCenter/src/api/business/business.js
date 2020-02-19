import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 商户公告分页
export function noticePages(param) {
  return request({
    url: '/syNoticeConfig/noticeConfigPages',
    method: 'get',
    params: param
  })
}
//商户公告查看
export function noticeConfig(ncId) {
  return request({
    url: '/syNoticeConfig/noticeConfig?ncId=' + ncId,
    method: 'get',
  })
}
//商户公告新增
export function noticeAdd(obj) {
  return request({
    url: '/syNoticeConfig/add?redisKey='+getToken(),
    method: 'post',
    data: obj
  })
}
//商户公告编辑
export function noticeEdit(obj) {
  return request({
    url: '/syNoticeConfig/update?redisKey='+getToken(),
    method: 'post',
    data: obj
  })
}
//商户公告富文本上传图片
export function uploadPic(obj) {
  return request({
    url: '/support/uploadFiles',
    method: 'post',
    data: obj
  })
}
