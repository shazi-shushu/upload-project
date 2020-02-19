<template>
  <div class="waperContent">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <!-- 退款信息基本信息 -->
    <basic-infor v-if="detailMsg" :item="detailMsg" />
    <!-- 退订信息 -->
    <scheduled-infor v-if="detailMsg" :item="detailMsg" />
    <!-- 价格信息 -->
    <!-- <price-infor v-if="detailMsg" :item="detailMsg" /> -->
    <!-- 退款明细信息 -->
    <pay-infor v-if="detailMsg" :item="detailMsg" />
    <!-- 发票信息 -->
    <!-- <invoice-infor v-if="detailMsg" :item="detailMsg" /> -->
    <!-- 退款处理信息 -->
    <refund-infor v-if="detailMsg && detailMsg.refund.status==9" :item="detailMsg" @refundFalseBtn="refundFalseBtns" @refundSureBtn="refundSureBtns" />
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
import refundInfor from './components/refundInformation'
import { getOrderRefundDetails, agreeRefundMessage, rejectRefundMessage } from '@/api/orderList/hotel'
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
    refundInfor,
    closeBtn
  },
  data() {
    return {
      titleName: '退款详情',
      detailMsg: null
    }
  },
  mounted() {
    this.getOrderDetailsMsg()
  },
  methods: {
    refundFalseBtns(val) {
      rejectRefundMessage(val).then((res) => {
        // console.log(res)
        this.getOrderDetailsMsg()
      })
    },
    refundSureBtns(val) {
      agreeRefundMessage(val).then((res) => {
        // console.log(res)
        this.getOrderDetailsMsg()
      })
    },
    getOrderDetailsMsg() {
      console.log(this.$route)
      const refundOrderNo = this.$route.query.refundOrderNo
      const hotelDetails = {}
      hotelDetails.refundOrderNo = refundOrderNo
      getOrderRefundDetails(hotelDetails).then((res) => {
        // console.log(res)
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
