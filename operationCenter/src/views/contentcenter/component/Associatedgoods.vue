<template>
  <div class="container">
    <title-name :item="titleName"/>
    <!--区域搜索-->
    <div class="search_box">
      <div class="selectItem">
        <div class="celectItemL">商户名称</div>
        <div class="celectItemR">
          <input v-model="linkPhone" type="text" placeholder="请输入商户名称">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">频道</div>
        <div class="celectItemR">
          <el-select v-model="yeWuValue" placeholder="请选择">
            <el-option
              v-for="item in yeWuBanKuai"
              :key="item.channelId"
              :label="item.channelName"
              :value="item.channelId"
            />
          </el-select>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">归属城市</div>
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
        <div class="celectItemL">商品编号</div>
        <div class="celectItemR">
          <input v-model="linkPhone" type="text" placeholder="请输入商户名称">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">商品名称</div>
        <div class="celectItemR">
          <input v-model="linkPhone" type="text" placeholder="请输入商户名称">
        </div>
      </div>
      <div class="buttonBox">
        <el-button type="danger" style="background:#C8000A;margin-left:30px;" @click="search()">查询</el-button>
      </div>
    </div>
    <!--table数据区域-->
    <div class="list_content_box">
      <el-table
        ref="multipleTable"
        border
        :data="tableData1"
        tooltip-effect="dark"
        :header-cell-style="{background:'#F6F6F6',color:'rgb(102,102,102)'}"
        style="width: 100%;border:1px solid #E4E4E4;)"
        max-height="250"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55"/>
        <el-table-column label="商户名称" align="center" prop="accountName"/>
        <el-table-column prop="channelName" label="频道" align="center"/>
        <el-table-column prop="goodsNum" label="商品编号" align="center"/>
        <el-table-column prop="belongCityName" label="归属城市" align="center"/>
        <el-table-column prop="goodsName" label="商品名称" align="center"/>
      </el-table>
      <div class="line"/>
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
    <!--选中数据展示table-->
    <div class="list_content_box" style="display: none;" ref="selected">
      <el-table
        border
        :data="tableDataSelect"
        tooltip-effect="dark"
        :header-cell-style="{background:'#F6F6F6',color:'rgb(102,102,102)'}"
        style="width: 100%;border:1px solid #E4E4E4;)"
        max-height="250"
      >
        <el-table-column label="商户名称" align="center" prop="accountName"/>
        <el-table-column prop="channelName" label="频道" align="center"/>
        <el-table-column prop="goodsNum" label="商品编号" align="center"/>
        <el-table-column prop="belongCityName" label="归属城市" align="center"/>
        <el-table-column prop="goodsName" label="商品名称" align="center"/>
        <el-table-column prop="nominateLanguage" label="产品推荐语" align="center"/>
        <el-table-column prop="nominateCityName" label="推荐城市" align="center"/>
        <el-table-column prop="sort" label="排序" align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="background: none; color: #c8000a; border:0;"
              @click="edit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              style="background: none; color: #c8000a; border:0;"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="line"/>
      <!--分页区域-->
      <div class="page_msg">
        <el-pagination
          :total="totalPages1"
          :current-page="pageNum1"
          layout="prev, pager, next,  jumper, total, sizes "
          @current-change="changeList1"
          @size-change="handleSizeChange1"
        />
      </div>
      <div class="foot">
        <el-button type="danger" style="background:#C8000A; width: 150px;" @click="allsave()">保存</el-button>
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
                v-model="input1"
                placeholder="欢乐谷"
                style="width: 300px; height: 34px; margin-left: 10px;"
              />
            </p>
            <p>
              商品编号
              <el-input
                v-model="input2"
                placeholder="11111111"
                style="width: 300px; height: 34px; margin-left: 10px;"
              />
            </p>
            <div>
              <span style="color: #c8000a; margin: 0 5px 0 0;">*</span>
              产品推荐语
              <el-input
                v-model="recom"
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
                v-model="paixu"
                placeholder="请输入排序值"
                style="width: 300px; height: 34px; margin-left: 10px;"
              />
            </p>
            <div style="position:relative;">
              <span style="color: #c8000a; margin: 0 5px 0 0;">*</span>
              城市
              <!-- <el-input
                v-model="city"
                placeholder="请输入城市"
                style="width: 194px; height: 34px; margin-left: 10px;"
                @change="city1"
              />-->
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
    </div>
  </div>
</template>

