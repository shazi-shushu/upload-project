<template>
  <div class="selectContent">
    <!-- 第一级 -->
    <div>
      <div class="selectItem">
        <div class="celectItemL">
          订单编号
        </div>
        <div class="celectItemR">
          <input v-model="orderNo" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          联系人手机
        </div>
        <div class="celectItemR">
          <input v-model="linkPhone" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          联系人
        </div>
        <div class="celectItemR">
          <input v-model="linkMan" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          退款状态
        </div>
        <div class="celectItemR">
          <el-select v-model="orderValue" placeholder="请选择">
            <el-option
              v-for="item in orderTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
    <!-- 第二级 -->
    <div>
      <div class="selectItem">
        <div class="celectItemL">
          退款编号
        </div>
        <div class="celectItemR">
          <input v-model="orderRefundNo" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          酒店名称
        </div>
        <div class="celectItemR">
          <input v-model="hotelName" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          酒店ID
        </div>
        <div class="celectItemR">
          <input v-model="hotelId" type="text">
        </div>
      </div>
      <!-- <div class="selectItem">
                <div class="celectItemL">
                    商户名称
                </div>
                <div class="celectItemR">
                    <input type="text" v-model="merchantName" >
                </div>
            </div> -->
    </div>
    <!-- 第三级 -->
    <div style="height:50px;line-height:50px;position:relative;">
      <div class="selectTime">
        <div class="selectTimeR">
          <el-select v-model="thimeValue" placeholder="请选择">
            <el-option
              v-for="item in timeType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <!-- 开始时间 -->
        <div class="block">
          <!-- <span class="demonstration">开始时间</span> -->
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="选择开始日期"
            :picker-options="pickerOptionsStart"
          />
        </div>
        <span style="color: #333333;font-size: 14px;">至</span>
        <!-- 结束时间 -->
        <div class="block">
          <!-- <span class="demonstration">结束时间</span> -->
          <el-date-picker
            v-model="endTime"
            type="date"
            placeholder="选择结束日期"
            :picker-options="pickerOptionsEnd"
          />
        </div>
      </div>
      <div class="search_btn" @click="search_btn">
        查询
      </div>
      <div class="export_btn" @click="export_btns">
        导出
      </div>
    </div>
  </div>
</template>
<script>
import { exportRefundList } from '@/api/orderList/hotel'
export default {
  data() {
    return {
      orderNo: '',
      linkPhone: '',
      orderValue: '',
      orderRefundNo: '',
      linkMan: '',
      hotelId: '',
      hotelName: '',
      merchantName: '',
      // 退款状态: 1:待同意 2:待退款 9:退款中 10:已退款 11退款失败
      orderTypes: [
        { value: '', label: '请选择' },
        { value: 1, label: '待同意' },
        { value: 2, label: '待退款' },
        { value: 15, label: '退款中' },
        { value: 8, label: '退款成功' },
        { value: 9, label: '退款失败' }
      ],
      // 1:申请时间 2:退款完成时间
      thimeValue: '',
      timeType: [
        { value: '', label: '请选择' },
        { value: 1, label: '申请时间' },
        { value: 2, label: '退款完成时间' }
      ],
      startTime: '',
      endTime: '',
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.endTime !== '') {
            // return time.getTime() < Date.now() - 8.64e7 || time.getTime() > this.endTime
            // return time.getTime() > this.endTime
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
      param: {
        orderNo: '',
        refundOrderNo: '',
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
        pageSize: '10'
      },
      exportParam: {
        channel: '',
        endTime: '',
        fileName: '',
        hotelId: '',
        hotelName: '',
        linkMan: '',
        linkPhone: '',
        merchantName: '',
        orderNo: '',
        platform: '',
        queryType: '',
        startTime: '',
        status: '',
        refundOrderNo: ''
      }
    }
  },
  methods: {
    export_btns() {
      this.search_btn()
      this.exportParam = { ...this.param }
      exportRefundList(this.exportParam)
      // exportRefundList(this.exportParam).then((res) => {
      //   this.download('http://' + res.data.data)
      // })
    },
    download(url) {
      var iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = url
      document.body.appendChild(iframe)
    },
    search_btn() {
      // console.log(this.endTime)
      if (this.thimeValue !== '' && (this.startTime === '' || this.startTime === null || this.endTime === '' || this.endTime === null)) {
        this.$message({
          message: '请选择开始时间和结束时间',
          type: 'warning'
        })
        return false
      }
      const sTime = new Date(this.startTime).getFullYear() + '-' + Number(new Date(this.startTime).getMonth() + 1) + '-' + new Date(this.startTime).getDate()
      const eTime = new Date(this.endTime).getFullYear() + '-' + Number(new Date(this.endTime).getMonth() + 1) + '-' + new Date(this.endTime).getDate()
      this.param.orderNo = this.orderNo
      this.param.refundOrderNo = this.orderRefundNo
      this.param.linkPhone = this.linkPhone
      this.param.linkMan = this.linkMan
      this.param.hotelId = this.hotelId
      this.param.hotelName = this.hotelName
      this.param.merchantName = this.merchantName
      this.param.status = this.orderValue
      this.param.queryType = this.thimeValue
      this.param.startTime = sTime + ' ' + '00:00:00'
      this.param.endTime = eTime + ' ' + '00:00:00'
      this.$emit('search_btn', this.param)
    }
  }
}
</script>
<style scoped>
/* select,input{
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
    -webkit-appearance:none;
    outline: none;
    border: none;
} */
.selectContent{
    background-color: #ffffff;
    padding: 10px 0px;
}
.selectItem {
    height: 50px;
    line-height: 50px;
    color: #333333;
    font-size: 14px;
    width: 24%;
    max-width: 300px;
    display: inline-block;
}
.celectItemL {
    width: 96px;
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
    top: 10px;
    right: 190px;
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
    top: 10px;
    right: 70px;
    color: #c8000a;
    width: 100px;
    height: 34px;
    line-height: 34px;
    text-align: center;
	background-color: #ffffff;
    border:1px solid #c8000a;
    border-radius: 4px;
    cursor: pointer;
}
</style>
