<template>
  <div class="wrapper">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <inquire @search_btn="search_btn" />
    <!-- 列表 -->
    <maintenance :list="list" @delData="delData" @addData="addData" @editData="editData" @initpassword="initpassword" />
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
import maintenance from './components/maintenance'
import { getAccount } from '@/api/accountManage/account'
import { updateAccount } from '@/api/accountManage/account'
import { addAccount } from '@/api/accountManage/account'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { getUserId } from '@/utils/auth'
export default {
  name: 'Accountmaintence',
  components: {
    titleName,
    inquire,
    maintenance
  },
  data() {
    return {
      titleName: '账号维护',
      list: [],
      // 分页
      pageNum: 1,
      pageSize: 10,
      totalPages: 20,
      param: {
        userName: '',
        pageNum: '1',
        pageSize: '10'
      }

    }
  },
  mounted() {
    this.getList(this.param)
  },
  methods: {
    search_btn(val) {
      console.log(val)
      this.param.userName = val.operationName
      this.getList(this.param)
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
    // 添加
    addData(val) {
      console.log(val)
      addAccount(val).then((res) => {
        const msg = res.data.message
        if (res.data.code === 200) {
          this.$message({
            message: '添加成功',
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
        console.log(err)
      })
    },
    // 获取
    getList(param) {
      getAccount(param).then((res) => {
        // console.log(res)
        this.list = res.data.data.list
        this.totalPages = res.data.data.total
        this.pageNum = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        // console.log(this.list)
      }).catch((err) => {
        // console.log('err:', err)
      })
    },
    // 删除
    delData(val) {
      console.log(val)
      var obj = {
        userId: val.userId,
        deleteFlag: val.deleteFlag
      }
      updateAccount(obj).then((res) => {
        console.log('delect res:', res)
        if (res.data.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList(this.param)
        } else {
          this.$message({
            message: '编辑失败',
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log('delect err:', err)
      })
      this.getList(this.param)
    },
    // 编辑
    editData(val) {
      console.log('edit:', val)
      updateAccount(val).then((res) => {
        console.log('editAccount res:', res)
        // console.log('this.list:', this.list)
        if (res.data.code === 200) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.getList(this.param)
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log('err:', err)
      })
      this.getList(this.param)
    },
    // 重置密码
    initpassword(val) {
      console.log('initpassword:', val)
      updateAccount(val).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getList(this.param)
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log('err:', err)
      })

      console.log(this.list)
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

