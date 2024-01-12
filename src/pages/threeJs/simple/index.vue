<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; // 引入轨道控制器扩展库OrbitControls.js
import Stats from "three/examples/jsm/libs/stats.module.js"; //引入性能监视器stats.js
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"; // 引入dat.gui.js的一个类GUI

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      scene: null,
    };
  },
  mounted() {
    console.log(this.$attrs, this.$listeners, "this+++++++");
    this.initThree();
    this.createBox();
    this.initGUI();
    this.test();
  },
  methods: {
    initThree() {
      // 定义threejs输出画布的尺寸(单位:像素px)
      // const width = 800; //宽度
      const width = document.querySelector(".hello").offsetWidth / 2; //宽度
      console.log(width, window.innerWidth, "width");
      // const width = window.innerWidth; //宽度
      const height = 600; //高度

      // 创建一个场景
      const scene = new THREE.Scene();
      console.log(scene, "scene1");

      // 创建物体形状-长方体
      const geometry = new THREE.BoxGeometry(100, 100, 100);
      //创建一个材质对象Material
      const material = new THREE.MeshLambertMaterial({
        color: 0xff0000, //0xff0000设置材质颜色为红色
        side: THREE.DoubleSide,
        // transparent: true, //开启透明
        opacity: 0.5, //设置透明度
      });
      // const material = new THREE.MeshBasicMaterial({
      //   color: 0xff0000, //0xff0000设置材质颜色为红色
      //   transparent: true, //开启透明
      //   opacity: 0.5, //设置透明度
      // });
      // 创建物体实例化
      console.log(material.color, "color");
      const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      mesh.castShadow = true; // cast投射，方块投射阴影
      mesh.receiveShadow = true; // 物体接收阴影
      // mesh.position.set(0, 10, 0);
      // 将物体添加如场景
      scene.add(mesh);

      // AxesHelper：辅助观察的坐标系
      const axesHelper = new THREE.AxesHelper(100);
      scene.add(axesHelper);

      //点光源：两个参数分别表示光源颜色和光照强度
      // 参数1：0xffffff是纯白光,表示光源颜色
      // 参数2：1.0,表示光照强度，可以根据需要调整
      // 点光源不生效为版本原因，退回到155之前的版本
      // const pointLight = new THREE.DirectionalLight(0xffffff, 1, 10, 2);
      const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
      //点光源位置
      pointLight.position.set(200, 150, 100); //点光源放在x轴上
      pointLight.castShadow = true; //表示这个光是可以产生阴影的
      scene.add(pointLight); //点光源添加到场景中

      // 光源辅助观察
      const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
      scene.add(pointLightHelper);

      console.log(scene, "scene2");

      // 创建一个透视相机
      const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
      // const camera = new THREE.PerspectiveCamera();
      // 定义相机的位置
      camera.position.set(200, 200, 200);
      // 定义相机的拍摄点
      camera.lookAt(mesh.position);
      console.log(camera, "camera");

      // 实例化渲染器
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
      // 添加场景和相机
      // renderer.render(scene, camera);
      // 添加动画
      this.addAnimation(mesh, scene, camera, renderer);
      console.log(renderer.domElement, "renderer.domelement");

      // 添加控制器
      this.addOrbitControls(scene, camera, renderer);

      // 挂载dom
      // 渲染器WebGLRenderer通过属性.domElement可以获得渲染方法.render()生成的Canvas画布
      renderer.domElement.style.display = "inline";
      document.querySelector(".hello").appendChild(renderer.domElement);
    },
    test: () => {
      console.log(this, "Parent");
    },
    createBox() {
      // let width = window.innerWidth;
      const width = document.querySelector(".hello").offsetWidth / 2; //宽度
      let height = 600;
      // 创建场景
      let scene = new THREE.Scene();
      // 随机创建大量的模型,测试渲染性能
      const num = 1000; //控制长方体模型数量
      const geometry = new THREE.BoxGeometry(5, 5, 5);
      const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
      });
      for (let i = 0; i < num; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        // 随机生成长方体xyz坐标
        const x = Math.floor((Math.random() - 0.5) * 200);
        const y = Math.floor((Math.random() - 0.5) * 200);
        const z = Math.floor((Math.random() - 0.5) * 200);
        mesh.position.set(x, y, z);
        scene.add(mesh); // 模型对象插入场景中
      }

      // 添加点光源
      const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
      pointLight.position.set(200, 200, 200);
      pointLight.castShadow = true; //表示这个光是可以产生阴影的
      scene.add(pointLight); //点光源添加到场景中

      console.log(scene, "scene");

      // 创建相机
      let camera = new THREE.PerspectiveCamera();
      camera.position.set(200, 200, 200);
      camera.lookAt(0, 0, 0);

      // 实例化渲染器
      let renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
      this.addOrbitControls(scene, camera, renderer);
      // 挂载dom
      renderer.domElement.style.display = "inline";
      document.querySelector(".hello").appendChild(renderer.domElement);
    },
    initGUI() {
      // 实例化一个gui对象
      const gui = new GUI();
      //改变交互界面style属性
      gui.domElement.style.right = "0px";
      gui.domElement.style.width = "300px";
      //创建一个对象，对象属性的值可以被GUI库创建的交互界面改变
      const obj = {
        x: 30,
        y: 60,
        z: 300,
      };
      // gui界面上增加交互界面，改变obj对应属性
      gui.add(obj, "x", 0, 100);
      gui.add(obj, "y", 0, 500);
      gui.add(obj, "z", [-100, 0, 100]);
    },
    addOrbitControls(scene, camera, renderer) {
      const controls = new OrbitControls(camera, renderer.domElement);
      // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
      controls.addEventListener("change", function () {
        renderer.render(scene, camera); //执行渲染操作
      }); //监听鼠标、键盘事件
    },
    addAnimation(mesh, scene, camera, renderer) {
      const clock = new THREE.Clock();
      const stats = new Stats();
      function animationRender() {
        const spt = clock.getDelta() * 1000; //毫秒
        // console.log("两帧渲染时间间隔(毫秒)", spt);
        // console.log("帧率FPS", 1000 / spt);
        stats.update();
        renderer.render(scene, camera); //执行渲染操作
        mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
        requestAnimationFrame(animationRender); //请求再次执行渲染函数render，渲染下一帧
      }
      animationRender();
      document.querySelector(".hello").appendChild(stats.domElement);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
