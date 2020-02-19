<template>
  <div class="list_content">
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>订单编号</th>
          <th>订单状态</th>
          <!-- <th>商户名称</th> -->
          <th>酒店ID</th>
          <th>酒店名称</th>
          <th>入住时间</th>
          <th>离店时间</th>
          <th>订单金额</th>
          <th>退款</th>
          <th>发票</th>
          <th>下单时间</th>
          <th>支付时间</th>
          <th>联系人</th>
          <th>联系人手机</th>
          <th>订单来源</th>
          <!-- <th>业务板块</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list" :key="index">
          <td>{{ index+1 }}</td>
          <!-- <td class="orderNo"> <router-link :to="{path:'/orderDetails',query:{orderNo:item.orderNo}}">{{item.orderNo}}</router-link></td> -->
          <td class="orderNo" @click="goDetails(item.orderNo)">{{ item.orderNo }}</td>
          <!-- <td class="orderNo" @click="goPage({title:'酒店订单详情',path:'orderDetails',componentPath:'@/views/orderList/orderDetails/orderDetails',No:item.orderNo,query:{orderNo:item.orderNo}})">{{item.orderNo}}</td> -->
          <td>{{ item.status | statusType }}</td>
          <!-- <td>{{item.merchantName}}</td> -->
          <td>{{ item.hotelId }}</td>
          <td :title="item.hotelChnName">{{ item.hotelChnName }}</td>
          <td>{{ item.checkInDate }}</td>
          <td>{{ item.checkOutDate }}</td>
          <td>¥{{ item.orderAmountTotal }}</td>
          <td>{{ item.hasRefund | hasRefuns }}</td>
          <td>{{ item.isInvoice | isInvoices }}</td>
          <td>{{ item.createTime | getGangDateMiaos }}</td>
          <td>{{ item.payTime | getGangDateMiaos }}</td>
          <td>{{ item.linkMan }}</td>
          <td>{{ item.linkPhone }}</td>
          <td>{{ item.platform | platforms }}</td>
          <!-- <td>{{item.channel | channels}}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
/* Layout */
import Layout from '@/views/layout/Layout'
import { goPages } from '@/api/common.js'
import { getGangDateMiao } from '@/utils/validate'
export default {
  filters: {
    getGangDateMiaos: getGangDateMiao,
    hasRefuns: function(val) {
      // console.log(val)
      return val === true ? '有' : '-'
    },
    isInvoices: function(val) {
      // console.log(val)
      return val === true ? '需要' : '不需要'
    },
    platforms: function(val) {
      const platformList = { 1: '融e购', 2: '融e联' }
      return platformList[val]
    },
    channels: function(val) {
      // 业务板块:1=旅游频道 2=E差旅
      const channelList = { 1: '旅游频道', 2: 'E差旅' }
      return channelList[val]
    },
    statusType: function(val) {
      // 订单状态：0-待付款;1-确认中;2-预订成功;4-订单关闭;5-已取消;9-退款申请中;10-退款成功;11-退款失败;12-预订失败
      // 订单状态：订单状态：0-待付款;1-付款成功;2-预定成功;3-已完成;4-已关闭;5-已取消;9-退款中;10-已退款;11-退款失败;12-预定失败

      // const statusTypeObj = { 0: '待付款', 1: '确认中', 2: '预定成功', 3: '已完成', 4: '订单关闭', 5: '已取消', 9: '退款申请中', 10: '退款成功', 11: '退款失败', 12: '预定失败' }
      const statusTypeObj = { 1: '待付款', 2: '确认中', 3: '待确认收货', 4: '订单关闭', 5: '订单取消', 6: '预订成功', 7: '预订失败' }
      return statusTypeObj[val]
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goPage: goPages,
    goDetails(val) {
      var orderNo = val.substring(val.length - 4)
      // console.log()
      let flagOrder = false
      flagOrder = this.isAddRouter(val)
      if (flagOrder) {
        this.$router.options.routes.push({
          path: '/orderDetails' + val,
          component: Layout,
          hidden: true,
          redirect: '/orderDetails' + val,
          children: [
            {
              path: '/orderDetails' + val,
              component: () => import('@/views/orderList/orderDetails/orderDetails'),
              name: 'orderDetails' + val,
              meta: { title: '酒店订单详情(' + orderNo + ')', noCache: true }
            }
          ]
        })
        this.$router.addRoutes(this.$router.options.routes)// 调用add
      }
      this.$router.push({ path: '/orderDetails' + val, query: { orderNo: val }})
      //  console.log(this.$router)
    },
    isAddRouter(val) {
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
  }
}
</script>
<style scoped>
    .list_content{
        overflow-x:scroll;
        width: 100%;
    }
    table{border-collapse: collapse;}
    table td,th{
        border: 1px solid #dfdfdf;
        white-space: nowrap;
        }
   .list_content table {
      color: #666666;
      font-size: 14px;
      width: 100%;
       /* min-width:1200px; */
   }
   .list_content table tr .orderNo{
       color: #d80d16;
       text-decoration: underline;
       cursor: pointer;
   }
   .list_content table thead{
      height: 40px;
      line-height: 40px;
      background-color: #f6f6f6;
   }
   .list_content table thead tr th{
      border: solid 1px #dfdfdf;
      padding: 0px 10px;
   }
   .list_content table tbody{
      height: 39px;
      line-height: 39px;
      background-color: #ffffff;
   }
   .list_content table tbody tr td{
      border: solid 1px #dfdfdf;
      padding: 0px 10px;
      text-align: center;
   }
</style>
