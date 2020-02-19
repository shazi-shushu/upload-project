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
import { getHotelHousingList } from '@/api/management/hotelManagement/hotelManagement'
import titleName from '@/components/titleName/titleName'
import selectItem from './components/select'
import listItem from './components/list'
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
        checkInDate: '2019-04-16', // 入住日期：yyyy-MM-dd
        checkOutDate: '2019-04-17', // 离店日期：yyyy-MM-dd
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
    this.getList(this.param)
  },
  methods: {
    search_btn(val) {
      console.log(val)
      this.param = { ...val }
    //   this.getList(this.param)
    },
    changeStartTime() {
    //   var that = this
      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        disabledDate: (time) => {
          return time.getTime() > this.endTime
        }
      })
    },
    changeEndTime() {
    //   var that = this
      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: (time) => {
          return time.getTime() < this.startTime
        }
      })
    },
    changeList(val) {
      // console.log(this.hodelOrderList)
      // console.log(val)
      this.param.page = val
      this.getList(this.param)
    },
    handleSizeChange(val) {
      this.param.rows = val
      this.getList(this.param)
    },
    getList(params) {
      var that = this
      console.log(11132431111)
      getHotelHousingList(params).then((res) => {
        console.log(res)
        if (res.data.code !== 500) {
          this.$nextTick(function() {
            that.hodelOrderList = res.data.data.pages
            that.pageNum = res.data.data.pageNum
            that.pageSize = res.data.data.pageSize
            that.totalPages = res.data.data.size
          })
        }
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
