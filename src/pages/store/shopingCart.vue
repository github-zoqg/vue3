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
        <h2>{{ item.goodsName }}</h2>
        <p>商品描述：{{ item.goodsName }}</p>
        <div>
          单价：<span class="price">￥{{ item.price }}</span>
        </div>
        <div>
          数量：
          <el-input-number
            v-model="item.num"
            :min="1"
            @change="handleItemCountChange(item)"
          ></el-input-number>
        </div>
        <div>小计：￥{{ item.price * item.num }}</div>
        <div>商店名称：{{ item.storeName }}</div>
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
import request from "@/api/goods.js";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

const store = useStore();

let goodsList = ref([]);
const totalPrice = computed(() => {
  return selectedGoods.value.reduce((acc, cur) => acc + cur.price * cur.num, 0);
});
const selectedGoods = ref([]);
// 删除商品
const handleDelete = (item) => {
  console.log(item, "删除");
  request
    .deleteCart({
      ...item,
    })
    .then((res) => {
      if (res.status === 200) {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        getGoodsList();
      }
    });
};
// 商品数量变化
const handleCountChange = (item) => {
  console.log(item);
  selectedGoods.value = goodsList.value.filter((i) => i.selected);
};
// 商品数量变化
const handleItemCountChange = (item) => {
  console.log(item);
  request.updateCartList({ ...item, source: "shoppingCart" });
};
/* 获取商品列表 */
const getGoodsList = () => {
  request
    .getCartList({
      userId: store.state.user?.userId,
    })
    .then((res) => {
      console.log("getGoodsList", res);
      if (res.status === 200) {
        handleCountChange();
        goodsList.value = res.list;
      }
    });
};
onMounted(() => {
  getGoodsList();
});
</script>

<style lang="scss" scoped>
@import "./style.scss"; // 导入公共样式
</style>
