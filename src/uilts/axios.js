import axios from "axios";
import { ElMessage } from "element-plus";
import store from "@/store";

console.log(store.state.user?.token, "store");

const instance = axios.create({
  baseURL: "http://127.0.0.1:8089",
  timeout: 1000,
  headers: { "content-type": "application/x-www-form-urlencoded" },
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  // transformRequest: [
  //   function (data, headers) {
  //     // 对发送的 data 进行任意转换处理
  //     console.log(headers, data);
  //     return data;
  //   },
  // ],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data) {
      // 对接收的 data 进行任意转换处理
      // console.log(data, "response-data");

      return typeof data == "object" ? data : JSON.parse(data);
      // return data;
    },
  ],
});
if (store.state.user?.token) {
  instance.defaults.headers.token = `${store.state.user.token}`;
}
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log(config, "config");
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log(response, "response");
    if (response.data.status === 200) {
      return response.data;
    }
    if (response.data.status === 401) {
      store.commit("setUser", null);
      ElMessage({
        message: response.data.message,
        type: "warning",
      });
      return Promise.reject(response.data);
    } else {
      ElMessage({
        message: response.data.message,
        type: "warning",
      });
      return Promise.reject(response.data);
    }
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // return Promise.reject(error);
  }
);

// console.log(instance, "axios");
export default instance;
