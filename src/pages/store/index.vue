/* 商城首页 */
<template>
  <div class="base_box">
    <header class="header_box">
      <div class="header_wid"><span>登录</span> / <span>注册</span></div>
    </header>
    <main class="content">
      <div class="margin_auto">
        <el-carousel height="300px" class="w_300">
          <el-carousel-item v-for="item in 4" :key="item">
            <img
              :src="`https://source.unsplash.com/random/800x600?${item}`"
              alt=""
              class="cover_img"
            />
          </el-carousel-item>
        </el-carousel>
        <div class="search_box">
          <input type="text" class="search_input" />
          <input type="submit" class="submit_input" value="搜索" />
        </div>
        <div>
          <ul class="list_box">
            <li v-for="i in 42" :key="i">
              <img
                :src="`https://source.unsplash.com/random/800x600?${i}`"
                alt=""
              />
              <div class="goodsName">
                <span class="title-text">
                  西装套装女2023春秋新款高级感宽松显瘦西服外套休闲阔腿裤两件套
                </span>
              </div>
              <div class="money">
                <span class="coupon-price-title">¥</span>
                <span class="coupon-price">123</span>
              </div>
              <div class="store">店铺</div>
              <div class="num">
                <span>月销 {{ i }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <footer class="footer">底部</footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.base_box {
  background: #eee;
}
.header_box {
  z-index: 10000;
  width: 100%;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
  height: 40px;
  position: absolute;
  top: 0;
  line-height: 40px;
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
}
.content {
  width: $wid;
  margin: 40px auto;
  height: calc(100vh - 80px);
  overflow: auto;
  scrollbar-width: none;
  .search_box {
    width: 690px;
    margin: auto;
    border: 3px solid #f03726;
    border-right: 0;
    height: 34px;
    position: relative;
  }
  .search_input {
    border: 0;
    width: 100%;
    outline: 0;
    box-sizing: border-box;
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
}
.header_wid {
  width: $wid;
  margin: auto;
}
.footer {
  width: 100%;
  height: 40px;
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
  text-align: center;
  line-height: 40px;
  position: absolute;
  bottom: 0;
}
</style>
