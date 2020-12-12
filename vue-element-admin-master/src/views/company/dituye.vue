<template>
  <div>
    <span id='pageHead'><h1>招商雷达</h1></span><br />
    <!-- 查询模块 -->
    <div>
      <el-form :inline='true' align='left' label-width='80px'>
        <el-form-item label='企业名称'>
          <el-input v-model="entName" style='width: 436px'></el-input> </el-form-item
        ><br />
        <el-form-item label='所属行业'>
          <el-select v-model='industry1' placeholder='全部'>
            <el-option
              v-for='item in trades'
              :key='item.value'
              :label='item.label'
              :value='item.value'
            ></el-option>
          </el-select>
          <el-select v-model='industry2' placeholder='全部'>
            <el-option
              v-for='item in trades'
              :key='item.value'
              :label='item.label'
              :value='item.value'
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 区域选择模块：使用v-distpicker插件 -->
        <el-form-item label='所属区域'>
          <v-distpicker province="江西省" :province-disabled="true" @province="changeProvince" @city="changeCity" @area="changeArea"></v-distpicker>
        </el-form-item><br />
        <el-form-item label='企业性质'>
          <el-checkbox-group v-model='propList'>
            <el-checkbox label='国有' value="test"></el-checkbox>
            <el-checkbox label='民营' value="test"></el-checkbox>
            <el-checkbox label='三资' value="test"></el-checkbox>
            <el-checkbox label='其他'></el-checkbox>
          </el-checkbox-group> </el-form-item
        ><br />
        <el-form-item label='企业规模'>
          <el-checkbox-group v-model='sizeList'>
            <el-checkbox label='大型'></el-checkbox>
            <el-checkbox label='中型'></el-checkbox>
            <el-checkbox label='小型'></el-checkbox>
            <el-checkbox label='微型'></el-checkbox>
          </el-checkbox-group> </el-form-item
        ><br />
        <el-form-item label='成立时间'>
          <el-checkbox-group v-model='timeList'>
            <el-checkbox label='1年内'></el-checkbox>
            <el-checkbox label='1-3年'></el-checkbox>
            <el-checkbox label='3-5年'></el-checkbox>
            <el-checkbox label='5-7年'></el-checkbox>
            <el-checkbox label='7-10年'></el-checkbox>
            <el-checkbox label='10年以上'></el-checkbox>
          </el-checkbox-group> </el-form-item
        ><br />
        <el-form-item label='注册资本'>
          <el-checkbox-group v-model='moneys'>
            <el-checkbox label='0-100万'></el-checkbox>
            <el-checkbox label='100-500万'></el-checkbox>
            <el-checkbox label='500-1000万'></el-checkbox>
            <el-checkbox label='1000-5000万'></el-checkbox>
            <el-checkbox label='5000万以上'></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-button type='primary' @click="submitForm">查询</el-button>
      </el-form>
    </div>
    <!-- 地图 -->
    <div>
      <div id="left" ref="china"></div>
      <div id="right">
        <div id="right_top">
          <div id="top_1" ref="top_1"></div>
          <div id="top_2" ref="top_2"></div>
        </div>
        <div id="right_bottom">
          <div id="bottom_1" ref="bottom_1"></div>
          <div id="bottom_2" ref="bottom_2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import chinaJson from './chinaJson.json'
