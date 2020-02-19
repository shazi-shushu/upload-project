<template>
  <div class="priceInforContent">
    <div class="title_tip">价格信息</div>
    <div class="priceInforItems">
      <ul>
        <li v-for="(elem,index) in item.skuList" :key="index" class="priceInforItem">
          <span style="width: 100%;display: inline-block;" class="color999 fz14">{{ elem.date }}</span>
          <span class="color333 fz14">¥{{ elem.salePrice }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>
.priceInforContent{
    background-color: #ffffff;
    padding: 10px 0px;
    margin-bottom: 4px;
    padding-bottom: 0px;
}
.title_tip{
    color: #333333;
    font-size: 14px;
    padding-left: 36px;
}
.red{
    color: #c8000a;
}
.color333{
    color: #333333;
}
.color666{
    color: #666666;
}
.color999{
    color: #999999;
}
.fz16{
    font-size: 16px;
}
.fz14{
    font-size: 14px;
}
.fz12{
    font-size: 12px;
}
.priceInforItems{
    padding-left: 60px;
    overflow: hidden;
}
.priceInforItems ul li{
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    list-style: none;
}
.priceInforItem{
    width: 120px;
    /* height: 61px; */
    padding: 10px;
    text-align: center;
	/* background-color: #ffffff; */
	border-radius: 10px;
	border: solid 1px #dcdcdc;
}
</style>
