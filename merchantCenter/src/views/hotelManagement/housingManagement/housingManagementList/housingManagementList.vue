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
// import { getHotelHousingList } from '@/api/management/hotelManagement/hotelManagement'
import { getHotelHousingList } from '@/api/management/hotelManagement/axiosHotelManagement'
import titleName from '@/components/titleName/titleName'
import selectItem from './components/select'
import listItem from './components/list'
import { Loading } from 'element-ui'
export default {
  name: 'HotelList',
  components: {
    selectItem,
    listItem,
    titleName
  },
  data() {
    return {
      titleName: '房型管理',
      param: {
        bedType: '', // 床型
        checkInDate: '2019-04-11', // 入住日期：yyyy-MM-dd
        checkOutDate: '2019-04-12', // 离店日期：yyyy-MM-dd
        cityCode: '', // 城市编码
        hasBreakfast: '', // 是否含早餐
        hotelId: '113945', // 酒店编码
        order: '', // 排序字段名
        page: '1',
        pageSize: '10',
        // payType: '1',//支付方式
        ratePlanId: '', // 价格计划ID
        // roomTypeId: '1',//房型
        rows: '10', // 行数
        sort: 'asc'// 排序：asc、desc
      },
      paramNew: {
        hotelName: '', // 酒店名称
        hotelId: '', // 酒店id
        roomTypeId: '', // 房型Id
        roomTypeName: '', // 房型名称
        roomTypeStatus: '', // 房型状态(0:正常,1:删除,-1:下架)
        limit: '10', // 每页显示条数
        currentPage: '1'// 当前页
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
    changeList(val) {
      // console.log(this.hodelOrderList)
      // console.log(val)
      this.paramNew.currentPage = val
      this.getList(this.paramNew)
    },
    handleSizeChange(val) {
      this.paramNew.limit = val
      this.getList(this.paramNew)
    },
    getList(params) {
      var that = this
      // console.log(1111111)
      const loadingInstance = Loading.service({ fullscreen: true, text: '加载中请稍后...', background: 'rgba(0, 0, 0, 0.8)' })
      getHotelHousingList(params).then((res) => {
        console.log(res)
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close()
        })
        this.$nextTick(function() {
          that.hodelOrderList = res.data.data.items
          that.pageNum = res.data.data.currentPage
          that.pageSize = res.data.data.pageSize
          that.totalPages = res.data.data.totalNum
        })
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
