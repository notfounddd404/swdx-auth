<template>
  <basic-container class="flex-container">
    <el-row>
        <el-col :span="12">
            <div class="grid-content bg-purple">
                <div class="title">
                    <svg t="1737803510023" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3533" width="35" height="35">
                        <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M768 128H256a128 128 0 0 0-128 128v512a128 128 0 0 0 128 128h512a128 128 0 0 0 128-128V256a128 128 0 0 0-128-128z m42.666667 640a42.666667 42.666667 0 0 1-42.666667 42.666667H256a42.666667 42.666667 0 0 1-42.666667-42.666667v-298.666667h597.333334zM213.333333 384V256a42.666667 42.666667 0 0 1 42.666667-42.666667h512a42.666667 42.666667 0 0 1 42.666667 42.666667v128z" p-id="3534" ></path>
                        <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M341.333333 299.946667m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" p-id="3535" ></path>
                        <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M512 299.946667m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z" p-id="3536" ></path>
                    </svg>
                    <h2>浏览器使用情况</h2>
                </div>
                <!-- 浏览器使用情况玫瑰图 -->
                <div id="browserChart" style="width: 100%; height:600px;"></div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="grid-content bg-purple-light">
                <browserViewCrud></browserViewCrud>
            </div>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-form ref="form" :model="form" label-width="130px" size="small" :disabled="isEdit">
        <el-row>
            <el-col :span="10">
                <div class="grid-content bg-purple">
                    <el-form-item label="系统名称">
                        <el-select v-model="value" placeholder="请选择" size="small">
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
            <el-col :span="10">
                <div class="grid-content bg-purple">
                    <el-form-item label="起止时间">
                        <div class="block">
                            <el-date-picker
                                v-model="time"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-form-item >
                        <div>
                            <el-button size="small" type="primary">搜索</el-button>
                            <el-button size="small">清空</el-button>
                        </div>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
    </el-form>
    <!-- 浏览器使用情况折线图堆叠-->
    <div id="browserStackedLineChart" style="width: 100%; height:600px;"></div>
    <el-row>
         <el-col :span="4">
         </el-col>
    </el-row>
  </basic-container>
</template>

<script>
  import browserViewCrud from "./browserComponents/browserViewCrud"
  import * as echarts from 'echarts';
  export default {
    components: {browserViewCrud},
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        time: '',
        browserOption: {
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 250],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 7
                },
                data: [
                    { value: 40, name: 'Chrome' },
                    { value: 38, name: 'Firefox' },
                    { value: 32, name: 'Mobile Safari' },
                    { value: 30, name: 'Chrome Mobile' },
                    { value: 28, name: 'Safari' },
                    { value: 26, name: 'Android browse' },
                    { value: 22, name: 'unknown' }
                ]
                }
            ]
        },
        browserStackedLineOption: {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Chrome', 'Firefox', 'Mobile Safari', 'Chrome Mobile', 'Safari', 'Android browser', 'unknown']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Chrome',
                    type: 'line',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Firefox',
                    type: 'line',
                    stack: 'Total',
                    data: [1220, 182, 543, 234, 290, 2330, 1310]
                },
                {
                    name: 'Mobile Safari',
                    type: 'line',
                    stack: 'Total',
                    data: [150, 1232, 201, 2432, 190, 830, 410]
                },
                {
                    name: 'Chrome Mobile',
                    type: 'line',
                    stack: 'Total',
                    data: [564, 543, 301, 334, 390, 54, 320]
                },
                {
                    name: 'Safari',
                    type: 'line',
                    stack: 'Total',
                    data: [820, 1654, 654, 934, 1290, 32, 43]
                }
                ,
                {
                    name: 'Android browser',
                    type: 'line',
                    stack: 'Total',
                    data: [820, 932, 654, 65, 76, 32, 1651]
                }
                ,
                {
                    name: 'unknown',
                    type: 'line',
                    stack: 'Total',
                    data: [1176, 432, 765, 54, 545, 432, 565]
                }
            ]
        }
      };
    },
    created() {
        
    },
    mounted() {
        this.browserEcharts()
        this.browserStackedLineEcharts()
    },
    methods: {
      browserEcharts() {
        var chartDom = document.getElementById('browserChart');
        var myChart = echarts.init(chartDom);
        myChart.setOption(this.browserOption)
      },
      browserStackedLineEcharts() {
        var chartDom = document.getElementById('browserStackedLineChart');
        var myChart = echarts.init(chartDom);
        myChart.setOption(this.browserStackedLineOption)
      },
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
