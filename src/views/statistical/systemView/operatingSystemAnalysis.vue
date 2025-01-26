<template>
  <basic-container class="flex-container">
    <el-row>
        <el-col :span="12">
            <div class="grid-content bg-purple">
                <div class="title">
                    <svg t="1737807087357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7432" width="35" height="35">
                        <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M768 186.2H256c-38.5 0-69.8 31.4-69.8 69.8v512c0 38.5 31.4 69.8 69.8 69.8h512c38.5 0 69.8-31.4 69.8-69.8V256c0-38.5-31.3-69.8-69.8-69.8z m-512 46.5h512c12.7 0 23.3 10.5 23.3 23.3v72.6H232.7V256c0-12.7 10.6-23.3 23.3-23.3z m512 558.6H256c-12.7 0-23.3-10.5-23.3-23.3V375.2h558.5V768c0.1 12.7-10.5 23.3-23.2 23.3z" p-id="7433" ></path>
                        <path class="circle" stroke="#108cee" fill="none" stroke-width="15" d="M352.6 580.9l52.5-52.5c9.1-9.1 9.1-23.8 0-32.9-9.1-9.1-23.8-9.1-32.9 0l-68.9 68.9c-9.1 9.1-9.1 23.8-0.1 32.9l68.9 69.4c9.1 9.1 23.8 9.2 32.9 0.1 9.1-9.1 9.2-23.8 0.1-32.9l-52.5-53zM651.8 495.5c-9.1-9.1-23.8-9.1-32.9 0-9.1 9.1-9.1 23.8 0 32.9l52.5 52.5-52.5 52.9c-9.1 9.1-9 23.9 0.1 32.9 9.1 9.1 23.9 9 32.9-0.1l68.9-69.4c9-9.1 9-23.8-0.1-32.9l-68.9-68.8zM564.2 491.9c-11.1-6.4-25.4-2.7-31.8 8.5l-81 139.6c-6.4 11.1-2.7 25.4 8.5 31.8 11.1 6.4 25.4 2.7 31.8-8.5l81-139.6c6.4-11.1 2.6-25.4-8.5-31.8z" p-id="7434" ></path>
                    </svg>
                    <h2>操作系统使用情况</h2>
                </div>
                <!-- 操作系统使用情况玫瑰图 -->
                <div id="operatingSystemChart" style="width: 100%; height:600px;"></div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="grid-content bg-purple-light">
                <operatingSystemViewCrud></operatingSystemViewCrud>
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
    <!-- 操作系统使用情况折线图堆叠-->
    <div id="operatingSystemStackedLineChart" style="width: 100%; height:600px;"></div>
    <el-row>
         <el-col :span="4">
         </el-col>
    </el-row>
  </basic-container>
</template>

<script>
  import operatingSystemViewCrud from "./operatingSystemComponents/operatingSystemViewCrud"
  import * as echarts from 'echarts';
  export default {
    components: {operatingSystemViewCrud},
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
        operatingSystemOption: {
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
                        { value: 40, name: 'OS X' },
                        { value: 38, name: 'Windows' },
                        { value: 32, name: 'IOS' },
                        { value: 30, name: 'Android' },
                        { value: 28, name: 'Linux' },
                        { value: 26, name: 'unknown' }
                    ]
                }
            ]
        },
        operatingSystemStackedLineOption: {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['OS X', 'Windows', 'IOS', 'Android', 'Linux', 'unknown']
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
                    name: 'OS X',
                    type: 'line',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90, 230, 12]
                },
                {
                    name: 'Windows',
                    type: 'line',
                    stack: 'Total',
                    data: [1220, 182, 543, 234, 290, 2330, 123]
                },
                {
                    name: 'IOS',
                    type: 'line',
                    stack: 'Total',
                    data: [150, 1232, 201, 2432, 190, 830, 233]
                },
                {
                    name: 'Android',
                    type: 'line',
                    stack: 'Total',
                    data: [564, 543, 301, 334, 390, 54, 323]
                },
                {
                    name: 'Linux',
                    type: 'line',
                    stack: 'Total',
                    data: [820, 1654, 654, 934, 1290, 32, 53]
                }
                ,
                {
                    name: 'unknown',
                    type: 'line',
                    stack: 'Total',
                    data: [820, 932, 654, 65, 76, 32, 54]
                }
            ]
        }
      };
    },
    created() {
        
    },
    mounted() {
        this.operatingSystemEcharts()
        this.operatingSystemStackedLineEcharts()
    },
    methods: {
      operatingSystemEcharts() {
        var chartDom = document.getElementById('operatingSystemChart');
        var myChart = echarts.init(chartDom);
        myChart.setOption(this.operatingSystemOption)
      },
      operatingSystemStackedLineEcharts() {
        var chartDom = document.getElementById('operatingSystemStackedLineChart');
        var myChart = echarts.init(chartDom);
        myChart.setOption(this.operatingSystemStackedLineOption)
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
