<template>
  <div class="pic_common">
    <!-- 内容区域 -->
    <div>
      <ul>
        <li v-for="(item,index) in picList" :key="index">
          <div class="type_name">{{ item.type }}（ {{ item.content.length }} ）</div>
          <div class="pic_common_body clearfix">
            <ul>
              <li v-for="(ltem,indexl) in item.content" :key="indexl">
                <div class="pic_common_body_img">
                  <span class="pic_common_body_type">{{ ltem.name | nameTYpe }}</span>
                  <img :src="ltem.imgSrc" alt="">
                </div>
                <div class="pic_common_body_show">
                  <el-select v-model="ltem.name" disabled placeholder="请选择">
                    <el-option
                      v-for="jtem in ltem.list"
                      :key="jtem.value"
                      :label="jtem.label"
                      :value="jtem.value"
                    />
                  </el-select>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <!-- 分页区域 -->
    <div class="page_msg">
      <el-pagination
        :total="totalPages"
        :current-page="pageNum"
        layout="prev, pager, next,  jumper, total, sizes "
        @current-change="changeList"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    nameTYpe(val) {
      console.log(isNaN(val))
      var arr = { 0: '房型', 1: '设施', 2: '大堂', 3: '其他' }
      return isNaN(val) ? val : arr[val]
    }
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      totalPages: 20,
      picList: [
        {
          type: '大床房',
          content: [
            {
              name: '房型',
              // type: '',
              imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
              list: [
                { value: '', label: '请选择' },
                { value: 0, label: '房型' },
                { value: 1, label: '设施' },
                { value: 2, label: '大堂' },
                { value: 3, label: '其他' }
              ]
            },
            {
              name: '房型',
              // type: '',
              imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
              list: [
                { value: '', label: '请选择' },
                { value: 0, label: '房型' },
                { value: 1, label: '设施' },
                { value: 2, label: '大堂' },
                { value: 3, label: '其他' }
              ]
            },
            {
              name: '房型',
              // type: '',
              imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
              list: [
                { value: '', label: '请选择' },
                { value: 0, label: '房型' },
                { value: 1, label: '设施' },
                { value: 2, label: '大堂' },
                { value: 3, label: '其他' }
              ]
            }
          ]
        },
        {
          type: '商务套房',
          content: [
            {
              name: '房型',
              // type: '',
              imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
              list: [
                { value: '', label: '请选择' },
                { value: 0, label: '房型' },
                { value: 1, label: '设施' },
                { value: 2, label: '大堂' },
                { value: 3, label: '其他' }
              ]
            },
            {
              name: '房型',
              // type: '',
              imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
              list: [
                { value: '', label: '请选择' },
                { value: 0, label: '房型' },
                { value: 1, label: '设施' },
                { value: 2, label: '大堂' },
                { value: 3, label: '其他' }
              ]
            },
            {
              name: '房型',
              // type: '',
              imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
              list: [
                { value: '', label: '请选择' },
                { value: 0, label: '房型' },
                { value: 1, label: '设施' },
                { value: 2, label: '大堂' },
                { value: 3, label: '其他' }
              ]
            },
            {
              name: '房型',
              // type: '',
              imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
              list: [
                { value: '', label: '请选择' },
                { value: 0, label: '房型' },
                { value: 1, label: '设施' },
                { value: 2, label: '大堂' },
                { value: 3, label: '其他' }
              ]
            },
            {
              name: '房型',
              // type: '',
              imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
              list: [
                { value: '', label: '请选择' },
                { value: 0, label: '房型' },
                { value: 1, label: '设施' },
                { value: 2, label: '大堂' },
                { value: 3, label: '其他' }
              ]
            },
            {
              name: '房型',
              // type: '',
              imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
              list: [
                { value: '', label: '请选择' },
                { value: 0, label: '房型' },
                { value: 1, label: '设施' },
                { value: 2, label: '大堂' },
                { value: 3, label: '其他' }
              ]
            },
            {
              name: '房型',
              // type: '',
              imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
              list: [
                { value: '', label: '请选择' },
                { value: 0, label: '房型' },
                { value: 1, label: '设施' },
                { value: 2, label: '大堂' },
                { value: 3, label: '其他' }
              ]
            },
            {
              name: '房型',
              // type: '',
              imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
              list: [
                { value: '', label: '请选择' },
                { value: 0, label: '房型' },
                { value: 1, label: '设施' },
                { value: 2, label: '大堂' },
                { value: 3, label: '其他' }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    changeList(val) {
      // console.log(this.hodelOrderList)
      // console.log(val)
    //   this.param.pageNo = val
    //   this.getList(this.param)
    },
    handleSizeChange(val) {
    //   this.param.pageSize = val
    //   this.getList(this.param)
    }

  }
}
</script>
<style scoped>
.pic_common_body{
    width: 100%;
}
.pic_common_body ul li{
    float: left;
    padding: 10px 0px 10px 0px;
    margin-right: 20px;
    width: 12%;
}
.type_name{
    padding: 10px 0px 0px 0px;
}
.pic_common_body_img{
    width: 100%;
    position: relative;
    margin-bottom: 6px;
}
.pic_common_body_img img{
    width: 100%;
    height: 100%;
    border-radius: 4px;
    max-width: 190px;
    max-height: 190px;
    /* position: relative; */
}
.pic_common_body_type{
    position: absolute;
    bottom: 8px;
    right: 8px;;
}
.pic_common_body_show{
    height: 32px;
    line-height: 32px;
    color: #333333;
    font-size: 14px;
}
.page_msg{
    text-align: right;
    padding: 20px 0px 40px 0px;
    background-color: #ffffff;
    color: #666666;
}
</style>
