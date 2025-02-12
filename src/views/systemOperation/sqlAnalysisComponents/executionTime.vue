<template>
  <div>
    <el-row :gutter="12">
        <el-col :span="20">
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
    <div id="viewChart" style="width: 100%; height:500px;"></div>

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
    <executionTimeCrud></executionTimeCrud>
  </div>
</template>

<script>
import executionTimeCrud from "./executionTimeCrud"
import * as echarts from 'echarts';
export default {
    components: {executionTimeCrud},
    data() {
        return {
            systemName: '',
            value1: '',
            viewEchartsOption: {
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
                            2123.6, 5432.9, 549.0, 6526.4, 2878.7, 7340.7, 1755.6, 18652.2, 487.7, 188.8, 69.0, 298.3
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
                            5643.9, 5876.9, 9911.1, 1809.7, 480.3, 699.2, 2431.6, 461.6, 515.4, 118.4, 110.3, 1011.7
                        ]
                    }
                ]
            }
        }
    },
    mounted() {
        this.initEcharts()
    },
    methods: {
        initEcharts() {
            var chartDom = document.getElementById('viewChart');
            var myChart = echarts.init(chartDom);
            myChart.setOption(this.viewEchartsOption)
        }
    }
}
</script>

<style lang="scss" scoped>
.el-range-editor {
    width: 100%;
}
</style>