<template>
  <div class="addServices_content">
    <!-- title名称 -->
    <title-name :item="titleName" />
    <div class="addServices_msg">
      <div class="addServices_msg_item clearfix">
        <div class="addServices_msg_item_name"><span class="red">*</span> 所属酒店房型</div>
        <div class="addServices_msg_item_con20"><input type="text" placeholder="请输入酒店名称"></div>
        <div class="addServices_msg_item_conSel">
          <el-select v-model="roomTypeValue" placeholder="请选择">
            <el-option
              v-for="item in roomType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="addServices_msg_item clearfix">
        <div class="addServices_msg_item_name"> <span class="red">*</span> 酒店ID</div>
        <div class="addServices_msg_item_con"><input type="text" disabled placeholder="系统自动获取"></div>
      </div>
      <div class="addServices_msg_item clearfix">
        <div class="addServices_msg_item_name"><span class="red">*</span> 房型ID</div>
        <div class="addServices_msg_item_con"><input type="text" disabled placeholder="系统自动获取"></div>
      </div>
      <div class="addServices_msg_item clearfix">
        <div class="addServices_msg_item_name"><span class="red">*</span> 房型服务名称</div>
        <div class="addServices_msg_item_con"><input type="text" placeholder="如：双人房  无早  不可取消"></div>
      </div>
      <div class="addServices_msg_item clearfix">
        <div class="addServices_msg_item_name"><span class="red">*</span> 状态</div>
        <div class="addServices_msg_item_conS">
          <el-select v-model="roomTypeValue" class="select100" placeholder="请选择">
            <el-option
              v-for="item in roomType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="addServices_msg_item clearfix">
        <div class="addServices_msg_item_name"><span class="red">*</span> 支付方式</div>
        <div class="addServices_msg_item_conS">
          <el-select v-model="roomTypeValue" class="select100" placeholder="请选择">
            <el-option
              v-for="item in roomType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="addServices_msg_item clearfix">
        <div class="addServices_msg_item_name"><span class="red">*</span> 早餐类型</div>
        <div class="addServices_msg_item_con160">
          <el-select v-model="roomTypeValue" class="select100" placeholder="请选择">
            <el-option
              v-for="item in roomType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="addServices_msg_item_con100">
          <el-select v-model="roomTypeValue" class="select100" placeholder="请选择">
            <el-option
              v-for="item in roomType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="color333 fz14" style="height:34px;line-height:34px;width: 32px;float:left;text-align: center;">份</div>
      </div>
      <div class="addServices_msg_item clearfix">
        <div class="addServices_msg_item_name"><span class="red">*</span> 取消政策</div>
        <div class="addServices_msg_item_con160">
          <el-select v-model="cancelValue" class="select100" placeholder="请选择">
            <el-option
              v-for="item in cancelType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="color333 fz14" style="height:34px;line-height:34px;float:left;text-align: center;color:#c1c1c1;margin-left:20px;">注：当选择条件取消时，请在设置价格页面按日期设置每天的取消条件</div>
      </div>
      <div v-if="cancelValue == '1'" class="addServices_msg_item clearfix">
        <div class="addServices_msg_item_name" />
        <div class="addServices_msg_item_contex">
          <textarea id="bcsm" style="resize:none;" name="" cols="30" rows="10" />
        </div>
      </div>
      <div class="addServices_msg_item clearfix">
        <div class="addServices_msg_item_name">补充说明</div>
        <div class="addServices_msg_item_contex">
          <textarea id="bcsm" style="resize:none;" name="" cols="30" rows="10" />
        </div>
      </div>
    </div>
    <!-- 关闭按钮 -->
    <close-btn />
  </div>
</template>
<script>
import titleName from '@/components/titleName/titleName'
import closeBtn from '@/components/closeBtn/closeBtnBottom'
export default {
  name: 'AddServices',
  components: {
    titleName,
    closeBtn
  },
  data() {
    return {
      titleName: '添加房型服务 — 酒店名称  房型服务',
      roomTypeValue: '',
      // 下拉选项：请选择、上架、下架
      roomType: [
        { value: '', label: '请选择' },
        { value: 0, label: '上架' },
        { value: 1, label: '下架' }
      ],
      cancelValue: '',
      // 下拉选项：请选择、上架、下架
      cancelType: [
        { value: '', label: '请选择' },
        { value: 0, label: '可取消' },
        { value: 1, label: '不可取消' }
      ]
    }
  },
  methods: {
    changeCancelType(val) {
      console.log(val)
      console.log(this.cancelValue)
    }
  }
}
</script>
<style scoped>
.addServices_content{
    padding: 24px 24px 50px 24px;
    background-color: #fbfbfb;
    min-width: 1200px;
}
.addServices_msg{
    background-color: #ffffff;
    padding: 20px 0px;
    margin-bottom: 4px;
}
.addServices_msg_item{
    width: 80%;
    margin-bottom: 10px;
}
.addServices_msg_item_name{
    float: left;
    width: 120px;
    height: 34px;
    line-height: 34px;
    text-align: right;
    margin-right: 20px;
    color: #666666;
    font-size: 14px;
}
.addServices_msg_item_con{
    float: left;
    width: 40%;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    border: solid 1px #dddddd;
    text-align: center;
}
.addServices_msg_item_conS{
    float: left;
    width: 40%;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
}
.addServices_msg_item_con160{
    float: left;
    width: 20%;
    max-width: 160px;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
}
.addServices_msg_item_con100{
    float: left;
    width: 10%;
    max-width: 100px;
    height: 34px;
    line-height: 34px;
    margin-left: 20px;
    border-radius: 4px;
}
.addServices_msg_item_contex{
    float: left;
    /* width: 10%; */
}
#bcsm{
    width: 350px;
	height: 68px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #dddddd;
}
.select100{
    width: 100%;
}
.addServices_msg input{
    width: 99%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    vertical-align: text-bottom;
    padding: 0px 0px 0px 4px;
}
.addServices_msg_item_con20{
    float: left;
    width: 29%;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    border: solid 1px #dddddd;
    margin-right: 1%;
}
.addServices_msg_item_conSel{
    float: left;
    width: 10%;
    height: 32px;
    line-height: 32px;
}
</style>
