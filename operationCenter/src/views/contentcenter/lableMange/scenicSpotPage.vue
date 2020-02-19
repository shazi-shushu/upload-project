<template>
  <div class="container">
    <title-name :item="titleName" />
    <div class="list_content_box">
      <div class="addButton">
        <div style="float: right;">
          <el-button type="danger" style="background:#C8000A;" @click="addJ">新增</el-button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td>序号</td>
            <td>频道</td>
            <td>标签名称</td>
            <td>图标</td>
            <td>链接</td>
            <td>排序</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{index+1}}</td>
            <!-- <td class="orderNo"> <router-link :to="{path:'/orderDetails',query:{orderNo:item.orderNo}}">{{item.orderNo}}</router-link></td> -->
            <td>{{item.channeName}}</td>
            <td>{{item.labelName}}</td>
            <td style="padding-top:10px;"><img :src="item.image" alt="" style="width:29px;height:25px;"></td>
            <td>{{item.url}}</td>
            <td>{{item.sortId}}</td>
            <td>{{ item.status===1 ?"启用":"停用" }}</td>
            <td class="oprator"><span @click="edit(item)">编辑</span><span @click="changeStatus(item)">{{ item.status===1?"停用":"启用" }}</span>  </td>
          </tr>
        </tbody>
      </table>
      <div class="line" />
      <!--分页区域-->
      <div class="page_msg">
        <el-pagination
          :total="totalPages"
          :current-page="pageNum"
          layout="prev, pager, next,  jumper, total, sizes "
          @current-change="changeList"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import titleName from '@/components/titleName/titleName'
import {scenicList } from '@/api/label/label'
import axios from "axios"
export default {
  name: 'ScenicSpotPage',
  components: {
    titleName
  },
  data() {
    return {
      titleName: '景区门票',
      pageNum: 1,
      totalPages: 20,
      list:[],
      param:{
        pageSize:10,
        pageNum:1,
        channelName:""
      },
      id:""
    }
  },
  mounted() {
    if(this.$route.query.id){
      this.id = this.$route.query.id
      localStorage.setItem("ids",this.id)
    }
   this.getList(this.param)
  },
  methods: {
    //获取列表
    getList(param){
      // console.log(this.param)
      // scenicList(param).then(res=>{
      //   console.log(112233)
      //   console.log(res)
      // })
      axios.get(this.$store.state.user.url+"/syGraphicScenic/queryGraphic?pageSize="+param.pageSize+"&pageNum="+param.pageNum+"&channelName="+param.channelName)
        .then(res=>{
         this.list = res.data.data.list
          this.list.forEach(ele=>{
            ele.image="http://"+ele.image
          })
        })
    },
    //改变启用停用状态
    changeStatus(item){
      if(item.status===0){
        item.status=1
      }else{
        item.status=0
      }
      axios.get(this.$store.state.user.url+"/syGraphicScenic/updateStatus?scenicId="+item.scenicId+"&status="+item.status)
    },
    edit(item) {
      console.log(item)
      this.$router.push({path:"/addEditScenicPage",query:{scenicId:item.scenicId}})
    },
    addJ() {
      this.$router.push({path:'/addEditScenicPage'})
    },
    changeList(val) {
      this.param.pageNum=val
      this.getList(this.param)
    },
    handleSizeChange(val) {
      this.param.pageSize=val
      this.getList(this.param)
    }
  }
}
</script>

<style scoped lang="scss">
  .container{
    padding: 24px 24px 50px 24px;
    background-color: #fbfbfb;
    min-width: 1200px;
    overflow: scroll;
    .list_content_box{
      min-width: 1200px;
      background: white;
      height:400px;
      .addButton{
        overflow: hidden;
        width:100%;
        margin-top:10px;
        margin-bottom: 10px;
      }
      table{
        border-collapse: collapse;
        width:100%;
        background: white;
        padding:0px;
        thead{
          height:40px;
          background-color: #f6f6f6;
          tr{
            height:40px;
            line-height: 40px;
            text-align: center;
            td{
              padding:0px 5px;
              border: solid 1px #dfdfdf;
            }
          }
        }
        tbody{
          height:40px;
          tr{
            height:40px;
            line-height: 40px;
            text-align: center;
            td{
              padding:0px 5px;
              border: solid 1px #dfdfdf;
            }
            .oprator{
              color:#CA0F18;
              span{
                cursor: pointer;
                padding:0px 10px;
              }
            }
          }
        }
      }
      .line{
        width:100%;
        height:40px;
        border-bottom:0.5px solid #dfdfdf;
        background: white;
      }
      .page_msg{
        text-align: right;
        padding: 20px 50px 40px 0px;
        background-color: #ffffff;
        color: #666666;
      }
    }
  }
</style>
