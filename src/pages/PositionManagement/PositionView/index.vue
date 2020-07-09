<template>
<div class="wrapper">
  <div class="topInfo">
    <span class="tips">
      审核通过<i class="el-icon-time" ></i>
    </span>
      <div class="nav" style="margin:10px 0 10px">
        <span style="font-size:18px">销售代表</span>
        <span class="title">编码:</span>
        <span >河南直辖区</span>
        <span class="title">所属组织</span>
        <span >河南直辖区</span>
        <span class="title">状态</span>
        <span >河南直辖区</span>
      </div>
      <div style="margin:10px 0 10px"> 
        <el-button style="width:100px;heigth:30px">编辑</el-button>
      </div>
  </div>
  <div class="outWrapper">
  <div class="baseInfo">
      <h2 class="title">基本信息</h2>
      <div class="content">
        <el-form style="overflow:hidden;padding:10px 0px;">
          <el-form-item label="编码" style="width:40%;margin:10px 0;float:left;">
          华中医院
          </el-form-item>
          <el-form-item label="名称" style="width:40%;margin:10px 0;float:left;">
           华中医院
          </el-form-item>
          <el-form-item label="所属组织" style="width:40%;margin:10px 0;float:left;">
           华中医院
          </el-form-item>
          <el-form-item label="状态" style="width:40%;margin:10px 0;float:left;">
           华中医院
          </el-form-item>
        </el-form>
      </div>
  </div>
  <div class="manageInfo">
      <h2 class="title">岗位分配</h2>
      <div class="content">
        <div class="tips">
         <span>岗位人员</span> <i class="el-icon-info" style="margin:10px"></i>
        </div>
        <el-table
        border
        style="width:800px"
        >
        <el-table-column align='center' v-for="(item, index) in columnData" :key="index" :label="item.label" :prop="item.prop"></el-table-column>
        </el-table>
      </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
data() {
return {
  columnData:[{
    label:'工号',
    prop:'product'
  },{
    label:'姓名',
    prop:'product'
  },{
    label:'手机号',
    prop:'product'
  },{
    label:'邮箱',
    prop:'product'
  }]
}
},
created() {

},
mounted() {

},
methods: {

}
}
</script>

<style scoped lang='scss'>
  .wrapper{
    background: #EFEFF4;
    .topInfo{
      position: relative;
      background: #ffffff;
      padding: 20px;
      margin-bottom: 20px;
      .tips{
        position: absolute;
        right: 20px;
        top: 0px;
        font-size: 14px;
        padding: 12px 0;
        color: #C0C4CC;
      }
      .nav{
        font-size: 14px;
        .title{
        color: #909399;
        margin:0 30px;
      }
      }
    }
    .outWrapper{
      background: #ffffff;
      padding: 20px;
      .title{
      font-size: 18px;
      padding-left:8px;
      border-left: 3px solid #1989FA;
    }
      .content{
        .tips{
          padding: 12px 0;
          color: #C0C4CC;
        }
      }
    }
      .manageInfo{
        margin-bottom: 200px;
      }
  }
</style>
<style scoped>
  .content >>>.el-form-item__label{
    width: 80px;
    text-align: left;
  }
</style>
