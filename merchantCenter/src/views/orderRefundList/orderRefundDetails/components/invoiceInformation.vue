<template>
  <div class="invoiceInforContent">
    <div class="title_tip">发票信息</div>
    <div v-if="item.invoice" class="invoiceMsg">
      <div>
        <div class="invoiceMsg_top">
          <div>
            <span class="fz14 color999">是否开发票</span>
            <span class="fz14 color333">需要</span>
          </div>
          <div>
            <span class="fz14 color999">发票类型</span>
            <span class="fz14 color333">{{ item.invoice.billingType | billingTypeF }}
              <span class="isYouJi">已申请</span>
            </span>
          </div>
          <div>
            <span class="fz14 color999">开票项目</span>
            <span class="fz14 color333">{{ item.invoice.invoiceItem }}</span>
          </div>
          <div>
            <span class="fz14 color999">抬头类型</span>
            <span class="fz14 color333">{{ item.invoice.invoiceType | invoiceTypeF }}</span>
          </div>
        </div>
        <div class="invoiceMsg_center">
          <div>
            <span class="fz14 color999">发票抬头</span>
            <span class="fz14 color333">{{ item.invoice.invoiceTitle }}</span>
          </div>
          <div v-if="item.invoice.billingType && item.invoice.billingType ==2 ">
            <span class="fz14 color999">企业税号</span>
            <span class="fz14 color333">{{ item.invoice.invoiceTaxNo }}</span>
          </div>
          <div v-else>
            <span class="fz14 color999">身份证号</span>
            <span class="fz14 color333">xxxxxx</span>
          </div>
        </div>
        <div v-if="item.invoice.billingType && item.invoice.billingType ==2 " class="invoiceMsg_center">
          <div>
            <span class="fz14 color999">收件人姓名</span>
            <span class="fz14 color333">刘利霞</span>
          </div>
          <div>
            <span class="fz14 color999">收件人手机</span>
            <span class="fz14 color333">18701012461</span>
          </div>
        </div>
        <div v-if="item.invoice.billingType && item.invoice.billingType ==2 " class="invoiceMsg_bot">
          <div class="fz14 color999">收件人地址</div>
          <div class="fz14 color333">{{ item.invoice.mailingAddress }}</div>
        </div>
        <div v-else class="invoiceMsg_bot">
          <div class="fz14 color999" style="width:80px;">接收邮箱</div>
          <div class="fz14 color333">{{ item.invoice.email }}</div>
        </div>
      </div>
    </div>
    <div v-else class="invoiceMsg">
      <div class="invoiceMsg_top">
        <div>
          <span class="fz14 color999">是否开发票</span>
          <span class="fz14 color333">不需要</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    billingTypeF: function(val) {
      // 开票类型：1电子发票 ;2纸质发票 ,
      const billingTypefList = { 1: '电子发票', 2: '纸质发票' }
      return billingTypefList[val]
    },
    invoiceTypeF: function(val) {
      // 发票类型：1个人 2公司
      const invoiceTypeflList = { 1: '个人', 2: '公司' }
      return invoiceTypeflList[val]
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
.invoiceInforContent{
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
.invoiceMsg{
    padding-left: 60px;
}
.invoiceMsg_top{
    padding: 10px 0px;
}
.invoiceMsg_top>div {
    width: 24%;
    display: inline-block;
}
.invoiceMsg_top>div span:nth-child(1){
    width: 30%;
    max-width: 80px;
    display: inline-block;
    text-align: right;
    margin-right: 10px;
}
.invoiceMsg_top>div span .isYouJi{
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
.invoiceMsg_center{
    padding: 10px 0px;
}
.invoiceMsg_center>div {
    width: 48%;
    display: inline-block;
    margin-right: 4px;
}
.invoiceMsg_center>div span:nth-child(1){
    width: 80px;
    display: inline-block;
    text-align: right;
    margin-right: 10px;
}
.invoiceMsg_bot{
    padding: 10px 0px;
    width: 50%;
    display: flex;
}
.invoiceMsg_bot div{
    display: inline-block;
}
.invoiceMsg_bot div:nth-child(1){
    width: 14%;
    text-align: right;
    margin-right: 10px;
}
.invoiceMsg_bot div:nth-child(2){
    width: 74%;
}
</style>
