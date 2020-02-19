<template>
  <div class="waperContent">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <!-- <up-imgPic /> -->
    <!-- 内容区 -->
    <add-msg />
  </div>
</template>
<script>
import titleName from '@/components/titleName/titleName'
import addMsg from './components/addMsg'
// import upImgPic from './components/upImgDemo'
export default {
  name: 'AddAdvMaintenance',
  components: {
    titleName,
    addMsg
    // upImgPic
  },
  data() {
    return {
      titleName: '新增广告'
    }
  }
}
</script>
<style scoped>
  .waperContent{
    padding: 24px 24px 50px 24px;
    background-color: #fbfbfb;
    min-width: 1200px;
  }
</style>
