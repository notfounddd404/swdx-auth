<template>
  <div>
    <el-row>
        <el-col :span="22">
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
    <viewAnalysisCrud></viewAnalysisCrud>
  </div>
</template>

<script>
import viewAnalysisCrud from "./viewAnalysisCrud"
import * as echarts from 'echarts';
export default {
    components: {viewAnalysisCrud},
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
                        data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
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
                        data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Precipitation(2015)',
                        type: 'line',
                        xAxisIndex: 1,
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [
                            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                        ]
                    },
                    {
                        name: 'Precipitation(2016)',
                        type: 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [
                            3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7
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