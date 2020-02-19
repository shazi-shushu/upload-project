<template>
  <div>
    <div class="content_tips">
      <!-- <span class="fz16 color333 content_tips_msg">查询结果</span> -->
      <span class="fz16 color333 addRoomTypeServer"><router-link :to="{path:'/advManagement/addAdvMaintenance'}">新增广告</router-link></span>
    </div>
    <div class="list_content">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>广告频道名称</th>
            <th>广告位名称</th>
            <th>广告标题</th>
            <th>排序值</th>
            <th>URL</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ item.channelName }}</td>
            <td>{{ item.pointName }}</td>
            <td>{{ item.advertTitle }}</td>
            <td>{{ item.sort }}</td>
            <td>{{ item.returnUrl }}</td>
            <td>{{ item.startTime | getGangDateMiaoShiType }}</td>
            <td>{{ item.endTime | getGangDateMiaoShiType }}</td>
            <td>{{ item.deleteFlag | flagFilter }}</td>
            <td class="caoZuoBtn">
              <span @click="editAdvType(item)">{{ item.deleteFlag | flagFilters }}</span>
              <!-- <span>编辑</span> -->
              <span><router-link :to="{path:'/advManagement/editAdvMaintenance',query:{'advertId':item.advertId,'channelId':item.channelId}}">编辑</router-link></span>
              <!-- <span>设置价格</span> -->
              <!-- <span>下架</span> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
/* Layout */
import Layout from '@/views/layout/Layout'
import { getToken } from '@/utils/auth'
import { getGangDateMiaoShi } from '@/utils/validate'
import { updateDeleteFlagSingle } from '@/api/adv/adv'
export default {
  filters: {
    getGangDateMiaoShiType: getGangDateMiaoShi,
    flagFilter: function(val) {
      return val === 0 ? '启用' : '停用'
    },
    flagFilters: function(val) {
      return val === 1 ? '启用' : '停用'
    },
    hasRefuns: function(val) {
      // console.log(val)
      return val === 'true' ? '有' : '-'
    },
    isInvoices: function(val) {
      // console.log(val)
      return val === 'true' ? '需要' : '不需要'
    },
    platforms: function(val) {
      const platformList = { 1: '融e购', 2: '融e联' }
      return platformList[val]
    },
    channels: function(val) {
      // 业务板块:1=旅游频道 2=E差旅
      const channelList = { 1: '旅游频道', 2: 'E差旅' }
      return channelList[val]
    },
    statusType: function(val) {
      // 订单状态：订单状态：0-待付款;1-付款成功;2-预定成功;3-已完成;4-已关闭;5-已取消;9-退款中;10-已退款;11-退款失败;12-预定失败
      const statusTypeObj = { 0: '待付款', 1: '付款成功', 2: '预定成功', 3: '已完成', 4: '已关闭', 5: '已取消', 9: '退款中', 10: '已退款', 11: '退款失败', 12: '预定失败' }
      return statusTypeObj[val]
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goDetails(val) {
      var orderNo = val.substring(val.length - 4)
      // console.log()
      let flagOrder = false
      flagOrder = this.isAddRouter(val)
      if (flagOrder) {
        this.$router.options.routes.push({
          path: '/orderDetails' + val,
          component: Layout,
          hidden: true,
          redirect: '/orderDetails' + val,
          children: [
            {
              path: '/orderDetails' + val,
              component: () => import('@/views/orderList/orderDetails/orderDetails'),
              name: 'orderDetails' + val,
              meta: { title: '酒店订单详情(' + orderNo + ')', noCache: true }
            }
          ]
        })
        this.$router.addRoutes(this.$router.options.routes)// 调用add
      }
      this.$router.push({ path: '/orderDetails' + val, query: { orderNo: val }})
      //  console.log(this.$router)
    },
    isAddRouter(val) {
      let flag = true
      this.$router.options.routes.forEach(function(item) {
        // console.log(item.path.includes(val))
        if (item.path.includes(val)) {
          flag = false
          return false
        }
      })
      return flag
    },
    editAdvType(val) {
      // console.log(val)
      const type = val.deleteFlag === 0 ? 1 : 0
      const obj = {
        advertId: val.advertId,
        deleteFlag: type,
        redisKey: getToken()
      }
      updateDeleteFlagSingle(obj).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.message,
            type: 'success',
            duration: 1 * 1000
          })
          this.$emit('editAdvType')
        } else {
          this.$message({
            message: res.data.message,
            type: 'error',
            duration: 1 * 1000
          })
        }
      })
    }
  }
}
</script>
<style scoped>
    .content_tips{
        height: 60px;
        line-height: 60px;
        background-color: #ffffff;
        padding-left: 20px;
        margin-top: 4px;
        position: relative;
    }
    .content_tips_msg{
        border-left: 2px solid #c8000a;
        padding-left: 4px;
        height: 14px;
        /* display: inline-block; */
    }
    .addRoomTypeServer{
        position: absolute;
        bottom: 4px;
        right: 20px;
        color: #ffffff;
        background-color: #c8000a;
        height: 34px;
        line-height: 34px;
        padding: 0px 14px;
        border-radius: 4px;
    }
    .fl{
        float: left;
    }
    .caoZuoBtn span{
        display: inline-block;
        /* border-radius: 10px; */
        /* border: solid 1px #c8000a; */
        height: 28px;
        line-height: 28px;
        padding: 0px 10px;
        cursor: pointer;
        color: #c8000a;
        font-size: 14px;
        margin-right: 10px;
    }
    .list_content{
        overflow-x:scroll;
        width: 100%;
        padding: 0px 20px;
        background-color: #ffffff;
    }
    table{border-collapse: collapse;}
    table td,th{
        border: 1px solid #dfdfdf;
        white-space: nowrap;
        }
   .list_content table {
      color: #666666;
      font-size: 14px;
      width: 100%;
       /* min-width:1200px; */
   }
   .list_content table tr .orderNo{
       color: #d80d16;
       text-decoration: underline;
       cursor: pointer;
   }
   .list_content table thead{
      height: 40px;
      line-height: 40px;
      background-color: #f6f6f6;
   }
   .list_content table thead tr th{
      border: solid 1px #dfdfdf;
      padding: 0px 10px;
   }
   .list_content table tbody{
      height: 39px;
      line-height: 39px;
      background-color: #ffffff;
   }
   .list_content table tbody tr td{
      border: solid 1px #dfdfdf;
      padding: 0px 10px;
      text-align: center;
   }
</style>
