<template>
  <div class="setPriceContent">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <!-- 酒店日期列表 -->
    <price-list @setMorePrice="setMorePrice" @setSinglePrice="setSinglePrice" />
    <!-- 单独设置 -->
    <add-single v-if="addSingleFlag" :select-date="selectDate" @closeSetPrice="closeSetPrice" @saveSinglePrice="saveSinglePrice" />
    <!-- 批量设置 -->
    <add-more v-if="addMoreFlag" @closeSetPrice="closeSetPrice" />
  </div>
</template>
<script>
import titleName from '@/components/titleName/titleName'
import priceList from './components/priceList'
import addSingle from './components/addSinglePrice'
import addMore from './components/addMorePrice'
export default {
  name: 'SetPrice',
  components: {
    titleName,
    priceList,
    addSingle,
    addMore
  },
  data() {
    return {
      titleName: '设置价格 — 酒店名称  房型名称  房型服务名称',
      addSingleFlag: false,
      addMoreFlag: false,
      selectDate: {}
    }
  },
  methods: {
    setMorePrice() {
      this.addSingleFlag = false
      this.addMoreFlag = true
    },
    setSinglePrice(val) {
      this.addSingleFlag = true
      this.addMoreFlag = false
      this.selectDate = val
    },
    closeSetPrice() {
      this.addSingleFlag = false
      this.addMoreFlag = false
    },
    saveSinglePrice() {
      this.addSingleFlag = false
      this.addMoreFlag = false
    }
  }
}
</script>
<style scoped>
.setPriceContent{
    padding: 24px 24px 50px 24px;
    background-color: #fbfbfb;
    min-width: 1200px;
}
</style>
