<template>
  <div class="news">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.keyword" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
    <h1>News</h1>
    <ul v-if="news.length">
      <li v-for="item in news" :key="item.id" class="news-item">
        <h3>{{ item.title }}</h3>
        <div>time: {{ new Date(item.meta.createdAt).toLocaleString() }}</div>
        <div>source: {{ item.thumbnail }}</div>
        <img
          v-for="image in item.images"
          :key="image.id"
          :src="image"
          alt=""
          class="news-image"
        />
        <div>
          {{ item.description }}
        </div>
      </li>
    </ul>
    <!-- <el-empty description="description" v-else /> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ElLoading, ElMessage } from "element-plus";
const news = ref([]);
const formInline = ref({ user: "" });

// 加载loading效果
const loadingInstance = ElLoading.service({
  lock: true,
  text: "Loading",
  background: "rgba(0, 0, 0, 0.7)",
});
onMounted(() => {
  getNews();
});
const getNews = () => {
  console.log("getNews");
  fetch(" https://dummyjson.com/products?limit=10&skip=20")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data, "news");
      news.value = data.products;
      loadingInstance.close();
    })
    .catch((error) => {
      ElMessage.warning("Failed to load data");
      console.log(error);
    });
};
const onSubmit = () => {
  console.log(formInline.value);
  if (!formInline.value.keyword) {
    getNews();
  } else {
    news.value = news.value.filter((item) =>
      item.title.includes(formInline.value.keyword)
    );
  }
};
</script>

<style lang="scss" scoped>
.news-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
}
.news-item {
  margin-bottom: 20px;
}
.news {
  padding: 20px;
}
</style>
