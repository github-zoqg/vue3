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
// import { compressNormals } from "three/examples/jsm/utils/GeometryCompressionUtils.js";
// 后处理扩展库EffectComposer.js
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// 引入渲染器通道RenderPass
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// 引入OutlinePass.js
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

let animates = null;
let flag = false;
let startTime = null;
let composer = null;
let renderer = null;
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
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      //   渲染区域大小设置
      let width = window.innerWidth - 200;
      let height = document.querySelector(".content-box").offsetHeight;
      renderer.setSize(width, height);
      renderer.outputEncoding = THREE.sRGBEncoding;

      //   创建一个场景
      this.scene = new THREE.Scene();
      this.addAxesHelper();
      //   设置背景颜色
      this.scene.background = new THREE.Color(0xbfe3dd);
      // 此类从立方体贴图环境纹理生成经过预过滤的 Mipmapped 辐射环境贴图 (PMREM)
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
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
      let card = null;
      this.clock = new THREE.Clock();
      loader.load(
        "/static/glbs/LittlestTokyo.glb",
        function (gltf) {
          // 获取模型数据
          const model = gltf.scene;
          card = model.getObjectByName("Object675");
          console.log(card, "card");
          // 射线拾取模型对象(包含多个Mesh)
          // 可以给待选对象的所有子孙后代Mesh，设置一个祖先属性ancestors,值指向祖先(待选对象)
          for (let i = 0; i < card.children.length; i++) {
            const group = card.children[i];
            //递归遍历chooseObj，并给chooseObj的所有子孙后代设置一个ancestors属性指向自己
            group.traverse(function (obj) {
              if (obj.isMesh) {
                obj.ancestors = group;
              }
            });
          }
          console.log(_that.scene.children[1], "intersects");
          console.log(_that.scene.children, "_that.scene.children");
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
          console.log(
            that.mixer.clipAction(gltf.animations[0]),
            "gltf.animations"
          );
          animates = that.mixer.clipAction(gltf.animations[0]);
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
      document.querySelector("#animation").appendChild(renderer.domElement);
      // 创建射线投射器和鼠标向量
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const _that = this;

      // 创建后处理composer
      composer = new EffectComposer(renderer);
      // 创建渲染通道RenderPass
      const renderPass = new RenderPass(this.scene, this.camera);
      // 创建描边Pass
      const outlinePass = new OutlinePass(
        new THREE.Vector2(width, height),
        this.scene,
        this.camera
      );
      // 设置描边Pass的线宽
      outlinePass.edgeStrength = 2;
      outlinePass.edgeGlow = 0.5;
      outlinePass.edgeThickness = 1;
      // 创建gamma校正Pass
      const gammaCorrectionShader = new ShaderPass(GammaCorrectionShader);

      // 将渲染通道RenderPass添加到composer中
      composer.addPass(renderPass);
      // 将描边Pass添加到composer中
      composer.addPass(outlinePass);
      // 将gamma校正Pass添加到composer中(注:必须在renderPass添加之后,再添加才能生效)
      composer.addPass(gammaCorrectionShader);
      // 启动composer
      composer.render();

      renderer.domElement.onclick = function (event) {
        console.log(event.clientX, event.clientY);
        // 计算鼠标在标准化设备坐标中的位置
        mouse.x = (event.clientX / width) * 2 - 1;
        mouse.y = -(event.clientY / height) * 2 + 1;

        // 通过鼠标位置更新射线投射器
        raycaster.setFromCamera(mouse, _that.camera);
        // 计算射线与场景中对象的交点
        const intersects = raycaster.intersectObjects([card], true);

        if (intersects.length > 0) {
          console.log("点击到对象:", intersects);
          console.log("flag:", flag);
          console.log("animates.time:", animates.time);
          // len % 2 == 0 && animates.stop() && (animates.time = startTime);
          if (flag) {
            // 点击到对象，开始动画，记录当前时间
            animates.paused = false;
            animates.time = startTime;
            outlinePass.selectedObjects = [];
          } else {
            // 点击到对象，暂停动画，记录当前时间
            animates.paused = true;
            startTime = animates.time;
            outlinePass.selectedObjects = [intersects[0].object.ancestors];
          }
          flag = !flag;
        }
      };
    },
    addControls() {
      // 创建相机控件
      // OrbitControls本质上就是改变相机的参数，比如相机的位置属性，改变相机位置也可以改变相机拍照场景中模型的角度，
      // 实现模型的360度旋转预览效果，改变透视投影相机距离模型的距离，就可以改变相机能看到的视野范围。
      this.controls = new OrbitControls(this.camera, renderer.domElement);
      this.controls.target.set(0, 0.5, 0);
      this.controls.update();
      this.controls.enablePan = false;
      this.controls.enableDamping = true;
    },
    animate() {
      // console.log("animate", animates.time);
      // 渲染视图
      // renderer.render(this.scene, this.camera);
      composer.render();
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
