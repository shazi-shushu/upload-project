<template>
  <div class="pic_common">
    <!-- 内容区域 -->
    <div class="pic_common_body clearfix">
      <ul>
        <li v-for="(item,index) in picList" :key="index">
          <div class="pic_common_body_img">
            <span class="pic_common_body_type">{{ item.name | navFilter }}</span>
            <img ref="imgWidth" class="imgbox" :src="item.imgSrc" alt="">
          </div>
          <div class="pic_common_body_show">
            <el-select v-model="item.name" disabled placeholder="请选择">
              <el-option
                v-for="jtem in item.list"
                :key="jtem.value"
                :label="jtem.label"
                :value="jtem.value"
              />
            </el-select>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    navFilter: function(val) {
      //   1-房型 2-外景 3-大堂 4-设施 5-其它 6-宴会厅 7-会议厅 8-门票 9-其它服务
      const obj = { 1: '房型', 2: '外景', 3: '大堂', 4: '设施', 5: '其它', 6: '宴会厅', 7: '会议厅', 8: '门票', 9: '其它服务' }
      return obj[val]
    }
  },
  props: {
    imgLists: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      picList: [
        // {
        //     name: '房型',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // },
        // {
        //     name: '房型',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // },
        // {
        //     name: '外景',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // },
        // {
        //     name: '外景',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // },
        // {
        //     name: '其他',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // },
        // {
        //     name: '其他',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // },
        // {
        //     name: '大堂',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // },
        // {
        //     name: '大堂',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // },
        // {
        //     name: '大堂',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // },
        // {
        //     name: '设施',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // },
        // {
        //     name: '外景',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // },
        // {
        //     name: '其他',
        //     // type: '',
        //     imgSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        //     list: [
        //         {value: '', label: '请选择'},
        //         {value: 0, label: '房型'},
        //         {value: 1, label: '设施'},
        //         {value: 2, label: '大堂'},
        //         {value: 3, label: '其他'}
        //     ]
        // }
      ]
    }
  },
  watch: {
    imgLists: {
      handler(newValue, oldValue) {
        // console.log('newValue')
        // console.log(newValue)
        // console.log(oldValue)
        this.picList = []
        // 1-房型 2-外景 3-大堂 4-设施 5-其它 6-宴会厅 7-会议厅 8-门票 9-其它服务
        newValue.forEach(element => {
          const obj = Object.assign(element, {
            name: element.imageType,
            imgSrc: element.url,
            list: [
              // {value: '', label: '请选择'},
              { value: 1, label: '房型' },
              { value: 2, label: '外景' },
              { value: 3, label: '大堂' },
              { value: 4, label: '设施' },
              { value: 5, label: '其它' },
              { value: 6, label: '宴会厅' },
              { value: 7, label: '会议厅' },
              { value: 8, label: '门票' },
              { value: 9, label: '其它服务' }
            ]
          })
          this.picList.push(obj)
        })
        this.init()
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // var imgWidth = document.getElementsByClassName('imgbox')[0].style.offsetWidth;
      // console.log(document.getElementsByClassName('pic_common_body_img'))
      console.log(this.$refs)
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
    padding: 20px 0px;
    margin-right: 20px;
    width: 12%;
}
.pic_common_body_img{
    width: 100%;
    position: relative;
    margin-bottom: 6px;
}
.pic_common_body_img img{
    width: 100%;
    height: 9vw;
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
