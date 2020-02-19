<template>
  <div class="refundInforContent">
    <div class="title_tip">退款处理</div>
    <div class="refundContent">
      <div class="refundSel">
        <el-radio v-model="radio" label="1">同意退款</el-radio>
        <el-radio v-model="radio" label="2">拒绝退款</el-radio>
      </div>
      <div v-if="radio == 1" class="refundMsg">
        <span class="refundInp"><input v-model="refundMoney" type="text" placeholder="请填写退款金额" @blur.prevent="isMoney(refundMoney)"></span>
        <span class="refundBtn" @click="refundSureBtn">同意退款</span>
      </div>
      <div v-if="radio == 2">
        <span class="refundInp"><input v-model="refundContent" type="text" placeholder="请填写拒绝原因"></span>
        <span class="refundBtn" @click="refundFalseBtn">拒绝退款</span>
      </div>
    </div>
  </div>
</template>
<script>
// import { getHotelReplyMessage } from '@/api/orderList/hotel' 没有使用
export default {
  filters: {
    opTypes: function(val) {
      //   操作类型 1=卖家留言 2=备注
      const opTypesList = { 1: '卖家留言', 2: '备注' }
      return opTypesList[val]
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      datas: this.item,
      radio: '1',
      refundMoney: '',
      refundContent: '',
      aggreeParams: {
        orderNo: '',
        amount: '',
        userName: '刘世涛',
        outUserId: '1'
      },
      refuseParams: {
        orderNo: '',
        content: '',
        userName: '刘世涛',
        outUserId: '1'
      }
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    isMoney(money) {
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      // console.log(reg.test(money))
      if (reg.test(money)) {
        return true
      } else {
        this.refundMoney = ''
        this.$message({
          message: '请填写正确退款金额',
          type: 'warning'
        })
        return false
      }
    },
    refundSureBtn() {
      // this.isMoney(this.refundMoney)
      // console.log(this.item)
      if (this.refundMoney === '') {
        this.$message({
          message: '请填写退款金额',
          type: 'warning'
        })
        return false
      }
      this.aggreeParams.orderNo = this.datas.orderNo
      this.aggreeParams.amount = this.refundMoney
      this.$emit('refundSureBtn', this.aggreeParams)
    },
    refundFalseBtn() {
      if (this.refundContent === '') {
        this.$message({
          message: '请填写拒绝原因',
          type: 'warning'
        })
        return false
      }
      this.refuseParams.orderNo = this.datas.orderNo
      this.refuseParams.content = this.refundContent
      this.$emit('refundFalseBtn', this.refuseParams)
    }
  }
}
</script>
<style scoped>
.refundSel {
    font-size: 14px;
    color: #333333;
    height: 40px;
    line-height: 40px;
}
.refundMsg{

}
.refundInp input{
    width: 251px;
	height: 34px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #e5e5e5;
    font-size: 14px;
    margin-right: 30px;
    padding-left: 4px;
}
.refundBtn{
    display: inline-block;
    cursor: pointer;
    width: 90px;
	height: 34px;
    line-height: 34px;
    text-align: center;
	background-color: #ffffff;
	border-radius: 10px;
    font-size: 14px;
    color: #c8000a;
	border: solid 1px #c8000a;
}
.refundMsg .el-radio__input.is-checked .el-radio__inner {
    border-color: #c8000a;
    background: #c8000a;
}
.refundMsg .el-radio__input.is-checked .el-radio__inner {
    border-color: #c8000a;
    background: #c8000a;
}
.refundMsg .el-radio__input.is-checked .el-radio__label {
    color: #333333;
}
.refundInforContent{
    background-color: #ffffff;
    padding: 10px 0px;
    margin-bottom: 4px;
    padding-bottom: 0px;
}
.title_tip{
    background-color: #ffffff;
    color: #333333;
    font-size: 14px;
    padding-left: 36px;
    /* padding-bottom: 20px; */
    /* padding-top: 10px; */
}
.red{
    color: #c8000a;
}
/* select,input{
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
    -webkit-appearance:none;
    outline: none;
    border: none;
} */
.colorccc{
    color: #cccccc;
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
.refundContent{
    padding-left: 60px;
    /* display: flex; */
    padding-bottom: 20px;
    background-color: #ffffff;
    margin-bottom: 4px;
}
</style>
<style>
.refundContent .el-radio__input.is-checked .el-radio__inner {
    border-color: #c8000a !important;
    background: #c8000a !important;
}
.refundContent .el-radio__input.is-checked .el-radio__inner {
    border-color: #c8000a !important;
    background: #c8000a !important;
}
.refundContent .el-radio__input.is-checked .el-radio__label {
    color: #333333 !important;
}
.refundContent .el-radio__input.is-checked+.el-radio__label {
   color: #333333 !important;
}
</style>
