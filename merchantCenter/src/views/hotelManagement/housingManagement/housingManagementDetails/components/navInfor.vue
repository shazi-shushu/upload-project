<template>
  <div class="navContent">
    <ul class="clearfix">
      <li v-for="(item,index) in nav" :key="index" :class="{'selActive':index == activeIndex}" @click="selNav(index)">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['nav', 'activeIndex'],
  data() {
    return {
      // activeIndexs: this.activeIndex
      // selActive: 'selActive'
    }
  },
  methods: {
    selNav(val) {
      this.$emit('selNav', val)
    }
  }
}
</script>
<style scoped>
.navContent{
    background-color: #ffffff;
}
.navContent ul{
    padding: 0px;
    border-bottom: 1px solid #dfdfdf;
}
.navContent ul li {
    /* background-color: #ffffff; */
    color: #999999;
    float: left;
    height: 46px;
    line-height: 46px;
    padding: 0px 30px;
    font-size: 16px;
    cursor: pointer;
}
.navContent ul li.selActive{
    border-bottom: 2px solid #c8000a;
    color: #c8000a;
}
</style>
