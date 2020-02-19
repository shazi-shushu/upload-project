<template>
  <div class="content_box">
    <div class="topLogo" @click="goHome">
      <!-- <div> -->
      <img :src="logoPng" alt="">
      <!-- </div> -->
      <!-- <div>
        融e购运营中心
      </div> -->
    </div>
    <el-scrollbar style="height: 100%;" wrap-class="scrollbar-wrapper">
      <!-- <div > -->
      <!-- <router-link class="topLogo" to="">asafsafsadsadsv
          多少给多少给多少更是高大上高大上</router-link> -->
      <!-- </div> -->
      <el-menu
        class="pad100"
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import logoPng from '@/assets/images/yunYingLogo.png'

export default {
  components: { SidebarItem },
  data() {
    return {
      logoPng
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    goHome() {
      this.$router.push({ path: '/dashboard', query: { a: 123 }})
    }
  }
}
</script>
<style scoped>
  .content_box{
    height:100%;
    overflow-y: scroll !important;
  }
  ::-webkit-scrollbar { width: 1px;}
  ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(250,250,250,0.3); border-radius: 10px;}
  ::-webkit-scrollbar-thumb { border-radius: 10px; background: rgba(225,214,214,0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(225,214,214,0.1);}
  ::-webkit-scrollbar-thumb:window-inactive { background:rgba(225,214,214,0.1)}
  .topLogo{
    width: 100%;
    display: block;
    height: 140px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 11111111111;
    color: #ffffff;
  }
   .topLogo img{
    width: 220px;
    height: 100%;
  }
  #app .sidebar-container .pad100 {
    border: none;
    height: 100%;
    width: 100% !important;
    padding-top: 140px;
  }
  .menu-wrapper{
	border-bottom: 1px solid #e5e7ea;
  }
</style>
