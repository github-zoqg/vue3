/* 商城首页 */
<template>
  <div class="margin_auto">
    <el-carousel height="300px" class="w_300">
      <el-carousel-item v-for="item in 4" :key="item">
        <img
          :src="`https://picsum.photos/944/300?${item}`"
          alt=""
          class="cover_img"
        />
      </el-carousel-item>
    </el-carousel>
    <div class="sticky">
      <div class="search_box">
        <input type="text" class="search_input" v-model="searchText" />
        <input
          type="submit"
          class="submit_input"
          value="搜索"
          @click="searchFn"
        />
      </div>
    </div>
    <div>
      <ul class="list_box">
        <li
          v-for="(i, index) in goodsList"
          :key="index"
          class="pointer"
          @click="showDetail(i)"
        >
          <img :src="`${i.imgurl}/200/200?${index}`" alt="" />
          <div class="goodsName">
            <span class="title-text">
              {{ i.goodsName }}
            </span>
          </div>
          <div class="money">
            <span class="coupon-price-title">¥</span>
            <span class="coupon-price">{{ i.price }}</span>
          </div>
          <div class="store">店铺 {{ i.storeName }}</div>
          <div class="num">
            <span>月销 {{ i.volume }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import request from "@/api/goods.js";
export default {
  data() {
    return {
      dialogVisible: false,
      registerProps: {},
      searchText: "",
      goodsList: [],
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    searchFn() {
      console.log("searchFn", this.searchText);
      this.getGoodsList();
    },
    getGoodsList() {
      request
        .getGoodsList({
          params: {
            keyword: this.searchText,
          },
        })
        .then((res) => {
          this.goodsList = res.list;
          console.log("getGoodsList", res);
        });
    },
    showDetail(item) {
      console.log("showDetail", item);
      // request
      //   .addGoods({
      //     ...item,
      //     goodsId: null,
      //     storeId: item.storeId + 4,
      //   })
      //   .then((res) => {
      //     console.log("getGoodsList", res);
      //     this.$message.success("添加成功");
      //   });
      this.$router.push({
        name: "goodsDetail",
        query: {
          goodsId: item.goodsId,
          storeId: item.storeId,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.content-box {
  background: #eee;
}
$wid: 1200px;
.margin_auto {
  margin: auto;
  text-align: center;
}
.cover_img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.w_300 {
  width: 80%;
  margin: auto;
  margin-bottom: 20px;
}
.sticky {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #f5f5f5;
  height: 50px;
}
.search_box {
  width: 690px;
  margin: auto;
  border: 3px solid #f03726;
  border-right: 0;
  height: 34px;
  position: relative;
  position: relative;
}
.search_input {
  border: 0;
  width: 100%;
  outline: 0;
  box-sizing: border-box;
  padding: 0 105px 0 10px;
  line-height: 34px;
}
.submit_input {
  width: 95px;
  height: 40px;
  border: 0;
  position: absolute;
  top: -3px;
  right: 0;
  background: #f03726;
  color: #f5f5f2;
  font-size: 18px;
}
.list_box {
  width: 1180px;
  font-size: 0;
  font-family: "helvetica neue", tahoma, "hiragino sans gb", stheiti,
    "wenquanyi micro hei", sans-serif;
  border-top: 1px solid #f2f2f2;
  border-left: 1px solid #f2f2f2;
  text-align: initial;
  margin: 20px auto;
  li {
    width: 236px;
    height: 368px;
    box-sizing: border-box;
    display: inline-block;
    font-size: 12px;
    border: 1px solid #f2f2f2;
    border-top: none;
    border-left: none;
    background: #fff;
    vertical-align: top;
    padding: 22px 20px 0;
    &:hover {
      border: 1px solid #fd3f31;
      text-decoration: none;
      transform: translate(-1px, -1px);
    }
  }
  img {
    width: 194px;
    height: 198px;
    object-fit: cover;
  }
  .goodsName {
    height: 40px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    font-size: 14px;
    color: #9b9b9b;
    line-height: 20px;
  }
  .money {
    height: 25px;
    padding: 6px 0 0;
    line-height: 1.6;
    .coupon-price-title {
      vertical-align: baseline;
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #fd3f31;
    }
    .coupon-price {
      margin-left: 4px;
      vertical-align: baseline;
      text-align: left;
      line-height: 25px;
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #fd3f31;
    }
  }
  .store {
    margin-top: 9px;
    font-size: 12px;
    color: #9b9b9b;
    line-height: 17px;
    background-color: #fff;
  }
  .num {
    margin-top: 4px;
    border-top: 1px solid #f2f2f2;
    padding: 9px 0;
    position: relative;
    span {
      position: absolute;
      right: 0;
      top: 9px;
      color: #9b9b9b;
      font-size: 12px;
      line-height: 17px;
      background: #fff;
      padding-left: 12px;
    }
  }
}
</style>
