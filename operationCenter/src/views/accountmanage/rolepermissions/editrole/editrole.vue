<template>
  <div class="wrapper">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <div class="wrapper_bottom">
      <inquire />
    <!-- 列表 -->
    <!-- <maintenance /> -->
    </div>
  </div>
</template>
<script>
import titleName from '@/components/titleName/titleName'
import inquire from './components/inquire'
export default {
  name: '',
  components: {
    titleName,
    inquire
  },
  data() {
    return {
      titleName: '添加角色'
    }
  },
  methods: {

  }
}

</script>
<style scoped>
    .wrapper {
        padding: 24px 24px 30px 24px;
        background-color: #fbfbfb;
        min-width: 1200px;
        overflow: hidden;
    }
    .wrapper_bottom{
        width: 100%;
        padding: 30px 34px;
        box-sizing: border-box;
        overflow: hidden;
        background: #ffffff
    }
</style>

