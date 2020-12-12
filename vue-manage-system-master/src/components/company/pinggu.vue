<template>
<div>
    <!-- <span id='pageHead'><h1>入驻评估</h1></span><br /> -->
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
        <el-table-column prop='type' label='行业门类' width='180px'>
        </el-table-column>
        <el-table-column prop='bigType' label='行业大类' width='300px'>
        </el-table-column>
        <el-table-column prop='date' label='申请时间' width='300px'>
        </el-table-column>
        <el-table-column prop='status' label='关注状态' width='180px'>
        </el-table-column>
        <el-table-column label='查看详细'>
          <el-button type='primary'>招商报告</el-button>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <el-button type='success' style="float: 'left'">通过</el-button><el-button type='primary' style="float: 'right'">拒绝</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
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
          name: '鄂尔多斯市蒙冠祥体育产业发展有限责任公司',
          type: '体育',
          date: '2019-12-26',
          bigType: '其它|小型',
          address: '内蒙古自治区鄂尔多斯市达拉特旗树林召镇新华路西、南园街北，万通家和商务写字楼9层907室',
          money: 100,
          status: '已关注'
        },{
          id: 2,
          name: '青岛安顺畅起重吊装有限公司',
          type: '建筑装饰和其他建筑业',
          date: '2019-12-26',
          bigType: '其它|微型',
          address: '山东省青岛市即墨区蓝村镇庆余屯村前',
          money: 200,
          status: '已关注'
        },{
          id: 3,
          name: '青岛云栖安澜民宿管理有限公司',
          type: '商务服务业',
          date: '2019-12-26',
          bigType: '其它|小型',
          address: '山东省青岛市崂山区王哥庄街道雕龙嘴社区26号',
          money: 100,
          status: '已关注'
        },{
          id: 4,
          name: '内蒙古尚辉商贸有限公司',
          type: '批发业',
          date: '2019-12-26',
          bigType: '其它|微型',
          address: '内蒙古自治区鄂尔多斯市东胜区煤炭大厦1710',
          money: 100,
          status: '已关注'
        },{
          id: 5,
          name: '新视线纺织科技（苏州）有限公司',
          type: '研究和试验发展',
          date: '2019-12-26',
          bigType: '其它|中型',
          address: '张家港市塘桥镇北京路8号1幢',
          money: 500,
          status: '已关注'
        },{
          id: 6,
          name: '峡江茂升人力资源有限公司',
          type: '商务服务业',
          date: '2019-12-26',
          bigType: '其它|微型',
          address: '江西省吉安市峡江县承天路以南九号商住房二楼（第二层）',
          money: 0,
          status: '已关注'
        },{
          id: 7,
          name: '青岛盛世云创科技有限公司',
          type: '软件和信息技术服务业',
          date: '2019-12-26',
          bigType: '其它|微型',
          address: '山东省青岛市李沧区台柳路637号23号楼5单元601户',
          money: 30,
          status: '已关注'
        },{
          id: 8,
          name: '莱西市舍丰企业管理服务中心',
          type: '商务服务业',
          date: '2019-12-26',
          bigType:'其它|微型',
          address: '山东省青岛市莱西市河头店镇小莱路南工业园430号',
          money: 0,
          status: '已关注'
        },{
          id: 9,
          name: '宁波市奉化区贸瓴机械租赁经营部',
          type: '批发业',
          date: '2019-12-26',
          bigType: '其它|微型',
          address: '浙江省宁波市奉化区锦屏街道长汀路168号105#(自主申报）',
          money: 0,
          status: '已关注'
        },{
          id: 10,
          name: '青岛欣荣晟源项目管理有限公司',
          type: '房屋建筑业',
          date: '2019-12-26',
          bigType: '其它|微型',
          address: '山东省青岛市崂山区同兴路677号5号楼1单元1501户',
          money: 50,
          status: '已关注'
        }
      ]
    }
  },
  methods: {
    submitForm: function (formName) {
      console.log('提交表单！')
      this.displayResult = true
      // this.$refs[formName].submitForm()
    },
    resetForm: function (formName) {
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

<style scoped>/* 
#pageHead {
  position: absolute;
  transform: translateY(-70px);
  font-family: '楷体';
  margin-top: 10px;
} */
#btn_div {
  margin-left: 4%;
}
#resetBtn {
  margin-right: 50px;
}
</style>
