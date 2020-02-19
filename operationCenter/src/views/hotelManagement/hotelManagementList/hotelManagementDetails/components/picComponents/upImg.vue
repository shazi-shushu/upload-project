<template>
  <div class="upImgContent">
    <div class="upImgBox">
      <!-- title -->
      <div class="upImgBoxTitle">
        <span>图片上传</span>
        <span class="closeBtn" @click="closeUpImg">X</span>
      </div>
      <!-- upImgBtn -->
      <div class="upImgBoxChooseCont">
        <span class="color666 fz14"> <span class="red">*</span> 选择图片</span>
        <!-- <a href="javascript:;" class="file">选择文件
          <input ref="inputer" type="file" multiple accept="image/png,image/jpeg,image/gif,image/jpg" @change="selectImg">
        </a> -->
        <span class="color999 fz12" style="margin-left:110px;">每次最多支持20张图片上传</span>
      </div>
      <!-- img type -->
      <div class="chooseTypeContent clearfix">
        <div class="color666 fz14">
          <span class="red">*</span>图片类型
        </div>
        <div class="chooseItem">
          <el-select v-model="hotelValue" class="content_address_item" placeholder="请选择">
            <el-option
              v-for="item in hotelTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="chooseItem">
          <el-select v-model="hotelValue" class="content_address_item" placeholder="请选择">
            <el-option
              v-for="item in hotelTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <!-- 已上传图片 -->
      <div class="imgListContent">
        <div class="imgListName">已上传图片</div>
        <div class="imgList clearfix">
          <el-upload
            ref="upload"
            class="upload-demo"
            :multiple="true"
            :limit="20"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture"
          >
            <el-button slot="trigger" style="position: absolute;top: 58px;left: 89px; background-color: #ffffff;color: #c8000a; border: 1px solid #c5696e;width: 98px;" size="small" type="primary">选取文件</el-button>

            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
      </div>
      <div class="saveContent">
        <el-button style="width: 96px; height: 34px;background-color: #c8000a; border-radius: 10px;color: #ffffff; border: 1px solid #c8000a;" size="small" type="success" @click="submitUpload">保存</el-button>
        <!-- <span class="saveBtn">保存</span> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hotelValue: '',
      // 酒店状态状态：
      hotelTypes: [
        { value: '', label: '请选择' },
        { value: 0, label: '上架' },
        { value: 1, label: '下架' }
      ],
      imgListArr: [
        // {
        //     name: '',
        //     imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        // },
        // {
        //     name: '',
        //     imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        // },
        // {
        //     name: '',
        //     imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        // },
        // {
        //     name: '',
        //     imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        // },
        // {
        //     name: '',
        //     imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        // },
        // {
        //     name: '',
        //     imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        // },
        // {
        //     name: '',
        //     imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        // },
        // {
        //     name: '',
        //     imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        // },
        // {
        //     name: '',
        //     imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        // },
        // {
        //     name: '',
        //     imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        // }
      ],
      imgLen: 0,
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    delImg(index) {
      this.imgListArr.splice(index, 1)
    },
    closeUpImg() {
      this.$emit('closeUpImg')
    },
    selectImg() {
      const inputDOM = this.$refs.inputer
      // 通过DOM取文件数据
      this.fil = inputDOM.files
      // console.log(this.fil)
      const oldLen = this.imgLen
      const len = this.fil.length + oldLen
      if (len > 20) {
        this.$message.error('最多可上传20张，您还可以上传' + (20 - oldLen) + '张')
        return false
      }
      for (let i = 0; i < this.fil.length; i++) {
        // let size = Math.floor(this.fil[i].size / 1024);
        // if (size > 5*1024*1024) {
        //     this.$message.error('请选择5M以内的图片！');
        //     return false
        // }
        this.imgLen++
        this.$set(this.imgListArr, this.fil[i].name + '?' + new Date().getTime() + i, this.fil[i])
      }
      console.log(this.imgListArr)
    },
    getObjectURL(file) {
      console(11111122432)
      console(file)
      var url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      console.log('url')
      console.log(file)
      return url
    }
  }
}
</script>
<style>
.imgList .el-upload-list--picture .el-upload-list__item {
    overflow: hidden;
    z-index: 0;
    background-color: #fff;
    /* border: 1px solid #c0ccda; */
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* margin-top: 10px; */
    padding: 0px 0px 0px 80px;
    height: 110px;
    width: 110px;
    margin-right: 15px;
    margin-bottom: 15px;
    float: left;
}
.imgList .el-upload-list--picture .el-upload-list__item-status-label {
    z-index: 11;
    position: absolute;
    right: -17px;
    top: -7px;
    width: 46px;
    height: 26px;
    background: #13ce66;
    text-align: center;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-box-shadow: 0 1px 1px #ccc;
    box-shadow: 0 1px 1px #ccc;
}
.imgList .el-upload-list__item .el-icon-close {
    /* display: none; */
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    opacity: .75;
    z-index: 1105;
    color: #606266;
}
.imgList .el-upload-list--picture .el-upload-list__item-thumbnail {
    vertical-align: middle;
    display: inline-block;
    width: 110px;
    height: 110px;
    float: left;
    position: relative;
    z-index: 1;
    margin-left: -80px;
}
</style>

<style scoped>
.upImgContent{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1111;
}
.upImgBox{
    width: 900px;
    background-color: #ffffff;
    /* height: 500px; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 10px;
    overflow: hidden;
}
.upImgBoxTitle{
    height: 34px;
    line-height: 34px;
    background-color: #eeeeee;
    font-size: 16px;
    color: #333333;
    padding: 0px 20px;
    position: relative;
}
.closeBtn{
    height: 34px;
    line-height: 34px;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 40px;
    text-align: center;
}
.upImgBoxChooseCont{
    height: 40px;
    line-height: 40px;
    margin: 20px;
}
.chooseTypeContent{
    height: 34px;
    line-height: 34px;
    padding: 0px 20px;
    margin-bottom: 20px;
}
.chooseTypeContent>div{
    height: 34px;
    line-height: 34px;
    float: left;
}
.chooseItem{
    width: 120px;
    margin-left: 10px;
}
.imgListContent{
    padding: 0px 0px 0px 20px;
    /* margin-bottom: 20px; */
}
.imgListName{
    color: #666666;
    font-size: 14px;
    height: 25px;
    line-height: 20px
}
.imgList{
    min-height: 250px;
}
.imgList ul li{
    float: left;
    position: relative;
    width: 110px;
    height: 110px;
    margin-right: 15px;
    margin-bottom: 15px;
}
.imgList ul li img{
    width: 100%;
    height: 100%;
    border-radius: 4px;
}
.delImg{
    position: absolute;
    top: 0px;
    right: 0px;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
}
.saveContent{
    height: 60px;
    line-height: 50px;
    text-align: center;
}
.saveBtn{
    display: inline-block;
    width: 80px;
    cursor: pointer;
    height: 28px;
    line-height: 28px;
    text-align: center;
	background-color: #c8000a;
    border-radius: 10px;
    color: #ffffff;
    font-size: 16px;
}
</style>
<style scoped>
.file {
    position: relative;
    display: inline-block;
    background: #ffffff;
    border: 1px solid #c8000a;
    border-radius: 4px;
    padding: 4px 12px;
    /* overflow: hidden; */
    color: #c8000a;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    margin-right: 30px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
}
/* .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
} */
</style>
