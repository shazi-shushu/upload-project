<template>
  <div>
    <iframe style="width:100%;height:450px;margin-bottom:4px;" :src="mapSrc" frameborder="0" />
  </div>
</template>
<script>
export default {
  props: ['mapSrc']
}
</script>
