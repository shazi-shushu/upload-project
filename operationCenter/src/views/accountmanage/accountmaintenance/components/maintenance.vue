<template>
  <div class="maintenance">
    <div class="addbtn" @click="addData()">添加账号</div>
    <table>
      <thead>
        <tr>
          <th width:78px>序号</th>
          <th>登录名</th>
          <th>用户姓名</th>
          <th>手机号码</th>
          <th>所属角色</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list" :key="index">
          <td>{{ index+1 }}</td>
          <!-- <td class="orderNo"> <router-link :to="{path:'/orderDetails',query:{orderNo:item.orderNo}}">{{item.orderNo}}</router-link></td> -->
          <td>{{ item.operationLoginName }}</td>
          <td>{{ item.operationName }}</td>
          <td>{{ item.operationNum }}</td>
          <td>{{ item.roleName }}</td>
          <td class="last_list">
            <span :key="index" @click="btnfc(item)">编辑</span>
            <span @click="pswReset(item)">重置密码</span>
            <span @click="del(item.operationId)">删除</span>
          </td>
        </tr>

      </tbody>
    </table>

    <!-- 编辑账号弹框 -->
    <div v-show="show" class="mask">
      <div class="littleMask" style="width:448px;height:374px;overflow:hidden">
        <div class="maskHeader">
          <span>编辑账号</span>
          <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span>
        </div>
        <div class="tableform">
          <li style="margin-top:15px"><label><span>*</span>登录名</label><input v-model="maskLoginName" type="text" maxlength="55"></li>
          <li><label><span>*</span>用户姓名</label><input v-model="maskUserName" type="text" maxlength="55"></li>
          <li><label><span>*</span>手机号</label><input v-model="maskPhone" type="text" maxlength="55"></li>
          <li><label><span>*</span>所属角色</label>
            <div class="selectedItem">
              <el-select v-model="roleId" placeholder="请选择">
                <el-option
                  v-for="(items) in item"
                  :key="items.roleId"
                  :label="items.roleName"
                  :value="items.roleId"
                />
              </el-select>
            </div>
          </li>
        </div>
        <div class="search_btn" @click="save()">保存</div>
      </div>
    </div>
    <!-- 添加账号弹框 -->
    <div v-show="show1" class="mask">
      <div class="littleMask">
        <div class="maskHeader">
          <span>添加账号</span>
          <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span>
        </div>
        <div class="tableform">
          <li style="margin-top:15px"><label><span>*</span>登录名</label><input v-model="maskLoginName" type="text" maxlength="55"></li>
          <li><label><span>*</span>密码</label><input v-model="maskPassword" type="text" maxlength="55"></li>
          <p id="des">密码由8-20位字母、数字组合，区分大小写</p>
          <li><label><span>*</span>用户姓名</label><input v-model="maskUserName" type="text" maxlength="55"></li>
          <li><label><span>*</span>手机号</label><input v-model="maskPhone" type="text" maxlength="55"></li>
          <li><label><span>*</span>所属角色</label>
            <div class="selectedItem">
              <el-select v-model="roleId" placeholder="请选择">
                <el-option
                  v-for="(items) in item"
                  :key="items.roleId"
                  :label="items.roleName"
                  :value="items.roleId"
                />
              </el-select>
            </div>
          </li>
        </div>
        <div class="search_btn" @click="add()">添加</div>
      </div>
    </div>
    <!-- 删除账号弹框 -->
    <div v-show="show3" class="mask">
      <div class="littleMask" style="width:380px;height:226px;overflow:hidden">
        <div class="maskHeader" style="text-align:center">
          <span style="font-size: 16px;color: #333333">删除</span>
          <!-- <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span> -->
        </div>
        <div class="psdtoast">
          <div>确定要删除吗？</div>
        </div>
        <div class="psd_btn">
          <button @click="delyyes()">确定</button>
          <button @click="delnno()">取消</button>
        </div>
      </div>
    </div>
    <!-- 重置密码弹框 -->
    <div v-show="show2" class="mask">
      <div class="littleMask" style="width:380px;height:226px;overflow:hidden">
        <div class="maskHeader" style="text-align:center">
          <span style="font-size: 16px;color: #333333">重置密码</span>
          <!-- <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span> -->
        </div>
        <div class="psdtoast">
          <div>是否将密码重置为<span>{{ initpsd }}</span>?</div>
        </div>
        <div class="psd_btn">
          <button @click="yyes()">确定</button>
          <button @click="nno()">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { getAccount } from '@/api/accountManage/account'
