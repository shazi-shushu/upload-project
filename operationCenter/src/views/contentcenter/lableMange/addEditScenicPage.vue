<template>
  <div class="container">
    <div class="input_box">
      <!--频道-->
      <div class="addAdvMsgItem">
        <div class="addAdvMsgItemName">
          <span class="red">* </span> 频道
        </div>
        <div class="addAdvMsgItemCon">
          <el-select v-model="yeWuValue" placeholder="请选择" style="width: 380px;">
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
          <el-input v-model="labelname" style="width:380px;" />
        </div>
      </div>
      <!--景区主题-->
      <div class="addAdvMsgItem">
        <div class="addAdvMsgItemName">
          <span class="red">* </span> 景区主题
        </div>
        <div class="addAdvMsgItemCon" style="width:550px;">
            <el-checkbox-group
              v-model="checkedCities1"
              @change="handleCheckAllChange"
            >
              <el-checkbox v-for="city in cities" :label="city" :key="city" style="padding:0px 5px 0px 10px;">{{city}}</el-checkbox>
            </el-checkbox-group>
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
          <span class="red"> </span> 链接
        </div>
        <div class="addAdvMsgItemCon">
          <el-input v-model="linkurl" style="width:380px;" />
        </div>
      </div>
      <!--描述-->
      <div class="addAdvMsgItem">
        <div class="addAdvMsgItemName">
          <span class="red"> </span> 描述
        </div>
        <div class="addAdvMsgItemCon">
          <el-input v-model="desc" type="textarea" style="width:380px;" />
        </div>
      </div>
      <!--排序值-->
      <div class="addAdvMsgItem">
        <div class="addAdvMsgItemName">
          <span class="red">* </span> 排序值
        </div>
        <div class="addAdvMsgItemCon">
          <el-input v-model="sort" style="width:380px;" />
        </div>
      </div>
      <!--状态-->
      <div class="addAdvMsgItem">
        <div class="addAdvMsgItemName">
          <span class="red">* </span> 状态
        </div>
        <div class="addAdvMsgItemCon">
          <el-select v-model="zhuangtai" placeholder="请选择" style="width:380px;">
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
      <div class="search_btn" @click="save()">保存</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { chanel, booth } from '@/api/productrecommend/productrecom'
  import { getToken } from '@/utils/auth'
  const cityOptions = ['主题乐园', '人文建筑', '古迹遗址', '园林景观','动植物园','温泉','电影动漫','水上乐园','田园度假','宗教祈福','湖光山色','漂流','草原沙漠','海滨岛屿','美食购物','自然风光','赏花踏青','滑雪','城市观光','赛事演出','购物精选','室内娱乐','水乡古镇','亲子','交通游船','时令采摘','团队拓展','登山徒步','游乐场','博物馆'];
  export default {
    name: "addSaveEditPage",
    data(){
      return{
        allowAddImg:true,
        imgArr:[],
        checkedCities1: [],
        cities: cityOptions,
        yeWuBanKuai:[],
        yeWuValue:"",
        labelname:"",
        linkurl:"",
        desc:"",
        sort:"",
        zhuangtai:"",
        files: '' ,// 文件
        list2: [
          { value: '', label: '请选择' },
          { value: 1, label: '停用' },
          { value: 0, label: '启用' }
        ],
        fileList: [],
        getTokens:"",
        ids:"",
        scenicList:[],
        scenicListtwo:[],
        hasno:"",
        imgarr:[]
      }
    },
    methods:{
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
        }
      },
      // 保存
      save(){
        if(this.ruleCheck()) {
          if (this.$route.query.scenicId) {
            this.getTokens = getToken()
            if (this.scenicList.length != "") {
              this.scenicListtwo = this.scenicList
            } else {
              this.scenicListtwo = this.checkedCities1
            }
          if(this.scenicListtwo.length===0){
            this.$message({
              message: '请选择景区主题',
              type: 'error'
            })
            return false
          }
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
            paramFrom.append("graphicId", this.ids)
            paramFrom.append("theme", this.scenicListtwo)
            paramFrom.append("scenicId", this.$route.query.scenicId)
            const config = {
              headers: {'Content-Type': 'multipart/form-data'}
            }
            axios.post(this.$store.state.user.url + 'syGraphicScenic/updateSyGraphicScenic2', paramFrom, config).then(res => {
              console.log(res)
              if (res.data.code == 200) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.$router.push({path: "/scenicSpotPage"})
              } else {
                this.$message({
                  message: '保存失败',
                  type: 'error'
                })
              }
            })
          } else {
            this.getTokens = getToken()
            const paramFrom = new FormData() // 创建form对象
            if(this.scenicList.length===0){
              this.$message({
                message: '请选择景区主题',
                type: 'error'
              })
              return false
            }
            paramFrom.append('files', this.files[0]) // 通过append向form对象添加数据
            paramFrom.append('channelId', this.yeWuValue)
            paramFrom.append('describes', this.desc)
            paramFrom.append('labelName', this.labelname)
            paramFrom.append('sortId', this.sort)
            paramFrom.append('status', this.zhuangtai)
            paramFrom.append('url', this.linkurl)
            paramFrom.append('redisKey', this.getTokens)
            paramFrom.append('image', '')
            paramFrom.append("graphicId", this.ids)
            paramFrom.append("theme", this.scenicList)
            const config = {
              headers: {'Content-Type': 'multipart/form-data'}
            }
            axios.post(this.$store.state.user.url + 'syGraphicScenic/addSyGraphicScenic2', paramFrom, config).then(res => {
              console.log(res)
              if (res.data.code == 200) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.$router.push({path: "/scenicSpotPage"})
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
      // 选中的游玩项目
      handleCheckAllChange(value){
        this.scenicList=value.join(",")
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-1)
      },
      //编辑返现
      editShow(){
       axios.get(this.$store.state.user.url +"/syGraphicScenic/getGraphicScenicById?scenicId="+this.$route.query.scenicId).then(res=>{
           console.log(222)
           console.log(res)
           this.yeWuValue = res.data.data.channelId
           this.labelname = res.data.data.labelName
           this.desc = res.data.data.describes
           this.imgarr.push(res.data.data.image)
           this.imgArr=[]
           this.imgArr.push('http://' + res.data.data.image)
           this.sort = res.data.data.sortId
           this.linkurl = res.data.data.url
           this.zhuangtai = res.data.data.status
           this.checkedCities1=res.data.data.theme.split(",")
       })
      },
      //验证规则
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
    },
    mounted() {
        this.ids=localStorage.getItem("ids")
      //获取频道列表
      chanel().then(res => {
        this.yeWuBanKuai = res.data.data
      })
      if(this.$route.query.scenicId){
        this.editShow()
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    width: 100%;
    height: 100%;
    padding:10px 0px;
    .input_box{
      width:100%;
      height:100%;
      padding:20px 0px 0px 20px;
      .addAdvMsgItem{
        display: flex;
        margin-top: 20px;
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
    }
    .search_btn{
      width: 100px;
      height: 34px;
      margin:60px auto;
      line-height: 34px;
      text-align: center;
      background-color: #c8000a;
      border-radius: 4px;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
</style>
