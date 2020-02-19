<template>
  <div class="inquireContent">
    <div class="inquireWrapper">
      <!-- 功能模块 -->
      <div class="selectItem">
        <div class="celectItemL">
          功能模块
        </div>
        <div class="celectItemR">
          <el-select v-model="authName" placeholder="请选择">
            <el-option
              v-for="item in orderTypes"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
      </div>
      <!-- 用户名 -->
      <div class="selectItem">
        <div class="celectItemL">
          用户名
        </div>
        <div class="celectItemR">
          <input v-model="createName" type="text">
        </div>
      </div>
      <div class="itemDes">
        操作时间
      </div>
      <!-- 操作时间 -->
      <div class="time">

        <!-- <div class="itemDes">
          操作时间
        </div> -->
        <!-- 开始时间 -->
        <div class="timeItem">
          <!-- <span class="demonstration">带快捷选项</span> -->
          <el-date-picker
            v-model="startTime"
            type="datetime"
            placeholder="开始时间"
            align="right"
            :picker-options="pickerOptionsStart"
            @change="gettime"
          />
        </div>
        <span style="color: #333333;font-size: 14px;padding:10px">至</span>
        <!-- 结束时间 -->
        <div class="timeItem">
          <!-- <span class="demonstration">带快捷选项</span> -->
          <el-date-picker
            v-model="endTime"
            type="datetime"
            placeholder="结束时间"
            align="right"
            :picker-options="pickerOptionsEnd"
            @change="gettime"
          />
        </div>
      </div>
      <div class="search_btn" @click="searchIn()">
        查询
      </div>
    </div>

    <!-- <button type="button" @click="selectIn()">查询</button> -->

  </div>
</template>
<script>
// import { getAuths } from '@/api/accountManage/rolePermission'
import { getModel } from '@/api/accountManage/rolePermission'
export default {
  name: 'InquireContent',
  components: {

  },
  data() {
    return {
      createName: '',
      authName: '',
      // 功能板块
      orderTypes: [],
      // startTime
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
        platform: 1
      },
      // 分页
      pageNum: '1',
      pageSize: '10'

    }
  },
  mounted() {
    getModel(this.param).then(res => {
      this.orderTypes = res.data.data
      // console.log(this.orderTypes)
      // var obj = {
      //   //authId: '',
      //   authName: '请选择',
      //   // authPid:0,
      //   //deleteFlag: 0
      // }
      var authName = '请选择'
      // if (this.authName === '请选择') {
      //   obj.authName = ''
      // }
      this.orderTypes.unshift(authName)
      console.log(this.orderTypes)
    }).catch(err => {
      console.log(err)
    })
    // getAuths(this.param).then(res => {
    //   this.orderTypes = res.data.data

    //   var obj = {
    //     authId: '',
    //     authName: '请选择',
    //     // authPid:0,
    //     deleteFlag: 0
    //   }

    //   // if (this.authName === '请选择') {
    //   //   obj.authName = ''
    //   // }
    //   this.orderTypes.unshift(obj)
    //   console.log(this.orderTypes)
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  methods: {
    // gettime(val) {
    //   console.log(val.getTime())
    //   return val.getTime()
    // },
    searchIn() {
      var obj = {
        authId: this.authId,
        authName: this.authName,
        createName: this.createName,
        createTime: this.startTime ? this.gettime(this.startTime) : '',
        endTime: this.endTime ? this.gettime(this.endTime) : '',
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (obj.authName === '请选择') {
        obj.authName = ''
      }
      console.log(obj)
      this.$emit('search_btn', obj)
    },
    gettime(val) {
      var dateee = new Date(val).toJSON()
      var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
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
    color: #333333;
    font-size: 14px;
} */
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
  .selectItem {
    /* border:solid 1px; */
    height: 50px;
    line-height: 50px;
    color: #333333;
    font-size: 14px;
    width:18%;
    max-width: 250px;
    display: inline-block;
}
/* .celectItemL {
    width: 96px;
    text-align: center;
    display: inline-block;
} */
.celectItemL {
    /* border:solid 1px; */
    margin-right: 10px;
    /* width:96px; */
    text-align:left;
    display: inline-block;
    color: #333333;
    font-size: 14px;
}
.celectItemR {
    max-width: 200px;
    width:60%;
    display: inline-block;
    color: #333333;
    font-size: 14px;
}
.celectItemR input {
    width: 100%;
    height: 34px;
    line-height: 34px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding-left: 4px;
}
.block{
    width:100px;
    /* border: solid 1px */
}
.block input {
    width: 100%;
    height: 34px;
    line-height: 34px;
}
.inquireWrapper .search_btn{
    width: 100px;
    height: 34px;
    background-color: #c8000a;
    border-radius: 4px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
    margin-left:300px;
     color: #ffffff;
}
.time{
  /* border: solid 1px; */
   height: 50px;
    line-height: 50px;
    color: #333333;
    font-size: 14px;
    /* width:18%; */
    max-width: 250px;
    display:flex;
    align-items: center

}
.itemDes{
  /* border: solid 1px; */
  min-width:60px;
  color: #333333;
  font-size: 14px;
   margin-right: 10px;
}
</style>
