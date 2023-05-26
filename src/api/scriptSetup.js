import axios from "../uilts/axios";

let INTERFACE = {
  test: "/scriptSetup",
};

const axiosTextPost = (params={}) => {
  return axios.post(INTERFACE.test, {
    test: "test-post",
    ...params,
  });
};

export default { axiosTextPost };
