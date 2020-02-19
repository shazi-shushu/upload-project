<template>
  <div class="waperContentAdd">
    <div class="addAdvMsgItem">
      <div class="addAdvMsgItemName">
        <span class="red">* </span> 广告频道名称
      </div>
      <div class="addAdvMsgItemCon">
        <el-select v-model="channeValue" style="width:100%" placeholder="请选择" @change="changeChannel">
          <el-option
            v-for="item in channeArr"
            :key="item.channelId"
            :label="item.channelName"
            :value="item.channelId"
          />
        </el-select>
      </div>
    </div>
    <div class="addAdvMsgItem">
      <div class="addAdvMsgItemName">
        <span class="red">* </span> 广告位名称
      </div>
      <div class="addAdvMsgItemCon">
        <el-select v-model="pointValue" style="width:100%" placeholder="请选择">
          <el-option
            v-for="item in pointArr"
            :key="item.pointId"
            :label="item.pointName"
            :value="item.pointId"
          />
        </el-select>
      </div>
    </div>
    <!-- 广告标题 -->
    <div class="addAdvMsgItem">
      <div class="addAdvMsgItemName">
        <span class="red">* </span> 广告标题
      </div>
      <div class="addAdvMsgItemCon">
        <input ref="advertTitle" v-model="param.advertTitle" type="text" @keyup="maxNum(param.advertTitle,55,'advertTitle')">
      </div>
    </div>
    <!-- 副标题1 -->
    <div class="addAdvMsgItem">
      <div class="addAdvMsgItemName">
        副标题1
      </div>
      <div class="addAdvMsgItemCon">
        <input ref="title1" v-model="param.title1" type="text" @keyup="maxNum(param.title1,55,'title1')">
      </div>
    </div>
    <!-- 副标题2 -->
    <div class="addAdvMsgItem">
      <div class="addAdvMsgItemName">
        副标题2
      </div>
      <div class="addAdvMsgItemCon">
        <input ref="title2" v-model="param.title2" type="text" @keyup="maxNum(param.title2,55,'title2')">
      </div>
    </div>
    <!-- * 开始时间 -->
    <div class="addAdvMsgItem">
      <div class="addAdvMsgItemName">
        <span class="red">* </span> 开始时间
      </div>
      <div class="addAdvMsgItemCon">
        <div style="diaplay:inline-block;width:47%;    display: inline-block;">
          <el-date-picker
            v-model="startTime"
            style="width:100%"
            type="date"
            placeholder="选择开始日期"
            :picker-options="pickerOptionsStart"
          />
        </div>
        <div style="diaplay:inline-block;width:47%; display: inline-block;margin-left:4%">
          <el-time-picker
            v-model="startTimeVal"
            style="width:100%"
            placeholder="任意时间点"
          />
        </div>
      </div>
    </div>
    <!-- * * 结束时间 -->
    <div class="addAdvMsgItem">
      <div class="addAdvMsgItemName">
        <span class="red">* </span> 结束时间
      </div>
      <div class="addAdvMsgItemCon">
        <div style="diaplay:inline-block;width:47%;    display: inline-block;">
          <el-date-picker
            v-model="endTime"
            style="width:100%"
            type="date"
            placeholder="选择结束日期"
            :picker-options="pickerOptionsEnd"
          />
        </div>
        <div style="diaplay:inline-block;width:47%; display: inline-block;margin-left:4%">
          <el-time-picker
            v-model="endTimeVal"
            style="width:100%"
            placeholder="任意时间点"
          />
        </div>
      </div>
    </div>
    <!-- 跳转URL -->
    <div class="addAdvMsgItem">
      <div class="addAdvMsgItemName">
        <span class="red">* </span> 跳转URL
      </div>
      <div class="addAdvMsgItemCon">
        <input ref="returnUrl" v-model="param.returnUrl" type="text" @keyup="maxNum(param.returnUrl,200,'returnUrl')">
      </div>
    </div>
    <!-- 排序值 -->
    <div class="addAdvMsgItem">
      <div class="addAdvMsgItemName">
        <span class="red">* </span> 排序值
      </div>
      <div class="addAdvMsgItemCon">
        <input ref="sort" v-model="param.sort" type="number" style="width:40%;" @keyup="maxNum(param.sort,5,'sort')">
      </div>
    </div>
    <!-- 状态 -->
    <div class="addAdvMsgItem">
      <div class="addAdvMsgItemName">
        <span class="red">* </span> 状态
      </div>
      <div class="addAdvMsgItemCon">
        <el-select v-model="roomTypeValue" style="width:40%" placeholder="请选择">
          <el-option
            v-for="item in roomType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <!-- 上传图片 -->
    <div class="addAdvMsgItem">
      <div class="addAdvMsgItemName">
        <span class="red">* </span> 上传图片
      </div>
      <div class="addAdvMsgItemCon clearfix">
        <div v-if="allowAddImg" class="img_box file">
          <input style="width:100%" type="file" accept="image/*" multiple="multiple" @change="changeImg($event)">
          <div class="filter">选择文件</div>
        </div>
        <div style="position: absolute;top: 0px;left: 100px;">
          <span class="upImgMsg">（尺寸 750px * 318px 以上的.jpg.png格式图)</span>
        </div>
        <div style=" padding-bottom: 0px;width: 187px;height: 112px; background-color: #f2f2f2;">
          <div v-for="(item,index) in imgArr" :key="index" class="img_box">
            <div class="img_show_box" style="position:relative">
              <img style=" padding-bottom: 0px;width: 187px;height: 112px;" :src="item" alt="">
              <!-- <i class="img_delete" @click="deleteImg(index)" /> -->
              <!-- <svg-icon class-name="Close-icon img_delete" icon-class="Close" @click="deleteImg(index)"/> -->
              <!-- <i class="img_delete" @click="imgArr.splice(index,1)"></i> -->
            </div>
          </div>
          <!-- <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            list-type="picture"
          >  -->
          <!-- <el-button style="position: absolute; top: 0px;left: 0px;color: #ffffff; background-color: #c8000a;border:1px solid #c8000a;cursor:pointer;" size="small" type="primary">点击上传</el-button> -->
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          <!-- </el-upload> -->
        </div>
      </div>
    </div>
    <div style="height:4px;background-color:#f6f6f6" />
    <div class="saveCon">
      <span class="saveBtn" @click="addAdv">保存</span>
    </div>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { getMiniteDate, getGangDate } from '@/utils/validate'
