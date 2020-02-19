<template>
  <div>
    <div class="content_tips">
      <!-- <span class="fz16 color333 content_tips_msg">查询结果</span> -->
      <span class="fz16 color333 addRoomTypeServer" @click="setClick('add')">添加</span>
    </div>
    <div class="list_content">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>开票项类型</th>
            <th>开票项名称</th>
            <th>发票类型</th>
            <th>运费</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ item.productType | statusType }}</td>
            <td>{{ item.invoiceName }}</td>
            <td>{{ item.invoiceType | channels }}</td>
            <td>{{ item.courierFee | courierFees }}</td>
            <td>{{ item.status | flagFilter }}</td>
            <td class="caoZuoBtn">
              <span @click="setClick(item)">编辑</span>
              <span @click="changeType(item)">{{ item.status | flagFilters }}</span>
              <!-- <span><router-link :to="{path:'/advManagement/editAdvMaintenance',query:{'advertId':item.advertId,'channelId':item.channelId}}">编辑</router-link></span> -->
              <!-- <span>设置价格</span> -->
              <!-- <span>下架</span> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 添加/编辑发票 -->
    <div v-if="closedFlag" class="alertCont">
      <div class="alertBody">
        <div class="alertTitle">
          <span>{{ alertTitle }}</span>
          <span class="closed" @click="closed">x</span>
        </div>
        <div class="alertWarper" style="padding: 20px 30px;">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="开票项名称" prop="invoiceName">
              <el-input v-model="ruleForm.invoiceName" />
            </el-form-item>
            <el-form-item label="开票项类型" prop="productType">
              <el-select v-model="ruleForm.productType" style="width:100%;" placeholder="请选择">
                <el-option
                  v-for="item in piaoTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="发票类型" prop="invoiceType">
              <el-select v-model="ruleForm.invoiceType" style="width:100%;" placeholder="请选择">
                <el-option
                  v-for="item in invoiceTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="运费" prop="courierFee">
              <el-input v-model="ruleForm.courierFee" style="width:60%;" />&nbsp;<span class="color666">元</span>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="ruleForm.status" style="width:60%;" placeholder="请选择">
                <el-option
                  v-for="item in roomType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <div style="height: 40px;line-height: 40px;text-align: center;">
              <el-button style="padding:6px 15px;background-color: #c8000a;border: 1px solid #c8000a;" type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <alert-msg v-if="alertMsgFlag" :msg="alertMsg" />
  </div>
