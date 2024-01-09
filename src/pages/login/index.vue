<template>
  <div class="login-base">
    <div class="from-box">
      <div class="header">登录</div>
      <el-form
        :model="formDetail"
        size="large"
        ref="ruleFormRef"
        label-width="auto"
        class="formBase w80"
      >
        <el-form-item prop="name">
          <el-input
            v-model="formDetail.account"
            class=""
            placeholder="手机号/账号"
          />
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model="formDetail.password"
            class=""
            type="password"
            placeholder="密码"
          />
        </el-form-item>
        <el-button class="login-but" type="primary" @click="login"
          >登录</el-button
        >
        <div class="other">
          <span>注册账号</span>
          <span>忘记密码</span>
        </div>
      </el-form>
    </div>
    <div id="particles-js"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { warnMessage, successMessage } from "../../uilts/message.js";
import interact from "../../api/user";
import "particles.js";

let formDetail = reactive({ account: "", password: "" });

const login = () => {
  if (!formDetail.account) {
    return warnMessage("请填写账号");
  }
  if (!formDetail.password) {
    return warnMessage("请填写密码");
  }
  console.log(formDetail);
  interact.login(formDetail).then((res) => {
    console.log(res);
  });
};

let particelOptions = {
  particles: {
    number: {
      value: 380,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};
onMounted(() => {
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  // onload方法会请求本地配置json
  particlesJS("particles-js", particelOptions, function () {
    console.log("callback - particles.js config loaded");
  });
});
</script>

<style lang="less" scoped>
.login-base {
  background-color: #1fc8db;
  background-image: linear-gradient(
    141deg,
    #9fb8ad 0%,
    #1fc8db 51%,
    #2cb5e8 75%
  );
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.from-box {
  width: 400px;
  height: 400px;
  border-radius: 40px;
  background: white;
  box-shadow: 5px 10px 5px rgba(0, 0, 0, 0.2);
  margin-right: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .header {
    font-size: 32px;
    margin-bottom: 20px;
  }
  .login-but {
    width: 100%;
  }
  span {
    color: #409eff;
  }
  .other {
    padding-top: 10px;
    :nth-child(2) {
      float: right;
    }
  }
}
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
