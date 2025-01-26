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
                   v-if="permission.loginconfig_delete"
                   @click="handleDelete">删 除
        </el-button>
        <div class="header-search el-col-md-18 el-col-sm-24" v-if="option.innerSearch">
          <avue-form ref="cusSearch" :inline="true" v-model="query" :option="customSearchOption" @submit="refreshChange"></avue-form>
        </div>
      </template>
    </avue-crud> -->
    <div class="title">
        <!-- <span class="title-bg"></span> -->
        <svg t="1737282612113" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13057" id="mx_n_1737282612114" width="35" height="35"><path d="M832 896H298.666667a104.533333 104.533333 0 0 1-106.666667-102.4v-101.973333h53.333333v102.826666A52.48 52.48 0 0 0 298.666667 845.653333h533.333333a52.48 52.48 0 0 0 53.333333-51.2V229.546667a52.48 52.48 0 0 0-53.333333-51.2H298.666667a52.48 52.48 0 0 0-53.333334 51.2v102.826666H192V229.546667A104.533333 104.533333 0 0 1 298.666667 128h533.333333A104.533333 104.533333 0 0 1 938.666667 229.546667v564.906666A104.533333 104.533333 0 0 1 832 896zM601.173333 352a25.6 25.6 0 0 1 0-36.693333 27.733333 27.733333 0 0 1 37.546667 0l184.32 177.066666a30.293333 30.293333 0 0 1 0 39.253334L640 708.693333a27.733333 27.733333 0 0 1-37.546667 0 25.173333 25.173333 0 0 1 0-36.266666l139.946667-134.826667H112.213333a25.6 25.6 0 1 1 0-51.2h628.906667z" fill="#409EFF" p-id="13058"></path></svg>
        <h2>登录配置管理</h2>
    </div>
    <el-tabs type="card" @tab-click="handleClick">
        <el-tab-pane :label="item.dictValue" :value="item.id" v-for="item in loginConfigTypeList" :key="item">
            <el-form ref="form" :model="form" label-width="180px" size="small" :disabled="isEdit">
                <el-form-item label="应用Id：">
                    <el-input v-model="form.clientId"></el-input>
                    <i class="el-icon-info">配置查询用户信息SQL</i>
                </el-form-item>
                <el-form-item label="应用密钥：">
                    <el-input v-model="form.clientSecret"></el-input>
                    <i class="el-icon-info">配置查询用户信息SQL</i>
                </el-form-item>
                <el-form-item label="回调地址：">
                    <el-input v-model="form.webServerRedirectUri"></el-input>
                    <i class="el-icon-info">配置查询用户信息SQL</i>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-select v-model="form.status" placeholder="请选择" >
                        <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号转换：">
                    <el-select v-model="form.isChangeId" placeholder="请选择" >
                        <el-option
                            v-for="item in isChangeIdOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="获取属性：">
                    <el-input v-model="form.allowProperties"></el-input>
                    <i class="el-icon-info">配置客户端允许查询的参数</i>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSubmit(item)" style="width: 100%;" :loading="isEdit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, submit, getLastOne} from "@/api/authManager/loginconfig";
  import {mapGetters} from "vuex";
  import {deepClone} from "@/util/util";
  import {getDictionary} from "@/api/system/dict";
  export default {
    data() {
      return {
        statusOptions: [
            {
                label: '是',
                value: 1
            },
            {
                label: '否',
                value: 0
            }
        ],
        isChangeIdOptions: [
            {
                label: '是',
                value: 1
            },
            {
                label: '否',
                value: 0
            }
        ],
        loginConfigTypeList: [],
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
              label: "应用Id",
              prop: "clientId",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入应用Id",
                trigger: "blur"
              }]
            },
            {
              label: "应用密钥",
              prop: "clientSecret",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入应用密钥",
                trigger: "blur"
              }]
            },
            {
              label: "回调地址",
              prop: "webServerRedirectUri",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入回调地址",
                trigger: "blur"
              }]
            },
            {
              label: "账号转换 1是 0否",
              prop: "isChangeId",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入账号转换 1是 0否",
                trigger: "blur"
              }]
            },
            {
              label: "获取属性",
              prop: "allowProperties",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入获取属性",
                trigger: "blur"
              }]
            },
            {
              label: "类型",
              prop: "allowProperties",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入类型 配置系统字典login_config 1QQ 2微信开放平台 3微信企业号 4浙政钉 5易班",
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
          addBtn: this.vaildData(this.permission.loginconfig_add, false),
          viewBtn: this.vaildData(this.permission.loginconfig_view, false),
          delBtn: this.vaildData(this.permission.loginconfig_delete, false),
          editBtn: this.vaildData(this.permission.loginconfig_edit, false)
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
        this.getDictionary()
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
      getDictionary() {
        var params = {
            code: 'login_config'
        }
        getDictionary(params).then(res => {
            this.loginConfigTypeList = res.data.data
            this.getLastOne(this.loginConfigTypeList[0].id)
        })
      },
      onSubmit(item) {
        this.isEdit = true
        this.form.type = item.id 
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
      },
      handleClick(value) {
        this.form = {}
        this.isEdit = true
        this.getLastOne(value.$attrs.value)
      },
      getLastOne(id) {
        getLastOne({type:id}).then(res => {
            if (res.data.code==200) {
                this.form = res.data.data
                this.isEdit = false
            }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
.el-tabs {
    padding: 10px 0px 0px 40px;
}
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
