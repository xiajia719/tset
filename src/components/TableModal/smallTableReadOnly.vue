<template>
  <el-table
    class="tableWrapper"
    border
    :data="tableData"
  >
    <el-table-column
      label="产品"
      align='center'
      prop="pname">
    </el-table-column>
    <el-table-column
      label="学术评级"
      align='center'
      prop="academicRating">
    </el-table-column>
    <el-table-column
      label="学术评级（系统）"
      align='center'
      prop="academicRatingSys">
    </el-table-column>
    <el-table-column
      label="业务评级"
      align='center'
      prop="businessRating">
    </el-table-column>
    <el-table-column
      label="业务评级（系统）"
      align='center'
      prop="businessRatingSys">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props:{
      tableData: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>
<style scoped>
.tableWrapper{
  width: 800px;
}
</style>