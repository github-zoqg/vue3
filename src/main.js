import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ele from "element-plus";
import "element-plus/dist/index.css";
import "./styles/index.css";
import "amfe-flexible";
// import "./uilts/setRootFontSize";

let vm = createApp(App);
/** 全局挂载对象 globalProperties */
// vm.config.globalProperties.$axios = axios // 使用globalProperties挂载
vm.use(router);
vm.use(ele);
console.log(vm, "main");
vm.mount("#app");
