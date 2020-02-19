<template>
  <div class="container">
    <div v-show="show==1">
      <picture-label-page @shows="shows" />
    </div>
    <div v-show="show==2">
      <search-label-page @showsear="showsear" />
    </div>
    <div v-show="show==3">
      <shopping-label-page @showshopp="showshopp" />
    </div>
  </div>
</template>

<script>
import pictureLabelPage from './lableMange/pictureLabelPage'
import searchLabelPage from './lableMange/searchLabelPage'
import shoppingLabelPage from './lableMange/shoppingLabelPage'
export default {
  name: 'LabelMangePage',
  components: {
    pictureLabelPage,
    searchLabelPage,
    shoppingLabelPage
  },
  data() {
    return {
      show: ''
    }
  },
  methods: {
    shows(val) {
      this.show = val
      console.log(this.show)
    },
    showsear(val) {
      this.show = val
      console.log(this.show)
    },
    showshopp(val) {
      this.show = val
    }
  }
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  position: absolute;
  background-color: #fbfbfb;
}
</style>
