<template>
  <div class="wrapper">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <inquire @search_btn="search_btn" />
    <!-- 列表 -->
    <list :list="list" @stop="stop" />
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
import { getAccount } from '@/api/accountManage/rolePermission'
import { stop } from '@/api/accountManage/rolePermission'
// import { getToken } from '@/utils/auth'
// import axios from 'axios'
export default {
  name: 'Accountmaintence',
  components: {
    titleName,
    inquire,
    list
  },
  data() {
    return {
      titleName: '角色权限',
      list: [],
      totaldata: {},
      // 分页
      pageNum: 1,
      pageSize: 10,
      totalPages: 20,
      param: {
        roleName: '',
        pageNum: '1',
        pageSize: '10',
        platform: 1
      }
    }
  },
  mounted() {
    this.getList(this.param)
  },
  methods: {
    // 查询
    search_btn(val) {
      console.log(val)
      this.param.roleName = val.roleName
      this.getList(this.param)
    },
    // 获取
    getList(param) {
      getAccount(param).then((res) => {
        console.log(res)
        this.totaldata = res.data.data
        console.log(this.totaldata)
        this.list = this.totaldata.list
        this.totalPages = this.totaldata.total
        this.pageNum = this.totaldata.pageNum
        this.pageSize = this.totaldata.pageSize
        // console.log(this.totalPages)
      }).catch((err) => {
        console.log('err:', err)
      })
    },
    changeList(val) {
      console.log(val)
      this.param.pageNum = val
      this.getList(this.param)
    },
    handleSizeChange(val) {
      this.param.pageSize = val
      this.getList(this.param)
    },
    // 禁用
    stop(val) {
      console.log(val)
      stop(val).then((res) => {
        const msg = res.data.message
        if (res.data.code === 200) {
          this.$message({
            message: msg,
            type: 'success'
          })
          this.getList(this.param)
        } else {
          this.$message({
            message: msg,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log('err:', err)
      })
    }
  }
}

</script>
<style scoped>
    .wrapper {
        padding: 24px 24px 50px 24px;
        background-color: #fbfbfb;
        min-width: 1200px;
        height: 100%
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

