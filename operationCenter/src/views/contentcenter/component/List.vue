<template>
  <div class="list">
    <Up @search_btn="search_btn" />

    <el-button
      style="background: #c8000a; color: #fff; font-size:15px; width:100px; height: 34px; border: 0; margin: 24px 0 10px 1400px;"
      @click="add()"
    >新增</el-button>
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>频道</th>
          <th>展位名称</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in recomlist" :key="index">
          <td>{{ index+1 }}</td>
          <td>{{ item.channelName }}</td>
          <td>{{ item.boothName }}</td>
          <td>{{item.status===0 ?"启用":"停用"}}</td>
          <td class="last_list">
            <span  @click="detail(item)" style="cursor: pointer;">详情</span>
            <!-- <router-link :to="'/businessbullmange/seebusinessmanage/'+item.id" tag="span" style="cursor: pointer;">查看</router-link> -->            <span style="cursor: pointer;" @click="edit(item)">编辑</span>
            <span style="cursor: pointer;" @click="stop(item)">{{item.status===0?"停用":"启用" }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div id="line" />
    <!-- 分页 -->
    <div class="page_msg">
      <el-pagination
        :total="totalPages"
        :current-page="pageNum"
        layout="prev, pager, next,  jumper, total, sizes "
        @current-change="changeList"
        @size-change="handleSizeChange"
      />
    </div>
    <!-- 新增展位 -->
    <div v-show="show1" class="mask">
      <div class="littleMask">
        <div class="maskHeader">
          <span>新增展位</span>
          <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span>
        </div>
        <div class="tableform">
          <div class="selectedItem">
            <span style="color: #c8000a">*</span>
            频道
            <el-select v-model="yeWuValue" placeholder="请选择" style="width: 280px;">
              <el-option
                v-for="item in yeWuBanKuai"
                :key="item.channelId"
                :label="item.channelName"
                :value="item.channelId"
              />
            </el-select>
          </div>
          <div class="selectedItem">
            <span style="color: #c8000a">*</span>
            展位名称
            <el-select v-model="zhanwei" placeholder="请选择" style="width: 280px;">
              <el-option
                v-for="(items) in list1"
                :key="items.boothId"
                :label="items.boothName"
                :value="items.boothId"
              />
            </el-select>
          </div>
          <div class="selectedItem">
            <span style="color: #c8000a">*</span>
            状态
            <el-select v-model="zhuangtai" placeholder="请选择" style="width: 280px;">
              <el-option
                v-for="(items) in list2"
                :key="items.value"
                :label="items.label"
                :value="items.value"
              />
            </el-select>
          </div>
        </div>
        <div class="search_btn" @click="save()">保存</div>
      </div>
    </div>
    <!-- 编辑展位 -->
    <div v-show="show2" class="mask">
      <div class="littleMask">
        <div class="maskHeader">
          <span>编辑展位</span>
          <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span>
        </div>
        <div class="tableform">
          <div class="selectedItem">
            <span style="color: #c8000a">*</span>
            频道
            <el-select v-model="yeWuValue1" placeholder="请选择" style="width: 280px;">
              <el-option
                v-for="item in yeWuBanKuai"
                :key="item.channelId"
                :label="item.channelName"
                :value="item.channelId"
              />
            </el-select>
          </div>
          <div class="selectedItem">
            <span style="color: #c8000a">*</span>
            展位名称
            <el-select v-model="zhanwei1" placeholder="请选择" style="width: 280px;">
              <el-option
                v-for="(items) in list1"
                :key="items.boothId"
                :label="items.boothName"
                :value="items.boothId"
              />
            </el-select>
          </div>
          <div class="selectedItem">
            <span style="color: #c8000a">*</span>
            状态
            <el-select v-model="zhuangtai1" placeholder="请选择" style="width: 280px;">
              <el-option
                v-for="(items) in list2"
                :key="items.value"
                :label="items.label"
                :value="items.value"
              />
            </el-select>
          </div>
        </div>
        <div class="search_btn" @click="save1()">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPages, addProduct, update, chanel, booth, getProduct } from '@/api/productrecommend/productrecom'
