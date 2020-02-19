<template>
  <div class="ticket">
    <!-- title名称 -->
    <title-name :item="titleName"/>
    <div class="chaxun">
      <div class="selectedItem">
        商户名称
        <el-input v-model="input" placeholder="请输入商户名称" style="width: 130px; height: 34px;"/>
      </div>
      <div class="selectedItem">
        归属城市
        <el-autocomplete
          v-model="cityName"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          style="width: 130px; height: 34px;"
          clearable
        ></el-autocomplete>
        <!-- <input type="text" v-model="paramNew.cityName"> -->
      </div>
      <!--<div class="selectedItem">
        归属城市
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="state3"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i>
          <template slot-scope="props">
            <div class="name">{{ props.item.name }}</div>
            <span class="addr">{{ props.item.code }}</span>
          </template>
        </el-autocomplete>
        <el-select v-model="cityName" placeholder="请选择" style="width: 102px; height: 34px;">
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>-->
      <div class="selectedItem">
        商品编号
        <el-input v-model="input1" placeholder="请输入商品编号" style="width: 160px; height: 34px;"/>
      </div>
      <div class="selectedItem">
        商品名称
        <el-input v-model="input2" placeholder="请输入商品名称" style="width: 160px; height: 34px;"/>
      </div>
      <el-button
        style="background: #c8000a; color: #fff; font-size:15px; width:100px; height: 34px; border: 0; margin-left: 60px;"
      >查询</el-button>
    </div>
    <div class="associate">
      <el-button
        style="background: #c8000a; color: #fff; font-size:15px; width:100px; height: 34px; border: 0; margin-left: 1400px;"
        @click="concat()"
      >关联商品</el-button>
    </div>

    <div class="table">
      <table>
        <thead>
          <tr>
            <th>商户名称</th>
            <th>频道</th>
            <th>商品编号</th>
            <th>归属城市</th>
            <th>商品名称</th>
            <th>产品推荐语</th>
            <th>推荐城市</th>
            <th>排序</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list1" :key="index">
            <td>{{ item.merchantId }}</td>
            <td>{{ channelname }}</td>
            <td>{{ item.goodsNum }}</td>
            <td>{{ item.belongCityName }}</td>
            <td>{{ item.goodsName }}</td>
            <td>{{ item.nominateLanguage }}</td>
            <td>{{ item.nominateCityName }}</td>
            <td>{{ item.sort }}</td>
            <td class="last_list">
              <span style="cursor: pointer;" @click="edit(item,index)">编辑</span>
              <span style="cursor: pointer;" @click="shanchu(item,index)">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="line"/>
      <div class="page_msg">
        <el-pagination
          :total="totalPages"
          :current-page="pageNum"
          layout="prev, pager, next,  jumper, total, sizes "
          @current-change="changeList"
          @size-change="handleSizeChange"
        />
      </div>

      <!-- 编辑 -->
      <div v-show="show1" class="mask">
        <div class="littleMask">
          <div class="maskHeader">
            <span>编辑展位</span>
            <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span>
          </div>
          <div class="tableform">
            <p>
              商品名称
              <el-input
                v-model="input5"
                placeholder="欢乐谷"
                style="width: 300px; height: 34px; margin-left: 10px;"
              />
            </p>
            <p>
              商品编号
              <el-input
                v-model="input6"
                placeholder="11111111"
                style="width: 300px; height: 34px; margin-left: 10px;"
              />
            </p>
            <div>
              <span style="color: #c8000a; margin: 0 5px 0 0;">*</span>
              产品推荐语
              <el-input
                v-model="textarea2"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入产品推荐语"
                style="width: 300px; height: 68px; margin-left: 10px;"
              />
            </div>
            <p>
              <span style="color: #c8000a; margin: 0 5px 0 0;">*</span>
              排序值
              <el-input
                v-model="input3"
                placeholder="请输入排序值"
                style="width: 300px; height: 34px; margin-left: 10px;"
              />
            </p>
            <div>
              <span style="color: #c8000a; margin: 0 5px 0 0;">*</span>
              城市
              <el-autocomplete
                v-model="cityName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
                style="width: 194px; height: 34px; margin-left: 10px;"
                clearable
              ></el-autocomplete>
              <button
                style="width: 100px; height: 34px; border: 1px solid #c8000a; background: none; color: #c8000a; border-radius: 5px; margin: 9px 0 0 6px;"
                @click="add()"
              >添加城市</button>
            </div>
            <ul
              style="display: flex; flex-direction: row; flex-wrap: wrap; width: 300px; margin: 16px 0 0 116px;"
            >
              <li
                v-for="(item,i) in arr"
                :key="i"
                style="height: 34px; margin: 0 10px 0 0; font-size: 14px; color: #333;"
              >
                <i
                  style="min-width: 58px; height: 32px; display: block; border: 1px solid #e5e5e5; float:left; text-align: center;border-radius: 5px; border-top-right-radius: 0; border-bottom-right-radius: 0; line-height: 32px; font-style: normal;"
                >{{ item }}</i>
                <i
                  style="width: 28px; height: 32px; display: block; border: 1px solid #e5e5e5; float:left; text-align: center; margin:0; padding:0;border-radius: 5px; border-top-left-radius: 0;  border-bottom-left-radius: 0; line-height: 32px; font-style: normal;"
                  @click="delete1(i)"
                >
                  <i class="el-icon-close"/>
                </i>
              </li>
            </ul>
          </div>
          <div class="search_btn" @click="save()">保存</div>
        </div>
      </div>

      <!-- 删除 -->
      <div v-if="show2" class="modalBox">
        <div class="modal">
          <header>删除</header>
          <div class="contnt">
            确定要将
            <span>{{goodname}}</span>删除？
          </div>
          <div class="btn_box">
            <span @click="canceldel">取消</span>
            <span @click="comfiredel()">确认</span>
          </div>
        </div>
        <div v-if="show2" class="mark"/>
      </div>
    </div>
  </div>
