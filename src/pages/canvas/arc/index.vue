<template>
  <div class="box"></div>
  <button @click="run">run</button>
  <canvas class="canvas"></canvas>
  <button @click="canvas_run(obj)">canvas_run</button>
</template>

<script>
export default {
  data() {
    return {
      dom: "",
      wid: "",
      hei: "",
    };
  },
  methods: {
    init() {
      this.dom = document.querySelector(".box");
      this.wid = this.dom.offsetWidth;
      this.hei = this.dom.offsetHeight;
    },
    run() {
      this.init();
      this.move();
    },
    move() {
      let arc = document.createElement("div");
      let left = this.randomNum(this.wid - 20);
      let top = this.randomNum(this.hei - 20);
      let obj = {
        flag: true,
        yflag: true,
        left,
        top,
      };
      arc.className = "arc";
      arc.style.background = this.randomColor();
      arc.style.top = `${top}px`;
      arc.style.left = `${left}px`;
      this.dom.appendChild(arc);
      this.animat(obj);
      console.log(this.dom, arc);
    },
    animat(obj) {
      let arc = document.createElement("div");
      let x = this.randomNum();
      let y = this.randomNum();
      arc.className = "arc";
      arc.style.background = this.randomColor();
      if (obj.left + x > this.wid - 20) {
        obj.flag = false;
      }
      if (obj.left - x < 0) {
        obj.flag = true;
      }
      if (obj.top + y > this.hei - 20) {
        obj.yflag = false;
      }
      if (obj.top - y < 0) {
        obj.yflag = true;
      }
      let top = obj.yflag ? obj.top + y : obj.top - y;
      let left = obj.flag ? obj.left + x : obj.left - x;
      obj.left = left;
      obj.top = top;
      arc.style.top = `${top}px`;
      arc.style.left = `${left}px`;
      this.dom.appendChild(arc);
      setTimeout(() => {
        this.animat(obj);
      }, 1000);
    },
    randomColor() {
      return '#' + Math.random().toString(16).slice(2,8).padEnd(6,'0');
    },
    randomNum(num = 10) {
      return ~~(Math.random() * num);
    },
  },
};
</script>
<script setup>
import { onMounted, ref } from "vue";

onMounted(() => {
  init();
});
let ctx = ref();
let h = ref();
let w = ref();
let obj;
let init = () => {
  // 初始化canvas
  let dom = document.querySelector("canvas");
  w.value = dom.parentNode.offsetWidth / 2;
  h.value = dom.parentNode.offsetHeight / 2;
  dom.width = w.value;
  dom.height = h.value;
  ctx.value = dom.getContext("2d");
};
let colors = ["red", "blue", "green", "yellow"];
let randomColor = () => {
  return colors[~~(Math.random() * colors.length)];
};
let randomNum = (num = 10) => {
  return ~~(Math.random() * num);
};
let canvas_run = (obj) => {
  //   console.log(obj);
  let numX = randomNum();
  let numY = randomNum();
  if (!obj) {
    obj = {
      xflag: true,
      yflag: true,
      x: randomNum(w.value - 20) + 10,
      y: randomNum(h.value - 20) + 10,
    };
  }
  if (obj.x + numX > w.value - 20) {
    obj.xflag = false;
  }
  if (obj.x - numX < 0) {
    obj.xflag = true;
  }
  if (obj.y + numY > h.value - 20) {
    obj.yflag = false;
  }
  if (obj.y - numY < 0) {
    obj.yflag = true;
  }
  obj.x = obj.xflag ? obj.x + numX : obj.x - numX;
  obj.y = obj.yflag ? obj.y + numY : obj.y - numY;

  ctx.value.beginPath();
  ctx.value.fillStyle = randomColor();
  ctx.value.arc(obj.x, obj.y, 20, 0, 2 * Math.PI);
  ctx.value.fill();
  ctx.value.save();

  setTimeout(() => {
    canvas_run(obj);
  }, 1000);
};
</script>

<style lang="scss" scoped>
.box {
  width: 50%;
  height: 50%;
  display: inline-block;
  background: #456;
  position: relative;
  vertical-align: bottom;
}
:deep(.arc) {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
canvas {
  border: 1px solid #123;
}
</style>
