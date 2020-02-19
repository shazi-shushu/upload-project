<template>
  <div class="scheduledInforContent" style="    display: flex;">
    <div class="scheduledInforIrem">
      <div class="title_tip">预订信息</div>
      <div class="scheduledIrem_top">
        <div class="scheduledIrem_msg">
          <span class="red fz16">{{ item.hotel.hotelChnName }}</span>
        </div>
        <div class="scheduledIrem_msg">
          <span class="fuwu fz14" style="margin-right:36px;">{{ item.room.roomTypeName }}</span>
          <span class="fuwu fz14 text-over" style="width:76%;vertical-align: bottom;display:inline-block" :title="item.server.ratePlanName">{{ item.server.ratePlanName }}</span>
        </div>
        <div class="scheduledIrem_msg">
          <div>
            <div class="color333 fz16" style="margin-bottom:6px;padding-right:88px;">{{ item.checkInDate | changeDate }}</div>
            <div class="color999 fz12">入住时间</div>
          </div>
          <div class="color333 fz12 date_msg">
            {{ (item.checkOutDate,item.checkInDate) | allDate(item.checkOutDate,item.checkInDate) }}晚
          </div>
          <div>
            <div class="color333 fz16" style="margin-bottom:6px;">{{ item.checkOutDate | changeDate }}</div>
            <div class="color999 fz12" style="text-align:right;">离店时间</div>
          </div>
          <div class="fz14 color666" style="margin-left: 86px;">
            {{ item.roomNum }}间 | {{ item.server.bedContent }} | {{ item.server.breakfastType | breakfastTypes }} {{ item.server.breakfastNum !=0? item.server.breakfastNum+'份':'' }}
          </div>
        </div>
      </div>
      <div class="scheduledIrem_bottom" style="padding-bottom: 20px;">
        <div class="scheduledIrem_bottom_item">
          <div class="scheduledIrem_bottom_name color999">入住人</div>
          <div class="scheduledIrem_bottom_msg color333">{{ item.guests | getGuests }}</div>
        </div>
        <div class="scheduledIrem_bottom_item">
          <div class="scheduledIrem_bottom_name color999">到店时间</div>
          <div class="scheduledIrem_bottom_msg color333">{{ item.arriveTime }}</div>
        </div>
        <div class="scheduledIrem_bottom_item">
          <div class="scheduledIrem_bottom_name color999">联系人</div>
          <div class="scheduledIrem_bottom_msg color333">{{ item.linkMan }}     {{ item.linkPhone }}</div>
        </div>
      </div>
    </div>
    <div class="scheduledInforIrem" style="">
      <div class="title_tip" style="padding-bottom: 0px;">酒店信息</div>
      <div class="scheduledIrem_bottom">
        <div class="scheduledIrem_bottom_item">
          <div class="scheduledIrem_bottom_name color999">酒店ID</div>
          <div class="scheduledIrem_bottom_msg color333">{{ item.hotel.hotelId }}</div>
          <!-- <div class="scheduledIrem_bottom_msg  lookHotelMsg"><router-link :to="{path:'/hotelManagement/hotelManagementDetails',query:{'hotelNo':item.hotel.hotelId}}">查看酒店详情</router-link></div> -->
        </div>
        <div class="scheduledIrem_bottom_item">
          <div class="scheduledIrem_bottom_name color999">电话</div>
          <div class="scheduledIrem_bottom_msg color333">{{ item.hotel.telephone }}</div>
        </div>
        <div class="scheduledIrem_bottom_item">
          <div class="scheduledIrem_bottom_name color999">地址</div>
          <div class="scheduledIrem_bottom_msg color333" style="width: 56%;">{{ item.hotel.chnAddress }}</div>
        </div>
        <div class="scheduledIrem_bottom_item">
          <div class="scheduledIrem_bottom_name color999">取消政策</div>
          <div class="scheduledIrem_bottom_msg color333">
            <div v-for="(item,index) in item.skuList" :key="index" style="display:block;">{{ item.cancelRestrictions | cancelRestrictionsFilter }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    cancelRestrictionsFilter(val) {
      const arr = val.split(':')
      console.log(val)
      console.log(arr)
      const oneObj = { 0: '免费取消', 1: '不可取消' }
      if (arr.length === 1) {
        return oneObj[arr[0]]
      } else if (arr.length > 1) {
        if (arr[0] === '2') {
          return '入住前' + arr[1] + '天' + arr[2] + '点前可以取消'
        } else if (arr[0] === '3') {
          return '入住前' + arr[1] + '天' + arr[2] + '点之后不可退，不可改未入住房费照收'
        }
      }
    },
    breakfastTypes(val) {
      // 早餐类型：1=中式 2=西式 3=自助 ,
      var valFoot = { 0: '无早', 1: '中式', 2: '西式', 3: '自助' }
      return valFoot[val]
    },
    changeDate(val) {
      var date = val.split('-')
      date = date[1] + '月' + date[2] + '日'
      return date
    },
    allDate(val1, val2) {
      var checkInDates = new Date(val1)
      var checkOutDates = new Date(val2)
      var times = (checkOutDates - checkInDates) / 24 / 60 / 60 / 1000
      return times
    },
    getGuests(val) {
      let names = []
      for (const ele of val.values()) {
        console.log(ele)
        names.push(ele.name)
      }
      names = names.join('、')
      return names
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>
.lookHotelMsg{
    color: #c8000a;
    padding: 0px 6px;
    /* height: 30px; */
    /* line-height: 30px; */
    border: 1px solid #c8000a;
    border-radius: 6px;
    margin-left: 20px;
}
.scheduledInforContent{
    background-color: #ffffff;
    /* padding: 10px 0px; */
    margin-bottom: 4px;
}
.title_tip{
    color: #333333;
    font-size: 14px;
    padding: 10px 0px  10px 36px;
}
.red{
    color: #c8000a;
}
.color333{
    color: #333333;
}
.color666{
    color: #666666;
}
.color999{
    color: #999999;
}
.fz16{
    font-size: 16px;
}
.fz14{
    font-size: 14px;
}
.fz12{
    font-size: 12px;
}
.scheduledInforIrem{
    width: 49%;
    box-sizing: border-box;
    display: inline-block;
}
.scheduledInforIrem:nth-child(1){
    border-right: 4px solid #fbfbfb;
}
.scheduledIrem_top{
    padding-bottom: 10px;
    border-bottom:1px solid #eeeeee;
}
.scheduledIrem_msg{
    padding-left: 60px;
    position: relative;
}
.fuwu{
    color: #666666;
    height: 50px;
    line-height: 50px;
}
.scheduledIrem_msg>div {
    display: inline-block;
}
.date_msg{
    width: 60px;
    height: 22px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #dcdcdc;
    text-align: center;
    line-height: 22px;
    position: absolute;
    top: 6px;
    left: 146px;
}
.scheduledIrem_bottom_item{
    padding: 15px 0px 0px 60px;
    display: flex;
}
.scheduledIrem_bottom_item div{
    display: inline-block;
    font-size: 14px;
}
.scheduledIrem_bottom_name{
    width: 70px;
    text-align: left;
}
.scheduledIrem_bottom_msg{

}
</style>
