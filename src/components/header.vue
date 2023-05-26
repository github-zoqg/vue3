<template>
  <div class="page-header">
    <img src="../assets/banner.png" alt="" class="w100" />
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
  .golistpage {
    position: absolute;
    top: 35%;
    color: coral;
    right: 300px;
    cursor: pointer;
  }
}
</style>
