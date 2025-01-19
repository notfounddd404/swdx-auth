<template>
  <basic-container class="flex-container">
    <!-- <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               :before-close="beforeClose"
               header-cell-class-name="overflow-hide"
               class="flex-crud"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.authconfig_delete"
                   @click="handleDelete">删 除
        </el-button>
        <div class="header-search el-col-md-18 el-col-sm-24" v-if="option.innerSearch">
          <avue-form ref="cusSearch" :inline="true" v-model="query" :option="customSearchOption" @submit="refreshChange"></avue-form>
        </div>
      </template>
    </avue-crud> -->
    <div class="title">
        <!-- <span class="title-bg"></span> -->
        <svg t="1737277896114" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4280" width="35" height="35"><path d="M484.522667 77.192533l-307.2 134.997334A68.266667 68.266667 0 0 0 136.533333 274.653867V486.229333c0 129.5872 57.9584 245.384533 160.085334 325.188267l176.0256 124.2112a68.266667 68.266667 0 0 0 78.711466 0l174.6944-123.221333C829.508267 731.5968 887.466667 615.799467 887.466667 486.229333V274.670933a68.266667 68.266667 0 0 0-40.789334-62.498133l-307.2-134.997333a68.266667 68.266667 0 0 0-54.954666 0zM204.8 274.670933l307.2-134.997333 307.2 134.997333V486.229333c0 108.305067-48.0768 204.373333-133.853867 271.394134L512 879.837867l-174.6944-123.221334C252.8768 690.551467 204.8 594.500267 204.8 486.1952V274.670933z" fill="#409EFF" p-id="4281"></path><path d="M682.666667 358.4l48.264533 48.264533-221.866667 221.866667a34.133333 34.133333 0 0 1-48.264533 0l-136.533333-136.533333L372.5312 443.733333l112.401067 112.384L682.666667 358.4z" fill="#409EFF" p-id="4282"></path></svg>
        <h2>认证设置</h2>
    </div>
    <el-form ref="form" :model="form" label-width="180px" size="small" :disabled="isEdit">
        <el-divider content-position="left">登录限制设置</el-divider>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form-item label="IP登录失败限制：">
                        <el-input v-model="form.ipLoginFailedStatus"></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form-item label="用户登录失败限制：">
                        <el-input v-model="form.userLoginFailedStatus"></el-input>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form-item label="IP锁定登录的时间：">
                        <el-input v-model="form.ipLockLoginTime"></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form-item label="用户锁定登录的时间：">
                        <el-input v-model="form.userLockLoginTime"></el-input>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form-item label="IP锁定登录失败数：">
                        <el-input v-model="form.ipLockLoginFailedCount"></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form-item label="用户锁定登录失败数：">
                        <el-input v-model="form.userLockLoginFailedCount"></el-input>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form-item label="最大在线会话量：">
                        <el-input v-model="form.maxOnlineSession"></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form-item label="登录方式：">
                        <el-select v-model="form.loginWay" placeholder="请选择" >
                            <el-option
                                v-for="item in loginWayOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
        <el-divider content-position="left">登录配置设置</el-divider>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form-item label="验证码错误数：">
                        <el-input v-model="form.captchaFailedCount"></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form-item label="启用redis：">
                        <el-select v-model="form.isRedis" placeholder="请选择" >
                            <el-option
                                v-for="item in isCaptchaFailedOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <el-form-item label="是否开启短信登录验证：">
                        <el-select v-model="form.isRedis" placeholder="请选择" >
                            <el-option
                                v-for="item in isRedisOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
        <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit" style="width: 100%;" :loading="isEdit">确定</el-button>
        </el-form-item>
    </el-form>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, submit, getLastOne} from "@/api/authManager/authconfig";
  import {mapGetters} from "vuex";
  import {deepClone} from "@/util/util";

  export default {
    data() {
      return {
        loginWayOptions: [
            {
                label: '不限制',
                value: 1
            },
            {
                label: '踢出之前的用户',
                value: 2
            },
            {
                label: '禁止再次登录',
                value: 3
            }
        ],
        isCaptchaFailedOptions: [
            {
                label: '是',
                value: 1
            },
            {
                label: '否',
                value: 0
            },
        ],
        isCaptchaOptions: [
            {
                label: '是',
                value: 1
            },
            {
                label: '否',
                value: 0
            },
        ],
        isRedisOptions: [
            {
                label: '是',
                value: 1
            },
            {
                label: '否',
                value: 0
            },
        ],
        isEdit: true,
        isDialogOpen: false,
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          height:'auto',
          calcHeight: 30,
          tip: false,
          innerSearch: true,
          searchShowBtn: false,
          searchShow: false,
          searchMenuSpan: 6,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          dialogClickModal: false,
          labelWidth: 150,
          column: [
            {
              label: "主键",
              prop: "id",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入主键",
                trigger: "blur"
              }]
            },
            {
              label: "创建人名称",
              prop: "createUserName",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入创建人名称",
                trigger: "blur"
              }]
            },
            {
              label: "创建人部门名称",
              prop: "createDeptName",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入创建人部门名称",
                trigger: "blur"
              }]
            },
            {
              label: "更新人名称",
              prop: "updateUserName",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入更新人名称",
                trigger: "blur"
              }]
            },
            {
              label: "更新人部门名称",
              prop: "updateDeptName",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入更新人部门名称",
                trigger: "blur"
              }]
            },
            {
              label: "IP登录失败限制 1是 0否",
              prop: "ipLoginFailedStatus",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入IP登录失败限制 1是 0否",
                trigger: "blur"
              }]
            },
            {
              label: "IP锁定登录的时间 秒",
              prop: "ipLockLoginTime",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入IP锁定登录的时间 秒",
                trigger: "blur"
              }]
            },
            {
              label: "IP锁定登录失败数",
              prop: "ipLockLoginFailedCount",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入IP锁定登录失败数",
                trigger: "blur"
              }]
            },
            {
              label: "最大在线会话量",
              prop: "maxOnlineSession",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入最大在线会话量",
                trigger: "blur"
              }]
            },
            {
              label: "用户登录失败限制 1是 0否",
              prop: "userLoginFailedStatus",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入用户登录失败限制 1是 0否",
                trigger: "blur"
              }]
            },
            {
              label: "用户锁定登录的时间",
              prop: "userLockLoginTime",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入用户锁定登录的时间",
                trigger: "blur"
              }]
            },
            {
              label: "用户锁定登录失败数",
              prop: "userLockLoginFailedCount",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入用户锁定登录失败数",
                trigger: "blur"
              }]
            },
            {
              label: "登录方式 1不限制 2踢出之前的用户 3禁止再次登录",
              prop: "loginWay",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入登录方式 1不限制 2踢出之前的用户 3禁止再次登录",
                trigger: "blur"
              }]
            },
            {
              label: "验证码错误数",
              prop: "captchaFailedCount",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入验证码错误数",
                trigger: "blur"
              }]
            },
            {
              label: "是否开启短信登录验证 1是 0否",
              prop: "isCaptchaFailed",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入是否开启短信登录验证 1是 0否",
                trigger: "blur"
              }]
            },
            {
              label: "是否启用redis 1是 0否",
              prop: "isRedis",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入是否启用redis 1是 0否",
                trigger: "blur"
              }]
            },
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      customSearchOption(){
        let cols = deepClone(this.option.column);
        let searchCols = [];
        for(let col of cols){
          if (col.hasOwnProperty("search") && col.search === true) {
            delete col.rules;
            if (col.hasOwnProperty('searchSpan')) {
              col.span = col.searchSpan;
            }
            col.label = col.hasOwnProperty('searchLabel') ? col.searchLabel : col.label;
            searchCols.push(col);
          }
        }
        return {
          labelWidth: 100,
          submitBtn: false,
          emptyBtn: false,
          menuSpan: 1,
          submitText: '搜索',
          column: searchCols.sort((a, b)=>{return a.searchOrder - b.searchOrder}),
        };
      },
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.authconfig_add, false),
          viewBtn: this.vaildData(this.permission.authconfig_view, false),
          delBtn: this.vaildData(this.permission.authconfig_delete, false),
          editBtn: this.vaildData(this.permission.authconfig_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    created() {
        this.getLastOne()
    },
    methods: {
      rowSave(row, done, loading) {
        add(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowUpdate(row, index, done, loading) {
        update(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        this.isDialogOpen = true;
        done();
      },
      beforeClose(done) {
        this.isDialogOpen = false;
        done();
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.selectClear();
      },
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      refreshChange(form, done) {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}, done = ()=>{}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
          done();
        });
      },
      getLastOne() {
        getLastOne().then(res => {
            if (res.data.code==200) {
                this.form = res.data.data
                this.isEdit = false
            }
        })
      },
      onSubmit() {
        this.isEdit = true
        submit(this.form).then(() => {
          this.isEdit = false
          this.$message({
                type: "success",
                message: "操作成功!"
          });
        }, error => {
          window.console.log(error);
          loading();
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
.el-form {
    padding: 10px 200px 175px 40px;
    ::v-deep .el-form-item__label {
        font-weight: bold;
    }
}
.title {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.title-bg {
    width: 10px;
    background: #409EFF;
}
.el-divider__text.is-left {
    font-size: 20px;
    font-weight: bold;
}
.icon {
    margin-right: 10px;
}
.el-select {
    width: 100%;
}
</style>