</template>
<script>
/* Layout */
import Layout from '@/views/layout/Layout'
import { getToken } from '@/utils/auth'
import alertMsg from '@/components/alertMsg/alertMsg'
import { addInvoiceMsg, editInvoiceMsg, getInvoiceSingle } from '@/api/invoice/invoice'
export default {
  filters: {
    flagFilter: function(val) {
      return val === 1 ? '启用' : '停用'
    },
    flagFilters: function(val) {
      return val === 0 ? '启用' : '停用'
    },
    courierFees: function(val) {
      return '¥' + val + '.00'
    },
    isInvoices: function(val) {
      // console.log(val)
      return val === 'true' ? '需要' : '不需要'
    },
    platforms: function(val) {
      const platformList = { 1: '融e购', 2: '融e联' }
      return platformList[val]
    },
    // 发票类型 : 0-电子发票 1-增值税普通发票 2-增值税专用发票 3:自取’
    channels: function(val) {
      // 业务板块:1=旅游频道 2=E差旅
      const channelList = { 0: '电子发票', 1: '增值税普通发票', 2: '增值税专用发票', 3: '自取' }
      return channelList[val]
    },
    statusType: function(val) {
      // 开票项目类型 '’产品类型:1-酒店;2-机票;3-火车票;4-景点门票;5-线路;6-签证;7-跟团游
      const statusTypeObj = { 1: '酒店', 2: '机票', 3: '火车票', 4: '门票', 5: '线路', 6: '签证', 7: '跟团游' }
      return statusTypeObj[val]
    }
  },
  components: {
    alertMsg
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    var isIntegerNotMust = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必填项不能为空'))
      }
      if (value.length > 55) {
        callback(new Error('最多填写 55 个字符'))
      }
      setTimeout(() => {
        if (!Number(value)) {
          callback(new Error('请输入正整数'))
        } else {
          const re = /^[0-9]*[1-9][0-9]*$/
          const rsCheck = re.test(value)
          if (!rsCheck) {
            callback(new Error('请输入正整数'))
          } else {
            callback()
          }
        }
      }, 500)
    }
    return {
      alertMsgFlag: false,
      alertMsg: '保存成功',
      alertTitle: '添加',
      closedFlag: false,
      roomType: [
        // { value: '', label: '请选择' },
        { value: 1, label: '启用' },
        { value: 0, label: '停用' }
      ],
      // 发票类型 : 0-电子发票 1-增值税普通发票 2-增值税专用发票 3:自取’
      invoiceTypeList: [
        { value: '', label: '请选择' },
        { value: 0, label: '电子发票' },
        { value: 1, label: '增值税普通发票' },
        { value: 2, label: '增值税专用发票' },
        { value: 3, label: '自取' }
      ],
      // 产品类型:1-酒店;2-机票;3-火车票;4-景点门票;5-线路;6-签证;7-跟团游
      piaoTypeList: [
        { value: '', label: '请选择' },
        { value: '1', label: '酒店' },
        { value: '4', label: '门票' },
        { value: '2', label: '机票' },
        { value: '3', label: '火车票' },
        { value: '5', label: '线路' },
        { value: '6', label: '签证' }
        // { value: '7', label: '跟团游' }
      ],
      ruleForm: {
        invoiceName: '',
        invoiceType: '',
        status: '',
        productType: '',
        courierFee: '',
        merchantId: this.$store.state.user.userId,
        // isDel: '',
        status: ''

      },
      rules: {
        invoiceName: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        courierFee: [
          { required: true, validator: isIntegerNotMust, trigger: 'blur' }
          // { max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        invoiceType: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        productType: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        status: [{ required: true, message: '必填项不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    setClick(val) {
      this.closedFlag = true
      if (val === 'add') {
        this.alertTitle = '添加'
        this.ruleForm = {
          invoiceName: '',
          invoiceType: '',
          // status: '',
          productType: '',
          courierFee: '',
          merchantId: this.$store.state.user.userId,
          status: 1
        }
      } else {
        this.alertTitle = '编辑'
        getInvoiceSingle(val.invoiceAdministrationId).then((res) => {
          // console.log('getInvoiceSingle')
          // console.log(res.data.data)
          this.ruleForm = { ...res.data.data }
          // this.$nextTick(() => {
          // this.closedFlag = true
          // })
        })
      }
    },
    changeType(val) {
      const obj = { ...val, del: false }
      obj.status = val.status === 0 ? 1 : 0
      // obj.isDel = false
      // console.log(obj)
      // return false
      editInvoiceMsg(obj).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$emit('shuaXinList')
        } else {
          this.$message({
            message: '编辑失败',
            type: 'error'
          })
        }
      })
    },
    closed(val) {
      this.closedFlag = false
    },
    goDetails(val) {
      var orderNo = val.substring(val.length - 4)
      // console.log()
      let flagOrder = false
      flagOrder = this.isAddRouter(val)
      if (flagOrder) {
        this.$router.options.routes.push({
          path: '/orderDetails' + val,
          component: Layout,
          hidden: true,
          redirect: '/orderDetails' + val,
          children: [
            {
              path: '/orderDetails' + val,
              component: () => import('@/views/orderList/orderDetails/orderDetails'),
              name: 'orderDetails' + val,
              meta: { title: '酒店订单详情(' + orderNo + ')', noCache: true }
            }
          ]
        })
        this.$router.addRoutes(this.$router.options.routes)// 调用add
      }
      this.$router.push({ path: '/orderDetails' + val, query: { orderNo: val }})
      //  console.log(this.$router)
    },
    isAddRouter(val) {
      let flag = true
      this.$router.options.routes.forEach(function(item) {
        // console.log(item.path.includes(val))
        if (item.path.includes(val)) {
          flag = false
          return false
        }
      })
      return flag
    },
    editAdvType(val) {
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // this.$emit('shuaXinList')
          if (this.alertTitle === '添加') {
            addInvoiceMsg(this.ruleForm).then((res) => {
              // console.log('addInvoiceMsg')
              // console.log(res.data)
              if (res.data.code === 0) {
                this.closedFlag = false
                this.alertMsgFlag = true
                this.$emit('shuaXinList')
                const _this = this
                window.setTimeout(function() {
                  _this.alertMsgFlag = false
                }, 500)
              } else {
                this.$message({
                  message: '新增失败',
                  type: 'error'
                })
              }
            })
          } else {
            // 编辑保存
            editInvoiceMsg(this.ruleForm).then((res) => {
              // console.log('addInvoiceMsg')
              // console.log(res.data)
              if (res.data.code === 0) {
                this.$emit('shuaXinList')
                this.closedFlag = false
                this.alertMsgFlag = true
                const _this = this
                window.setTimeout(function() {
                  _this.alertMsgFlag = false
                }, 500)
              } else {
                this.$message({
                  message: '编辑失败',
                  type: 'error'
                })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
    .content_tips{
        height: 60px;
        line-height: 60px;
        background-color: #ffffff;
        padding-left: 20px;
        margin-top: 4px;
        position: relative;
    }
    .content_tips_msg{
        border-left: 2px solid #c8000a;
        padding-left: 4px;
        height: 14px;
        /* display: inline-block; */
    }
    .addRoomTypeServer{
        position: absolute;
        bottom: 4px;
        right: 20px;
        color: #ffffff;
        background-color: #c8000a;
        height: 34px;
        line-height: 34px;
        padding: 0px 30px;
        border-radius: 4px;
        cursor: pointer;
    }
    .fl{
        float: left;
    }
    .caoZuoBtn span{
        display: inline-block;
        /* border-radius: 10px; */
        /* border: solid 1px #c8000a; */
        height: 28px;
        line-height: 28px;
        padding: 0px 10px;
        cursor: pointer;
        color: #c8000a;
        font-size: 14px;
        margin-right: 10px;
    }
    .list_content{
        overflow-x:scroll;
        width: 100%;
        padding: 0px 20px;
        background-color: #ffffff;
    }
    table{border-collapse: collapse;}
    table td,th{
        border: 1px solid #dfdfdf;
        white-space: nowrap;
        }
   .list_content table {
      color: #666666;
      font-size: 14px;
      width: 100%;
       /* min-width:1200px; */
   }
   .list_content table tr .orderNo{
       color: #d80d16;
       text-decoration: underline;
       cursor: pointer;
   }
   .list_content table thead{
      height: 40px;
      line-height: 40px;
      background-color: #f6f6f6;
   }
   .list_content table thead tr th{
      border: solid 1px #dfdfdf;
      padding: 0px 10px;
   }
   .list_content table tbody{
      height: 39px;
      line-height: 39px;
      background-color: #ffffff;
   }
   .list_content table tbody tr td{
      border: solid 1px #dfdfdf;
      padding: 0px 10px;
      text-align: center;
   }
</style>
<style scoped>
.alertCont{position: fixed;top: 0px;left: 0px;width:100%;height: 100%;background-color: rgba(0, 0, 0,0.4);z-index: 1111;}
.alertBody{width: 380px;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);border-radius: 10px;overflow: hidden;}
.alertTitle{height: 40px;line-height: 40px;background-color: #eeeeee;	color: #333333;font-size: 16px;position: relative;padding-left: 10px;}
.closed{width: 40px;height: 40px;line-height: 40px;position: absolute;top: 0px;right: 0px;text-align: center;cursor: pointer;}
.alertWarper{background-color: #ffffff;}
</style>

