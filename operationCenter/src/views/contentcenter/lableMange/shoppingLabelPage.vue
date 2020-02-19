<template>
  <div class="contianer">
    <title-name :item="titleName"/>
    <!--区域搜索-->
    <div class="search_box">
      <div class="selectItem">
        <div class="celectItemL">公告标题</div>
        <div class="celectItemR">
          <input type="text" v-model="linkTitle">
        </div>
      </div>
      <div class="selectItemDate">
        <div class="celectItemL">公告时间</div>
        <div class="celectItemRs">
          <!-- 开始时间 -->
          <div class="block">
            <!-- <span class="demonstration">开始时间</span> -->
            <el-date-picker :picker-options="pickerOptionsStart" placeholder="选择开始日期" style="width: 170px" type="date" v-model="startTime"/>
          </div>
          <span style="color: #333333;font-size: 14px;">至</span>
          <!-- 结束时间 -->
          <div class="block">
            <!-- <span class="demonstration">结束时间</span> -->
            <el-date-picker :picker-options="pickerOptionsEnd" placeholder="选择结束日期" style="width: 170px" type="date" v-model="endTime"/>
          </div>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">状态</div>
        <div class="celectItemR">
          <el-select placeholder="请选择" v-model="yeWuValue">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in yeWuBanKuai"/>
          </el-select>
        </div>
      </div>
      <div class="buttonBox">
        <el-button @click="getList" style="background:#C8000A;margin-left: 60px;" type="danger">查询</el-button>
      </div>
    </div>
    <!--列表区域-->
    <div class="list_content_box">
      <div class="addButton">
        <div style="width:100px;float: right;">
          <el-button @click="addJ" style="background:#C8000A;" type="danger">新增</el-button>
        </div>
      </div>
      <div class="table_wrapper">
        <table>
          <thead>
          <tr>
            <td>序号</td>
            <td>标签名称</td>
            <td>标签描述</td>
            <td>开始时间</td>
            <td>结束时间</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
          </thead>
          <tbody>
          <!-- <tr>
            <td>1</td>
            <td>酒店民宿</td>
            <td>这是一家关于酒店的描述击杀开始</td>
            <td>2018-11-11 21:00:11</td>
            <td>2018-11-11 21:00:11</td>
            <td>启用</td>
            <td class="oprator">
                <span>复制链接</span>
                <span @click="editModel">编辑</span>
                <span>启用</span>
                <span @click="associate">关联商品</span>
                <span @click="editShopping">编辑商品</span>
            </td>
          </tr>-->
          <tr :key="item.labelId" v-for="item in list">
            <td>{{ item.labelId }}</td>
            <!-- <td class="orderNo"> <router-link :to="{path:'/orderDetails',query:{orderNo:item.orderNo}}">{{item.orderNo}}</router-link></td> -->
            <td>{{ item.labelName }}</td>
            <td>{{ item.labelContent }}</td>
            <td>{{ item.startTime }}</td>
            <td>{{ item.endTime }}</td>
            <td>{{ item.status == 1 ? '启用' : '停用' }}</td>
            <td class="oprator">
              <span @click="copyLink(item)">复制链接</span>
              <span @click="editModel(item)">编辑</span>
              <span @click="changeStatus(item)">{{ item.status == 1 ? '停用' : '启用' }}</span>
              <span @click="associate">关联商品</span>
              <span @click="editShopping">编辑商品</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="line"/>
      <!--分页区域-->
      <div class="page_msg">
        <el-pagination :current-page="pageNum" :total="totalPages" @current-change="changeList" @size-change="handleSizeChange" layout="prev, pager, next,  jumper, total, sizes "/>
      </div>
    </div>

    <!--新增弹框-->
    <Modal :show="show">
      <header>
        <span>新增标签</span>
        <i @click="closeModal" class="el-icon-close" style="width:14px;height:14px;float: right"/>
      </header>
      <section>
        <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px" ref="ruleForm">
          <el-form-item style="display:none;">
            <el-input v-model="ruleForm.labelId"/>
          </el-form-item>
          <div style="height:40px;">
            <el-form-item label="标签名称" prop="name" style="width:380px;float: left">
              <el-input v-model="ruleForm.labelName"/>
            </el-form-item>
            <span style="float: left;display: inline-block;height:40px;line-height: 40px;font-size:12px;color:rgb(102,102,102);margin-left:25px;">(不能超过五个字符)</span>
          </div>
          <el-form-item label="标签描述" prop="desc" style="width:380px;">
            <el-input type="textarea" v-model="ruleForm.labelContent"/>
          </el-form-item>
          <el-form-item label="开始时间" required>
            <el-col :span="12">
              <el-form-item prop="date1">
                <el-date-picker placeholder="选择日期" style="width: 100%;" type="date" v-model="ruleForm.date1"/>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="line">-</el-col>
            <el-col :span="8">
              <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间" style="width: 100%;" type="date" v-model="ruleForm.date2"/>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-col :span="12">
              <el-form-item prop="date3">
                <el-date-picker placeholder="选择日期" style="width: 100%;" type="date" v-model="ruleForm.date3"/>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="line">-</el-col>
            <el-col :span="8">
              <el-form-item prop="date4">
                <el-time-picker placeholder="选择时间" style="width: 100%;" type="date" v-model="ruleForm.date4"/>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="状态" prop="region">
            <el-select style="width:280px;" v-model="ruleForm.status">
              <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in yeWuBanKuai"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('ruleForm')" style="background:#C8000A;margin-left:180px;border:none;" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </section>
    </Modal>
  </div>
