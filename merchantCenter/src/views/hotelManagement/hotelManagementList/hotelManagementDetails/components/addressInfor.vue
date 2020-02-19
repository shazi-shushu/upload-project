<template>
  <div>
    <!-- <iframe src="//org.modao.cc/app/74121779726cf9208ac38bb00de5d990/embed" width="2119" height="1325" allowTransparency="true" frameborder="0"></iframe> -->
    <iframe style="width:100%;height:450px;margin-bottom:4px;" :src="mapSrc" frameborder="0" />
  </div>
</template>
<script>
export default {
  props: ['mapSrc']
}
</script>
