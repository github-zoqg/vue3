<template>
  <div class="rain"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";

let colors = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#8B00FF",
];
let randomColor = () => {
  return colors[randomNum(colors.length)];
};
let oldnum;
let randomNum = (num = 10) => {
  let newnum = ~~(Math.random() * num);
  if (newnum == oldnum) {
    return randomNum(num);
  }
  oldnum = newnum;
  return newnum;
};
let str = "hello world!";
function randomStr() {
  return str[randomNum(str.length)];
}
let w = ref(0);
let h = ref(0);
let fontSize = 20;
let leng, arr;
let init = () => {
  h.value = document.querySelector(".content-box").offsetHeight;
  w.value = document.querySelector(".content-box").offsetWidth;
  leng = ~~(w.value / fontSize);
  arr = new Array(leng).fill(1);
  let canvas = document.createElement("canvas");
  canvas.width = w.value;
  canvas.height = h.value;
  document.querySelector(".rain").appendChild(canvas);
  let ctx = canvas.getContext("2d");
  draw(ctx);
  console.log(123);
};
let draw = (ctx) => {
  ctx.fillStyle = "rgba(0,0,0,.1)";
  ctx.fillRect(0, 0, w.value, h.value);
  for (let i = 0; i < leng; i++) {
    ctx.fillStyle = randomColor();
    ctx.font = `bold ${fontSize}px serif`;
    ctx.fillText(randomStr(), i * fontSize, arr[i] * fontSize);
    if (arr[i] * fontSize > h.value && Math.random() > 0.99) {
      arr[i] = 0;
    }
    arr[i]++;
  }
  requestAnimationFrame(() => {
    draw(ctx);
  });
};
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.rain {
  span {
    color: aquamarine;
  }
}
</style>
