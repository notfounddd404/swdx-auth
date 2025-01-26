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
    <el-container style="border: 1px solid #eee">
        <el-aside width="200px" style="background-color: #fff;">
            <el-menu
                default-active="0"
                class="el-menu-vertical-demo">
                <el-menu-item :index="index" v-for="(item,index) in data" :key="item" @click="menuClick(item)">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-divider direction="vertical"></el-divider>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <div>
                    <el-button-group >
                        <el-button type="primary" icon="el-icon-s-promotion" size="medium" plain @click="addTopic">添加主题</el-button>
                        <el-button type="primary" icon="el-icon-edit" size="medium" plain @click="editTopic">修改</el-button>
                        <el-button type="primary" icon="el-icon-close" size="medium" plain @click="delTopic">删除</el-button>
                    </el-button-group>
                </div>
            </el-header>

            <el-main>
                <el-tabs type="card" v-model="activeName" @tab-click="tabsHandleClick">
                    <el-tab-pane label="登录主题信息" name="0">
                        <el-form v-if="!addTopicVisible" ref="form" :model="form" label-width="500px" size="small" :disabled="isEdit">
                            <el-form-item label="主题名称：">
                                <el-input v-if="updateTopicVisible" v-model="form.title"></el-input>
                                <span v-else>{{form.title}}</span>
                            </el-form-item>
                            <el-form-item label="主题描述：">
                                <el-input v-if="updateTopicVisible" v-model="form.description"></el-input>
                                <span v-else>{{form.description}}</span>
                            </el-form-item>
                            <el-form-item label="是否启用：">
                                <el-input v-if="updateTopicVisible" v-model="form.status"></el-input>
                                <span v-else>{{form.status}}</span>
                            </el-form-item>
                            <el-form-item label="主题页面：">
                                <el-input v-if="updateTopicVisible" v-model="form.page"></el-input>
                                <span v-else>{{form.page}}</span>
                            </el-form-item>
                            <el-form-item label="主题图片：">
                                <el-upload
                                    :headers="{
                                        'Blade-Auth': token,
                                        'version': 'yzb',
                                        'Authorization': auth,
                                        'Blade-Requested-With': 'BladeHttpRequest'
                                    }"
                                    action="/api/blade-resource/oss/endpoint/put-file"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="是否强制显示：">
                                <el-select v-if="updateTopicVisible" v-model="form.isShow" placeholder="请选择" >
                                    <el-option
                                        v-for="item in isShowOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <div v-else>
                                    <span v-if="form.isShow==1">是</span>
                                    <span v-if="form.isShow==0">否</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="排序：">
                                <el-input v-if="updateTopicVisible" v-model="form.sort"></el-input>
                                <span v-else>{{form.sort}}</span>
                            </el-form-item>
                            <el-form-item v-if="updateTopicVisible">
                                <el-button type="primary" size="small" @click="updateTopic" style="width: 30%;" :loading="isEdit">确定</el-button>
                            </el-form-item>
                            <el-form-item v-if="updateTopicVisible">
                                <el-button size="small" @click="updateTopicVisible = false" style="width: 30%;" :loading="isEdit">取消</el-button>
                            </el-form-item>
                        </el-form>

                        <!-- 新增主题 -->
                        <el-form v-if="addTopicVisible" ref="form" :model="addform" label-width="500px" size="small" :disabled="isEdit">
                            <el-form-item label="主题名称：">
                                <el-input v-model="addform.title"></el-input>
                            </el-form-item>
                            <el-form-item label="主题描述：">
                                <el-input v-model="addform.description"></el-input>
                            </el-form-item>
                            <el-form-item label="是否启用：">
                                <el-input v-model="addform.status"></el-input>
                            </el-form-item>
                            <el-form-item label="主题页面：">
                                <el-input v-model="addform.page"></el-input>
                            </el-form-item>
                            <el-form-item label="主题图片：">
                                <el-upload
                                    :headers="{
                                        'Blade-Auth': token,
                                        'version': 'yzb',
                                        'Authorization': auth,
                                        'Blade-Requested-With': 'BladeHttpRequest'
                                    }"
                                    action="/api/blade-resource/oss/endpoint/put-file"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="是否强制显示：">
                                <el-select v-model="addform.isShow" placeholder="请选择" >
                                    <el-option
                                        v-for="item in isShowOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="排序：">
                                <el-input v-model="addform.sort"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" size="small" @click="saveTopic" style="width: 30%;" :loading="isEdit">确定</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" @click="addTopicVisible = false" style="width: 30%;" :loading="isEdit">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="应用主题系统" name="1">
                        <apply-topic-system :loginTopicId="loginTopicId" :loginTopicTitle="loginTopicTitle"></apply-topic-system>
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
  import { getToken } from "@/util/auth";
  import {Base64} from 'js-base64';
  import website from '@/config/website';
  import applyTopicSystem from './components/applyTopicSystem.vue';
  export default {
    components: {applyTopicSystem},
    data() {
      return {
        loginTopicTitle: '',
        loginTopicId: '',
        activeName: '0',
        isShowOptions: [
            {
                label: '是',
                value: 1
            },
            {
                label: '否',
                value: 0
            }
        ],
        addform: {},
        isEdit: false,
        updateTopicVisible: false,
        addTopicVisible: false,
        token: this.getheader(),
        auth: this.getAuthorization(),
        dialogImageUrl: '',
        dialogVisible: false,
        isCollapse: true,
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
              prop: "description",
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
    created() {
        this.onLoad(this.page, this.query);
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
          if (this.data.length>0) {
            this.getDetail(this.data[0].id)
            this.loginTopicId = this.data[0].id
            this.loginTopicTitle = this.data[0].title
          }
          this.loading = false;
          this.selectionClear();
          done();
        });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      menuClick(item) {
        console.log("menuClickmenuClick",item)
        this.getDetail(item.id)
        this.loginTopicId = item.id
        this.loginTopicTitle = item.title
      },
      getDetail(id) {
        getDetail(id).then(res => {
            this.form = res.data.data;
        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getheader() {
        let token = getToken();
        console.log("tokentoken",token)
        return "bearer " + token;
      },
      getAuthorization() {
        let auth = Base64.encode(website.clientId+':'+website.clientSecret)
        return "Basic " + auth;
      },
      addTopic() {
        this.activeName = '0'
        this.addTopicVisible = true
        this.updateTopicVisible = false
      },
      editTopic() {
        this.activeName = '0'
        this.updateTopicVisible = true
        this.addTopicVisible = false
      },
      delTopic() {
        this.activeName = '0'
        this.addTopicVisible = false
        this.updateTopicVisible = false
        this.$confirm(`确定将【${this.form.title}】主题删除?`, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.form.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      saveTopic() {
        this.isEdit = true
        add(this.addform).then(() => {
          this.isEdit = false
          this.addTopicVisible = false
          this.onLoad(this.page, this.query);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          this.isEdit = false
          window.console.log(error);
        });
      },
      updateTopic() {
        this.isEdit = true
        update(this.form).then(() => {
          this.isEdit = false
          this.updateTopicVisible = false
          this.onLoad(this.page, this.query);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          this.isEdit = false
          window.console.log(error);
        });
      },
      tabsHandleClick(tab, event) {

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
.el-card {
    padding: 0px 0px 220px 0px;
}

.el-tabs {
    padding: 0px 20px 0px 20px;
}
.el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: auto;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
::v-deep .el-container {
    height: auto;
}
.el-form-item__content {
    display: flex;
}
</style>