</template>
<script>
import titleName from "@/components/titleName/titleName";
import { city } from "../../../api/cityPage";
import {
  City,
  getAssociatedGoods,
  updateGood
} from "@/api/productrecommend/productrecom";

export default {
  name: "Ticket",
  components: {
    titleName
  },
  data() {
    return {
      titleName: "玩转门票节",
      list: "",
      input: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      state3: "",
      maskCharacter: "",
      arr: [],
      list1: [],
      pageNum: 1,
      pageSize: 10,
      totalPages: 30,
      show1: false,
      show2: false,
      textarea2: "",
      cityName: "",
      cityList: [],
      cityss: [],
      restaurants: [],
      timeout: null,
      channelname: "",
      goodname: "",
      i: "",
      ii: "",
      data1: "",
      data2: "",
      param: {
        pageNum: "",
        pageSize: ""
      }
    };
  },
  mounted() {
    this.cityList = city.citydata;
    this.loadAll();
    City(this.param1).then(res => {
      var cityname = res.data.data;
      this.citys = res.data.data;
      for (var i = 0; i < this.citys.length; i++) {
        var str = this.citys[i].name;
        var str1 = str.split("-")[0];
        this.cityss.push(str1);
      }
    });
    this.getList(this.param);
  },
  methods: {
    changeList(val) {
      this.param.pageNum = val;
      this.getList(this.param);
    },
    handleSizeChange(val) {
      this.param.pageSize = val;
      this.getList(this.param);
    },
    edit(item, index) {
      this.show1 = true;
      console.log(item);
      this.ii = index;
      console.log(this.ii);
      this.data1 = item;
      this.input5 = item.goodsName;
      //console.log(this.input5);
      this.input6 = item.goodsNum; 
    },

    concat() {
      this.$router.push("/associatedgoods");
    },
    hiddenShow() {
      this.show1 = false;
    },
    shanchu(item, index) {
      this.i = index;
      this.show2 = true;
      //console.log(item.goodsName);
      this.goodname = item.goodsName;
      //this.list1.splice(index, 1);
      console.log(item);
      this.data2 = item
    },
    canceldel() {
      this.show2 = false;
    },
    comfiredel() {
      //alert("恭喜你，删除成功");
      this.show2 = false;
      console.log(this.data2.belongCityCode)
      var obj = {
        belongCityCode: this.data2.belongCityCode,
        belongCityName: this.data2.belongCityName,
        channelId: this.data2.channelId,
        goodsName: this.data2.goodsName,
        goodsNum: this.data2.goodsNum,
        id: this.data2.id,
        isDel: 1,
        merchantId: this.data2.merchantId,
        merchantName: this.data2.merchantName,
        nominateCityCode: this.data2.nominateCityCode,
        nominateCityName: this.data2.nominateCityName,
        nominateLanguage: this.data2.nominateLanguage,
        sort: this.data2.sort,
        type: 1
      };
      updateGood(obj).then(res => {
        console.log(res);
        this.getList(this.param);
      });
    },
    add() {
      // console.log(this.input4);
      // var cs = this.input4;
      // this.arr.push(cs);
      // console.log(this.arr);
      // this.input4 = "";
      var cs = this.cityName;
      this.arr.push(cs);
      //console.log(this.arr);
      this.cityName = "";
    },
    delete1(i) {
      this.arr.splice(i, 1);
    },
    save() {
      var index = this.ii;
      //console.log(index);
      this.show1 = false;
      //关闭弹框
      //console.log(this.list1[index]);
      this.list1[index] = Object.assign(this.list1[index], {
        //nominateCityCode: this.nominateCityCode,
        nominateLanguage: this.textarea2,
        nominateCityName: this.arr.join(","),
        sort: this.input3
      });
      this.textarea2 = this.input3 = null;
      this.arr = [];
      

      //console.log(this.arr);
      var obj = {
        belongCityCode: this.data1.belongCityCode,
        belongCityName: this.data1.belongCityName,
        channelId: this.data1.channelId,
        goodsName: this.data1.goodsName,
        goodsNum: this.data1.goodsNum,
        id: this.data1.id,
        isDel: 0,
        merchantId: this.data1.merchantId,
        merchantName: this.data1.merchantName,
        nominateCityCode: this.data1.nominateCityCode,
        nominateCityName: this.data1.nominateCityName,
        nominateLanguage: this.data1.nominateLanguage,
        sort: this.data1.sort,
        type: 1
      };
      updateGood(obj).then(res => {
        console.log(res);
      });
    },
    loadAll() {
      City().then(res => {
        res.data.data.forEach(element => {
          let obj = {
            value: element.name.split("-")[0],
            code: element.code
          };
          this.restaurants.push(obj);
        });
      });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      // console.log(item);
    },
    getList(params) {
      getAssociatedGoods(params).then(res => {
        this.pageNum = res.data.data.currentPage;
        this.pageSize = res.data.data.pageSize;
        this.totalPages = res.data.data.total;
        this.list1 = res.data.data.list;
        for (var i = 0; i < this.list1.length; i++) {
          if (this.list1[i].channelId == 2) {
            this.channelname = "酒店民宿";
          }
        }
        if (res.data.data.list != "") {
          //console.log(1123456789);
          var data = res.data.data.list;
          localStorage.setItem("data", JSON.stringify(data));
        }
      });
    }
  }
};
</script>
<style scoped>
.ticket {
  padding: 24px 24px 50px 24px;
  background-color: #fbfbfb;
  min-width: 1200px;
  height: 100%;
}
.chaxun {
  height: 82px;
  background: #fff;
  line-height: 82px;
  padding: 0 30px;
  border-bottom: 1px solid #f6f6f6;
}
.selectedItem {
  float: left;
  margin: 0 60px 0 0;
}
.associate {
  height: 70px;
  background: #fff;
  line-height: 70px;
}
.table {
  background: #fff;
  padding: 0 30px 0 30px;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 0;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  border-radius: 4px;
}
table thead th {
  background-color: #f6f6f6;
  border: solid 1px #e6e6e6;
  color: #666666;
  height: 40px;
  line-height: 40px;
}
table tbody td {
  height: 40px;
  line-height: 40px;
  background-color: #ffffff;
  border: solid 1px #e6e6e6;
  color: #333333;
}
.last_list span {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #c8000a;
  padding: 0 30px;
}
.page_msg {
  text-align: right;
  padding: 20px 0px 40px 0px;
  background-color: #ffffff;
  color: #666666;
}
#line {
  height: 1px;
  background: #f6f6f6;
  margin: 32px 0 30px 0;
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
  width: 470px;
  height: 582px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 8px;
  position: relative;
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
.search_btn {
  width: 120px;
  height: 38px;
  background-color: #c8000a;
  border-radius: 4px;
  position: absolute;
  bottom: 35px;
  left: 158px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 38px;
}
.tableform {
  display: flex;
  flex-direction: column;
}
.tableform p:nth-of-type(1) span,
.tableform p:nth-of-type(2) span {
  width: 300px;
  height: 34px;
  border: 1px solid #e5e5e5;
  display: block;
  border-radius: 5px;
  color: #666;
  line-height: 34px;
  padding: 0 0 0 10px;
  margin: 0 0 0 10px;
}
.tableform p:nth-of-type(1),
.tableform p:nth-of-type(2),
.tableform div:nth-of-type(1),
.tableform p:nth-of-type(3),
.tableform div:nth-of-type(2) {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0 0 50px;
}
.tableform div:nth-of-type(1) {
  margin: 8px 0 0 27px;
}
.tableform div:nth-of-type(2) {
  margin: 18px 0 0 75px;
}
.tableform p:nth-of-type(3) {
  margin: 8px 0 0 62px;
}
.modalBox {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 8px;
  margin-left: -190px;
  margin-top: -113px;
  width: 380px;
  height: 226px;
  z-index: 1003;
  background: #fff;
}
.modal header {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: rgb(245, 245, 245);
  border-radius: 8px 8px 0px 0px;
  font-size: 16px;
  color: rgb(51, 51, 51);
}
.contnt {
  width: 100%;
  height: 137px;
  text-align: center;
  line-height: 137px;
  font-size: 16px;
  color: rgb(102, 102, 102);
  font-family: MicrosoftYaHei;
}
.contnt span {
  color: rgb(200, 0, 10);
}
.btn_box {
  width: 100%;
  height: 50px;
  border-radius: 0px 0px 8px 8px;
  border-top: 1px solid #eeeeee;
}
.btn_box span:nth-child(1) {
  border-right: 1px solid #eeeeee;
  display: inline-block;
  width: 50%;
  height: 48px;
  float: left;
  text-align: center;
  line-height: 48px;
  font-size: 16px;
  color: rgb(200, 0, 10);
}
.btn_box span:nth-child(2) {
  display: inline-block;
  float: left;
  width: 50%;
  height: 48px;
  text-align: center;
  line-height: 48px;
  font-size: 16px;
  color: rgb(200, 0, 10);
}
.mark {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete.addr {
  font-size: 12px;
  color: #b4b4b4;
}

.my-autocomplete.highlighted .addr {
  color: #ddd;
}
</style>
