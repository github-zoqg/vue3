<template>
  <div class="right-button-box">
    <el-button type="primary" plain @click="showJson">生成JSON</el-button>
    <el-button type="primary" plain @click="showOption">生成Options</el-button>
    <el-button type="primary" plain @click="showTemplate">生成组件</el-button>
  </div>

  <fc-designer ref="designer" />
</template>

<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const showJson = () => {
  let targetJson = proxy.$refs.designer.getRule();
  console.log(targetJson);
};
const showOption = (data) => {
  console.log(data);
};

const showTemplate = () => {};
</script>

<style lang="less" scoped>
.right-button-box {
  padding: 4px 12px 4px 0;
  text-align: right;
}
</style>
