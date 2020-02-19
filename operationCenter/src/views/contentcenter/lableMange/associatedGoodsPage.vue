<template>
  <div class="container">
    <title-name :item="titleName" />
    <!--区域搜索-->
    <div class="search_box">
      <div class="selectItem">
        <div class="celectItemL">商户名称</div>
        <div class="celectItemR">
          <input v-model="mechantName" placeholder="请输入商户名称" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">频道</div>
        <div class="celectItemR">
          <el-select v-model="yeWuValue" placeholder="请选择">
            <el-option v-for="item in yeWuBanKuai" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">归属城市</div>
        <div class="celectItemR">
          <el-select v-model="cityName" placeholder="请选择">
            <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">商品编号</div>
        <div class="celectItemR">
          <input v-model="goodsId" placeholder="请输入商户名称" type="text">
        </div>
      </div>
      <div class="selectItem">
        <div class="celectItemL">商品名称</div>
        <div class="celectItemR">
          <input v-model="goodsName" placeholder="请输入商户名称" type="text">
        </div>
      </div>
      <div class="buttonBox">
        <el-button style="background:#C8000A;margin-left:30px;" type="danger">查询</el-button>
      </div>
    </div>
    <!--table数据区域-->
    <div class="list_content_box">
      <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#F6F6F6',color:'rgb(102,102,102)'}" border max-height="250" style="width: 100%;border:1px solid #E4E4E4;)" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" label="商户名称" prop="shopname" />
        <el-table-column align="center" label="频道" prop="name" />
        <el-table-column align="center" label="商品编号" prop="address" />
        <el-table-column align="center" label="归属城市" prop="city" />
        <el-table-column align="center" label="商品名称" prop="shoptitle" />
      </el-table>
      <div class="line" />
      <!--分页区域-->
      <div class="page_msg">
        <el-pagination :current-page="pageNum" :total="totalPages" layout="prev, pager, next,  jumper, total, sizes " @current-change="changeList" @size-change="handleSizeChange" />
      </div>
    </div>

    <!--选中数据展示table-->
    <div class="list_content_box">
      <el-table :data="tableDataSelect" :header-cell-style="{background:'#F6F6F6',color:'rgb(102,102,102)'}" border max-height="250" style="width: 100%;border:1px solid #E4E4E4;)" tooltip-effect="dark">
        <el-table-column align="center" label="商户名称" prop="shopname" />
        <el-table-column align="center" label="频道" prop="name" />
        <el-table-column align="center" label="商品编号" prop="address" />
        <el-table-column align="center" label="归属城市" prop="city" />
        <el-table-column align="center" label="商品名称" prop="shoptitle" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="line" />
      <!--分页区域-->
      <div class="page_msg">
        <el-pagination :current-page="pageNum" :total="totalPages" layout="prev, pager, next,  jumper, total, sizes " @current-change="changeList" @size-change="handleSizeChange" />
      </div>
    </div>

    <div class="foot">
      <el-button style="background:#C8000A; width: 150px;" type="danger" @click="allsave()">保存</el-button>
    </div>
  </div>
</template>

<script>
import titleName from '@/components/titleName/titleName'
import { city } from '../../../api/cityPage'
import { allAdd, commodityPage } from '@/api/label/label'
export default {
  name: 'AssociatedGoodsPage',
  components: {
    titleName
  },
  data() {
    return {
      titleName: '关联商品',
      mechantName: '',
      goodsId: '',
      goodsName: '',
      yeWuValue: '',
      yeWuBanKuai: [
        { value: '', label: '请选择' },
        { value: 1, label: '旅游频道' },
        { value: 2, label: 'e差旅' }
      ],
      cityName: '',
      cityList: [],
      tableData: [
        {
          shopname: '北京中青旅',
          city: '北京',
          name: '景区门票',
          address: '1234567980',
          shoptitle: '欢乐谷'
        },
        {
          shopname: '北京中青旅',
          city: '北京',
          name: '景区门票',
          address: '1234567980',
          shoptitle: '欢乐谷'
        },
        {
          shopname: '北京中青旅',
          city: '北京',
          name: '景区门票',
          address: '1234567980',
          shoptitle: '欢乐谷'
        },
        {
          shopname: '北京中青旅',
          city: '北京',
          name: '景区门票',
          address: '1234567980',
          shoptitle: '欢乐谷'
        },
        {
          shopname: '北京中青旅',
          city: '北京',
          name: '景区门票',
          address: '1234567980',
          shoptitle: '欢乐谷'
        },
        {
          shopname: '北京中青旅',
          city: '北京',
          name: '景区门票',
          address: '1234567980',
          shoptitle: '欢乐谷'
        },
        {
          shopname: '北京中青旅',
          city: '北京',
          name: '景区门票',
          address: '1234567980',
          shoptitle: '欢乐谷'
        }
      ],
      tableDataSelect: [
        {
          shopname: '北京中青旅',
          city: '北京',
          name: '景区门票',
          address: '1234567980',
          shoptitle: '欢乐谷'
        },
        {
          shopname: '北京中青旅',
          city: '北京',
          name: '景区门票',
          address: '1234567980',
          shoptitle: '欢乐谷'
        }
      ],
      multipleSelection: [], // 选中数据的数组
      pageNum: 1,
      pageSize: 10,
      totalPages: 20
    }
  },
  mounted() {
    this.cityList = city.citydata
  },
  created: function() {
    this.getList()
  },
  methods: {
    // 选中的数据
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      this.tableDataSelect = val
    },
    handleDelete(index, row) { },
    // 分页获取列表
    changeList(val) { },
    handleSizeChange(val) { },
    allsave() {
      var params = [
        {
          labelId: 1,
          commodityId: 112269,
          type: 1
        }
      ]
      allAdd(params).then(res => {
        console.log(res)
      })
    },
    getList: function() {
      var params = {
        cityName: '',
        hotelChnName: '',
        hotelId: '',
        labelId: '',
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      console.log(2222)
      commodityPage(params).then(res => {
        console.log('-----')
        console.log(res)
      }).catch(err => {
        console.log('err' + err)
      })
    }
  }
}
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
.foot {
    height: 80px;
    text-align: center;
    line-height: 80px;
    background: #fff;
}
</style>
