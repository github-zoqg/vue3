<template>
  <div class="dialog-container">
    <el-dialog
      :title="registerProps.status === 'login' ? '登录' : '注册'"
      v-model="visible"
      width="500px"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item
          v-if="registerProps.status != 'login'"
          label="确认密码"
          prop="password2"
        >
          <el-input
            v-model="ruleForm.password2"
            type="password"
            placeholder="请再次输入密码"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submit">
            {{ registerProps.status === "login" ? "登 录" : "注 册" }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, reactive } from "vue";
import { useStore } from "vuex";
import request from "@/api/user.js";
import { ElMessage } from "element-plus";

const props = defineProps(["dialogVisible", "registerProps"]);
const store = useStore();
// console.log(props, "defineProps");

const visible = computed({
  //get
  get() {
    return props.dialogVisible;
  },
  //set
  set(newValue) {
    // emit("closeDialog", newValue);
  },
});
// console.log(visible, "computed");

const emit = defineEmits(["closeDialog"]);
// console.log(emit, "defineEmits");
// 表单校验规则
const rules = {
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  password2: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.password) {
          callback(new Error("两次输入的密码不一致!"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

// 表单数据
const ruleForm = reactive({
  phone: "",
  password: "",
  password2: "",
});

const ruleFormRef = ref(null);
// console.log(ruleFormRef, "ruleFormRef");

const submit = () => {
  // TODO 注册接口未开发
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      const api = props.registerProps.status === "login" ? "login" : "register";
      request[api](ruleForm).then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          if (props.registerProps.status === "login") {
            store.commit("setUser", {
              name: "张三",
              ...res.data,
            });
            ElMessage({
              message: "登陆成功",
              type: "success",
            });
            location.reload();
          } else {
            ElMessage({
              message: "注册成功，请登录！",
              type: "success",
            });
          }
          handleClose();
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const handleClose = () => {
  ruleFormRef.value.resetFields();
  emit("closeDialog");
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
::v-deep .el-dialog {
  border-radius: 16px;
}
::v-deep .el-dialog__body {
  padding: 20px 40px;
}
</style>
