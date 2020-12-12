<template>
  <div>
    <span id='pageHead'><h1>入驻评估</h1></span><br />
    <!-- 查询模块 -->
    <div>
      <el-form ref="selectForm" :inline='true' align='left' label-width='80px'>
        <el-form-item label='所属行业'>
          <el-select v-model='value1' placeholder='全部'>
            <el-option
              v-for='item in trades'
              :key='item.value'
              :label='item.label'
              :value='item.value'
            ></el-option>
          </el-select>
          <el-form-item label='行业大类'>
            <el-select v-model='value2' placeholder='全部'>
                <el-option
                v-for='item in types'
                :key='item.value'
                :label='item.label'
                :value='item.value'
                ></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item label='关注状态'>
          <el-select v-model='value3' placeholder='全部'>
            <el-option
              v-for='item in statuss'
              :key='item.value'
              :label='item.label'
              :value='item.value'>
            </el-option>
          </el-select>
        </el-form-item><br/>
        <el-form-item label='企业名称'>
          <el-input style='width: 436px' v-model="companyName" placeholder='请输入企业名称'></el-input>
        </el-form-item>
        <el-form-item label="申请时间">
            <el-date-picker
                v-model="pleaseTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item><br />
        <el-row id="btn_div">
            <el-button type='info' @click="resetForm('selectForm')" id="resetBtn" plain>重置</el-button>
            <el-button type='primary' @click="submitForm('selectForm')">查询</el-button>
        </el-row>
      </el-form>
    </div>
    <!-- 结果表 -->
    <div>
      <el-table :data='resultList' style='width: 100%'>
        <el-table-column prop='id' label='序号' width='100px'>
        </el-table-column>
        <el-table-column prop='name' label='企业名称' width='300px'>
        </el-table-column>
        <el-table-column prop='type' label='行业门类' width='300px'>
        </el-table-column>
        <el-table-column prop='bigType' label='行业大类' width='300px'>
        </el-table-column>
        <el-table-column prop='date' label='申请时间' width='300px'>
        </el-table-column>
        <el-table-column prop='_status' label='关注状态' width='180px'>
        </el-table-column>
        <el-table-column label='查看详细'>
          <el-button type='primary'>招商报告</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      value1: '',
      value2: '',
      value3: '',
      companyName: '',
      pleaseTime: '',
      types: [
        {
          value: '1',
          label: '电子信息'
        },
        {
          value: '2',
          label: '软件产业'
        },
        {
          value: '3',
          label: '银行'
        }
      ],
      statuss: [
        {
          value: '0',
          label: '未关注'
        },
        {
          value: '1',
          label: '已关注'
        }
      ],
      displayResult: false,
      resultList: [
        {
          id: 1,
          name: '上海柯娉商务咨询有限公司',
          type: '商务服务业',
          date: '2020-01-10',
          bigType: '其它|微型',
          money: '200',
          address: '上海市虹口区东大名路391-393号（单号）4层（集中登记地）',
          _status: '未认证'
        },
        {
          id: 2,
          name: '济南鑫成智能机械科技有限公司',
          type: '批发业',
          date: '2020-01-08',
          bigType: '其它|小型',
          money: '51',
          address: '山东省济南市天桥区蓝翔路卢庄市场3号楼402-60',
          _status: '未认证'
        },
        {
          id: 3,
          name: '山东华源铁塔有限公司',
          type: '批发业',
          date: '2020-01-06',
          bigType: '其它|微型',
          money: '6100',
          address: '山东省潍坊市昌乐县营丘镇崖头工业园华盛路3号06栋',
          _status: '未认证'
        },
        {
          id: 4,
          name: '青岛锦泰翔企业服务有限公司',
          type: '商务服务业',
          date: '2019-12-28',
          bigType: '其它|小型',
          money: '100',
          address: '山东省青岛市黄岛区唐岛湾路228号',
          _status: '未认证'
        },
        {
          id: 5,
          name: '陕西福顺亿沅物资有限公司',
          type: '批发业',
          date: '2019-12-27',
          bigType: '其它|微型',
          money: '200',
          address: '陕西省榆林市榆阳区红山东路民生家园二号楼三单元5号商铺',
          _status: '未认证'
        },
        {
          id: 6,
          name: '山东仁源标准化服务有限公司',
          type: '商务服务业',
          date: '2019-12-27',
          bigType: '其他|小型',
          money: '300',
          address: '山东省青岛市城阳区城阳街道艳阳路111号',
          _status: '未认证'
        },
        {
          id: 7,
          name: '宁波海曙尤看运动医学诊所有限公司',
          type: '卫生',
          date: '2019-12-27',
          bigType: '其他|小型',
          money: '100',
          address: '浙江省宁波市海曙区高桥镇汇贤路388号商会大厦一楼362号、372-2号',
          _status: '未认证'
        },
        {
          id: 8,
          name: '内蒙古荣先建筑工程有限公司',
          type: '建筑装饰和其他建筑业',
          date: '2019-12-27',
          bigType: '其他|小型',
          money: '300',
          address: '内蒙古自治区包头市青山区民主路6号街坊科学路5号宝林苑4-901',
          _status: '未认证'
        },
        {
          id: 9,
          name: '江苏琦艺建筑劳务有限公司',
          type: '房屋建筑业',
          date: '2019-12-27',
          bigType: '其他|小型',
          money: '1000',
          address: '海安高新区江海西路86号',
          _status: '未认证'
        },
        {
          id: 10,
          name: '佛山市一方径达商贸有限公司',
          type: '批发业',
          date: '2019-12-27',
          bigType: '其他|微型',
          money: '108',
          address: '佛山市南海区大沥镇广佛公路盐步路段广东南国小商品城东区三街3号首层商铺（住所申报）',
          _status: '未认证'
        }
      ]
    }
  },
  methods: {
    submitForm: function(formName) {
      console.log('提交表单！')
      this.displayResult = true
    },
    resetForm: function(formName) {
      console.log('重置表单！')
      this.value1 = ''
      this.value2 = ''
      this.value3 = ''
      this.companyName = ''
      this.pleaseTime = ''
      this.displayResult = false
    }
  }
}
</script>

<style scoped>
#pageHead {
  position: absolute;
  transform: translateY(-70px);
  font-family: 'Microsoft JhengHei';
  margin-top: 10px;
}
#btn_div {
  margin-left: 4%;
}
#resetBtn {
  margin-right: 50px;
}
</style>
