<template>
  <div class="waperContent">
    <title-name :item="titleName" />
    <!--列表区域-->
    <div class="list_content_box">
      <div classButt="on">
        <div style="width:100px;float: right;">
          <el-button type="danger" style="background:#C8000A;" @click="addJ">新增</el-button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td>序号</td>
            <td>频道</td>
            <td>标签名称</td>
            <td>图标</td>
            <td>链接</td>
            <td>排序</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{ index+1 }}</td>
            <!-- <td class="orderNo"> <router-link :to="{path:'/orderDetails',query:{orderNo:item.orderNo}}">{{item.orderNo}}</router-link></td> -->
            <td>{{ item.channeName }}</td>
            <td>{{ item.labelName }}</td>
            <td style="padding-top:10px;"><img :src="item.image" alt="" style="width:29px;height:25px;"></td>
            <td>{{ item.url }}</td>
            <td>{{ item.sortId }}</td>
            <td>{{ item.status===1 ?"启用":"停用" }}</td>
            <td class="oprator">
              <span @click="detailTo(item)">详情</span>
              <span @click="editClick(item)">编辑</span>
              <span @click="changeStatus(item)">{{ item.status===1?"停用":"启用" }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="line" />
      <!--分页区域-->
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
    <div v-show="show2" class="mask">
      <div class="littleMask">
        <div class="maskHeader">
          <span>新增标签</span>
          <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span>
        </div>
        <div class="xiaBox">
          <!--频道-->
          <div class="addAdvMsgItem">
            <div class="addAdvMsgItemName">
              <span class="red">* </span> 频道
            </div>
            <div class="addAdvMsgItemCon">
              <el-select v-model="yeWuValue" placeholder="请选择" style="width: 280px;">
                <el-option
                  v-for="item in yeWuBanKuai"
                  :key="item.channelId"
                  :label="item.channelName"
                  :value="item.channelId"
                />
              </el-select>
            </div>
          </div>
          <!--标签名称-->
          <div class="addAdvMsgItem">
            <div class="addAdvMsgItemName">
              <span class="red">* </span> 标签名称
            </div>
            <div class="addAdvMsgItemCon">
              <el-input v-model="labelname" style="width:280px;" />
            </div>
          </div>
          <!--图片上传-->
          <div class="addAdvMsgItem">
            <div class="addAdvMsgItemName">
              <span class="red">* </span> 上传图片
            </div>
            <div class="addAdvMsgItemCon clearfix">
              <div v-if="allowAddImg" class="img_box file">
                <input style="width:100%" type="file" accept="image/*" multiple="multiple" @change="changeImg($event)">
                <div class="filter">选择上传文件</div>
              </div>
              <div style=" padding-bottom: 0px;width: 88px;height: 88px;background: #FDF5F5">
                <div v-for="(item,index) in imgArr" :key="index" class="img_box">
                  <div class="img_show_box" style="position:relative">
                    <img style=" padding-bottom: 0px;width: 88px;height: 88px;" :src="item" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--链接-->
          <div class="addAdvMsgItem">
            <div class="addAdvMsgItemName">
              <span class="red">* </span> 链接
            </div>
            <div class="addAdvMsgItemCon">
              <el-input v-model="linkurl" style="width:280px;" />
            </div>
          </div>
          <!--描述-->
          <div class="addAdvMsgItem">
            <div class="addAdvMsgItemName">
              <span class="red">* </span> 描述
            </div>
            <div class="addAdvMsgItemCon">
              <el-input v-model="desc" type="textarea" style="width:280px;" />
            </div>
          </div>
          <!--排序值-->
          <div class="addAdvMsgItem">
            <div class="addAdvMsgItemName">
              <span class="red">* </span> 排序值
            </div>
            <div class="addAdvMsgItemCon">
              <el-input v-model="sort" style="width:280px;" />
            </div>
          </div>
          <!--状态-->
          <div class="addAdvMsgItem">
            <div class="addAdvMsgItemName">
              <span class="red">* </span> 状态
            </div>
            <div class="addAdvMsgItemCon">
              <el-select v-model="zhuangtai" placeholder="请选择">
                <el-option
                  v-for="(items) in list2"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value"
                  style="width: 280px;"
                />
              </el-select>
            </div>
          </div>
        </div>

        <div class="search_btn" @click="save()">保存</div>
      </div>
    </div>
    </div>

</template>

<script>
import titleName from '@/components/titleName/titleName'
import { pictureLabel, addLabel, editLabel, getPictureAction } from '@/api/label/label'
import { chanel, booth } from '@/api/productrecommend/productrecom'
import Modal from './modalPage'
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
  name: 'PictureLabelPage',
  components: {
    titleName,
    Modal
  },
  data() {
    return {
      allowAddImg: true,
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisibleE: false,
      dialogImageUrlE: '',
      // allowAddImg: true,
      titleName: '图文标签',
      pageNum: 1,
      totalPages: 20,
      show2: false,
      show3: false,
      imgArr: [],
      list: [],
        yeWuValue: '',
        zhuangtai: '',
        desc: '',
        sort: '',
        linkurl: '',
        labelname: '',
        files: '' ,// 文件
      param: {
        channelName: '',
        labelName: '',
        pageNum: 1,
        pageSize: ''
      },
      fileList: [],
      yeWuBanKuai: [],
      list2: [
        { value: '', label: '请选择' },
        { value: 1, label: '停用' },
        { value: 0, label: '启用' }
      ],
      graphicId: '',
      getTokens: '',
      imagess: '',
      qie:"",
      imgarr:[],
      hasno:""
    }
  },
  mounted() {
    if (this.$route.name == 'pictureLabelPage') {
      this.$emit('shows', 1)
    }
    this.getList(this.param)
    chanel().then(res => {
      this.yeWuBanKuai = res.data.data
    })
  },
  // 监听,当路由发生变化的时候执行

  methods: {
    //启用停用按钮
    changeStatus(val){
      console.log(val)
      if(val.status===0){
        val.status=1
      }else{
        val.status=0
      }
      axios.get(this.$store.state.user.url+"/syGraphic/updateStatus?graphicId="+val.graphicId+"&status="+val.status).then(res=>{
        console.log(res)
      })
    },
    // 上传图片最新
    changeImg: function(e) {
      this.hasno="上传"
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
          _this.files = files
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
            _this.imgArr.unshift('')
            _this.imgArr = []
            _this.imgArr.push(base64)
            console.log(_this.imgArr)
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
    // 详情
    detailTo(item) {
      this.$router.push({path:'/scenicSpotPage',query:{id:item.graphicId}})
    },
    // 编辑
    editClick(item) {
      this.qie="编辑"
      this.show2 = true
      this.graphicId = item.graphicId
      const _this = this
      axios.get(this.$store.state.user.url + '/syGraphic/getGraphicById?graphicId=' + this.graphicId).then(res => {
        console.log('zhoayang')
        console.log(res.data.data)
        _this.yeWuValue = res.data.data.channelId
        _this.labelname = res.data.data.labelName
        _this.desc = res.data.data.describes
        this.imgarr.push(res.data.data.image)
        _this.imgArr=[]
        _this.imgArr.push('http://' + res.data.data.image)
        _this.sort = res.data.data.sortId
        _this.linkurl = res.data.data.url
        _this.zhuangtai = res.data.data.status
      })
    },

    changeList(val) {
      this.param.pageNum = val
      this.getList(this.param)
    },
    handleSizeChange(val) {
      this.param.pageSize = val
      this.getList(this.param)
    },
    addJ() {
      this.zhuangtai=""
      this.yeWuValue=""
      this.desc=""
      this.sort=""
      this.linkurl=""
      this.labelname=""
      this.imgArr=[]
      // this.$router.push('/addSaveEditPage')
      this.qie="保存"
      this.show2 = true
    },
    hiddenShow() {
      this.show2 = false
      this.show3 = false
    },
    getList(pams) {
      axios.get(this.$store.state.user.url+"/syGraphic/queryGraphic?channelName="+pams.channelName+"&pageNum="+pams.pageNum+"&labelName="+pams.labelName).then(res=>{
        this.pageNum = res.data.data.pageNum
          this.pageSize = res.data.data.pageSize
          this.totalPages = res.data.data.total
          this.list = res.data.data.list
          this.list.forEach(ele=>{
            ele.image="http://"+ele.image
          })
      })
      //开发环境
      // pictureLabel(params).then(res => {
      //   this.pageNum = res.data.data.pageNum
      //   this.pageSize = res.data.data.pageSize
      //   this.totalPages = res.data.data.total
      //   this.list = res.data.data.list
      //   console.log(res)
      // })
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1)
    },
    // 新增保存
    save() {
      console.log(this.zhuangtai)
      if(this.ruleCheck()){
      if(this.qie=="保存"){
        this.getTokens = getToken()
        const paramFrom = new FormData() // 创建form对象
        paramFrom.append('files', this.files[0]) // 通过append向form对象添加数据
        paramFrom.append('channelId', this.yeWuValue)
        paramFrom.append('describes', this.desc)
        paramFrom.append('labelName', this.labelname)
        paramFrom.append('sortId', this.sort)
        paramFrom.append('status', this.zhuangtai)
        paramFrom.append('url', this.linkurl)
        paramFrom.append('redisKey', this.getTokens)
        paramFrom.append('image', '')
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        axios.post(this.$store.state.user.url + '/syGraphic/addSyGraphic2', paramFrom, config).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.show2 = false
            this.getList(this.param)
          } else {
            this.$message({
              message: '保存失败',
              type: 'error'
            })
          }
        })
      }else{
        this.getTokens = getToken()
        const paramFrom = new FormData() // 创建form对象
        paramFrom.append('files', this.files[0]) // 通过append向form对象添加数据
        paramFrom.append('channelId', this.yeWuValue)
        paramFrom.append('describes', this.desc)
        paramFrom.append('labelName', this.labelname)
        paramFrom.append('sortId', this.sort)
        paramFrom.append('status', this.zhuangtai)
        paramFrom.append('url', this.linkurl)
        paramFrom.append('redisKey', this.getTokens)
        if (this.hasno == "上传") {
          paramFrom.append('image', '')
        } else {
          paramFrom.append("image", this.imgarr[0])
        }
        paramFrom.append("graphicId", this.graphicId)
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        axios.post(this.$store.state.user.url + '/syGraphic/updateGraphic2', paramFrom, config).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.show2 = false
            this.getList(this.param)
          } else {
            this.$message({
              message: '保存失败',
              type: 'error'
            })
          }
        })
      }
      }
    },
   //做新增和编辑的规则
   ruleCheck(val){
     if(this.yeWuValue==""){
       this.$message({
         message: '请选择频道名称',
         type: 'error'
       })
       return false
     }else if (this.labelname==""){
       this.$message({
         message: '请输入标签名称',
         type: 'error'
       })
       return false
     }else if (this.imgArr.length==0){
       this.$message({
         message: '请选择图片上传',
         type: 'error'
       })
       return false
     }else if(this.linkurl==""){
       this.$message({
         message: '请填写链接地址',
         type: 'error'
       })
       return false
     }else if(this.desc==""){
       this.$message({
         message: '请填写描述',
         type: 'error'
       })
       return false
     }else if(this.sort==""){
       this.$message({
         message: '请填写排序值',
         type: 'error'
       })
       return false
     }else if (this.zhuangtai===""){
       this.$message({
         message: '请选择状态',
         type: 'error'
       })
       return false
     }else {
       return true
     }
   },
  }
}
</script>

