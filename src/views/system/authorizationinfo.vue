<template>
  <basic-container class="flex-container">
    <avue-crud :option="option"
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
                   v-if="permission.authorizationinfo_delete"
                   @click="handleDelete">删 除
                   
        </el-button>
        <div class="header-search el-col-md-18 el-col-sm-24" v-if="option.innerSearch">
          <avue-form ref="cusSearch" :inline="true" v-model="query" :option="customSearchOption" @submit="refreshChange"></avue-form>
        </div>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/system/authorizationinfo";
  import {mapGetters} from "vuex";
  import {deepClone} from "@/util/util";

  export default {
    props: {
        registeredClientId: '',
    },
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
              label: "应用id",
              prop: "registeredClientId",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入刷新令牌所属应用id",
                trigger: "blur"
              }],
              display: false
            },
            {
              label: "用户编码",
              prop: "principalName",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入用户编码",
                trigger: "blur"
              }],
              display: false
            },
            {
              label: "鉴权类型",
              prop: "authorizationGrantType",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入鉴权类型",
                trigger: "blur"
              }],
              display: false
            },
            {
              label: "令牌类型",
              prop: "accessTokenType",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入令牌类型",
                trigger: "blur"
              }],
              display: false
            },
            {
              label: "授权资源",
              prop: "accessTokenScopes",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权资源",
                trigger: "blur"
              }],
              display: false
            },
            {
              label: "授权状态",
              prop: "accessTokenStatus",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权状态",
                trigger: "blur"
              }],
              type: 'radio',
              dataType: 'string',
              dicData: [
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
              ],
              display: false
            },
            {
              label: "授权属性",
              prop: "attributes",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权属性",
                trigger: "blur"
              }],
              display: false
            },
            {
              label: "授权码",
              prop: "authorizationCodeValue",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权码",
                trigger: "blur"
              }],
              display: false
            },
            {
              label: "授权码创建时间",
              prop: "authorizationCodeIssuedAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权码创建时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              display: false
            },
            {
              label: "授权码超期时间",
              prop: "authorizationCodeExpiresAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权码超期时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              display: false
            },
            {
              label: "授权原数据",
              prop: "authorizationCodeMetadata",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权原数据",
                trigger: "blur"
              }],
              display: false
            }
            ,{
              label: "令牌码",
              prop: "accessTokenValue",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入令牌码",
                trigger: "blur"
              }],
              display: false
            },
            {
              label: "令牌码创建时间",
              prop: "accessTokenIssuedAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入令牌码创建时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              display: false
            },
            {
              label: "令牌码过期时间",
              prop: "accessTokenExpiresAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入令牌码过期时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              display: false
            },
            {
              label: "令牌码原数据",
              prop: "accessTokenMetadata",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入令牌码原数据",
                trigger: "blur"
              }],
              display: false
            },
            {
              label: "刷新令牌码",
              prop: "refreshTokenValue",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入刷新令牌码",
                trigger: "blur"
              }],
              display: false
            },
            {
              label: "刷新令牌创建时间",
              prop: "refreshTokenIssuedAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入刷新令牌创建时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              display: false
            },
            {
              label: "刷新令牌过期时间",
              prop: "refreshTokenExpiresAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入刷新令牌过期时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              display: false
            },
            {
              label: "刷新令牌原数据",
              prop: "refreshTokenMetadata",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入刷新令牌原数据",
                trigger: "blur"
              }],
              display: false
            }
          ],
          group: [
          {
            label: '基础信息',
            prop: 'baseInfo',
            icon: 'el-icon-s-order',
            collapse: true,
            column: [
            {
              label: "用户编码",
              prop: "principalName",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入用户编码",
                trigger: "blur"
              }]
            },
            {
              label: "鉴权类型",
              prop: "authorizationGrantType",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入鉴权类型",
                trigger: "blur"
              }]
            },
            {
              label: "令牌类型",
              prop: "accessTokenType",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入令牌类型",
                trigger: "blur"
              }]
            },
            {
              label: "授权资源",
              prop: "accessTokenScopes",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权资源",
                trigger: "blur"
              }]
            },
            {
              label: "授权状态",
              prop: "accessTokenStatus",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权状态",
                trigger: "blur"
              }],
              type: 'radio',
              dataType: 'string',
              dicData: [
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
              ],
            },
            {
              label: "授权属性",
              prop: "attributes",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权属性",
                trigger: "blur"
              }]
            }]
          },
          {
            label: '授权码信息',
            prop: 'baseInfo',
            icon: 'el-icon-s-order',
            collapse: true,
            column: [
            {
              label: "授权码",
              prop: "authorizationCodeValue",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权码",
                trigger: "blur"
              }]
            },
            {
              label: "授权码创建时间",
              prop: "authorizationCodeIssuedAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权码创建时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
            {
              label: "授权码超期时间",
              prop: "authorizationCodeExpiresAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权码超期时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
            {
              label: "授权原数据",
              prop: "authorizationCodeMetadata",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入授权原数据",
                trigger: "blur"
              }]
            }
            ]
          },
          {
            label: '令牌码信息',
            prop: 'baseInfo',
            icon: 'el-icon-s-order',
            collapse: true,
            column: [
            {
              label: "令牌码",
              prop: "accessTokenValue",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入令牌码",
                trigger: "blur"
              }]
            },
            {
              label: "令牌码创建时间",
              prop: "accessTokenIssuedAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入令牌码创建时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
            {
              label: "令牌码过期时间",
              prop: "accessTokenExpiresAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入令牌码过期时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
            {
              label: "令牌码原数据",
              prop: "accessTokenMetadata",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入令牌码原数据",
                trigger: "blur"
              }]
            }]
          },
          {
            label: '刷新令牌信息',
            prop: 'baseInfo',
            icon: 'el-icon-s-order',
            collapse: true,
            column: [
            {
              label: "刷新令牌所属应用id",
              prop: "registeredClientId",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入刷新令牌所属应用id",
                trigger: "blur"
              }]
            },
            {
              label: "刷新令牌码",
              prop: "refreshTokenValue",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入刷新令牌码",
                trigger: "blur"
              }]
            },
            {
              label: "刷新令牌创建时间",
              prop: "refreshTokenIssuedAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入刷新令牌创建时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
            {
              label: "刷新令牌过期时间",
              prop: "refreshTokenExpiresAt",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入刷新令牌过期时间",
                trigger: "blur"
              }],
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
            {
              label: "刷新令牌原数据",
              prop: "refreshTokenMetadata",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入刷新令牌原数据",
                trigger: "blur"
              }]
            }
            ]
          }]
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
          addBtn: this.vaildData(this.permission.authorizationinfo_add, false),
          viewBtn: this.vaildData(this.permission.authorizationinfo_view, false),
          delBtn: this.vaildData(this.permission.authorizationinfo_delete, false),
          editBtn: this.vaildData(this.permission.authorizationinfo_edit, false)
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
    mounted() {
      this.$refs.crud.gridShow = true
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
        this.$refs.crud.toggleSelection();
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
        params.registeredClientId = this.registeredClientId
        console.log("this.registeredClientId",this.registeredClientId)
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
          done();
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
</style>
