<template>
  <div class="addSingleContent">
    <div class="addSingleTitle clearfix">
      <span class="addSingleTitle_l color333 fz16">批量设置</span>
      <span class="close" @click="closeSetPrice">x</span>
    </div>
    <div class="addSingleMsg">
      <!-- 设置日期部分 -->
      <div class="addSingleMsg_item clearfix">
        <div class="addSingleMsg_item50" style="width:100%;">
          <div class="itemName color666 fz14"><span class="red">*</span>日期范围</div>
          <div class="selectTime">
            <!-- 开始时间 -->
            <div class="block">
              <!-- <span class="demonstration">开始时间</span> -->
              <el-date-picker
                v-model="startTime"
                type="date"
                placeholder="开始时间"
                :picker-options="pickerOptionsStart"
              />
            </div>
            <span style="color: #333333;font-size: 14px;">至</span>
            <!-- 结束时间 -->
            <div class="block">
              <!-- <span class="demonstration">结束时间</span> -->
              <el-date-picker
                v-model="endTime"
                type="date"
                placeholder="结束时间"
                :picker-options="pickerOptionsEnd"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 设置星期几 -->
      <div class="addSingleMsg_item clearfix">
        <div class="addSingleMsg_item50" style="width:100%">
          <div class="itemName color666 fz14"><span class="red">*</span>设置星期</div>
          <div class="clearfix" style="display:flex;width: 70%;">
            <!-- <div style="margin: 15px 0;"></div> -->
            <div style="width: 66px;"><el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox></div>
            <div style="width: 70%;">
              <el-checkbox-group v-model="checkedDate" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="date in dates" :key="date" :label="date">{{ date }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div class="addSingleMsg_item clearfix">
        <div class="addSingleMsg_item50">
          <div class="itemName color666 fz14"><span class="red">*</span>销售价</div>
          <div class="item_inp">
            <input type="text" placeholder="请输入销售价格">
          </div>
        </div>
        <div class="addSingleMsg_item50">
          <div class="itemName color666 fz14">市场价</div>
          <div class="item_inp">
            <input type="text" placeholder="请输入市场价格">
          </div>
        </div>
      </div>
      <div class="addSingleMsg_item clearfix">
        <div class="addSingleMsg_item50">
          <div class="itemName color666 fz14"><span class="red">*</span>结算价</div>
          <div class="item_inp">
            <input type="text" placeholder="请输入结算价格">
          </div>
        </div>
        <div class="addSingleMsg_item50">
          <div class="itemName color666 fz14"><span class="red">*</span>库存</div>
          <div class="item_inp">
            <input type="text" placeholder="请输入库存">
          </div>
        </div>
      </div>
      <div class="addSingleMsg_item clearfix">
        <div class="addSingleMsg_item50">
          <div class="itemName color666 fz14"><span class="red">*</span>房态</div>
          <div class="" style="width: 62%;">
            <el-select v-model="orderLaiyuanValue" placeholder="请选择">
              <el-option
                v-for="item in orderLaiyuan"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="addSingleMsg_item50">
          <div class="itemName color666 fz14"><span class="red">*</span>是否可超</div>
          <div class="" style="width: 62%;">
            <el-select v-model="orderLaiyuanValue" placeholder="请选择">
              <el-option
                v-for="item in orderLaiyuan"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="addSingleMsg_item clearfix" style="margin-bottom:6px;">
        <div class="addSingleMsg_item70">
          <div class="itemName color666 fz14"><span class="red">*</span>取消政策</div>
          <div class="color333 fz14">
            <el-radio v-model="radioEnter" label="1">入住前</el-radio>
            <input type="text" class="dateNum">
            天
            <input type="text" class="dateNum">
            点前可以取消
          </div>
        </div>
        <div class="addSingleMsg_item50">
          <!-- <span class="fz12" style="height: 17px;line-height: 17px;color:#cccccc;" >注：提前预订时间，天数取值为整数，时间点的取值为0至23的整数</span> -->
        </div>
      </div>
      <div class="addSingleMsg_item clearfix">
        <div class="addSingleMsg_item70" style="width: 100%">
          <div class="itemName color666 fz14" />
          <div class="color333 fz14">
            <el-radio v-model="radioEnter" label="">入住前</el-radio>
            <input type="text" class="dateNum">
            天
            <input type="text" class="dateNum">
            点之后不可退,不可改,未入住,房费照收
          </div>
        </div>
        <div class="addSingleMsg_item50">
          <!-- <span class="fz12" style="height: 17px;line-height: 17px;color:#cccccc;" >注：提前预订时间，天数取值为整数，时间点的取值为0至23的整数</span> -->
        </div>
      </div>
      <div class="addSingleMsg_item clearfix">
        <div class="addSingleMsg_item50">
          <div class="itemName color666 fz14">预订条款</div>
          <div class="" style="width: 62%;">
            <el-select v-model="orderLaiyuanValue" placeholder="请选择">
              <el-option
                v-for="item in orderLaiyuan"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="addSingleMsg_item50">
          <span class="fz12" style="height: 17px;line-height: 17px;color:#cccccc;">注：提前预订时间，天数取值为整数，时间点的取值为0至23的整数</span>
        </div>
      </div>
      <div class="addSingleMsg_item clearfix" style="margin-bottom:6px;">
        <div class="addSingleMsg_item70">
          <div class="itemName color666 fz14" />
          <div class="color333 fz14">
            <el-radio v-model="radio" label="1">需要在</el-radio>
            <input type="text" class="dateNum">
            天
            <input type="text" class="dateNum">
            点前预订
          </div>
        </div>
      </div>
      <div class="addSingleMsg_item clearfix">
        <div class="addSingleMsg_item70">
          <div class="itemName color666 fz14" />
          <div class="color333 fz14">
            <el-radio v-model="radio" label="">需要在</el-radio>
            <input type="text" class="dateNum">
            天
            <input type="text" class="dateNum">
            点前预订
          </div>
        </div>
      </div>
      <div class="addSingleMsg_item clearfix" style="margin-bottom:6px;">
        <div class="addSingleMsg_item50">
          <div class="itemName color666 fz14">间数条款</div>
          <div class="" style="width: 62%;">
            <el-select v-model="orderLaiyuanValue" placeholder="请选择">
              <el-option
                v-for="item in orderLaiyuan"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="addSingleMsg_item clearfix">
        <div class="addSingleMsg_item70">
          <div class="itemName color666 fz14" />
          <div class="color333 fz14">
            最少预订
            <input type="text" class="dateNum">
            间
          </div>
        </div>
      </div>
      <div class="addSingleMsg_item clearfix" style="margin-bottom:6px;">
        <div class="addSingleMsg_item50">
          <div class="itemName color666 fz14">入住条款</div>
          <div class="" style="width: 62%;">
            <el-select v-model="orderLaiyuanValue" placeholder="请选择">
              <el-option
                v-for="item in orderLaiyuan"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="addSingleMsg_item clearfix" style="margin-bottom:6px;">
        <div class="addSingleMsg_item70">
          <div class="itemName color666 fz14" />
          <!-- <div class="color333 fz14"> -->
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="最少入住" />
          </el-checkbox-group>
          <span class="color333 fz14" style="margin-left:10px;">
            <input type="text" class="dateNum">
            天
          </span>
          <!-- </div> -->
        </div>
      </div>
      <div class="addSingleMsg_item clearfix" style="margin-bottom:6px;">
        <div class="addSingleMsg_item70">
          <div class="itemName color666 fz14" />
          <!-- <div class="color333 fz14"> -->
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="必须入住" />
          </el-checkbox-group>
          <span class="color333 fz14" style="margin-left:10px;">
            <input type="text" class="dateNum">
            天
          </span>
          <!-- </div> -->
        </div>
      </div>
      <div class="addSingleMsg_item clearfix" style="margin-bottom:6px;">
        <div class="addSingleMsg_item70">
          <div class="itemName color666 fz14" />
          <!-- <div class="color333 fz14"> -->
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="最多入住" />
          </el-checkbox-group>
          <span class="color333 fz14" style="margin-left:10px;">
            <input type="text" class="dateNum">
            天
          </span>
          <!-- </div> -->
        </div>
      </div>
      <div class="zhedang" />
      <div class="saveBtn">
        <span @click="saveSinglePrice">保存</span>
      </div>
    </div>
  </div>
</template>
<script>
const dateOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
export default {
  props: {
    selectDate: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      radio: '1',
      radioEnter: '1',
      checkList: ['最少入住'],
      orderLaiyuanValue: '',
      orderLaiyuan: [
        { value: '', label: '请选择' },
        { value: 1, label: '融e购' },
        { value: 2, label: '融e联' }
      ], startTime: '',
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
      checkAll: false,
      checkedDate: [],
      dates: dateOptions,
      isIndeterminate: true
    }
  },
  methods: {
    closeSetPrice() {
      this.$emit('closeSetPrice')
    },
    saveSinglePrice() {
      this.$emit('saveSinglePrice')
    },
    handleCheckAllChange(val) {
      this.checkedDate = val ? dateOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.dates.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.dates.length
    }
  }
}
</script>
<style>
.zhedang{
    width: 100%;
    height: 4px;
    background-color: #f6f6f6;
}
.el-radio__input.is-checked+.el-radio__label {
    color: #c8000a;
}
.el-radio__input.is-checked .el-radio__inner {
    border-color: #c8000a;
    background: #c8000a;
}
</style>

