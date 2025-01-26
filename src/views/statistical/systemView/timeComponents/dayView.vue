<template>
  <div>
    <el-form ref="form" :model="form" label-width="70px" size="small" :disabled="isEdit">
        <el-row>
            <el-col :span="7">
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
            <el-col :span="7">
                <div class="grid-content bg-purple">
                    <el-form-item label="年份">
                        <div class="block">
                            <el-date-picker
                                v-model="year"
                                type="year"
                                placeholder="选择年">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="月份">
                        <div class="block">
                            <el-date-picker
                                v-model="month"
                                type="month"
                                placeholder="选择月份">
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
    <div id="dayChart" style="width: 100%; height:300px;"></div>
    <dayViewCrud></dayViewCrud>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import dayViewCrud from "./dayViewCrud"
export default {
    components: {dayViewCrud},
    data() {
        return {
            year: '',
            month: '',
            dayOption: {
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
        this.dayEcharts()
    },
    methods: {
        dayEcharts() {
            var chartDom = document.getElementById('dayChart');
            var myChart = echarts.init(chartDom);
            myChart.setOption(this.dayOption)
        },
    }
}
</script>

<style>
.el-select {
    width: 60%;
}
</style>