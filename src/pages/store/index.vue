/* 商城首页 */
<template>
  <div class="base_box">
    <header class="header_box">
      <div class="header_wid">
        <div class="header_left">
          <div v-if="!$store.state.user?.token">
            <span @click="registerFn('login')" class="pointer">登录</span> /
            <span @click="registerFn('register')" class="pointer">注册</span>
          </div>
          <div v-else>
            Hi, {{ $store.state.user?.name }}
            <span class="pointer ml10" @click="logout" link>[退出]</span>
          </div>
        </div>
        <div class="header_right">
          <span @click="goIndex" class="pointer ml10">商城首页</span>
          <span @click="shopingCart" class="pointer ml10">购物车</span>
          <span @click="myGoods" class="pointer ml10">个人详情</span>
          <span @click="contact" class="pointer ml10">联系客服</span>
        </div>
      </div>
    </header>
    <main class="content">
      <el-icon @click="goback" class="i_goback" v-if="$route.path !== '/index'"
        ><Back
      /></el-icon>
      <router-view class="content-base"></router-view>
    </main>
    <footer class="footer">
      &copy; {{ new Date().getFullYear() }} zoqg.com 版权所有
    </footer>
    <Register
      :dialogVisible="dialogVisible"
      :registerProps="registerProps"
      @closeDialog="() => closeDialog()"
    />
  </div>
</template>

<script>
import Register from "./register.vue";
export default {
  components: {
    Register,
  },
  inject: ["events"],
  data() {
    return {
      dialogVisible: false,
      registerProps: {},
      searchText: "",
    };
  },
  computed: {
    isLogin() {
      return false;
    },
  },
  mounted() {
    this.events.on("needLogin", () => {
      this.registerFn("login");
    });
  },
  methods: {
    registerFn(type) {
      this.dialogVisible = true;
      console.log(type);
      if (type === "login") {
        this.registerProps = {
          status: "login",
        };
      } else {
        this.registerProps = {
          status: "register",
        };
      }
    },
    // 关闭登录/注册弹窗
    closeDialog() {
      console.log("+++++++++++++++");
      this.dialogVisible = false;
    },
    // 返回首页
    goIndex() {
      console.log("goIndex");
      this.$router.push("/");
    },
    // 购物车
    shopingCart() {
      console.log("shopingCart");
      if (this.$store.state.user?.token) {
        this.$router.push("/shopingCart");
      } else {
        this.needLogin();
      }
    },
    // 我的商品
    myGoods() {
      if (this.$store.state.user?.token) {
        this.$router.push("/personal");
      } else {
        this.needLogin();
      }
    },
    needLogin() {
      this.$alert("请先登录", "提示", {
        confirmButtonText: "OK",
        callback: () => {
          this.registerFn("login");
        },
      });
    },
    // 联系客服
    contact() {
      this.$alert("欢迎访问客户服务中心，请来电咨询：010-88888888", "联系方式");
    },
    goback() {
      this.$router.go(-1);
    },
    logout() {
      this.$confirm("确定退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.commit("setUser", null);
      });
    },
  },
};
</script>

<style lang="scss">
$wid_1180: 1180px;
$wid: 1200px;
.content-box {
  background: #eee;
}
.base_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.header_box {
  width: 100%;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  .header_wid {
    width: $wid;
    margin: auto;
    display: flex;
    color: #6c6c6c;
    .header_left {
      width: 40%;
    }
    .header_right {
      flex-grow: 1;
      text-align: right;
    }
  }
}
.content {
  position: relative;
  width: 100%;
  overflow: auto;
  scrollbar-width: none;
  flex-grow: 1;
  .content-base {
    padding: 20px;
    width: 1220px;
    margin: auto;
    background-color: #f5f5f5;
    min-height: 100%;
    box-sizing: border-box;
  }
}
.footer {
  width: 100%;
  height: 40px;
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
  color: #333;
  opacity: 0.5;
}
$el-button-hover-text-color: #f03726;
.pointer:hover {
  color: $el-button-hover-text-color;
}
.i_goback {
  position: fixed;
  top: 60px;
  right: calc((100% - $wid_1180) / 2);
  font-size: 24px;
  color: #333;
  cursor: pointer;
  background: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-weight: bold;
  &:hover {
    background: $el-button-hover-text-color;
    color: white;
  }
}
</style>
