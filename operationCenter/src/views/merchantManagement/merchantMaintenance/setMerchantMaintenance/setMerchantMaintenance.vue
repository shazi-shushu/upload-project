<template>
  <div>
    <div class="wapperCont">
      <!-- title名称 -->
      <title-name :item="titleName" />
      <div class="wapperBoday clearfix">
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="140px" class="demo-ruleForm">
          <div class="wapperItem">
            <el-form-item label="商户名称" prop="merchantName">
              <el-input v-model="ruleForm.merchantName" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="登录用户名" prop="merchantLoginName">
              <el-input v-model="ruleForm.merchantLoginName" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="商户编号" prop="merchantCode">
              <el-input v-model="ruleForm.merchantCode" disabled />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="登录密码" prop="merchantPassword">
              <el-input v-model="ruleForm.merchantPassword" type="password" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="AES密钥" prop="aesSecretKey">
              <el-input v-model="ruleForm.aesSecretKey" type="textarea" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="RSA私钥" prop="rsaPrivateKey">
              <el-input v-model="ruleForm.rsaPrivateKey" type="textarea" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="APP ID" prop="appId">
              <el-input v-model="ruleForm.appId" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="RSA公钥" prop="rsaPublicKey">
              <el-input v-model="ruleForm.rsaPublicKey" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="融E购商户ID" prop="eboughtMerchantId">
              <el-input v-model="ruleForm.eboughtMerchantId" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="店铺名称" prop="eboughtStoreName">
              <el-input v-model="ruleForm.eboughtStoreName" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="融E购店铺ID" prop="eboughtStoreId">
              <el-input v-model="ruleForm.eboughtStoreId" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="商品ID" prop="commodityId">
              <el-input v-model="ruleForm.commodityId" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="商品SKUID" prop="commoditySkuid">
              <el-input v-model="ruleForm.commoditySkuid" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="店铺APP KEY" prop="storeAppKey">
              <el-input v-model="ruleForm.storeAppKey" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="店铺APP授权码" prop="storeAppCode">
              <el-input v-model="ruleForm.storeAppCode" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="到期时间" prop="passTime">
              <el-col>
                <el-date-picker v-model="ruleForm.passTime" type="date" placeholder="选择日期" style="width: 100%;" />
              </el-col>
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="开户时间" prop="openTime">
              <el-col>
                <el-date-picker v-model="ruleForm.openTime" type="date" placeholder="选择日期" style="width: 100%;" />
              </el-col>
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="联系手机号" prop="merchantNum">
              <el-input v-model="ruleForm.merchantNum" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="店铺APP应用密码" prop="storeAppPassword">
              <el-input v-model="ruleForm.storeAppPassword" />
            </el-form-item>
          </div>
          <div class="wapperItem">
            <el-form-item label="状态" prop="deleteFlag">
              <el-select v-model="ruleForm.deleteFlag" placeholder="请选择">
                <el-option
                  v-for="item in roomType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="wapperBtn">
            <el-button style="background-color: #c8000a;border-color: #c8000a;padding: 8px 29px;" type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <!-- <el-button  @click="resetForm('ruleForm')">重置</el-button> -->
          </div>
        </el-form>
      </div>
      <!-- <div class="wapperBtn">
          <span @click="submitForm('ruleForm')">提交</span>
          <span  @click="resetForm('ruleForm')">重置</span>
        </div> -->
    </div>
  </div>
