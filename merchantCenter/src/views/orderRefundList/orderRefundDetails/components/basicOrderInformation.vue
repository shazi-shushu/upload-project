<template>
  <div class="basicInforContent">
    <div class="title_tip">退款信息</div>
    <div class="basicContent">
      <div class="basicItem">
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">退款编号</span>
          <span class="basicItem_msg_r">{{ item.refund.refundOrderNo }}</span>
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">申请时间</span>
          <span class="basicItem_msg_r">{{ item.refund.createTime | getGangDateMiaos }}</span>
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">退款完成时间</span>
          <span class="basicItem_msg_r">{{ item.refund.finishTime | getGangDateMiaos }}</span>
        </div>
      </div>
      <div class="basicItem">
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">退款状态</span>
          <span class="basicItem_msg_r red">{{ item.refund.status | statusType }}</span>
        </div>
        <div class="basicItem_msg reason">
          <span class="basicItem_msg_l">退款原因</span>
          <span class="basicItem_msg_r">{{ item.refund.reason }}</span>
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">异常原因</span>
          <span class="basicItem_msg_r">{{ item.refund.resultMsg }}</span>
        </div>
      </div>
      <div class="basicItem">
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">开票状态</span>
          <span v-if="item.invoice" class="basicItem_msg_r">
            {{ item.invoice.billingType | billingTypeF }}
            <span class="isYouJi">已邮寄</span>
          </span>
          <span v-else class="basicItem_msg_r">-</span>
        </div>
        <div class="basicItem_msg">
          <!-- 商户名称 -->
          <span class="basicItem_msg_l" />
          <!-- {{item.merchantName==null?'-':item.merchantName}} -->
          <span class="basicItem_msg_r" />
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l" />
          <span class="basicItem_msg_r" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getGangDateMiao } from '@/utils/validate'
export default {
  filters: {
    getGangDateMiaos: getGangDateMiao,
    billingTypeF: function(val) {
      // 开票类型：1电子发票 ;2纸质发票 ,
      const billingTypefList = { 1: '电子发票', 2: '纸质发票' }
      return billingTypefList[val]
    },
    statusType: function(val) {
      // 退款状态: 1:待同意 2:待退款 9:退款中 10:已退款 11退款失败
      // let statusTypeObj = {1:'待同意',2:'待退款',9:'退款中',10:'已退款',11:'退款失败'}
      const statusTypeObj = {
        1: '待同意',
        2: '待退款',
        15: '退款中',
        8: '退款成功',
        9: '退款失败'
      }
      return statusTypeObj[val]
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>
.basicInforContent {
  background-color: #ffffff;
  padding: 10px 0px;
  margin-bottom: 4px;
}
.title_tip {
  color: #333333;
  font-size: 14px;
  padding-left: 36px;
}
.basicContent {
  display: flex;
  flex-direction: row;
}
.basicItem {
  width: 33%;
  display: inline-block;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.basicItem_msg {
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  color: #333333;
  padding-left: 60px;
}
.reason {
  width: 200%;
  line-height: unset;
  height: unset;
}
.reason .basicItem_msg_r {
  height: 100%;
}

.basicItem_msg_l {
  color: #999999;
  margin-right: 10px;
}
.red {
  color: #c8000a;
}
.isYouJi {
  width: 57px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  color: #c8000a;
  font-size: 12px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  border: solid 1px #dcdcdc;
}
</style>
