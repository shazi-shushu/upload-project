<template>
  <div class="container">
    <title-name :item="titleName" />
    <!--区域搜索-->
    <div class="search_box">
      <div class="selectItem">
        <div class="celectItemL">频道</div>
        <div class="celectItemR">
          <el-select v-model="yeWuValue" placeholder="请选择">
            <el-option
              v-for="item in yeWuBanKuai"
              :key="item.channelId"
              :label="item.channelName"
              :value="item.channelId"
            />
          </el-select>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">关键词位置</div>
        <div class="celectItemR">
          <el-select v-model="location" placeholder="请选择">
            <el-option
              v-for="(items) in list1"
              :key="items.value"
              :label="items.label"
              :value="items.value"
              style="width: 280px;"
            />
          </el-select>
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
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
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
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </div>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">状态</div>
        <div class="celectItemR">
          <el-select v-model="zhuangtai" placeholder="请选择">
            <el-option
              v-for="(items) in list2"
              :key="items.value"
              :label="items.label"
              :value="items.value"
              style="width: 280px;"
            />
          </el-select>
        </div>
      </div>
      <div class="buttonBox">
        <el-button type="danger" style="background:#C8000A;" @click="search()">查询</el-button>
      </div>
    </div>
    <!--列表区域-->
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
            <td>关键词位置</td>
            <td>关键词</td>
            <td>链接</td>
            <td>开始时间</td>
            <td>结束时间</td>
            <td>排序值</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableList" :key="index">
            <td>{{ index+1 }}</td>
            <!-- <td class="orderNo"> <router-link :to="{path:'/orderDetails',query:{orderNo:item.orderNo}}">{{item.orderNo}}</router-link></td> -->
            <td>{{ item.channelName }}</td>
            <td>{{ item.keywordLocation }}</td>
            <td>{{ item.keyword }}</td>
            <td>{{ item.link }}</td>
            <td>{{ item.startTime }}</td>
            <td>{{ item.endTime }}</td>
            <td>{{ item.sort }}</td>
            <td>{{ item.status===0 ?"启用":"停用" }}</td>
            <td class="oprator">
              <span @click="editModel(item)">编辑</span>
              <span @click="stop(item)">{{ item.status===0?"停用":"启用" }}</span>
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
    <Modal :show="show">
      <header>
        <span>新增关键词</span>
        <i class="el-icon-close" style="width:14px;height:14px;float: right" @click="closeModal" />
      </header>
      <section>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="频道" prop="region">
            <!-- <el-select v-model="ruleForm.region" placeholder="请选择" style="width:280px;">
              <el-option label="开启" value="shanghai" />
              <el-option label="停用" value="beijing" />
            </el-select>-->
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择"
              style="width: 280px;"
              @change="pd"
            >
              <el-option
                v-for="item in yeWuBanKuai1"
                :key="item.channelId"
                :label="item.channelName"
                :value="item.channelId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="关键词位置" prop="keyword">
            <el-select v-model="ruleForm.keyword" placeholder="请选择" style="width:280px;">
              <el-option
                v-for="(items) in list1"
                :key="items.value"
                :label="items.label"
                :value="items.value"
                style="width: 280px;"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="关键词" prop="name" style="width:380px;">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="链接" prop="desc" style="width:380px;">
            <el-input v-model="ruleForm.desc" />
          </el-form-item>
          <el-form-item label="开始时间" required>
            <el-col :span="12">
              <el-form-item prop="date1">
                <el-date-picker
                  v-model="ruleForm.date1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="8">
              <el-form-item prop="date2">
                <el-time-picker
                  v-model="ruleForm.date2"
                  placeholder="选择时间"
                  style="width: 100%;"
                  value-format="HH:mm:ss"
                  format="HH:mm:ss"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-col :span="12">
              <el-form-item prop="date3">
                <el-date-picker
                  v-model="ruleForm.date3"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="8">
              <el-form-item prop="date4">
                <el-time-picker
                  v-model="ruleForm.date4"
                  placeholder="选择时间"
                  style="width: 100%;"
                  value-format="HH:mm:ss"
                  format="HH:mm:ss"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="排序值" prop="order" style="width:380px;">
            <el-input v-model="ruleForm.order" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择" style="width:280px;">
              <el-option
                v-for="(items) in list2"
                :key="items.value"
                :label="items.label"
                :value="items.value"
                style="width: 280px;"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="background:#C8000A;margin-left:180px;border:none;"
              @click="submitForm('ruleForm')"
            >保存</el-button>
          </el-form-item>
        </el-form>
      </section>
    </Modal>
    <Modal :show="show1">
      <header>
        <span>编辑关键词</span>
        <i class="el-icon-close" style="width:14px;height:14px;float: right" @click="closeModal" />
      </header>
      <section>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="频道" prop="region">
            <!-- <el-select v-model="ruleForm.region" placeholder="请选择" style="width:280px;">
              <el-option label="开启" value="shanghai" />
              <el-option label="停用" value="beijing" />
            </el-select>-->
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择"
              style="width: 280px;"
              @change="pd"
            >
              <el-option
                v-for="item in yeWuBanKuai1"
                :key="item.channelId"
                :label="item.channelName"
                :value="item.channelId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="关键词位置" prop="keyword">
            <el-select v-model="ruleForm.keyword" placeholder="请选择" style="width:280px;">
              <el-option
                v-for="(items) in list1"
                :key="items.value"
                :label="items.label"
                :value="items.value"
                style="width: 280px;"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="关键词" prop="name" style="width:380px;">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="链接" prop="desc" style="width:380px;">
            <el-input v-model="ruleForm.desc" />
          </el-form-item>
          <el-form-item label="开始时间" required>
            <el-col :span="12">
              <el-form-item prop="date1">
                <el-date-picker
                  v-model="ruleForm.date1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="8">
              <el-form-item prop="date2">
                <el-time-picker
                  v-model="ruleForm.date2"
                  placeholder="选择时间"
                  style="width: 100%;"
                  value-format="HH:mm:ss"
                  format="HH:mm:ss"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-col :span="12">
              <el-form-item prop="date3">
                <el-date-picker
                  v-model="ruleForm.date3"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="8">
              <el-form-item prop="date4">
                <el-time-picker
                  v-model="ruleForm.date4"
                  placeholder="选择时间"
                  style="width: 100%;"
                  value-format="HH:mm:ss"
                  format="HH:mm:ss"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="排序值" prop="order" style="width:380px;">
            <el-input v-model="ruleForm.order" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择" style="width:280px;">
              <el-option
                v-for="(items) in list2"
                :key="items.value"
                :label="items.label"
                :value="items.value"
                style="width: 280px;"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="background:#C8000A;margin-left:180px;border:none;"
              @click="submitForm1('ruleForm')"
            >保存</el-button>
          </el-form-item>
        </el-form>
      </section>
    </Modal>
  </div>
