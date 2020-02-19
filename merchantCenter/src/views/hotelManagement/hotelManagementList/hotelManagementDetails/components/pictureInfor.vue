<template>
  <div class="pictureInfor_content">
    <!-- 图片导航部分 -->
    <pic-nav :pic-nav-list="picNavList" :active-index="activeIndex" @selPicNav="selPicNav" />
    <!-- 图片公公样式部分 -->
    <pic-common v-if="imgType!='1'" :img-lists="imgList" />
    <!-- 图片展示特色部分 -->
    <pic-only v-if="imgType=='1'" :img-lists="imgList" />
    <!-- 分页区域 -->
    <div class="page_msg">
      <el-pagination
        :total="totalPages"
        :page-size="pageSize"
        :current-page="pageNo"
        layout="prev, pager, next,  jumper, total, sizes "
        @current-change="changeList"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script>
import { getFindHotelImgs, getFindHotelImgsByType, getRoomTypesImgs } from '@/api/management/hotelManagement/axiosHotelManagement'
import picNav from './picComponents/picNavInfor'
import picCommon from './picComponents/picCommonInfor'
import picOnly from './picComponents/onlyPicInfor'
export default {
  components: {
    picNav,
    picCommon,
    picOnly
  },
  data() {
    return {
      activeIndex: '0',
      imgType: 0,
      pageNo: 1,
      pageSize: 20,
      totalPages: 20,
      picNavList: [
        // {
        //     name: '全部',
        //     id: '0',
        //     num: '100'
        // },
        // {
        //     name: '房型',
        //     id: '1',
        //     num: '30'
        // }
      ],
      paramsNav: {
        hotelId: ''
      },
      params: {
        hotelId: '',
        imageType: 0,
        pageNo: 1,
        pageSize: 20
      },
      imgList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // console.log('this.$route')
      // console.log(this.$route)
      if (this.$route.query.hotelId) {
        this.paramsNav.hotelId = this.$route.query.hotelId
        this.params.hotelId = this.$route.query.hotelId
        // 图片导航
        this.getHotelImgsNav(this.paramsNav)
        this.getHotelImgsByType(this.params)
        // this.getTypesImgs(this.$route.query.hotelId)
      }
    },
    selPicNav(val, imgTypes) {
      this.activeIndex = val
      this.imgType = imgTypes
      // alert(imgTypes)
      this.params.imageType = imgTypes
      this.getHotelImgsByType(this.params)
    },
    getHotelImgsNav(params) {
      getFindHotelImgs(params).then((res) => {
        // console.log('getFindHotelImgs')
        // console.log(res.data.data)
        this.picNavList = res.data.data
      })
    },
    getHotelImgsByType(params) {
      getFindHotelImgsByType(params).then((res) => {
        // console.log('getFindHotelImgsByType')
        // console.log(res.data.data)
        this.imgList = res.data.data.items
        this.pageSize = res.data.data.pageSize
        this.totalPages = res.data.data.totalNum
        this.pageNo = res.data.data.currentPage
      })
    },
    // getRoomTypesImgs
    getTypesImgs(params) {
      getRoomTypesImgs(params).then((res) => {
        console.log('getRoomTypesImgs')
        console.log(res.data.data)
        // this.facilityList = res.data.data
      })
    },
    changeList(val) {
      // console.log(this.hodelOrderList)
      // console.log(val)
      this.params.pageNo = val
      this.getHotelImgsByType(this.params)
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getHotelImgsByType(this.params)
    }
  }
}
</script>
<style scoped>
.pictureInfor_content{
    background-color: #ffffff;
    margin-bottom: 4px;
    padding: 20px;
}
</style>