</template>
<script>
import titleName from '@/components/titleName/titleName'
import { addmerchant } from '@/api/merchant/merchant'
import { getToken } from '@/utils/auth'
export default {
  components: {
    titleName
  },
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('必填项不能为空'))
    //   }
    // }
    return {
      roomTypeValue: '',
      // 下拉选项：请选择、上架、下架
      roomType: [
        // { value: '', label: '请选择' },
        { value: 0, label: '启用' },
        { value: 1, label: '停用' }
      ],
      titleName: '添加商户',
      ruleForm: {
        aesSecretKey: '', // AES密钥
        appId: '', // appId
        authId: '', // id
        authIds: '', // 权限Ids
        authName: '', // 名称
        authPid: '', // 模块id
        commodityId: '', // 商品id
        commoditySkuid: '', // 商品SKUID
        createName: '', // 创建人
        createTime: '', // 创建时间
        deleteFlag: 0, // 是否删除0未1已删除
        eboughtMerchantId: '', // 融e购id
        eboughtStoreId: '', // 融e购店铺id
        eboughtStoreName: '', // 融e购店铺名称
        flag: '', // 是否选中
        menuName: '', // 菜单名称
        merchantCode: '', // 编号
        merchantId: '', // id
        merchantLoginName: '', // 登录名
        merchantName: '',
        merchantNum: '', // 手机号
        merchantPassword: '', // 商户密码
        openTime: '', // 开户时间
        passTime: '', // 过期时间
        platform: '1', // 商户0，运营1
        redisKey: getToken(), // 登陆返回的redisKey
        rsaPrivateKey: '', // RSA私钥
        rsaPublicKey: '', // RSA公钥
        storeAppCode: '', // 店铺APP编号
        storeAppKey: '', // 店铺APPKEY
        storeAppPassword: '', // 店铺APP密码
        userId: ''// 用户id
      },
      rules: {
        aesSecretKey: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 255, message: '最多填写 255 个字符', trigger: 'blur' }
        ],
        rsaPrivateKey: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 255, message: '最多填写 255 个字符', trigger: 'blur' }
        ],
        rsaPublicKey: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 255, message: '最多填写 255 个字符', trigger: 'blur' }
        ],
        storeAppKey: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 255, message: '最多填写 255 个字符', trigger: 'blur' }
        ],
        merchantPassword: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        merchantLoginName: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        merchantName: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],

        appId: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        eboughtMerchantId: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        eboughtStoreName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        commodityId: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        commoditySkuid: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        merchantNum: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        storeAppCode: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        storeAppPassword: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { min: 1, max: 55, message: '最多填写 55 个字符', trigger: 'blur' }
        ],
        openTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        passTime: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      // this.ruleForm.openTime=moment(that.newForm.useTime).format('YYYY-MM-DD');
      // this.ruleForm.passTime=moment(that.newForm.useTime).format('YYYY-MM-DD');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const newOpTime = new Date(this.ruleForm.openTime)
          const newPaTime = new Date(this.ruleForm.passTime)
          this.ruleForm.openTime = newOpTime.getFullYear() + '-' + Number(newOpTime.getMonth() + 1) + '-' + newOpTime.getDate()
          this.ruleForm.passTime = newPaTime.getFullYear() + '-' + Number(newPaTime.getMonth() + 1) + '-' + newPaTime.getDate()
          //  return false
          addmerchant(this.ruleForm).then((res) => {
            // console.log("add res")
            // console.log(res)
            if (res.data.code === 200) {
              this.$message({
                message: res.data.message,
                type: 'success',
                duration: 1 * 1000
              })
              this.$router.push('/merchantMaintenance/merchantMaintenanceList')
            } else {
              this.$message({
                message: res.data.message,
                type: 'error',
                duration: 1 * 1000
              })
            }
          })
          // alert('submit!')
        } else {
          // console.log('error submit!!')
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
.wapperCont{background-color: #f6f6f6;padding: 20px;}
.wapperBoday{background-color: #ffffff;padding: 20px 10px;}
.wapperItem{width: 35%;float: left;}
.wapperItem:nth-child(2n+1){margin-right: 4%}
.wapperBtn{background-color: #ffffff;width: 100%;height: 50px;line-height: 50px;text-align: center;overflow: hidden;}
</style>
<style>
/* .el-button--primary {
  color: #fff;
  background-color: #c8000a;
  border-color: #c8000a;
}
.el-button--primary:hover {
  color: #fff;
  background-color: #c8000a;
  border-color: #c8000a;
} */
/* .el-button:hover {
    color: #ffffff;
    border-color: #c8000a;
    background-color: #c8000a;
} */
</style>
