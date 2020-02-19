<template>
  <div class="wrapper">
    <!-- 操作日志title名称 -->
    <title-name :item="titleName" />
    <inquire @search_btn="search_btn" />
    <!-- 操作日志列表 -->
    <list :listarr="list" />
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
import titleName from '@/components/titleName/titleName'
import inquire from './components/inquire'
import list from './components/list'
import { getData } from '@/api/operationLog/operationLog'
export default {
  name: 'Accountmaintence',
  components: {
    titleName,
    inquire,
    list
  },
  data() {
    return {
      titleName: '操作日志',
      list: [],
      // 分页
      pageNum: 1,
      pageSize: 10,
      totalPages: 20,
      param: {
      // shurukuang
        authName: '',
        createName: '',
        pageNum: '1',
        pageSize: '10',
        endTime: '',
        createTime: ''
      }
    }
  },
  mounted() {
    this.getList(this.param)
  },
  methods: {
    // 分页
    changeList(val) {
      console.log(val)
      this.param.pageNum = val
      this.getList(this.param)
    },
    handleSizeChange(val) {
      this.param.pageSize = val
      this.getList(this.param)
    },
    // 获取
    getList(param) {
      getData(param).then((res) => {
        console.log(res)
        this.list = res.data.data.list
        this.totalPages = res.data.data.total
        this.pageNum = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        // console.log(this.list)
        //  const h = this.$createElement
        //   this.$message({
        //     message: h('p', null, [
        //       h('i', { style: 'color: teal' }, res.data.message)
        //     ])
        //   })
      }).catch((err) => {
        console.log('err:', err)
      })
    },
    search_btn(val) {
      console.log(val)
      this.param.authId = val.authId
      this.param.authName = val.authName
      this.param.createName = val.createName
      this.param.pageNum = val.pageNum
      this.param.pageSize = val.pageSize
      this.param.createTime = val.createTime
      this.param.endTime = val.endTime
      this.getList(this.param)
    }
  }
}

</script>
<style scoped>
    .wrapper {
        padding: 24px 24px 30px 24px;
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