</template>

<script>
  import titleName from '@/components/titleName/titleName'
  import Modal from './modalPage'
  import axios from 'axios'
  import { addLabelPage, newPages } from '@/api/accountManage/shoppingLabelPage'
  export default {
    name: 'ShoppingLabelPage',
    components: {
      titleName,
      Modal
    },
    data() {
      return {
        titleName: '商品标签',
        show: false,
        linkTitle: '',
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10,
        totalPages: 20,
        list: [ // 存放列表的数组
        ],
        pickerOptionsStart: {
          disabledDate: (time) => {
            if (this.endTime !== '') {
              // return time.getTime() < Date.now() - 8.64e7 || time.getTime() > this.endTime
              return time.getTime() > this.endTime
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
        yeWuValue: '',
        yeWuBanKuai: [
          { value: '', label: '请选择' },
          { value: 1, label: '启用' },
          { value: 2, label: '停用' }
        ],
        ruleForm: {
          labelName: '',
          status: '',
          date1: '',
          date2: '',
          date3: '',
          date4: '',
          labelContent: '',
          labelId: '',
          link: ''
        },
        rules: {

        }
      }
    },
    mounted() {
      if (this.$route.path == '/businessbullmange/labelMangePage/shoppingLabelPage') {
        this.$emit('showshopp', 3)
      }
      // 调用列表
      // this.getAllList()
    },
    created() { // 当 vm 实例 的 data 和 methods 初始化完毕后，vm实例会自动执行created 这个生命周期函数
      this.getList(this.ruleForm)
    },

    methods: {
      associate() {
        this.$router.push('/associatedGoodsPage')
      },
      editShopping() {
        this.$router.push('/editShoppingPage')
      },
      copyLink: function (item) {
        if (item.link) {
          var link = item.link
        } else {
          var link = process.env.APP_URL + 'list.html?labelId=' + item.labelId
        }
        // 复制链接
        var oInput = document.createElement('input')
        oInput.value = link
        document.body.appendChild(oInput)
        oInput.select() // 选择对象
        document.execCommand('Copy') // 执行浏览器复制命令
        oInput.className = 'oInput'
        oInput.style.display = 'none'
        oInput.remove()
        this.$message({
          message: '复制成功',
          type: 'success'
        })
      },
      editModel(item) {
        // 编辑
        this.setRuleForm(item)
        this.show = true
      },
      changeStatus: function (item) {
        // 改变状态
        this.setRuleForm(item)
        this.ruleForm.status = (item.status == 1 ? 2 : 1)
        this.saveData()
      },
      setRuleForm: function (item) {
        this.ruleForm.labelName = item.labelName
        this.ruleForm.labelContent = item.labelContent
        this.ruleForm.labelId = item.labelId
        this.ruleForm.date1 = new Date(item.startTime)
        this.ruleForm.date3 = new Date(item.endTime)
        this.ruleForm.date2 = new Date(item.startTime)
        this.ruleForm.date4 = new Date(item.endTime)
        this.ruleForm.status = item.status
        this.ruleForm.link = item.link
      },
      date2ChangeBeginTime: function (val) {
        this.ruleForm.date2 = val
      },
      date4ChangeBeginTime: function (val) {
        this.ruleForm.date4 = val
      },
      // 保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var ruleForm = this.ruleForm
            var d1 = new Date(ruleForm.date1)
            var d2 = new Date(ruleForm.date2)
            var d3 = new Date(ruleForm.date3)
            var d4 = new Date(ruleForm.date4)
            // 校验是否为空
            const h = this.$createElement
            if (ruleForm.labelName == '' || ruleForm.labelName.length > 5) {
              var msg = ''
              if (ruleForm.labelName.length > 5) {
                msg = '标签名超过五个字符'
              } else {
                msg = '标签名称必填'
              }
              this.$message({
                message: h('p', null, [
                  h('i', { style: 'color: teal' }, msg)
                ], 2000)
              })
              return false
            } else if (ruleForm.labelContent == '') {
              this.$message({
                message: h('p', null, [
                  h('i', { style: 'color: teal' }, '标签描述必填')
                ], 2000)
              })
              return false
            }
            this.saveData()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      saveData: function () {
        var ruleForm = this.ruleForm
        var d1 = new Date(ruleForm.date1)
        var d2 = new Date(ruleForm.date2)
        var d3 = new Date(ruleForm.date3)
        var d4 = new Date(ruleForm.date4)
        var parent = {
          labelName: ruleForm.labelName,
          status: ruleForm.status,
          startTime: d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate() + ' ' + d2.getHours() + ':' + d2.getMinutes() + ':' + d2.getSeconds(),
          endTime: d3.getFullYear() + '-' + (d3.getMonth() + 1) + '-' + d3.getDate() + ' ' + d4.getHours() + ':' + d4.getMinutes() + ':' + d4.getSeconds(),
          labelContent: ruleForm.labelContent,
          labelId: ruleForm.labelId,
          link: process.env.APP_URL + 'list.html?labelId=' + ruleForm.labelId
        }
        console.log(JSON.stringify(parent))
        addLabelPage(parent)
          .then(res => {
            const h = this.$createElement
            const data = res.data
            if (data.code == 200) {
              this.ruleForm = {}
              this.show = false
              this.$message({
                message: h('p', null, [
                  h('i', { style: 'color: teal' }, res.data.message)
                ], 2000),
                type: 'success'
              })
              this.getList()
            } else {
              this.$message({
                message: h('p', null, [
                  h('i', { style: 'color: teal' }, res.data.message)
                ], 2000)
              })
            }
          }).catch(err => {
          console.log(err)
        })
      },
      getList() {
        var params = {
          'labelName': this.linkTitle,
          'startTime': this.startTime,
          'endTime': this.endTime,
          'status': this.yeWuValue
        }
        newPages(params, this.pageNum, this.pageSize).then(res => {
          this.pageNum = res.data.data.pageNum
          this.pageSize = res.data.data.pageSize
          this.totalPages = res.data.data.total
          this.list = res.data.data.list
        })
      },
      closeModal() {
        this.show = false
        this.ruleForm = {}
      },
      addJ() {
        this.show = true
      },
      // 列表
      changeList(val) {
        this.pageNum = val
        this.getList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getList()
      }
    }

  }

</script>

<style scoped lang="scss">
  .contianer {
    padding: 24px 24px 50px 24px;
    background-color: #fbfbfb;
    min-width: 1200px;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    min-height: 500px;
    .search_box {
      min-width: 1200px;
      border-bottom: 1px solid #f6f6f6;
      padding: 20px 40px;
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
        margin-left: 20px;
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
      min-width: 1200px;
      background: white;
      position: absolute;
      top: 164px;
      left: 24px;
      right: 24px;
      bottom: 50px;
      .table_wrapper {
        max-height: 455px;
        min-height: 200px;
        overflow: auto;
        position: absolute;
        left: 20px;
        right: 30px;
        top: 56px;
        bottom: 133px;
      }
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
                padding: 0px 10px;
              }
            }
          }
        }
      }
      .addButton {
        overflow: hidden;
        min-width: 1200px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .line {
        width: 100%;
        border: 0.5px solid #dfdfdf;
        margin-top: 40px;
        position: absolute;
        bottom: 92px;
      }
      .page_msg {
        text-align: right;
        padding: 20px 50px 40px 0px;
        background-color: #ffffff;
        color: #666666;
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    }
    header {
      width: 100%;
      height: 40px;
      background: #eeeeee;
      font-size: 16px;
      color: rgb(51, 51, 51);
      font-family: MicrosoftYaHei;
      padding: 10px 10px;
    }
    section {
      width: 100%;
      margin-top: 20px;
    }
  }
</style>
