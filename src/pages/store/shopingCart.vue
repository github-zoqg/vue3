<template>
  <div class="shoping-cart">
    <div class="title">购物车</div>
    <div class="goods-list" v-for="item in goodsList" :key="item.id">
      <el-checkbox
        v-model="item.selected"
        size="large"
        @change="handleCountChange(item)"
      />
      <img
        :src="`https://source.unsplash.com/random/100*100?${item.id}`"
        alt=""
        class="goods-img"
      />
      <div class="goods-info">
        <h2>{{ item.name }}</h2>
        <p>商品描述：{{ item.desc }}</p>
        <div>
          单价：<span class="price">￥{{ item.price }}</span>
        </div>
        <div>
          数量：
          <el-input-number
            v-model="item.count"
            :min="1"
            @change="handleCountChange(item)"
          ></el-input-number>
        </div>
        <div>小计：￥{{ item.price * item.count }}</div>
        <div>商店名称</div>
      </div>
      <div class="delete_button" @click="handleDelete(item)">删除</div>
    </div>

    <p class="total-price">
      总价: <span class="price price_bold">￥{{ totalPrice }}</span>
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";

const goodsList = reactive([
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
const totalPrice = computed(() => {
  return selectedGoods.value.reduce(
    (acc, cur) => acc + cur.price * cur.count,
    0
  );
});
const selectedGoods = ref([]);
// 删除商品
const handleDelete = (item) => {
  console.log(item, "删除");
  const index = goodsList.indexOf(item);
  goodsList.splice(index, 1);
  console.log(goodsList, "删除后");
  handleCountChange(item);
};
// 商品数量变化
const handleCountChange = (item) => {
  console.log(item);
  selectedGoods.value = goodsList.filter((i) => i.selected);
};
/* 获取商品列表 */
const getGoodsList = () => {
  handleCountChange();
  return goodsList;
};
onMounted(() => {
  getGoodsList();
});
</script>

<style lang="scss" scoped>
@import "./style.scss"; // 导入公共样式
</style>
