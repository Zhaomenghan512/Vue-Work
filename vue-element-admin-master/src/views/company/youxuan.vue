<template>
  <div>
    <span id='pageHead'><h1>企业优选</h1></span><br />
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
    <!-- 结果表 -->
    <div>
      <el-table :data='resultList' style='width: 100%'>
        <el-table-column prop='id' label='序号' width='100px'>
        </el-table-column>
        <el-table-column prop='name' label='企业名称' width='240px'>
        </el-table-column>
        <el-table-column prop='type' label='所属行业' width='180px'>
        </el-table-column>
        <el-table-column prop='date' label='成立时间' width='180px'>
        </el-table-column>
        <el-table-column prop='size' label='性质及规模' width='180px'>
        </el-table-column>
        <el-table-column prop='address' label='注册地址' width='300px'>
        </el-table-column>
        <el-table-column prop='money' label='注册资本(万元)' width='180px'>
        </el-table-column>
        <el-table-column label='查看详细'>
          <el-button type='primary'>基础报告</el-button>
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
  data() {
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
        name: '上海柯娉商务咨询有限公司',
        type: '商务服务业',
        date: '2020-01-10',
        size: '其它|微型',
        money: '200',
        address: '上海市虹口区东大名路391-393号（单号）4层（集中登记地）'
      },
      {
        id: 2,
        name: '济南鑫成智能机械科技有限公司',
        type: '批发业',
        date: '2020-01-08',
        size: '其它|小型',
        money: '51',
        address: '山东省济南市天桥区蓝翔路卢庄市场3号楼402-60'
      },
      {
        id: 3,
        name: '山东华源铁塔有限公司',
        type: '批发业',
        date: '2020-01-06',
        size: '其它|微型',
        money: '6100',
        address: '山东省潍坊市昌乐县营丘镇崖头工业园华盛路3号06栋'
      },
      {
        id: 4,
        name: '青岛锦泰翔企业服务有限公司',
        type: '商务服务业',
        date: '2019-12-28',
        size: '其它|小型',
        money: '100',
        address: '山东省青岛市黄岛区唐岛湾路228号'
      },
      {
        id: 5,
        name: '陕西福顺亿沅物资有限公司',
        type: '批发业',
        date: '2019-12-27',
        size: '其它|微型',
        money: '200',
        address: '陕西省榆林市榆阳区红山东路民生家园二号楼三单元5号商铺'
      },
      {
        id: 6,
        name: '山东仁源标准化服务有限公司',
        type: '商务服务业',
        date: '2019-12-27',
        size: '其他|小型',
        money: '300',
        address: '山东省青岛市城阳区城阳街道艳阳路111号'
      },
      {
        id: 7,
        name: '宁波海曙尤看运动医学诊所有限公司',
        type: '卫生',
        date: '2019-12-27',
        size: '其他|小型',
        money: '100',
        address: '浙江省宁波市海曙区高桥镇汇贤路388号商会大厦一楼362号、372-2号'
      },
      {
        id: 8,
        name: '内蒙古荣先建筑工程有限公司',
        type: '建筑装饰和其他建筑业',
        date: '2019-12-27',
        size: '其他|小型',
        money: '300',
        address: '内蒙古自治区包头市青山区民主路6号街坊科学路5号宝林苑4-901'
      },
      {
        id: 9,
        name: '江苏琦艺建筑劳务有限公司',
        type: '房屋建筑业',
        date: '2019-12-27',
        size: '其他|小型',
        money: '1000',
        address: '海安高新区江海西路86号'
      },
      {
        id: 10,
        name: '佛山市一方径达商贸有限公司',
        type: '批发业',
        date: '2019-12-27',
        size: '其他|微型',
        money: '108',
        address: '佛山市南海区大沥镇广佛公路盐步路段广东南国小商品城东区三街3号首层商铺（住所申报）'
      }]
    }
  },
  methods: {
    changeProvince(a) {
      this.province = a.value
    },
    changeCity(a) {
      this.city = a.value
    },
    changeArea(a) {
      this.area = a.value
    },
    submitForm: function() {
      console.log('获取到了数据，进行渲染')
    }
  },
  mounted: function() {
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
</style>
