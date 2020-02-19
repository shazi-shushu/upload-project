<template>
  <div class="selectContent">
    <!-- 广告频道名称 -->
    <div style="height:50px;line-height:50px;position:relative;">
      <div class="selectItem">
        <div class="celectItemL">
          开票项类型
        </div>
        <div class="celectItemR">
          <el-select v-model="param.productType" placeholder="请选择" @change="changeChannel">
            <el-option
              v-for="item in invoiceType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <!-- 状态 -->
      <div class="selectItem">
        <div class="celectItemL">
          状态
        </div>
        <div class="celectItemR">
          <el-select v-model="param.status" placeholder="请选择">
            <el-option
              v-for="item in roomType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="search_btn" @click="search_btn">
        查询
      </div>
      <!-- <div class="export_btn">
        导出
      </div> -->
    </div>
  </div>
</template>
<script>
// import { getAllAdvertChannelName, getAdvertPointByIdSingle } from '@/api/adv/adv'
export default {
  data() {
    return {
      orderNo: '',
      linkPhone: '',
      roomTypeValue: '',
      linkMan: '',
      hotelId: '',
      hotelName: '',
      merchantName: '',
      // 下拉选项：请选择、上架、下架
      roomType: [
        { value: '', label: '请选择' },
        { value: '1', label: '启用' },
        { value: '0', label: '停用' }
      ],
      // 开票项类型开票项类型:酒店、门票、机票、火车票、线路、签证
      invoiceTypeVal: '',
      invoiceType: [
        { value: '', label: '请选择' },
        { value: 1, label: '酒店' },
        { value: 4, label: '门票' },
        { value: 2, label: '机票' },
        { value: 3, label: '火车票' },
        { value: 5, label: '线路' },
        { value: 6, label: '签证' }
        // { value: 7, label: '跟团游' }
      ],
      channeValue: '',
      channeArr: [],
      pointValue: '',
      pointArr: [],
      param: {
        productType: '',
        merchantId: this.$store.state.user.userId,
        pageNo: '1',
        pageSize: '10',
        status: ''
      }
    }
  },
  mounted() {
    // this.getAllChanne()
  },
  methods: {
    changeChannel(val) {
      // console.log(val)
      const obj = {
        channelId: val
      }
      // this.param.pointId = ''
      // this.pointArr = []
      // 点击广告频道名称获取广告位名称
      // getAdvertPointByIdSingle(obj).then((res) => {
      //   this.pointArr = res.data.data
      //   this.pointArr.unshift({ 'pointId': '', 'pointName': '请选择' })
      // })
    },
    search_btn() {
      this.$emit('search_btn', this.param)
    }
    // getAllChanne() {
    //   getAllAdvertChannelName().then((res) => {
    //     this.channeArr = res.data.data
    //     this.channeArr.unshift({ 'channelId': '', 'channelName': '请选择' })
    //   })
    // }
  }
}
</script>
<style scoped>
.selectContent{
    background-color: #ffffff;
    padding: 10px 0px;
}
.selectItem {
    height: 50px;
    line-height: 50px;
    color: #333333;
    font-size: 14px;
    width: 30%;
    max-width: 350px;
    display: inline-block;
}
.celectItemL {
    width: 90px;
    text-align: center;
    display: inline-block;
}
.celectItemR {
    max-width: 200px;
    width: 58%;
    display: inline-block;
}
.celectItemR input {
    width: 100%;
    height: 34px;
    line-height: 34px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding-left: 4px;
}
.selectTime {
    display: inline-block;
    width: 48%;
    max-width: 600px;
    margin-right: 4px;
}
.selectTime div {
    display: inline-block;
}
.selectTimeR {
    width: 140px;
    padding: 0px 13px 0px 20px;
}
.block{
    width: 190px;
}
.block input {
    width: 100%;
    height: 34px;
    line-height: 34px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 190px;
}
.search_btn{
    position: absolute;
    top: 8px;
    right: 280px;
    color: #ffffff;
    width: 100px;
    height: 34px;
    line-height: 34px;
    text-align: center;
	background-color: #c8000a;
    border-radius: 4px;
    cursor: pointer;
}
.export_btn{
    position: absolute;
    top: 8px;
    right: 10px;
    width: 100px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background-color: #ffffff;
    color: #c8000a;
    border: 1px solid #c8000a;
    border-radius: 4px;
    cursor: pointer;
}
</style>
