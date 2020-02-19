<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <!-- 面包屑导航 -->
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="title_nav">
      <span>欢迎来到融e购运营中心！</span>
      <span>今天</span>
      <span>{{ dataTime }} {{ dayType }}</span>
    </div>
    <div class="right-menu">
      <div class="right_msg">
        <div class="name_lst">
          <div><img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt=""></div>
          <span>{{ name }}</span>
        </div>
        <div class="clearCache">
          清除缓存
        </div>
        <div class="clearCache" @click="changePassword">
          修改密码
        </div>
        <div class="logOut" @click="logout">
          退出登陆
        </div>
      </div>
      <!-- <template v-if="device!=='mobile'"> -->
      <!-- <search class="right-menu-item" /> -->

      <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

      <!-- <screenfull class="right-menu-item hover-effect" /> -->

      <!-- <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="right-menu-item hover-effect" />
        </el-tooltip> -->

      <!-- <lang-select class="right-menu-item hover-effect" /> -->

      <!-- <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="right-menu-item hover-effect" />
        </el-tooltip> -->
      <!-- </template> -->

      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{ $t('navbar.github') }}
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
    <!-- 修改密码 -->
    <div v-if="closedFlag" class="alertCont">
      <div class="alertBody">
        <div class="alertTitle">
          <span>{{ alertTitle }}</span>
          <span class="closed" @click="closed">x</span>
        </div>
        <div class="alertWarper" style="padding: 20px 30px;">
          <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="passWord">
              <el-input v-model="ruleForm.passWord" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassWord">
              <el-input v-model="ruleForm.newPassWord" type="password" autocomplete="off" />
              <span class="fz12 color999">密码由8-20位字母、数字组合，区分大小写</span>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassWord">
              <el-input v-model="ruleForm.confirmPassWord" type="password" autocomplete="off" />
            </el-form-item>
            <!-- <el-form-item> -->
            <div style="height: 40px;line-height: 40px;text-align: center;">
              <el-button style="padding:6px 15px;background-color: #c8000a;border: 1px solid #c8000a;" type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </div>
            <!-- </el-form-item> -->
          </el-form>
        </div>
      </div>
    </div>
    <alert-msg v-if="alertMsgFlag" :msg="alertMsg" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { changePassword } from '@/api/login'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import LangSelect from '@/components/LangSelect'
// import ThemePicker from '@/components/ThemePicker'
// import Search from '@/components/HeaderSearch'
import alertMsg from '@/components/alertMsg/alertMsg'

export default {
  components: {
    // Breadcrumb,
    Hamburger,
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    // LangSelect,
    // ThemePicker,
    // Search
    alertMsg
  },
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'))
      }
      // console.log(value)
      this.ruleForm.passWord = value
      changePassword(this.ruleForm).then((res) => {
        if (res.data.message === '原密码有误，请重新输入') {
          callback(new Error('原密码有误，请重新输入'))
        } else {
          callback()
        }
      })
    }
    var validatePass = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
      // console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('密码格式不正确'))
      } else {
        if (this.ruleForm.confirmPassWord !== '') {
          this.$refs.ruleForm.validateField('confirmPassWord')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('密码由8-20位字母、数字组合，区分大小写'))
      } else if (value !== this.ruleForm.newPassWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      iconFlag: false,
      alertMsgFlag: false,
      alertMsg: '保存成功',
      alertTitle: '修改密码',
      closedFlag: false,
      dataTime: '',
      dayType: '',
      ruleForm: {
        newPassWord: '',
        confirmPassWord: '',
        passWord: '',
        type: '1',
        userId: this.$store.state.user.userId,
        userName: this.$store.state.user.name
      },
      rules: {
        newPassWord: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmPassWord: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        passWord: [
          { required: true, validator: validateOldPass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  mounted() {
    this.getDataTime()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    getDataTime() {
      const dataNow = new Date()
      const y = dataNow.getFullYear()
      const m = dataNow.getMonth() + 1
      const d = dataNow.getDate()
      var weekday = new Array(7)
      weekday[0] = '星期天'
      weekday[1] = '星期一'
      weekday[2] = '星期二'
      weekday[3] = '星期三'
      weekday[4] = '星期四'
      weekday[5] = '星期五'
      weekday[6] = '星期六'
      this.dataTime = y + '-' + (m < 9 ? '0' + m : m) + '-' + (d < 9 ? '0' + d : d)
      console.log(y)
      console.log(m)
      console.log(d)
      console.log(this.dataTime)
      this.dayType = weekday[dataNow.getDay()]
    },
    changePassword() {
      this.closedFlag = true
    },
    closed() {
      this.closedFlag = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('submitForm');
          this.changePasswordClick(this.ruleForm)
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    changePasswordClick(param) {
      changePassword(param).then((res) => {
        // console.log('changePassword')
        //  console.log(res)
        this.alertMsgFlag = true
        this.closedFlag = false
        const _this = this
        window.setTimeout(function() {
          _this.alertMsgFlag = false
        }, 1000)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title_nav {
  position: absolute;
  top: 15px;
  left: 60px;
  font-size: 16px;
  color: #888888;
}
.right_msg div {
  display: inline-block;
  color: #666666;
  font-size: 16px;
}
.clearCache {
  padding: 0px 20px;
  cursor: pointer;
}
.right_msg .logOut {
  padding: 0px 20px;
  color: #d63840;
  cursor: pointer;
}
.name_lst {
  display: inline-block;
  padding: 0px 20px;
}
.name_lst div {
  display: inline-block;
  height: 48px;
  line-height: 48px;
  width: 48px;
  overflow: hidden;
  vertical-align: middle;
  border-radius: 24px;
  margin-bottom: 5px;
}
.name_lst div img {
  display: inline-block;
  height: 100%;
  width: 100%;
  vertical-align: middle;
  border-radius: 24px;
}
.navbar {
  height: 50px;
  overflow: hidden;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<style scoped>
.alertCont{position: fixed;top: 0px;left: 0px;width:100%;height: 100%;background-color: rgba(0, 0, 0,0.4);z-index: 1111;}
.alertBody{width: 380px;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);border-radius: 10px;overflow: hidden;}
.alertTitle{height: 40px;line-height: 40px;background-color: #eeeeee;	color: #333333;font-size: 16px;position: relative;padding-left: 10px;}
.closed{width: 40px;height: 40px;line-height: 40px;position: absolute;top: 0px;right: 0px;text-align: center;cursor: pointer;}
.alertWarper{background-color: #ffffff;}
</style>
