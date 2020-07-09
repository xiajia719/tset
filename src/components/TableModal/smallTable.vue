<template>
  <el-table
    class="tableWrapper"
    border
    :data="tableData"
  >
    <el-table-column
      label="产品"
      align='center'
      prop="pid">
      <template slot-scope="scope">
        <el-select v-model="scope.row.pid" placeholder="请选择">
          <el-option
            v-for="item in productList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      label="学术评级"
      align='center'
      prop="academicRating">
      <template slot-scope="scope">
        <el-select v-model="scope.row.academicRating" placeholder="请选择">
          <el-option
            v-for="item in optionsValue"
            :key="item.id"
            :label="item.value"
            :value="item.id + ''">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      label="学术评级（系统）"
      align='center'
      prop="academicRatingSys">
      <template slot-scope="scope">
        <span style="fontSize:14px">{{scope.row.academicRatingSys}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="业务评级"
      align='center'
      prop="businessRating">
      <template slot-scope="scope">
        <el-select v-model="scope.row.businessRating" placeholder="请选择">
          <el-option
            v-for="item in businessRatingList"
            :key="item.id"
            :label="item.value"
            :value="item.id + ''">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      label="业务评级（系统）"
      align='center'
      prop="businessRatingSys"
      >
      <template slot-scope="scope">
        <span style="fontSize:14px">{{scope.row.businessRatingSys}}</span>
        <!-- <i class="el-icon-remove-outline deleteIcon" @click="deleteTreatment(scope.row.index)"></i> -->
      </template>
    </el-table-column>
    <el-table-column label="操作" width='80' align='center'>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  getProductList
} from '@/api/customerApi.js'
export default {
  props:{
    tableData: {
      type: Array,
      required: true
    },
    businessRatingList: {
      type: Array,
      required: true
    },
    optionsValue: {
      type: Array,
      required: true
    },
    handleDelete:{
      type:Function
    }
  },
  data() {
    return {
      restaurants: [],
      timeout:  null,
      businessRatingOptions:[
        {
          value: 'A',
          label: 'A',
          children: [
            {
              value: 'A0',
              label: 'A0'
            },
            {
              value: 'A1',
              label: 'A1'
            },
            {
              value: 'A2',
              label: 'A2'
            },
            {
              value: 'A3',
              label: 'A3'
            }
          ]
        },
        {
          value: 'B',
          label: 'B',
          children: [
            {
              value: 'B0',
              label: 'B0'
            },
            {
              value: 'B1',
              label: 'B1'
            },
            {
              value: 'B2',
              label: 'B2'
            },
            {
              value: 'B3',
              label: 'B3'
            }
          ]
        },
        {
          value: 'C',
          label: 'C',
          children: [
            {
              value: 'C0',
              label: 'C0'
            },
            {
              value: 'C1',
              label: 'C1'
            },
            {
              value: 'C2',
              label: 'C2'
            },
            {
              value: 'C3',
              label: 'C3'
            }
          ]
        }
      ]
    }
  },
  mounted(){
    this.getProductList()
    // this.restaurants = this.loadAll();
  },
  methods: {
    getProductList() {
      getProductList({
        pageSize:10,
        pageNum:1,
        name:''
      }).then(res => {
        this.productList = res.records
      })
    },
    // loadAll() {
    //   getProductList({
    //     pageSize:10,
    //     pageNum:1,
    //     name:''
    //   }).then(res => {
    //     return res.records
    //   })
    // },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
    }
  }
}
</script>
<style scoped>
.tableWrapper{
  width: 800px;
}
/* .tableWrapper /deep/ .el-table_1_column_5{
  position: relative;
}
.deleteIcon{
  position: absolute;
  right: -20px;
  top: 18px;
  color: #F56C6C;
} */
</style>