<template>
  <div class="up">
    <div class="wrap">
      <div class="selectedItem">
        频道
        <el-select v-model="yeWuValue" placeholder="请选择" style="width: 280px;">
          <el-option
            v-for="item in yeWuBanKuai"
            :key="item.channelId"
            :label="item.channelName"
            :value="item.channelId"
          />
        </el-select>
      </div>
      <div class="selectedItem">
        展位名称
        <el-select v-model="zhanwei" placeholder="请选择" style="width: 280px;">
          <el-option
            v-for="(items) in list1"
            :key="items.boothId"
            :label="items.boothName"
            :value="items.boothId"
          />
        </el-select>
      </div>
      <el-button style="background: #c8000a; color: #fff; font-size:15px; width:100px; height: 34px; border: 0;" @click="chaxun()">查询</el-button>
    </div>
  </div>
</template>
<script>
import { chanel, booth } from '@/api/productrecommend/productrecom'

export default {
  name: 'Up',
  data() {
    return {
      list: [],
      yeWuValue: '',
      yeWuBanKuai: [],
      list1: [],
      zhanwei: '',
      param: {
        boothId: '',
        channelId: '',
        pageNum: '',
        pageSize: '',
        id: '',
        boothName: '',
        status: '',
        channelName: ''
      },
      maskCharacter: ''
    }
  },
  mounted() {
    chanel().then(res => {
      //console.log(res.data.data)
      this.yeWuBanKuai = res.data.data
      //console.log(this.yeWuBanKuai)
    })
    booth().then(res => {
      //console.log(res.data.data)
      this.list1 = res.data.data
    })
  },
  methods: {
    chaxun() {
      this.param.channelId = this.yeWuValue
      this.param.boothId = this.zhanwei
      this.$emit('search_btn', this.param)
    }
  }

}
</script>
<style scoped>
.wrap {
  height: 82px;
  background: #fff;
  line-height: 82px;
  padding: 0 30px;
  border-bottom: 1px solid #f6f6f6;
}
.selectedItem{float: left; margin: 0 190px 0 0;}
#pd {
  width: 197px;
  height: 34px;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #333;
  background: none;
  margin: 0 166px 0 10px;
}
</style>
