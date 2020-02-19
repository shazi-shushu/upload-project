<template>
  <div>
    <div class="msgWarper">
      <div class="msgCont">{{ msg }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['msg']
}
</script>
<style scoped>
.msgWarper{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1111;
}
.msgCont{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 14px;
}
</style>
