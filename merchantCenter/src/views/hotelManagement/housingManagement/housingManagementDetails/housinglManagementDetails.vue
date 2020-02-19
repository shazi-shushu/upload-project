<template>
  <div class="waperContent">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <!-- nav导航部分 -->
    <nav-infor :nav="navList" :active-index="activeIndexs" @selNav="selNav" />
    <!-- 基本信息部分 -->
    <basic-infor v-if="activeIndexs==0" :basic-msg="basicMsg" />
    <!-- 服务设施部分 -->
    <server-infor v-if="activeIndexs==1" />
    <!-- 详细信息部分 -->
    <!-- <detailed-infor v-if="activeIndexs==2"/> -->
    <!-- 图片信息部分 -->
    <picture-infor v-if="activeIndexs==2" />
    <!-- 位置信息部分 -->
    <!-- <address-infor :mapSrc="mapSrc" v-if="activeIndexs==4"/> -->
    <!-- 关闭按钮 -->
    <close-btn />
  </div>
</template>

<script>
import { getRoomTypeFacility } from '@/api/management/hotelManagement/axiosHotelManagement'
import titleName from '@/components/titleName/titleName'
import closeBtn from '@/components/closeBtn/closeBtnBottom'
import navInfor from './components/navInfor'
import basicInfor from './components/basicInfor'
import serverInfor from './components/serverInfor'
import detailedInfor from './components/detailedInfor'
import pictureInfor from './components/pictureInfor'
import addressInfor from './components/addressInfor'
export default {
  name: 'HotelManagementDetails',
  components: {
    titleName,
    navInfor,
    basicInfor,
    serverInfor,
    detailedInfor,
    pictureInfor,
    addressInfor,
    closeBtn
  },
  data() {
    return {
      titleName: '查看房型详情 — 酒店名称  房型名称',
      activeIndexs: '0',
      // lats: '40.047669',
      // lngs: '116.313082',
      mapSrc: 'http://api.map.baidu.com/marker?location=39.90954,116.524784&title=我的位置&content=优品三悦科技发展有限公司&output=html&src=yourComponyName|yourAppName',
      navList: [
        {
          name: '基本信息',
          id: '0'
        },
        {
          name: '房型设施',
          id: '1'
        },
        {
          name: '图片信息',
          id: '2'
        }
      ],
      basicMsg: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.$route)
      if (this.$route.query.singleMsg) {
        // this.activeIndexs = this.$route.query.activeIndex
        this.basicMsg = JSON.parse(this.$route.query.singleMsg)
        this.titleName = '查看房型详情 —' + this.basicMsg.hotelChnName + ' ' + this.basicMsg.roomTypeName
        this.getFacility(this.basicMsg.roomTypeId)
        console.log(this.basicMsg)
      }
    },
    selNav(val) {
      console.log(val)
      this.activeIndexs = val
    },
    getFacility(param) {
      getRoomTypeFacility(param).then((res) => {
        console.log('getRoomTypeFacility')
        console.log(res)
      })
    }
  }
}
</script>
<style >
  .waperContent{
    padding: 24px 24px 50px 24px;
    background-color: #fbfbfb;
    min-width: 1200px;
  }
  .page_msg{
    text-align: right;
    padding: 20px 0px 40px 0px;
    background-color: #ffffff;
    color: #666666;
  }
    .el-pager li {
    color: #666666;
    cursor: default;
 }
  .el-pager li.active {
    color: #ffffff;
    cursor: default;
    background-color: #c8000a;
    border-radius: 2px;
}

</style>
