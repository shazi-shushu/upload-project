<template>
  <div class="list_content">
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>退款编号</th>
          <th>订单编号</th>
          <th>退款状态</th>
          <!-- <th>商户名称</th> -->
          <th>酒店ID</th>
          <th>酒店名称</th>
          <!-- <th>入住时间</th> -->
          <!-- <th>离店时间</th> -->
          <th>订单金额</th>
          <th>损失费</th>
          <th>实退金额</th>
          <th>申请时间</th>
          <th>退款完成时间</th>
          <th>联系人</th>
          <th>联系人手机</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list" :key="index">
          <td>{{ index+1 }}</td>
          <!-- <td class="orderNo"> <router-link :to="{path:'/orderRefundDetails',query:{refundOrderNo:item.refund.refundOrderNo}}">{{item.refund.refundOrderNo}}</router-link></td> -->
          <td class="orderNo" @click="goRefundDetails(item.refund.refundOrderNo)">{{ item.refund.refundOrderNo }}</td>
          <td class="orderNo" @click="goDetails(item.orderNo)">{{ item.orderNo }}</td>
          <!-- <td class="orderNo"> <router-link :to="{path:'/orderDetails',query:{orderNo:item.orderNo}}">{{item.orderNo}}</router-link></td> -->
          <td>{{ item.refund.status | statusType }}</td>
          <!-- <td>{{item.merchantName}}</td> -->
          <td>{{ item.hotelId }}</td>
          <td>{{ item.hotelChnName }}</td>
          <!-- <td>{{item.checkInDate}}</td> -->
          <!-- <td>{{item.checkOutDate}}</td> -->
          <td>¥{{ item.orderAmountTotal }}</td>
          <td>¥{{ item.refund.lossAmount }}</td>
          <td>¥{{ item.refund.amount }}</td>
          <!-- <td>{{item.hasRefund | hasRefuns}}</td> -->
          <!-- <td>{{item.isInvoice | isInvoices}}</td> -->
          <td>{{ item.refund.createTime | getGangDateMiaos }}</td>
          <td>{{ item.refund.finishTime | getGangDateMiaos }}</td>
          <td>{{ item.linkMan }}</td>
          <td>{{ item.linkPhone }}</td>
          <!-- <td>{{item.platform | platforms}}</td> -->
          <!-- <td>{{item.channel | channels}}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
/* Layout */
import Layout from '@/views/layout/Layout'
import { getGangDateMiao } from '@/utils/validate'
export default {
  filters: {
    getGangDateMiaos: getGangDateMiao,
    statusType: function(val) {
      // 退款状态: 1:待同意 2:待退款 9:退款中 10:已退款 11退款失败
      // let statusTypeObj = {1:'待同意',2:'待退款',9:'退款中',10:'已退款',11:'退款失败'}
      const statusTypeObj = { 1: '待同意', 2: '待退款', 15: '退款中', 8: '退款成功', 9: '退款失败' }
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
    goRefundDetails(val) {
      var orderNo = val.substring(val.length - 4)
      // console.log(orderNo)
      let flagOrder = false
      flagOrder = this.isAddRouter(val)
      if (flagOrder) {
        this.$router.options.routes.push({
          path: '/orderRefundDetails' + val,
          component: Layout,
          hidden: true,
          redirect: '/orderRefundDetails' + val,
          children: [
            {
              path: '/orderRefundDetails' + val,
              component: () => import('@/views/orderRefundList/orderRefundDetails/orderRefundDetails'),
              name: 'orderRefundDetails' + val,
              meta: { title: '酒店退款详情(' + orderNo + ')', noCache: true }
            }
          ]
        })
        this.$router.addRoutes(this.$router.options.routes)// 调用add
      }
      this.$router.push({ path: '/orderRefundDetails' + val, query: { refundOrderNo: val }})
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
