<template>
  <div class="basicInforContent">
    <div class="title_tip">订单基本信息</div>
    <div class="basicContent">
      <div class="basicItem">
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">订单编号</span>
          <span class="basicItem_msg_r">{{ item.orderNo }}</span>
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">下单时间</span>
          <span class="basicItem_msg_r">{{ item.createTime | getGangDateMiaos }}</span>
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">确认时间</span>
          <span class="basicItem_msg_r">{{ item.finishTime | getGangDateMiaos }}</span>
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">买家留言</span>
          <span class="basicItem_msg_r">{{ item.customMessage }}</span>
        </div>
      </div>
      <div class="basicItem">
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">订单状态</span>
          <span class="basicItem_msg_r red">{{ item.status | statusType }}</span>
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">支付时间</span>
          <span class="basicItem_msg_r">{{ item.payTime | getGangDateMiaos }}</span>
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">取消时间</span>
          <!-- cancelTime -->
          <span class="basicItem_msg_r">{{ item.cancelTime | getGangDateMiaos }}</span>
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">支付方式</span>
          <span class="basicItem_msg_r">{{ item.payChannel | payChannels }}</span>
        </div>
      </div>
      <div class="basicItem">
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">订单来源</span>
          <span class="basicItem_msg_r">{{ item.platform | platforms }}-{{ item.channel |channels }}</span>
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">下单渠道</span>
          <span class="basicItem_msg_r">{{ item.os | oss }}</span>
        </div>
        <div class="basicItem_msg">
          <span class="basicItem_msg_l">预订手机</span>
          <span class="basicItem_msg_r">{{ item.linkPhone }}</span>
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

import { getGangDate, getGangDateMiao } from '@/utils/validate' // getWenDate,
export default {
  filters: {
    getGangDateMiaos: getGangDateMiao,
    getGangDates: getGangDate,
    getWenDates: function(val) {
      console.log(val)
      const dateNew = new Date(val)
      console.log(dateNew)
      const y = dateNew.getFullYear()
      const m = dateNew.getMonth() + 1
      const d = dateNew.getDate()
      console.log(y)
      console.log(m)
      console.log(d)
      return y + '年' + (m < 10 ? 0 + m : m) + '月' + (d < 10 ? 0 + d : d) + '日'
    },
    // payChannel (integer, optional): 订单支付渠道：0-工行支付;1-垫付;2-个人
    payChannels: function(val) {
      const payChannelList = { 0: '工行支付', 1: '垫付', 2: '个人' }
      return payChannelList[val]
    },
    // 操作系统 1=安卓 2=IOS 3=PC ,
    oss: function(val) {
      const ossList = { 1: '安卓', 2: 'IOS', 3: 'PC' }
      return ossList[val]
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
      // 订单状态：订单状态：0-待付款;1-付款成功;2-预定成功;3-已完成;4-已关闭;5-已取消;9-退款中;10-已退款;11-退款失败;12-预定失败
      // let statusTypeObj = {0:'待付款',1:'付款成功',2:'预定成功',3:'已完成',4:'已关闭',5:'已取消',9:'退款中',10:'已退款',11:'退款失败',12:'预定失败'}
      const statusTypeObj = { 1: '待付款', 2: '确认中', 3: '待确认收货', 4: '订单关闭', 5: '订单取消', 6: '预订成功', 7: '预订失败' }
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
.basicInforContent{
    background-color: #ffffff;
    padding: 10px 0px;
    margin-bottom: 4px;
}
.title_tip{
    color: #333333;
    font-size: 14px;
    padding-left: 36px;
}
.basicItem{
    width: 33%;
    display: inline-block;
}
.basicItem_msg{
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    color: #333333;
    padding-left: 60px;
}
.basicItem_msg_l{
    color: #999999;
    margin-right: 10px;
}
.red{
    color: #c8000a;
}
</style>
