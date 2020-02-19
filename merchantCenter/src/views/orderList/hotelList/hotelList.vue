<template>
  <div class="waperContent">
    <!-- title名称 -->

    <title-name :item="titleName" />
    <!-- 搜素区域 -->
    <!-- <keep-alive include="hotelListSelect"> -->
    <select-item @search_btn="search_btn" />
    <!-- </keep-alive> -->
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
import { getOrderList } from '@/api/orderList/hotel'
import titleName from '@/components/titleName/titleName'
import selectItem from './components/select'
import listItem from './components/list'
export default {
  name: 'HotelLists',
  components: {
    selectItem,
    listItem,
    titleName
  },
  data() {
    return {
      titleName: '酒店订单',
      param: {
        orderNo: '',
        linkPhone: '',
        isPay: '',
        status: '',
        queryType: '',
        startTime: '',
        endTime: '',
        pageNo: '1',
        pageSize: '10',
        platform: '1',
        channel: '',
        outUserId: ''
      },
      hodelOrderList: [],
      pageNum: 1,
      pageSize: 10,
      totalPages: 20,
      startTime: '',
      endTime: '',
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.endTime !== '') {
            return (
              time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() > this.endTime
            )
          } else {
            return time.getTime() < Date.now() - 8.64e7
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
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
    this.getList(this.param)
    console.log('created')
  },
  activated() {
    // this.getList(this.param);
    console.log('activated')
  },
  mounted() {},

  methods: {
    search_btn(val) {
      // console.log(val)
      this.param = { ...val }
      console.log(this.param)
      this.getList(this.param)
    },
    changeStartTime() {
      //   var that = this
      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        disabledDate: time => {
          return time.getTime() > this.endTime
        }
      })
    },
    changeEndTime() {
      //   var that = this
      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: time => {
          return time.getTime() < this.startTime
        }
      })
    },
    changeList(val) {
      // console.log(this.hodelOrderList)
      // console.log(val)
      this.param.pageNo = val
      this.getList(this.param)
    },
    handleSizeChange(val) {
      this.param.pageSize = val
      this.getList(this.param)
    },
    getList(params) {
      var that = this
      getOrderList(params).then(res => {
        // console.log(this.$store)
        this.$nextTick(function() {
          that.hodelOrderList = res.data.data.pages
          that.pageNum = res.data.data.pageNum
          that.pageSize = res.data.data.pageSize
          that.totalPages = res.data.data.size
        })
      })
    }
  }
}
</script>
<style>
.waperContent {
  padding: 24px 24px 50px 24px;
  background-color: #fbfbfb;
  min-width: 1200px;
}
.page_msg {
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
