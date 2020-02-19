<template>
  <div>
      <!-- 搜素区域 -->
    <div>
        <!-- 开始时间 -->
      <div class="block">
        <span class="demonstration">开始时间</span>
        <el-date-picker
          v-model="startTime"
          type="date"
          placeholder="选择开始日期"
          :picker-options="pickerOptionsStart"
        >
        </el-date-picker>
      </div>
      <!-- 结束时间 -->
      <div class="block">
        <span class="demonstration">结束时间</span>
        <el-date-picker
          v-model="endTime"
          type="date"
          placeholder="选择结束日期"
          :picker-options="pickerOptionsEnd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 订单列表 -->
    <div>
      <el-table
        :data="hodelOrderList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="checkInDate"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="hotelChnName"
          label="酒店名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号"
        >
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区域 -->
    <div>
      <el-pagination
        :total="totalPages"
        background
        layout="prev, pager, next"
        @current-change="changeList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api/orderList/hotel'
export default {
  data() {
    return {
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
        platform: '1'
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
  mounted() {
    this.getList()
  },
  methods: {
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
      console.log(val)
      this.param.pageNo = val
      this.getList()
    },
    getList() {
      getOrderList(this.param).then((res) => {
        this.hodelOrderList = res.data.data.pages
        this.pageNum = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.totalPages = res.data.data.size
      })
    }
  }
}
</script>
