<template>
  <div class="payInforContent">
    <div class="title_tip">支付信息</div>
    <div class="payInforTop">
      <ul>
        <li>
          <div class="fz14 color999">订单金额<span class="red">（含运费￥{{ item.freight == null?0:item.freight }}）</span></div>
          <div class="fz14 color333">￥{{ item.orderAmountTotal }}</div>
        </li>
        <li>
          <div class="fz14 color999">促销金额</div>
          <div class="fz14 color333">￥{{ item.discountAmount | amountFilter }}</div>
        </li>
        <li>
          <div class="fz14 color999">实付金额</div>
          <div class="fz14 color333">￥{{ item.orderAmountTotal }}</div>
        </li>
        <li>
          <div class="fz14 color999">实退金额</div>
          <div v-if="item.refund" class="fz14 color333">￥{{ item.refund.realAmont }}</div>
          <div v-else class="fz14 color333">￥0</div>
        </li>
        <li>
          <div class="fz14 color999">损失金额</div>
          <div v-if="item.refund" class="fz14 color333">￥{{ item.refund.lossAmount }}</div>
          <div v-else class="fz14 color333">￥0</div>
        </li>
        <li v-if="item.refund">
          <span class="tkBtn" @click="goRefundDetails(item.refund.refundOrderNo)">
            退款详情
            <!-- <router-link :to="{path:'/orderRefundDetails',query:{refundOrderNo:item.refund.refundOrderNo}}">退款详情</router-link> -->
          </span>
        </li>
      </ul>
    </div>
    <div class="payInforBot">
      <ul>
        <li>
          <div class="fz14 color999">实付现金</div>
          <div class="fz14 color333">￥{{ item | amountFilterTotal }}</div>
          <!-- <div class="fz14 color333">￥{{ item.amount | amountFilter }}</div> -->
        </li>
        <li>
          <div class="fz14 color999">积分</div>
          <div class="fz14 color333">¥{{ item.creditAmount | amountFilter }}</div>
        </li>
        <li>
          <div class="fz14 color999">平台优惠券</div>
          <div class="fz14 color333">¥{{ item.platformCouponAmount | amountFilter }}</div>
        </li>
        <li>
          <div class="fz14 color999">商户优惠卷</div>
          <div class="fz14 color333">¥{{ item.couponAmount | amountFilter }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/* Layout */
import Layout from '@/views/layout/Layout'
export default {
  filters: {
    amountFilter(val) {
      if (val === null) {
        return 0
      } else {
        return val
      }
    },
    amountFilterTotal: function(val) {
      const creditAmount = val.creditAmount == null ? 0 : val.creditAmount
      const platformCouponAmount = val.platformCouponAmount == null ? 0 : val.platformCouponAmount
      const couponAmount = val.couponAmount == null ? 0 : val.couponAmount
      return (val.orderAmountTotal - creditAmount - platformCouponAmount - couponAmount)
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goRefundDetails(val) {
      // console.log(val)
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
.payInforContent{
    background-color: #ffffff;
    padding: 10px 0px;
    margin-bottom: 4px;
    padding-bottom: 0px;
}
.title_tip{
    color: #333333;
    font-size: 14px;
    padding-left: 36px;
}
.red{
    color: #c8000a;
}
.color333{
    color: #333333;
}
.color666{
    color: #666666;
}
.color999{
    color: #999999;
}
.fz16{
    font-size: 16px;
}
.fz14{
    font-size: 14px;
}
.fz12{
    font-size: 12px;
}
.payInforTop{
    padding-left: 60px;
    overflow: hidden;
}
.payInforTop ul li{
    float: left;
    padding-right:60px;
    /* margin-bottom: 20px; */
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #f3f3f3;
}
.payInforTop ul li:last-child{
    padding-right:0px;
}
.payInforTop ul li div{
    padding-bottom: 10px;
    min-width: 70px;
}
.payInforTop ul li .tkBtn{
    display: inline-block;
	width: 90px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    color: #c8000a;
	background-color: #ffffff;
	border-radius: 10px;
    border: solid 1px #c8000a;
    margin-bottom: 12px;
    margin-top: 6px;
    font-size: 14px;
    cursor: pointer;
}
.payInforBot{
    padding-left: 275px;
    overflow: hidden;
}
.payInforBot ul li{
    float: left;
    padding-right:60px;
    /* margin-bottom: 20px; */
    list-style: none;
    text-align: center;
    /* border-bottom: 1px solid #f3f3f3; */
}
.payInforBot ul li div{
    padding-bottom: 10px;
    min-width: 70px;
}
</style>
