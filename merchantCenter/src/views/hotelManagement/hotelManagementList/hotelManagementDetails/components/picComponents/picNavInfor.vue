<template>
  <div class="nav_content clearfix">
    <ul>
      <li v-for="(item,index) in picNavList" :key="index" :class="{'selectActive': index==activeIndex}" @click="selPicNav(index,item.imgType)">{{ item.imgType | navFilter }}  （{{ item.count }}）</li>
    </ul>
  </div>
</template>
<script>
import { getFindHotelImgsByType } from '@/api/management/hotelManagement/axiosHotelManagement'
export default {
  filters: {
    navFilter: function(val) {
      //   1-房型 2-外景 3-大堂 4-设施 5-其它 6-宴会厅 7-会议厅 8-门票 9-其它服务
      const obj = { 0: '全部', 1: '房型', 2: '外景', 3: '大堂', 4: '设施', 5: '其它', 6: '宴会厅', 7: '会议厅', 8: '门票', 9: '其它服务' }
      return obj[val]
    }
  },
  props: ['picNavList', 'activeIndex'],
  data() {
    return {
      params: {
        hotelId: '',
        imageType: 0,
        pageNo: 1,
        pageSize: 20
      }
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      if (this.$route.query.hotelId) {
        this.params.hotelId = this.$route.query.hotelId
        // 图片导航
        this.getHotelImgsByType(this.params)
      }
    },
    selPicNav(val, imgTypes) {
      this.$emit('selPicNav', val, imgTypes)
      // this.params.imageType = imgTypes
      // console.log('this.params')
      // console.log(this.params)
      // 图片导航
      // this.getHotelImgsByType(this.params)
    },
    getHotelImgsByType(params) {
      getFindHotelImgsByType(params).then((res) => {
        console.log('getFindHotelImgsByType')
        console.log(res.data.data)
      })
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
