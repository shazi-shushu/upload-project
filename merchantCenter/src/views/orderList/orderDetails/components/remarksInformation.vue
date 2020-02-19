<template>
  <div class="remarkInforContent">
    <div class="title_tip">备注信息</div>
    <div class="remarkContent">
      <div class="remarkContentItem">
        <div class="remarkContentItemL">
          <div class="color666 fz14">卖家留言</div>
          <div class="colorccc fz12">最多200字</div>
        </div>
        <div class="remarkContentItemR">
          <textarea id="maiJia" v-model="sellerContent" style="resize:none;" name="maiJia" cols="30" rows="10" placeholder="卖家为买家留言只能回复一次" />
          <div v-if="item.sellerMessage==null" class="maiJiaMsg" @click="sellerkMsg">保存</div>
        </div>
      </div>
      <div class="remarkContentItem">
        <div class="remarkContentItemL">
          <div class="color666 fz14">备注</div>
          <!-- <div class="colorccc fz12">最多200字</div> -->
        </div>
        <div class="remarkContentItemR">
          <textarea id="maiJia" v-model="remarkContent" style="resize:none;" name="maiJia" cols="30" rows="10" placeholder="" />
          <div class="remarkMsg" @click="remarkMsg">保存</div>
        </div>
      </div>
    </div>
    <div style="background-color: #ffffff;">
      <div class="title_tip">操作日志</div>
      <div class="operationLogContent">
        <!-- <div class="liuYan">
                    <ul>
                        <li v-for="(item,index) in replyMesg" v-if="item.opTypeName=='卖家留言'" :key="index">
                            <span>{{item.createTime}}</span>
                            <span>{{item.opTypeName}}</span>
                            <span>{{item.opContent}}</span>
                            <span>{{item.opUserName}}</span>
                        </li>
                    </ul>
                </div> -->
        <div class="liuYan">
          <ul>
            <li v-for="(item,index) in replyMesg" :key="index">
              <span>{{ item.createTime | getGangDateMiaos }}</span>
              <!-- <span>{{item.opType | opTypes}}</span> -->
              <span>{{ item.opTypeName }}</span>
              <span>{{ item.opContent }}</span>
              <span>{{ item.opUserName }}</span>
            </li>
            <!-- <li>
                            <span>2019-03-13  12:12:22</span>
                            <span>备注</span>
                            <span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                            <span>刘利霞</span>
                        </li>
                         <li>
                            <span>2019-03-13  12:12:22</span>
                            <span>备注</span>
                            <span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                            <span>刘利霞</span>
                        </li> -->
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { getHotelReplyMessage, saveHotelRemarkMessage, saveHotelSellMessage } from '@/api/orderList/hotel'
import { getGangDateMiao } from '@/utils/validate'
export default {
  filters: {
    getGangDateMiaos: getGangDateMiao,
    opTypes: function(val) {
      //   操作类型 1=卖家留言 2=备注
      const opTypesList = { 1: '卖家留言', 2: '备注' }
      return opTypesList[val]
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      datas: this.item,
      replyMesg: [],
      remarkContent: '',
      sellerContent: '',
      params: {
        platform: '',
        channel: '',
        os: '',
        outUserId: '',
        pageNo: '1',
        pageSize: '100',
        orderNo: ''
      },
      remarkParams: {
        platform: '',
        channel: '',
        os: '',
        outUserId: '1',
        orderNo: '1',
        userName: '刘世涛',
        content: ''
      },
      sellerParams: {
        platform: '',
        channel: '',
        os: '',
        outUserId: '1',
        orderNo: '1',
        userName: '融e购',
        content: ''
      }
    }
  },
  mounted() {
    this.getReplayMsg()
  },
  methods: {
    remarkMsg() {
      if (this.remarkContent === '') {
        this.$message({
          message: '请填写备注信息',
          type: 'warning'
        })
        return false
      }
      this.remarkParams.content = this.remarkContent
      this.remarkParams.orderNo = this.datas.orderNo
      saveHotelRemarkMessage(this.remarkParams).then((res) => {
        // console.log(res)
        this.getReplayMsg()
        this.remarkContent = ''
      })
    },
    sellerkMsg() {
      if (this.sellerContent === '') {
        this.$message({
          message: '请填写卖家回复信息',
          type: 'warning'
        })
        return false
      }
      this.sellerParams.content = this.sellerContent
      this.sellerParams.orderNo = this.datas.orderNo
      saveHotelSellMessage(this.sellerParams).then((res) => {
        // console.log(res)
        this.getReplayMsg()
        this.item.sellerMessage = this.sellerContent
        this.sellerContent = ''
      })
    },
    getReplayMsg() {
      // console.log(this.datas.orderNo)
      this.params.orderNo = this.datas.orderNo
      getHotelReplyMessage(this.params).then((res) => {
        // console.log(res)
        const resMsg = res.data.data
        // console.log(resMsg)
        // this.$nextTick(() => {
        this.replyMesg = resMsg.pages
        // })
        console.log('this.replyMesg')
        console.log(this.replyMesg)
      })
    }
  }
}
</script>
<style scoped>
.remarkInforContent{
    /* background-color: #ffffff; */
    /* padding: 10px 0px; */
    margin-bottom: 4px;
    padding-bottom: 0px;
}
.title_tip{
    background-color: #ffffff;
    color: #333333;
    font-size: 14px;
    padding-left: 36px;
    padding-bottom: 20px;
    padding-top: 10px;
}
.red{
    color: #c8000a;
}
.colorccc{
    color: #cccccc;
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
.remarkContent{
    padding-left: 60px;
    display: flex;
    padding-bottom: 20px;
    background-color: #ffffff;
    margin-bottom: 4px;
}
.operationLogContent{
    padding-left: 60px;
    /* display: flex; */
    padding-bottom: 10px;
    background-color: #ffffff;
    /* margin-bottom: 4px; */
}
.remarkContentItem{
    display: flex;
    width: 48%;
    position: relative;
}
#maiJia{
    outline:none;
    border-radius: 10px;
    border: solid 1px #dcdcdc;
    font-size: 14px;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    width: 354px;
    height: 147px;
    margin-left: 10px;
    padding: 4px 4px;
}
.maiJiaMsg{
    width: 56px;
    height: 26px;
    line-height: 26px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #c8000a;
    color: #c8000a;
    text-align: center;
    cursor: pointer;
    position: absolute;
    right: 118px;
    bottom: 8px;
    font-size: 14px;
}
.remarkMsg{
    width: 56px;
    height: 26px;
    line-height: 26px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #c8000a;
    color: #c8000a;
    text-align: center;
    cursor: pointer;
    position: absolute;
    right: 145px;
    bottom: 8px;
    font-size: 14px;
}
.liuYan{
    /* overflow: hidden; */
}
.liuYan ul {
    margin: 0px;
}
.liuYan ul li{
    /* float: left; */
    margin-right: 20px;
    margin-bottom: 20px;
    list-style: none;
}
.liuYan ul li span{
    margin-right: 60px;
    font-size: 14px;
    color: #666666;
}
</style>
