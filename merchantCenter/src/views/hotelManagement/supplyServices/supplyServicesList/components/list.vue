<template>
  <div>
    <div class="content_tips">
      <span class="fz16 color333 content_tips_msg">查询结果</span>
      <span class="fz16 color333 addRoomTypeServer"><router-link :to="{path:'/supplyServices/addSupplyServices'}">添加房型服务</router-link></span>
    </div>
    <div class="list_content">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>状态</th>
            <th>酒店名称</th>
            <th>酒店ID</th>
            <th>房型名称</th>
            <th>房型ID</th>
            <th>房型服务名称</th>
            <th>支付方式</th>
            <th>早餐</th>
            <th>取消类型</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ item.status | statusType }}</td>
            <td>{{ item.hotelName }}</td>
            <td>{{ item.hotelId }}</td>
            <td>{{ item.roomTypeName }}</td>
            <td>{{ item.roomTypeId }}</td>
            <td>{{ item.serviceName }}</td>
            <td>{{ item.payMethod | payMethodType }}</td>
            <td>早餐jd</td>
            <td>{{ item.cancelRestrictions | cancelRestrictionsType }}</td>
            <td class="caoZuoBtn">
              <span><router-link :to="{path:'/supplyServices/addSupplyServices'}">编辑</router-link></span>
              <!-- <span>编辑</span> -->
              <span><router-link :to="{path:'/supplyServices/setPrice'}">设置价格</router-link></span>
              <!-- <span>设置价格</span> -->
              <span>下架</span>
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
export default {
  filters: {
    hasRefuns: function(val) {
      // console.log(val)
      return val === 'true' ? '有' : '-'
    },
    isInvoices: function(val) {
      // console.log(val)
      return val === 'true' ? '需要' : '不需要'
    },
    payMethodType: function(val) {
      // 1：面付 2：预付 ,
      const platformList = { 1: '面付', 2: '预付' }
      return platformList[val]
    },
    cancelRestrictionsType: function(val) {
      // 取消条款type：表示取消条款的类型，type=0 表示商家未设置取消条款；type=1 表示不可取消；type=2 表示入住前 day 天 time 点前可以取消
      const channelList = { 0: '商家未设置取消条款', 1: '不可取消', 2: '可以取消' }
      return channelList[val]
    },
    statusType: function(val) {
      // 房型状态(0:正常,1:删除,-1:下架)
      const statusTypeObj = { '0': '正常', '1': '删除', '-1': '下架' }
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
        padding: 0px 6px;
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
