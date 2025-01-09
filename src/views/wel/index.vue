<template>
  <div>
    <el-row>
      <el-col :span="24">
        <third-register></third-register>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <basic-container>
          <avue-data-tabs :option="option"></avue-data-tabs>
        </basic-container>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <basic-container>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="流量趋势" name="first">
                    <div id="GradientStackedAreaChart" style="width: 100%; height:600px;"></div>
                </el-tab-pane>
                <el-tab-pane label="访问量" name="second">        
                    <echartsTemp v-if="activeName=='second'"></echartsTemp>
                </el-tab-pane>
            </el-tabs>
        </basic-container>
      </el-col>
    </el-row>
    <el-row :gutter="12">
        <el-col :span="8">
            <el-card class="box-card" shadow="always">
                <div slot="header" class="clearfix">
                    <span>用户来源占比</span>
                </div>
                <div id="PieChart" style="width: 100%; height:500px;"></div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="box-card" shadow="always">
                <div slot="header" class="clearfix">
                    <span>各应用模块访问认证占比情况</span>
                </div>
                <div id="DoughnutChartWithRoundedCornerChart" style="width: 100%; height:500px;"></div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="box-card" shadow="always">
                <div slot="header" class="clearfix">
                    <span>不同部门认证活跃度对比</span>
                </div>
                <div id="NightingaleChart" style="width: 100%; height:500px;"></div>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

import * as echarts from 'echarts';
import echartsTemp from './echarts';
  export default {
    name: "wel",
    components: {
        echartsTemp
    },
    data() {
      return {
        activeName: 'first',
        option: {
            data: [
                {
                    title: '应用数',
                    subtitle: '实时',
                    count: 56,
                    allcount: 56,
                    text: '当前应用数',
                    color: 'rgb(27, 201, 142)',
                    key: '应用'
                },
                {
                    title: '授权数',
                    subtitle: '实时',
                    count: 432,
                    allcount: 432,
                    text: '当前授权数',
                    color: 'rgb(144 27 201)',
                    key: '授权'
                },
                {
                    title: '活跃账号',
                    subtitle: '实时',
                    count: 5435,
                    allcount: 5435,
                    text: '当前活跃账号数',
                    color: 'rgb(56 148 255)',
                    key: '活跃'
                }
            ]
        },
        GradientStackedAreaChartOption: {
            color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
            title: {
                text: '流量趋势'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
                }
            },
            legend: {
                data: ['本地用户', '外地用户', 'EDP账号', '业财账号', 'ad域账号']
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ],
            series: [
                {
                name: '本地用户',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(128, 255, 165)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(1, 191, 236)'
                    }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [140, 232, 101, 264, 90, 340, 250]
                },
                {
                name: '外地用户',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(0, 221, 255)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(77, 119, 255)'
                    }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 282, 111, 234, 220, 340, 310]
                },
                {
                name: 'EDP账号',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(55, 162, 255)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(116, 21, 219)'
                    }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 132, 201, 334, 190, 130, 220]
                },
                {
                name: '业财账号',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 0, 135)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(135, 0, 157)'
                    }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 402, 231, 134, 190, 230, 120]
                },
                {
                name: 'ad域账号',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 191, 0)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(224, 62, 76)'
                    }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 302, 181, 234, 210, 290, 150]
                }
            ]
        },
        DoughnutChartWithRoundedCornerOption: {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '本地' },
                    { value: 735, name: '外地' },
                    { value: 580, name: 'EDP' },
                    { value: 484, name: '业财' },
                    { value: 300, name: 'ad域' }
                ]
                }
            ]
        },
        NightingaleChartOption: {
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: false, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 180],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    { value: 40, name: '‌机关党委' },
                    { value: 38, name: '宣传部' },
                    { value: 32, name: '‌教务处‌' },
                    { value: 30, name: '科研处‌' },
                    { value: 28, name: '培训部' },
                    { value: 26, name: '人事处' },
                    { value: 22, name: '决策咨询研究中心' },
                    { value: 18, name: '图书馆' }
                ]
                }
            ]
        },
        PieChartOption: {
            title: {
                text: '',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '本地' },
                    { value: 735, name: '外地' },
                    { value: 580, name: 'EDP' },
                    { value: 484, name: '业财' },
                    { value: 300, name: 'ad域' }
                ],
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
                }
            ]
        },
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    mounted() {
        // this.initEcharts() 
        this.initGradientStackedAreaChart()
        this.initDoughnutChartWithRoundedCornerChart()
        this.initNightingaleChart()
        this.initPieChart()
    },
    methods: {
      handleChange(val) {
        window.console.log(val);
      },
      initGradientStackedAreaChart() {
        var chartDom = document.getElementById('GradientStackedAreaChart');
        var myChart = echarts.init(chartDom);
        myChart.setOption(this.GradientStackedAreaChartOption)
      },
      initDoughnutChartWithRoundedCornerChart() {
        var chartDom = document.getElementById('DoughnutChartWithRoundedCornerChart');
        var myChart = echarts.init(chartDom);
        myChart.setOption(this.DoughnutChartWithRoundedCornerOption)
      },
      initNightingaleChart() {
        var chartDom = document.getElementById('NightingaleChart');
        var myChart = echarts.init(chartDom);
        myChart.setOption(this.NightingaleChartOption)
      },
      initPieChart() {
        var chartDom = document.getElementById('PieChart');
        var myChart = echarts.init(chartDom);
        myChart.setOption(this.PieChartOption)
      }
    },
  };
</script>

<style>
  .el-font-size {
    font-size: 14px;
  }
</style>

