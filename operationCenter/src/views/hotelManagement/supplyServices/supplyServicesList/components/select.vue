<template>
  <div class="selectContent">
    <!-- 第一级 -->
    <div style="height:50px;line-height:50px;position:relative;">
      <div class="selectItem">
        <div class="celectItemL">
          酒店名称
        </div>
        <div class="celectItemR">
          <input v-model="orderNo" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          房型名称
        </div>
        <div class="celectItemR">
          <input v-model="orderNo" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          支付方式
        </div>
        <div class="celectItemR">
          <el-select v-model="roomTypeValue" placeholder="请选择">
            <el-option
              v-for="item in roomType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          取消类型
        </div>
        <div class="celectItemR">
          <el-select v-model="roomTypeValue" placeholder="请选择">
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
      <div class="export_btn">
        导出
      </div>
    </div>
    <!-- 第二级 -->
    <div style="height:50px;line-height:50px;position:relative;">
      <div class="selectItem">
        <div class="celectItemL">
          酒店ID
        </div>
        <div class="celectItemR">
          <input v-model="linkPhone" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          房型ID
        </div>
        <div class="celectItemR">
          <input v-model="linkPhone" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          状态
        </div>
        <div class="celectItemR">
          <el-select v-model="roomTypeValue" placeholder="请选择">
            <el-option
              v-for="item in roomType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
        { value: 0, label: '上架' },
        { value: 1, label: '下架' }
      ],
      param: {
        orderNo: '',
        linkPhone: '',
        linkMan: '',
        hotelId: '',
        hotelName: '',
        merchantName: '',
        status: '',
        queryType: '',
        startTime: '',
        endTime: '',
        pageNo: '1',
        pageSize: '10',
        channel: '',
        platform: ''
      }
    }
  },
  methods: {
    search_btn() {
      this.param.orderNo = this.orderNo
      this.param.linkPhone = this.linkPhone
      this.param.linkMan = this.linkMan
      this.param.hotelId = this.hotelId
      this.param.hotelName = this.hotelName
      this.param.merchantName = this.merchantName
      this.param.status = this.orderValue
      this.param.queryType = this.thimeValue
      this.param.startTime = this.startTime
      this.param.endTime = this.endTime
      this.param.channel = this.yeWuValue
      this.param.platform = this.orderLaiyuanValue
      this.$emit('search_btn', this.param)
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
    width: 19%;
    max-width: 300px;
    display: inline-block;
}
.celectItemL {
    width: 72px;
    text-align: center;
    display: inline-block;
}
.celectItemR {
    max-width: 200px;
    width: 60%;
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
    right: 125px;
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
