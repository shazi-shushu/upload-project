<template>
  <div class="container">
    <div class="input_box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="频道" prop="region">
          <el-select v-model="yeWuValue" placeholder="请选择" style="width: 350px;">
            <el-option
              v-for="item in yeWuBanKuai"
              :key="item.channelId"
              :label="item.channelName"
              :value="item.channelId"
            />
          </el-select>
          <!-- <el-select v-model="ruleForm.region" placeholder="请选择" style="width:350px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="标签名称" prop="labelname" style="width:450px;">
          <el-input v-model="ruleForm.labelname"></el-input>
        </el-form-item>
        <el-form-item label="景区主题" prop="scenic">
          <div style="width:500px;">
            <el-checkbox-group v-model="checkedCities1" @change="handleCheckAllChange">
              <el-checkbox
                v-for="city in cities"
                :label="city"
                :key="city"
                style="padding:0px 5px 0px 0px;"
              >{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="上传图片" prop="picture">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList"
          >
            <el-button size="small" type="danger">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="链接" prop="linkurl" style="width:450px;">
          <el-input v-model="ruleForm.linkurl"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc" style="width:450px;">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="排序值" prop="sort" style="width:450px;">
          <el-input v-model="ruleForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <!-- <el-select v-model="ruleForm.status" placeholder="请选择" style="width:350px;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
          <el-select v-model="zhuangtai" placeholder="请选择" style="width: 350px;">
              <el-option
                v-for="(items) in list2"
                :key="items.value"
                :label="items.label"
                :value="items.value"
              />
            </el-select>
        </el-form-item>
        <el-form-item style="margin-left:70px;">
          <el-button @click="submitForm('ruleForm')" type="danger">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>
import { chanel, booth } from "@/api/productrecommend/productrecom";

const cityOptions = [
  "主题乐园",
  "人文建筑",
  "古迹遗址",
  "园林景观",
  "动植物园",
  "温泉",
  "电影动漫",
  "水上乐园",
  "田园度假",
  "宗教祈福",
  "湖光山色",
  "漂流",
  "草原沙漠",
  "海滨岛屿",
  "美食购物",
  "自然风光",
  "赏花踏青",
  "滑雪",
  "城市观光",
  "赛事演出",
  "购物精选",
  "室内娱乐",
  "水乡古镇",
  "亲子",
  "交通游船",
  "时令采摘",
  "团队拓展",
  "登山徒步",
  "游乐场",
  "博物馆"
];
export default {
  name: "addSaveEditPage",
  data() {
    return {
      checkedCities1: [
        "主题乐园",
        "电影动漫",
        "草原沙漠",
        "城市观光",
        "交通游船"
      ],
      cities: cityOptions,
      ruleForm: {
        region: "",
        labelname: "",
        desc: "",
        linkurl: "",
        sort: "",
        status: "",
        picture: "",
        scenic: ""
      },
      rules: {
        region: [{ required: true, message: "请选择", trigger: "change" }],
        sort: [{ required: true, message: "请输入排序值", trigger: "blur" }],
        status: [{ required: true, message: "请选择", trigger: "change" }],
        picture: [{ required: true, message: "请上传图片" }],
        labelname: [{ required: true, message: "请填写标签名" }],
        scenic: [{ require: true }]
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      yeWuValue: '',
      yeWuBanKuai: [],
      zhuangtai:[],
      list2: [
        { value: '', label: '请选择' },
        { value: 1, label: '停用' },
        { value: 0, label: '启用' }
      ],
      param:{
        channelId:'',
        describe:'',
        image:'',
        labelName:'',
        sortId:'',
        status:'',
        url:'',
      }
    };
  },
  methods: {
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.checkedCities1.length == 0) {
            this.$message("这是一条消息提示");
            return false;
          } else {
            alert("submit!");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      
    },
    handleChange(file, fileList) {
      console.log(fileList);
      this.fileList = fileList.slice(-1);
    },
    // 选中的游玩项目
    handleCheckAllChange(value) {
      console.log(value);
    }
  },
  mounted() {
    chanel().then(res => {
      console.log(res.data.data);
      this.yeWuBanKuai = res.data.data;
      console.log(this.yeWuBanKuai);
    });
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding: 10px 0px;
  .input_box {
    width: 100%;
    height: 100%;
  }
}

</style>
