<template>
  <div class="content">
    <!-- 基本信息顶部信息 -->
    <div class="content_top clearfix">
      <div class="content_top_l">
        <div class="clearfix content_item">
          <div class="left_name">酒店ID</div>
          <div class="right_content">123456</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店名称</div>
          <div class="right_content">
            <input type="text">
          </div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店状态</div>
          <div class="celectItemR">
            <el-select v-model="hotelValue" style="width:100%;" placeholder="请选择">
              <el-option
                v-for="item in hotelTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店集团</div>
          <div class="celectItemR">
            <el-select v-model="hotelValue" style="width:100%;" placeholder="请选择">
              <el-option
                v-for="item in hotelTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">开业日期</div>
          <div class="celectItemR">
            <!-- <span class="demonstration">开始时间</span> -->
            <el-date-picker
              v-model="startTime"
              style="width:100%;"
              type="date"
              placeholder="选择开始日期"
              :picker-options="pickerOptionsStart"
            />
          </div>
          <!-- <div class="right_content">2019-04-03</div> -->
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店电话</div>
          <div class="right_content"><input type="text"></div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店标签</div>
          <div class="content_itemTips">
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="(item,index) in allCheckList" :key="index" :label="item" />
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="content_top_r">
        <div class="clearfix content_item">
          <div class="left_name">酒店类型</div>
          <div class="celectItemR">
            <el-select v-model="hotelValue" style="width:100%;" placeholder="请选择">
              <el-option
                v-for="item in hotelTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <!-- <div class="right_content">123456</div> -->
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店英文名称</div>
          <div class="right_content"><input type="text"></div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店星级</div>
          <div class="celectItemR">
            <el-select v-model="hotelValue" style="width:100%;" placeholder="请选择">
              <el-option
                v-for="item in hotelTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <!-- <div class="right_content">上架</div> -->
        </div>
        <div class="clearfix content_item">
          <div class="left_name">所属品牌</div>
          <div class="celectItemR">
            <el-select v-model="hotelValue" style="width:100%;" placeholder="请选择">
              <el-option
                v-for="item in hotelTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <!-- <div class="right_content">123456</div> -->
        </div>
        <div class="clearfix content_item">
          <div class="left_name">装修日期</div>
          <!-- 结束时间 -->
          <div class="celectItemR">
            <!-- <span class="demonstration">结束时间</span> -->
            <el-date-picker
              v-model="endTime"
              type="date"
              placeholder="选择结束日期"
              :picker-options="pickerOptionsEnd"
            />
          </div>
          <!-- <div class="right_content">2019-04-03</div> -->
        </div>
        <div class="clearfix content_item">
          <div class="left_name">酒店传真</div>
          <div class="right_content"><input type="text"></div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">邮政编码</div>
          <div class="right_content"><input type="text"></div>
        </div>
      </div>
    </div>
    <!-- 基本信息地址栏信息部分 -->
    <div class="content_address">
      <div class="content_address_left_name">酒店地址</div>
      <div class="content_address_content">
        <div>
          <el-select v-model="shengValue" class="content_address_item" placeholder="请选择">
            <el-option
              v-for="item in sheng"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="shiValue" class="content_address_item" placeholder="请选择">
            <el-option
              v-for="item in shi"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="xianValue" class="content_address_item" placeholder="请选择">
            <el-option
              v-for="item in xian"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="quValue" class="content_address_item" placeholder="请选择">
            <el-option
              v-for="item in qu"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="shangYeValue" class="content_address_item" placeholder="请选择">
            <el-option
              v-for="item in shangYe"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <input v-model="xiangXiAddress" type="text" class="xiangXiAddress">
          <!-- <span class="xiangXiAddress" v-text="xiangXiAddress" /> -->
        </div>
      </div>
    </div>
    <!-- 酒店简介信息部分 -->
    <div class="common_content">
      <div class="content_address_left_name">酒店简介</div>
      <!-- <div class="common_content_r"> -->
      <textarea v-model="hotelJianJie" class="common_content_r" style="height:80px;" />
      <!-- </div> -->
    </div>
    <!-- 酒店政策信息部分 -->
    <div class="common_content">
      <div class="content_address_left_name">酒店政策</div>
      <div class="common_content_r">
        <ul class="clearfix">
          <li v-for="(item,index) in hotelPolicyList" :key="index">
            <div class="delChildren" @click="delHotelPolicy(index)">删除</div>
            <div v-if="!item.add">
              <div class="zhengCeTitle color333">{{ item.title }}</div>
              <div class="zhengCeContent color666">{{ item.content }}</div>
            </div>
            <div v-else>
              <div class="zhengCeTitle"><input v-model="item.title" style="text-align: center;width:100%;" class="color333" type="text"></div>
              <div class="zhengCeContent"><input v-model="item.content" class="color666" type="text"></div>
            </div>
          </li>
        </ul>
        <div class="addChildren" @click="addHotelPolicy">
          添加
        </div>
      </div>
    </div>
    <!-- 周边交通信息部分 -->
    <div class="common_content">
      <div class="content_address_left_name">周边交通</div>
      <div class="common_content_r">
        <ul class="clearfix">
          <li v-for="(item,index) in peripheralTrafficList" :key="index">
            <div class="delChildren" @click="delHotelTraffic(index)">删除</div>
            <div v-if="!item.add">
              <div class="zhengCeTitle color333">{{ item.title }}</div>
              <div class="zhengCeContent color666">{{ item.content }}</div>
            </div>
            <div v-else>
              <div class="zhengCeTitle"><input v-model="item.title" style="text-align: center;width:100%;" class="color333" type="text"></div>
              <div class="zhengCeContent"><input v-model="item.content" class="color666" type="text"></div>
            </div>
          </li>
        </ul>
        <div class="addChildren" @click="addHotelTraffic">
          添加
        </div>
      </div>
      <!-- <div class="common_content_r">
        <ul class="clearfix">
          <li>
            <div class="neerTitle">餐饮</div>
            <div class="neerCeContent">麒麟山美味世界、新西河餐厅、味好美餐馆、大磡钓鱼台、麒麟山野味世界  </div>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allCheckList: ['高端连锁', '中端连锁', '快捷连锁', '酒店公寓', '客栈', '民宿'],
      checkList: [],
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
      xiangXiAddress: '北京市朝阳区高碑店行政区商业区',
      hotelJianJie: '小的更美丽，也把它翻成小巧而精致，这是老板想拥有一家民宿的最初想法！乔雖然以客棧為名事實是一家原汁原味的民宿，是由一所老传统白族木石结构的老院落改造而成，一共有',
      hotelPolicyList: [
        {
          title: '入离店政策',
          content: '最早到店时间：14：00  最晚离店时间：12：00 ',
          id: '0',
          add: false
        },
        {
          title: '膳食安排',
          content: '自助早餐 RMB 101 ',
          id: '1',
          add: false
        },
        {
          title: '宠物',
          content: '不可携带宠物',
          id: '2',
          add: true
        }
      ],
      peripheralTrafficList: [
        {
          title: '餐饮',
          content: '麒麟山美味世界、新西河餐厅、味好美餐馆、大磡钓鱼台、麒麟山野味世界',
          id: '0',
          add: false
        },
        {
          title: '宠物',
          content: '不可携带宠物',
          id: '1',
          add: true
        }
      ],
      startTime: '',
      endTime: '',
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.endTime !== '') {
            // return time.getTime() < Date.now() - 8.64e7 || time.getTime() > this.endTime
            return time.getTime() > this.endTime
          } else {
            // return time.getTime() < Date.now() - 8.64e7
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.startTime !== '') {
            return time.getTime() < this.startTime
          } else {
            // return time.getTime() < Date.now()
            // return time.getTime() < Date.now() - 8.64e7
          }
        }
      },
      hotelValue: '',
      // 酒店状态状态：
      hotelTypes: [
        { value: '', label: '请选择' },
        { value: 0, label: '上架' },
        { value: 1, label: '下架' }
      ]
    }
  },
  methods: {
    addHotelPolicy() {
      const obj = {
        title: '',
        content: '',
        id: this.hotelPolicyList.length,
        add: true
      }
      this.hotelPolicyList.push(obj)
    },
    delHotelPolicy(index) {
      this.hotelPolicyList.splice(index, 1)
    },
    addHotelTraffic() {
      const obj = {
        title: '',
        content: '',
        id: this.peripheralTrafficList.length,
        add: true
      }
      this.peripheralTrafficList.push(obj)
    },
    delHotelTraffic(index) {
      this.peripheralTrafficList.splice(index, 1)
    }
  }
}
</script>
<style scoped>
.addChildren{
  cursor: pointer;
  width: 70px;
  height: 28px;
  line-height: 28px;
	background-color: #ffffff;
	border-radius: 4px;
  border: solid 1px #c8000a;
  text-align: center;
  color: #c8000a;
  margin: 10px 0px 10px 70px;
}
.delChildren{
  float: left;
  cursor: pointer;
  width: 70px;
  height: 28px;
  line-height: 28px;
	background-color: #ffffff;
  text-align: center;
  color: #c8000a;
}
.el-checkbox {
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    /* -webkit-user-select: none; */
    /* -moz-user-select: none; */
    /* -ms-user-select: none; */
    /* user-select: none; */
    padding-right: 10px;
}
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
.zhengCeContent input{
    display: inline-block;
    width: 400px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    border-radius: 4px;
    border: solid 1px #dcdcdc;
    color: #666666;
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
    color: #333333;
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
.right_content input{
  width: 90%;
  height: 32px;
  line-height: 34px;
}
.celectItemR{
    float: left;
    width: 65%;
    max-width: 471px;
    border-radius: 4px;
    overflow: hidden;
    color: #999999;
    font-size: 14px;
    height: 34px;
    line-height: 34px;
    /* padding-left: 10px; */
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
    color: #333333;
    padding-left: 6px;
    height: 34px;
    line-height: 34px;
    margin-top: 6px;
    overflow: hidden;
}
</style>