<style scoped>
.el-checkbox + .el-checkbox {
    margin-left: 0px;
    margin-bottom: 0px;
    /* padding: 0px 9px; */
    /* padding-right: 18px; */
}
.el-checkbox {
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    /* -webkit-user-select: none; */
    /* -moz-user-select: none;
    -ms-user-select: none; */
    user-select: none;
    padding-right: 10px;
}
.selectTime{
    width: 70%;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
.block{
    width: 45%;
    display: inline-block;
}
.saveBtn{
    margin-top: 4px;
    background-color: #ffffff;
    height: 80px;
    line-height: 80px;
    text-align: center;
}
.saveBtn>span{
    display: inline-block;
	width: 120px;
    height: 38px;
    line-height: 38px;
    cursor: pointer;
	background-color: #c8000a;
    border-radius: 10px;
    font-size: 16px;
    text-align: center;
    color:#ffffff;
}
.addSingleContent{
    width: 40%;
    height: 100%;
    min-width: 570px;
    position: fixed;
    top: 0px;
    right: 0px;
    box-shadow:  -1px 0px 8px #666666;
    background-color: #f6f6f6;
}
.addSingleTitle{
    width: 100%;
    height: 40px;
    line-height: 40px;
	background-color: #eeeeee;
    border-radius: 4px 4px 0px 0px;
}
.addSingleTitle_l{
    float: left;
    padding-left: 10px;
}
.close{
    float: right;
    height: 40px;
    line-height: 40px;
    width: 40px;
    text-align: center;
    color:#666666;
    cursor: pointer;
}
.addSingleMsg{
    height: 100%;
    overflow-y: scroll;
    background-color: #ffffff;
}
.addSingleMsg_item50{
    width: 50%;
    display: flex;
}
.addSingleMsg_item70{
    width: 70%;
    display: flex;
}
.itemName{
    width: 100px;
    text-align: right;
    padding-right: 12px;
}
.addSingleMsg{
    padding: 20px 0px;
}
.addSingleMsg_item50{
    float: left;
}
.addSingleMsg_item{
    height: 34px;
    line-height: 34px;
    margin-bottom: 20px;
}
.item_inp{
    border-radius: 4px;
    border: solid 1px #e5e5e5;
    padding: 0px 0px 0px 4px;
}
.dateNum{
    width: 50px;
    height: 30px;
    padding-left: 4px;
    line-height: 30px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #e5e5e5;
}
</style>
