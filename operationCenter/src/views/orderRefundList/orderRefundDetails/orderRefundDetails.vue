<template>
    <div class="waperContent">
        <!-- title名称 -->
       <title-name  :item="titleName" />
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
        <!-- 备注信息 -->
        <remark-infor v-if="detailMsg" :item="detailMsg" />
        <!-- 关闭按钮 -->
        <close-btn v-if="detailMsg"/>
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
import { getOrderRefundDetails } from '@/api/orderList/hotel'
export default {
    name: 'orderDetails',
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
            titleName: '退款详情',
            detailMsg: null
        }
    },
    mounted() {
        this.getOrderDetailsMsg()
    },
    methods: {
        getOrderDetailsMsg() {
            // console.log(this.$route)
            let refundOrderNo = this.$route.query.refundOrderNo
            const hotelDetails = {}
            hotelDetails.refundOrderNo = refundOrderNo
            getOrderRefundDetails(hotelDetails).then((res) => {
                console.log(res)
                this.detailMsg = {...res.data.data[0]}
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
