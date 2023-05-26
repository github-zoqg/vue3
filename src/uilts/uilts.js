// 时间戳转时间
const timestrToDate = (val, type = "date") => {
  if (!val) {
    val = new Date();
  }
  let date = new Date(val);
  let Y = date.getFullYear();
  let M = date.getMonth() + 1;
  let D = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  if (type == "date") {
    return `${Y}年${M}月${D}日`;
  }
  if (type == "hm") {
    return `${Y}年${M}月${D}日` + h + ":" + m;
  }
  if (type == "hms") {
    return `${Y}年${M}月${D}日` + ` ${h}:${m}:${s}`;
  }
};
export default {
  timestrToDate,
};
