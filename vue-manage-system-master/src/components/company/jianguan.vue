<template>
  <div>
    <!-- 查询模块 -->
    <div>
      <el-form :inline='true' align='left' label-width='80px'>
        <el-form-item label='企业名称'>
          <el-input v-model="entName" style='width: 436px'></el-input> </el-form-item
        >
        <el-form-item label='认证状态'>
          <el-select v-model='status' placeholder='全部'>
            <el-option
              v-for='item in statuses'
              :key='item.value'
              :label='item.label'
              :value='item.value'
            ></el-option>
          </el-select>
        </el-form-item><br/>
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
        <el-form-item label='注册地点'>
          <v-distpicker province="江西省" :province-disabled="true" @province="changeProvince" @city="changeCity" @area="changeArea"></v-distpicker>
        </el-form-item><br />
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
        <el-button type='primary' @click="submitForm">查询</el-button>
      </el-form>
    </div>
    <!-- 结果表 -->
    <div>
      <el-table :data='resultList' style='width: 100%'>
        <el-table-column prop='id' label='序号' width='50px'>
        </el-table-column>
        <el-table-column prop='name' label='企业名称' width='200px'>
        </el-table-column>
        <el-table-column prop='type' label='所属行业' width='180px'>
        </el-table-column>
        <el-table-column prop='date' label='成立时间' width='180px'>
        </el-table-column>
        <el-table-column prop='size' label='性质及规模' width='180px'>
        </el-table-column>
        <el-table-column prop='address' label='注册地址' width='300px'>
        </el-table-column>
        <el-table-column prop='_status' label='认证状态' width='100px'>
        </el-table-column>
        <el-table-column prop='money' label='注册资本(万元)' width='180px'>
        </el-table-column>
        <el-table-column label='操作' width="auto">
          <el-button type='primary'>立即报告</el-button>
          <el-button type='primary'>取消入驻</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        small
        layout='prev, pager, next'
        :total='resultList.length'
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  components: { VDistpicker },
  data () {
    return {
      province: '',
      city: '',
      area: '',
      statuses: [{
          value: '已认证',
          label: '已认证'
        },
        {
          value: '未认证',
          label: '未认证'
        }],
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
      status: '',
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
          name: '鄂尔多斯市蒙冠祥体育产业发展有限责任公司',
          type: '体育',
          date: '2019-12-26',
          size: '其它|小型',
          address: '内蒙古自治区鄂尔多斯市达拉特旗树林召镇新华路西、南园街北，万通家和商务写字楼9层907室',
          money: 100,
          _status: '已认证'
        },{
          id: 2,
          name: '青岛安顺畅起重吊装有限公司',
          type: '建筑装饰和其他建筑业',
          date: '2019-12-26',
          size: '其它|微型',
          address: '山东省青岛市即墨区蓝村镇庆余屯村前',
          money: 200,
          _status: '已认证'
        },{
          id: 3,
          name: '青岛云栖安澜民宿管理有限公司',
          type: '商务服务业',
          date: '2019-12-26',
          size: '其它|小型',
          address: '山东省青岛市崂山区王哥庄街道雕龙嘴社区26号',
          money: 100,
          _status: '已认证'
        },{
          id: 4,
          name: '内蒙古尚辉商贸有限公司',
          type: '批发业',
          date: '2019-12-26',
          size: '其它|微型',
          address: '内蒙古自治区鄂尔多斯市东胜区煤炭大厦1710',
          money: 100,
          _status: '已认证'
        },{
          id: 5,
          name: '新视线纺织科技（苏州）有限公司',
          type: '研究和试验发展',
          date: '2019-12-26',
          size: '其它|中型',
          address: '张家港市塘桥镇北京路8号1幢',
          money: 500,
          _status: '已认证'
        },{
          id: 6,
          name: '峡江茂升人力资源有限公司',
          type: '商务服务业',
          date: '2019-12-26',
          size: '其它|微型',
          address: '江西省吉安市峡江县承天路以南九号商住房二楼（第二层）',
          money: 0,
          _status: '已认证'
        },{
          id: 7,
          name: '青岛盛世云创科技有限公司',
          type: '软件和信息技术服务业',
          date: '2019-12-26',
          size: '其它|微型',
          address: '山东省青岛市李沧区台柳路637号23号楼5单元601户',
          money: 30,
          _status: '已认证'
        },{
          id: 8,
          name: '莱西市舍丰企业管理服务中心',
          type: '商务服务业',
          date: '2019-12-26',
          size:'其它|微型',
          address: '山东省青岛市莱西市河头店镇小莱路南工业园430号',
          money: 0,
          _status: '已认证'
        },{
          id: 9,
          name: '宁波市奉化区贸瓴机械租赁经营部',
          type: '批发业',
          date: '2019-12-26',
          size: '其它|微型',
          address: '浙江省宁波市奉化区锦屏街道长汀路168号105#(自主申报）',
          money: 0,
          _status: '已认证'
        },{
          id: 10,
          name: '青岛欣荣晟源项目管理有限公司',
          type: '房屋建筑业',
          date: '2019-12-26',
          size: '其它|微型',
          address: '山东省青岛市崂山区同兴路677号5号楼1单元1501户',
          money: 50,
          _status: '已认证'
        }]
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
      const that = this
      var address = this.province + this.city + this.area
      console.log('企业名称：' + this.entName)
      console.log('所属行业:' + this.industry1 + ' ' + this.industry2)
      console.log('企业性质：' + this.propList)
      console.log('企业规模:' + this.sizeList)
      console.log('注册时间:' + this.timeList)
      console.log('注册资金:' + this.moneys)
      console.log('企业地址：' + address)
      /* this.$axios({
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
      }) */
    }
  },
  mounted: function () {
    const that = this
    console.log("Init--->GetData")
    /* this.$axios({
      method: 'get',
      url: 'http://localhost:8083/getParams'
    }).then((response) => {
      console.log(response)
      that.trades = response.data.trades
    }).catch((msg) => {
      alert(msg)
    }) */
  }
}
</script>

<style scoped>
</style>
