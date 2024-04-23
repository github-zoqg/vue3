// 用户信息相关接口

import axios from "../uilts/axios";

let INTERFACE = {
  addGoods: "/goods/addGoods",
  getGoodsList: "/goods/getGoodsList",
  getGoodsDetail: "/goods/getGoodsDetail",
  addCart: "/goods/addCart",
  deleteCart: "/goods/deleteCart",
  getCartList: "/goods/getCartList",
  updateCartList: "/goods/updateCartList",
  addRecord: "/goods/addRecord",
  getRecordList: "/goods/getRecordList",
  pay: "/goods/pay",
};

const addGoods = (params = {}) => axios.post(INTERFACE.addGoods, params);

const getGoodsList = (params = {}) => {
  return axios.get(INTERFACE.getGoodsList, params);
};

const getGoodsDetail = (params = {}) => {
  return axios.get(INTERFACE.getGoodsDetail, params);
};

const addCart = (params = {}) => axios.post(INTERFACE.addCart, params);

const deleteCart = (params = {}) => axios.post(INTERFACE.deleteCart, params);

const getCartList = (params = {}) => axios.post(INTERFACE.getCartList, params);

const updateCartList = (params = {}) =>
  axios.post(INTERFACE.updateCartList, params);

const addRecord = (params = {}) => axios.post(INTERFACE.addRecord, params);

const getRecordList = (params = {}) =>
  axios.post(INTERFACE.getRecordList, params);

const pay = (params = {}) => axios.post(INTERFACE.pay, params);

export default {
  addGoods,
  getGoodsList,
  getGoodsDetail,
  addCart,
  deleteCart,
  getCartList,
  updateCartList,
  addRecord,
  getRecordList,
  pay,
};
