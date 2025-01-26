<template>
  <basic-container class="flex-container">
    <div class="title">
        <!-- <span class="title-bg"></span> -->
        <svg t="1737884637483" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21726" width="35" height="35">
            <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M957.7 361.5c0-8.9 0.6-18-0.6-26.7-5-36.7-31.1-52.9-65-38.4-19.6 8.4-37.4 20.8-56.1 31-22.2 12.1-37.3 28.4-31.3 55.7 5.6 25.1 24 33.4 47.7 34.2 4.7 0.2 9.2 3.6 13.8 5.5v332.9l-213.4 109c-70.4-36.9-136.4-72.2-203.1-106.3-112.4-57.5-74.2-56.9-183.1-0.3C232 776 198 794.7 153.4 818.5c0-102.5 0.7-193.3-0.3-284.1-0.4-39.9-3-76.8 44.7-96.8 24-10 27.4-40.3 14.4-59.8-14.1-21.2-34.9-24.7-56.6-15.3-19.5 8.4-37.2 21-56.3 30.8-25.1 12.8-34.9 32.6-34.7 60.7 0.7 141-0.3 282 0.6 423 0.4 59.8 28.6 75 83.2 46.3 58.5-30.6 117.1-61.2 174.1-94.3 24.5-14.2 43.7-14.7 68.8-0.8C464.6 869 540 906 613.5 946.3c28.1 15.4 51.7 14.9 79.9-0.4 72.1-39.1 145.2-76.6 219.1-112.3 33.4-16.2 46.3-38.5 45.9-75.7-1.7-132.1-0.7-264.3-0.7-396.4z m0 0" p-id="21727"></path>
            <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M298.1 219.9C332 115.5 436.9 51.4 545.2 68.8c113.1 18.4 190.4 110 195.2 225.8C728.8 333.5 721 374 704.9 411c-35.5 81.3-92.6 147.7-156.5 208.1-28.2 26.7-46.3 27.1-74.2 0.5-69-65.5-129.2-138-165.8-227.3-22.9-56.1-29.3-113.8-10.3-172.4z m219.4-62.4c-78.1-3.4-140.1 56.8-139.7 135.6 0.3 56.6 59.8 182.3 103.2 218.1 20.2 16.7 45 18.1 61.8-2.6 48.6-59.8 90.7-124.2 100.9-202.7 10.2-77-49.6-145.1-126.2-148.4z m0 0"  p-id="21728"></path>
        </svg>
        <h2>用户地域分布</h2>
    </div>
    <div id="geoChart" style="width: 100%; height:1000px;"></div>

  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, submit, getLastOne} from "@/api/authManager/identitylibrarymanager";
  import {mapGetters} from "vuex";
  import {deepClone} from "@/util/util";
  import * as echarts from 'echarts';
  import geoJson from '@/echarts/map/province.json'; //导入地图数据，从中国地图获取的数据需要引入并注册
  echarts.registerMap('china', { geoJSON: geoJson }); //注册可用地图
  export default {
    data() {
      return {
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
        data: [],
        geoOption: {
            backgroundColor: 'transparent', //背景色
            tooltip: {
                trigger: 'item',
                show: true,
                formatter: function(params) {
                    //console.log(params);
                    if (params.data && params.data.departmentnames.length) {
                        let str = `${params.name}，共计${params.data.departmentnames}用户量<br />`;
                        return str;
                    } else {
                        return `${params.name}省，共计0个用户量<br />`
                    }
                }
            },
            geo: { //地理坐标系组件   地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制
                map: 'china', //地图类型  这儿展示的是中国地图
                aspectScale: 0.85,
                selectedMode: "single",// 开启单选
                label: {
                    show: false, //是否显示标签  此处指是否显示地图上的地区名字
                    color: '#ffffff',
                    fontSize: 14
                },
                roam: true, //是否开启鼠标缩放和平移漫游
                itemStyle: {
                    areaColor: "#03365b",
                    borderColor: "#4bf3f9",
                    shadowColor: '#03365b', //阴影颜色
                    shadowOffsetX: 0, //阴影偏移量
                    shadowOffsetY: 10, //阴影偏移量
                },
                emphasis: {
                    label: {
                        show: true,
                        color: '#ffffff',
                    },
                    itemStyle: {
                        areaColor: "#0f5d9d",
                    }
                }
            },
            series: [{
                type: "effectScatter",
                coordinateSystem: "geo",
                showEffectOn: "render",
                data: [
                    { name: '北京市', departmentnames: ["123121"], value: [116.4074, 39.9042], itemStyle: { color: '#f56321' } },
                    { name: '天津市', departmentnames: ["2332"], value: [117.1902, 39.1255], itemStyle: { color: '#eeb804' } },
                    { name: '上海市', departmentnames: ["432424"], value: [121.4737, 31.2304], itemStyle: { color: '#2196f3' } },
                    { name: '重庆市', departmentnames: ["21313"], value: [106.5049, 29.5331], itemStyle: { color: '#4caf50' } },
                    { name: '河北省', departmentnames: ["1231"], value: [114.5025, 38.0454], itemStyle: { color: '#9c27b0' } },
                    { name: '山西省', departmentnames: ["32"], value: [112.5493, 37.8571], itemStyle: { color: '#ff9800' } },
                    { name: '辽宁省', departmentnames: ["43242"], value: [123.4290, 41.7968], itemStyle: { color: '#e91e63' } },
                    { name: '吉林省', departmentnames: ["453453"], value: [125.3245, 43.8868], itemStyle: { color: '#673ab7' } },
                    { name: '黑龙江省', departmentnames: ["5464"], value: [126.6424, 45.7569], itemStyle: { color: '#00bcd4' } },
                    { name: '江苏省', departmentnames: ["565"], value: [118.7674, 32.0415], itemStyle: { color: '#8bc34a' } },
                    { name: '浙江省', departmentnames: ["677"], value: [120.1536, 30.2874], itemStyle: { color: '#ffeb3b' } },
                    { name: '安徽省', departmentnames: ["8768"], value: [117.2831, 31.8611], itemStyle: { color: '#795548' } },
                    { name: '福建省', departmentnames: ["767"], value: [119.3062, 26.0753], itemStyle: { color: '#cddc39' } },
                    { name: '江西省', departmentnames: ["546"], value: [115.8922, 28.6765], itemStyle: { color: '#607d8b' } },
                    { name: '山东省', departmentnames: ["8978"], value: [117.0009, 36.6758], itemStyle: { color: '#ff5722' } },
                    { name: '河南省', departmentnames: ["54"], value: [113.6654, 34.7579], itemStyle: { color: '#009688' } },
                    { name: '湖北省', departmentnames: ["3424"], value: [114.2985, 30.5845], itemStyle: { color: '#9e9e9e' } },
                    { name: '湖南省', departmentnames: ["43"], value: [112.9822, 28.1940], itemStyle: { color: '#212121' } },
                    { name: '广东省', departmentnames: ["4324"], value: [113.2806, 23.1251], itemStyle: { color: '#f44336' } },
                    { name: '海南省', departmentnames: ["2432"], value: [110.3311, 20.0319], itemStyle: { color: '#00897b' } },
                    { name: '四川省', departmentnames: ["4353"], value: [104.0658, 30.5728], itemStyle: { color: '#ffc107' } },
                    { name: '贵州省', departmentnames: ["453"], value: [106.7134, 26.5784], itemStyle: { color: '#3f51b5' } },
                    { name: '云南省', departmentnames: ["567"], value: [102.7123, 25.0406], itemStyle: { color: '#76ff03' } },
                    { name: '陕西省', departmentnames: ["7768"], value: [108.9480, 34.2632], itemStyle: { color: '#d50000' } },
                    { name: '甘肃省', departmentnames: ["7686"], value: [103.8235, 36.0581], itemStyle: { color: '#aeea00' } },
                    { name: '青海省', departmentnames: ["6554"], value: [101.7789, 36.6232], itemStyle: { color: '#00bfa5' } },
                    { name: '台湾省', departmentnames: ["342"], value: [121.5654, 25.0330], itemStyle: { color: '#ffd740' } },
                    { name: '内蒙古自治区', departmentnames: ["432"], value: [111.6708, 40.8184], itemStyle: { color: '#6200ea' } },
                    { name: '广西壮族自治区', departmentnames: ["23424"], value: [108.2902, 22.8240], itemStyle: { color: '#00e676' } },
                    { name: '西藏自治区', departmentnames: ["45343"], value: [91.1145, 29.6441], itemStyle: { color: '#d32f2f' } },
                    { name: '宁夏回族自治区', departmentnames: ["5463"], value: [106.2781, 38.4664], itemStyle: { color: '#ffab00' } },
                    { name: '新疆维吾尔自治区', departmentnames: ["435"], value: [87.6177, 43.7928], itemStyle: { color: '#4a148c' } },
                    { name: '香港特别行政区', departmentnames: ["9879"], value: [114.1733, 22.3200], itemStyle: { color: '#ff6e40' } },
                    { name: '澳门特别行政区', departmentnames: ["5435"], value: [113.5491, 22.1987], itemStyle: { color: '#00c853' } }
                ],
                rippleEffect: {
                    brushType: "stroke",
                    scale: 5,
                    period: 2, // 秒数
                },
                symbolSize: 12,
                clickable: false,
                hoverAnimation: true,
                zlevel: 1,
                label: {
                    normal: {
                        formatter: "{b}",
                        position: "right",
                        show: true,
                    },
                }, 
            }
            ]
        }
        
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
    mounted() {
        this.geoEcharts()
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
      },
      geoEcharts() {
        var chartDom = document.getElementById('geoChart');
        var myChart = echarts.init(chartDom);
        myChart.setOption(this.geoOption)
      },
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
/* 外层圆环动画 */
.circle {
    stroke-dasharray: 1000; /* 路径总长度 */
    stroke-dashoffset: 1000; /* 初始偏移量 */
    animation: draw-circle 2s ease-in-out forwards; /* 只播放一次 */
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
    animation: draw-circle 2s ease-in-out forwards, fill-color 0.5s ease-in-out 2s forwards;
}
</style>
