// 用户信息相关接口

import axios from "../uilts/axios";

let INTERFACE = {
  login: "/user/login",
  exit: "/user/exit",
  register: "/user/register",
  logOff: "/user/logOff",
};

const login = (params = {}) => {
  return axios.post(INTERFACE.login, params);
};

const exit = () => {
  axios.post(INTERFACE.exit).then((res) => {
    // router.push("/");
    location.pathname = "/";
  });
};

export default { login, exit };