import axios from 'axios'
import { getAdvertByIdSingle, getAllAdvertChannelName, getAdvertPointByIdSingle } from '@/api/adv/adv'
export default {
  data() {
    return {
      imgData: '',
      imgArr: [],
      imgSrc: '',
      allowAddImg: true,
      roomTypeValue: '',
      // 下拉选项：请选择、上架、下架
      roomType: [
        // { value: '', label: '请选择' },
        { value: 0, label: '启用' },
        { value: 1, label: '停用' }
      ],
      startTimeVal: '',
      endTimeVal: '',
      startTime: '',
      endTime: '',
      channeValue: '',
      channeArr: [],
      pointValue: '',
      pointArr: [],
      param: {
        files: '' // 文件
      },
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
      // {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      fileList: [{ name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  mounted() {
    this.init()
    this.getAllChanne()
    this.getAdvertPoint()
  },
  methods: {
    maxNum(val, num, name) {
      // console.log(val)
      // console.log(this.$refs[name].value)
      const reg = /^([1-9]\d*|[0]{1,1})$/
      if (name === 'sort') {
        if (!reg.test(val)) {
          this.$refs[name].value = ''
          this.param[name] = ''
          this.$message({
            message: '必须输入数字',
            type: 'error'
          })
        }
      }
      if (val.length > num) {
        this.$refs[name].value = val.substring(0, num)
        this.param[name] = this.$refs[name].value
        this.$message({
          message: '输入字段不能超过' + num,
          type: 'error'
        })
      }
    },
    init() {
      const obj = {
        advertId: this.$route.query.advertId
      }
      getAdvertByIdSingle(obj).then((res) => {
        console.log('getAdvertByIdSingle')
        console.log(res)
        this.param = { ...res.data.data }
        // this.startTimeVal = res.data.data
        // this.endTimeVal =  res.data.data
        this.startTime = res.data.data.startTime
        this.endTime = res.data.data.endTime
        this.endTimeVal = res.data.data.endTime
        this.startTimeVal = res.data.data.startTime
        this.channeValue = res.data.data.channelId
        this.pointValue = res.data.data.pointId
        this.roomTypeValue = res.data.data.deleteFlag
        this.imgArr = []
        this.imgArr.push('https://' + res.data.data.pictureUrl)
        // this.pointArr = []
      })
    },
    getAllChanne() {
      getAllAdvertChannelName().then((res) => {
        this.channeArr = res.data.data
        this.channeArr.unshift({ 'channelId': '', 'channelName': '请选择' })
      })
    },
    getAdvertPoint() {
      const obj = {
        channelId: this.$route.query.channelId
      }
      getAdvertPointByIdSingle(obj).then((res) => {
        this.pointArr = res.data.data
        this.pointArr.unshift({ 'pointId': '', 'pointName': '请选择' })
      })
    },
    changeChannel(val) {
      // console.log(val)
      const obj = {
        channelId: val
      }
      this.pointValue = ''
      this.pointArr = []
      // 点击广告频道名称获取广告位名称
      getAdvertPointByIdSingle(obj).then((res) => {
        this.pointArr = res.data.data
        this.pointArr.unshift({ 'pointId': '', 'pointName': '请选择' })
      })
    },
    addAdv(event) {
      // return this.mustInp(this.param)
      // console.log('!this.mustInp(this.param)')
      // console.log(!this.mustInp(this.param))
      if (!this.mustInp(this.param)) {
        return false
      }
      const newEndTime = getGangDate(this.endTime) + ' ' + getMiniteDate(this.endTimeVal)
      const newStartTime = getGangDate(this.startTime) + ' ' + getMiniteDate(this.startTimeVal)
      // console.log(newEndTime)
      // console.log()
      const redisKey = getToken()
      // return false
      const paramFrom = new FormData() // 创建form对象
      if (this.param.files) {
        paramFrom.append('files', this.param.files[0])
        paramFrom.append('pictureUrl', '')
      } else {
        paramFrom.append('files', '')
        paramFrom.append('pictureUrl', this.param.pictureUrl)
      } // 通过append向form对象添加数据
      paramFrom.append('advertName', this.param.advertName) // 添加form表单中其他数据
      paramFrom.append('advertTitle', this.param.advertTitle)
      paramFrom.append('channelId', this.channeValue)
      paramFrom.append('deleteFlag', this.roomTypeValue)
      paramFrom.append('endTime', newEndTime)
      paramFrom.append('redisKey', redisKey)
      paramFrom.append('pointId', this.pointValue)
      paramFrom.append('returnUrl', this.param.returnUrl)
      paramFrom.append('sort', this.param.sort)
      paramFrom.append('startTime', newStartTime)
      paramFrom.append('title1', this.param.title1)
      paramFrom.append('title2', this.param.title2)
      paramFrom.append('advertId', this.param.advertId)
      // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      //       修改广告接口 可测试
      axios.post(this.$store.state.user.url + '/syAdvert/updateAdvert', paramFrom, config)
        .then(response => {
          console.log(response)
          if (response.data.code === 200) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.push({ 'path': '/advMaintenanceList' })
          } else {
            this.$message({
              message: '保存失败',
              type: 'error'
            })
          }
        })
    },
    mustInp(val) {
      // console.log(val)
      // console.log(this.startTime)
      // console.log(this.startTimeVal)
      // console.log(this.imgArr)
      // const newEndTime = getGangDate(this.endTime) + ' ' + getMiniteDate(this.endTimeVal)
      // const newStartTime = getGangDate(this.startTime) + ' ' + getMiniteDate(this.startTimeVal)
      if (this.channeValue === '') {
        this.$message({
          message: '请选择广告频道名称',
          type: 'error'
        })
        return false
      } else if (this.pointValue === '') {
        this.$message({
          message: '请选择广告位名称',
          type: 'error'
        })
        return false
      } else if (val.advertTitle === '') {
        this.$message({
          message: '请输入广告标题',
          type: 'error'
        })
        return false
      } else if (this.startTime === null || this.startTimeVal === null) {
        this.$message({
          message: '请选择开始时间',
          type: 'error'
        })
        return false
      } else if (this.endTime === null || this.endTimeVal === null) {
        this.$message({
          message: '请选择结束时间',
          type: 'error'
        })
        return false
      } else if (val.returnUrl === '') {
        this.$message({
          message: '请输入跳转URL',
          type: 'error'
        })
        return false
      } else if (val.sort === '') {
        this.$message({
          message: '请输入排序值',
          type: 'error'
        })
        return false
      } else if (isNaN(val.sort)) {
        this.$message({
          message: '请输入正确格式排序值',
          type: 'error'
        })
        return false
      } else if (this.roomTypeValue === '') {
        this.$message({
          message: '请选择状态',
          type: 'error'
        })
        return false
      } else if (this.imgArr.length === 0) {
        this.$message({
          message: '请选择上传图片',
          type: 'error'
        })
        return false
      }
      return true
    },
    changeImg: function(e) {
      var _this = this
      var imgLimit = 1024
      var files = e.target.files
      var image = new Image()

      if (files.length > 0) {
        var dd = 0
        // var timer = setInterval(function() {
        if (files.item(dd).type !== 'image/png' && files.item(dd).type !== 'image/jpeg') {
          this.$message({
            message: '请上传正确格式图片',
            type: 'error'
          })
          return false
        }
        // 目前不限制上传图片大小
        if (files.item(dd).size > imgLimit * 1024000) {
          // to do sth
        } else {
          _this.param.files = files
          image.src = window.URL.createObjectURL(files.item(dd))
          image.onload = function() {
            // 默认按比例压缩
            var w = image.width
            var h = image.height
            // console.log(w)
            if (w < 750 || h < 318) {
              _this.$message({
                message: '请上传750px * 318px以上图片',
                type: 'error'
              })
              return false
            }
            var scale = w / h
            w = 200
            h = w / scale
            // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
            var quality = 0.7
            // 生成canvas
            var canvas = document.createElement('canvas')
            var ctx = canvas.getContext('2d')
            // 创建属性节点
            var anw = document.createAttribute('width')
            anw.nodeValue = w
            var anh = document.createAttribute('height')
            anh.nodeValue = h
            canvas.setAttributeNode(anw)
            canvas.setAttributeNode(anh)
            ctx.drawImage(image, 0, 0, w, h)
            var ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()// 图片格式
            var base64 = canvas.toDataURL('image/' + ext, quality)
            // 回调函数返回base64的值
            // if (_this.imgArr.length <= 4) {
            _this.imgArr.unshift('')
            // _this.imgArr.splice(0, 1, base64)// 替换数组数据的方法，此处不能使用：this.imgArr[index] = url;
            _this.imgArr = []
            _this.imgArr.push(base64)
            // console.log(_this.imgArr)
            // if (_this.imgArr.length >= 5) {
            //   _this.allowAddImg = false
            // }
            // }
          }
        }
        // if (dd < files.length - 1) {
        //   dd++
        // } else {
        //   clearInterval(timer)
        // }
        // }, 1000)
      }
    },
    deleteImg: function(index) {
      this.imgArr.splice(index, 1)
      if (this.imgArr.length < 5) {
        this.allowAddImg = true
      }
    }
  }
}
</script>
<style scoped>
  .waperContentAdd{
    /* padding: 24px 24px 50px 24px; */
    background-color: #ffffff;
    min-width: 1200px;
    padding-top: 25px;
  }
  .addAdvMsgItem{
      display: flex;
      margin-bottom: 25px;
  }
  .addAdvMsgItemName{
      width: 120px;
      margin-right: 10px;
      text-align: right;
      color: #333333;
      font-size: 14px;
      height: 34px;
      line-height: 34px;
  }
  .addAdvMsgItemCon{
      width: 30%;
      max-width: 502px;
      /* height: 34px;
      line-height: 34px; */
      position: relative;
  }
  .addAdvMsgItemCon input{
      width: 100%;
      max-width: 502px;
      height: 34px;
      line-height: 34px;
      border-radius: 4px;
      padding-left: 6px;
      font-size: 14px;
      border: 1px solid #dfdfdf;
      color: #666666;
  }
  .upImgMsg{
      color: #666666;
      font-size: 12px;
      /* margin-left: 100px; */
      height: 34px;
      line-height: 34px;
  }
  .saveCon{
      background-color: #ffffff;
      text-align: center;
      height: 70px;
      line-height: 70px;
  }
  .saveBtn{
    display: inline-block;
    cursor: pointer;
    width: 100px;
    height: 34px;
    line-height: 34px;
    color: #ffffff;
    background-color: #c8000a;
    border-radius: 4px;
  }
.file {
    position: relative;
    display: inline-block;
    background: #c8000a;
    border: 1px solid #c8000a;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #ffffff;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    /* background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none; */
}
.img_delete{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
