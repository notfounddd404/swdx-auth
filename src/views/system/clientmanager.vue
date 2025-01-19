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
        <el-button size="small"
                   type="primary"
                   icon="el-icon-plus"
                   @click="clientApplySubmit">添加应用
        </el-button>
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.clientapply_delete"
                   @click="handleDelete">删 除
        </el-button>
        <el-button size="small"
                   icon="el-icon-success"
                   plain
                   @click="batchPass">批量通过
        </el-button>
        <el-button size="small"
                   icon="el-icon-error"
                   plain
                   @click="batchCancel">批量撤销
        </el-button>
        <!-- <div class="header-search el-col-md-18 el-col-sm-24" v-if="option.innerSearch">
          <avue-form ref="cusSearch" :inline="true" v-model="query" :option="customSearchOption" @submit="refreshChange"></avue-form>
        </div> -->
      </template>
      <template slot-scope="{row}" slot="status">
        <el-tag v-if="row.status==0" type="danger" size="mini">撤销</el-tag>
        <el-tag v-if="row.status==1" type="success" size="mini">已通过</el-tag>
        <el-tag v-if="row.status==2" type="warning" size="mini">待审批</el-tag>
        <el-tag v-if="row.status==3" type="warning" size="mini">取消申请</el-tag>
      </template>
      <template slot-scope="{row}" slot="clientName">
        <el-link type="primary">{{row.clientName}}</el-link>
      </template>
    </avue-crud>
      <el-dialog
        title="应用申请"
        :visible.sync="applyDialogVisible"
        width="80%"
        modal-append-to-body
        append-to-body
        destroy-on-close
        close-on-click-modal="false"
        :before-close="handleClose">

        <div style="display: flex">
            <el-main>
                <div class="process">
                    <el-steps :active="active" finish-status="success" align-center>
                        <template v-for="(step, index) in process" >
                            <el-step
                                :key="index"
                                :title="step.title"
                                :description="step.description"
                            >
                            </el-step>
                        </template>
                    </el-steps>

                    <el-form label-position="right" label-width="160px" :model="form" ref="ruleForm" :rules="formRules">
                        <div v-if="active==0 || active==2">
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="接入应用申请人：" prop="createUserName">
                                        <el-input :disabled="active==2" clearable v-model="form.createUserName"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="建设厂商：" prop="clientManufacturerName">
                                        <el-input :disabled="active==2" clearable v-model="form.clientManufacturerName"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="应用负责人：" prop="clientDirector">
                                        <el-input :disabled="active==2" clearable v-model="form.clientDirector"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="厂商联系人：" prop="clientManufacturerUser">
                                        <el-input :disabled="active==2" clearable v-model="form.clientManufacturerUser"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="应用负责人联系方式：" prop="clientDirectorPhone">
                                        <el-input :disabled="active==2" clearable v-model="form.clientDirectorPhone"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="厂商联系方式：" prop="clientManufacturerPhone">
                                        <el-input :disabled="active==2" clearable v-model="form.clientManufacturerPhone"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="使用对象：" prop="clientUser">
                                        <el-input :disabled="active==2"  clearable type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.clientUser"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>

                        <div v-if="active==1 || active==2">
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="应用名：" prop="clientName">
                                        <el-input :disabled="active==2" clearable v-model="form.clientName"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="是否启用：" prop="clientUseStatus">
                                            <el-select :disabled="active==2" v-model="form.clientUseStatus" placeholder="请选择">
                                                <el-option
                                                    v-for="item in options"
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
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="注册地址：" prop="clientRegisterPlace">
                                        <el-input :disabled="active==2" clearable v-model="form.clientRegisterPlace"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="登录主题：" prop="loginTopic">
                                        <el-input :disabled="active==2" clearable v-model="form.loginTopic"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="访问地址：" prop="clientViewPlace">
                                        <el-input :disabled="active==2" clearable v-model="form.clientViewPlace"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="图标颜色：" prop="iconColor">
                                        <el-input :disabled="active==2" clearable v-model="form.iconColor"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="用户主属性：" prop="clientUserMainAttribute">
                                        <el-input :disabled="active==2" clearable v-model="form.clientUserMainAttribute"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="开启权限过滤：" prop="isAuthFilter">
                                            <el-select :disabled="active==2" v-model="form.isAuthFilter" placeholder="请选择">
                                                <el-option
                                                    v-for="item in options"
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
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="应用排序：" prop="clientSort">
                                        <el-input :disabled="active==2" clearable v-model="form.clientSort"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="是否允许单点登录：" prop="isOauth">
                                            <el-select :disabled="active==2" v-model="form.isOauth" placeholder="请选择">
                                                <el-option
                                                    v-for="item in options"
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
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="应用图标：" prop="clientIconUrl">
                                        <el-input :disabled="active==2" clearable v-model="form.clientIconUrl"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="忽略属性过滤：" prop="ignoreAttributeFilter">
                                            <el-select :disabled="active==2" v-model="form.ignoreAttributeFilter" placeholder="请选择">
                                                <el-option
                                                    v-for="item in options"
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
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="是否在首页展示：" prop="clientShowHome">
                                            <el-select :disabled="active==2" v-model="form.clientShowHome" placeholder="请选择">
                                                <el-option
                                                    v-for="item in clientShowHomeOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="开发语言：" prop="developmentLanguage">
                                        <el-input :disabled="active==2" clearable v-model="form.developmentLanguage"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="账号非一致登录：" prop="clientAccountInconsistentLogin">
                                            <el-select :disabled="active==2" v-model="form.clientAccountInconsistentLogin" placeholder="请选择">
                                                <el-option
                                                    v-for="item in clientAccountInconsistentLoginOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="原登录页地址：" prop="originalLoginUrl">
                                        <el-input :disabled="active==2" clearable v-model="form.originalLoginUrl"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="应用描述：" prop="clientDescribe">
                                        <el-input :disabled="active==2" clearable v-model="form.clientDescribe"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="开放的属性：" prop="openAttribute">
                                        <el-input :disabled="active==2" clearable v-model="form.openAttribute"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-form>

                </div>
            </el-main>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelClientApply">取 消</el-button>
            <el-button v-if="active<2" style="margin-top: 12px;" @click="next" type="primary">下一步</el-button>
            <el-button v-if="active==2" style="margin-top: 12px;" @click="clientApplySave" type="success">提交申请</el-button>
        </span>
      </el-dialog>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, batchPass, batchCancel} from "@/api/system/clientapply";
  import {mapGetters} from "vuex";
  import {deepClone} from "@/util/util";

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (this.active<2) {
            if (!this.validObj(this.form[rule.field])) {
                callback(new Error(rule.field.message));
            }
            callback();
        }
      };
      return {
        options: [
            {
                value: '1',
                label: '是'
            },
            {
                value: '0',
                label: '否'
            }
        ],
        clientShowHomeOptions: [
            {
                value: '1',
                label: '展示'
            },
            {
                value: '0',
                label: '不展示'
            }
        ],
        clientAccountInconsistentLoginOptions: [
            {
                value: '1',
                label: '使用'
            },
            {
                value: '0',
                label: '不适用'
            }
        ],
        active: 0,
        formRules: {
            createUserName: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientName: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientDescribe: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientId: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientDirector: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientDirectorPhone: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientUser: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientManufacturerName: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientManufacturerUser: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientManufacturerPhone: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientRegisterPlace: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientViewPlace: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientUserMainAttribute: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientSort: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientIcon_url: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientShow_home: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientAccountInconsistentLogin: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientUseStatus: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            loginTopic: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            iconColor: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            isAuthFilter: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            isOauth: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            ignoreAttributeFilter: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            developmentLanguage: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            originalLoginUrl: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            openAttribute: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientIconUrl: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
            clientShowHome: [{  validator: validatePass, required: true, message: '必填项不能为空', trigger: 'change' }],
        },
        process: [
            {
                title: '第1步',
                description: '注册用户信息设置'
            },
            {
                title: '第2步',
                description: '注册应用信息设置'
            },
            {
                title: '第3步',
                description: '注册信息确认'
            }
        ],
        applyDialogVisible: false,
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
          searchShowBtn: true,
          searchShow: true,
          searchMenuSpan: 12,
          border: true,
          index: true,
          addBtn: false,
          editBtn: false,
          viewBtn: true,
          selection: true,
          dialogClickModal: false,
          labelWidth: 150,
          column: [
            // {
            //   label: "主键",
            //   prop: "id",
            //   overHidden: true,
            //   hide: true,
            //   rules: [{
            //     required: true,
            //     message: "请输入主键",
            //     trigger: "blur"
            //   }]
            // },
            // {
            //   label: "创建人部门名称",
            //   prop: "createDeptName",
            //   overHidden: true,
            //   rules: [{
            //     required: true,
            //     message: "请输入创建人部门名称",
            //     trigger: "blur"
            //   }]
            // },
            // {
            //   label: "更新人名称",
            //   prop: "updateUserName",
            //   overHidden: true,
            //   rules: [{
            //     required: true,
            //     message: "请输入更新人名称",
            //     trigger: "blur"
            //   }]
            // },
            // {
            //   label: "更新人部门名称",
            //   prop: "updateDeptName",
            //   overHidden: true,
            //   rules: [{
            //     required: true,
            //     message: "请输入更新人部门名称",
            //     trigger: "blur"
            //   }]
            // },
            {
              label: "应用名称",
              prop: "clientName",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入应用名称",
                trigger: "blur"
              }],
              minWidth: '150px',
              search: true
            },
            {
              label: "应用描述",
              prop: "clientDescribe",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入应用描述",
                trigger: "blur"
              }]
            },
            {
              label: "申请人",
              prop: "createUserName",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入申请人",
                trigger: "blur"
              }]
            },
            {
              label: "审批状态",
              prop: "status",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入审批状态",
                trigger: "blur"
              }],
              search: true,
              type: "select",
              dicData: [
                {
                    label: '通过',
                    value: '1'
                },
                {
                    label: '不通过',
                    value: '0'
                }
              ]
            },
            {
              label: "审批通过时间",
              prop: "createTime",
            },
            {
              label: "注册时间",
              prop: "createTime",
            },
            {
              label: "应用id",
              prop: "clientId",
              overHidden: true,
              hide: true,
              rules: [{
                required: true,
                message: "请输入应用id",
                trigger: "blur"
              }]
            },
            {
              label: "应用负责人",
              prop: "clientDirector",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入应用负责人",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "应用负责人联系方式",
              prop: "clientDirectorPhone",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入应用负责人联系方式",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "应用使用对象",
              prop: "clientUser",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入应用使用对象",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "建设厂商",
              prop: "clientManufacturerName",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入建设厂商",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "建设厂商联系人",
              prop: "clientManufacturerUser",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入建设厂商联系人",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "建设厂商联系方式",
              prop: "clientManufacturerPhone",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入建设厂商联系方式",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "注册地址",
              prop: "clientRegisterPlace",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入注册地址",
                trigger: "blur"
              }]
            },
            {
              label: "访问地址",
              prop: "clientViewPlace",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入访问地址",
                trigger: "blur"
              }]
            },
            {
              label: "用户主属性",
              prop: "clientUserMainAttribute",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入用户主属性",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "应用排序",
              prop: "clientSort",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入应用排序",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "应用图标",
              prop: "clientIconUrl",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入应用图标",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "是否在首页展示",
              prop: "clientShowHome",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入是否在首页展示",
                trigger: "blur"
              }],
              type: "select",
              dicData: [
                {
                    label: '展示',
                    value: '1'
                },
                {
                    label: '不展示',
                    value: '0'
                }
              ],
              hide: true,
            },
            {
              label: "账号非一致登录",
              prop: "clientAccountInconsistentLogin",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入账号非一致登录 1使用 0不使用",
                trigger: "blur"
              }],
              type: "select",
              dicData: [
                {
                    label: '使用',
                    value: '1'
                },
                {
                    label: '不使用',
                    value: '0'
                }
              ],
              hide: true,
            },
            {
              label: "应用是否启用",
              prop: "clientUseStatus",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入应用是否启用",
                trigger: "blur"
              }],
              type: "select",
              dicData: [
                {
                    label: '是',
                    value: '1'
                },
                {
                    label: '否',
                    value: '0'
                }
              ]
            },
            {
              label: "登录主题",
              prop: "loginTopic",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入登录主题",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "图标颜色",
              prop: "iconColor",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入图标颜色",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "是否开启权限过滤",
              prop: "isAuthFilter",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入是否开启权限过滤",
                trigger: "blur"
              }],
              type: "select",
              dicData: [
                {
                    label: '是',
                    value: '1'
                },
                {
                    label: '否',
                    value: '0'
                }
              ]
            },
            {
              label: "是否单点登录",
              prop: "isOauth",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入是否单点登录",
                trigger: "blur"
              }],
              type: "select",
              dicData: [
                {
                    label: '是',
                    value: '1'
                },
                {
                    label: '否',
                    value: '0'
                }
              ]
            },
            {
              label: "忽略属性过滤",
              prop: "ignoreAttributeFilter",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入忽略属性过滤",
                trigger: "blur"
              }],
              type: "select",
              dicData: [
                {
                    label: '是',
                    value: '1'
                },
                {
                    label: '否',
                    value: '0'
                }
              ]
            },
            {
              label: "开发语言",
              prop: "developmentLanguage",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入开发语言",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "原登录地址",
              prop: "originalLoginUrl",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入原登录地址",
                trigger: "blur"
              }],
              hide: true,
            },
            {
              label: "开放的属性",
              prop: "openAttribute",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入开放的属性",
                trigger: "blur"
              }],
              hide: true,
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
      clientApplySubmit() {
        this.applyDialogVisible = true
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      next() {
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                this.$confirm('确认信息无误？')
                .then(_ => {
                    if (this.active++ >= 2) this.active = 0;
                })
                .catch(_ => {});
            } else {
                console.log('error submit!!');
                return false;
            }
        })
          
      },
      cancelClientApply() {
        this.$confirm('确认取消？')
          .then(_ => {
            this.closeDialog()
          })
          .catch(_ => {});
      },
      clientApplySave() {
        add(this.form).then(() => {
          this.closeDialog()
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          window.console.log(error);
        });
      },
      closeDialog() {
        this.applyDialogVisible = false
        this.form = {}
        this.active = 0
      },
      validObj(obj) {
        if (obj==undefined || !obj || obj=='') {
            return false
        }
        return true
      },
      batchPass() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据批量通过?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return batchPass(this.ids);
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
      batchCancel() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据批量撤销?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return batchCancel(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
.el-select {
    width: 100%;
}
</style>