import Up from './Up'
export default {
  name: 'List',
  components: {
    Up
  },
  data() {
    return {
      list: [
        {
          pd: '旅游频道首页',
          mc: '玩转门票节',
          status: '启用'
        },
        {
          pd: '旅游频道首页',
          mc: '人气必玩',
          status: '启用'
        },
        {
          pd: '旅游频道首页',
          mc: '热门景点',
          status: '启用'
        },
        {
          pd: '旅游频道首页',
          mc: '搜索结果页推荐',
          status: '停用'
        }
      ],
      recomlist: [],
      status: '',
      pageNum: 1,
      pageSize: 10,
      totalPages: 30,
      show1: false,
      show2: false,
      maskCharacter: '',
      list: '',
      yeWuValue: '',
      yeWuValue1: '',
      yeWuBanKuai: [],
      zhuangtai: '',
      zhuangtai1: '',
      list1: [],
      zhanwei: '',
      zhanwei1: '',
      list2: [
        { value: '', label: '请选择' },
        { value: 1, label: '停用' },
        { value: 0, label: '启用' }
      ], 
      param: {
        boothId: '',
        channelId: '',
        pageNum: '',
        pageSize: '',
        id: '',
        boothName: '',
        status: '',
        channelName: ''
      }
    }
  },
  mounted() {
    this.getList(this.param)
  },
  methods: {
    detail(item) {
      var id = item.id
      var boothId = item.boothId
      //var channelId = item.channelId
      console.log(boothId);
      if(boothId==1){
          this.$router.push('/ticket');
      }
      if(boothId==2){
          this.$router.push('/mustplay')
      }
      if(boothId==3){
         this.$router.push('/hotplay')
      }
      if(boothId==4){
        this.$router.push('/searchresult')
      }
      
    },
    save() {
      var obj = {
        'channelId': this.yeWuValue,
        'boothId': this.zhanwei,
        'status': this.zhuangtai
      }
      if(obj.channelId === ''){
      	this.$message({
          message: '频道不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj.boothId === ''){
      	this.$message({
          message: '展位名称不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj.status===''){
      	this.$message({
          message: '状态不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }
      addProduct(obj).then(res => {
        console.log(res.data)
        if (res.data.code == 200) {
          this.show1 = false
        } else {
          this.show1 = true
        }
        this.getList(this.param)
      }).catch(err => {
        console.log(err)
      })
    },
    save1() {
      var id = JSON.parse(localStorage.getItem('id'))
      console.log(id)
      var obj1 = {
        'channelId': this.yeWuValue1,
        'boothId': this.zhanwei1,
        'status': this.zhuangtai1,
        'id': id
      }
      if(obj1.channelId === ''){
      	this.$message({
          message: '频道不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj1.boothId === ''){
      	this.$message({
          message: '展位名称不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj1.status===''){
      	this.$message({
          message: '状态不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }
      update(obj1).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.show2 = false
        } else {
          this.show2 = true
        }
        //this.$router.go(0)
        this.getList(this.param)
      }).catch(err => {
        console.log(err)
      })
    },
    stop(item){
      //console.log(11)
      var obj3 = {
        id: item.id,
        channelId: item.channelId,
        status: item.status === 0 ? 1 : 0,
      }
      update(obj3).then(res => {
        console.log(res) 
        this.getList(this.param)
      }).catch(err => {
        console.log(err)
      })
    },
    edit(item) {
      //console.log(item.id)
      var id = item.id
      localStorage.setItem('id', JSON.stringify(item.id))
      this.show2 = true
      chanel().then(res => {
        this.yeWuBanKuai = res.data.data
      })
      booth().then(res => {
        this.list1 = res.data.data
      })
      //单个详情
      getProduct(id).then(res => {
        //console.log(res.data.data.status) 
        this.yeWuValue1 = res.data.data.channelName;
        //console.log(this.yeWuBanKuai.channelName)
        this.zhanwei1 = res.data.data.boothName;
        if(res.data.data.status==0){
          this.zhuangtai1 = '启用'
        }else{
          this.zhuangtai1 = '停用'
        }
      })
    },
    search_btn(val) {
      console.log(val)
      this.param.channelId = val.channelId
      this.param.boothId = val.boothId
      this.getList(this.param)
    },
    changeList(val) {
      console.log(val)
      this.param.pageNum = val
      this.getList(this.param)
    },
    handleSizeChange(val) {
      this.param.pageSize = val
      this.getList(this.param)
    },
    add() {
      this.show1 = true
      chanel().then(res => {
        this.yeWuBanKuai = res.data.data
      })
      booth().then(res => {
        this.list1 = res.data.data
      })
    },
    hiddenShow() {
      this.show1 = false
      this.show2 = false
    },
    getList(params) {
      getPages(params).then((res) => {
        console.log(res);
        this.recomlist = res.data.data.list
        this.pageNum = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.totalPages = res.data.data.total
        //console.log(res.data.data.list)
      })
    }
  }
}
</script>
<style scoped>
.list {
  padding: 0 0 0 23px;
  background: #fff;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 10px;
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
#line {
  height: 1px;
  background: #f6f6f6;
  margin: 32px 0 30px 0;
}
.page_msg {
  text-align: right;
  padding: 20px 0px 40px 0px;
  background-color: #ffffff;
  color: #666666;
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
  width: 448px;
  height: 318px;
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
.selectedItem {
  margin: 20px 0;
  padding: 0 0 0 40px;
}
.tableform .selectedItem:nth-of-type(1),
.tableform .selectedItem:nth-of-type(3) {
  margin-left: 30px;
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
</style>

