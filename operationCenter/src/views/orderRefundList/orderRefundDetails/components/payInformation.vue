<template>
    <div class="payInforContent">
       <div class="title_tip">支付信息</div>
       <div class="payInforTop">
          <ul>
              <li>
                  <div class="fz14 color999">订单金额<span class="red">（含运费￥{{item.freight == null?0:item.freight}}）</span></div>
                   <div class="fz14 color333">￥{{item.orderAmountTotal}}</div>
              </li>
               <!-- <li>
                  <div class="fz14 color999">促销金额</div>
                   <div class="fz14 color333">￥{{item.discountAmount}}</div>
              </li> -->
               <li>
                  <div class="fz14 color999">实付金额</div>
                   <div class="fz14 color333">￥{{item.orderAmountTotal}}</div>
              </li>
              <li>
                  <div class="fz14 color999">实退金额</div>
                   <div class="fz14 color333" v-if="item.refund">￥{{item.refund.realAmont}}</div>
                   <div class="fz14 color333" v-else>￥0</div>
              </li>
              <li>
                  <div class="fz14 color999">损失金额</div>
                   <div class="fz14 color333" v-if="item.refund">￥{{item.refund.lossAmount}}</div>
                   <div class="fz14 color333" v-else>￥0</div>
              </li>
              <!-- <li v-if="item.refund">
                  <span class="tkBtn">退款详情</span>
              </li> -->
          </ul>
       </div>
       <div class="payInforBot">
          <ul>
               <li>
                  <div class="fz14 color999">应退现金</div>
                   <div class="fz14 color333">￥{{item | amountFilterTotal}}</div>
              </li>
               <li>
                  <div class="fz14 color999">应退积分</div>
                   <div class="fz14 color333">¥{{item.creditAmount  | amountFilter}}</div>
              </li>
              <li>
                  <div class="fz14 color999">应退平台优惠券</div>
                   <div class="fz14 color333">¥{{item.platformCouponAmount | amountFilter}}</div>
              </li>
              <li>
                  <div class="fz14 color999">应退红包</div>
                   <div class="fz14 color333">¥{{item.freight | amountFilter}}</div>
              </li>
              <li>
                  <div class="fz14 color999">应退运费</div>
                   <div class="fz14 color333">0</div>
              </li>
          </ul>
       </div>
    </div>
</template>
<script>
export default {
    props: {
        item:{
            type: Object,
            default: ()=>{}
        }
    },
    filters:{
        amountFilter(val){
            if(val === null){
                return 0
            }else{
                return val
            }
        },
          amountFilterTotal:function(val){
            let creditAmount = val.creditAmount==null?0:val.creditAmount;
            let platformCouponAmount = val.platformCouponAmount==null?0:val.platformCouponAmount;
            let freight = val.freight==null?0:val.freight;
            return (val.orderAmountTotal - creditAmount - platformCouponAmount - freight)
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
