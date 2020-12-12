<template>
  <div>
    <span id="pageHead"><h1>招商雷达</h1></span><br />
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
    <router-view/>
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
      displayResult: false
    }
  },
  mounted: function() {
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
