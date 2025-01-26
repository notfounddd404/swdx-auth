<template>
  <basic-container class="flex-container">
    <div class="title">
        <!-- <span class="title-bg"></span> -->
        <svg t="1737918815623" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4224" width="35" height="35">
            <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M512 12.8C236.7488 12.8 12.8 236.7488 12.8 512s223.9488 499.2 499.2 499.2a496.384 496.384 0 0 0 448.3072-279.296 38.4 38.4 0 0 0-68.9664-33.8944A420.0448 420.0448 0 0 1 512 934.4c-232.9088 0-422.4-189.4912-422.4-422.4S279.0912 89.6 512 89.6s422.4 189.4912 422.4 422.4a38.4 38.4 0 0 0 76.8 0c0-275.2512-223.9488-499.2-499.2-499.2z" p-id="4225"></path>
            <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M766.976 503.3984m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"  p-id="4226"></path>
            <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M511.9488 145.0496a38.4 38.4 0 0 0-38.4 38.4v328.4992c0 21.1968 17.2032 38.4 38.4 38.4h117.4016a38.4 38.4 0 0 0 0-76.8h-79.0016V183.4496a38.4 38.4 0 0 0-38.4-38.4z"  p-id="4227"></path>
        </svg>
        <h2>时间维度分析</h2>
    </div>
    <el-tabs type="card" v-model="tabName">
        <el-tab-pane label="年访问量分析" name="0">
            <yearView v-if="tabName=='0'"></yearView>
        </el-tab-pane>
        <el-tab-pane label="月访问量分析" name="1">
            <monthView v-if="tabName=='1'"></monthView>
        </el-tab-pane>
        <el-tab-pane label="日访问量分析" name="2">
            <dayView v-if="tabName=='2'"></dayView>
        </el-tab-pane>
        <el-tab-pane label="时访问量分析" name="3">
            <timeView v-if="tabName=='3'"></timeView>
        </el-tab-pane>
    </el-tabs>

  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, submit, getLastOne} from "@/api/authManager/identitylibrarymanager";
  import {mapGetters} from "vuex";
  import {deepClone} from "@/util/util";
  import yearView from "./timeComponents/yearView"
  import monthView from "./timeComponents/monthView"
  import dayView from "./timeComponents/dayView"
  import timeView from "./timeComponents/timeView"
  export default {
    components: {yearView,monthView,dayView,timeView},
    data() {
      return {
        tabName: '0',
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
/* 外层圆环动画 */
.circle {
    stroke-dasharray: 1000; /* 路径总长度 */
    stroke-dashoffset: 1000; /* 初始偏移量 */
    animation: draw-circle 1s ease-in-out forwards; /* 只播放一次 */
} 

/* 关键帧：绘制圆环 */
@keyframes draw-circle {
    0% {
        stroke-dashoffset: 1000; /* 初始状态：完全隐藏 */
    }
    100% {
        stroke-dashoffset: 0; /* 结束状态：完全显示 */
    }
}

/* 颜色填充动画 */
@keyframes fill-color {
    0% {
        fill: transparent; /* 初始状态：无填充 */
    }
    100% {
        fill: #108cee; /* 结束状态：填充颜色 */
    }
}

/* 在描边完成后触发填充动画 */
.circle {
    animation-fill-mode: forwards; /* 保持最终状态 */
}

.circle {
    animation: draw-circle 1s ease-in-out forwards, fill-color 0.5s ease-in-out 1s forwards;
}
</style>
