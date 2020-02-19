<template>
  <div class="title_name">
    {{ item }}
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: String,
      default: ''
    }
  }
}
</script>
<style >
    .title_name{
        height: 40px;
        line-height: 40px;
        background-color: #eeeeee;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        color: #333333;
        font-size: 16px;
        padding-left: 20px;
    }
</style>
