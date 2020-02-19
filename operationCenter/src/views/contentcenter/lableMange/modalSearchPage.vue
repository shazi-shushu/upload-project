<template>
  <div v-if="show" class="container">
    <div class="modal">
      <slot />
    </div>
    <div v-if="show" class="mark" />
  </div>
</template>

<script>
  export default {
    name: 'ModalPage',
    props: {
      show: false
    },
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  .container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    overflow: hidden;
    width:100%;
    height:100%;
    .modal{
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left:-332px;
      margin-top:-312px;
      width: 664px;
      height:624px;
      z-index: 1003;
      background: #fff;
    }
    .mark{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.5);
    }
  }
</style>
