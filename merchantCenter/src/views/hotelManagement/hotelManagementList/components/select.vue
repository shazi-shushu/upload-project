<template>
  <div class="selectContent">
    <!-- 第一级 -->
    <div>
      <div class="selectItem">
        <div class="celectItemL">
          酒店名称
        </div>
        <div class="celectItemR">
          <input v-model="paramNew.hotelChnName" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          酒店类型
        </div>
        <div class="celectItemR">
          <el-select v-model="paramNew.type" placeholder="请选择">
            <el-option
              v-for="item in orderLaiyuan"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          城市
        </div>
        <div class="celectItemR">
          <el-autocomplete
            v-model="paramNew.cityName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          />
          <!-- <input type="text" v-model="paramNew.cityName"> -->
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          酒店状态
        </div>
        <div class="celectItemR">
          <el-select v-model="paramNew.status" placeholder="请选择">
            <el-option
              v-for="item in hotelStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
    <!-- 第二级 -->
    <div style="height:50px;line-height:50px;position:relative;">
      <div class="selectItem">
        <div class="celectItemL">
          酒店ID
        </div>
        <div class="celectItemR">
          <input v-model="paramNew.hotelId" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          酒店集团
        </div>
        <div class="celectItemR">
          <el-select v-model="paramNew.parentHotelGroupName" placeholder="请选择">
            <el-option
              v-for="item in hotelGroupName"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          酒店品牌
        </div>
        <div class="celectItemR">
          <input v-model="paramNew.plateName" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          酒店星级
        </div>
        <div class="celectItemR">
          <el-select v-model="paramNew.hotelStar" placeholder="请选择">
            <el-option
              v-for="item in hotelStarts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="search_btn" @click="search_btn">
        查询
      </div>
    </div>
    <!-- 第三级 -->
    <!-- <div style="height:50px;line-height:50px;position:relative;"> -->

    <!-- <div class="search_btn" @click="search_btn">
                查询
            </div> -->
    <!-- </div> -->
    <!-- 第四级 -->
    <!-- <div>

        </div> -->
  </div>
