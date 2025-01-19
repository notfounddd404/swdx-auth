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
                   v-if="permission.logintopicmanager_delete"
                   @click="handleDelete">删 除
        </el-button>
        <div class="header-search el-col-md-18 el-col-sm-24" v-if="option.innerSearch">
          <avue-form ref="cusSearch" :inline="true" v-model="query" :option="customSearchOption" @submit="refreshChange"></avue-form>
        </div>
      </template>
    </avue-crud> -->
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: #fff;">
            <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>导航一</template>
                <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                </el-submenu>
            </el-submenu>
            </el-menu>
        </el-aside>
        
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>

            <el-main>
                <el-tabs type="card">
                    <el-tab-pane label="数据库认证">
                        <el-form ref="form" :model="form" label-width="180px" size="small" :disabled="isEdit">
                            <el-form-item label="认证的SQL：">
                                <el-input v-model="form.authSql"></el-input>
                                <i class="el-icon-info">配置查询用户信息SQL</i>
                            </el-form-item>
                            <el-form-item label="密码类型：">
                                <el-select v-model="form.passwdType" placeholder="请选择" >
                                    <el-option
                                        v-for="item in passwdTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="取属性SQL：">
                                <el-input v-model="form.attrSql"></el-input>
                                <i class="el-icon-info">配置客户端允许查询的参数</i>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" size="small" @click="onSubmit" style="width: 100%;" :loading="isEdit">确定</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="LADP认证">
                        <el-form ref="form" :model="form" label-width="180px" size="small" :disabled="isEdit">
                            <el-form-item label="服务器地址：">
                                <el-input v-model="form.ldapUrl"></el-input>
                                <i class="el-icon-info">服务器地址最后请以“/”结尾！</i>
                            </el-form-item>
                            <el-form-item label="Ldap Key：">
                                <el-input v-model="form.ldapKey"></el-input>
                            </el-form-item>
                            <el-form-item label="Ldap Base：">
                                <el-input v-model="form.ldapBase"></el-input>
                                <i class="el-icon-info">如果需要检索多级目录请用“;”隔开！</i>
                            </el-form-item>
                            <el-form-item label="取属性SQL：">
                                <el-input v-model="form.attrSql"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" size="small" @click="onSubmit" style="width: 100%;" :loading="isEdit">确定</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </el-container>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/authManager/logintopicmanager";
  import {mapGetters} from "vuex";
  import {deepClone} from "@/util/util";

  export default {
    data() {
      return {
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
              label: "主题标题",
              prop: "title",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入主题标题",
                trigger: "blur"
              }]
            },
            {
              label: "主题描述",
              prop: "describe",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入主题描述",
                trigger: "blur"
              }]
            },
            {
              label: "主题页面",
              prop: "page",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入主题页面",
                trigger: "blur"
              }]
            },
            {
              label: "主题图片",
              prop: "image",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入主题图片",
                trigger: "blur"
              }]
            },
            {
              label: "是否强制显示",
              prop: "isShow",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入是否强制显示",
                trigger: "blur"
              }]
            },
            {
              label: "排序",
              prop: "sort",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入排序",
                trigger: "blur"
              }]
            },
            {
              label: "应用id",
              prop: "clientId",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入应用id",
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
          addBtn: this.vaildData(this.permission.logintopicmanager_add, false),
          viewBtn: this.vaildData(this.permission.logintopicmanager_view, false),
          delBtn: this.vaildData(this.permission.logintopicmanager_delete, false),
          editBtn: this.vaildData(this.permission.logintopicmanager_edit, false)
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
      }
    }
  };
</script>

<style lang="scss" scoped>
.el-header {
    // background-image: linear-gradient(120deg, #54b6d0 16%, #3f8bdb, #3f8bdb);
    background-color: #fff;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
// ::v-deep .el-submenu__title {
//     color: #fff;
// }
// ::v-deep .el-menu-item {
//     color: #fff;
// }
::v-deep .el-card {
    padding: 0px 0px 220px 0px;
}

.el-tabs {
    padding: 0px 20px 0px 20px;
}
</style>
