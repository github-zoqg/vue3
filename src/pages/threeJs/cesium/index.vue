<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import {
  Cartesian3,
  Color,
  createOsmBuildingsAsync,
  Ion,
  Math as CesiumMath,
  Model,
  JulianDate,
  SampledPositionProperty,
  Terrain,
  TimeInterval,
  TimeIntervalCollection,
  PathGraphics,
  VelocityOrientationProperty,
  Viewer,
} from "cesium";
import { onMounted, onUnmounted } from "vue";
import positions from "./positions.json";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NmZjOTA2ZC0wZTk1LTQzZmQtOTBmMC0yZGE3ZWJlNzRlYTgiLCJpZCI6MzMzMTgyLCJpYXQiOjE3NTU1NzE2MDh9.lR_sEqlw8-Bp39cpM4t4PciL33XmEcBrCHrwkC3AYTc";
let viewer;
const initCesium = async () => {
  // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
  viewer = new Viewer("cesiumContainer", {
    // 地形
    terrain: Terrain.fromWorldTerrain(),
  });

  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  //   viewer.camera.flyTo({
  //     destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
  //     orientation: {
  //       heading: CesiumMath.toRadians(0.0),
  //       pitch: CesiumMath.toRadians(-15.0),
  //     },
  //   });

  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileset = await createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingTileset);

  //   // STEP 3 CODE (first point)
  //   // This is one of the first radar samples collected for our flight.
  //   const dataPoint = {
  //     longitude: -122.38985,
  //     latitude: 37.61864,
  //     height: -27.32,
  //   };
  //   // Mark this location with a red point.
  //   const pointEntity = viewer.entities.add({
  //     description: `First data point at (${dataPoint.longitude}, ${dataPoint.latitude})`,
  //     position: Cartesian3.fromDegrees(
  //       dataPoint.longitude,
  //       dataPoint.latitude,
  //       dataPoint.height
  //     ),
  //     point: { pixelSize: 10, color: Color.RED },
  //   });
  //   // Fly the camera to this point.
  //   viewer.flyTo(pointEntity);

  // STEP 3 CODE (all points)
  // These are all the radar points from this flight.
  const flightData = positions;

  const timeStepInSeconds = 30;
  const totalSeconds = timeStepInSeconds * (flightData.length - 1);
  const start = JulianDate.fromIso8601("2020-03-09T23:10:00Z");
  const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate());
  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.timeline.zoomTo(start, stop);
  // Speed up the playback speed 50x.
  viewer.clock.multiplier = 50;
  // Start playing the scene.
  viewer.clock.shouldAnimate = true;

  // The SampledPositionedProperty stores the position and timestamp for each sample along the radar sample series.
  // 采样位置属性存储每个样本的位置和时间戳。
  const positionProperty = new SampledPositionProperty();

  // Create a point for each.
  for (let i = 0; i < flightData.length; i++) {
    const dataPoint = flightData[i];

    // Declare the time for this individual sample and store it in a new JulianDate instance.
    const time = JulianDate.addSeconds(
      start,
      i * timeStepInSeconds,
      new JulianDate()
    );
    const position = Cartesian3.fromDegrees(
      dataPoint.longitude,
      dataPoint.latitude,
      dataPoint.height
    );
    // Store the position along with its timestamp.
    // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
    positionProperty.addSample(time, position);

    viewer.entities.add({
      description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
      position: position,
      point: { pixelSize: 10, color: Color.RED },
    });
  }
  //   加载线上模型
  // const airplaneUri = await Cesium.IonResource.fromAssetId(your_asset_id);
  const airplaneEntity = viewer.entities.add({
    // 可用性:      new 一个时间间隔收集
    availability: new TimeIntervalCollection([
      // 时间间隔
      new TimeInterval({ start: start, stop: stop }),
    ]),
    position: positionProperty,
    // point: { pixelSize: 30, color: Color.GREEN },
    // 加载模型 本地或者线上资源
    model: {
      uri: "/static/glbs/airplane.glb",
      // 最小像素大小
      minimumPixelSize: 128,
      // 最大比例尺
      maximumScale: 10000000,
      // 轮廓颜色
      silhouetteColor: Color.WHITE,
      // 轮廓大小
      silhouetteSize: 1,
      // 颜色
      color: Color.WHITE,
      // 比例
      scale: 1,
      // 高度参考
      // heightReference: "NONE",
    },
    // 速度方向属性
    orientation: new VelocityOrientationProperty(positionProperty),
    // 路径图形
    path: new PathGraphics({ width: 3 }),
  });
  // Make the camera track this moving entity.
  viewer.trackedEntity = airplaneEntity;

  console.log(viewer);
};
onMounted(initCesium);
function destroyCesium() {
  console.log("destroyCesium");
  viewer.destroy();
}
onUnmounted(destroyCesium);
</script>

<style lang="scss" scoped></style>
