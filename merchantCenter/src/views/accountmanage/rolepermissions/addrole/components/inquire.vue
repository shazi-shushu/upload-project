<template>
  <div class="role_inquire">
    <div class="role_form">
      <!-- 列表查询 -->
      <div>
        <label><span>*</span>角色名称</label>
        <div><input v-model="roleName" type="text" maxlength="55"></div>
      </div>
      <div>
        <label><span>*</span>角色描述</label>
        <div><textarea v-model="roleDescribe" maxlength="55" /></div>
      </div>
      <div>
        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span>状态</label>
        <div class="elSelect">
          <el-select v-model="deleteFlag" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.deleteFlag"
              :label="item.label"
              :value="item.deleteFlag"
            />
          </el-select>
        </div>
      </div>
    </div>
    <!-- 权限设置 -->
    <div class="permiss">
      <div class="permiss_top"><span /><span>权限设置</span></div>
      <table class="permiss_table">
        <thead style="background:#f5f5f5">
          <tr>
            <th>全选</th>
            <th>模块</th>
            <th>功能权限</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in allMsg" :key="index">
            <td style="text-align:center;border:solid 1px #e0e0e0">
              <el-checkbox v-model="item.checkAll" :indeterminate="item.isIndeterminate" @change="handleCheckAllChange(item.checkAll,item.id)">全选</el-checkbox>
            </td>
            <td style="text-align:center;border:solid 1px #e0e0e0">{{ item.name }}</td>
            <td style="display: flex;border:none;border-top:solid 1px #e0e0e0;vertical-align:middle" class="checkitem">
              <el-checkbox-group v-model="item.checkedCities" @change="handleCheckedCitiesChange(item.checkedCities,item.id)">
                <el-checkbox v-for="city in item.cities" :key="city.id" :label="city" class="checkitem">{{ city.authName }}</el-checkbox>
              </el-checkbox-group>
            </td>

          </tr>
        </tbody>
      </table>
      <div class="save_btn" @click="saveRole()">保存</div>
    </div>
  </div>
