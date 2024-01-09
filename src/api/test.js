import axios from "../uilts/axios";

let INTERFACE = {
  test: "/test/api/reg",
};

const axiosTextPost = (params = {}) => {
  return axios.post(INTERFACE.test, {
    test: "test-post",
    ...params,
  });
};

const axiosTextGet = (params) => {
  return axios.get(INTERFACE.test, {
    params: { test: "test-get", ...params },
  });
};

export default { axiosTextPost, axiosTextGet };
