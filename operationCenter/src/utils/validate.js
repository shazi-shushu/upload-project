/**
 * Created by jiachenpan on 16/11/18.
 */

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return str.trim().length >= 0
}

/* 合法uri*/
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/* 小写字母*/
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
// 校验保留两位小数金额
export function isMoney(money) {
  var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  if (reg.test(money)) {
    return true
  } else {
    return false
  }
}
// 日期格式化返回 2019-04-01
export function getGangDate(dates) {
  if (dates) {
    let dateNew = ''
    // console.log(dates)
    // console.log(dates.indexof('-'))
    // if (dates.indexof('-')) {
    dateNew = new Date(dates)
    // } else {
    // dateNew = new Date(dates.replace(/-/g, '/'))
    // }
    const y = dateNew.getFullYear()
    const m = dateNew.getMonth() + 1
    const d = dateNew.getDate()
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
  }
}
// 日期格式化返回 12:11:30
export function getMiniteDate(dates) {
  if (dates) {
    const dateNew = new Date(dates)
    const h = dateNew.getHours()
    const f = dateNew.getMinutes()
    const mm = dateNew.getSeconds()
    return h + ':' + (f < 10 ? '0' + f : f) + ':' + (mm < 10 ? '0' + mm : mm)
  }
}
// 日期格式化返回 2019-04-01 12:11:23
export function getGangDateMiao(dates) {
  if (dates) {
    let newDate = ''
    if (dates.length > 18) {
      newDate = dates.substr(0, 19)
    } else {
      newDate = dates
    }
    // console.log(dates)
    // console.log(newDate.trim())
    const dateNew = new Date(newDate.replace(/-/g, '/'))
    // console.log(dateNew)
    const y = dateNew.getFullYear()
    const m = dateNew.getMonth() + 1
    const d = dateNew.getDate()
    const h = dateNew.getHours()
    const f = dateNew.getMinutes()
    const mm = dateNew.getSeconds()
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (f < 10 ? '0' + f : f) + ':' + (mm < 10 ? '0' + mm : mm)
  }
}
export function getGangDateMiaoShi(dates) {
  const dateNew = new Date(dates)
  // console.log(dateNew)
  const y = dateNew.getFullYear()
  const m = dateNew.getMonth() + 1
  const d = dateNew.getDate()
  const h = dateNew.getHours()
  const f = dateNew.getMinutes()
  const mm = dateNew.getSeconds()
  return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (f < 10 ? '0' + f : f) + ':' + (mm < 10 ? '0' + mm : mm)
}
// 日期格式化返回2019年04月01日
export function getWenDate(dates) {
  const dateNew = new Date(dates.replace(/-/g, '/'))
  const y = dateNew.getFullYear()
  const m = dateNew.getMonth() + 1
  const d = dateNew.getDate()
  return y + '年' + (m < 10 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日'
}

