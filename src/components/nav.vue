<!-- 菜单路由 -->

<template>
  <div class="nav-basebox">
    <el-icon class="operation"
      ><Operation @click="isCollapse = !isCollapse"
    /></el-icon>
    <!-- <el-button >{{
      isCollapse ? "展开" : "收起"
    }}</el-button> -->
    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu
        :index="nav.type"
        v-for="(nav, index) in navList"
        :key="index"
      >
        <template #title>
          <div class="menu-width">
            <el-icon><location /></el-icon>
            <span v-show="!isCollapse">{{ nav.type }}</span>
          </div>
        </template>

        <el-menu-item
          :index="`${nav.type}-${ind}`"
          v-for="(i, ind) in nav.child"
          :key="i.name"
          @click="linkTo(i)"
          >{{ i.name }}</el-menu-item
        >
        <!-- <el-menu-item index="1-2">item two</el-menu-item>
        <el-menu-item index="1-3">item three</el-menu-item>

        <el-sub-menu index="1-4">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>item four</span></template
          >
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu> -->
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from "vue";
import { Menu as IconMenu, Location, Operation } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
console.log(router, "router", route);

// 处理routes数据
let navList = {};
router.options.routes.forEach((i) => {
  if (!i.meta?.hidden) {
    if (navList[i.meta?.type]) {
      navList[i.meta?.type].child.push(i);
    } else {
      navList[i.meta?.type] = {};
      navList[i.meta?.type].type = i.meta?.type;
      navList[i.meta?.type].child = [].concat(i);
    }
  }
});
console.log(navList, "navList");

const isCollapse = ref(false);

// 获取当前route对应key值
let defaultActive = ref();
watch(
  route,
  (newValue, oldValue) => {
    console.log(newValue, oldValue, "newValue,oldValue");
    for (const key in navList) {
      if (Object.hasOwnProperty.call(navList, key)) {
        navList[key].child.forEach((i, index) => {
          if (location.hash == `#${i.path}`) {
            // if (location.pathname == i.path) {
            defaultActive.value = key + "-" + index;
            console.log(defaultActive, "defaultActive");
          }
        });
      }
    }
  },
  {
    immediate: true,
  }
);

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const linkTo = (route) => {
  router.push({ name: route.name });
};
</script>
<style lang="less" scoped>
.nav-basebox {
  flex-shrink: 0;
  position: relative;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
  .operation {
    position: absolute;
    right: 0;
    z-index: 1;
    cursor: pointer;
  }
}
.menu-width {
  width: 136px;
}
</style>
