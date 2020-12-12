<template>
  <div style="width: '100%',height: '1080px'">
    <div id="left">
      <div id="left_top" ref="left_chart1">
      </div>
      <div id="left_center" ref="left_chart2"></div>
      <div id="left_bottom" ref="left_chart3"></div>
    </div>
    <div id="center">
      <div id="center_top">
        <nav style="height: '10px'"><h2>智慧江西产业图谱</h2></nav>
        <nav style="height: '10px'">
          <el-select v-model="selected_val" placeholder="电子信息" @change="changeOption">
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </nav>
        <img src="../../assets/img/1.png" alt="江西省地图" width="680px" height="650px">
      </div>
      <div id="center_bottom" ref="center_chart"></div>
    </div>
    <div id="right">
      <div id="right_top">
        <nav style="height: '10px'"><h2>全省 TOP 20企业名单</h2></nav>
        <GeminiScrollbar class="my-scroll-bar">
          <div>
            <p :key="index" v-for="(i,index) in 20">{{ i }}</p>
          </div>
        </GeminiScrollbar>
      </div>
      <div id="right_center" ref="right_center_chart"></div>
      <div id="right_bottom" ref="right_bottom_chart"></div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      initChart1 () {
        var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放']
        var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
        var yMax = 500
        var dataShadow = []
        for (var i = 0; i < data.length; i++) {
          dataShadow.push(yMax)
        }
        let left_chart1 = this.$echarts.init(this.$refs.left_chart1)
        left_chart1.setOption({
        title: {
          text: '全国产业排名',
          left: 'center'
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
              color: 'rgba(0,0,0,0.05)'
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false
        },
        {
          type: 'bar',
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#188df0'}
              ]
            )
          },
          emphasis: {
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                ]
              )
            }
          },
          data: data
        }]
      })
      var zoomSize = 6;
      left_chart1.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        left_chart1.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
      })
      },
      initChart2 () {
        let chart2 = this.$echarts.init(this.$refs.left_chart2)
        chart2.setOption({
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          title: {
            left: 'center',
            text: '产业占比分布'
          },
          legend: {
              orient: 'vertical',
              left: -10,
              data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
          },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  selectedMode: 'single',
                  radius: [0, '30%'],

                  label: {
                      position: 'inner'
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                      {value: 335, name: '直达', selected: true},
                      {value: 679, name: '营销广告'},
                      {value: 1548, name: '搜索引擎'}
                  ]
              },
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['40%', '55%'],
                  label: {
                      formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                      backgroundColor: '#eee',
                      borderColor: '#aaa',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                          a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                          },
                          hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                          },
                          b: {
                              fontSize: 16,
                              lineHeight: 33
                          },
                          per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                          }
                      }
                  },
                  data: [
                      {value: 335, name: '直达'},
                      {value: 310, name: '邮件营销'},
                      {value: 234, name: '联盟广告'},
                      {value: 135, name: '视频广告'},
                      {value: 1048, name: '百度'},
                      {value: 251, name: '谷歌'},
                      {value: 147, name: '必应'},
                      {value: 102, name: '其他'}
                  ]
              }
          ]
        })
      },
      initChart3 () {
        let chart3 = this.$echarts.init(this.$refs.left_chart3)
        chart3.setOption({
          title: {
              text: '企业规模分析与预估',
              left: 'center',
              top: 0
          },
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
              feature: {
                  dataView: {readOnly: false},
                  restore: {}
              }
          },
          legend: {
              data: ['展现','点击','访问','咨询','订单'],
              top: 25
          },
          series: [
              {
                  name: '预期',
                  type: 'funnel',
                  left: '10%',
                  width: '80%',
                  label: {
                      formatter: '{b}预期'
                  },
                  labelLine: {
                      show: false
                  },
                  itemStyle: {
                      opacity: 0.7
                  },
                  emphasis: {
                      label: {
                          position: 'inside',
                          formatter: '{b}预期: {c}%'
                      }
                  },
                  data: [
                      {value: 60, name: '访问'},
                      {value: 40, name: '咨询'},
                      {value: 20, name: '订单'},
                      {value: 80, name: '点击'},
                      {value: 100, name: '展现'}
                  ]
              },
              {
                  name: '实际',
                  type: 'funnel',
                  left: '10%',
                  width: '80%',
                  maxSize: '80%',
                  label: {
                      position: 'inside',
                      formatter: '{c}%',
                      color: '#fff'
                  },
                  itemStyle: {
                      opacity: 0.5,
                      borderColor: '#fff',
                      borderWidth: 2
                  },
                  emphasis: {
                      label: {
                          position: 'inside',
                          formatter: '{b}实际: {c}%'
                      }
                  },
                  data: [
                      {value: 30, name: '访问'},
                      {value: 10, name: '咨询'},
                      {value: 5, name: '订单'},
                      {value: 50, name: '点击'},
                      {value: 80, name: '展现'}
                  ]
              }
          ]
        })
      },
      initChart4 () {
        let chart4 = this.$echarts.init(this.$refs.center_chart)
        chart4.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
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
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '百度',
                type: 'bar',
                barWidth: 8,
                stack: '搜索引擎',
                data: [620, 732, 701, 734, 1090, 1130, 1120]
            },
            {
                name: '谷歌',
                type: 'bar',
                stack: '搜索引擎',
                data: [120, 132, 101, 134, 290, 230, 220]
            },
            {
                name: '必应',
                type: 'bar',
                stack: '搜索引擎',
                data: [60, 72, 71, 74, 190, 130, 110]
            },
            {
                name: '其他',
                type: 'bar',
                stack: '搜索引擎',
                data: [62, 82, 91, 84, 109, 110, 120]
            }
        ]
        })
      },
      initChart5 () {
        let chart5 = this.$echarts.init(this.$refs.right_center_chart)
        chart5.setOption({
          title: {
            text: '产业各项指数',
            left: 'center',
            top: -4
          },
          angleAxis: {
          },
          radiusAxis: {
              type: 'category',
              data: ['周一', '周二', '周三', '周四'],
              z: 10
          },
          polar: {
          },
          grid: {
            bottom: 3
          },
          series: [{
              type: 'bar',
              data: [1, 2, 3, 4],
              coordinateSystem: 'polar',
              name: 'A',
              stack: 'a'
          }, {
              type: 'bar',
              data: [2, 4, 6, 8],
              coordinateSystem: 'polar',
              name: 'B',
              stack: 'a'
          }, {
              type: 'bar',
              data: [1, 2, 3, 4],
              coordinateSystem: 'polar',
              name: 'C',
              stack: 'a'
          }],
          legend: {
              show: true,
              data: ['A', 'B', 'C'],
              left: 'left'
          }
        })
      },
      initChart6 () {
        let chart6 = this.$echarts.init(this.$refs.right_bottom_chart)
        chart6.setOption({
          title: {
              text: '产业增长数据',
              left: 'center',
              top: -3
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
              data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
              top: 25
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
                  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              }
          ],
          yAxis: [
              {
                  type: 'value'
              }
          ],
          series: [
              {
                  name: '邮件营销',
                  type: 'line',
                  stack: '总量',
                  areaStyle: {},
                  data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                  name: '联盟广告',
                  type: 'line',
                  stack: '总量',
                  areaStyle: {},
                  data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                  name: '视频广告',
                  type: 'line',
                  stack: '总量',
                  areaStyle: {},
                  data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                  name: '直接访问',
                  type: 'line',
                  stack: '总量',
                  areaStyle: {},
                  data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                  name: '搜索引擎',
                  type: 'line',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'top'
                      }
                  },
                  areaStyle: {},
                  data: [820, 932, 901, 934, 1290, 1330, 1320]
              }
          ]
        })
      },
      changeOption (e) {
        console.log(e)
      }
    },
    mounted () {
      this.initChart1()
      this.initChart2()
      this.initChart3()
      this.initChart4()
      this.initChart5()
      this.initChart6()
    },
    data () {
      return {
        selected_val: {value: '电子信息'},
        options: [
          {value :'电子信息'},{value: '纺织服装'},{value: '钢铁'},{value: '航空'},{value: '绿色食品'},{value: '汽车'},{value: '生物医药'},{value: '网络信息安全'},{value: '现代家具'},{value: '虚拟现实'},{value: '有色'}
        ],
        pageData: [
          {
            value: '电子信息',
            legend_data: [],
          }
        ]
      }
    }
  }
