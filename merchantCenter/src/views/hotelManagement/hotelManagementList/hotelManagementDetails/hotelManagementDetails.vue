<template>
  <div class="waperContent">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <!-- nav导航部分 -->
    <nav-infor :nav="navList" :active-index="activeIndexs" @selNav="selNav" />
    <!-- 基本信息部分 -->
    <basic-infor v-if="activeIndexs==0" :bas-m-sg="detailsMsg" />
    <!-- 服务设施部分 -->
    <server-infor v-if="activeIndexs==1" :facility-list="facilityList" />
    <!-- 详细信息部分 -->
    <detailed-infor v-if="activeIndexs==2" :bas-m-sg="detailsMsg" />
    <!-- 图片信息部分 -->
    <picture-infor v-if="activeIndexs==3" :bas-m-sg="detailsMsg" />
    <!-- 位置信息部分 -->
    <address-infor v-if="activeIndexs==4" :map-src="mapSrc" />
    <!-- 关闭按钮 -->
    <close-btn />
  </div>
</template>

<script>
// import { getHotelInfoDetail } from '@/api/management/hotelManagement/hotelManagement'
import { getHotelInfoDetail, getHotelFacilityList } from '@/api/management/hotelManagement/axiosHotelManagement'
import titleName from '@/components/titleName/titleName'
import closeBtn from '@/components/closeBtn/closeBtnBottom'
import navInfor from './components/navInfor'
import basicInfor from './components/basicInfor'
import serverInfor from './components/serverInfor'
import detailedInfor from './components/detailedInfor'
import pictureInfor from './components/pictureInfor'
import addressInfor from './components/addressInfor'
// import { Loading } from 'element-ui';
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
      titleName: '查看酒店详情 — 北京速八酒店',
      activeIndexs: '0',
      mapSrc: 'http://api.map.baidu.com/marker?location=39.90954,116.524784&title=我的位置&content=优品三悦科技发展有限公司&output=html&src=yourComponyName|yourAppName',
      navList: [
        {
          name: '基本信息',
          id: '0'
        },
        {
          name: '服务设施',
          id: '1'
        },
        {
          name: '详细信息',
          id: '2'
        },
        {
          name: '图片信息',
          id: '3'
        },
        {
          name: '位置信息',
          id: '4'
        }
      ],
      detailsMsg: {},
      acilityList: [],
      params: {
        hotelId: ''
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // console.log(this.$route)
      if (this.$route.query.activeIndex) {
        this.activeIndexs = this.$route.query.activeIndex
      }
      if (this.$route.query.hotelId) {
        this.params.hotelId = this.$route.query.hotelId
        this.getDetails(this.params)
        // 获取服务设施
        this.getFacilityList(this.params)
        // 图片导航
        // this.getHotelImgsNav(this.params)
      } else {
        this.getDetails(this.params)
      }
    },
    selNav(val) {
      // console.log(val)
      this.activeIndexs = val
    },
    getDetails(params) {
      getHotelInfoDetail(params).then((res) => {
        // console.log(res.data.data)
        this.detailsMsg = res.data.data
        this.titleName = '查看酒店详情 —' + this.detailsMsg.hotelChnName
        this.mapSrc = 'http://api.map.baidu.com/marker?location=' + this.detailsMsg.latitude + ',' + this.detailsMsg.longitude + '&title=我的位置&content=' + this.detailsMsg.hotelChnName + '&output=html&src=yourComponyName|yourAppName'
      })
    },
    getFacilityList(params) {
      getHotelFacilityList(params).then((res) => {
        // console.log('getHotelFacilityList')
        // console.log(res.data.data)
        this.facilityList = res.data.data
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
