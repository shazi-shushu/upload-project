<template>
  <div class="recom">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <!-- 查询 -->
    <!-- <Up /> -->
    <!-- 列表 -->
    <List />
  </div>
</template>

<script>
import titleName from '@/components/titleName/titleName'
// import Up from './component/Up'
import List from './component/List'

export default {
  name: 'ProductRecommendPage',
  components: {
    titleName,
    // Up,
    List
  },
  data() {
    return {
      titleName: '产品推荐'

    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.recom {
  padding: 24px 24px 50px 24px;
  background-color: #fbfbfb;
  min-width: 1200px;
  height: 100%;
}

</style>
