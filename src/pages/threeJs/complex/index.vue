<template>
  <div id="animation"></div>
</template>

<script>
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// 创建GLTF加载器对象
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
export default {
  data() {
    return {
      renderer: null,
      camera: null,
      scence: null,
      controls: null,
      mixer: null,
      clock: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //   定义渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      //   渲染区域大小设置
      let width = window.innerWidth - 200;
      let height = window.innerHeight - 1;
      this.renderer.setSize(width, height);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      //   创建一个场景
      this.scene = new THREE.Scene();
      this.addAxesHelper();
      //   设置背景颜色
      this.scene.background = new THREE.Color(0xbfe3dd);
      // 此类从立方体贴图环境纹理生成经过预过滤的 Mipmapped 辐射环境贴图 (PMREM)
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      // 根本原因是因为金属材质需要env贴图 设置材质的material.env就可以了 也可使用RoomEnvironment
      // 也可以将RoomEnvironment不放入scene中 只传给金属物体就可以了
      this.scene.environment = pmremGenerator.fromScene(
        new RoomEnvironment(),
        0.04
      ).texture;
      // 模型是压缩过的，类似gzip，因此我们使用之前，需要先解压。
      // DRACOLoader是three提供的模型解压工具，可以帮我们对模型进行解压操作
      const dracoLoader = new DRACOLoader();
      // /static目录下文件无法通过assets加载。
      dracoLoader.setDecoderPath("/static/gltf/");
      // 创建GLTF加载器对象
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      let that = this;
      this.clock = new THREE.Clock();
      loader.load(
        "/static/glbs/LittlestTokyo.glb",
        function (gltf) {
          // 获取模型数据
          const model = gltf.scene;
          // 设置模型位置
          model.position.set(1, 1, 0);
          // 设置模型缩放
          model.scale.set(0.01, 0.01, 0.01);
          // 将模型加入场景
          that.scene.add(model);
          //  包含关键帧动画的模型对象作为AnimationMixer的参数创建一个播放器mixer
          that.mixer = new THREE.AnimationMixer(model);
          //AnimationMixer的`.clipAction()`返回一个AnimationAction对象
          //.play()控制动画播放，默认循环播放
          that.mixer.clipAction(gltf.animations[0]).play();
          that.animate();
        },
        undefined,
        function (e) {
          console.error(e);
        }
      );
      // 创建一个透视相机
      this.camera = new THREE.PerspectiveCamera(40, width / height, 1, 100);
      //   定义相机的位置
      this.camera.position.set(5, 2, 8);
      //   定义相机拍摄点
      //   camera.lookAt(mesh.position);
      this.camera.aspect = width / height;
      // 手动更新相机的投影矩阵
      this.camera.updateProjectionMatrix();
      // 添加控制器
      this.addControls();
      document
        .querySelector("#animation")
        .appendChild(this.renderer.domElement);
    },
    addControls() {
      // 创建相机控件
      // OrbitControls本质上就是改变相机的参数，比如相机的位置属性，改变相机位置也可以改变相机拍照场景中模型的角度，
      // 实现模型的360度旋转预览效果，改变透视投影相机距离模型的距离，就可以改变相机能看到的视野范围。
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 0.5, 0);
      this.controls.update();
      this.controls.enablePan = false;
      this.controls.enableDamping = true;
    },
    animate() {
      // 渲染视图
      this.renderer.render(this.scene, this.camera);
      //  controls.update()函数内会执行camera.lookAt(x, y, z)
      this.controls.update();
      //  clock.getDelta()方法获得animate()两次执行时间间隔
      let delta = this.clock.getDelta();
      //  更新播放器相关的时间
      this.mixer.update(delta);
      requestAnimationFrame(this.animate);
    },
    addAxesHelper() {
      // AxesHelper：辅助观察的坐标系
      const axesHelper = new THREE.AxesHelper(100);
      this.scene.add(axesHelper);
    },
  },
};
</script>

<style lang="scss" scoped></style>
