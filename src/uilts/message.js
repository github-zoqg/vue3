import { ElMessage } from "element-plus";

const warnMessage = (str) => {
  ElMessage({
    message: str,
    type: "warning",
    customClass: "message_width",
  });
};

const successMessage = (str) => {
  ElMessage({
    message: str,
    type: "success",
    customClass: "message_width",
  });
};

export { warnMessage, successMessage };
