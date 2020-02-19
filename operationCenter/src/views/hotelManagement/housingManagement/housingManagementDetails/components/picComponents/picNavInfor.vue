<template>
  <div class="nav_content clearfix">
    <ul>
      <li v-for="(item,index) in picNavList" :key="index" :class="{'selectActive': index==activeIndex}" @click="selPicNav(index)">{{ item.name }}  （{{ item.num }}）</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['picNavList', 'activeIndex'],
  // props: {
  //     picNavList: {
  //         type: Array,
  //         default () {
  //             return []
  //         }
  //     },
  //     activeIndex: {
  //         type: number,
  //         default: 0
  //     }
  // },
  methods: {
    selPicNav(val) {
      this.$emit('selPicNav', val)
    }
  }
}
</script>
<style scoped>
.nav_content{

}
.nav_content ul li {
    border-radius: 4px;
    border: solid 1px #e5e5e5;
    float: left;
    height: 32px;
    line-height: 32px;
    padding: 0px 10px;
    cursor: pointer;
    margin-right: 20px;
    color: #999999;
    font-size: 14px;
}
.nav_content ul li.selectActive{
    color: #c8000a;
    font-size: 14px;
    border-radius: 4px;
	border: solid 1px #c80038;
}
</style>
