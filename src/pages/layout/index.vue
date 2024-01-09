<template>
  <Header v-if="isShowHeader"></Header>
  <div class="flexbox">
    <Nav v-if="isShowHeader"></Nav>
    <div class="content-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "../../components/header.vue";
import Nav from "../../components/nav.vue";
export default {
  components: {
    Header,
    Nav,
  },
  data() {
    return {
      isShowHeader: false,
    };
  },
  watch: {
    $route() {
      this.init();
    },
  },
  created() {
    // console.log(`layout created`);
    // this.init();
  },
  methods: {
    init() {
      console.log("asdfasdfasdfsafd");
      let hiddenUrl = ["#/", "#/login"];
      this.isShowHeader = !hiddenUrl.includes(location.hash);
    },
  },
};
</script>

<style lang="less" scoped>
.flexbox {
  display: flex;
  flex-grow: 1;
  height: calc(100% - 40px);
  .content-box {
    flex-grow: 1;
    overflow-x: hidden;
    // display: flex;
    // flex-direction: column;
  }
}
</style>
