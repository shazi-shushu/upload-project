<template>
  <div>
    <div class="content_tips">
      <!-- <span class="fz16 color333 content_tips_msg">查询结果</span> -->
      <span class="fz16 color333 addRoomTypeServer" @click="editAdv(0)">新增广告位</span>
    </div>
    <div class="list_content">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>广告频道名称</th>
            <th>广告位名称</th>
            <th>描述</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ item.channelName }}</td>
            <td>{{ item.pointName }}</td>
            <td>{{ item.pointDescribe }}</td>
            <td>{{ item.deleteFlag | flagFilter }}</td>
            <td class="caoZuoBtn">
              <span @click="editAdvType(item)">{{ item.deleteFlag | flagFilters }}</span>
              <!-- <span>编辑</span> -->
              <span @click="editAdv(item.pointId)">编辑</span>
              <span> <router-link :to="{path:'/advManagement/advSpaceMaintenanceList/lookAdvChanneMaintenanceList',query:{'channelId':item.channelId,'pointId':item.pointId}}">广告查看</router-link> </span>
              <!-- <span>下架</span> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 编辑广告位 -->
    <div v-if="editFlag" class="changeAdvSpance">
      <div class="changeAdvSpanceCont">
        <div class="title">{{ addNewPrams.title }}
          <span class="closed" @click="closed">x</span>
        </div>
        <div class="changeBody">
          <!-- 广告频道名称 -->
          <div class="changeBodyItem">
            <div class="itemName"><span class="red">*</span> 广告频道名称</div>
            <div class="itemMsg">
              <el-select v-model="addNewPrams.channeName" style="width:100%;" placeholder="请选择">
                <el-option
                  v-for="item in channeArr"
                  :key="item.channelId"
                  :label="item.channelName"
                  :value="item.channelId"
                />
              </el-select>
            </div>
          </div>
          <!-- 广告位名称 -->
          <div class="changeBodyItem">
            <div class="itemName"><span class="red">*</span> 广告位名称</div>
            <div class="itemMsg">
              <input ref="name" v-model="addNewPrams.name" type="text" @keyup="maxNum(addNewPrams.name,55,'name')">
            </div>
          </div>
          <!-- 描述 -->
          <div class="changeBodyItem">
            <div class="itemName">描述</div>
            <div class="itemMsgTex">
              <textarea v-model="addNewPrams.content" style="width: 100%;" />
            </div>
          </div>
          <!-- 状态 -->
          <div class="changeBodyItem">
            <div class="itemName"><span class="red">*</span> 状态</div>
            <div class="itemMsg">
              <el-select v-model="addNewPrams.type" style="width:55%;" placeholder="请选择">
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
            <span class="saveBtn" @click="saveAdvChanne(addNewPrams)">保存</span>
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
import { getToken } from '@/utils/auth'
import { getAdvPointSingle, updateAdvPointSingle, addAdvPointSingle, changeAdvPointSingle, getAllAdvertChannelName } from '@/api/adv/adv'
export default {
  filters: {
    flagFilter: function(val) {
      return val === 0 ? '启用' : '停用'
    },
    flagFilters: function(val) {
      return val === 1 ? '启用' : '停用'
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
        { value: 0, label: '启用' },
        { value: 1, label: '停用' }
      ],
      channeType: '',
      channeArr: [],
      // 新增广告频道 参数
      addNewPrams: {
        title: '新增广告位',
        name: '',
        content: '',
        type: 0,
        channelId: '',
        channelName: '',
        pointId: ''
      }
    }
  },
  beforeCreate() {
    // this.getAllChanne()
  },
  created() {
    //  this.getAllChanne()
  },
  mounted() {
    this.getAllChanne()
  },
  methods: {
    maxNum(val, num, name) {
      const reg = /^([1-9]\d*|[0]{1,1})$/
      if (name === 'sort') {
        if (!reg.test(val)) {
          this.$refs[name].value = ''
          this.addNewPrams[name] = ''
          this.$message({
            message: '必须输入数字',
            type: 'error'
          })
        }
      }
      if (val.length > num) {
        this.$refs[name].value = val.substring(0, num)
        this.addNewPrams[name] = this.$refs[name].value
        this.$message({
          message: '输入字段不能超过' + num,
          type: 'error'
        })
      }
    },
    closed() {
      this.editFlag = false
    },
    editAdvType(val) {
      const type = val.deleteFlag === 0 ? 1 : 0
      const objType = {
        pointId: val.pointId,
        deleteFlag: type,
        redisKey: getToken()
      }
      changeAdvPointSingle(objType).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.message,
            type: 'success',
            duration: 1 * 1000
          })
          this.$emit('editAdvType')
        } else {
          this.$message({
            message: res.data.message,
            type: 'error',
            duration: 1 * 1000
          })
        }
      })
    },
    editAdv(val) {
      // console.log(val)
      // 如果val存在是编辑否者是新增
      if (val !== 0) {
        const obj = {
          pointId: val
        }
        getAdvPointSingle(obj).then((res) => {
          // console.log('getAdvChanneSingle-res')
          // console.log(res)
          this.$nextTick(() => {
            // this.channeType = res.data.data.channelId
            this.addNewPrams = {
              title: '编辑广告频位',
              name: res.data.data.pointName,
              content: res.data.data.pointDescribe,
              type: res.data.data.deleteFlag,
              channelId: res.data.data.channelId,
              channeName: res.data.data.channelName,
              pointId: res.data.data.pointId
            }
          })
        })
      } else {
        this.addNewPrams = {
          title: '新增广告位',
          name: '',
          content: '',
          type: 0,
          channelId: '',
          channelName: '',
          pointId: ''
        }
      }
      this.editFlag = true
    },
    saveAdvChanne(val) {
      // console.log('updateAdvChanneSingle-res')
      // val == 新增广告频道 是新增 否则是编辑

      if (val.title === '新增广告位') {
        const addObj = {
          'pointDescribe': this.addNewPrams.content,
          'channelId': this.addNewPrams.channeName,
          'pointName': this.addNewPrams.name,
          'deleteFlag': this.addNewPrams.type,
          'pointId': ''
        }
        // console.log(addObj)
        if (addObj.channelId === '' || addObj.channelId === undefined) {
          this.$message({
            message: '广告频道名称不能为空',
            type: 'error',
            duration: 1500
          })
          return false
        } else if (addObj.pointName === '') {
          this.$message({
            message: '广告位名称不能为空',
            type: 'error',
            duration: 1500
          })
          return false
        } else if (addObj.deleteFlag === '') {
          this.$message({
            message: '状态不能为空',
            type: 'error',
            duration: 1500
          })
          return false
        }
        this.editFlag = false
        addAdvPointSingle(addObj).then((res) => {
          // console.log('updateAdvChanneSingle-res')
          // console.log(res)
          if (res.data.code === 200) {
            this.$message({
              message: res.data.message,
              type: 'success',
              duration: 1 * 1000
            })
            this.$emit('saveAdvChanne')
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
              duration: 10 * 1000
            })
          }
        })
      } else {
        const upObj = {
          'pointDescribe': this.addNewPrams.content,
          'channelId': isNaN(this.addNewPrams.channeName) ? this.addNewPrams.channelId : this.addNewPrams.channeName,
          'pointName': this.addNewPrams.name,
          'deleteFlag': this.addNewPrams.type,
          'pointId': val.pointId
        }
        console.log(upObj)
        if (upObj.channelId === '' || upObj.channelId === undefined) {
          this.$message({
            message: '广告频道名称不能为空',
            type: 'error',
            duration: 1500
          })
          return false
        } else if (upObj.pointName === '') {
          this.$message({
            message: '广告位名称不能为空',
            type: 'error',
            duration: 1500
          })
          return false
        } else if (upObj.deleteFlag === '') {
          this.$message({
            message: '状态不能为空',
            type: 'error',
            duration: 1500
          })
          return false
        }
        this.editFlag = false
        updateAdvPointSingle(upObj).then((res) => {
          // console.log('updateAdvChanneSingle-res')
          // console.log(res)
          if (res.data.code === 200) {
            this.$message({
              message: res.data.message,
              type: 'success',
              duration: 1 * 1000
            })
            this.$emit('saveAdvChanne')
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
              duration: 1 * 1000
            })
          }
        })
      }
      // this.$emit('saveAdvChanne')
    },
    getAllChanne() {
      getAllAdvertChannelName().then((res) => {
        // console.log('getAllAdvertChannelName')
        // console.log(this.addNewPrams.channelId)
        // this.$nextTick(() => {
        this.channeArr = res.data.data
        // })
      })
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
        overflow-x:scroll;
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
