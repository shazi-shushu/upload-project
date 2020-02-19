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
// import { getHotelSupplyServerList } from '@/api/management/hotelManagement/hotelManagement'
import { getHotelSupplyServerList } from '@/api/management/hotelManagement/axiosHotelManagement'
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
      titleName: '供应服务',
      param: {
        checkInDate: '', // 入住日期：yyyy-MM-dd
        hotelId: '', // 酒店id
        ratePlanId: '', // 价格计划ID
        status: '',
        queryType: '',
        startTime: '',
        endTime: '',
        pageNo: '1',
        pageSize: '10',
        platform: '1',
        channel: ''
      },
      paramNew: {
        hotelName: '', // 酒店名称
        hotelId: '', // 酒店id
        roomTypeId: '', // 服务Id
        roomTypeName: '', // 服务名称
        status: '', // 服务状态(0:正常,1:删除,-1:下架)
        cancelRestrictions: '', // 取消条款type：表示取消条款的类型，type=0 表示商家未设置取消条款；type=1 表示不可取消；type=2 表示入住前 day 天 time 点前可以取消
        payMethod: '', // 支付方式，现只有预付 1：面付 2：预付
        currentPage: '1',
        limit: '10'
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
    // this.getList(this.paramNew)
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
      const loadingInstance = Loading.service({ fullscreen: true, text: '加载中请稍后...', background: 'rgba(0, 0, 0, 0.8)' })
      getHotelSupplyServerList(params).then((res) => {
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
