<template>
  <div class="listBase">
    <div class="header">
      <!-- {{ childData.childCounte }} -->
      <span>客户列表</span>
      <el-button link type="primary" @click="goback" class="but_goback"
        >返回</el-button
      >
    </div>
    <div class="searchBase">
      <el-input
        v-model="searchForm.name"
        class="searchName"
        clearable
        placeholder="请输入姓名"
      />
      <el-date-picker
        v-model="searchForm.date"
        value-format="x"
        placeholder="请选择日期"
      />
      <div class="but_search">
        <el-button type="primary" @click="getlist">查询</el-button>
        <el-button type="primary" @click="edit">新增</el-button>
      </div>
      <div>
        <el-table :data="childData.tableData" style="width: 100%" class="">
          <el-table-column prop="name" label="姓名" width="180" />
          <el-table-column prop="sex" label="性别" width="180">
            <template #default="scope">
              {{ scope.row.sex == 1 ? "男" : "女" }}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="日期" width="180">
            <template #default="scope">
              {{
                new Date(scope.row.date)
                  .toLocaleDateString()
                  .replaceAll("/", "-")
              }}
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" />
          <el-table-column prop="notes" label="备注" />
          <el-table-column prop="operate" label="操作">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="edit(scope.row)"
                >编辑</el-button
              >
              <el-button
                link
                type="primary"
                size="small"
                @click="del(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      v-model="childData.dialogVisible"
      title="备注"
      width="600px"
      :before-close="handleClose"
      class="dialogBase"
    >
      <el-form
        :model="formDetail"
        :rules="rules"
        size="large"
        ref="ruleFormRef"
        label-width="auto"
        class="formBase w80 center"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formDetail.name" class="" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="formDetail.phone" class="" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formDetail.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="formDetail.notes"
            maxlength="300"
            rows="4"
            placeholder="备注"
            show-word-limit
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="save"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive } from "vue";
import interact from "../api/custom";
import { ElMessage } from "element-plus";

export default {
  setup() {
    let childData = reactive({
      childCounte: 0,
      tableData: [{}],
      dialogVisible: false,
    });
    let searchForm = reactive({
      date: "",
      name: "",
    });
    let formDetail = reactive({
      name: "",
      date: "",
      sex: "",
      phone: "",
      notes: "",
    });
    const rules = reactive({
      name: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
      ],
      phone: [
        {
          required: true,
          message: "请输入手机号",
          trigger: "blur",
        },
        {
          message: "手机号码错误",
          trigger: "blur",
          pattern: /^1[3-9][0-9]{9}$/,
        },
      ],
    });

    function add() {
      childData.dialogVisible = true;
    }
    return {
      childData,
      searchForm,
      formDetail,
      rules,
      add,
    };
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    // console.log(this, "this");
    // console.log(this.childData, "this.childData");
    // console.log(this.axios, "this.axios");
    this.addCopy();
    this.getlist();
  },
  methods: {
    // 不能与setup中方法重名
    // add() {
    //   this.childCounte++;
    // },
    addCopy() {
      this.childData.childCounte++;
    },
    // 返回
    goback() {
      this.$router.go(-1);
    },
    // 获取列表数据
    getlist() {
      interact.getlist(this.searchForm).then((res) => {
        // console.log(typeof res.data, res.data.status, "axiosTextPost");
        this.childData.tableData = res.data.list;
      });
    },
    // 编辑
    edit(item) {
      console.log(item, "item");
      this.childData.dialogVisible = true;
      // item && (this.formDetail = item);
      item && Object.assign(this.formDetail, item);
    },
    // 删除
    del(rows) {
      console.log(rows, "rows");
      interact.del({ id: rows.id }).then((res) => {
        console.log(typeof res.data, res.data.status, "axiosTextPost");
        if (res.data.status == 200) {
          this.$message.success("删除成功");
          this.getlist();
        }
      });
    },
    handleClose() {
      this.childData.dialogVisible = false;
      this.formDetail = {};
      this.$refs.ruleFormRef.resetFields();
    },
    save() {
      this.$refs.ruleFormRef.validate((valid, fields) => {
        if (valid) {
          interact.update(this.formDetail).then((res) => {
            // console.log(typeof res.data, res.data.status, "axiosTextPost");
            if (res.data.status == 200) {
              this.$message.success("修改成功");
              this.handleClose();
              this.getlist();
            }
          });
          this.childData.dialogVisible = false;
        }
      });
    },
  },
  //   beforeDestroy(){
  //     // 已废弃
  //     console.log('beforeDestory')
  //   }
};
</script>

<style lang="less" scoped>
.listBase {
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  line-height: 60px;
  background: #666;
  padding: 0 20px;
}
.but_goback {
}
.searchName {
  width: 220px;
  margin-right: 10px;
}
.searchBase {
  padding: 20px;
  text-align: initial;
  .but_search {
    float: right;
  }
}
:deep(.dialogBase) {
  text-align: initial;
}
// /deep/.dialogBase {
//   text-align: initial;
// }
</style>
<style lang="scss" scoped>
$asd: aquamarine;
.searchBase {
  color: aquamarine;
  .but_search {
    color: $asd;
  }
}
</style>
