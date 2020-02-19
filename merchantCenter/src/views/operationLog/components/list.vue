<template>
  <div class="list">
    <div class="addbtn" @click="addData()">导出Excel</div>
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>用户名</th>
          <th>功能模块</th>
          <th>行为</th>
          <th>操作时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in listarr" :key="index">
          <td>{{ index+1 }}</td>
          <td>{{ item.createName }}</td>
          <td>{{ item.authName }}</td>
          <td>{{ item.logAction }}</td>
          <td>{{ getTime(item.createTime) }}</td>
        </tr>

      </tbody>
    </table>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  name: 'List',
  components: {
  },
  filters: {},
  props: {
    listarr: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  mounted: function() {

  },
  methods: {
    addData: function() {
      // window.location.href = 'https://biztriptest.youpinsanyue.com/tripManager/export/exportMerchantLogToExcel?fileName=商户中心操作日志'
      window.location.href = this.$store.state.user.url + '/export/exportMerchantLogToExcel?fileName=商户中心操作日志'
    },
    edit() {},
    getTime(t) {
      const fillZero = (n) => {
        const result = (n).toString().length === 1 ? ('0' + n) : n
        return result
      }
      const formatTime = (t = new Date()) => {
        const d = new Date(t)
        const year = d.getFullYear()
        const month = d.getMonth() + 1
        const date = d.getDate()
        const hours = d.getHours()
        const minutes = d.getMinutes()
        const seconds = d.getSeconds()
        const result = `${year}-${fillZero(month)}-${fillZero(date)}` + '\xa0\xa0\xa0' + `${fillZero(hours)}:${fillZero(minutes)}:${fillZero(seconds)}`
        return result
      }
      const res = formatTime(new Date(t))
      return res
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
.list {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 24px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  background-color: #ffffff;
  margin-top: 20px
}
.addbtn {
  width: 100px;
  height: 14px;
  border-radius: 4px;
  text-align: center;
  line-height: 14px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
	color: #c8000a;
}
.list table{
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
/* .last_list{
  display: flex;
  justify-content: space-between
} */
.last_list span{
	font-family: MicrosoftYaHei;
	font-size: 14px;
	color: #c8000a;
  padding: 15px

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
  line-height: 38px
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
</style>