<style scoped lang="scss">
.waperContent {
  padding: 24px 0px 50px 24px;
  background-color: #fbfbfb;
  min-width: 1200px;
  overflow-y: scroll;
    .list_content_box {
    min-width: 1200px;
    background: white;
    height: 400px;
    table {
      border-collapse: collapse;
      width: 100%;
      padding: 0px;
      background: white;
      thead {
        height: 40px;
        background-color: #f6f6f6;
        tr {
          height: 40px;
          line-height: 40px;
          text-align: center;
          td {
            padding: 0px 5px;
            border: solid 1px #dfdfdf;
          }
        }
      }
      tbody {
        height: 40px;
        tr {
          height: 40px;
          line-height: 40px;
          text-align: center;
          td {
            padding: 0px 5px;
            border: solid 1px #dfdfdf;
          }
          .oprator {
            color: #ca0f18;
            span {
              cursor: pointer;
            }
            span:nth-child(2) {
              padding: 0px 10px;
            }
          }
        }
      }
    }
    .addButton {
      overflow: hidden;
      min-width: 1200px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .line {
      width: 100%;
      height:40px;
      background: white;
      border-bottom: 0.5px solid #dfdfdf;
    }
    .page_msg {
      text-align: right;
      padding: 20px 50px 40px 0px;
      background-color: #ffffff;
      color: #666666;
    }
  }
  .header {
    width: 100%;
    height: 30px;
    padding: 5px 10px;
    background: #eeeeee;
    color: #393939;
    i {
      float: right;
      cursor: pointer;
    }
  }
  .input_box {
    width: 100%;
    padding-top: 10px;
  }
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
}
.littleMask {
  width: 478px;
  height: 665px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 8px;
}
.tableform {
  display: flex;
  flex-direction: column;
  // padding: 0 0 0 50px;
  padding: 20px 0 0 0;
}
.tableform div {
  // margin: 20px 0 0 0;
}
.maskHeader {
  padding: 12px 20px;
  background: #eeeeee;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.maskHeader span:first-of-type {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #222222;
}
.maskHeader span:last-of-type {
  font-size: 12px;
  color: #222222;
  color: #666666;
}
.selectedItem {
  margin: 20px 0;
  padding: 0 0 0 40px;
}

.search_btn {
  width: 120px;
  height: 38px;
  background-color: #c8000a;
  border-radius: 4px;
  position: absolute;
  bottom: 35px;
  left: 190px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 38px;
}
</style>
<style>
/* .mask .el-upload-list .el-upload-list__item {
  width: 110px;
  height: 110px;
  text-align: center;
  float: left;
}
.mask .el-upload-list .el-upload-list__item a {
  display: none;
}
.mask .el-upload-list .el-upload-list__item img {
  width: 88px;
  height: 88px;
  z-index: 0;
} */
.mask .el-upload {
  width: 150px;
  height: 35px;
  font-size: 16px;
  position: relative;
  line-height: 35px;
  border: 1px solid red;
}
.mask .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 88px;
  height: 88px;
  margin-top: 5px;
}
.mask .el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
  text-align: center;
}
.mask .el-upload-list {
  position: absolute;
  top: 38px;
  left: 0;
  display: block;
}
.mask .el-upload-list--picture-card .el-upload-list__item{
    width:88px;
    height:88px;
  }
.mask .el-upload-list{
  height:88px;
}
.xiaBox{
  width:100%;
}
.addAdvMsgItem{
  display: flex;
  margin-top: 20px;
  padding-right: 77px;
}
.addAdvMsgItemName{
  width: 120px;
  margin-right: 10px;
  text-align: right;
  color: #666666;
  font-size: 14px;
  height: 34px;
  line-height: 34px;
}
.addAdvMsgItemCon{
  width:281px;
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
.file {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 120px;
  height: 34px;
  color: #c8000a;
  font-size: 14px;
  line-height: 34px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #c8000a;
  text-decoration: none;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.clearfix:after{
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
</style>

