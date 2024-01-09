<template>
  <div class="animation">
    <canvas id="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sun: {},
      moon: {},
      earth: {},
      animationId: null,
    };
  },
  mounted() {
    this.init();
    this.draw();
  },
  methods: {
    init() {
      this.sun = new Image();
      this.moon = new Image();
      this.earth = new Image();
      this.sun.src =
        "https://5773cba1-42a7-443a-b6df-98e504bb71e3.mdnplay.dev/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations/canvas_sun.png";
      this.moon.src =
        "https://5773cba1-42a7-443a-b6df-98e504bb71e3.mdnplay.dev/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations/canvas_moon.png";
      this.earth.src =
        "https://5773cba1-42a7-443a-b6df-98e504bb71e3.mdnplay.dev/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations/canvas_earth.png";
    },
    draw() {
      var ctx = document.getElementById("canvas").getContext("2d");

      ctx.globalCompositeOperation = "destination-over";
      ctx.clearRect(0, 0, 300, 300); // clear canvas

      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.strokeStyle = "rgba(0,153,255,0.4)";
      ctx.save();
      ctx.translate(150, 150); // 改变坐标系原点

      // Earth
      var time = new Date();
      // 旋转
      ctx.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() +
          ((2 * Math.PI) / 60000) * time.getMilliseconds()
      );
      // 移动
      ctx.translate(105, 0);
      ctx.fillRect(0, -12, 50, 24); // Shadow
      // 图片长宽个24px
      ctx.drawImage(this.earth, -12, -12);
      // ctx.beginPath();
      // ctx.fillStyle = "#abc";
      // ctx.arc(0, -0, 10, 0, Math.PI * 2, false); //参数含义 圆心x 圆心y 半径 起始角度 结束角度 是否顺时针
      // ctx.fill();

      // Moon
      ctx.save();
      ctx.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds()
      );
      ctx.translate(0, 28.5);
      // ctx.beginPath();
      // ctx.arc(-3.5, -3.5, 3, 0, Math.PI * 2, false);
      // ctx.fillStyle = "#666";
      // ctx.fill();
      ctx.drawImage(this.moon, -3.5, -3.5);
      ctx.restore();

      ctx.restore();

      ctx.beginPath();
      ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
      ctx.stroke();

      ctx.drawImage(this.sun, 0, 0, 300, 300);
      // ctx.beginPath();
      // ctx.fillStyle = "red";
      // ctx.arc(150, 150, 20, 0, Math.PI * 2, false);
      // ctx.fill();

      this.animationId = window.requestAnimationFrame(this.draw);
    },
  },
  beforeUnmount() {
    console.log("动画已取消");
    cancelAnimationFrame(this.animationId);
  },
};
</script>

<style lang="scss" scoped>
.animation {
  #canvas {
  }
}
</style>
