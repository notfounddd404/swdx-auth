<template>
  <div>
    <el-form ref="form" :model="form" label-width="70px" size="small" :disabled="isEdit">
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
                    <el-form-item label="时间">
                        <div class="block">
                            <el-date-picker
                                v-model="time"
                                type="datetime"
                                placeholder="选择时间">
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
    <el-divider></el-divider>
    <div id="timeChart" style="width: 100%; height:300px;"></div>
    <timeViewCrud></timeViewCrud>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import timeViewCrud from "./timeViewCrud"
export default {
    components: {timeViewCrud},
    data() {
        return {
            time: '',
            timeOption: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }
                ]
            }
        }
    },
    mounted() {
        this.timeEcharts()
    },
    methods: {
        timeEcharts() {
            var chartDom = document.getElementById('timeChart');
            var myChart = echarts.init(chartDom);
            myChart.setOption(this.timeOption)
        },
    }
}
</script>

<style>
.el-select {
    width: 60%;
}
</style>