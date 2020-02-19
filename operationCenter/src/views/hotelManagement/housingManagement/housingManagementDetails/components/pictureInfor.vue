<template>
  <div class="pictureInfor_content">
    <div class="upPictureContent">
      <span> <span class="red">*</span> 酒店图片</span>
      <span class="upImg" @click="showUpImg">图片上传</span>
    </div>
    <!-- 图片导航部分 -->
    <!-- <pic-nav :picNavList="picNavList" :activeIndex="activeIndex" @selPicNav="selPicNav" /> -->
    <!-- 图片公公样式部分 -->
    <!-- <pic-common v-if="activeIndex!='1'"/> -->
    <!-- 图片展示特色部分 -->
    <pic-only />
    <!-- 图片上传部分 -->
    <transition>
      <up-pic v-if="upPicFlag" @closeUpImg="closeUpImg" />
    </transition>
  </div>
</template>
<script>
// import picNav from './picComponents/picNavInfor'
// import picCommon from './picComponents/picCommonInfor'
import picOnly from './picComponents/onlyPicInfor'
import upPic from './picComponents/upImg'
export default {
  components: {
    // picNav,
    // picCommon,
    picOnly,
    upPic
  },
  data() {
    return {
      upPicFlag: false,
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
    },
    showUpImg() {
      this.upPicFlag = true
    },
    closeUpImg() {
      this.upPicFlag = false
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
.upPictureContent{
  height: 50px;
  /* line-height: 50px; */
  color: #666666;
  font-size: 14px;
}
.upImg{
    width: 82px;
    height: 30px;
    line-height: 30px;
    background-color: #c8000a;
    border-radius: 4px;
    border: solid 1px #c8000a;
    color: #ffffff;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    margin-left: 10px;
}
</style>
