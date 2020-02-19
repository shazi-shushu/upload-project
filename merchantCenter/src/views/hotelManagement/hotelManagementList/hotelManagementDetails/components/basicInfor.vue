<template>
  <div class="content">
    <!-- 基本信息顶部信息 -->
    <div class="content_top clearfix">
      <div class="content_top_l">
        <div class="clearfix content_item">
          <div class="left_name">酒店ID</div>
          <div class="right_content">{{ basMSg.hotelId }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店名称</div>
          <div class="right_content">{{ basMSg.hotelChnName }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店状态</div>
          <div class="right_content">上架j</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店集团</div>
          <div class="right_content">{{ basMSg.parentHotelGroup }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">开业日期</div>
          <div class="right_content">{{ basMSg.praciceDate | getGangDateNewFilter }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店电话</div>
          <div class="right_content">{{ basMSg.telephone }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店标签</div>
          <div class="content_itemTips">
            <ul class="clearfix">
              <li>
                <el-checkbox v-model="checked" disabled>高端连锁</el-checkbox>
              </li>
              <li>
                <el-checkbox v-model="checked" disabled>中端连锁</el-checkbox>
              </li>
              <li>
                <el-checkbox v-model="checked" disabled>快捷连锁</el-checkbox>
              </li>
              <li>
                <el-checkbox v-model="checked" disabled>酒店公寓</el-checkbox>
              </li>
              <li>
                <el-checkbox v-model="checked" disabled>客栈</el-checkbox>
              </li>
              <li>
                <el-checkbox v-model="checked" disabled>民宿</el-checkbox>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content_top_r">
        <div class="clearfix content_item">
          <div class="left_name">酒店类型</div>
          <div class="right_content">{{ basMSg.hotelStarName }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店英文名称</div>
          <div class="right_content">{{ basMSg.hotelEngName }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店星级</div>
          <div class="right_content">{{ basMSg.hotelStar | startFilter }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">所属品牌</div>
          <div class="right_content">{{ basMSg.plateId }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">装修日期</div>
          <div class="right_content">{{ basMSg.fitmentDate | getGangDateNewFilter }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店传真</div>
          <div class="right_content">{{ basMSg.fax }}</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">邮政编码</div>
          <div class="right_content">{{ basMSg.postCode }}</div>
        </div>
      </div>
    </div>
    <!-- 基本信息地址栏信息部分 -->
    <div class="content_address">
      <div class="content_address_left_name">酒店地址</div>
      <div class="content_address_content">
        <div>
          <el-select v-model="shengValue" class="content_address_item" disabled placeholder="请选择">
            <el-option
              v-for="item in sheng"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="shiValue" class="content_address_item" disabled placeholder="请选择">
            <el-option
              v-for="item in shi"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="xianValue" class="content_address_item" disabled placeholder="请选择">
            <el-option
              v-for="item in xian"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="quValue" class="content_address_item" disabled placeholder="请选择">
            <el-option
              v-for="item in qu"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="shangYeValue" class="content_address_item" disabled placeholder="请选择">
            <el-option
              v-for="item in shangYe"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <span class="xiangXiAddress" v-text="basMSg.chnAddress" />
        </div>
      </div>
    </div>
    <!-- 酒店简介信息部分 -->
    <div class="common_content">
      <div class="content_address_left_name">酒店简介</div>
      <div class="common_content_r">{{ basMSg.hotelIntroduce }}</div>
    </div>
    <!-- 酒店政策信息部分 -->
    <div class="common_content">
      <div class="content_address_left_name">酒店政策</div>
      <div class="common_content_r">
        <ul class="clearfix">
          <li v-for="(item,index) in basMSg.hotelPolicyList" :key="index">
            <div class="zhengCeTitle">{{ item.policyName }}</div>
            <div class="zhengCeContent">{{ item.policyItemName }}</div>
          </li>
          <!-- <li>
                        <div class="zhengCeTitle">入离店政策</div>
                        <div class="zhengCeContent">最早到店时间：14：00  最晚离店时间：12：00  </div>
                    </li> -->
        </ul>
      </div>
    </div>
    <!-- 周边交通信息部分 -->
    <div class="common_content">
      <div class="content_address_left_name">周边交通</div>
      <div class="common_content_r">
        <ul class="clearfix">
          <li>
            <div class="neerTitle">餐饮</div>
            <div class="neerCeContent">麒麟山美味世界、新西河餐厅、味好美餐馆、大磡钓鱼台、麒麟山野味世界  </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getGangDateNew } from '@/utils/validate'
export default {
  filters: {
    getGangDateNewFilter: getGangDateNew,
    startFilter: function(val) {
      let startNUm = '二星级及以下'
      if (val < 30) {
        startNUm = '五星级'
      } else if (val > 30 && val < 50) {
        startNUm = '四星级'
      } else if (val > 50 && val < 65) {
        startNUm = '三星级'
      } else {
        startNUm = '二星级及以下'
      }
      return startNUm
    }
  },
  props: {
    basMSg: {
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
    width: 20%;
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
.content_address_content{
    width: 100%;
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

