<template>
  <div class="pictureInfor_content">
    <!-- 图片导航部分 -->
    <!-- <pic-nav :picNavList="picNavList" :activeIndex="activeIndex" @selPicNav="selPicNav" /> -->
    <!-- 图片公公样式部分 -->
    <!-- <pic-common v-if="activeIndex!='1'"/> -->
    <!-- 图片展示特色部分 -->
    <pic-only />
  </div>
</template>
<script>
// import picNav from './picComponents/picNavInfor'
// import picCommon from './picComponents/picCommonInfor'
import picOnly from './picComponents/onlyPicInfor'
export default {
  components: {
    // picNav,
    // picCommon,
    picOnly
  },
  data() {
    return {
      activeIndex: '0',
      picNavList: [
        {
          name: '全部',
          id: '0',
          num: '100'
        },
        {
          name: '房型',
          id: '1',
          num: '30'
        },
        {
          name: '外景',
          id: '2',
          num: '5'
        },
        {
          name: '大堂',
          id: '3',
          num: '15'
        }
      ]
    }
  },
  methods: {
    selPicNav(val) {
      this.activeIndex = val
    }
  }
}
</script>
<style scoped>
.pictureInfor_content{
    background-color: #ffffff;
    margin-bottom: 4px;
    padding: 20px;
}
</style>
