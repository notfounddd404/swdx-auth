<template>
  <div>
    <el-form ref="form" :model="form" label-width="70px" size="small" :disabled="isEdit">
        <el-row>
            <el-col :span="14">
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
    <div id="yearChart" style="width: 100%; height:300px;"></div>
    <yearViewCrud></yearViewCrud>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import yearViewCrud from "./yearViewCrud"
export default {
    components: {yearViewCrud},
    data() {
        return {
            yearOption: {
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
        this.yearEcharts()
    },
    methods: {
        yearEcharts() {
            var chartDom = document.getElementById('yearChart');
            var myChart = echarts.init(chartDom);
            myChart.setOption(this.yearOption)
        },
    }
}
</script>

<style>
.el-select {
    width: 60% !important;
}
</style>