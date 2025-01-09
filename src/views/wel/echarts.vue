<template>
<div>
    <!-- 放在el-tabs下的echarts要封装组件配合v-if使用，否则宽度有问题 -->
    <div id="echarts" style="width: 100%; height:600px;"></div>
</div>
</template>

<script>
  import {mapGetters} from "vuex";

import * as echarts from 'echarts';
var app = {};
const posList = [
  'left',
  'right',
  'top',
  'bottom',
  'inside',
  'insideTop',
  'insideLeft',
  'insideRight',
  'insideBottom',
  'insideTopLeft',
  'insideTopRight',
  'insideBottomLeft',
  'insideBottomRight'
];
app.configParameters = {
  rotate: {
    min: -90,
    max: 90
  },
  align: {
    options: {
      left: 'left',
      center: 'center',
      right: 'right'
    }
  },
  verticalAlign: {
    options: {
      top: 'top',
      middle: 'middle',
      bottom: 'bottom'
    }
  },
  position: {
    options: posList.reduce(function (map, pos) {
      map[pos] = pos;
      return map;
    }, {})
  },
  distance: {
    min: 0,
    max: 100
  }
};
app.config = {
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
  onChange: function () {
    const labelOption = {
      rotate: app.config.rotate,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      position: app.config.position,
      distance: app.config.distance
    };
    myChart.setOption({
      series: [
        {
          label: labelOption
        },
        {
          label: labelOption
        },
        {
          label: labelOption
        },
        {
          label: labelOption
        },
        {
          label: labelOption
        },
        {
          label: labelOption
        }
      ]
    });
  }
};
const labelOption = {
  show: true,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {}
  }
};
export default {
    data() {
        return {
            echartsOption: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                },
                },
                title: {
                    text: '访问量'
                },
                legend: {
                    data: ['本地', '外地', 'EDP', '业财', 'ad域']
                },
                dataZoom: {
                    dataType: 'slider',
                    start: 0,
                    end: 100
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack'] },
                    restore: { show: true },
                    saveAsImage: { show: true },
                    myButton: {
                        show: true,
                        title: '下载为Excel',
                        icon: 'path://M1006.933333 85.333333H580.266667V34.133333c0-6.826667-3.413333-10.24-6.826667-13.653333s-10.24-3.413333-13.653333-3.413333l-546.133334 136.533333c-6.826667 3.413333-13.653333 10.24-13.653333 17.066667v716.8c0 6.826667 6.826667 13.653333 13.653333 17.066666l546.133334 102.4h3.413333c3.413333 0 6.826667 0 10.24-3.413333 3.413333-3.413333 6.826667-6.826667 6.826667-13.653333v-51.2h426.666666c10.24 0 17.066667-6.826667 17.066667-17.066667V102.4c0-10.24-6.826667-17.066667-17.066667-17.066667z m-17.066666 682.666667h-238.933334v-102.4h238.933334v102.4zM174.08 672.426667l92.16-153.6c3.413333-6.826667 3.413333-13.653333 0-17.066667l-92.16-153.6C170.666667 344.746667 170.666667 341.333333 170.666667 337.92s3.413333-6.826667 6.826666-10.24c6.826667-3.413333 17.066667-3.413333 23.893334 6.826667L273.066667 457.386667c6.826667 10.24 23.893333 10.24 30.72 0L375.466667 334.506667c3.413333-6.826667 17.066667-10.24 23.893333-6.826667 6.826667 0 10.24 6.826667 10.24 10.24 0 3.413333 0 10.24-3.413333 13.653333l-92.16 153.6c-3.413333 6.826667-3.413333 13.653333 0 17.066667l92.16 153.6c3.413333 3.413333 3.413333 6.826667 3.413333 10.24s-3.413333 6.826667-6.826667 10.24c-6.826667 3.413333-17.066667 3.413333-23.893333-6.826667L307.2 566.613333c-3.413333-6.826667-10.24-6.826667-13.653333-6.826666s-10.24 3.413333-13.653334 6.826666l-71.68 122.88c-3.413333 6.826667-17.066667 10.24-23.893333 6.826667-10.24 0-13.653333-3.413333-13.653333-10.24 0-3.413333 0-6.826667 3.413333-13.653333zM580.266667 529.066667h136.533333v102.4h-136.533333v-102.4z m0-34.133334v-102.4h136.533333v102.4h-136.533333z m170.666666-102.4h238.933334v102.4h-238.933334v-102.4z m238.933334-34.133333h-238.933334v-102.4h238.933334v102.4z m-273.066667 0h-136.533333v-102.4h136.533333v102.4z m-136.533333 307.2h136.533333v102.4h-136.533333v-102.4z m170.666666-34.133333v-102.4h238.933334v102.4h-238.933334z m238.933334-512v102.4h-238.933334v-102.4h238.933334z m-273.066667 0v102.4h-136.533333v-102.4h136.533333z m-136.533333 682.666666h136.533333v102.4h-136.533333v-102.4z m409.6 102.4h-238.933334v-102.4h238.933334v102.4z', // 这里是 SVG 路径
                        onclick: function(){
                            // 这里是点击按钮时的回调函数
                            exportWebsiteCountStatistics().then(res => {
                                exportExcel({response: res})
                            })
                        }
                    }
                }
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: { show: false },
                        data: ['sword','saber','saber3','rider']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '本地',
                        type: 'bar',
                        barGap: 0,
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [123,432,454,65,7]
                    },
                    {
                        name: '外地',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [543,76,7,754,4]
                    },
                    {
                        name: 'EDP',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [4324,5643,765,7676,5345]
                    },
                    {
                        name: '业财',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [2344,432,5435,653,6574]
                    },
                    {
                        name: 'ad域',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [324,234,435,423,443]
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
            var chartDom = document.getElementById('echarts');
            this.myChart = echarts.init(chartDom);
            this.myChart.setOption(this.echartsOption)
        },
    }
}
</script>

<style>

</style>