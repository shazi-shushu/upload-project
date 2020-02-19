<template>
  <div class="waperContent">
    <!--头部区域-->
    <title-name :item="titleName" />
    <!--区域搜索-->
    <div class="search_box">
      <div class="selectItem">
        <div class="celectItemL">公告标题</div>
        <div class="celectItemR">
          <input v-model="linkPhone" type="text">
        </div>
      </div>
      <div class="selectItemDate">
        <div class="celectItemL">公告时间</div>
        <div class="celectItemRs">
          <!-- 开始时间 -->
          <div class="block">
            <!-- <span class="demonstration">开始时间</span> -->
            <el-date-picker
              v-model="startTime"
              type="date"
              style="width: 170px"
              placeholder="选择开始日期"
              :picker-options="pickerOptionsStart"
            />
          </div>
          <span style="color: #333333;font-size: 14px;">至</span>
          <!-- 结束时间 -->
          <div class="block">
            <!-- <span class="demonstration">结束时间</span> -->
            <el-date-picker
              v-model="endTime"
              type="date"
              style="width: 170px"
              placeholder="选择结束日期"
              :picker-options="pickerOptionsEnd"
            />
          </div>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">状态</div>
        <div class="celectItemR">
          <el-select v-model="yeWuValue" placeholder="请选择">
            <el-option
              v-for="item in yeWuBanKuai"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="buttonBox">
        <el-button
          type="danger"
          style="background:#C8000A; width: 100px; height: 34px; margin: 0 0 0 130px;"
        >查询</el-button>
      </div>
    </div>
    <!--列表区域-->
    <div class="list_content_box">
      <div class="addButton">
        <div style="width:100px;float: right; margin-right:100px;">
          <el-button
            type="danger"
            style="background:#C8000A; width: 100px; height: 34px; margin-top:24px;"
            @click="addJ"
          >新增</el-button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td>序号</td>
            <td>公告标题</td>
            <td>公告时间</td>
            <td>阅读次数</td>
            <td>发布人</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list1" :key="index">
            <td>{{ index+1 }}</td>
            <!-- <td class="orderNo"> <router-link :to="{path:'/orderDetails',query:{orderNo:item.orderNo}}">{{item.orderNo}}</router-link></td> -->
            <td>{{ item.ncTitle }}</td>
            <td>{{ item.ncTime }}</td>
            <td>{{ item.readCount }}</td>
            <td>{{ item.pushName }}</td>
            <td>{{ item.deleteFlag===0 ?"启用":"停用" }}</td>
            <td class="oprator">
              <span @click="edit(item)">编辑</span>
              <!-- <router-link :to="{ path: '/businessbullmange/seebusinessmanage', params: { ncId:item.ncId  }}" @click="see(item)">查看</router-link> -->
              <router-link :to="'/businessbullmange/seebusinessmanage/'+item.ncId" tag="span">查看</router-link>
              <!-- <span @click="see(item)">查看</span> -->
              <span @click="stop(item)">{{ item.deleteFlag===0?"停用":"启用" }}</span>
            </td>
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

    <!-- 新增 -->
    <div v-show="show1" class="mask">
      <div class="littleMask">
        <div class="maskHeader">
          <span>新增公告</span>
          <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span>
        </div>
        <div class="tableform">
          <div>
            <span>*</span>公告标题
            <el-input v-model="input" placeholder style="width:280px; height: 34px; margin: 0 0 0 18px;" max-length="180" />
            <span style="font-size:14px; color: #666;">（不能超过180个字符）</span>
          </div>
          <div>
            <span>*</span>公告时间
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              style="width:280px; height: 34px; margin: 0 0 0 18px;"
              format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
            />
            <el-time-picker
              v-model="value2"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              placeholder="任意时间点"
              style="width:200px; height: 34px; margin: 0 0 0 18px;"
              value-format="HH:mm:ss"
                  format="HH:mm:ss"
            />
          </div>
          <div>
            <span>*</span>状态
            <el-select v-model="value" placeholder="请选择" style="margin: 0 0 0 18px; width:200px; height: 34px;">
              <el-option v-for="item in list" :key="item.value" :value="item.value" :label="item.label" style="margin: 0 0 0 18px; width:200px; height: 34px;" />
            </el-select>
          </div>
          <div style="display: flex; flex-direction: row;">
            <span>*</span>详情
            <div>
              <tinymce v-model="content" :height="150" style='margin: 0 0 0 18px;' />
            </div>
            <!-- <index style="width: 670px; height: 250px; margin: 0 0 0 18px; overflow: auto;"/> -->
          </div>
        </div>
        <div class="search_btn" @click="save()">保存</div>
      </div>
    </div>

    <!-- 编辑 -->
    <div v-show="show2" class="mask">
      <div class="littleMask">
        <div class="maskHeader">
          <span>编辑公告</span>
          <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span>
        </div>
        <div class="tableform">
          <div>
            <span>*</span>公告标题
            <el-input v-model="input1" placeholder style="width:280px; height: 34px; margin: 0 0 0 18px;" />
            <span style="font-size:14px; color: #666;">（不能超过180个字符）</span>
          </div>
          <div>
            <span>*</span>公告时间
            <el-date-picker
              v-model="value3"
              type="date"
              placeholder="选择日期"
              style="width:280px; height: 34px; margin: 0 0 0 18px;"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
            <el-time-picker
              v-model="value4"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              placeholder="任意时间点"
              style="width:200px; height: 34px; margin: 0 0 0 18px;"
              value-format="HH:mm:ss"
              format="HH:mm:ss"
            />
          </div>
          <div>
            <span>*</span>状态
            <el-select v-model="value5" placeholder="请选择" style="margin: 0 0 0 18px; width:200px; height: 34px;">
              <el-option v-for="item in list" :key="item.value" :value="item.value" :label="item.label" style="margin: 0 0 0 18px; width:200px; height: 34px;" />
            </el-select>
          </div>
          <div style="display: flex; flex-direction: row;">
            <span>*</span>详情
            <div>
              <tinymce v-model="content1" :height="150" style='margin: 0 0 0 18px;' />
            </div>
            <!-- <index style="width: 670px; height: 250px; margin: 0 0 0 18px; overflow: auto;" /> -->
          </div>
        </div>
        <div class="search_btn" @click="save1()">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
