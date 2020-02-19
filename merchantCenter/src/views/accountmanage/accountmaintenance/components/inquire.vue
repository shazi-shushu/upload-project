<template>
  <div class="inquireContent">
    <div class="inquireWrapper">
      <div class="userName">
        <span>用户姓名</span>
        <input v-model="operationName" type="text" maxlength="55"></div>
      <div class="search_btn" @click="searchIn">
        查询
      </div>
      <!-- <button type="button" @click="selectIn()">查询</button> -->
    </div>
  </div>
</template>
<script>
// import { searchData } from '@/api/accountManage/account'
// import MsgBus from './components/msgBus.js';
export default {
  name: 'InquireContent',
  components: {

  },
  data() {
    return {
      operationName: '',
      list: [],
      param: {
        platform: '0',
        pageNum: '1',
        pageSize: '10',
        operationName: ''
      }
    }
  },
  created() {

  },
  mounted() {
    // this.searchData(this.params)
  },
  methods: {
    searchIn() {
      this.param.operationName = this.operationName
      if (this.param.operationName.length >= 55) {
        this.$message({
          message: '查询字数超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      }
      this.$emit('search_btn', this.param)
      // searchData(this.searchparams).then((res)=>{
      //   console.log("searchData res:",res)
      //   this.list=res.data.data
      //   // eventBus.$emit('eventBusName','MsgBus')
      //   console.log("searchData:",this.list)
      // }).catch((err)=>{
      //   console.log("searchData err:",err)
      // })
    }
  }
}
</script>
<style scoped>
  .inquireContent{
    width: 100%;
    height:83px;
    background-color: #ffffff;
    /* padding: 10px 0px;  */
  }
  .inquireWrapper{
      display:flex;
      box-sizing: border-box;
      align-items: center;
      position: relative;
      padding: 25px 30px;
      border-bottom: solid 1px #dcdcdc;
  }
.userName{
  display: flex;
  align-content: center;
}
.userName span{
    display: inline-block;
    height:34px;
    line-height:34px;
	font-family: MicrosoftYaHei;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #333333;
    vertical-align: middle;
    margin-right: 13px

}
input{
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    /* -webkit-user-select: none; */
    -moz-user-focus: none;
    /* -moz-user-select: none; */
    -webkit-appearance:none;
    outline: none;
    border: none;
}
.userName input{
  width: 280px;
	height: 34px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #dddddd;
  padding: 10px 0 10px 16px;
    /* margin-left: 16px; */

}
.inquireWrapper search_btn{
    width: 100px;
	height: 34px;
	background-color: #c8000a;
	border-radius: 4px;
    font-family: MicrosoftYaHei;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
    margin-left: 120px
}
.search_btn{
    width: 100px;
	height: 34px;
	background-color: #c8000a;
	border-radius: 4px;
    color: #ffffff;
    font-size: 14px;
    line-height: 34px;
    text-align: center;
    position: absolute;
    left: 500px;
    top:25px;
    cursor: pointer;
}
</style>