</script>

<style scoped>
#left {
  width: 30%;
  height: 1080px;
  float: left;
}
#center {
  width: 40%;
  height: 1080px;
  float: left;
}
#right {
  width: 30%;
  height: 1080px;
  float: right;
}
#left_top {
  height: 370px;
  width: 100%;
}
#left_center {
  margin-top: 5px;
  height: 370px;
  width: 100%;
}
#left_bottom {
  margin-top: 5px;
  height: 370px;
  width: 100%;
}
#center_top {
  height: 710px;
}
#center_bottom {
  margin-top: 10px;
  height: 350px;
}
#right_top {
  height: 250px;
  width: 100%;
}
#right_center {
  margin-top: 50px;
  height: 360px;
  width: 100%;
}
#right_bottom {
  margin-top: 50px;
  height: 360px;
  width: 100%;
}
h2 {
  text-align: center;
}
nav {
  text-align: center;
}
.my-scroll-bar {
  background-color: #ff789f;
  height: 190px;
}
.gm-scrollbar.-vertical {
  background-color: #f0f0f0;
}
.gm-scrollbar.-horizontal {
  background-color: transparent;
}
.gm-scrollbar .thumb {
  background-color: rebeccapurple;
}
.gm-scrollbar .thumb:hover {
  background-color: fuchsia;
}
</style>