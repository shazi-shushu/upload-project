<template>
  <div>
    <div class="content_tips">
      <!-- <span class="fz16 color333 content_tips_msg">查询结果</span> -->
      <!-- <span class="fz16 color333 addRoomTypeServer" @click="editAdv">新增广告位</span> -->
    </div>
    <div class="list_content">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>广告位名称</th>
            <th>广告标题</th>
            <th>排序值</th>
            <th>URL</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>状态</th>
            <!-- <th>操作</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ item.pointName }}</td>
            <td>{{ item.advertTitle }}</td>
            <td>{{ item.sort }}</td>
            <td>{{ item.returnUrl }}</td>
            <td>{{ item.startTime | getGangDateMiaos }}</td>
            <td>{{ item.endTime | getGangDateMiaos }}</td>
            <td>{{ item.deleteFlag | flagFilter }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 编辑广告位 -->
    <div v-if="editFlag" class="changeAdvSpance">
      <div class="changeAdvSpanceCont">
        <div class="title">编辑广告位
          <span class="closed" @click="closed">x</span>
        </div>
        <div class="changeBody">
          <!-- 广告频道名称 -->
          <div class="changeBodyItem">
            <div class="itemName"><span class="red">*</span> 广告频道名称</div>
            <div class="itemMsg">
              <el-select v-model="roomTypeValue" style="width:100%;" placeholder="请选择">
                <el-option
                  v-for="item in roomType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <!-- 广告位名称 -->
          <div class="changeBodyItem">
            <div class="itemName"><span class="red">*</span> 广告位名称</div>
            <div class="itemMsg">
              <input type="text">
            </div>
          </div>
          <!-- 描述 -->
          <div class="changeBodyItem">
            <div class="itemName">描述</div>
            <div class="itemMsgTex">
              <textarea style="width: 100%;" />
            </div>
          </div>
          <!-- 状态 -->
          <div class="changeBodyItem">
            <div class="itemName"><span class="red">*</span> 状态</div>
            <div class="itemMsg">
              <el-select v-model="roomTypeValue" style="width:55%;" placeholder="请选择">
                <el-option
                  v-for="item in roomType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <!-- 保存 -->
          <div class="btnCont">
            <span class="saveBtn">保存</span>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
  </div>
</template>
<script>
/* Layout */
// import Layout from '@/views/layout/Layout'
import { getGangDateMiaoShi } from '@/utils/validate'
export default {
  filters: {
    getGangDateMiaos: getGangDateMiaoShi,
    flagFilter: function(val) {
      return val === 0 ? '启用' : '停用'
    },
    hasRefuns: function(val) {
      // console.log(val)
      return val === true ? '有' : '-'
    },
    isInvoices: function(val) {
      // console.log(val)
      return val === true ? '需要' : '不需要'
    },
    platforms: function(val) {
      const platformList = { 1: '融e购', 2: '融e联' }
      return platformList[val]
    },
    channels: function(val) {
      // 业务板块:1=旅游频道 2=E差旅
      const channelList = { 1: '旅游频道', 2: 'E差旅' }
      return channelList[val]
    },
    statusType: function(val) {
      // 订单状态：订单状态：0-待付款;1-付款成功;2-预定成功;3-已完成;4-已关闭;5-已取消;9-退款中;10-已退款;11-退款失败;12-预定失败
      const statusTypeObj = { 0: '待付款', 1: '付款成功', 2: '预定成功', 3: '已完成', 4: '已关闭', 5: '已取消', 9: '退款中', 10: '已退款', 11: '退款失败', 12: '预定失败' }
      return statusTypeObj[val]
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      editFlag: false,
      roomTypeValue: '',
      // 下拉选项：请选择、上架、下架
      roomType: [
        { value: '', label: '请选择' },
        { value: 0, label: '上架' },
        { value: 1, label: '下架' }
      ]
    }
  },
  methods: {
    closed() {
      this.editFlag = false
    },
    editAdv() {
      this.editFlag = true
    }
  }
}
</script>
<style scoped>
    .content_tips{
        height: 60px;
        line-height: 60px;
        background-color: #ffffff;
        padding-left: 20px;
        margin-top: 4px;
        position: relative;
    }
    .content_tips_msg{
        border-left: 2px solid #c8000a;
        padding-left: 4px;
        height: 14px;
        /* display: inline-block; */
    }
    .addRoomTypeServer{
        position: absolute;
        bottom: 4px;
        right: 20px;
        color: #ffffff;
        background-color: #c8000a;
        height: 34px;
        line-height: 34px;
        padding: 0px 14px;
        border-radius: 4px;
        cursor: pointer;
    }
    .fl{
        float: left;
    }
    .caoZuoBtn span{
        display: inline-block;
        /* border-radius: 10px; */
        /* border: solid 1px #c8000a; */
        height: 28px;
        line-height: 28px;
        padding: 0px 10px;
        cursor: pointer;
        color: #c8000a;
        font-size: 14px;
        margin-right: 10px;
    }
    .list_content{
        /* overflow-x:scroll; */
        width: 100%;
        padding: 0px 20px;
        background-color: #ffffff;
    }
    table{border-collapse: collapse;}
    table td,th{
        border: 1px solid #dfdfdf;
        white-space: nowrap;
        }
   .list_content table {
      color: #666666;
      font-size: 14px;
      width: 100%;
       /* min-width:1200px; */
   }
   .list_content table tr .orderNo{
       color: #d80d16;
       text-decoration: underline;
       cursor: pointer;
   }
   .list_content table thead{
      height: 40px;
      line-height: 40px;
      background-color: #f6f6f6;
   }
   .list_content table thead tr th{
      border: solid 1px #dfdfdf;
      padding: 0px 10px;
   }
   .list_content table tbody{
      height: 39px;
      line-height: 39px;
      background-color: #ffffff;
   }
   .list_content table tbody tr td{
      border: solid 1px #dfdfdf;
      padding: 0px 10px;
      text-align: center;
   }
/* 编辑广告位弹框部分 start */
.changeAdvSpance{position: fixed;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.4);top: 0px;left: 0px;z-index: 1111;}
.changeAdvSpanceCont{width: 400px;overflow: hidden;border-radius: 4px;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);}
.title{position: relative;width: 100%;height: 40px;line-height: 40px;color: #222222;font-size: 16px;background-color: #eeeeee;padding-left: 10px;}
.closed{display: inline-block;width: 40px;line-height: 40px;text-align: center;cursor: pointer;position: absolute;top: 0px;right: 0px;}
.changeBody{padding: 20px;background-color: #ffffff;}
.changeBodyItem{display: flex;margin-bottom: 20px;}
.itemName{color: #666666;font-size: 14px;width: 100px;text-align: right;height: 34px;line-height: 34px;margin-right: 10px;display: inline-block;}
.itemMsg{width: 240px;height: 34px;line-height: 34px;display: inline-block;}
.itemMsgTex{width: 240px;display: inline-block;}
.itemMsg input{width: 240px;height: 34px;line-height: 34px;border: 1px solid #dfdfdf;padding-left: 4px;color: #333333;border-radius: 4px;font-size: 14px;}
.itemMsgTex textarea{width: 100%;height: 60px;border: 1px solid #dfdfdf;padding-left: 4px;color: #333333; border-radius: 4px;resize:none;font-size: 14px;}
.btnCont{
  width: 100%;
  text-align: center;
}
.saveBtn{
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 14px;
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
	background-color: #c8000a;
	border-radius: 4px;
}
/* end */
</style>
