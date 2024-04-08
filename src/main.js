import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ele from "element-plus";
// import "element-plus/dist/index.css";
// import "amfe-flexible";
import "./uilts/setRootFontSize";
import "./styles/reset-ele-default-theme.scss";
import "./styles/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 注册全局events
import events from "@/events";

let vm = createApp(App);

vm.provide("events", events);
/** 全局挂载对象 globalProperties */
// vm.config.globalProperties.$axios = axios // 使用globalProperties挂载
vm.use(router);
vm.use(store);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  vm.component(key, component);
}
vm.use(ele);
import formCreate from "@form-create/element-ui";
import FcDesigner from "@form-create/designer";
console.log(vm, "main");

vm.use(formCreate);
vm.use(FcDesigner);

vm.mount("#app");
