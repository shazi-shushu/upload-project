<template>
  <div class="serverContent">
    <ul>
      <li v-for="(item,index) in allMsg" :key="index">
        <div class="serverItem">
          <div class="serverItem_tips">{{ item.name }}</div>
          <div class="serverItem_content">
            <div>
              <el-checkbox v-model="item.checkAll" :indeterminate="item.isIndeterminate" disabled @change="handleCheckAllChange(item.checkAll,item.id)">全选</el-checkbox>
              <div style="margin: 15px 0;" />
            </div>
            <div>
              <el-checkbox-group v-model="item.checkedCities">
                <el-checkbox v-for="city in item.cities" :key="city.id" class="serverItem_content_item" disabled :label="city.id" @change="handleCheckedCitiesChange(item.checkedCities,item.id)">{{ city.name }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
//   const cityOptions = ['免费WiFi', '免费停车场', '收费停车场', '室内游泳池', '健身房', '高尔夫球场'];
export default {
  props: {
    facilityList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      allMsg: [
        // {
        //     name: '酒店设施',
        //     id: '0',
        //     checkAll: false,
        //     checkedCities: ['免费WiFi', '免费停车场'],
        //     cities: ['免费WiFi', '免费停车场', '收费停车场', '室内游泳池', '健身房', '高尔夫球场'],
        //     isIndeterminate: true
        // }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.facilityList.forEach(element => {
        const newCheckList = []
        element.hotelFacilityListByHotelId.forEach(item => {
          newCheckList.push(item.id)
        })
        const newObject = Object.assign(element, {
          isIndeterminate: true,
          checkAll: false,
          checkedCities: newCheckList,
          cities: element.hotelFacilityList
        })
        this.allMsg.push(newObject)
      })
    },
    handleCheckAllChange(val, i) {
      console.log(val)
      console.log(i)
      this.allMsg[i].checkedCities = val ? this.allMsg[i].cities : []
      this.allMsg[i].isIndeterminate = false
    },
    handleCheckedCitiesChange(value, i) {
      console.log(value)
      console.log(i)
      const checkedCount = value.length
      this.allMsg[i].checkAll = checkedCount === this.allMsg[i].cities.length
      this.allMsg[i].isIndeterminate = checkedCount > 0 && checkedCount < this.allMsg[i].cities.length
    }
  }
}
</script>
<style scoped>
.serverContent{
    background-color: #ffffff;
    padding: 20px 0px;
    margin-bottom: 4px;
}
.serverItem{
    width: 100%;
    display: flex;
}
.serverItem_tips{
    width: 100px;
    /* height: 34px; */
    /* line-height: 34px; */
    text-align: right;
    margin-right: 20px;
    color: #666666;
}
.serverItem_content{
    width: 90%;
}
.serverItem_content_item{
    width: 20%;
}
</style>
