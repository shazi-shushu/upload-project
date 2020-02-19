<template>
  <div class="selectContent">
    <!-- 第一级 -->
    <div style="height:50px;line-height:50px;position:relative;">
      <div class="selectItem">
        <div class="celectItemL">
          广告频道名称
        </div>
        <div class="celectItemR">
          <el-select v-model="param.channelId" placeholder="请选择" @change="changeChannel">
            <el-option
              v-for="item in channeArr"
              :key="item.channelId"
              :label="item.channelName"
              :value="item.channelId"
            />
          </el-select>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          广告位名称
        </div>
        <div class="celectItemR">
          <el-select v-model="param.pointId" placeholder="请选择">
            <el-option
              v-for="item in pointArr"
              :key="item.pointId"
              :label="item.pointName"
              :value="item.pointId"
            />
          </el-select>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          广告标题
        </div>
        <div class="celectItemR">
          <input v-model="param.advertTitle" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          状态
        </div>
        <div class="celectItemR">
          <el-select v-model="param.deleteFlag" placeholder="请选择">
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
import { getAllAdvertChannelName, getAdvertPointByIdSingle } from '@/api/adv/adv'
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
        { value: 0, label: '启用' },
        { value: 1, label: '停用' }
      ],
      channeValue: '',
      channeArr: [],
      pointValue: '',
      pointArr: [],
      param: {
        deleteFlag: null,
        channelId: null,
        pageNum: '1',
        pageSize: '10',
        pointId: null,
        advertTitle: ''
      }
    }
  },
  mounted() {
    this.getAllChanne()
  },
  methods: {
    changeChannel(val) {
      // console.log(val)
      const obj = {
        channelId: val
      }
      this.param.pointId = ''
      this.pointArr = []
      // 点击广告频道名称获取广告位名称
      getAdvertPointByIdSingle(obj).then((res) => {
        this.pointArr = res.data.data
        this.pointArr.unshift({ 'pointId': '', 'pointName': '请选择' })
      })
    },
    search_btn() {
      this.$emit('search_btn', this.param)
    },
    getAllChanne() {
      getAllAdvertChannelName().then((res) => {
        this.channeArr = res.data.data
        this.channeArr.unshift({ 'channelId': '', 'channelName': '请选择' })
      })
    }
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
    width: 20%;
    max-width: 300px;
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
    right: 110px;
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
