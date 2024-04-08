/* 商品详情页 */
<template>
  <div class="goods-detail">
    <div class="left_box">
      <img
        :src="`https://source.unsplash.com/random/800x600?${route.query.id}`"
        alt=""
      />
    </div>
    <div class="right_box">
      <div>
        <h1 class="title">
          {{ route.query.name || "今年流行漂亮盐系轻熟..." }}
        </h1>
      </div>

      <div class="money">
        <span class="coupon-price-title">¥</span>
        <span class="coupon-price">123</span>
      </div>

      <div class="address">
        <span>配送：</span>
        <div class="mt10">
          <span>详细地址：</span>
          <el-input class="w80"></el-input>
        </div>
      </div>

      <div class="button-box">
        <button class="buy-button" @click="handleBuyClick">
          <span class="button-text">立即购买</span>
        </button>
        <button class="card-button" @click="handleCardClick">
          <span class="button-text">加入购物车</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { inject } from "vue";
import { useStore } from "vuex";

// 获取全局参数
const route = useRoute();
const eventBus = inject("events");
const store = useStore();

// 立即购买
const handleBuyClick = () => {
  if (!store.state.user.token) {
    return Login();
  }
  console.log("立即购买");
};
// 加入购物车
const handleCardClick = () => {
  if (!store.state.user.token) {
    return Login();
  }
  console.log("加入购物车");
};
// need登录
const Login = () => {
  eventBus.emit("needLogin");
};
</script>

<style lang="scss">
.goods-detail {
  display: flex;
  .left_box {
    width: 450px;
    img {
      width: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
  }
  .right_box {
    padding: 20px 30px;
    flex: 1;
    .title {
      line-height: 28px;
      color: #000;
      letter-spacing: 0;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 900;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .money {
      color: rgb(255, 79, 0);
      margin-top: 10px;
      .coupon-price-title {
        vertical-align: baseline;
        font-family: PingFangSC-Medium;
        font-size: 20px;
      }
      .coupon-price {
        margin-left: 4px;
        vertical-align: baseline;
        text-align: left;
        font-family: PingFangSC-Medium;
        font-size: 38px;
      }
    }
    .address {
      margin-top: 15px;
      font-size: 14px;
      color: #7f7f7f;
    }
    .button-box {
      margin-top: 60px;
    }
    button {
      padding: 0 36px;
      border: 0;
      height: 48px;
      cursor: pointer;
      box-shadow: rgba(255, 203, 0, 0.2) 0px 9px 13px 0px;
      vertical-align: top;
    }
    .buy-button {
      background: linear-gradient(90deg, rgb(255, 119, 0), rgb(255, 73, 0));
      border-top-left-radius: 34px;
      border-bottom-left-radius: 34px;
    }
    .card-button {
      background: linear-gradient(90deg, rgb(255, 203, 0), rgb(255, 148, 2));
      border-top-right-radius: 34px;
      border-bottom-right-radius: 34px;
    }
    .button-text {
      display: inline;
      font-size: 16px;
      font-weight: bold;
      color: rgb(255, 255, 255);
    }
  }
}
</style>
