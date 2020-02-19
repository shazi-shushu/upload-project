<template>
  <div class="container">
    <title-name :item="titleName" />
    <!--选中数据展示table-->
    <div class="list_content_box">
      <el-table
        border
        :data="tableDataSelect"
        tooltip-effect="dark"
        :header-cell-style="{background:'#F6F6F6',color:'rgb(102,102,102)'}"
        style="width: 100%;border:1px solid #E4E4E4;)"
        max-height="250"
      >
        <el-table-column
          label="序号"
          align="center"
          prop="shopname"
          width="50"
        />
        <el-table-column
          prop="shoptitle"
          label="品类"
          align="center"
        />
        <el-table-column
          prop="city"
          label="热门城市"
          align="center"
        />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="background:#C8000A"
              @click="handleAdd(scope.$index, scope.row)"
            >添加</el-button>
            <el-button
              size="mini"
              type="danger"
              style="background:#C8000A"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <!--新增的模态框-->
    <div v-if="show" class="modalBox">
      <div class="modal">
        <header>
          <span>添加城市</span>
          <i class="el-icon-close" style="float: right" @click="closeModal" />
        </header>
        <section>
          <div class="contentBox">
            <div style="width:60px;height:250px;float: left;font-size:14px;color:rgb(102,102,102);padding-top:12px;">热门城市</div>
            <div class="addBox">
              <div class="leftBox">
                <div v-for="(item,index) in arr" :key="index" class="cityAdd">
                  {{ item.id }}
                  <input type="text" placeholder="输入热门城市">
                  <input type="text" placeholder="输入排序值">
                  <i class="el-icon-error" style="" @click="delcity(index)" />
                </div>
                <button @click="addcity">添加</button>
              </div>
              <div class="rightBox">
                <div v-for="(item,index) in arr2" :key="index" class="cityAdd">
                  {{ item.id }}
                  <input type="text" placeholder="输入热门城市">
                  <input type="text" placeholder="输入排序值">
                  <i class="el-icon-error" style="" @click="delcitytwo(index)" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <el-button type="primary" style="background:rgb(200,0,10);border:none;" @click="save()">保存</el-button>
        </footer>
      </div>
      <div v-if="show" class="mark" />
    </div>
    <!-- 编辑 -->
    <div v-if="show1" class="modalBox">
      <div class="modal">
        <header>
          <span>编辑城市</span>
          <i class="el-icon-close" style="float: right" @click="closeModal" />
        </header>
        <section>
          <div class="contentBox">
            <div style="width:60px;height:250px;float: left;font-size:14px;color:rgb(102,102,102);padding-top:12px;">热门城市</div>
            <div class="addBox">
              <div class="leftBox">
                <div v-for="(item,index) in arr" :key="index" class="cityAdd">
                  {{ item.id }}
                  <input type="text" placeholder="输入热门城市">
                  <input type="text" placeholder="输入排序值">
                  <i class="el-icon-error" style="" @click="delcity(index)" />
                </div>
                <button @click="addcity">添加</button>
              </div>
              <div class="rightBox">
                <div v-for="(item,index) in arr2" :key="index" class="cityAdd">
                  {{ item.id }}
                  <input type="text" placeholder="输入热门城市">
                  <input type="text" placeholder="输入排序值">
                  <i class="el-icon-error" style="" @click="delcitytwo(index)" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <el-button type="primary" style="background:rgb(200,0,10);border:none;" @click="save1()">保存</el-button>
        </footer>
      </div>
      <div v-if="show" class="mark" />
    </div>
  </div>
</template>

