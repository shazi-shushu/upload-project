<template>
  <div class="components_container">
    <!-- <code> -->
    <!-- {{ $t('components.tinymceTips') }} -->
    <!-- <a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/component/rich-editor.html"> {{ $t('components.documentation') }}</a> -->
    <!-- </code> -->
    <div class="components_container_name">详情介绍</div>
    <div class="components_container_cont">
      <tinymce v-model="content" :height="300" />
    </div>
    <!-- eslint-disable-next-line -->
    <!-- <div class="editor-content" v-html="content" /> -->
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: ``
    }
  },
}
</script>

<style scoped>
.components_container{
    display: flex;
    width: 100%;
    padding: 20px 0px;
    background-color: #ffffff;
    margin-bottom: 4px;
}
.components_container_name{
    width: 100px;
    text-align: right;
    margin-right: 10px;
    color: #666666;
    font-size: 14px;
}
.components_container_cont{
    width: 80%;
}
.editor-content{
  margin-top: 20px;
}
</style>

