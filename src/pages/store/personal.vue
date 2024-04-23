/* 个人详情 */
<template>
  <div class="user-detail">
    <div class="title">个人详情</div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="全部订单" name="first"></el-tab-pane>
      <el-tab-pane label="待发货" name="second"></el-tab-pane>
      <el-tab-pane label="待收货" name="third"></el-tab-pane>
      <el-tab-pane label="售后中" name="fourth"></el-tab-pane>
    </el-tabs>
    <div class="content">
      <div class="goods-list" v-for="item in goodsList" :key="item.id">
        <img
          :src="`https://source.unsplash.com/random/100*100?${item.id}`"
          alt=""
          class="goods-img"
        />
        <div class="goods-info">
          <h2>{{ item.name }}</h2>
          <p>商品描述：{{ item.desc }}</p>
          <div>小计：￥{{ item.price * item.count }}</div>
          <div>商店名称</div>
        </div>
        <div class="delete_button" @click="sales(item)">申请售后</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import request from "@/api/goods.js";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

const store = useStore();

const activeName = ref("third");
const goodsList = ref([
  {
    id: 1,
    name: "商品1",
    desc: "商品描述1",
    price: 100,
    count: 1,
    shop: "商店1",
    selected: true,
  },
  {
    id: 2,
    name: "商品2",
    desc: "商品描述2",
    price: 200,
    count: 2,
    shop: "商店2",
    selected: false,
  },
  {
    id: 2,
    name: "商品2",
    desc: "商品描述2",
    price: 200,
    count: 2,
    shop: "商店2",
    selected: false,
  },
  {
    id: 2,
    name: "商品2",
    desc: "商品描述2",
    price: 200,
    count: 2,
    shop: "商店2",
    selected: false,
  },
  {
    id: 2,
    name: "商品2",
    desc: "商品描述2",
    price: 200,
    count: 2,
    shop: "商店2",
    selected: false,
  },
  {
    id: 2,
    name: "商品2",
    desc: "商品描述2",
    price: 200,
    count: 2,
    shop: "商店2",
    selected: false,
  },
  {
    id: 2,
    name: "商品2",
    desc: "商品描述2",
    price: 200,
    count: 2,
    shop: "商店2",
    selected: false,
  },
  {
    id: 2,
    name: "商品2",
    desc: "商品描述2",
    price: 200,
    count: 2,
    shop: "商店2",
    selected: false,
  },
]);

onBeforeMount(() => {
  getRecordList(2);
});

function getRecordList(status) {
  console.log(goodsList);
  request
    .getRecordList({
      userId: store.state.user.userId,
      status: status,
    })
    .then((res) => {
      console.log("getGoodsList", res);
      if (res.status === 200) {
        goodsList.value = res.list;
      }
    });
}

function handleClick(tab, event) {
  // console.log(tab, event);
  getRecordList(tab.index);
}
function sales(item) {
  console.log(item);
}
</script>

<style lang="scss" scoped>
@import "./style.scss";
.user-detail {
  .demo-tabs {
    padding: 4px 0s;
  }
}
</style>
