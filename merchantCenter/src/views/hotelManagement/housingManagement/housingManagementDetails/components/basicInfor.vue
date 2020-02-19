<template>
  <div class="content">
    <!-- 基本信息顶部信息 -->
    <div class="content_top clearfix">
      <div class="content_top_l">
        <div class="clearfix content_item">
          <div class="left_name">所属酒店</div>
          <div class="right_content">{{ basicMsg.hotelChnName }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">房型名称</div>
          <div class="right_content">{{ basicMsg.roomTypeName }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">房型状态</div>
          <div class="right_content">{{ basicMsg.status | statusType }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">房型面积</div>
          <div class="right_content10">{{ basicMsg.roomAcreage }}</div>
          <div class="right_content_tip">平米</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">最多入住人数</div>
          <div class="right_content10">{{ basicMsg.maxNumOfPersons }}</div>
          <div class="right_content_tip">人</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">是否可以加床</div>
          <div class="right_content20">收费加床</div>
          <div class="right_content_addBed">￥10</div>
          <div class="right_content_addBedTip">/人</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">是否有窗</div>
          <div class="right_content">有窗</div>
        </div>
      </div>
      <div class="content_top_r">
        <div class="clearfix content_item">
          <div class="left_name">酒店ID</div>
          <div class="right_content">{{ basicMsg.hotelId }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">房型ID</div>
          <div class="right_content">{{ basicMsg.roomTypeId }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">床型</div>
          <div class="right_content20">{{ basicMsg.content }}</div>
          <div class="right_content_type">1.5*1.8米</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">所在楼层</div>
          <div class="right_content10">{{ basicMsg.roomFloor }}</div>
          <div class="right_content_tip">层</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">最多入住儿童数</div>
          <div class="right_content10">{{ basicMsg.maxChild }}</div>
          <div class="right_content_tip">人</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">卫浴类型</div>
          <div class="right_content">独立卫浴</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">宽带</div>
          <div class="right_content">{{ basicMsg.hasNet }}</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  filters: {
    //   0:正常,1:删除,-1:下架
    statusType: function(val) {
      // let val1 = -1
      const obj = { '0': '正常', '1': '删除', '-1': '下架' }
      return obj[val]
    }
  },
  props: {
    basicMsg: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      checked: true,
      shengValue: '北京市',
      shiValue: '朝阳区',
      xianValue: '高碑店',
      quValue: '行政区',
      shangYeValue: '商业区',
      sheng: [],
      shi: [],
      xian: [],
      qu: [],
      shangYe: [],
      xiangXiAddress: '北京市朝阳区高碑店行政区商业区'
    }
  }
}
</script>
<style scoped>
.neerTitle{
    /* display: inline-block; */
    border-radius: 4px;
    border: solid 1px #dcdcdc;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    width: 100px;
    overflow: hidden;
    text-align: center;
    margin-bottom: 4px;
    /* padding: 0px 6px; */
}
.zneerCeContent{
    /* display: inline-block; */
    height: 28px;
    line-height: 28px;
    font-size: 14px;
}
.zhengCeTitle{
    display: inline-block;
    border-radius: 4px;
    border: solid 1px #dcdcdc;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    /* padding: 0px 6px; */
    width: 100px;
    text-align: center;
    overflow: hidden;
    vertical-align: middle;
}
.zhengCeContent{
    display: inline-block;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    /* vertical-align: middle; */
}
.common_content_r ul li{
    /* float: left; */
    padding: 4px 0px;
    /* height: 45px; */
    /* line-height: 45px; */
}
.common_content{
    display: flex;
    width: 85%;
}
.common_content_r{
    border: solid 1px #e5e5e5;
    color: #999999;
    margin: 4px 0px;
    padding: 4px;
    width: 100%;
}
.content{
    background-color: #ffffff;
    margin-bottom: 4px;
}
.content_top{
    width: 90%;
    display: flex;
}
.content_top .content_top_l{
    width: 50%;
    float: left;
    padding-bottom: 10px;
}
.content_top .content_top_r{
    width: 50%;
    float: right;
    padding-bottom: 10px;
}
.content_top_r .content_item{
    /* float: right; */
}
.content_item{
    padding: 8px 0px;
}
.left_name{
    float: left;
    width: 22%;
    height: 34px;
    line-height: 34px;
    text-align: right;
    margin-right: 20px;
    color: #666666;
}
.right_content{
    float: left;
    width: 65%;
    max-width: 471px;
    border: solid 1px #e5e5e5;
    border-radius: 4px;
    overflow: hidden;
    color: #999999;
    font-size: 14px;
    height: 34px;
    line-height: 34px;
    padding-left: 10px;
}
.right_content10{
    float: left;
    width: 55%;
    max-width: 471px;
    border: solid 1px #e5e5e5;
    border-radius: 4px;
    overflow: hidden;
    color: #999999;
    font-size: 14px;
    height: 34px;
    line-height: 34px;
    padding-left: 10px;
}
.right_content_tip{
    float: left;
    width: 10%;
    text-align: center;
    height: 34px;
    line-height: 34px;
    color: #666666;
}
.right_content20{
    float: left;
    width: 48%;
    max-width: 471px;
    border: solid 1px #e5e5e5;
    border-radius: 4px;
    overflow: hidden;
    color: #999999;
    font-size: 14px;
    height: 34px;
    line-height: 34px;
    padding-left: 10px;
    margin-right: 2%;
}
.right_content_type{
    float: left;
    width: 15%;
    text-align: center;
    height: 34px;
    line-height: 34px;
    color: #666666;
    border: solid 1px #e5e5e5;
    border-radius: 4px;
}
.right_content_addBed{
    float: left;
    width: 10%;
    text-align: center;
    height: 34px;
    line-height: 34px;
    color: #666666;
    border: solid 1px #e5e5e5;
    border-radius: 4px;
}
.right_content_addBedTip{
    float: left;
    width: 5%;
    text-align: center;
    height: 34px;
    line-height: 34px;
    color: #666666;
}
.content_itemTips{
    float: left;
    width: 65%;
    max-width: 471px;
    font-size: 14px;
}
.content_itemTips ul li{
   width: 25%;
   float: left;
    height: 27px;
    line-height: 34px;
}
.content_address{
    display: flex;
     width: 85%;
}
.content_address_left_name{
    width: 12%;
    height: 34px;
    line-height: 34px;
    text-align: right;
    margin-right: 20px;
    color: #666666;
}
.content_address_item{
    width: 15%;
    height: 34px;
    line-height: 34px;
}
.xiangXiAddress{
    display: inline-block;
    width: 100%;
    border: solid 1px #e5e5e5;
    color: #999999;
    padding-left: 6px;
    height: 34px;
    line-height: 34px;
    margin-top: 6px;
    overflow: hidden;
}
</style>

