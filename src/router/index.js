import * as VueRouter from "vue-router";
// import Home from "../pages/home/index.vue";

// 1. 定义路由组件.
// 也可以从其他文件导入
// const Home = { template: '<div>Home</div>' }
// const About = { template: '<div>About</div>' }

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  // {
  //   path: "/news",
  //   // redirect: "/home",
  //   name: "news",
  //   component: () => import("../pages/news/index.vue"),
  //   meta: { hidden: true, title: "新闻" },
  // },
  {
    path: "/",
    // redirect: "/home",
    name: "me",
    component: () => import("../pages/me/index.vue"),
    meta: { hidden: true, title: "个人简历" },
  },
  // 登录页
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/login/index.vue"),
    meta: { hidden: true },
  },
  // 首页
  {
    path: "/home",
    name: "home",
    component: () => import("../pages/home/index.vue"),
    // component: Home,
    meta: {
      type: "first",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../components/setup.vue"),
    meta: {
      type: "first",
    },
  },
  {
    path: "/from-create",
    name: "fromCreate",
    component: () => import("../pages/from-create/index.vue"),
    meta: {
      type: "fromCreate",
    },
  },

  {
    path: "/rain",
    name: "rain",
    component: () => import("../pages/canvas/rain/index.vue"),
    meta: {
      type: "canvas",
    },
  },
  {
    path: "/arc",
    name: "arc",
    component: () => import("../pages/canvas/arc/index.vue"),
    meta: {
      type: "canvas",
    },
  },

  {
    path: "/practice",
    name: "practice",
    component: () => import("../pages/practice/index.vue"),
    meta: {
      type: "practice",
    },
  },

  {
    path: "/threejs/complex",
    name: "complex",
    component: () => import("../pages/threeJs/complex/index.vue"),
    meta: {
      type: "threejs",
    },
  },

  {
    path: "/threejs/simple",
    name: "simple",
    component: () => import("../pages/threeJs/simple"),
    meta: {
      type: "threejs",
    },
  },
  // 毕设路由
  {
    path: "/store",
    name: "store",
    redirect: "/store/index",
    component: () => import("@/pages/store/index.vue"),
    meta: { title: "家具商城", type: "store" },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/pages/store/list.vue"),
        meta: { title: "商城首页" },
      },
      {
        path: "goodsDetail",
        name: "goodsDetail",
        component: () => import("@/pages/store/goodsDetail.vue"),
        meta: { title: "商品详情" },
      },
      {
        path: "shopingCart",
        name: "shopingCart",
        component: () => import("@/pages/store/shopingCart.vue"),
        meta: { title: "购物车" },
      },
      {
        path: "personal",
        name: "personal",
        component: () => import("@/pages/store/personal.vue"),
        meta: { title: "个人详情" },
      },
    ],
  },
];
// console.log(VueRouter)
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  // history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
});
router.beforeEach((to, from, next) => {
  // console.log(to, from, next);
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "wellcom";
  }
  next();
});

export default router;
// 5. 创建并挂载根实例
// const app = Vue.createApp({})
// //确保 _use_ 路由实例使
// //整个应用支持路由。
// app.use(router)

// app.mount('#app')

// 现在，应用已经启动了！
