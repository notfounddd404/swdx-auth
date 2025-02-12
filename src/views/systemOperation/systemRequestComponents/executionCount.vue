<template>
  <div>
    <el-row :gutter="6">
        <el-col :span="8">
            <el-select v-model="value" placeholder="系统名称" size="small">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="12">
            <div class="grid-content bg-purple">
                <div class="block">
                    <el-date-picker
                        size="small"
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple-light">
                <el-button-group>
                    <el-button type="primary" size="small">搜索</el-button>
                    <el-button size="small">清空</el-button>
                </el-button-group>
            </div>
        </el-col>
    </el-row>

    <el-divider></el-divider>
    <!-- 折线图 -->
    <div id="pageStayChart" style="width: 100%; height:500px;"></div>

    <el-row>
        <el-col :span="10">
            <div class="grid-content bg-purple">
                <el-input v-model="systemName" placeholder="系统名称" size="small"></el-input>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="grid-content bg-purple">
                <div class="block">
                    <el-date-picker
                        size="small"
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple-light">
                <el-button-group>
                    <el-button type="primary" size="small">搜索</el-button>
                    <el-button size="small">清空</el-button>
                </el-button-group>
            </div>
        </el-col>
    </el-row>
    
    <el-divider></el-divider>

    <!-- 表格 -->
    <executionCountCrud></executionCountCrud>
  </div>
</template>

<script>
import executionCountCrud from "./executionCountCrud"
import * as echarts from 'echarts';
export default {
    components: {executionCountCrud},
    data() {
        return {
            systemName: '',
            value1: '',
            pageStayEchartsOption: {
                color: ['#5470C6', '#EE6666'],
                tooltip: {
                    trigger: 'none',
                        axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {},
                grid: {
                    top: 70,
                    bottom: 50
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#EE6666'
                            }
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    return (
                                        'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                                    );
                                }
                            }
                        },
                        // prettier-ignore
                        data: ['2024-1', '2024-2', '2024-3', '2024-4', '2024-5', '2024-6', '2024-7', '2024-8', '2024-9', '2024-10', '2024-11', '2024-12']
                    },
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                                lineStyle: {
                                color: '#5470C6'
                            }
                        },
                        axisPointer: {
                            label: {
                            formatter: function (params) {
                                return (
                                'Precipitation  ' +
                                params.value +
                                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                                );
                            }
                            }
                        },
                        // prettier-ignore
                        data: ['2024-1', '2024-2', '2024-3', '2024-4', '2024-5', '2024-6', '2024-7', '2024-8', '2024-9', '2024-10', '2024-11', '2024-12']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '教务系统',
                        type: 'line',
                        xAxisIndex: 1,
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [
                            122.6, 125.9, 129.0, 2216.4, 2821.7, 7210.7, 17215.6, 18212.2, 4218.7, 1821.8, 612.0, 122.3
                        ]
                    },
                    {
                        name: '智慧校园',
                        type: 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [
                            4533.9, 4535.9, 1541.1, 1458.7, 4458.3, 3469.2, 2531.6, 4643.6, 5545.4, 1438.4, 1054.3, 340.7
                        ]
                    }
                ]
            },
            option: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
        }
    },
    mounted() {
        this.initEcharts()
    },
    methods: {
        initEcharts() {
            var chartDom = document.getElementById('pageStayChart');
            var myChart = echarts.init(chartDom);
            myChart.setOption(this.pageStayEchartsOption)
        }
    }
}
</script>

<style lang="scss" scoped>
.el-range-editor {
    width: 100%;
}
</style>