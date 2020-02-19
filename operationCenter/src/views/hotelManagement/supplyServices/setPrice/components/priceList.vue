<template>
  <div class="priceListContent clearfix">
    <!-- 顶部 批量设置 -->
    <div class="btnContent">
      <span class="btn" @click="setMorePrice">批量设置</span>
      <span class="btn">重置</span>
    </div>
    <div class="dataContent">
      <div class="dataMonthContent clearfix">
        <div> <span class="prev"> {{ left }} </span> </div>
        <div class="monthList clearfix">
          <ul>
            <li v-for="(item,index) in newDate" :key="index" :class="{'active':item.type}">{{ item.month }}月</li>
          </ul>
        </div>
        <div> <span class="next">></span>  </div>
      </div>
      <div class="dataTypeContent clearfix">
        <ul>
          <li v-for="(item,index) in newDateType" :key="index">{{ item }}</li>
        </ul>
      </div>
      <div class="dataListContent clearfix">
        <ul class="clearfix">
          <li v-for="(dateItem,index) in dateMsg" :key="index" class="dataListContent_list">
            <ul class="clearfix">
              <li v-for="(item,indexs) in dateItem" :key="indexs" class="dataListContent_list_item" @click="setSinglePrice(item)">
                <div v-if="item.date" class="list_item_msg">
                  <div v-if="item.msg.price">¥ {{ item.msg.price }}</div>
                  <div v-if="item.msg.hasRoom">有房</div>
                  <div v-if="item.msg.num">余{{ item.msg.num }}</div>
                </div>
                <div class="list_item_date">{{ item.date }}</div>
                <!-- {{item.date}} -->
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      left: '<',
      newDate: [],
      newDateType: ['日', '一', '二', '三', '四', '五', '六'],
      dateMsg: [
        [
          {
            date: '',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          },
          {
            date: '',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          },
          {
            date: '',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          },
          {
            date: '',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          },
          {
            date: '',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          },
          {
            date: '',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          },
          {
            date: '1',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          }
        ],
        [
          {
            date: '2',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          },
          {
            date: '3',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          },
          {
            date: '4',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          },
          {
            date: '5',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          },
          {
            date: '6',
            msg: {
              price: '',
              num: '',
              hasRoom: false
            }
          },
          {
            date: '7',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          },
          {
            date: '8',
            msg: {
              price: '100',
              num: '10',
              hasRoom: true
            }
          }
        ]
      ]
    }
  },
  mounted() {
    this.initDate()
  },
  methods: {
    initDate() {
      const nowMonth = new Date().getMonth()
      const leng = 12 - nowMonth < 7 ? 12 - nowMonth : 6
      for (let i = 0; i < leng; i++) {
        const params = {}
        params.month = nowMonth + i < 10 ? '0' + Number(nowMonth + i) : nowMonth + i
        if (i === 0) {
          params.type = true
        } else {
          params.type = false
        }
        this.newDate.push(params)
      }
      for (let i = 1; i < 7 - leng; i++) {
        const params = {}
        params.month = i < 10 ? '0' + i : i
        params.type = false
        this.newDate.push(params)
      }
      console.log(this.newDate)
    },
    setSinglePrice(val) {
      this.$emit('setSinglePrice', val)
    },
    setMorePrice() {
      this.$emit('setMorePrice')
    }
  }
}
</script>
<style scoped>
.priceListContent{
    padding: 24px 0px 50px 34px;
    background-color: #ffffff;
    width: 100%;
    /* min-width: 1200px; */
}
.btnContent{
    text-align: right;
    width: 91%;
}
.btn{
    display: inline-block;
    border-radius: 4px;
    border: solid 1px #c8000a;
    height: 34px;
    line-height: 34px;
    color: #c8000a;
    padding: 0px 12px;
    cursor: pointer;
}
.dataContent{
    background-color: #ffffff;
   padding-top: 20px;
}
.dataTypeContent ul li:first-child{
    border-left: solid 1px #e5e5e5;
}
.dataTypeContent ul li:last-child{
    border-right: solid 1px #e5e5e5;
}
.dataMonthContent{
    width: 91%;
    height: 60px;
    line-height: 60px;
    background-color: #ef7a80;
    text-align: center;
}
.dataMonthContent>div{
    display: inline-block;
    /* margin-right: 10px; */
    cursor: pointer;
    height: 60px;
    line-height: 60px;
    vertical-align: text-bottom;
}
.monthList ul li{
    float: left;
    color: #e8e8e8;
    font-size: 16px;
    width: 80px;
    text-align: center;
    cursor: pointer;
}
.monthList ul li.active{
    color: #ffffff;
}
.prev , .next{
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 16px;
    text-align: center;
    border-radius: 9px;
    background-color: #ffffff;
    color: #c8000a;
}
.dataTypeContent{
    width: 100%;
}
.dataTypeContent ul li{
    float: left;
    width: 13%;
    color: #666666;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
	background-color: #ffffff;
}
.dataListContent .dataListContent_list{
    float: left;
    width: 100%;
}
.dataListContent .dataListContent_list .dataListContent_list_item {
    float: left;
    position: relative;
    width: 13%;
    color: #666666;
    text-align: center;
    font-size: 14px;
    height: 110px;
    line-height: 110px;
    background-color: #ffffff;
    border: solid 1px #e5e5e5;
    border-right: 0px;
    border-bottom: 0px;
}
.dataListContent .dataListContent_list .dataListContent_list_item:last-child {
    border-right: solid 1px #e5e5e5;
    /* border-bottom: solid 1px #e5e5e5; */
}
.dataListContent .dataListContent_list:last-child .dataListContent_list_item{
    border-bottom: solid 1px #e5e5e5;
}
.list_item_msg{
    width: 100%;
    position: absolute;
    left: 0px;
    top: 10px;
}
.list_item_msg{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: left;
    padding-left:6px;
    color: #c8000a;
    font-size: 14px;
}
.list_item_date{
    position: absolute;
    right: 50px;
}
</style>
