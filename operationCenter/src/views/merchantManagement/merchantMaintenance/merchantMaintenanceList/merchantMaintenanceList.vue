<template>
  <div class="waperContent">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <!-- 搜素区域 -->
    <select-item @search_btn="search_btn" />
    <!-- 订单列表 -->
    <list-item :list="hodelOrderList" @saveAdvChanne="saveAdvChanne" @changeListNew="changeListNew" />
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
import { getmerchantPages } from '@/api/merchant/merchant'
import titleName from '@/components/titleName/titleName'
import selectItem from './components/select'
import listItem from './components/list'
export default {
  name: 'MerchantMaintenanceList',
  components: {
    selectItem,
    listItem,
    titleName
  },
  data() {
    return {
      titleName: '商户维护',
      param: {
        merchantCode: '', // 编码
        merchantName: '', // 名称
        pageSize: '10', //
        deleteFlag: '', // 0启用1停用
        pageNum: '1'
      },
      hodelOrderList: [],
      pageNum: 1,
      pageSize: 10,
      totalPages: 20
    }
  },
  computed: {},
  created() {

  },
  mounted() {
    this.getList(this.param)
  },
  methods: {
    saveAdvChanne() {
    //   this.getList(this.param)
    },
    changeListNew() {
      this.getList(this.param)
    },
    search_btn(val) {
      // console.log(val)
      this.param = { ...val }
      this.getList(this.param)
    },
    changeList(val) {
      // console.log(this.hodelOrderList)
      // console.log(val)
      this.param.pageNum = val
      this.getList(this.param)
    },
    handleSizeChange(val) {
      this.param.pageSize = val
      this.getList(this.param)
    },
    getList(params) {
      getmerchantPages(params).then((res) => {
        // console.log('getAdvPoint')
        // console.log(res)
        if (res.data.code !== 500) {
          this.hodelOrderList = res.data.data.list
          this.pageNum = res.data.data.pageNum
          this.pageSize = res.data.data.pageSize
          this.totalPages = res.data.data.total
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
