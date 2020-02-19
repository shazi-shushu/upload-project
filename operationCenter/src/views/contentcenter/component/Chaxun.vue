<template>
  <div class="chaxun">
    <div class="up">
      标题内容
      <el-input
        v-model="input"
        placeholder="请输入内容"
        clearable
        style="width:200px; height: 34px; margin: 0 100px 0 10px;"
      />开始时间
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="年/月/日"
        end-placeholder="年/月/日"
        style="margin: 0 100px 0 10px;"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
         unlink-panels
      />
      状态
      <el-select v-model="value" placeholder="请选择" style="margin: 0 100px 0 10px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button style="background: #c8000a; color: #fff; font-size:15px; width:100px; height: 34px; border: 0; margin-left: 70px;" @click="chaxun()">查询</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Chaxun',
  data() {
    return {
      input: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value1: '',
      value2: '',
      value: '',
      options: [
        { value: '', label: '请选择' },
        { value: 1, label: '停用' },
        { value: 0, label: '启用' }
      ],
      param: {
        deleteFlag: "",
        endTime: "",
        nrContent: "",
        sort: "",
        startTime: "",
        nrId: "",
        pageNum: "",
        pageSize: "",
      },
    }
  },
  methods: {
    chaxun() {
      this.param.nrContent = this.input
      this.param.startTime = this.value1[0]
      this.param.endTime = this.value1[1]
      this.param.deleteFlag = this.value
      //console.log(this.value1[1])
      this.$emit('search_btn', this.param)
    }
  }
}
</script>
<style scoped>
.up {
  height: 82px;
  background: #fff;
  line-height: 82px;
  padding: 0 30px;
  border-bottom: 1px solid #f6f6f6;
  color: #333;
}
</style>
<style>
.up .el-range-separator{padding: 0;}
</style>

