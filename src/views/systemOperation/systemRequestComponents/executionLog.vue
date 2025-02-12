<template>
  <div>
    <executionLogCrud></executionLogCrud>
  </div>
</template>

<script>
import executionLogCrud from "./executionLogCrud"
import * as echarts from 'echarts';
export default {
    components: {executionLogCrud},
    data() {
        return {
            zxyhOption: {
                title: {
                    text: '',
                    subtext: '',
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
                        { value: 1048, name: '在线用户量' },
                        { value: 1735, name: '总用户量' }
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
            yhlxOption: {
                title: {
                    text: '',
                    subtext: '',
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
                        { value: 1048, name: '教职工' },
                        { value: 123, name: '领导班子' },
                        { value: 580, name: '中层干部' },
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
        }
    },
    mounted() {
        this.zxyhEcharts()
        this.yhlxEcharts()
    },
    methods: {
        zxyhEcharts() {
            var chartDom = document.getElementById('zxyhChart');
            var myChart = echarts.init(chartDom);
            myChart.setOption(this.zxyhOption)
        },
        yhlxEcharts() {
            var chartDom = document.getElementById('yhlxChart');
            var myChart = echarts.init(chartDom);
            myChart.setOption(this.yhlxOption)
        },
    }
}
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>