<template>
  <div class="contianer">
    <title-name :item="titleName" />
    <!--区域搜索-->
    <div class="search_box">
      <div class="selectItem">
        <div class="celectItemL">
          商户名称
        </div>
        <div class="celectItemR">
          <input v-model="linkPhone" type="text" placeholder="请输入商户名称">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          频道
        </div>
        <div class="celectItemR">
          <el-select v-model="yeWuValue" placeholder="请选择">
            <el-option
              v-for="item in yeWuBanKuai"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          归属城市
        </div>
        <div class="celectItemR">
          <el-select v-model="cityName" placeholder="请选择">
            <el-option
              v-for="item in cityList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          商品编号
        </div>
        <div class="celectItemR">
          <input v-model="linkPhone" type="text" placeholder="请输入商户名称">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">
          商品名称
        </div>
        <div class="celectItemR">
          <input v-model="linkPhone" type="text" placeholder="请输入商户名称">
        </div>
      </div>
      <div class="buttonBox">
        <el-button type="danger" style="background:#C8000A;margin-left:30px;">查询</el-button>
      </div>
    </div>
    <!--列表区域-->
    <div class="list_content_box">
      <table>
        <thead>
          <tr>
            <td>商户名称</td>
            <td>频道</td>
            <td>商品编号</td>
            <td>归属城市</td>
            <td>商品名称</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>北京中青旅</td>
            <td>景区门票</td>
            <td>1234567980</td>
            <td>北京</td>
            <td>欢乐谷</td>
            <td class="oprator"><span @click="deletes">删除</span> </td>
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
    <div v-if="show" class="modalBox">
      <div class="modal">
        <header>删除</header>
        <div class="contnt">
          确定要将<span>欢乐谷</span>删除？
        </div>
        <div class="btn_box">
          <span @click="canceldel">取消</span>
          <span @click="comfiredel">确认</span>
        </div>
      </div>
      <div v-if="show" class="mark" />
    </div>
  </div>
</template>

<script>
import titleName from '@/components/titleName/titleName'
import { city } from '../../../api/cityPage'
export default {
  name: 'EditShoppingPage',
  components: {
    titleName
  },
  data() {
    return {
      titleName: '商品标签',
      yeWuValue: '',
      linkPhone: '',
      yeWuBanKuai: [
        { value: '', label: '请选择' },
        { value: 1, label: '旅游频道' },
        { value: 2, label: 'e差旅' }
      ],
      cityName: '',
      cityList: [],
      pageNum: 1,
      totalPages: 20,
      show: false
    }
  },
  mounted() {
    this.cityList = city.citydata
  },
  methods: {
    changeList(val) {
      console.log(val)
    },
    handleSizeChange(val) {
      console.log(val)
    },
    deletes() {
      this.show = true
    },
    canceldel() {
      this.show = false
    },
    comfiredel() {
      alert('恭喜你，删除成功')
      this.show = false
    }
  }
}
</script>

<style scoped lang="scss">
.contianer{
  padding: 24px 24px 50px 24px;
  background-color: #fbfbfb;
  min-width: 1200px;
  .search_box{
    width:100%;
    border-bottom:1px solid #F6F6F6;
    padding:20px 40px;
    background: white;
    .selectItem {
      height: 50px;
      line-height: 50px;
      color: #333333;
      font-size: 14px;
      width: 190px;
      display: inline-block;
      .celectItemL {
        width: 70px;
        text-align: center;
        display: inline-block;
      }
      .celectItemR {
        max-width: 200px;
        width: 60%;
        display: inline-block;
        input {
          width: 100%;
          height: 34px;
          line-height: 34px;
          border: 1px solid #dddddd;
          border-radius: 4px;
          padding-left: 4px;
        }
      }
    }
    .buttonBox{
      display: inline-block;
    }
  }
  .list_content_box{
    min-width: 1200px;
    background: white;
    height:400px;
    table{
      border-collapse: collapse;
      width: 100%;
      padding:0px;
      thead{
        height:40px;
        background-color: #f6f6f6;
        tr{
          height:40px;
          line-height: 40px;
          text-align: center;
          td{
            padding:0px 5px;
            border: solid 1px #dfdfdf;
          }
        }
      }
      tbody{
        height:40px;
        tr{
          height:40px;
          line-height: 40px;
          text-align: center;
          td{
            padding:0px 5px;
            border: solid 1px #dfdfdf;
          }
          .oprator{
            color:#CA0F18;
            span{
              cursor: pointer;
            }
            span:nth-child(2){
              padding:0px 10px;
            }
          }
        }
      }
    }
    .line{
      width:100%;
      border:0.5px solid #dfdfdf;
      margin-top:40px;
    }
    .page_msg{
      text-align: right;
      padding: 20px 50px 40px 0px;
      background-color: #ffffff;
      color: #666666;
    }
  }
  .modalBox{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    overflow: hidden;
    width:100%;
    height:100%;
    .modal{
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 8px;
      margin-left:-190px;
      margin-top:-113px;
      width: 380px;
      height:226px;
      z-index: 1003;
      background: #fff;
      header{
        width:100%;
        height:40px;
        text-align: center;
        line-height: 40px;
        background:rgb(245,245,245);
        border-radius: 8px 8px 0px 0px;
        font-size:16px;
        color:rgb(51,51,51);
      }
      .contnt{
        width:100%;
        height:137px;
        text-align: center;
        line-height: 137px;
        font-size:16px;
        color:rgb(102,102,102);
        font-family: MicrosoftYaHei;
        span{
          color:rgb(200,0,10);
        }
      }
      .btn_box{
        width:100%;
        height:50px;
        border-radius: 0px 0px 8px 8px;
        border-top:1px solid  #EEEEEE;
        span:nth-child(1){
          border-right:1px solid #EEEEEE;
          display: inline-block;
          width:50%;
          height:48px;
          float: left;
          text-align: center;
          line-height: 48px;
          font-size:16px;
          color:rgb(200,0,10);
        }
        span:nth-child(2){
          display: inline-block;
          float: left;
          width:50%;
          height:48px;
          text-align: center;
          line-height: 48px;
          font-size:16px;
          color:rgb(200,0,10);
        }
      }
    }
    .mark{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