// import { addAccount } from '@/api/accountManage/account'
// import { updateAccount } from '@/api/accountManage/account'
import { getRole } from '@/api/accountManage/account'
import { getToken } from '@/utils/auth'
// import axios from 'axios'
export default {
  name: 'Maintenance',
  components: {
  },
  filters: {},
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      item: [],
      show: false,
      show1: false,
      show2: false,
      show3: false,
      // 重置密码
      initpsd: '123456',
      num: '',

      // 编辑数据
      maskLoginName: '',
      maskUserName: '',
      maskPhone: '',
      maskCharacter: '',
      maskPassword: '',
      roleId: '',
      operationId: '',
      param1: {
        platform: 1
      },
      // 删除数据
      delobj: {}
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    addData: function() {
      this.maskLoginName = ''
      this.maskUserName = ''
      this.maskPhone = ''
      this.maskCharacter = ''
      this.maskPassword = ''
      this.roleId = ''
      var that = this
      that.show1 = true
      getRole(this.param1).then((res) => {
        // console.log('getRole res:', res)
        this.item = res.data.data
        console.log('ggg:', this.item)
      }).catch((err) => {
        console.log('err:', err)
      })
    },
    pswReset: function(item) {
      var that = this
      that.show2 = true
      this.num = item.operationId
      this.maskLoginName = item.operationLoginName

      console.log(this.num)
    },
    yyes: function() {
      var that = this
      that.show2 = false
      // console.log(this.list[this.num])
      console.log(this)
      const obj = {
        operationLoginName: this.maskLoginName,
        operationId: this.num,
        operationPassword: this.initpsd
      }
      console.log(obj)

      this.$emit('initpassword', obj)
    },
    nno: function() {
      var that = this
      that.show2 = false
    },
    del: function(index) {
      var that = this
      that.show3 = true
      this.delobj.operationId = ''
      this.delobj.redisKey = ''
      var obj = {
        operationId: index,
        deleteFlag: 1,
        redisKey: getToken()
      }
      this.delobj.operationId = obj.operationId
      this.delobj.deleteFlag = obj.deleteFlag
      this.delobj.redisKey = obj.redisKey
    },
    // 删除弹框
    delyyes: function() {
      var that = this
      that.show3 = false
      console.log(this)
      const obj = {
        operationId: this.delobj.operationId,
        deleteFlag: 1,
        redisKey: getToken()
      }
      console.log(obj)
      this.$emit('delData', obj)
    },
    delnno: function() {
      var that = this
      that.show3 = false
    },

    // 点击弹窗
    btnfc: function(item) {
      console.log('编辑item:', item)
      // console.log(index)
      this.maskLoginName = ''
      this.maskUserName = ''
      this.maskPhone = ''
      this.maskCharacter = ''
      this.maskPassword = ''
      this.roleId = ''
      this.operationId = ''
      var that = this
      that.show = true
      // 下拉框
      getRole(this.param1).then((res) => {
        console.log('getRole res:', res)
        this.item = res.data.data
        // console.log('ggg:', this.item)
      }).catch((err) => {
        console.log('err:', err)
      })
      this.maskLoginName = item.operationLoginName
      this.maskUserName = item.operationName
      this.maskPhone = item.operationNum
      this.maskCharacter = item.roleName
      this.roleId = item.roleId
      this.operationId = item.operationId
      console.log(this.maskCharacter)
    },
    hiddenShow: function() {
      var that = this
      that.show = false
      that.show1 = false
      that.show2 = false
    },

    save: function() {
      // var that = this
      // that.show = false
      const obj = {
        operationId: this.operationId,
        operationLoginName: this.maskLoginName,
        operationName: this.maskUserName,
        operationNum: this.maskPhone,
        roleName: this.maskCharacter,
        roleId: this.roleId,
        //redisKey: getToken()
      }
      // const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      // paramVal.replace(/\s*/g,"")
      if (obj.operationLoginName.replace(/\s*/g, '') === '') {
        this.$message({
          message: '登录名不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.operationLoginName.length >= 55) {
        this.$message({
          message: '登录名长度超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.operationName.replace(/\s*/g, '') === '') {
        this.$message({
          message: '用户姓名不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.operationName.length >= 55) {
        this.$message({
          message: '用户姓名字数超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.operationNum.replace(/\s*/g, '') === '') {
        this.$message({
          message: '手机号不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.operationNum.length >= 55) {
        this.$message({
          message: '字数超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (!myreg.test(obj.operationNum)) {
        this.$message({
          message: '非有效手机号',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.roleId === '') {
        this.$message({
          message: '所属角色不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }
      this.show = false
      this.$emit('editData', obj)
    },
    add: function() {
      var obj = {
        operationLoginName: this.maskLoginName,
        operationName: this.maskUserName,
        operationNum: this.maskPhone,
        operationPassword: this.maskPassword,
        roleId: this.roleId,
        roleName: this.maskCharacter
      }
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      // paramVal.replace(/\s*/g,"")
      if (obj.operationLoginName.replace(/\s*/g, '') === '') {
        this.$message({
          message: '登录名不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.operationLoginName.length >= 55) {
        this.$message({
          message: '登录名长度超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.operationPassword.replace(/\s*/g, '') === '') {
        this.$message({
          message: '密码不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.operationNum.length >= 55) {
        this.$message({
          message: '字数超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (!reg.test(obj.operationPassword)) {
        this.$message({
          message: '密码格式不正确',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.operationName.replace(/\s*/g, '') === '') {
        this.$message({
          message: '用户姓名不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.operationName.length >= 55) {
        this.$message({
          message: '用户姓名字数超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.operationNum.replace(/\s*/g, '') === '') {
        this.$message({
          message: '手机号不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (!myreg.test(obj.operationNum)) {
        this.$message({
          message: '非有效手机号',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.roleId === '') {
        this.$message({
          message: '所属角色不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }
      this.show1 = false
      this.$emit('addData', obj)
    }

  }
}
</script>
<style scoped>
select,input{
  /* -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
  -webkit-appearance:none;
  outline: none;
  border: none; */
  margin-left: 18px;
  margin-right: 66px;

}
.maintenance {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 24px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  background-color: #ffffff;
}
.addbtn {
  width: 100px;
  height: 34px;
  background-color: #c8000a;
  border-radius: 4px;
  text-align: center;
  line-height: 34px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}
.maintenance table{
  width:100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 10px;
	font-size: 14px;
  border-radius: 4px
}
table thead th{
   background-color: #f6f6f6;
   border: solid 1px #e6e6e6;
   color: #666666;
   height: 38px;
   line-height: 38px
}
table tbody td{
    height: 38px;
    line-height: 38px;
	background-color: #ffffff;
	border: solid 1px #e6e6e6;
    color: #333333;
}

.last_list span{
	font-size: 14px;
	color: #c8000a;
  padding: 15px;
  cursor: pointer
}
.mask{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left:0;
  z-index:2000;
}
.littleMask{
  width: 448px;
  height: 460px;
  background: white;
  position: absolute;
  top:50%;
  left: 50%;
  transform:  translateY(-50%) translateX(-50%);
  border-radius: 8px;
  position: relative;
}

.maskHeader{
  padding: 12px 20px;
  background: #eeeeee;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.maskHeader span:first-of-type{
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #222222;
}
.maskHeader span:last-of-type{
  font-size: 12px;
  color: #222222;
  color: #666666;
}
.tableform li{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  margin-top: 26px
}
.tableform input,
.tableform select{
  width: 240px;
	height: 34px;
	background-color: #ffffff;
	border-radius: 4px;
  border: solid 1px #dddddd;
  font-size: 14px;
  padding: 10px 0 10px 16px;

}
.tableform select option{
  padding: 8px 14px;
	font-size: 14px;
	font-weight: normal;
}
.tableform label{
	font-size: 14px;
  color: #666666;
}
.tableform label span{
  display: inline-block;
  width: 7px;
	height: 7px;
	font-size: 16px;
  color: #c8000a;
  margin-right: 4px;
  vertical-align: middle
}
#des{
  width: 230px;
	height: 13px;
	font-size: 12px;
  color: #cccccc;
  margin-top: 7px;
  margin-left: 142px;
}
.selectedItem{
    width: 240px;
    display: inline-block;
    margin-right: 66px;
    margin-left: 18px;
}
.selectedItem input {
    width: 100%;
    height: 34px;
    line-height: 34px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding-left: 4px;

}
.search_btn{
  width: 120px;
	height: 38px;
	background-color: #c8000a;
  border-radius: 4px;
  position: absolute;
  bottom: 35px;
  left: 158px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 38px;
  cursor: pointer
}
.psdtoast{
  width:380px;
  height: 136px;
  line-height: 136px;
  text-align: center;
  box-sizing: border-box;
  font-size: 16px;
  color: #666666;
}
.psdtoast span{
  color: #c8000a;
}
.psd_btn{
  width: 100%;
  display: flex;
  justify-content: center
}
.psd_btn button{
  width: 49%;
  border: none;
  outline: none;
  border-top: solid 1px #eeeeee;
  padding: 16px 0;
  text-align: center;
  background: #ffffff;
  font-size: 16px;
  color: #c8000a;
}
.psd_btn button:first-of-type{
  border-right: solid 1px #eeeeee;
}
 .page_msg{
   margin-top: 20px;
    text-align: right;
    padding: 20px 0px 40px 0px;
    background-color: #ffffff;
    color: #666666;
  }
    .el-pager li {
    color: #666666;
    cursor: default;
 }
  .el-pager li.active {
    color: #d3b6b6;
    cursor: default;
    background-color: #c8000a;
    border-radius: 2px;
}
</style>
