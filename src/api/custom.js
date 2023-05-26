import axios from "../uilts/axios";

let INTERFACE = {
  getlist: "/custom/getlist",
  add: "/custom/add",
  update: "/custom/update",
  del: "/custom/del",
};

if (process.env.NODE_ENV == "development") {
  for (let key in INTERFACE) {
    console.log(key,'INTERFACE');
    INTERFACE[key] = "/test" + INTERFACE[key];
  }
}

const add = (params = {}) => {
  return axios.post(INTERFACE.add, {
    ...params,
  });
};

const update = (params = {}) => {
  return axios.post(INTERFACE.update, {
    ...params,
  });
};

const del = (params = {}) => {
  return axios.post(INTERFACE.del, {
    ...params,
  });
};

const getlist = (params) => {
  return axios.post(INTERFACE.getlist, {
    ...params,
  });
};

export default { add, update, del, getlist };
