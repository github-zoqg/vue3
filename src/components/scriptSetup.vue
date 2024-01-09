<template>
  <div class="script-setup-base">
    <!-- {{ setupData.counte }} -->

    <el-tabs
      type="border-card"
      v-model="setupData.activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="首页" name="zero">
        <el-carousel
          :interval="4000"
          type="card"
          indicator-position="outside"
          class="center"
        >
          <el-carousel-item v-for="item in 5" :key="item">
            <img
              :src="require(`../assets/roll${item}.png`)"
              alt=""
              :key="item"
              class="set_h"
            />
          </el-carousel-item>
        </el-carousel>

        <div>
          <img src="../assets/introduction.png" alt="" class="w100" />
        </div>

        <div>
          <img src="../assets/example.png" alt="" class="w100" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="板材分类" name="plate"></el-tab-pane>
      <el-tab-pane label="橱柜" name="cupboard"></el-tab-pane>
      <el-tab-pane label="衣柜" name="wardrobe"></el-tab-pane>
      <el-tab-pane label="榻榻米" name="tatami"></el-tab-pane>
      <el-tab-pane label="衣帽间" name="cloakroom"></el-tab-pane>
      <el-tab-pane label="厂家淘宝店" name="six"></el-tab-pane>
      <div
        v-if="!['zero', 'six'].includes(setupData.activeName)"
        class="flexbox"
      >
        <div v-for="(i, index) in filesLen" :key="index" class="w100">
          <img
            :src="require(`../assets/${setupData.activeName}/${index + 1}.png`)"
            alt=""
            class="w100"
          />
        </div>
      </div>
    </el-tabs>

    <div>
      <div class="tip">
        请留下您尊贵的联系方式，我们将派专业的设计师与您联系（免费上门设计）
      </div>
      <el-form
        :model="setupData.formData"
        :rules="rules"
        label-width="auto"
        size="large"
        ref="ruleFormRef"
        class="formBase w80 center"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="setupData.formData.name" class="" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="setupData.formData.phone" class="" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="setupData.formData.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="but-center">
        <el-button
          type="primary"
          class="but_wid"
          size="large"
          @click="onSubmit"
          round
          >提交</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import interact from "../api/custom";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";

let setupData = reactive({
  counte: 0,
  formData: {
    name: "",
    sex: "1",
    phone: "",
  },
  activeName: "zero",
});
let filesLen = ref(7);
const router = useRouter();
const route = useRoute();
console.log(route);
const ruleFormRef = ref(null);
const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "blur",
    },
    {
      message: "手机号码错误",
      trigger: "blur",
      pattern: /^1[3-9][0-9]{9}$/,
    },
  ],
});
function add() {
  setupData.counte++;
}
function onSubmit() {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      interact.add(setupData.formData).then((res) => {
        if (res.data.status == 200) {
          ElMessage.success("提交成功");
          setupData.formData = {};
        } else {
          ElMessage.warning(res.data.message);
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
}
function handleClick(tab, event) {
  // console.log(tab.paneName, event, "handleClick");
  setupData.activeName = tab.paneName;
  filesLen.value = ["cloakroom", "tatami"].includes(tab.paneName)
    ? 5
    : ["cupboard", "wardrobe"].includes(tab.paneName)
    ? 6
    : 7;
  if (tab.paneName == "six") {
    window.open("https://item.taobao.com/item.htm?id=683808462681");
  }
  // console.log(setupData.activeName, "this.activeName");
}
function golistPage() {
  router.push({
    path: "/about",
    query: {},
  });
}
onMounted(function () {
  add();
  console.log(this);
});
</script>

<style lang="less" scoped>
.page-header div {
  flex-grow: 1;
  line-height: 1;
  background: #abc;
}
.but-center {
  text-align: center;
  margin-bottom: 80px;
}
:deep(.el-carousel__container) {
  height: 300px;
}
.tip {
  padding-bottom: 20px;
  font-size: 20px;
}
.formBase {
}
.el-tabs--border-card {
  border: none;
  .set_h {
    max-height: 400px;
    width: 100%;
  }
}
.carousel-wid {
  width: 750px;
}
.but_wid {
  width: 320px;
}
.flexbox {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  align-items: center;
  div {
    box-sizing: border-box;
    overflow: hidden;
    flex-shrink: 0;
    padding: 0 10px;
    img {
      border-radius: 8px;
    }
    &:nth-child(n + 2) {
      padding: 10px;
    }
  }
}
</style>