var ltopdata = [
  {
    name: '北京',
    value: 4850
  },
  {
    name: '天津',
    value: 3642
  },
  {
    name: '上海',
    value: 5357
  },
  {
    name: '重庆',
    value: 1532
  },
  {
    name: '河北',
    value: 1543
  },
  {
    name: '河南',
    value: 1587
  },
  {
    name: '云南',
    value: 1753
  },
  {
    name: '辽宁',
    value: 1153
  },
  {
    name: '黑龙江',
    value: 1434
  },
  {
    name: '湖南',
    value: 1357
  },
  {name: '北京市', value: 3974},
  {name: '天津市', value: 4081},
  {name: '河北省', value: 1347},
  {name: '山西省', value: 3796},
  {name: '内蒙古自治区', value: 1992},
  {name: '辽宁省', value: 1662},
  {name: '吉林省', value: 4028},
  {name: '黑龙江省', value: 1888},
  {name: '上海市', value: 2730},
  {name: '江苏省', value: 4929},
  {name: '浙江省', value: 3311},
  {name: '安徽省', value: 4660},
  {name: '福建省', value: 3094},
  {name: '江西省', value: 4356},
  {name: '山东省', value: 4772},
  {name: '河南省', value: 4272},
  {name: '湖北省', value: 2911},
  {name: '湖南省', value: 3565},
  {name: '广东省', value: 3809},
  {name: '广西壮族自治区', value: 4368},
  {name: '海南省', value: 3818},
  {name: '重庆市', value: 1716},
  {name: '四川省', value: 4595},
  {name: '贵州省', value: 3721},
  {name: '云南省', value: 2117},
  {name: '西藏自治区', value: 3921},
  {name: '陕西省', value: 1849},
  {name: '甘肃省', value: 4101},
  {name: '青海省', value: 1666},
  {name: '宁夏回族自治区', value: 3620},
  {name: '新疆维吾尔自治区', value: 2330},
  {name: '香港', value: 3674},
  {name: '澳门', value: 1501},
  {name: '台湾省', value: 2987},
  {name: '南海诸岛', value: 3796}
]
export default {
  components: { VDistpicker },

  data () {
    return {
      province: '',
      city: '',
      area: '',
      trades: [
        {
          value: 'guoyou',
          label: '国有'
        },
        {
          value: 'minying',
          label: '民营'
        },
        {
          value: 'sanzi',
          label: '三资'
        },
        {
          value: 'qita',
          label: '其他'
        }
      ],
      entName: '',
      areas: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        }
      ],
      propList: [],
      sizeList: [],
      industry1: '',
      industry2: '',
      datesList: [],
      moneys: [],
      timeList: [],
      displayResult: false,
      resultList: [{
        id: 1,
        name: '河北信誉创意文化有限公司',
        type: '广播、电视、电影',
        date: '2019-12-27',
        size: '其他|小型',
        money: '100',
        address: '河北省保定市莲池区三丰路'
      }],
      oroptionmapjsonr: {
        title: {
          text: '符合条件公司分布'
        },
        textStyle: {
          color: '#9cbfde',
          fontSize: 10.67
        },
        color: ['#fff'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}个'
        },
        legend: {
          show: false
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        roamController: {
          show: true,
          x: 'right',
          mapTypeControl: {
            'china': true
          }
        },
        series: [{
          name: '符合条件公司',
          type: 'map',
          mapType: 'china',
          roam: false,
          left: '25%',
          top: '25%',
          // zoom: 1,
          center: [115.97, 29.71],
          // aspectScale:1,
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              areaColor: '#fff',
              borderColor: '#41c7db ',
              borderWidth: 1
            },
            emphasis: {
              areaColor: '#41c7db '
            }
          },
          data: ltopdata
        }]
      }
    }
  },
  methods: {
    changeProvince (a) {
      this.province = a.value
    },
    changeCity (a) {
      this.city = a.value
    },
    changeArea (a) {
      this.area = a.value
    },
    submitForm: function () {
      var address = this.province + this.city + this.area
      console.log('企业名称：' + this.entName)
      console.log('所属行业:' + this.industry1 + ' ' + this.industry2)
      console.log('企业性质：' + this.propList)
      console.log('企业规模:' + this.sizeList)
      console.log('注册时间:' + this.timeList)
      console.log('注册资金:' + this.moneys)
      console.log('企业地址：' + address)
      /*  this.$axios({
        method: 'POST',
        url: 'http://gateway.bulldog.wang:8888/api/mugang/company/select',
        data: {
          'comName': that.entName,
          'comIndustry': that.industry1,
          industry2: that.industry2,
          'propList': that.propList,
          'sizeList': that.sizeList,
          'timeList': that.timeList,
          'moneyList': that.moneys,
          'address': that.address
        }
      }).then((response) => {
        console.log(response)
        that.resultList = response.data.list
        that.displayResult = true
      }).catch((msg) => {
      })  */
    },
    initChart1 () {
      this.$echarts.registerMap('china', chinaJson)
      var oroptionmapjsonrCharts = this.$echarts.init(this.$refs.china)
      oroptionmapjsonrCharts.setOption(this.oroptionmapjsonr)
    },
    initChart2 () {
      let chart = this.$echarts.init(this.$refs.top_1)
      chart.setOption({
        title: {
          text: '年龄分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['1-3年', '1年内']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: 234, name: '1-3年'},
            {value: 135, name: '1年内'}]
        }]
      })
    },
    initChart3 () {
      let chart = this.$echarts.init(this.$refs.top_2)
      chart.setOption({
        title: {
          text: '资本分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['1000-5000万', '5000万以上', '100万以下']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: 310, name: '1000-5000万'},
            {value: 234, name: '5000万以上'},
            {value: 135, name: '100万以下'}]
        }]
      })
    },
    initChart4 () {
      let chart = this.$echarts.init(this.$refs.bottom_1)
      chart.setOption({
        title: {
          text: '规模分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['小型', '中型']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: 234, name: '小型'},
            {value: 135, name: '中型'}
          ]
        }]
      })
    },
    initChart5 () {
      let chart = this.$echarts.init(this.$refs.bottom_2)
      chart.setOption({
        title: {
          text: '地域分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['浙江省', '江西省', '广东省', '北京市', '其他']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: 335, name: '浙江省'},
            {value: 310, name: '北京市'},
            {value: 234, name: '江西省'},
            {value: 135, name: '广东省'},
            {value: 1548, name: '其他'}]
        }]
      })
    }
  },
  mounted: function () {
    this.initChart1()
    this.initChart2()
    this.initChart3()
    this.initChart4()
    this.initChart5()
  }
}
</script>

<style scoped>
#pageHead {
  position: absolute;
  transform: translateY(-70px);
  font-family: '楷体';
  margin-top: 10px;
}
#left {
  width: 800px;
  height: 600px;
  float: left;
}
#right {
  width: 800px;
  height: 600px;
  float: right;
}
#right_top {
  width: 800px;
  height: 298px;
}
#right_bottom {
  width: 800px;
  height: 298px;
}
#top_1 {
  float: left;
  width: 390px;
  height: 290px;
}
#top_2 {
  float: right;
  width: 390px;
  height: 290px;
}
#bottom_1 {
  float: left;
  width: 390px;
  height: 290px;
}
#bottom_2 {
  float: right;
  width: 390px;
  height: 290px;
}
</style>
