<template>
  <div class="content">
    <!-- 基本信息顶部信息 -->
    <div class="content_top clearfix">
      <div class="content_top_l">
        <div class="clearfix content_item">
          <div class="left_name">所属酒店</div>
          <div class="right_content" style="border:0px;padding-left:0px;">
            <el-select
              v-model="value9"
              style="width:100%"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">房型名称</div>
          <div class="right_content">
            <input type="text">
          </div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">房型状态</div>
          <!-- <div class="right_content"> -->
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
          <!-- </div> -->
        </div>
        <div class="clearfix content_item">
          <div class="left_name">房型面积</div>
          <div class="right_content10">
            <input type="text">
          </div>
          <div class="right_content_tip">平米</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">最多入住人数</div>
          <div class="right_content10">
            <input type="text">
          </div>
          <div class="right_content_tip">人</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">是否可以加床</div>
          <div class="right_content20" style="border:0px;padding-left: 0px">
            <el-select v-model="hotelValue" style="width:100%;" placeholder="请选择">
              <el-option
                v-for="item in hotelTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="right_content_addBed">
            <input type="text">
          </div>
          <div class="right_content_addBedTip">/人</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">是否有窗</div>
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
      </div>
      <div class="content_top_r">
        <div class="clearfix content_item">
          <div class="left_name">酒店ID</div>
          <div class="right_content">123456</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">房型ID</div>
          <div class="right_content">123456</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">床型</div>
          <div class="right_content20" style="border:0px;padding-left: 0px">
            <el-select v-model="hotelValue" style="width:100%;" placeholder="请选择">
              <el-option
                v-for="item in hotelTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="right_content_type">
            <input type="text">
          </div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">所在楼层</div>
          <div class="right_content10">
            <input type="text">
          </div>
          <div class="right_content_tip">层</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">最多入住儿童数</div>
          <div class="right_content10">
            <input type="text">
          </div>
          <div class="right_content_tip">人</div>
        </div>
        <div class="clearfix content_item">
          <div class="left_name">卫浴类型</div>
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
          <div class="left_name">宽带</div>
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
      </div>
    </div>

  </div>
</template>
<script>
export default {
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
      xiangXiAddress: '北京市朝阳区高碑店行政区商业区',
      hotelValue: '',
      // 酒店状态状态：
      hotelTypes: [
        { value: '', label: '请选择' },
        { value: 0, label: '上架' },
        { value: 1, label: '下架' }
      ],
      options4: [],
      value9: [],
      list: [],
      loading: false,
      states: ['Alabama', 'Alaska', 'Arizona',
        'Arkansas', '北京速八酒店', '请输入房型名称', '北京丽景湾酒店', '北京景里酒店', '北京大方酒店', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming']
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item }
    })
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options4 = []
      }
    }
  }
}
</script>
<style scoped>
.content input{
  width: 100%;
  height: 34px;
  line-height: 34px;
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
  overflow: hidden;
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
    overflow: hidden;
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

