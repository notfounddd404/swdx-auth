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
        <!-- <div class="header-search el-col-md-18 el-col-sm-24" v-if="option.innerSearch">
          <avue-form ref="cusSearch" :inline="true" v-model="query" :option="customSearchOption" @submit="refreshChange"></avue-form>
        </div> -->
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/system/clientapply";
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
          height:'300',
          calcHeight: 30,
          tip: false,
          innerSearch: true,
          searchShowBtn: true,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          menu: false,
          addBtn: false,
          viewBtn: true,
          selection: true,
          dialogClickModal: false,
          labelWidth: 150,
          column: [
            {
              label: "用户账号",
              prop: "account",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入用户账号",
                trigger: "blur"
              }],
              search: true
            },
            {
              label: "姓名",
              prop: "time",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入时间",
                trigger: "blur"
              }],
              search: true,
              hide: true
            },
            {
              label: "用户设备",
              prop: "用户设备",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入用户设备",
                trigger: "blur"
              }],
              search: true
            },
            {
              label: "浏览器",
              prop: "浏览器",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入浏览器",
                trigger: "blur"
              }],
              search: true
            },
            {
              label: "浏览器版本",
              prop: "浏览器版本",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入浏览器版本",
                trigger: "blur"
              }],
              search: true
            },
            {
              label: "操作系统",
              prop: "操作系统",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入操作系统",
                trigger: "blur"
              }],
              search: true
            },
            {
              label: "应用系统",
              prop: "应用系统",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入时间",
                trigger: "blur"
              }],
              search: true,
              hide: true
            },
            {
              label: "开始时间",
              prop: "开始时间",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入开始时间",
                trigger: "blur"
              }],
              search: true,
              hide: true
            },
            {
              label: "结束时间",
              prop: "结束时间",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入结束时间",
                trigger: "blur"
              }],
              search: true,
              hide: true
            },
            {
              label: "停留阈值",
              prop: "停留阈值",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入停留阈值（开始）",
                trigger: "blur"
              }],
              search: true,
              hide: true
            },
            {
              label: "停留阈值",
              prop: "停留阈值",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入停留阈值（结束）",
                trigger: "blur"
              }],
              search: true,
              hide: true
            }
          ]
        },
        data: [
            []
        ]
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
          addBtn: this.vaildData(this.permission.clientapply_add, false),
          viewBtn: this.vaildData(this.permission.clientapply_view, false),
          delBtn: this.vaildData(this.permission.clientapply_delete, false),
          editBtn: this.vaildData(this.permission.clientapply_edit, false)
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
</style>
