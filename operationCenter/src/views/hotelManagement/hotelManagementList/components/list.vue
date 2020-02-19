<template>
  <div>
    <div class="content_tips">
      <span class="fz16 color333 content_tips_msg">查询结果</span>
    </div>
    <div class="list_content">
      <table>
        <thead>
          <tr>
            <!-- <th>序号</th> -->
            <th>商品</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index" style="border-bottom: 4px solid #fbfbfb;">
            <!-- <td>{{index+1}}</td> -->
            <td>
              <!-- 左边展示 -->
              <div class="list_content_l">
                <div class="fl list_content_l_img">
                  <img :src="item.appearancePicUrl" alt="">
                  <!-- <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt=""> -->
                </div>
                <div class="fl list_content_l_msg">
                  <div class="color333 fz16">
                    <span>{{ item.hotelChnName }}</span>
                    <span>
                      <svg-icon icon-class="xingxing" />
                    </span>
                    <span>
                      <svg-icon icon-class="xingxing" />
                    </span>
                    <span class="fz12 red" style="padding-left:20px;">上架</span>
                  </div>
                  <div class="address">
                    <span class="color999 fz14" :title="item.hotelIntroduce">地址：{{ item.hotelIntroduce }}</span>
                    <span class="red" style="padding:0px 20px;"><svg-icon icon-class="address" /><router-link :to="{path:'/hotelManagement/hotelManagementDetails',query:{'hotelNo':'11111111111','activeIndex':'4','hotelId':item.hotelId}}">查看地图</router-link></span>
                  </div>
                  <div class="color666 fz14">
                    <span>酒店集团</span>
                    <span style="padding:0px 20px;">酒店品牌</span>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <!-- 右侧操作 -->
              <div>
                <span class="red caoZuoBtn fz14">预览</span>
                <!-- <span class="red caoZuoBtn fz14">查看酒店</span> -->
                <span class="red caoZuoBtn fz14"><router-link :to="{path:'/hotelManagement/hotelManagementDetails',query:{'hotelId':item.hotelId}}">编辑酒店</router-link></span>
                <span class="red caoZuoBtn fz14"><router-link :to="{path:'/housingManagementList',query:{'hotelName':item.hotelChnName,'hotelId':item.hotelId}}">查看房型</router-link></span>
                <span class="red caoZuoBtn fz14">下架</span>
              </div>
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
// import logoPng from '@/assets/images/'
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
      default: () => {}
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
.address{
    width: 540px;
}
.address span:first-child{
    display: inline-block;
    width: 500px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
}
.address span:last-child{
    vertical-align: top;
    display: inline-block;
}
.content_tips{
    height: 60px;
    line-height: 60px;
    background-color: #ffffff;
    padding-left: 20px;
    margin-top: 4px;
}
.content_tips_msg{
    border-left: 2px solid #c8000a;
    padding-left: 4px;
    height: 14px;
    /* display: inline-block; */
}

.fl{
    float: left;
}
.caoZuoBtn{
    display: inline-block;
    border-radius: 10px;
    border: solid 1px #c8000a;
    height: 28px;
    line-height: 28px;
    padding: 0px 10px;
    cursor: pointer;
    margin-right: 10px;
}
.list_content_l{
    overflow: hidden;
    padding: 10px;
}
.list_content_l_img{
    vertical-align: middle;
    width: 110px;
	height: 110px;
}
.list_content_l_msg div span i{

}
.list_content_l_img img{
    vertical-align: middle;
    border-radius: 6px;
    width: 100%;
	height: 100%;
}
.list_content_l_msg{
    text-align: left;
}
.list_content_l_msg>div{
    line-height: 36px;
    padding-left: 20px;
}
.list_content{
    overflow-y:scroll;
    width: 100%;
    height: 625px;
    margin-bottom: 4px;
}
table{border-collapse: collapse; width: 100%;}
table td,th{
    /* border: 1px solid #dfdfdf; */
    white-space: nowrap;
    overflow: hidden;
    }
.list_content table {
    color: #666666;
    font-size: 14px;
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
    /* border: solid 1px #dfdfdf; */
    padding: 0px 10px;
}
.list_content table tbody{
    height: 39px;
    line-height: 39px;
    background-color: #ffffff;
}
.list_content table tbody tr td{
    /* border: solid 1px #dfdfdf; */
    padding: 0px 10px;
    text-align: center;
}
</style>