<script>
//debugger;
import titleName from "@/components/titleName/titleName";
import { city } from "../../../api/cityPage";
import {
  associatePages,
  addAssociatedGoods,
  chanel,
  City
} from "@/api/productrecommend/productrecom";
export default {
  name: "AssociatedGoodsPage",
  components: {
    titleName
  },
  data() {
    return {
      isshow: true,
      titleName: "关联商品",
      linkPhone: "",
      yeWuValue: "",
      yeWuBanKuai: [
        { value: "", label: "请选择" },
        { value: 1, label: "旅游频道" },
        { value: 2, label: "e差旅" }
      ],
      cityName: "",
      cityList: [],
      tableData: [],
      tableDataSelect: [],
      tableData1: [],
      multipleSelection: [], // 选中数据的数组
      pageNum: 1,
      totalPages: 20,
      pageNum1: 1,
      totalPages1: 20,
      show1: false,
      input1: "",
      input2: "",
      paixu: "", //排序
      city: "", //推荐城市
      shopname: "", //商户名称
      recom: "", //产品推荐语
      arr: [],
      id: "", //商户id
      i: "",
      citys: [],
      cityss: [],
      selectCitys: [],
      cityName: "",
      cityList: [],
      restaurants: [],
      param: {
        accountName: "",
        channalName: "",
        cityName: "",
        goodsName: "",
        goodsNum: "",
        pageNo: 1,
        pageSize: 10
      },
      param1: {
        keyWords: ""
      }
    };
  },
  mounted() {
    this.cityList = city.citydata;
    this.loadAll();
    var data1 = JSON.parse(localStorage.getItem("data"));
    console.log(data1); 
    if(data1){
      this.tableDataSelect = data1;
    }else{
      this.tableDataSelect = ''
    }
    this.getList(this.param);
    chanel().then(res => {
      this.yeWuBanKuai = res.data.data;
    });
    City(this.param1).then(res => {
      var cityname = res.data.data;
      this.citys = res.data.data;
      for (var i = 0; i < this.citys.length; i++) {
        var str = this.citys[i].name;
        var str1 = str.split("-")[0];
        this.cityss.push(str1);
      }
    });

  },

  methods: {
    // 选中的数据
    handleSelectionChange(val) {
      this.tableDataSelect = val;
      this.tableDataSelect.forEach(item => {
        this.$set(item, "nominateCityCode", "");
        this.$set(item, "nominateCityName", "");
        this.$set(item, "nominateLanguage", "");
        this.$set(item, "shopname", "");
        this.$set(item, "sort", "");
        this.$set(item, "isDel", 0);
        this.$set(item, "channelId", this.yeWuValue);
        this.$set(item, "type", 1);
      });
      this.$refs.selected.style.display = "block";
    },
    handleDelete(index, row) {
      this.tableDataSelect.splice(index, 1);
    },
    edit(index, row) {
      //console.log(this.tableDataSelect);
      this.i = index;
      this.id = row.id;
      this.show1 = true;
      this.input1 = row.goodsName;
      this.input2 = row.goodsNum;
      this.accountName = row.accountName; //商户名称
    },
    getList(params) {
      if (this.yeWuValue == 2) {
        associatePages(params).then(res => {
          this.pageNum = res.data.data.currentPage;
          this.pageSize = res.data.data.pageSize;
          this.totalPages = res.data.data.totalPage;
          this.tableData1 = res.data.data.items;
          console.log(res);
        });
      }
    },
    // 分页获取列表
    changeList(val) {
      this.param.pageNo = val;
      console.log(this.param.pageNo);
      //console.log(val);
      this.getList(this.param);
    },
    handleSizeChange(val) {
      console.log(val);
      this.param.pageSize = val;
      this.getList(this.param);
    },
    changeList1(val) {
      this.param.pageNum = val;
      this.getList(this.param);
    },
    handleSizeChange1(val) {
      this.param.pageSize = val;
      this.getList(this.param);
    },
    hiddenShow() {
      this.show1 = false;
    },
    save(index) {
      var index = this.i;
      this.show1 = false; //关闭弹框
      this.tableDataSelect[index] = Object.assign(this.tableDataSelect[index], {
        //nominateCityCode: this.nominateCityCode,
        nominateLanguage: this.recom,
        nominateCityName: this.arr.join(","),
        sort: this.paixu
      });
      // console.log(this.tableDataSelect[index]);
      //清空文本框
      this.input1 = this.input2 = this.shopname = this.recom = this.cityName = this.paixu = null;
      this.arr = [];
    },
    add() {
      // console.log(this.recomcity);
      var cs = this.cityName;
      this.arr.push(cs);
      //console.log(this.arr);
      this.cityName = "";
    },
    delete1(i) {
      this.arr.splice(i, 1);
    },
    search() {
      this.getList(this.param);
    },
    city1() {},
    allsave() {
      addAssociatedGoods(this.tableDataSelect).then(res => {
        console.log(res);
      });
      this.$router.go(-1);
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
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 24px 24px 50px 24px;
  background-color: #fbfbfb;
  min-width: 1200px;
  .search_box {
    width: 100%;
    border-bottom: 1px solid #f6f6f6;
    padding: 20px 40px;
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
    .buttonBox {
      display: inline-block;
    }
  }
  .list_content_box {
    width: 100%;
    background: white;
    .line {
      width: 100%;
      border: 0.5px solid #dfdfdf;
      margin-top: 40px;
    }
    .page_msg {
      text-align: right;
      padding: 20px 50px 40px 0px;
      background-color: #ffffff;
      color: #666666;
    }
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
.foot {
  height: 80px;
  text-align: center;
  line-height: 80px;
  background: #fff;
}
</style>
