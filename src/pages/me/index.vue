<template>
  <div class="bg">
    <div id="particles-js"></div>

    <div class="base">
      <div class="header">
        <div class="header_left">
          <p class="label">出生信息</p>
          <p class="value">河北邯郸-1993年12月</p>
          <p class="label">联系方式</p>
          <p class="tel">15103109561</p>
          <p class="tel">292959919@qq.com</p>
        </div>
        <div>
          <p class="name">赵强</p>
          <div class="pic"></div>
        </div>
        <div class="header_right">
          <p class="label">教育经历</p>
          <p class="value">北京工业大学-计算机科学与技术</p>
          <p class="label">目前住址</p>
          <p>北京市-朝阳区</p>
        </div>
      </div>
      <div class="content">
        <div class="content_left">
          <p class="label">求职意向</p>
          <p class="tel">高级web前端工程师</p>
        </div>
        <div class="content_right">
          <p class="label">求职状态</p>
          <p class="tel">随时到岗</p>
        </div>
        <div class="body">
          <h1>8年前端开发经验,专业技能全面</h1>
          <ul>
            <li v-for="(i, index) in list" :key="index">{{ i }}</li>
          </ul>
        </div>
        <div class="advantage_box">
          <div class="advantage">个人优势</div>
          <p v-for="(i, ind) in advantage" :key="ind">
            {{ `${ind + 1}、${i}` }}
          </p>
        </div>

        <div class="experience" v-for="(i, index) in info" :key="index">
          <div class="experience_header">
            <div>{{ i.date }}</div>
            <div>{{ i.companyName }}</div>
          </div>
          <p>{{ i.info }}</p>

          <p>项目经验：</p>
          <div v-for="(item, ind) in i.project" :key="ind">
            <p class="porjectName">{{ item.name }}</p>
            <p>{{ item.introduce }}</p>

            <p>主要职责：</p>
            <p v-for="(tar, num) in item.responsibility" :key="num">
              {{ `${num + 1}、${tar}` }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "particles.js";

export default {
  data() {
    return {
      list: Object.freeze([
        "精通html5、css、原⽣javascript",
        "精通ES6、jQuery，熟悉node.js，npm、pnpm等包管理器",
        "熟练使⽤canvas、d3.js、three.js、echarts、dataV进行页面数据可视化",
        "精通ajax、fetch、axios、mock.js进行网站异步交互",
        "掌握vue.js源码及其原理，熟练使⽤vue-cli及vue全家桶进行项目开发",
        "熟练使用react、react-router、redux、antd进行项目开发",
        "熟练使用webpack、loader、plugin搭建脚手架并了解工作原理",
        "熟练使用bootstrap、elemnet-ui、vant等ui框架，并进行二次开发",
        "熟练使用chrome和Firebug调试器调试程",
        "熟练掌握HBulider、Sublime、VScode等代码编写⼯具",
        "熟练使用Mysql数据库，熟练使用SQL语句",
        "熟练使用Less、Sass动态言框架，更灵活的处理css",
        "熟练使用SVN、GIT版本控制器",
      ]),
      advantage: Object.freeze([
        "多年的前端开发经验，对pc页面和h5页面的制作有丰富的经验；熟练掌握响应式原理，能够适应不同大小的分辨率；精通vue、react等前端框架。",
        "执行力强，具有良好的团队合作意识，善于沟通、协调，有较强的组织能力与团队精神。",
        "自学能力强，追求新技术，能很快适应新的环境。⼯作勤奋，认真负责，积极上进，平易近人，乐观向上。",
        "对代码的逻辑思维有自己独特的见解。",
      ]),
      info: Object.freeze([
        {
          companyName: "北京中芯维度科技有限公司",
          date: "2024.02 - 至今",
          info:
            "中芯维度：以数字科技为依托，借助先进的碳码识别技术，打造不同数据实时交互并实时分析处理的，用于不同应用场景。",
          project: [
            {
              name: "⼀、admin系统",
              introduce: "项⽬简介：ERP管理系统，为公司B端⽤⼾进⾏权限配置。",
              responsibility: [
                "季度正常迭代页面开发及后续的优化迭代及技术⽂档编写",
                "采⽤vue、vuex、vue-router全家桶进⾏项⽬搭建及开发,axios.js进⾏前后端数据交互",
                "正常迭代中客⼾配置相关项⽬",
                "使用echart对数据进行可视化渲染",
              ],
            },
            {
              name: "二、中心维度商城（https://mall.newwedo.net/）",
              introduce:
                "项⽬简介：公司c端用户购物平台，提供商品展示、购物车、订单、支付等功能。",
              responsibility: [
                "季度正常迭代页面开发及后续的优化迭代及技术⽂档编写",
                "采⽤vue、vuex、vue-router全家桶进⾏项⽬搭建及开发,axios.js进⾏前后端数据交互",
                "正常迭代中客⼾配置相关项⽬",
              ],
            },
            {
              name: "三、其他",
              introduce: "项⽬简介：活动分享页，字体书写动画页，协议页等。",
              responsibility: [
                "微信小程序开发及迭代",
                "微信公众号相关开发及迭代",
                "正常迭代公司相关项⽬配套页面开发",
              ],
            },
          ],
        },
        {
          companyName: "北京微吼时代科技有限公司",
          date: "2021.08 - 2023.12",
          info:
            "微吼直播：中国数字化活动营销平台及企业直播的开创者和领军企业。",
          project: [
            {
              name: "⼀、admin管理系统",
              introduce: "项⽬简介：ERP管理系统，为公司B端⽤⼾进⾏权限配置。",
              responsibility: [
                "季度正常迭代页面开发及后续的优化迭代及技术⽂档编写",
                "采⽤vue、vuex、vue-router全家桶进⾏项⽬搭建及开发,axios.js进⾏前后端数据交互",
                "正常迭代中客⼾配置相关项⽬",
                "使用echart对数据进行可视化渲染",
              ],
            },
            {
              name: "⼆、vhall直播控制台（https://e.vhall.com/）",
              introduce:
                "项⽬简介：B端用户直播配置管理平台,选择直播类型互动工具等直播相关配置。",
              responsibility: [
                "季度正常迭代页面开发及后续的优化迭代及技术文档编写;",
                "兼容性问题处理",
                "采用vue、vuex、vue-router全家桶进行项目搭建及开发,echarts、dataV进行数据图表渲染",
                "使用WebSocket进行状态实时通信",
                "使用wujie微前端对子项目进行融合",
              ],
            },
            {
              name:
                "三、vhall直播间（https://e.vhall.com/v3/lives/room/271429660?type=ctrl）",
              introduce:
                "项⽬简介：直播间开发、B端主持人、C端观众（pc、h5）https://live.vhall.com/v3/lives/watch/:id两个项目。",
              responsibility: [
                "季度正常迭代页面开发及后续的优化迭代及技术文档编写",
                "兼容性问题处理",
                "采用vue、vuex、vue-router全家桶进行项目搭建及开发,axios.js进行前后端数据交互",
                "使用WebSocket进行状态实时通信",
                "使用echart对数据进行可视化渲染",
              ],
            },
          ],
        },
        {
          companyName: "中企云链⾦融信息服务技术有限公司",
          date: "2019.05 - 2021.07",
          info: "微吼直播：中国数字化活动营销平台及企业直播的开创者和领军企业",
          project: [
            {
              name: "⼀、云信后台管理系统",
              introduce:
                "项目简介：ERP系统内对人员权限进行区分控制，对公司所有业务进行审批确认。",
              responsibility: [
                "主要为云租新增迭代管理系统所设计业务部分及后期需求优化及项目优化",
                "使用vue-cli3、vue-router、vuex、elemnet-ui、less进行模块化开发",
                "使用axios.js进行前后端数据交互",
                "使用dataV、echart对数据进行可视化渲染",
              ],
            },
            {
              name: "二、中企云链官网（https://www.yljr.com）",
              introduce:
                "项目简介：公司全业务集成，及相关业务跳转链接；云信、云秒贴、云租等。",
              responsibility: [
                "主要负责云租，票交所等相关业务页面开发；负责页面的编写和页面上特效的制作及前后端数据交互；兼容性问题的解决",
                "使用vue-cli3进行模块化开发；使用 axios.js进行前后端数据交互",
                "使用vue、echart、vue-router、vuex、elemnet-ui、less对项目进行开发",
                "使用echart对数据进行可视化渲染",
              ],
            },
            {
              name: "三、中企云租服务平台（https://yz.yljr.com）",
              introduce:
                "项目简介：B端用户使用平台，提供设备租赁、工程招投标、工程款结算等服务。",
              responsibility: [
                "独自负责项目所有迭代及项目优化",
                "为新增迭代页面及首页的更改，后期需求优化及项目优化；兼容性问题的解决",
                "使用vue、echart、vue-router、vuex、elemnet-ui、less对项目进行开发",
                "使用axios.js进行前后端数据交互",
                "使用echart对数据进行可视化渲染,amap高德api进行地图相关需求开发",
              ],
            },
            {
              name: "四、云租运营管理平台（https://yz.yljr.com/yz-manager/）",
              introduce:
                "项目描述：ERP管理系统，B端用户为云租服务平台提供用户权限配置及流程、资金审批。",
              responsibility: [
                "独自负责项目所有迭代及项目优化",
                "使用vue-cli3、vue-router、vuex、elemnet-ui、less进行模块化开发,使用axios.js进行前后端数据交互",
                "使用dataV、echart对数据进行可视化渲染",
              ],
            },
          ],
        },
        {
          companyName: "嘉实基⾦",
          date: "2015.09 - 2019.04",
          info: "微吼直播：中国数字化活动营销平台及企业直播的开创者和领军企业",
          project: [
            {
              name: "一、嘉实基金资金管理系统",
              introduce:
                "项目简介：ERP管理系统，对人员权限进行区分控制，公司业务进行审批流转备案。",
              responsibility: [
                "季度迭代新增需求页面开发主和后期维护，项目整体维护",
                "使用vue-cli、vue全家桶、axios.js进行模块化开发",
                "使用echart对数据进行可视化渲染",
              ],
            },
            {
              name: "二、crm系统",
              introduce:
                "项目简介：系统对公司业务情况进行分类展示，页面主要以antd为基础，前后端数据交互较多，操作权限划分较为复杂。",
              responsibility: [
                "季度迭代新增需求页面开发主和后期维护，项目整体维护",
                "使用 axios.js进行前后端数据交互;使用react、dva、react-router、antd、less对项目进行开发",
                "使用echart对数据进行可视化渲染",
              ],
            },
            {
              name: "三、嘉实基金官网（https://www.jsfund.cn/）",
              introduce:
                "项目简介：公司主要业务集成平台,系统主要针对客户操作资金流水进行展示下载发送。",
              responsibility: [
                "季度迭代新增需求页面开发主和后期维护，项目整体维护",
                "使用vue-cli、vue全家桶、axios.js进行模块化开发;页面配置简单化、模块化，方便二次更新升级增添新的功能",
                "使用echart对数据进行可视化渲染",
              ],
            },
          ],
        },
      ]),
    };
  },
  mounted() {
    let particelOptions = {
      particles: {
        number: {
          value: 380,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    };
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    // onload方法会请求本地配置json
    particlesJS("particles-js", particelOptions, function () {
      console.log("callback - particles.js config loaded");
    });
  },
};
</script>

<style lang="scss" scoped>
.base {
  box-sizing: border-box;
  width: 816px;
  margin: 16px auto;
  background: #6e8cb8;
  padding: 10px;
  position: relative;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    color: white;
    .header_left {
      width: 240px;
    }
    .header_right {
      width: 240px;
      text-align: right;
    }
    .name {
      font-size: 38px;
    }
    .pic {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      position: absolute;
      top: 6%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(14deg);
      background: url(../../assets/me/me.jpg) 6px -14px;
      background-size: 88%;
      border: 3px solid white;
    }
  }
  .label {
    font-size: 24px;
    margin-bottom: 14px;
  }
  .value {
    padding-bottom: 14px;
    margin-bottom: 14px;
    border-bottom: 1px dashed;
  }
  .tel {
    padding-bottom: 5px;
  }
  .content {
    padding: 0 30px 20px;
    background: white;
    overflow: hidden;
    .content_left {
      float: left;
      color: #6e8cb8;
      margin-top: 16px;
    }
    .content_right {
      float: right;
      color: #6e8cb8;
      text-align: right;
      margin-top: 16px;
    }
    .body {
      margin: 100px 5px 16px;
      border: 2px solid #6e8cb8;
      h1 {
        text-align: center;
        padding: 20px;
        font-size: 28px;
        border-bottom: 2px solid #6e8cb8;
      }
      ul {
        padding-left: 40px;
        li {
          padding: 5px 0;
          font-size: 18px;
        }
        :first-child {
          margin-top: 16px;
        }
        :last-child {
          margin-bottom: 32px;
        }
      }
    }
    p {
      line-height: 26px;
    }
    .advantage {
      display: inline-block;
      padding: 5px 10px;
      background: #6e8cb8;
      font-size: 20px;
      color: white;
      border-radius: 20px;
      margin-bottom: 20px;
    }
    .experience {
      margin-top: 20px;
      .experience_header {
        text-align: center;
        border-radius: 30px;
        background: #6e8cb8;
        color: white;
        padding: 5px 0;
        margin-bottom: 20px;
      }
      .porjectName {
        font-weight: bold;
      }
    }
  }
}
.bg {
  position: relative;
  background: black;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
}
#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
