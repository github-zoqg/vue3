<template>
  <div class="page-header">
    <!-- <img src="../assets/banner.png" alt="" class="w100" /> -->
    <span @click="golistPage" class="golistpage">客户列表</span>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  methods: {
    golistPage() {
      this.$router.push({
        path: "/about",
        query: {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-header {
  display: flex;
  position: relative;
  height: 60px;
  flex-shrink: 0;
  /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
  box-shadow: 0 2px 3px 0 brown;
  z-index: 2;
  background: linear-gradient(
    to right,
    // #ff0000,
    // #ff7f00,
    // #ffff00,
    #00ff00,
    #00ffff // #0000ff,
    // #8b00ff
  );
  .golistpage {
    position: absolute;
    top: 35%;
    color: coral;
    right: 300px;
    cursor: pointer;
  }
}
</style>
