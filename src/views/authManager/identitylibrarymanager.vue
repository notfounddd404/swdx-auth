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
                   v-if="permission.identitylibrarymanager_delete"
                   @click="handleDelete">删 除
        </el-button>
        <div class="header-search el-col-md-18 el-col-sm-24" v-if="option.innerSearch">
          <avue-form ref="cusSearch" :inline="true" v-model="query" :option="customSearchOption" @submit="refreshChange"></avue-form>
        </div>
      </template>
    </avue-crud> -->
    <div class="title">
        <!-- <span class="title-bg"></span> -->
        <svg t="1737279825970" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11933" id="mx_n_1737279825971" width="35" height="35"><path d="M622.353067 505.736533a385.672533 385.672533 0 0 1 124.027733 61.6448 24.9088 24.9088 0 0 1 11.502933 20.996267c0 13.781333-11.204267 24.9472-25.028266 24.9472a24.977067 24.977067 0 0 1-16.3712-6.08l-0.072534 0.085333c-53.9776-41.2416-119.031467-67.5072-187.042133-70.7712a224.554667 224.554667 0 0 1-36.949333 0.520534c-170.257067 13.013333-320.341333 170.858667-320.341334 342.6304 0 17.194667-4.514133 29.090133-21.7088 29.090133-17.198933 0-22.912-11.895467-22.912-29.090133 0-173.064533 113.966933-320.938667 270.818134-370.944C331.144533 470.621867 285.866667 398.464 285.866667 315.733333c0-122.5344 99.328-221.866667 221.866666-221.866666 122.5344 0 221.866667 99.332267 221.866667 221.866666 0 80.5888-42.9696 151.146667-107.246933 190.0032z m-23.808 282.432c-14.877867 0-26.939733-12.155733-26.939734-27.1488 0-14.997333 12.061867-27.153067 26.944-27.153066 14.882133 0 26.944 12.16 26.944 27.153066s-12.061867 27.1488-26.944 27.1488zM692.053333 733.866667h185.6c19.5584 0 31.146667 12.16 31.146667 27.153066s-11.588267 27.1488-31.146667 27.1488h-185.6c-19.5584 0-31.146667-12.155733-31.146666-27.1488 0-14.997333 11.588267-27.153067 31.146666-27.153066z m-93.44 179.2c-14.848 0-26.88-12.125867-26.88-27.0848s12.032-27.089067 26.88-27.089067 26.88 12.130133 26.88 27.089067c0 14.958933-12.032 27.0848-26.88 27.0848z m93.44-54.301867h185.6c19.5584 0 31.146667 12.155733 31.146667 27.1488 0 14.997333-11.588267 27.153067-31.146667 27.153067h-185.6c-19.5584 0-31.146667-12.16-31.146666-27.153067s11.588267-27.1488 31.146666-27.1488zM507.733333 490.666667c96.6016 0 174.933333-78.3232 174.933334-174.933334s-78.331733-174.933333-174.933334-174.933333c-96.622933 0-174.933333 78.3232-174.933333 174.933333s78.3104 174.933333 174.933333 174.933334z" fill="#409EFF" p-id="11934"></path></svg>
        <h2>身份库管理</h2>
    </div>
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
        <el-tab-pane label="AD认证">
            <el-form ref="form" :model="form" label-width="180px" size="small" :disabled="isEdit">
                <el-form-item label="服务器地址：">
                    <el-input v-model="form.adUrl"></el-input>
                </el-form-item>
                <el-form-item label="DOMAIN：">
                    <el-input v-model="form.adDomain"></el-input>
                </el-form-item>
                <el-form-item label="取属性SQL：">
                    <el-input v-model="form.attrSql"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSubmit" style="width: 100%;" :loading="isEdit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="协议认证">
            <el-form ref="form" :model="form" label-width="180px" size="small" :disabled="isEdit">
                <el-form-item label="超时时间：">
                    <el-input v-model="form.protocolTime"></el-input>
                </el-form-item>
                <el-form-item label="盐值：">
                    <el-input v-model="form.protocolSalt"></el-input>
                </el-form-item>
                <el-form-item label="起始位置：">
                    <el-input v-model="form.protocolStart"></el-input>
                </el-form-item>
                <el-form-item label="结束位置：">
                    <el-input v-model="form.protocolEnd"></el-input>
                </el-form-item>
                <el-form-item label="验证用户SQL：">
                    <el-input v-model="form.protocolUserSql"></el-input>
                </el-form-item>
                <el-form-item label="取属性SQL：">
                    <el-input v-model="form.protocolAttrSql"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSubmit" style="width: 100%;" :loading="isEdit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="认证源设置">
            <el-form ref="form" :model="form" label-width="180px" size="small" :disabled="isEdit">
                <el-form-item >
                    <div style="margin-top: 20px">
                        <el-radio-group v-model="form.authType" size="small">
                            <el-radio :label="1">数据库认证</el-radio>
                            <el-radio :label="2">Ldap认证</el-radio>
                            <el-radio :label="3">Ad认证</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSubmit" style="width: 100%;" :loading="isEdit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>

  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, submit, getLastOne} from "@/api/authManager/identitylibrarymanager";
  import {mapGetters} from "vuex";
  import {deepClone} from "@/util/util";

  export default {
    data() {
      return {
        passwdTypeOptions: [
            {
                label: 'MD5',
                value: 1
            },
            {
                label: 'Encipher',
                value: 2
            },
            {
                label: 'SHA1',
                value: 3
            },
            {
                label: 'MD5(TPASS)',
                value: 4
            },
            {
                label: 'SHA2(salt)',
                value: 5
            },
            {
                label: 'SM3',
                value: 6
            }
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
              label: "数据库认证 认证的SQL",
              prop: "authSql",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入数据库认证 认证的SQL",
                trigger: "blur"
              }]
            },
            {
              label: "数据库认证 密码类型",
              prop: "passwdType",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入数据库认证 密码类型",
                trigger: "blur"
              }]
            },
            {
              label: "数据库认证 取属性SQL",
              prop: "protocolUserSql",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入数据库认证 取属性SQL",
                trigger: "blur"
              }]
            },
            {
              label: "LDAP认证 服务器地址",
              prop: "ldapUrl",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入LDAP认证 服务器地址",
                trigger: "blur"
              }]
            },
            {
              label: "LDAP认证 Ldap Key",
              prop: "ldapKey",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入LDAP认证 Ldap Key",
                trigger: "blur"
              }]
            },
            {
              label: "LDAP认证 Ldap Base",
              prop: "ldapBase",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入LDAP认证 Ldap Base",
                trigger: "blur"
              }]
            },
            {
              label: "AD认证 服务器地址",
              prop: "adUrl",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入AD认证 服务器地址",
                trigger: "blur"
              }]
            },
            {
              label: "AD认证 DOMAIN域名",
              prop: "adDomain",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入AD认证 DOMAIN域名",
                trigger: "blur"
              }]
            },
            {
              label: "LDAP认证 AD认证 取属性SQL",
              prop: "attrSql",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入LDAP认证 AD认证 取属性SQL",
                trigger: "blur"
              }]
            },
            {
              label: "协议认证 盐值",
              prop: "protocolSalt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入协议认证 盐值",
                trigger: "blur"
              }]
            },
            {
              label: "协议认证 超时时间",
              prop: "protocolTime",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入协议认证 超时时间",
                trigger: "blur"
              }]
            },
            {
              label: "协议认证 起始位置",
              prop: "protocolStart",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入协议认证 起始位置",
                trigger: "blur"
              }]
            },
            {
              label: "协议认证 结束位置",
              prop: "protocolEnd",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入协议认证 结束位置",
                trigger: "blur"
              }]
            },
            {
              label: "协议认证 取属性SQL",
              prop: "protocolAttrSql",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入协议认证 取属性SQL",
                trigger: "blur"
              }]
            },
            {
              label: "认证源设置 1数据库认证 2LADP认证 3AD认证",
              prop: "authType",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入认证源设置 1数据库认证 2LADP认证 3AD认证",
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
          addBtn: this.vaildData(this.permission.identitylibrarymanager_add, false),
          viewBtn: this.vaildData(this.permission.identitylibrarymanager_view, false),
          delBtn: this.vaildData(this.permission.identitylibrarymanager_delete, false),
          editBtn: this.vaildData(this.permission.identitylibrarymanager_edit, false)
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
.el-tabs {
    padding: 10px 0px 350px 40px;
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