<script>
import titleName from '@/components/titleName/titleName'
import {hotList,hotAdd,hotUpdate} from '@/api/hotcity/hotcity'
export default {
  name: 'HotCityPage',
  components: {
    titleName
  },
  data() {
    return {
      titleName: '热门城市配置',
      pageNum: 1,
      totalPages: 20,
      show: false,
      show1: false,
      arr: [
        { id: '' }

      ],
      arr2: [],
      tableDataSelect: [
        {
          shopname: '1',
          city: '北京',
          shoptitle: '欢乐谷'
        },
        {
          shopname: '2',
          city: '北京',
          shoptitle: '欢乐谷'
        }
      ],
      param:{
        hcCitys: '',
        hcId :'',
        hcType:'',
        hcTypeName:''
      }
    }
  },
  mounted() {
    this.getList(this.param)
  },
  methods: {
    closeModal() {
      this.show = false;
      this.show1 = false;
    },
    delcitytwo(index) {
      this.arr2.splice(index, 1)
    },
    delcity(index) {
      this.arr.splice(index, 1)
    },
    addcity() {
      if (this.arr.length >= 6 && this.arr2.length < 6) {
        this.arr2.push({ id: '' })
      } else if (this.arr.length < 6) {
        this.arr.push({ id: '' })
        console.log(this.arr)
      }
      if (this.arr2.length >= 6) {
        return false
      }
    },
    handleAdd() {
      this.show = true 
      console.log(index,row);
    },
    handleEdit() {
      this.show1 = true
    },
    // 分页获取列表
    changeList(val) {
      this.param.pageNum = val
      this.getList(this.param)
    },
    handleSizeChange(val) {
       this.param.pageSize = val
       this.getList(this.param)
    },
    getList(params) {
      hotList(params).then(res => {
        // this.pageNum = res.data.data.pageNum
        // this.pageSize = res.data.data.pageSize
        // this.totalPages = res.data.data.total
        // this.list1 = res.data.data.list
        console.log(res)
      })
    },
    save(){
      var obj={
        hcCitys: '',
        hcId :'',
        hcType:'',
        hcTypeName:'',
        //redisKey:''
      }
      hotAdd(obj).then(res=>{
        console.log(res);
      })
    },
    save1(){
      var obj1={
        hcCitys: '',
        hcId :'',
        hcType:'',
        hcTypeName:'',
        redisKey:''
      }
      hotUpdate(obj1).then(res=>{
        console.log(res);
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  padding: 24px 24px 50px 24px;
  background-color: #fbfbfb;
  min-width: 1200px;
  .list_content_box{
    width:100%;
    padding:24px 0px 0px 23px;
    background: white;
    .line{
      width:100%;
      border:0.5px solid #dfdfdf;
      margin-top:40px;
    }
    .page_msg{
      text-align: right;
      padding: 20px 50px 40px 0px;
      background-color: #ffffff;
      color: #666666;
    }
  }
  .modalBox{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    overflow: hidden;
    width:100%;
    height:100%;
    .modal{
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 8px;
      margin-left:-262px;
      margin-top:-180px;
      width: 524px;
      height:360px;
      z-index: 1003;
      background: #fff;
      header{
        width:100%;
        height:40px;
        padding:10px;
        background:#F5F5F5;
        border-radius: 8px 8px 0px 0px;
      }
      section{
        width:100%;
        padding:30px 0px 0px 30px;
        .contentBox{
          width:100%;
          height:250px;
           .addBox{
             height:250px;
             float: left;
             .leftBox{
               width:205px;
               height:250px;
               float: left;
               .cityAdd{
                 margin:5px 0px;
                 width:100%;
                 input:nth-child(1){
                   width:90px;
                   height:30px;
                   font-size:14px;
                   color:rgb(204,204,204);
                   border:1px solid rgb(223,223,223);
                 }
                 input:nth-child(2){
                   width:80px;
                   height:30px;
                   font-size:14px;
                   margin-left:2px;
                   font-size:14px;
                   color:rgb(204,204,204);
                   border:1px solid rgb(223,223,223);
                 }

               }
               button{
                 width:110px;
                 height:34px;
                 border:none;
                 outline: none;
                 border-radius: 4px;
                 border:1px solid rgb(200,0,10);
                 color:rgb(200,0,10);
                 background: white;
                 line-height: 32px;
                 text-align: center;
               }
             }
             .rightBox{
               width:205px;
               height:250px;
               float: left;
               .cityAdd{
                 margin:5px 0px;
                 width:100%;
                 input:nth-child(1){
                   width:90px;
                   height:30px;
                   font-size:14px;
                   color:rgb(204,204,204);
                   border:1px solid rgb(223,223,223);
                 }
                 input:nth-child(2){
                   width:80px;
                   height:30px;
                   font-size:14px;
                   margin-left:2px;
                   font-size:14px;
                   color:rgb(204,204,204);
                   border:1px solid rgb(223,223,223);
                 }

               }
             }
           }
        }
      }
      footer{
        width:100%;
        text-align:center;
      }
    }
    .mark{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
