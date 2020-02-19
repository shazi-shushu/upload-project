import Layout from '@/views/layout/Layout'
// 新增路由并跳转
export function goPages(params) {
  var orderNo = params.No.substring(params.No.length - 4)
  var pathName = params.path + params.No
  console.log(params)
  //   console.log(params.componentPath === '@/views/orderList/orderDetails/orderDetails')
  //   return false
  let flagOrder = false
  flagOrder = this.isAddRouter(params.No)
  if (flagOrder) {
    this.$router.options.routes.push({
      path: '/' + params.path + params.No,
      component: Layout,
      hidden: true,
      redirect: '/' + params.path + params.No,
      children: [
        {
          path: '/' + params.path + params.No,
          //   component: () => params.componentPath,
          //   component: () => import(params.componentPath),
          component: () => import('@/views/orderList/orderDetails/orderDetails'),
          name: '/' + params.path + params.No,
          meta: { title: params.title + '(' + orderNo + ')', noCache: true }
        }
      ]
    })
    this.$router.addRoutes(this.$router.options.routes)// 调用add
  }
  console.log(pathName)
  console.log(this.$router)
  //   console.log(params.title)
  //   return false
  this.$router.push({ path: '/' + params.path + params.No, query: params.query })
  //  console.log(this.$router)
}
export function isAddRouter(val) {
  let flag = true
  this.$router.options.routes.forEach(function(item) {
    // console.log(item.path.includes(val))
    if (item.path.includes(val)) {
      flag = false
      return false
    }
  })
  return flag
}
