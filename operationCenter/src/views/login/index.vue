<template>
  <div class="login-container" :style="backgroundDiv">
    <div class="login_content">
      <div class="login_msg">
        <div class="login_title">
          <div class="login_title_img">
            <img src="@/assets/images/loginIcon.png" alt="">
          </div>
          <div class="login_title_name">欢迎使用融e购运营中心后台</div>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <!-- :placeholder="$t('login.username')"
              name="username"
              auto-complete="on" -->
            <el-input
              v-model="loginForm.username"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <!-- :placeholder="$t('login.password')"
              name="password"
              auto-complete="on" -->
            <el-input
              v-model="loginForm.password"
              :type="passwordType"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <div style="background-color: #c8000a; color: #ffffff; cursor: pointer;height: 24px; line-height: 24px;">
            <a href="//org.modao.cc/app/74121779726cf9208ac38bb00de5d990/embed" target="_blank">
              优品三悦官网,点我,点我
            </a>
          </div>
          <el-button :loading="loading" type="primary" class="login_btn" @click.native.prevent="handleLogin">
            {{ $t('login.logIn') }}
          </el-button>
        </el-form>
      </div>
      <div class="login_bot">
        <span>中国工商银行版权所有 京ICP证 030247号</span>
      </div>
    </div>
    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>
<script>
// import { validUsername } from '@/utils/validate'
// import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   console.log(value)
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      backgroundDiv: {
        backgroundImage: 'url(' + require('@/assets/images/loginBg.jpg') + ')'
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      // console.log(this)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //     this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  // $bg:#283443;
  // $light_gray:#eee;
  // $cursor: #fff;
  $bg:#ffffff;
  $light_gray:#333333;
  $cursor: #333333;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid #cccccc;
      background: #ffffff;
      border-radius: 5px;
      color: #333333;
    }
  }
</style>

<style scoped>
.login_content {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.login_msg{
  border-radius: 4px;
	opacity: 0.96;
  position: absolute;
  top: 100px;
  right: 200px;
  background-color: #ffffff;
  width: 390px;
	height: 440px;
  padding: 20px 0px;
}
.login_title_img{
  margin: 0 auto;
  text-align: center;
  width: 71px;
	height: 70px;
}
.login_title_img{
   margin: 0 auto;
   width: 100%;
	height: 100%;
}
.login_title_name{
  color: #333333;
    font-size: 22px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    margin-bottom: 20px;
}
.login_btn{
  width: 190px;
	height: 47px;
	background-color: #c8000a;
	border-radius: 8px;
  border: 0px;
  color: #ffffff;
  font-size: 14px;
  margin-top: 40px;
}
.login_bot{
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  color: #bbbbbb;
  font-size: 14px;
  height: 70px;
  line-height: 70px;
  text-align: center;
	background-color: rgba(0, 0, 0, 0.46);
	opacity: 0.26;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background: no-repeat center top;
  background-size: 100% 100%;
  // background: url('@/assets/images/loginBg.jpg') 0px 0px 100% 100% no-repeat,
  overflow: hidden;
  .login-form {
    position: relative;
    // width: 520px;
    // max-width: 100%;
    width: 320px;
    text-align: center;
    // padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size:18px;
      right: 0px;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
