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
            <basic-container>
                <div>用户来源占比</div>
                <el-divider></el-divider>
                <div id="PieChart" style="width: 100%; height:500px;"></div>
            </basic-container>
        </el-col>
        <el-col :span="8">
            <basic-container>
                <div>各应用模块访问认证占比情况</div>
                <el-divider></el-divider>
                <div id="DoughnutChartWithRoundedCornerChart" style="width: 100%; height:500px;"></div>
            </basic-container>
        </el-col>
        <el-col :span="8">
            <basic-container>
                <div>不同部门认证活跃度对比</div>
                <el-divider></el-divider>
                <div id="NightingaleChart" style="width: 100%; height:500px;"></div>
            </basic-container>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <basic-container>
            <div class="title">
                <svg t="1737282670559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14036" width="35" height="35"><path d="M512 697.6c102.4 0 182.4-83.2 182.4-185.6 0-102.4-83.2-185.6-182.4-185.6-102.4 0-182.4 83.2-182.4 185.6 0 102.4 83.2 185.6 182.4 185.6z m0-51.2c-73.6 0-134.4-60.8-134.4-134.4 0-73.6 60.8-134.4 134.4-134.4 73.6 0 134.4 60.8 134.4 134.4 0 73.6-60.8 134.4-134.4 134.4zM249.015 843.179c35.2 28.8 73.6 51.2 112 67.2 41.6-38.4 96-60.8 150.4-60.8 57.6 0 108.8 22.4 150.4 60.8 41.6-16 80-38.4 112-67.2-12.8-54.4-3.2-112 22.4-163.2 28.8-48 73.6-86.4 128-102.4 3.2-22.4 6.4-44.8 6.4-67.2 0-22.4-3.2-44.8-6.4-67.2-54.4-16-99.2-54.4-128-102.4-28.8-48-35.2-108.8-22.4-163.2-35.2-28.8-73.6-51.2-112-67.2-41.6 38.4-92.8 60.8-150.4 60.8-54.4 0-108.8-22.4-150.4-60.8-41.6 16-80 38.4-112 67.2 12.8 54.4 3.2 112-22.4 163.2-28.8 48-73.6 86.4-128 102.4-3.2 22.4-6.4 44.8-6.4 67.2 0 22.4 3.2 44.8 6.4 67.2 54.4 16 99.2 54.4 128 102.4 25.6 51.2 35.2 108.8 22.4 163.2m112 115.2c-54.4-19.2-105.6-48-150.4-89.6-6.4-6.4-9.6-16-6.4-22.4 16-48 9.6-99.2-16-140.8-25.6-44.8-64-73.6-112-83.2-9.6-3.2-16-9.6-16-19.2-6.4-28.8-9.6-60.8-9.6-89.6 0-28.8 3.2-57.6 9.6-89.6 3.2-9.6 9.6-16 16-19.2 48-12.8 89.6-41.6 112-83.2 25.6-44.8 28.8-92.8 16-140.8-3.2-9.6 0-19.2 6.4-22.4 44.8-38.4 96-67.2 150.4-89.6 9.6-3.2 16 0 22.4 6.4 35.2 35.2 80 57.6 128 57.6s96-19.2 128-57.6c6.4-6.4 16-9.6 22.4-6.4 54.4 19.2 105.6 48 150.4 89.6 6.4 6.4 9.6 16 6.4 22.4-16 48-9.6 99.2 16 140.8 25.6 44.8 64 73.6 112 83.2 9.6 3.2 16 9.6 16 19.2 6.4 28.8 9.6 60.8 9.6 89.6 0 28.8-3.2 57.6-9.6 89.6-3.2 9.6-9.6 16-16 19.2-48 12.8-89.6 41.6-112 83.2-25.6 44.8-28.8 92.8-16 140.8 3.2 9.6 0 19.2-6.4 22.4-44.8 38.4-96 67.2-150.4 89.6-9.6 3.2-16 0-22.4-6.4-35.2-35.2-80-57.6-128-57.6s-96 19.2-128 57.6c-3.2 3.2-9.6 6.4-16 6.4h-6.4z" fill="#409EFF" p-id="14037"></path></svg>
                <h2>系统设置</h2>
            </div>
            <el-divider></el-divider>
            <el-form ref="systemConfigForm" :model="systemConfigForm" label-width="300px" size="small" :disabled="isEdit">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="Title：">
                                <span>{{systemConfigForm.title}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="Support：">
                                <span>{{systemConfigForm.support}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="Copyright：">
                                <span>{{systemConfigForm.copyright}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="密码找回地址：">
                                <span>{{systemConfigForm.passwordRecoverUrl}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="语言包：">
                                <span>{{systemConfigForm.languagePack}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="找回密码页面文字说明：">
                                <span>{{systemConfigForm.passwordRecoverDescribe}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="认证成功后跳转：">
                                <span>{{systemConfigForm.loginRedirectUrl}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="默认主题：">
                                <span>{{systemConfigForm.topic}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="TGT有效期：">
                                <span>{{systemConfigForm.tgtExpire}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="ST有效期：">
                                <span>{{systemConfigForm.stExpire}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
            </el-form>

            
            <div class="title">
                <svg t="1737277896114" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4280" width="35" height="35"><path d="M484.522667 77.192533l-307.2 134.997334A68.266667 68.266667 0 0 0 136.533333 274.653867V486.229333c0 129.5872 57.9584 245.384533 160.085334 325.188267l176.0256 124.2112a68.266667 68.266667 0 0 0 78.711466 0l174.6944-123.221333C829.508267 731.5968 887.466667 615.799467 887.466667 486.229333V274.670933a68.266667 68.266667 0 0 0-40.789334-62.498133l-307.2-134.997333a68.266667 68.266667 0 0 0-54.954666 0zM204.8 274.670933l307.2-134.997333 307.2 134.997333V486.229333c0 108.305067-48.0768 204.373333-133.853867 271.394134L512 879.837867l-174.6944-123.221334C252.8768 690.551467 204.8 594.500267 204.8 486.1952V274.670933z" fill="#409EFF" p-id="4281"></path><path d="M682.666667 358.4l48.264533 48.264533-221.866667 221.866667a34.133333 34.133333 0 0 1-48.264533 0l-136.533333-136.533333L372.5312 443.733333l112.401067 112.384L682.666667 358.4z" fill="#409EFF" p-id="4282"></path></svg>
                <h2>认证设置</h2>
            </div>
            <el-divider></el-divider>
            <el-form ref="authConfigForm" :model="authConfigForm" label-width="300px" size="small" :disabled="isEdit">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="IP登录失败限制：">
                                <span>{{authConfigForm.ipLoginFailedStatus}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="用户登录失败限制：">
                                <span>{{authConfigForm.userLoginFailedStatus}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="IP锁定登录的时间：">
                                <span>{{authConfigForm.ipLockLoginTime}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="用户锁定登录的时间：">
                                <span>{{authConfigForm.userLockLoginTime}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="IP锁定登录失败数：">
                                <span>{{authConfigForm.ipLockLoginFailedCount}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="用户锁定登录失败数：">
                                <span>{{authConfigForm.userLockLoginFailedCount}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="最大在线会话量：">
                                <span>{{authConfigForm.maxOnlineSession}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="登录方式：">
                                <span v-if="authConfigForm.loginWay==1">不限制</span>
                                <span v-if="authConfigForm.loginWay==2">踢出之前的用户</span>
                                <span v-if="authConfigForm.loginWay==3">禁止再次登录</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="验证码错误数：">
                                <span>{{authConfigForm.captchaFailedCount}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="启用redis：">
                                <span v-if="authConfigForm.isRedis==1">是</span>
                                <span v-if="authConfigForm.isRedis==0">否</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <el-form-item label="是否开启短信登录验证：">
                                <span v-if="authConfigForm.isCaptchaFailed==1">是</span>
                                <span v-if="authConfigForm.isCaptchaFailed==0">否</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </basic-container>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {getLastOne as getSystemConfigLastOne} from "@/api/authManager/systemconfig";
  import {getLastOne as getAuthConfigLastOne} from "@/api/authManager/authconfig";

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
        systemConfigForm: {},
        authConfigForm: {},
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
        this.getSystemConfigLastOne()
        this.getAuthConfigLastOne()
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
      },
      getSystemConfigLastOne() {
        getSystemConfigLastOne().then(res => {
            this.systemConfigForm = res.data.data
        })
      },
      getAuthConfigLastOne() {
        getAuthConfigLastOne().then(res => {
            this.authConfigForm = res.data.data
        })
      }

    },
  };
</script>

<style lang="scss" scoped>
  .el-font-size {
    font-size: 14px;
  }
  .title {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.el-form {
    ::v-deep .el-form-item__label {
        font-weight: bold;
    }
}
.svg {
    margin-right: 10px;
}
</style>

