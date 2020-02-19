<template>
  <div>
    <div class="content_tips">
      <!-- <span class="fz16 color333 content_tips_msg">查询结果</span> -->
      <span class="fz16 color333 addRoomTypeServer">
        <router-link :to="{'path':'/merchantMaintenance/setMerchantMaintenance'}">添加商户</router-link>
      </span>
    </div>
    <div class="list_content">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>商户名称</th>
            <th>商户编号</th>
            <th>登录用户名</th>
            <th>联系手机号</th>
            <th>创建者</th>
            <th>创建时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ item.merchantName }}</td>
            <td>{{ item.merchantCode }}</td>
            <td>{{ item.merchantLoginName }}</td>
            <td>{{ item.merchantNum }}</td>
            <td>{{ item.createName }}</td>
            <td>{{ item.createTime | getGangDateMiaoShis }}</td>
            <td>{{ item.deleteFlag | flagFilter }}</td>
            <td class="caoZuoBtn">
              <span>
                <router-link :to="{'path':'/merchantMaintenance/editMerchantMaintenance',query:{'param':item}}">编辑</router-link>
              </span>
              <span @click="clickBtn(0,item)">{{ item.deleteFlag | flagFilters }}</span>
              <span @click="clickBtn(1,item)">重置密码</span>
              <span @click="setPvermissions(item)">设置权限</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 编辑广告位 -->
    <div v-if="setFlag" class="changeAdvSpance">
      <div class="changeAdvSpanceCont">
        <div class="title">设置权限
          <span class="closed" @click="closed">x</span>
        </div>
        <div class="changeBody">
          <div style="padding-bottom:10px;">
            <div>选择品类</div>
            <div style="padding-top:10px;">
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :key="city.id" style="width: 90px;" :label="city.id">{{ city.val }}</el-checkbox>
              </el-checkbox-group>
              <!-- <el-checkbox-group v-model="checkList">
                 <el-checkbox style="width:33%;" label="门票" />
                <el-checkbox style="width:33%;" label="国内酒店" />
                <el-checkbox style="width:33%;" label="火车票" />
                <el-checkbox style="width:33%;" label="国内机票" />
                <el-checkbox style="width:33%;" label="线路" />
                <el-checkbox style="width:33%;" label="签证" />
                <el-checkbox style="width:33%;" label="国际机票" />
                <el-checkbox style="width:33%;" label="国际酒店" />
              </el-checkbox-group> -->
            </div>
          </div>
          <!-- 保存 -->
          <div class="btnCont">
            <span class="saveBtn" @click="saveAdvChanne()">保存</span>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- /* 停用和重置密码弹框部分start */ -->
    <div v-if="showAlertFlag" class="alertCont">
      <div class="alertBody">
        <div class="alertTitle">
          <span v-if="showFlag">重置密码</span>
          <span v-if="!showFlag">停用</span>
        </div>
        <div class="alertContent">
          <span v-if="showFlag">确定要将密码重置为<span class="red">123456</span>？</span>
          <span v-if="!showFlag">您确认将<span class="red">{{ shanghuName }}</span>{{ typeFlag | flagFilters }}？</span>
        </div>
        <div class="alertBtnCont">
          <div class="closeBtn" @click="quXiao">取消</div>
          <div class="sureBtn" @click="queDing">确认</div>
        </div>
      </div>
    </div>
    <!-- /* end */  -->
  </div>
</template>
<script>
/* Layout */
// import Layout from '@/views/layout/Layout'
import { updateMerchant, getAuths } from '@/api/merchant/merchant'
import { getGangDateMiaoShi } from '@/utils/validate'
// import { getAdvPointSingle, updateAdvPointSingle, addAdvPointSingle, changeAdvPointSingle, getAllAdvertChannelName } from '@/api/adv/adv'
export default {
  filters: {
    getGangDateMiaoShis: getGangDateMiaoShi,
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
      checkList: [],
      checkedCities: [],
      cities: [],
      showAlertFlag: false,
      showFlag: false,
      setFlag: false,
      param: {},
      shanghuName: '',
      typeFlag: '',
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
        title: '设置权限',
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
    this.init()
  },
  mounted() {
    // this.init()
  },
  methods: {
    handleCheckedCitiesChange(value) {
      // console.log(value)
      this.checkedCities = value
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    init() {
      getAuths().then((res) => {
        // console.log('getAuths res')
        // console.log(res.data.data)
        const obj = res.data.data
        const arr = []
        for (const val in obj) {
          const newObj = {
            id: val,
            val: obj[val]
          }
          arr.push(newObj)
        }
        this.cities = arr
        // this.checkedCities = [3,5]
        // console.log(arr)
      })
    },
    quXiao() {
      this.showAlertFlag = false
    },
    queDing() {
      // showFlag = true 是修改密码 =false是启用停用商户
      if (!this.showFlag) {
        this.param.deleteFlag = this.param.deleteFlag === 0 ? 1 : 0
      } else {
        this.param.merchantPassword = '123456'
      }
      this.update()
      this.showAlertFlag = false
    },
    clickBtn(val, itemVal) {
      this.param = Object.assign({}, itemVal)
      this.showAlertFlag = true
      if (val === 0) {
        this.typeFlag = this.param.deleteFlag
        this.shanghuName = this.param.merchantName
        this.showFlag = false
      } else {
        this.showFlag = true
      }
    },
    closed() {
      this.setFlag = false
    },
    setPvermissions(val) {
      this.param = Object.assign({}, val)
      this.checkedCities = this.param.authIds.split(',')
      this.setFlag = true
    },
    saveAdvChanne(val) {
      // let flag = true
      this.param.authIds = this.checkedCities.join(',')
      // console.log(this.param.authIds)
      // if(flag){
      if (this.checkedCities.join(',').length === 0) {
        this.$message({
          message: '至少选择一个业务品类',
          type: 'error',
          duration: 1 * 1000
        })
        // flag = false
        return false
      }
      this.update()
      this.setFlag = false
      // }
    },
    update() {
      // console.log(this.param)
      updateMerchant(this.param).then((res) => {
        // console.log("add res")
        // console.log(res)
        if (res.data.code === 200) {
          this.$message({
            message: res.data.message,
            type: 'success',
            duration: 1 * 1000
          })
          this.$emit('changeListNew')
          // this.$router.push('/merchantMaintenance/merchantMaintenanceList')
        } else {
          this.$message({
            message: res.data.message,
            type: 'error',
            duration: 1 * 1000
          })
        }
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
.title{text-align: center;position: relative;width: 100%;height: 40px;line-height: 40px;color: #222222;font-size: 16px;background-color: #eeeeee;padding-left: 10px;}
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
<style scoped>
/* 停用和重置密码弹框部分start */
.alertCont{position: fixed;top: 0px;left: 0px;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.4);z-index: 1111}
.alertBody{color: #333333;font-size: 16px;width: 380px;overflow: hidden;border-radius: 4px;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);}
.alertTitle{background-color: #f5f5f5;height: 40px;line-height: 40px;text-align: center;color: #333333;font-size: 16px;}
.alertContent{color: #333333;height: 140px;line-height: 140px;background-color: #ffffff;text-align: center;}
.alertBtnCont{height: 40px;line-height: 40px;background-color: #ffffff;text-align: center;display: flex;color: #c8000a;}
.closeBtn{flex: 1;text-align: center;border-top:1px solid #eeeeee;border-right:1px solid #eeeeee;cursor: pointer;}
.sureBtn{flex: 1;text-align: center;border-top:1px solid #eeeeee;cursor: pointer;}
/* end */
</style>

