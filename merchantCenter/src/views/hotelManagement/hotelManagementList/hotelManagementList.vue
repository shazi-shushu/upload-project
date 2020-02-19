<template>
  <div class="waperContent">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <!-- 搜素区域 -->
    <select-item @search_btn="search_btn" />
    <!-- 订单列表 -->
    <list-item :list="hodelOrderList" />
    <!-- 分页区域 -->
    <div class="page_msg">
      <el-pagination
        :total="totalPages"
        :current-page="pageNum"

        layout="prev, pager, next,  jumper, total, sizes "
        @current-change="changeList"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
// import { getHotelManagementList } from '@/api/management/hotelManagement/hotelManagement'
import { getHotelManagementList } from '@/api/management/hotelManagement/axiosHotelManagement'
import titleName from '@/components/titleName/titleName'
import selectItem from './components/select'
import listItem from './components/list'
import { Loading } from 'element-ui'
// import { getToken, getLoginMsg } from '@/utils/auth'
export default {
  name: 'HotelList',
  components: {
    selectItem,
    listItem,
    titleName
  },
  data() {
    return {
      titleName: '酒店管理',
      param: {
        distinctCode: '', // 行政区查询代码
        keyword: '', // 关键字查询（选填）：酒店名称，酒店地址
        latitude: '', // 纬度
        longitude: '', // 经度
        maxPrice: '', // 价格范围：最高价格
        minPrice: '', // 价格范围：最低价格
        checkInDate: '2019-04-11',
        checkOutDate: '2019-04-12',
        page: '1',
        // pageSize: '10',
        cityCode: '110100', // 城市编码
        order: '', // 排序字段名
        plateCode: '', // 连锁品牌代码
        rows: '10', // 行数
        sort: 'asc', // 排序：asc、desc
        // starCode: '',//酒店星级
        tarCity: '', // 目标城市
        business: ''// 商圈
      },
      paramNew: {
        hotelId: '', // 酒店id
        hotelChnName: '', // 酒店名称
        type: '', // 酒店类型
        parentHotelGroupName: '', // 酒店集团
        cityName: '', // 酒店城市
        plateName: '', // 酒店品牌
        pageNo: '1',
        // pageSize: '10',
        status: '', // 酒店状态
        hotelStar: '', // 酒店星级
        // plateCode: '',//连锁品牌代码
        pageSize: '10'
      },
      hodelOrderList: [],
      pageNum: 1,
      pageSize: 10,
      totalPages: 20,
      startTime: '',
      endTime: '',
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.endTime !== '') {
            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > this.endTime
          } else {
            return time.getTime() < Date.now() - 8.64e7
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.startTime !== '') {
            return time.getTime() < this.startTime
          } else {
            return time.getTime() < Date.now() - 8.64e7
          }
        }
      }
    }
  },
  computed: {},
  created() {

  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // console.log('Element')
      // console.log(this)
      // console.log(this.$route.query)
      if (this.$route.query.hotelId) {
        this.paramNew.hotelId = this.$route.query.hotelId
      } else {
        this.paramNew.hotelId = ''
      }
      this.getList(this.paramNew)
    },
    search_btn(val) {
      console.log(val)
      this.paramNew = { ...val }
      this.getList(this.paramNew)
    },
    changeStartTime() {
      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        disabledDate: (time) => {
          return time.getTime() > this.endTime
        }
      })
    },
    changeEndTime() {
      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: (time) => {
          return time.getTime() < this.startTime
        }
      })
    },
    changeList(val) {
      this.paramNew.pageNo = val
      this.getList(this.paramNew)
    },
    handleSizeChange(val) {
      this.paramNew.pageSize = val
      this.getList(this.paramNew)
    },
    getList(params) {
      const loadingInstance = Loading.service({ fullscreen: true, text: '加载中请稍后...', background: 'rgba(0, 0, 0, 0.8)' })
      getHotelManagementList(params).then((res) => {
        console.log(res.data.data.pages)
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close()
        })
        this.hodelOrderList = res.data.data.items
        this.pageNum = res.data.data.currentPage
        this.pageSize = res.data.data.pageSize
        this.totalPages = res.data.data.totalNum
      })
        .catch(err => {
          loadingInstance.close()
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