// 
import titleName from '@/components/titleName/titleName'
// import Tinymce from '@/components/Tinymce'
import Tinymce from '@/components/Tinymce'
import { noticePages,noticeConfig,noticeAdd,noticeEdit } from '@/api/business/business'
import { getUserName } from '@/utils/auth'
export default {
  name: 'Businessbullmange',
  components: {
    titleName,
    Tinymce
  },
  data() {
    return {
      titleName: '商户公告管理',
      content:``,
      content1:``,
      linkPhone: '',
      startTime: '',
      pageNum: 1,
      totalPages: 20,
      endTime: '',
      show1: false,
      show2: false,
      input: '',
      input1: '',
      value1: '',
      value2: '',
      value: '',
      value3: '',
      value4: '',
      value5: '',
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.endTime !== '') {
            // return time.getTime() < Date.now() - 8.64e7 || time.getTime() > this.endTime
            return time.getTime() > this.endTime
          } else {
            // return time.getTime() < Date.now() - 8.64e7
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.startTime !== '') {
            return time.getTime() < this.startTime
          } else {
            // return time.getTime() < Date.now()
            // return time.getTime() < Date.now() - 8.64e7
          }
        }
      },
      list1: [],
      yeWuValue: '',
      yeWuBanKuai: [
        { value: '', label: '请选择' },
        { value: 1, label: '旅游频道' },
        { value: 2, label: 'e差旅' }
      ],
      list: [
        { value: '', label: '请选择' },
        { value: 1, label: '停用' },
        { value: 0, label: '启用' }
      ],
      param: {
        deleteFlag: '',
        endTime: '',
        nrContent: '',
        ncId: '',
        pageNum: '',
        pageSize: '',
        ncTime: '',
        ncTitle: '',
        pushName: '',
        readCount: ''
      },
      //arr1:'',
    }
  },
  mounted() {
    this.getList(this.param)
    // this.save(this.param)
  },
  methods: {
    changeList(val) {
      this.param.pageNum = val
      this.getList(this.param)
    },
    handleSizeChange(val) {
      this.param.pageSize = val
      this.getList(this.param)
    },
    addJ() {
      this.show1 = true
    },
    edit(item) {
      this.show2 = true
    },
    hiddenShow() {
      this.show1 = false
      this.show2 = false
    },
    getList(params) {
      noticePages(params).then(res => {
        this.pageNum = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.totalPages = res.data.data.total
        this.list1 = res.data.data.list
        console.log(res)
      })
    },
    save(){
      var user = getUserName();
      console.log(user)
      var obj={
        deleteFlag: this.value,
        ncContent: this.content,
        ncTime: this.value1 +"T"+ this.value2,
        ncTitle: this.input,
        endTime: '',
        pushName: user,
        readCount: ''
      }
      if(obj.ncTitle === ''){
        this.$message({
          message: '公告标题不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj.ncContent === ''){
        this.$message({
          message: '详情不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj.deleteFlag === ''){
        this.$message({
          message: '状态不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj.ncTime === ''){
        this.$message({
          message: '公告时间不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if (obj.ncTitle.length >= 90) {
        this.$message({
          message: '公告标题长度超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      }
      console.log(this.value)
      console.log(this.content)
      noticeAdd(obj).then(res =>{
        console.log(res);
        if (res.data.code == 200) {
          this.show1 = false
        } else {
          this.show1 = true
        }
        this.getList(this.param)
      }).catch(err => {
        console.log(err)
      })
    },
    save1(){
      var user = getUserName();
      console.log(user)
      var obj1={
        deleteFlag: this.value5,
        ncContent: this.content1,
        ncTime: this.value3 +"T"+ this.value4,
        ncTitle: this.input1,
        endTime: '',
        pushName: user,
        readCount: ''
      }

      if(obj1.ncTitle === ''){
        this.$message({
          message: '公告标题不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj1.ncContent === ''){
        this.$message({
          message: '详情不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj1.deleteFlag === ''){
        this.$message({
          message: '状态不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj1.ncTime === ''){
        this.$message({
          message: '公告时间不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if (obj1.ncTitle.length >= 180) {
        this.$message({
          message: '公告标题长度超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      }

      noticeEdit(obj1).then(res => {
          console.log(res);  
          //this.getList(this.param)
        }).catch(err => {
          console.log(err);
        });
    },
    stop(item){
      var obj3 = {
        deleteFlag: item.deleteFlag === 0 ? 1 : 0,
        ncId : item.ncId
      }
      noticeEdit(obj3).then(res => {
          console.log(res);  
          this.getList(this.param)
        }).catch(err => {
          console.log(err);
        });
    },
  }

}
</script>

<style scoped lang="scss">
.waperContent {
  padding: 24px 24px 50px 24px;
  background-color: #fbfbfb;
  min-width: 1200px;
  .search_box {
    min-width: 1200px;
    border-bottom: 1px solid #f6f6f6;
    padding: 20px 20px;
    background: white;
    .selectItem {
      height: 50px;
      line-height: 50px;
      color: #333333;
      font-size: 14px;
      width: 240px;
      display: inline-block;
      .celectItemL {
        width: 70px;
        text-align: center;
        display: inline-block;
      }
      .celectItemR {
        max-width: 200px;
        width: 60%;
        display: inline-block;
        input {
          width: 100%;
          height: 34px;
          line-height: 34px;
          border: 1px solid #dddddd;
          border-radius: 4px;
          padding-left: 4px;
        }
      }
    }
    .selectItemDate {
      height: 50px;
      line-height: 50px;
      color: #333333;
      width: 465px;
      font-size: 14px;
      display: inline-block;
      .celectItemL {
        width: 87px;
        text-align: center;
        display: inline-block;
      }
      .celectItemRs {
        width: 370px;
        display: inline-block;
        .block {
          display: inline-block;
        }
      }
    }
    .buttonBox {
      display: inline-block;
    }
  }
  .list_content_box {
    // width: 100%;
    background: white;
    height: 400px;
    padding: 0 50px 0 20px;
    table {
      border-collapse: collapse;
      width: 100%;
      padding: 0px;
      thead {
        height: 40px;
        background-color: #f6f6f6;
        tr {
          height: 40px;
          line-height: 40px;
          text-align: center;
          td {
            padding: 0px 5px;
            border: solid 1px #dfdfdf;
          }
        }
      }
      tbody {
        height: 40px;
        tr {
          height: 40px;
          line-height: 40px;
          text-align: center;
          td {
            padding: 0px 5px;
            border: solid 1px #dfdfdf;
          }
          .oprator {
            color: #ca0f18;
            span {
              cursor: pointer;
            }
            span:nth-child(2) {
              padding: 0px 10px;
            }
          }
        }
      }
    }
    .addButton {
      overflow: hidden;
      min-width: 1200px;
      margin-bottom: 10px;
    }
    .line {
      width: 100%;
      border: 0.5px solid #dfdfdf;
      margin-top: 40px;
    }
    .page_msg {
      text-align: right;
      padding: 20px 50px 40px 0px;
      background-color: #ffffff;
      color: #666666;
    }
  }
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
}
.littleMask {
  width: 828px;
  height: 596px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 8px;
  position: relative;
}

.maskHeader {
  padding: 12px 20px;
  background: #eeeeee;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.maskHeader span:first-of-type {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #222222;
}
.maskHeader span:last-of-type {
  font-size: 12px;
  color: #222222;
  color: #666666;
}
.search_btn {
  width: 120px;
  height: 38px;
  background-color: #c8000a;
  border-radius: 4px;
  position: absolute;
  bottom: 35px;
  left: 360px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 38px;
}
.tableform{display: flex; flex-direction: column; padding: 0 0 0 30px;}
.tableform div{margin: 10px 0 0 0;}
.tableform div:nth-of-type(3),.tableform div:nth-of-type(4){margin-left: 30px;}
.tableform div span{color: #c8000a;}
</style>
