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
                <el-checkbox v-for="city in item.cities" :key="city" class="serverItem_content_item" disabled :label="city" @change="handleCheckedCitiesChange(item.checkedCities,item.id)">{{ city }}</el-checkbox>
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
  data() {
    return {
      allMsg: [
        {
          name: '酒店设施',
          id: '0',
          checkAll: false,
          checkedCities: ['免费WiFi', '免费停车场'],
          cities: ['免费WiFi', '免费停车场', '收费停车场', '室内游泳池', '健身房', '高尔夫球场'],
          isIndeterminate: true
        },
        {
          name: '酒店服务',
          id: '1',
          checkAll: false,
          checkedCities: ['接机服务', '班车服务'],
          cities: ['接机服务', '班车服务', '租车服务', '接送服务', '邮政服务', '私人登记入住'],
          isIndeterminate: true
        },
        {
          name: '客房设施',
          id: '2',
          checkAll: false,
          checkedCities: ['书桌', '电话'],
          cities: ['书桌', '电话', '插座', '针线包', '国际长途电话', '收音机', '免费洗漱用品', '雨伞', '独立淋浴间'],
          isIndeterminate: true
        }
      ]
    }
  },
  methods: {
    handleCheckAllChange(val, i) {
      //   console.log(val)
      //   console.log(i)
      this.allMsg[i].checkedCities = val ? this.allMsg[i].cities : []
      this.allMsg[i].isIndeterminate = false
    },
    handleCheckedCitiesChange(value, i) {
      //   console.log(value)
      //   console.log(i)
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
    width: 90%;
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
    width: 60%;
}
.serverItem_content_item{
    width: 20%;
}
</style>
