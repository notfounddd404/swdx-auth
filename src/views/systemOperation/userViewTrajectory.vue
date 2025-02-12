<template>
  <basic-container class="flex-container">
    <div class="title">
        <!-- <span class="title-bg"></span> -->
        <svg t="1738776615585" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4397" width="40" height="40">
        <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M522.735484 305.052903c73.199484 4.888774 124.729806 12.089806 165.954064 122.021162 41.191226 109.931355 22.395871 279.155613-63.454967 406.494967-37.392516 63.686194-115.745032 63.686194-147.092646 47.995871-31.380645-15.65729-46.938839-102.4-31.380645-141.047742 15.591226-38.713806 1.057032-109.501935-80.202322-167.044129-9.182968-11.230968-9.744516-14.63329-14.633291-24.410838-19.489032-53.677419-14.63329-112.243613 19.522065-161.032259 34.155355-48.821677 82.977032-78.088258 141.543226-82.977032zM293.359484 226.964645a77.09729 77.09729 0 0 1 78.088258 78.088258A77.09729 77.09729 0 0 1 293.359484 383.174194a77.09729 77.09729 0 0 1-78.088258-78.088259 77.09729 77.09729 0 0 1 78.088258-78.088258z m151.287742-63.421935c34.188387 0 58.566194 24.377806 58.566193 58.566193 0 34.155355-24.377806 58.566194-58.566193 58.566194-34.155355 0-58.566194-29.299613-58.566194-58.566194 0-34.188387 24.443871-58.566194 58.566194-58.566193z m165.954064 0a58.566194 58.566194 0 1 1 0 117.132387 58.566194 58.566194 0 0 1 0-117.132387z" p-id="4398"></path>
        <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M522.735484 305.052903c73.199484 4.888774 124.729806 12.089806 165.954064 122.021162 21.504 117.958194-24.774194 221.877677-110.625032 349.184-99.096774 82.580645-146.861419 2.906839-131.303226-35.773936 15.591226-38.680774 1.057032-109.468903-80.202322-167.011097-9.182968-11.230968-9.744516-14.63329-14.633291-24.410838-19.489032-53.677419-14.63329-112.243613 19.522065-161.032259 34.155355-48.821677 82.977032-78.088258 141.543226-82.977032zM293.359484 226.964645a77.09729 77.09729 0 0 1 78.088258 78.088258A77.09729 77.09729 0 0 1 293.359484 383.174194a77.09729 77.09729 0 0 1-78.088258-78.088259 77.09729 77.09729 0 0 1 78.088258-78.088258z m151.287742-63.421935c34.188387 0 58.566194 24.377806 58.566193 58.566193 0 34.155355-24.377806 58.566194-58.566193 58.566194-34.155355 0-58.566194-29.299613-58.566194-58.566194 0-34.188387 24.443871-58.566194 58.566194-58.566193z m165.954064 0a58.566194 58.566194 0 1 1 0 117.132387 58.566194 58.566194 0 0 1 0-117.132387z" opacity=".2" p-id="4399"></path></svg>
        <h2>用户访问轨迹</h2>
    </div>
    <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="按系统使用量分析" name="0">
            <usageComponents v-if="activeName=='0'"></usageComponents>
        </el-tab-pane>
        <el-tab-pane label="按页面停留时间分析" name="1">
            <pageStayComponents v-if="activeName=='1'"></pageStayComponents>
        </el-tab-pane>
        <el-tab-pane label="系统使用轨迹" name="2">
            <useTrajectory v-if="activeName=='2'"></useTrajectory>
        </el-tab-pane>
    </el-tabs>

  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, submit, getLastOne} from "@/api/authManager/identitylibrarymanager";
  import {mapGetters} from "vuex";
  import {deepClone} from "@/util/util";
  import usageComponents from "./userViewTrajectoryComponents/usageComponents";
  import pageStayComponents from "./userViewTrajectoryComponents/pageStayComponents"
  import useTrajectory from "./userViewTrajectoryComponents/useTrajectory"
  export default {
    components: {usageComponents,useTrajectory,pageStayComponents},
    data() {
      return {
        activeName: '',
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
    padding: 10px 0px 50px 0px;
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
