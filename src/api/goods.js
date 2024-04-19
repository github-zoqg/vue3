// 用户信息相关接口

import axios from "../uilts/axios";

let INTERFACE = {
  getGoodsList: "/goods/getGoodsList",
  getGoodsDetail: "/goods/getGoodsDetail",
  addCart: "/goods/addCart",
  deleteCart: "/goods/deleteCart",
  getCartList: "/goods/getCartList",
  addRecord: "/goods/addRecord",
  getRecordList: "/goods/getRecordList",
  pay: "/goods/pay",
};

const getGoodsList = (params = {}) => {
  return axios.get(INTERFACE.getGoodsList, params);
};

const getGoodsDetail = (params = {}) => {
  return axios.get(INTERFACE.getGoodsDetail, params);
};

const addCart = (params = {}) => axios.post(INTERFACE.addCart, params);

const deleteCart = (params = {}) => axios.post(INTERFACE.exit, params);

const getCartList = (params = {}) => axios.post(INTERFACE.exit, params);

const addRecord = (params = {}) => axios.post(INTERFACE.exit, params);

const getRecordList = (params = {}) => axios.post(INTERFACE.exit, params);

const pay = (params = {}) => axios.post(INTERFACE.exit, params);

export default {
  getGoodsList,
  getGoodsDetail,
  addCart,
  deleteCart,
  getCartList,
  addRecord,
  getRecordList,
  pay,
};
