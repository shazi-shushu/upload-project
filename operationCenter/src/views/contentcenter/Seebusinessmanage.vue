<template>
  <div class="see">
    <!--头部区域-->
    <title-name :item="titleName" />
    <div class="content">
      <h3>
        <span />公告标题
      </h3>
      <p>{{arr.ncTitle}}</p>
      <h3>
        <span />公告时间
      </h3>
      <p>{{arr.ncTime}}</p>
      <h3>
        <span />公告内容
      </h3>
      <p v-html="arr.ncContent"></p>
      <div class="last">
          <p>阅读次数:<span>{{arr.readCount}}</span></p>
          <p>发布人:<span>{{arr.pushName}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
import { noticeConfig } from '@/api/business/business'
import titleName from '@/components/titleName/titleName'
export default {
  name: 'Seebusinessmanage',
  components: {
    titleName
  },
  data() {
    return {
      titleName: '公告查看',
      //data2:{},
      id: '',
      arr:'',
    }
  },
  mounted() {
    // var _this = this;
    // bus.$on('shuju',(arr)=>{
    //   this.data2 = arr;
    //   console.log(this.data2)
    // })
    this.id=this.$route.params.ncId;
    console.log(this.id)
    var ncId = this.id;
    noticeConfig(ncId).then(res => {
       //console.log(res.data.data);
       this.arr = res.data.data;
       console.log(this.arr);
      })

  },
  methods: {
    
  },
}
</script>
<style scoped>
.see {
  padding: 24px 24px 50px 24px;
  background-color: #fbfbfb;
  min-width: 1200px;
  height: 100%;
}
.content {
  background: #fff;
   padding: 24px 0 0 24px;
   min-height: 500px;
}
.content h3{font-size: 14px; color: #333; display: flex; flex-direction: row; align-items: center;}
.content h3:nth-of-type(1){margin-top: 0;}
.content h3 span{width: 3px; height: 14px; background: #d80d16; display: block; margin: 0 4px 0 0; border-radius: 2px;}
.content p{font-size: 14px; color: #666; margin: 0 0 0 43px; width: 770px; line-height: 26px;}
.last{display: flex; flex-direction: row; width: 770px; margin-left: 43px; padding: 30px 0 0 350px;}
.last p{width: 110px; margin: 0 0 0 20px;}
</style>