</template>
<script>
import { getcityList, getConstantsCategory } from '@/api/management/hotelManagement/axiosHotelManagement'
export default {
  data() {
    return {
      orderNo: '',
      linkPhone: '',
      orderValue: '',
      linkMan: '',
      hotelId: '',
      hotelName: '',
      merchantName: '',
      // 订单状态：订单状态：0-待付款;1-付款成功;2-预定成功;3-已完成;4-已关闭;5-已取消;9-退款中;10-已退款;11-退款失败;12-预定失败
      orderTypes: [
        { value: '', label: '请选择' },
        { value: 0, label: '待付款' },
        { value: 1, label: '付款成功' },
        { value: 2, label: '预定成功' },
        { value: 3, label: '已完成' },
        { value: 4, label: '已关闭' },
        { value: 5, label: '已取消' },
        { value: 9, label: '退款中' },
        { value: 10, label: '已退款' },
        { value: 11, label: '退款失败' },
        { value: 12, label: '预订失败' }
      ],
      orderLaiyuanValue: '',
      hotelStatus: [
        { value: '', label: '请选择' },
        { value: 1, label: '上架' },
        { value: 2, label: '下架' }
      ],
      yeWuValue: '',
      hotelStarts: [
        { value: '', label: '请选择' },
        { value: '66,69,79', label: '二星级及以下' },
        { value: '59,64', label: '三星级' },
        { value: '39,49', label: '四星级' },
        { value: '19,20', label: '五星级' }
      ],
      // 1=查询下单时间，2=查询支付时间 3=入住时间，4=离店时间
      thimeValue: '',
      orderLaiyuan: [
        { value: '', label: '请选择' },
        { value: 1, label: '下单时间' },
        { value: 2, label: '支付时间' },
        { value: 3, label: '入住时间' },
        { value: 4, label: '离店时间' }
      ],
      hotelGroupName: [],
      startTime: '',
      endTime: '',
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.endTime !== '') {
            // return time.getTime() < Date.now() - 8.64e7 || time.getTime() > this.endTime
            return time.getTime() > this.endTime
          } else {
            // return time.getTime() < Date.now() - 8.64e7
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.startTime !== '') {
            return time.getTime() < this.startTime
          } else {
            // return time.getTime() < Date.now()
            // return time.getTime() < Date.now() - 8.64e7
          }
        }
      },
      param: {
        orderNo: '',
        linkPhone: '',
        linkMan: '',
        hotelId: '',
        hotelName: '',
        merchantName: '',
        status: '',
        queryType: '',
        startTime: '',
        endTime: '',
        pageNo: '1',
        pageSize: '10',
        channel: '',
        platform: ''
      },
      paramNew: {
        hotelId: '', // 酒店id
        hotelChnName: '', // 酒店名称
        type: '', // 酒店类型
        parentHotelGroupName: '', // 酒店集团
        cityName: '', // 酒店城市
        plateName: '', // 酒店品牌
        pageNo: '1',
        // pageSize: '10',
        status: '', // 酒店状态
        hotelStar: '', // 酒店星级
        plateCode: '', // 连锁品牌代码
        pageSize: '10'
      },
      restaurants: [],
      timeout: null
    }
  },
  mounted() {
    this.loadAll()
    this.getCategory()
  },
  methods: {
    search_btn() {
      // this.param.orderNo = this.orderNo
      // this.param.linkPhone = this.linkPhone
      // this.param.linkMan = this.linkMan
      // this.param.hotelId = this.hotelId
      // this.param.hotelName = this.hotelName
      // this.param.merchantName = this.merchantName
      // this.param.status = this.orderValue
      // this.param.queryType = this.thimeValue
      // this.param.startTime = this.startTime
      // this.param.endTime = this.endTime
      // this.param.channel = this.yeWuValue
      // this.param.platform = this.orderLaiyuanValue
      this.$emit('search_btn', this.paramNew)
    },
    // 查询酒店集团
    getCategory() {
      getConstantsCategory('HotelGroup').then((res) => {
        console.log(res.data)
        this.hotelGroupName = res.data.data
      })
    },
    loadAll() {
      getcityList().then((res) => {
        res.data.data.forEach(element => {
          const obj = {
            value: element.name.split('-')[0],
            code: element.code
          }
          this.restaurants.push(obj)
        })
      })
    },
    querySearchAsync(queryString, cb) {
      // console.log('queryString')
      // console.log(this.restaurants)
      // console.log(cb)
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      // console.log(item);
    }
  }

}
</script>
<style scoped>
/* select,input{
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
    -webkit-appearance:none;
    outline: none;
    border: none;
} */
.selectContent{
    background-color: #ffffff;
    padding: 10px 0px;
}
.selectItem {
    height: 50px;
    line-height: 50px;
    color: #333333;
    font-size: 14px;
    width: 20%;
    max-width: 300px;
    display: inline-block;
}
.celectItemL {
    width: 87px;
    text-align: center;
    display: inline-block;
}
.celectItemR {
    max-width: 200px;
    width: 60%;
    display: inline-block;
}
.celectItemR input {
    width: 100%;
    height: 34px;
    line-height: 34px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding-left: 4px;
}
.selectTime {
    display: inline-block;
    width: 48%;
    max-width: 600px;
    margin-right: 4px;
}
.selectTime div {
    display: inline-block;
}
.selectTimeR {
    width: 140px;
    padding: 0px 13px 0px 20px;
}
.block{
    width: 190px;
}
.block input {
    width: 100%;
    height: 34px;
    line-height: 34px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 190px;
}
.search_btn{
    position: absolute;
    top: 8px;
    right: 80px;
    color: #ffffff;
    width: 100px;
    height: 34px;
    line-height: 34px;
    text-align: center;
	background-color: #c8000a;
    border-radius: 4px;
    cursor: pointer;
}
</style>
