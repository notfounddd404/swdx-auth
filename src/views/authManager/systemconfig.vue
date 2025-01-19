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
                   v-if="permission.systemconfig_delete"
                   @click="handleDelete">删 除
        </el-button>
        <div class="header-search el-col-md-18 el-col-sm-24" v-if="option.innerSearch">
          <avue-form ref="cusSearch" :inline="true" v-model="query" :option="customSearchOption" @submit="refreshChange"></avue-form>
        </div>
      </template>
    </avue-crud> -->
    <div class="title">
        <!-- <span class="title-bg"></span> -->
        <svg t="1737282670559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14036" width="35" height="35"><path d="M512 697.6c102.4 0 182.4-83.2 182.4-185.6 0-102.4-83.2-185.6-182.4-185.6-102.4 0-182.4 83.2-182.4 185.6 0 102.4 83.2 185.6 182.4 185.6z m0-51.2c-73.6 0-134.4-60.8-134.4-134.4 0-73.6 60.8-134.4 134.4-134.4 73.6 0 134.4 60.8 134.4 134.4 0 73.6-60.8 134.4-134.4 134.4zM249.015 843.179c35.2 28.8 73.6 51.2 112 67.2 41.6-38.4 96-60.8 150.4-60.8 57.6 0 108.8 22.4 150.4 60.8 41.6-16 80-38.4 112-67.2-12.8-54.4-3.2-112 22.4-163.2 28.8-48 73.6-86.4 128-102.4 3.2-22.4 6.4-44.8 6.4-67.2 0-22.4-3.2-44.8-6.4-67.2-54.4-16-99.2-54.4-128-102.4-28.8-48-35.2-108.8-22.4-163.2-35.2-28.8-73.6-51.2-112-67.2-41.6 38.4-92.8 60.8-150.4 60.8-54.4 0-108.8-22.4-150.4-60.8-41.6 16-80 38.4-112 67.2 12.8 54.4 3.2 112-22.4 163.2-28.8 48-73.6 86.4-128 102.4-3.2 22.4-6.4 44.8-6.4 67.2 0 22.4 3.2 44.8 6.4 67.2 54.4 16 99.2 54.4 128 102.4 25.6 51.2 35.2 108.8 22.4 163.2m112 115.2c-54.4-19.2-105.6-48-150.4-89.6-6.4-6.4-9.6-16-6.4-22.4 16-48 9.6-99.2-16-140.8-25.6-44.8-64-73.6-112-83.2-9.6-3.2-16-9.6-16-19.2-6.4-28.8-9.6-60.8-9.6-89.6 0-28.8 3.2-57.6 9.6-89.6 3.2-9.6 9.6-16 16-19.2 48-12.8 89.6-41.6 112-83.2 25.6-44.8 28.8-92.8 16-140.8-3.2-9.6 0-19.2 6.4-22.4 44.8-38.4 96-67.2 150.4-89.6 9.6-3.2 16 0 22.4 6.4 35.2 35.2 80 57.6 128 57.6s96-19.2 128-57.6c6.4-6.4 16-9.6 22.4-6.4 54.4 19.2 105.6 48 150.4 89.6 6.4 6.4 9.6 16 6.4 22.4-16 48-9.6 99.2 16 140.8 25.6 44.8 64 73.6 112 83.2 9.6 3.2 16 9.6 16 19.2 6.4 28.8 9.6 60.8 9.6 89.6 0 28.8-3.2 57.6-9.6 89.6-3.2 9.6-9.6 16-16 19.2-48 12.8-89.6 41.6-112 83.2-25.6 44.8-28.8 92.8-16 140.8 3.2 9.6 0 19.2-6.4 22.4-44.8 38.4-96 67.2-150.4 89.6-9.6 3.2-16 0-22.4-6.4-35.2-35.2-80-57.6-128-57.6s-96 19.2-128 57.6c-3.2 3.2-9.6 6.4-16 6.4h-6.4z" fill="#409EFF" p-id="14037"></path></svg>
        <h2>系统设置</h2>
    </div>
    <el-form ref="form" :model="form" label-width="180px" size="small" :disabled="isEdit">
        <el-form-item label="Title：">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Support：">
            <el-input v-model="form.support"></el-input>
        </el-form-item>
        <el-form-item label="Copyright：">
            <el-input v-model="form.copyright"></el-input>
        </el-form-item>
        <el-form-item label="密码找回地址：">
            <el-input v-model="form.passwordRecoverUrl"></el-input>
        </el-form-item>
        <el-form-item label="语言包：">
            <el-input v-model="form.languagePack"></el-input>
        </el-form-item>
        <el-form-item label="找回密码页面文字说明：">
            <el-input v-model="form.passwordRecoverDescribe"></el-input>
        </el-form-item>
        <el-form-item label="认证成功后跳转：">
            <el-input v-model="form.loginRedirectUrl"></el-input>
        </el-form-item>
        <el-form-item label="默认主题：">
            <el-input v-model="form.topic"></el-input>
        </el-form-item>
        <el-form-item label="TGT有效期：">
            <el-input v-model="form.tgtExpire"></el-input>
        </el-form-item>
        <el-form-item label="ST有效期：">
            <el-input v-model="form.stExpire"></el-input>
        </el-form-item>
        <el-form-item label="注销后跳转：">
            <el-input v-model="form.logoutRedirectUrl"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit" style="width: 100%;" :loading="isEdit">确定</el-button>
        </el-form-item>
    </el-form>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, submit, getLastOne } from "@/api/authManager/systemconfig";
  import {mapGetters} from "vuex";
  import {deepClone} from "@/util/util";

  export default {
    data() {
      return {
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
              label: "标题",
              prop: "title",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入标题",
                trigger: "blur"
              }]
            },
            {
              label: "地址",
              prop: "support",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入地址",
                trigger: "blur"
              }]
            },
            {
              label: "版权",
              prop: "copyright",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入版权",
                trigger: "blur"
              }]
            },
            {
              label: "密码找回地址",
              prop: "passwordRecoverUrl",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入密码找回地址",
                trigger: "blur"
              }]
            },
            {
              label: "语言包",
              prop: "languagePack",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入语言包",
                trigger: "blur"
              }]
            },
            {
              label: "找回密码页面文字说明",
              prop: "passwordRecoverDescribe",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入找回密码页面文字说明",
                trigger: "blur"
              }]
            },
            {
              label: "认证成功后跳转",
              prop: "loginRedirectUrl",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入认证成功后跳转",
                trigger: "blur"
              }]
            },
            {
              label: "默认主题",
              prop: "topic",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入默认主题",
                trigger: "blur"
              }]
            },
            {
              label: "TGT有效期",
              prop: "tgtExpire",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入TGT有效期",
                trigger: "blur"
              }]
            },
            {
              label: "ST有效期",
              prop: "stExpire",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入ST有效期",
                trigger: "blur"
              }]
            },
            {
              label: "注销后跳转",
              prop: "logoutRedirectUrl",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入注销后跳转",
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
          addBtn: this.vaildData(this.permission.systemconfig_add, false),
          viewBtn: this.vaildData(this.permission.systemconfig_view, false),
          delBtn: this.vaildData(this.permission.systemconfig_delete, false),
          editBtn: this.vaildData(this.permission.systemconfig_edit, false)
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
        this.loading = false;
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
    padding: 10px 200px 20px 40px;
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
.el-icon-setting {
    margin-right: 10px;
    font-size: 30px;
}
.icon {
    margin-right: 10px;
}
</style>