</template>

<script>
import { getList, searchAdd, searchUpdate, search } from '@/api/labelManage/searchLabel/search'
import { chanel, booth } from '@/api/productrecommend/productrecom'
import titleName from '@/components/titleName/titleName'
import Modal from './modalSearchPage'

import axios from 'axios'
export default {
  name: 'SearchLabelPage',
  components: {
    titleName,
    Modal
  },
  data() {
    return {
      tit: '新增关键字',
      tableList: [],
      titleName: '搜索标签',
      yeWuValue: '',
      pageNum: 1,
      totalPages: 10,
      yeWuBanKuai: [],
      yeWuBanKuai1: [],
      startTime: '',
      endTime: '',
      show: false,
      show1: false,
      location: '',
      zhuangtai: '',
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
      ruleForm: {
        name: '',
        region: '',
        keyword: '',
        date1: '',
        date2: '',
        data3: '',
        data4: '',
        desc: '',
        order: '',
        status: ''
      },
      rules: {},
      list2: [
        { value: '', label: '请选择' },
        { value: 1, label: '停用' },
        { value: 0, label: '启用' }
      ],
      list1: [
        { value: '', label: '请选择' },
        { value: 1, label: '1' },
        { value: 0, label: '2' }
      ],
      channelType: '',
      channelName: '',
      param: {
        channelId: '',
        channelType: '',
        channelName: '',
        endTime: '',
        keyword: '',
        keywordLocation: '',
        link: '',
        sort: '',
        startTime: '',
        status: '',
        pageNum: '',
        pageSize: ''
      }
    }
  },
  mounted() {
    this.getListItem(this.param)
    if (this.$route.name === 'searchLabelPage') {
      this.$emit('showsear', 2)
    }
    chanel().then(res => {
      // console.log(res.data.data);
      this.yeWuBanKuai1 = res.data.data
      this.yeWuBanKuai = res.data.data
      console.log(456788)
      console.log(this.yeWuBanKuai);
    })
  },
  methods: {
    // 搜索标签的列表数据获取
    getListItem(params) {
      getList(params).then(res => {
        console.log(res)
        this.tableList = res.data.data.list
        this.pageNum = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.totalPages = res.data.data.total
        // console.log(res.data.data.list)
      })
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
        } else {
          console.log('error submit!!')
          return false
        }
      })
      var obj = {
        channelType:this.ruleForm.region,
        endTime: this.ruleForm.date3 + ' ' + this.ruleForm.date4 + '.0',
        keyword: this.ruleForm.name,
        keywordLocation: this.ruleForm.keyword,
        link: this.ruleForm.desc,
        // redisKey: 2,
        sort: this.ruleForm.order,
        startTime: this.ruleForm.date3 + ' ' + this.ruleForm.date4 + '.0',
        status: this.ruleForm.status
      }
      searchAdd(obj).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.show = false
        } else {
          this.show = true
        }
        // this.$router.go(0)
        this.getListItem(this.param)
      })
    },
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
        } else {
          console.log('error submit!!')
          return false
        }
      })
      var obj1 = {
        channelId: this.channelType,
        channelType:this.ruleForm.region ,
        endTime: this.ruleForm.date3 + ' ' + this.ruleForm.date4 + '.0',
        keyword: this.ruleForm.name,
        keywordLocation: this.ruleForm.keyword,
        link: this.ruleForm.desc,
        // redisKey: 'operationId50',
        sort: this.ruleForm.order,
        startTime: this.ruleForm.date3 + ' ' + this.ruleForm.date4 + '.0',
        status: this.ruleForm.status
      }
      // axios.put(this.$store.state.user.url+'/sySearchLabel/searchLabelUpdate',obj1)
      searchUpdate(obj1).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.show1 = false
        } else {
          this.show1 = true
        }
        // location.reload();
        // this.$router.go(0)
        this.getListItem(this.param)
      })
    },
    stop(item) {
      // console.log(item.channelId)
      var obj3 = {
        channelId: item.channelId,
        status: item.status === 0 ? 1 : 0
      }
      searchUpdate(obj3).then(res => {
        console.log(res)
        this.getListItem(this.param)
        // this.$router.go(0)
      })
    },
    search() {
      this.param.channelType = this.yeWuValue
      // this.channelType = 2;
      this.param.keywordLocation = this.location
      this.param.startTime = this.startTime
      this.param.endTime = this.endTime
      this.param.status = this.zhuangtai
      this.getListItem(this.param)
      // search(this.param).then(res => {
      //   console.log(res);
      // })
    },
    pd(channelId) {
      let obj = {}
      obj = this.yeWuBanKuai1.find(item => {
        // this.ruleForm
        return item.channelId === channelId // 筛选出匹配数据
      })
      // console.log(obj.channelName);
      this.channelName = obj.channelName
    },
    addJ() {
      this.show = true
      // console.log(this.channelType);
    },
    closeModal() {
      this.show = false
      this.show1 = false
    },
    changeList(val) {
      this.param.pageNum = val
      this.getListItem(this.param)
    },
    handleSizeChange(val) {
      this.param.pageSize = val
      this.getListItem(this.param)
    },
    editModel(item) {
      this.show1 = true
      this.tit = '编辑关键词'
       console.log(item.startTime.split(" ")[0]);
      this.channelType = item.channelId
      this.ruleForm.region=item.channelType
      this.ruleForm.name=item.keyword
      this.ruleForm.keyword = item.keywordLocation
      this.ruleForm.date1=item.startTime.split(" ")[0]
      this.ruleForm.date2=item.startTime.split(" ")[1]
      this.ruleForm.date3=item.endTime.split(" ")[0]
      this.ruleForm.date4=item.endTime.split(" ")[1]
      this.ruleForm.desc=item.link
      this.ruleForm.order=item.sort
      this.ruleForm.status=item.status
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 24px 24px 50px 24px;
  background-color: #fbfbfb;
  min-width: 1200px;
  overflow: auto;
  .search_box {
    width: 100%;
    border-bottom: 1px solid #f6f6f6;
    padding: 20px 10px;
    background: white;
    .selectItem {
      height: 50px;
      line-height: 50px;
      color: #333333;
      font-size: 14px;
      width: 230px;
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
    min-width: 1200px;
    background: white;
    height: 400px;
    table {
      border-collapse: collapse;
      width: 100%;
      background: white;
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
      border-bottom: 0.5px solid #dfdfdf;
      height:40px;
      background: white;
    }
    .page_msg {
      text-align: right;
      padding: 20px 50px 40px 0px;
      background-color: #ffffff;
      color: #666666;
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
