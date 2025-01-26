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
        <div class="title">
            <svg t="1737880307672" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4051" width="30" height="30">
                <path d="M198.4 316.8c-3.2 16 6.4 28.8 12.8 44.8s-3.2 54.4 28.8 51.2v6.4c19.2 73.6 64 156.8 150.4 156.8s134.4-83.2 150.4-156.8V416c32 3.2 19.2-35.2 28.8-51.2 6.4-16 12.8-28.8 9.6-44.8-3.2-12.8-12.8-12.8-16-9.6C620.8 153.6 528 160 528 160s-9.6-96-176-96C198.4 64 179.2 192 214.4 307.2c-3.2 0-12.8 3.2-16 9.6z m320 259.2c-25.6 48-67.2 128-128 128s-102.4-80-128-128c-73.6 112-256 32-256 272V960h768v-112c0-236.8-182.4-163.2-256-272z" fill="#1177D7" p-id="4052"></path>
                <path class="wifi-outer" d="M1027.2 547.2c0 12.8 0 25.6-3.2 38.4h-67.2c3.2-12.8 3.2-25.6 3.2-38.4 0-160-131.2-291.2-291.2-291.2h-19.2V188.8h19.2c198.4 0 358.4 160 358.4 358.4z" fill="#2BC800" p-id="4053"></path>
                <path class="wifi-middle" d="M873.6 547.2c0 12.8 0 25.6-3.2 38.4H800c3.2-12.8 6.4-22.4 6.4-35.2 0-73.6-60.8-134.4-134.4-134.4h-19.2v-70.4h19.2c108.8-3.2 201.6 89.6 201.6 201.6z" fill="#2BC800" p-id="4054"></path>
                <path class="wifi-inner" d="M739.2 547.2c0 12.8-3.2 25.6-9.6 35.2h-80V480c6.4-3.2 12.8-3.2 19.2-3.2 38.4 3.2 70.4 32 70.4 70.4z" fill="#2BC800" p-id="4055"></path>
            </svg>
            <h2>在线用户监控</h2>
            <el-divider direction="vertical"></el-divider>
            <el-button size="mini" type="primary" plain @click="setting">下线</el-button>
        </div>
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
          height:'550',
          calcHeight: 30,
          tip: false,
          innerSearch: true,
          searchShowBtn: false,
          searchShow: false,
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
              label: "账号",
              prop: "账号",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入账号",
                trigger: "blur"
              }]
            },{
              label: "姓名",
              prop: "姓名",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            },{
              label: "所属机构",
              prop: "所属机构",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入所属机构",
                trigger: "blur"
              }]
            },{
              label: "人员类型",
              prop: "人员类型",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入人员类型",
                trigger: "blur"
              }]
            },{
              label: "登录IP",
              prop: "登录IP",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入登录IP",
                trigger: "blur"
              }]
            },{
              label: "IP所在地",
              prop: "IP所在地",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入IP所在地",
                trigger: "blur"
              }]
            },{
              label: "浏览器",
              prop: "浏览器",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入浏览器",
                trigger: "blur"
              }]
            },{
              label: "操作系统",
              prop: "操作系统",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入操作系统",
                trigger: "blur"
              }]
            },{
              label: "Ticket",
              prop: "Ticket",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入Ticket",
                trigger: "blur"
              }]
            },
          ]
        },
        data: [
            {
                "账号": "user001",
                "姓名": "张三",
                "所属机构": "信息中心 A",
                "人员类型": "普通员工",
                "登录IP": "192.168.1.100",
                "IP所在地": "中国 北京",
                "浏览器": "Chrome 110",
                "操作系统": "Windows 10",
                "Ticket": "T0001"
            },
            {
                "账号": "user002",
                "姓名": "李四",
                "所属机构": "信息中心 B",
                "人员类型": "管理员",
                "登录IP": "10.0.0.20",
                "IP所在地": "中国 上海",
                "浏览器": "Firefox 98",
                "操作系统": "Mac OS X",
                "Ticket": "T0002"
            },
            {
                "账号": "user003",
                "姓名": "王五",
                "所属机构": "教务部 C",
                "人员类型": "实习生",
                "登录IP": "172.16.0.50",
                "IP所在地": "中国 广州",
                "浏览器": "Safari 15",
                "操作系统": "iOS 16",
                "Ticket": "T0003"
            },
            {
                "账号": "user003",
                "姓名": "王五",
                "所属机构": "信息中心 C",
                "人员类型": "实习生",
                "登录IP": "172.16.0.50",
                "IP所在地": "中国 广州",
                "浏览器": "Safari 15",
                "操作系统": "iOS 16",
                "Ticket": "T0003"
            },
            {
                "账号": "user003",
                "姓名": "王五",
                "所属机构": "信息中心 C",
                "人员类型": "实习生",
                "登录IP": "172.16.0.50",
                "IP所在地": "中国 广州",
                "浏览器": "Safari 15",
                "操作系统": "iOS 16",
                "Ticket": "T0003"
            },
            {
                "账号": "user003",
                "姓名": "王五",
                "所属机构": "教务部 C",
                "人员类型": "实习生",
                "登录IP": "172.16.0.50",
                "IP所在地": "中国 广州",
                "浏览器": "Safari 15",
                "操作系统": "iOS 16",
                "Ticket": "T0003"
            },
            {
                "账号": "user003",
                "姓名": "王五",
                "所属机构": "信息中心 C",
                "人员类型": "实习生",
                "登录IP": "172.16.0.50",
                "IP所在地": "中国 广州",
                "浏览器": "Safari 15",
                "操作系统": "iOS 16",
                "Ticket": "T0003"
            },
            {
                "账号": "user003",
                "姓名": "王五",
                "所属机构": "教务部 C",
                "人员类型": "实习生",
                "登录IP": "172.16.0.50",
                "IP所在地": "中国 广州",
                "浏览器": "Safari 15",
                "操作系统": "iOS 16",
                "Ticket": "T0003"
            },
            {
                "账号": "user003",
                "姓名": "王五",
                "所属机构": "教务部 C",
                "人员类型": "实习生",
                "登录IP": "172.16.0.50",
                "IP所在地": "中国 广州",
                "浏览器": "Safari 15",
                "操作系统": "iOS 16",
                "Ticket": "T0003"
            },
            {
                "账号": "user003",
                "姓名": "王五",
                "所属机构": "信息中心 C",
                "人员类型": "实习生",
                "登录IP": "172.16.0.50",
                "IP所在地": "中国 广州",
                "浏览器": "Safari 15",
                "操作系统": "iOS 16",
                "Ticket": "T0003"
            },
            {
                "账号": "user003",
                "姓名": "王五",
                "所属机构": "信息中心 C",
                "人员类型": "实习生",
                "登录IP": "172.16.0.50",
                "IP所在地": "中国 广州",
                "浏览器": "Safari 15",
                "操作系统": "iOS 16",
                "Ticket": "T0003"
            },
            {
                "账号": "user003",
                "姓名": "王五",
                "所属机构": "信息中心 C",
                "人员类型": "实习生",
                "登录IP": "172.16.0.50",
                "IP所在地": "中国 广州",
                "浏览器": "Safari 15",
                "操作系统": "iOS 16",
                "Ticket": "T0003"
            }
        ],
        geoOption: {
            backgroundColor: 'transparent', //背景色
            tooltip: {
                trigger: 'item',
                show: true,
                formatter: function(params) {
                    //console.log(params);
                    if (params.data && params.data.departmentnames.length) {
                        let str = `${params.name}，共计${params.data.departmentnames.length}个事业部：<br />`;
                        params.data.departmentnames.forEach((item) => {
                            str += `${item}<br />`
                        })
                        return str;
                    } else {
                        return ""
                    }
                },
            },
            legend: {
                show: false,
                orient: 'horizontal', //图例的排列方向
                x: 'left',
                data: ['']
            },
            series: [
                {
                    name: '人口数量',
                    type: 'map',
                    mapType: 'china',
                    roam: true,//是否开启鼠标缩放和平移漫游
                    //aspectScale:0.85,
                    selectedMode:"single",
                    label: {
                        //show: true, //是否显示标签  此处指是否显示地图上的地区名字
                        color: '#ffffff',
                        fontSize:14
                    },
                    itemStyle: {
                        areaColor: "#003373",
                        borderColor: "#4bf3f9",
                        shadowColor: '#003373', //阴影颜色
                        shadowOffsetX: 0, //阴影偏移量
                        shadowOffsetY:10, //阴影偏移量
                    },
                    emphasis: {
                        label: {
                            show: true,
                            color: '#ffffff',
                        },
                        itemStyle: {
                            areaColor: "#eeb804",
                            //areaColor: "#00d8ff",
                            borderColor:"transparent"
                        }
                    },
                    data: [
                        { name: '长三角', departmentnames:["长三角设计中心","长三角设计中心-徐州","长三角设计中心-南京","长三角设计中心-杭州","南京公司","上海公司","合肥公司","温州公司"],label:{ show: true } },
                        { name: '重庆', departmentnames:["总承包事业部","桥梁事业部","道路事业部","轨道事业部","生态环境事业部","同望水利事业部","城市发展事业部","勘察事业部"],selected:true,label:{ show: true } },
                        { name: '云南', departmentnames:["昆明公司"],label:{ show: true } },
                        { name: '湖南', departmentnames:["湖南公司"],label:{ show: true } },
                        { name: '山东', departmentnames:["青岛公司"],label:{ show: true } },
                        { name: '江西', departmentnames:["南昌公司"],label:{ show: true } },
                        { name: '湖北', departmentnames:["武汉公司"],label:{ show: true } },
                        { name: '广西', departmentnames:["广西公司"],label:{ show: true } },
                        { name: '陕西', departmentnames:["西安公司"],label:{ show: true } },
                        { name: '广东', departmentnames:["大湾区设计中心（广州）","大湾区创新中心（深圳）"],label:{ show: true } },
                        { name: '四川', departmentnames:["四川公司"],label:{ show: true } },
                    ]
                }
            ]
        }
      }
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
          this.page.total = 15;
        //   this.data = data.records;
          this.loading = false;
          this.selectionClear();
          done();
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.icon {
    margin-right: 10px;
}
::v-deep .avue-crud__header {
    align-items: center !important;
}
/* 关键帧：脉冲式显隐 */
    @keyframes wifi-pulse {
      0%, 100% { opacity: 0; transform: scale(0.8); }
      20%, 80% { opacity: 1; transform: scale(1); }
    }

    /* 动画配置 */
    .wifi-inner, .wifi-middle, .wifi-outer {
      animation: wifi-pulse 2.4s infinite;
      transform-origin: center;
      opacity: 0;
    }

    /* 延迟配置 */
    .wifi-inner  { animation-delay: 0s; }   /* 最内层最先动 */
    .wifi-middle { animation-delay: 0.8s; } /* 中层延迟0.8秒 */
    .wifi-outer  { animation-delay: 1.6s; } /* 外层延迟1.6秒 */
</style>