</template>
<script>
import { getAuths } from '@/api/accountManage/rolePermission'
import { getToken } from '@/utils/auth'
import { addData } from '@/api/accountManage/rolePermission'
import axios from 'axios'
export default {
  name: 'RoleInquire',
  data() {
    return {
      param: {
        platform: 0
      },
      roleName: '',
      authIds: '',
      ids: [],
      roleDescribe: '',
      options: [{
        deleteFlag: 0,
        label: '启用'
      }, {
        deleteFlag: 1,
        label: '禁用'
      }],
      deleteFlag: 0,
      allMsg: [

      ],
      checkArray: []

    }
  },
  mounted() {
    getAuths(this.param).then(res => {
      // console.log(111111111)
      // console.log(res)
      const msg = res.data.data
      console.log(msg)
      for (let i = 0; i < msg.length; i++) {
        const arr = []

        // console.log(arr)
        const obj = {
          name: msg[i].authName,
          id: i,
          authId: msg[i].authId,
          checkAll: false,
          checkedCities: [],
          cities: arr,
          isIndeterminate: true,
          authPid: msg[i].authPid,
          deleteFlag: this.deleteFlag,
          platform: 0
        }
        for (var j = 0; j < msg[i].children.length; j++) {
          msg[i].children[j].id = j
          arr.push(msg[i].children[j])
        }
        this.allMsg.push(obj)
      }
      // console.log(this.allMsg)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    saveRole() {
      var obj = {
        // redisKey:getToken(),
        roleName: this.roleName,
        roleDescribe: this.roleDescribe,
        deleteFlag: this.deleteFlag,
        platform: 0,
        authIds: this.authIds
      }
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (obj.roleName.replace(/\s*/g, '') === '') {
        this.$message({
          message: '角色名称不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.roleName.length >= 55) {
        this.$message({
          message: '角色名称字数超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.roleDescribe.replace(/\s*/g, '') === '') {
        this.$message({
          message: '角色描述不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.roleDescribe.length >= 55) {
        this.$message({
          message: '角色描述字数超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      } else if (obj.deleteFlag === '') {
        this.$message({
          message: '状态不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }
      addData(obj).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.getList(this.param)
        } else {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log('err:', err)
      })

      this.$router.push({ path: '/accountManage/rolepermissions' })
    },
    handleCheckAllChange(val, i) {
      console.log(val)
      console.log(i)
      this.allMsg[i].checkedCities = val ? this.allMsg[i].cities : []
      this.allMsg[i].isIndeterminate = false
      console.log(this.allMsg)

      this.getAllChekced()
    },
    handleCheckedCitiesChange(value, i) {
      console.log(value)
      const checkedCount = value.length
      this.allMsg[i].checkAll = checkedCount === this.allMsg[i].cities.length
      this.allMsg[i].isIndeterminate = checkedCount > 0 && checkedCount < this.allMsg[i].cities.length
      this.checkedCities = value
      this.getAllChekced()
    },
    getAllChekced: function() {
      // this.allMsg
      this.checkArray = []
      for (let i = 0; i < this.allMsg.length; i++) {
        this.checkArray = this.checkArray.concat(this.allMsg[i].checkedCities)
      }
      var newSet = new Set(this.checkArray)
      this.checkArray = Array.from(newSet)
      console.log(this.checkArray)
      var ids = []
      for (let i = 0; i < this.checkArray.length; i++) {
        ids.push(this.checkArray[i].authId)
      }
      this.authIds = ids.join(',')
      // console.log(ids.join(","));
    }

  }
}
</script>
<style scoped>
 input,textarea{
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
  -webkit-appearance:none;
  outline: none;
  border: none;
  margin-left: 18px;
  padding: 10px 0 10px 16px;
}
.role_form div{
  display: flex;
  align-items: center;
  list-style: none;
 }
.role_form input{
    width: 398px;
	height: 34px;
	border-radius: 4px;
    border: solid 1px #dddddd;
    margin-bottom: 10px
}
.role_form textarea{
    width: 398px;
	height: 68px;
	border-radius: 4px;
    border: solid 1px #dddddd;
    margin-bottom: 20px;
    vertical-align: middle
}
.elSelect{
   margin-left: 18px;
}
div label{
    font-size: 14px;
    color: #666666;
}
div label span{
  display: inline-block;
  width: 7px;
	height: 7px;
	font-size: 16px;
  color: #c8000a;
  margin-right: 4px;
  vertical-align: middle
}
.permiss{
    /* border: solid 1px; */
    width: 100%;
    overflow: hidden;
     margin-top: 10px;
}
.permiss_top{
    padding: 6px 0
}
.permiss_top span:first-of-type{

    display: inline-block;
    /* padding: 6px 0; */
    width: 4px;
	height: 20px;
    background-color: #c8000a;
    margin-right: 4px;
    border-radius: 2px;
    vertical-align: middle
}
/*
.permiss_top span:last-of-type{
    display: inline-block;
    width: 56px;
	height: 14px;
	font-size: 14px;
    color: #666666;
    margin-left: 6px;
	font-family: MicrosoftYaHei;
    font-weight: normal;
     vertical-align: middle
}*/
.permiss_table{
    border-collapse: collapse;
    width:80%;
     border: solid 1px #e0e0e0;
}
.permiss_table th{
    height: 36px;
    line-height: 36px;
     border-left: solid 1px #e0e0e0;
	font-size: 14px;
	color: #666666;
}
.permiss_table td{
  height: 36px;
  line-height: 36px;
	font-size: 14px;
	color: #333333;
  vertical-align: middle
}
.permiss_table td p{
  height: 36px;
  line-height: 36px;
  margin-top:0;
  clear: both;
   font-size: 14px;
color: #333333;
}
.el-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    font-size: 14px;
    color: #333333;
}
.el-checkbox .checkitem{
  margin-left: 30px
}
.checkitem{
  padding-left: 30px
}
.save_btn{
  width: 120px;
	height: 38px;
	background-color: #c8000a;
  border-radius: 4px;
  position: absolute;
  bottom: 0;
  left: 40%;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 38px;
  cursor: pointer;
}
</style>
