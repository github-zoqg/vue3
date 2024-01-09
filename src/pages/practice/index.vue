<template>
  <div class="time_content">
    <div class="time_base card1">{{ sec + 1 }}</div>
    <div class="time_base card2">{{ sec + 1 }}</div>
    <div class="time_base card3">{{ sec }}</div>
    <div class="time_base card4">{{ sec }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let sec = ref(new Date().getSeconds());
setInterval(() => {
  sec.value = new Date().getSeconds();
}, 1000);
</script>

<style lang="less" scoped>
.posi {
  margin: auto;
}
.time_content {
  position: relative;
  @h: 100px;
  height: @h;
  width: 70px;
  margin: auto;
  background: linear-gradient(green, black);
  .time_base {
    position: absolute;
    width: 100%;
    height: 50%;
    font-size: 32px;
    border: 1px solid white;
    color: aquamarine;
    text-align: center;
    overflow: hidden;
  }
  .card1 {
    line-height: @h;
    background: #abc;
  }
  .card2 {
    line-height: 0;
    top: 50%;
    transform: rotateX(180deg);
    transform-origin: center top;
    backface-visibility: hidden;
    background: green;
    transition: all 0.5s;
    z-index: 2;
  }
  .card3 {
    line-height: @h;
    transition: 0.5s;
    background: cadetblue;
    transform-origin: center bottom;
    backface-visibility: hidden;
  }
  .card4 {
    top: 50%;
    line-height: 0;
    background: yellowgreen;
  }
}
.time_content:hover {
  .card2 {
    transform: rotateX(0);
  }
  .card3 {
    transform: rotateX(-180deg);
  }
}
</style>
