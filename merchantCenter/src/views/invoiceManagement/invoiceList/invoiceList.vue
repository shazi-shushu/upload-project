<template>
  <div class="waperContent">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <!-- 搜素区域 -->
    <select-item @search_btn="search_btn" />
    <!-- 订单列表 -->
    <list-item :list="hodelOrderList" @editAdvType="editAdvType" @shuaXinList="shuaXinList" />
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
import { getQqueryinvoiceList } from '@/api/invoice/invoice'
import titleName from '@/components/titleName/titleName'
import selectItem from './components/select'
import listItem from './components/list'
export default {
  name: 'InvoiceList',
  components: {
    selectItem,
    listItem,
    titleName
  },
  data() {
    return {
      titleName: '发票管理',
      param: {
        productType: '',
        merchantId: this.$store.state.user.userId,
        pageNo: '1',
        pageSize: '10',
        status: ''
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
      this.getList(this.param)
    },
    editAdvType() {
      this.getList(this.param)
    },
    shuaXinList() {
      console.log(123242)
      this.getList(this.param)
    },
    changeList(val) {
    //   console.log(this.hodelOrderList)
    //   console.log(val)
      this.param.pageNo = val
      this.getList(this.param)
    },
    handleSizeChange(val) {
      this.param.pageSize = val
      this.getList(this.param)
    },
    getList(params) {
      // var that = this
      getQqueryinvoiceList(params).then((res) => {
        if (res.data.code !== 500) {
          this.$nextTick(function() {
            this.hodelOrderList = res.data.data.pages
            this.pageNum = res.data.data.pageNum
            this.pageSize = res.data.data.pageSize
            this.totalPages = res.data.data.size
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
