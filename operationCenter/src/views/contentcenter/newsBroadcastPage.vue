<template>
  <div class="news">
    <!-- title名称 -->
    <title-name :item="titleName"/>
    <!-- 查询 -->
    <Chaxun @search_btn="search_btn"/>
    <div class="list">
      <el-button
        style="background: #c8000a; color: #fff; font-size:15px; width:100px; height: 34px; border: 0; margin: 24px 0 10px 1400px;"
        @click="add()"
      >新增</el-button>
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>标题内容</th>
            <th>链接</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>排序</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ item.nrContent }}</td>
            <td>{{ item.nrUrl }}</td>
            <td>{{ item.startTime }}</td>
            <td>{{ item.endTime }}</td>
            <td>{{ item.sort }}</td>
            <td>{{ item.deleteFlag===0 ?"启用":"停用" }}</td>
            <td class="last_list">
              <span style="cursor: pointer;" @click="edit(item)">编辑</span>
              <span style="cursor: pointer;" @click="stop(item)">{{ item.deleteFlag===0?"停用":"启用" }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="line"/>
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
    </div>

    <!-- 新增播报 -->
    <div v-show="show1" class="mask">
      <div class="littleMask">
        <div class="maskHeader">
          <span>新增播报</span>
          <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span>
        </div>
        <div class="tableform">
          <div>
            <span style="color: #c8000a;">*</span>
            标题内容
            <el-input
              v-model="input"
              placeholder="请输入内容"
              clearable
              style="width:280px; height: 34px; margin: 0 0 0 10px;"
            />
            <span>(不能超过20个字符)</span>
          </div>
          <div>
            链接
            <el-input
              v-model="input1"
              placeholder="请输入内容"
              clearable
              style="width:280px; height: 34px; margin: 0 0 0 10px;"
            />
          </div>
          <div>
            <span style="color: #c8000a;">*</span>
            开始时间
            <el-date-picker
              v-model="value1"
              type="date"
              style="margin: 5px 0 0 10px; width:280px; height: 34px;"
              format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
            />
            <el-time-picker
              v-model="value7"
              :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
              placeholder="任意时间点"
              style="width:150px; height: 34px; margin: 5px 0 0 0;"
              value-format="HH:mm:ss"
                  format="HH:mm:ss"
            />
          </div>
          <div>
            <span style="color: #c8000a;">*</span>
            结束时间
            <el-date-picker
              v-model="value2"
              type="date"
              style="margin: 5px 0 0 10px; width:280px; height: 34px;"
              format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
            />
            <el-time-picker
              v-model="value8"
              :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
              placeholder="任意时间点"
              style="width:150px; height: 34px; margin: 5px 0 0 0;"
              value-format="HH:mm:ss"
                  format="HH:mm:ss"
            />
          </div>
          <div>
            <span style="color: #c8000a;">*</span>
            排序值
            <el-input
              v-model="input2"
              placeholder="请输入内容"
              clearable
              style="width:280px; height: 34px; margin: 0 0 0 10px;"
            />
          </div>
          <div>
            <span style="color: #c8000a;">*</span>
            状态
            <el-select
              v-model="value3"
              placeholder="请选择"
              style="margin: 5px 0 0 10px; width:280px; height: 34px;"
            >
              <el-option
                v-for="item in arr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="search_btn" @click="save()">保存</div>
      </div>
    </div>
    <!-- 编辑播报 -->
    <div v-show="show2" class="mask">
      <div class="littleMask">
        <div class="maskHeader">
          <span>编辑播报</span>
          <span style="cursor: pointer;float:right" @click="hiddenShow()">X</span>
        </div>
        <div class="tableform">
          <div>
            <span style="color: #c8000a;">*</span>
            标题内容
            <el-input
              v-model="input3"
              placeholder="旅游频道上线了"
              clearable
              style="width:280px; height: 34px; margin: 0 0 0 10px;"
            />
            <span>(不能超过20个字符)</span>
          </div>
          <div>
            链接
            <el-input
              v-model="input4"
              placeholder="http://www.com"
              clearable
              style="width:280px; height: 34px; margin: 0 0 0 10px;"
            />
          </div>
          <div>
            <span style="color: #c8000a;">*</span>
            开始时间
            <el-date-picker
              v-model="valueee"
              type="date"
              style="margin: 5px 0 0 10px; width:280px; height: 34px;"
              placeholder="2018-09-09"
              format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
            />
            <el-time-picker
              v-model="value5"
              :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
              placeholder="任意时间点"
              style="width:150px; height: 34px; margin: 5px 0 0 0;"
              value-format="HH:mm:ss"
                  format="HH:mm:ss"
            />
          </div>
          <div>
            <span style="color: #c8000a;">*</span>
            结束时间
            <el-date-picker
              v-model="valuee"
              type="date"
              style="margin: 5px 0 0 10px; width:280px; height: 34px;"
              placeholder="2018-09-09"
              format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
            />
            <el-time-picker
              v-model="value6"
              :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
              placeholder="任意时间点"
              style="width:150px; height: 34px; margin: 5px 0 0 0;"
              value-format="HH:mm:ss"
                  format="HH:mm:ss"
            />
          </div>
          <div>
            <span style="color: #c8000a;">*</span>
            排序值
            <el-input
              v-model="input5"
              placeholder="2"
              clearable
              style="width:280px; height: 34px; margin: 0 0 0 10px;"
            />
          </div>
          <div>
            <span style="color: #c8000a;">*</span>
            状态
            <el-select
              v-model="value4"
              placeholder="启用"
              style="margin: 5px 0 0 10px; width:280px; height: 34px;"
            >
              <el-option
                v-for="item in arr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
import titleName from "@/components/titleName/titleName";
import Chaxun from "./component/Chaxun";
import { newPages, addNews, update } from "@/api/news/news";
//import { newPages } from "@/api/news/news";

export default {
  name: "NewsBroadcastPage",
  components: {
    titleName,
    Chaxun
  },
  // inject: ['reload'],
  data() {
    return {
      titleName: "新闻播报",
      list: [],
      arr: [],
      pageNum: 1,
      pageSize: 10,
      totalPages: 35,
      show1: false,
      show2: false,
      input: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      maskCharacter: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      valuee:'',
      valueee:'',
      param: {
        deleteFlag: "",
        endTime: "",
        nrContent: "",
        sort: "",
        startTime: "",
        nrId: "",
        pageNum: "",
        pageSize: "",
      },
      arr: [
        { value: "", label: "请选择" },
        { value: 1, label: "停用" },
        { value: 0, label: "启用" }
      ]
    };
  },
  mounted() {
    this.getList(this.param);
    // this.save(this.param)
  },
  methods: {
    changeList(val) {
      this.param.pageNum = val
      this.getList(this.param)
    },
    handleSizeChange(val) {
      this.param.pageSize = val;
      this.getList(this.param);
    },
    add() {
      console.log(11);
      this.show1 = true;
    },
    hiddenShow() {
      this.show1 = false;
      this.show2 = false;
    },
    save() {
      var id = JSON.parse(localStorage.getItem("id"));
      console.log(id);
      var obj = {
        'deleteFlag': this.value3,
        'nrContent': this.input,
        'nrUrl': this.input1,
        'nrId': '',
        'startTime': this.value1 + 'T' + this.value7,
        'endTime': this.value2 + 'T' + this.value8,
        'sort': this.input2,
      };
      if(obj.nrContent === ''){
        this.$message({
          message: '标题内容不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj.startTime === ''){
        this.$message({
          message: '开始时间不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj.deleteFlag === ''){
        this.$message({
          message: '状态不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj.endTime === ''){
        this.$message({
          message: '结束时间不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if (obj.nrContent.length >= 20) {
        this.$message({
          message: '标题内容长度超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      }else if (obj.sort == '') {
        this.$message({
          message: '排序值不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }
      addNews(obj).then(res => {
          console.log(res);
          if (res.data.code == 200) {
          this.show1 = false
        } else {
          this.show1 = true
        }
        this.getList(this.param)
         this.input='',this.input1='',this.value1='',this.value7='',this.value2='',this.value8='',this.input2='';
      }).catch(err => {
          console.log(err);
      });
    },
    edit(item) {
      this.show2 = true;
      console.log(item.nrId);
      localStorage.setItem("id", JSON.stringify(item.nrId));
    },
    stop(item){
      var obj3 = {
        deleteFlag: item.deleteFlag === 0 ? 1 : 0,
        nrId : item.nrId
      }
      update(obj3).then(res => {
          console.log(res);  
          this.getList(this.param)
        }).catch(err => {
          console.log(err);
        });
    },
    save1() {
      var id = JSON.parse(localStorage.getItem("id"));
      var obj1 = {
        deleteFlag: this.value4,
        nrContent: this.input3,
        nrUrl: this.input4,
        nrId: id,
        startTime: this.valueee + "T" + this.value5,
        //redisKey: "",
        endTime: this.valuee + "T" + this.value6,
        sort: this.input5
      };
      if(obj1.nrContent === ''){
        this.$message({
          message: '标题内容不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj1.startTime === ''){
        this.$message({
          message: '开始时间不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj1.deleteFlag === ''){
        this.$message({
          message: '状态不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if(obj1.endTime === ''){
        this.$message({
          message: '结束时间不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }else if (obj1.nrContent.length >= 20) {
        this.$message({
          message: '标题内容长度超过限制',
          type: 'error',
          duration: 1500
        })
        return false
      }else if (obj1.sort == '') {
        this.$message({
          message: '排序值不能为空',
          type: 'error',
          duration: 1500
        })
        return false
      }
      update(obj1)
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
          this.show2 = false
        } else {
          this.show2 = true
        }
        //this.$router.go(0)
        this.getList(this.param)
        this.input3='',this.input4='',this.valueee='',this.value5='',this.valuee='',this.value6='',this.input5='';

        })
        .catch(err => {
          console.log(err);
        });
    },
    getList(params) {
      // alert(111)
      newPages(params).then(res => {
        this.pageNum = res.data.data.pageNum;
        this.pageSize = res.data.data.pageSize;
        this.totalPages = res.data.data.total;
        this.list = res.data.data.list;
        console.log(res);
      });
    },
    search_btn(val) {
      //console.log(val)
      this.param.nrContent = val.nrContent
      this.param.startTime = val.startTime
      this.param.endTime = val.endTime
      this.param.deleteFlag = val.deleteFlag
      this.getList(this.param)
    },
  }
};
</script>

<style scoped>
.news {
  padding: 24px 24px 50px 24px;
  background-color: #fbfbfb;
  min-width: 1200px;
  height: 100%;
}
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
  width: 664px;
  height: 504px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 8px;
  position: relative;
}
.tableform {
  display: flex;
  flex-direction: column;
  padding: 0 0 0 50px;
}
.tableform div {
  margin: 20px 0 0 0;
}
.tableform div:nth-of-type(1) span {
  font-size: 12px;
  color: #666;
}
.tableform div:nth-of-type(2) {
  margin-left: 40px;
}
.tableform div:nth-of-type(5) {
  margin-left: 16px;
}
.tableform div:nth-of-type(6) {
  margin-left: 30px;
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
  left: 280px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 38px;
}
</style>
