<template>
  <div class="waperContent">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <!-- 订单基本信息 -->
    <basic-infor v-if="detailMsg" :item="detailMsg" />
    <!-- 预定酒店信息 -->
    <scheduled-infor v-if="detailMsg" :item="detailMsg" />
    <!-- 价格信息 -->
    <price-infor v-if="detailMsg" :item="detailMsg" />
    <!-- 支付信息 -->
    <pay-infor v-if="detailMsg" :item="detailMsg" />
    <!-- 发票信息 -->
    <invoice-infor v-if="detailMsg" :item="detailMsg" />
    <!-- 备注信息 -->
    <remark-infor v-if="detailMsg" :item="detailMsg" />
    <!-- 关闭按钮 -->
    <close-btn v-if="detailMsg" />
  </div>
</template>
<script>
import titleName from '@/components/titleName/titleName'
import closeBtn from '@/components/closeBtn/closeBtnBottom'
import basicInfor from './components/basicOrderInformation'
import scheduledInfor from './components/scheduledInformation'
import priceInfor from './components/priceInformation'
import payInfor from './components/payInformation'
import invoiceInfor from './components/invoiceInformation'
import remarkInfor from './components/remarksInformation'
import { getOrderDetails } from '@/api/orderList/hotel'
export default {
  name: 'OrderDetails',
  components: {
    titleName,
    basicInfor,
    scheduledInfor,
    priceInfor,
    payInfor,
    invoiceInfor,
    remarkInfor,
    closeBtn
  },
  data() {
    return {
      titleName: '订单详情',
      detailMsg: null
    }
  },
  mounted() {
    this.getOrderDetailsMsg()
  },
  methods: {
    getOrderDetailsMsg() {
      // console.log(this.$route)
      const orderNo = this.$route.query.orderNo
      getOrderDetails(orderNo).then((res) => {
        console.log(res)
        this.detailMsg = { ...res.data.data[0] }
      })
    }
  }
}
</script>
<style scoped>
.waperContent{
    padding: 24px 24px 50px 24px;
    background-color: #fbfbfb;
    min-width: 1200px;
  }
</style>
