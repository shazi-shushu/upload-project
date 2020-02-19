<template>
  <div class="maintenance">
    <div class="addbtn"><router-link :to="{path:'/addrole'}">添加角色</router-link></div>
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>角色名称</th>
          <th>角色描述</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list" :key="index">
          <td>{{ index+1 }}</td>
          <!-- <td class="orderNo"> <router-link :to="{path:'/orderDetails',query:{orderNo:item.orderNo}}">{{item.orderNo}}</router-link></td> -->
          <td>{{ item.roleName }}</td>
          <td>{{ item.roleDescribe }}</td>
          <td>{{ item.deleteFlag===0 ?"启用":"停用" }}</td>
          <td class="last_list">
            <span style="cursor:pointer" @click="edit(item)">编辑</span>
            <span style="cursor:pointer" @click="stop(item)">{{ item.deleteFlag===0?"停用":"启用" }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Maintenance',
  filters: {},
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      editItem: {}
    }
  },
  methods: {
    addData() {},
    edit(item) {
      // console.log(item)
      this.editItem = item
      this.$router.push({
        path: '/editrole',
        query: this.editItem
      })
    },
    stop(item) {
      var obj = {
        deleteFlag: item.deleteFlag === 0 ? 1 : 0,
        roleId: item.roleId,
        platform: 1
      }
      this.$emit('stop', obj)
    }
  }
}
</script>
<style scoped>
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
  font-family: MicrosoftYaHei;
  font-size: 14px;
}
.maintenance table{
    width:100%;
    border-collapse: collapse;
    text-align: center;
    margin-top: 10px;
    font-family: MicrosoftYaHei;
	font-size: 14px;
    border-radius: 4px
}
table thead th{
   background-color: #f6f6f6;
   border: solid 1px #e6e6e6;
   color: #666666;
   height: 40px;
   line-height: 40px
}
table tbody td{
    height: 40px;
    line-height: 40px;
	background-color: #ffffff;
	border: solid 1px #e6e6e6;
    color: #333333;
}
.last_list span{
	font-family: MicrosoftYaHei;
	font-size: 14px;
  color: #c8000a;
  padding: 0 30px
}

</style>
