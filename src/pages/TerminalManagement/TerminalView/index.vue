<template>
<div class="wrapper">
  <div class="topInfo">
    <span class="tips" v-if="editeParams.auditStatus">
      {{editeParams.auditStatus}}<i class="el-icon-time" style="margin-left:10px;" ></i>
    </span>
      <div class="nav" style="margin:10px 0 10px;display:flex;">
        <span style="font-size:18px"><i :class="compareParams.name?'active':''">{{editeParams.name}}</i><i v-if="compareParams.name">(原:{{compareParams.name}})</i></span>
        <span class="title">大区:</span>
        <span class="item"><i :class="compareParams.area?'active':''">{{editeParams.area}}</i><i v-if="compareParams.area">(原:{{compareParams.area}})</i></span>
        <span class="title">地区</span>
        <span class="item"><i :class="compareParams.area?'active':''">{{editeParams.region}}</i><i v-if="compareParams.region">(原:{{compareParams.region}})</i></span>
        <span class="title">省份</span>
        <span class="item"><i :class="compareParams.area?'active':''">{{editeParams.province}}</i><i v-if="compareParams.province">(原:{{compareParams.province}})</i></span>
        <span class="title">城市</span>
        <span class="item"><i :class="compareParams.area?'active':''">{{editeParams.city}}</i><i v-if="compareParams.city">(原:{{compareParams.city}})</i></span>
      </div>
      <div style="margin:10px 0 10px"> 
        <el-button style="width:100px;heigth:30px" @click="jumpToEdite" v-if="Number($route.params.type)!==3">编辑</el-button>
      </div>
  </div>
  <div class="outWrapper">
  <div class="baseInfo">
      <h2 class="title">基本信息</h2>
      <div class="content">
        <el-form style="overflow:hidden;padding:10px 0px;">
          <el-form-item label="名称" class="formItem">
          <i :class="compareParams.name?'active':''">{{editeParams.name}}</i><i v-if="compareParams.name">(原:{{compareParams.name}})</i>
          </el-form-item>
          <el-form-item label="大区" class="formItem">
          <i :class="compareParams.area?'active':''">{{editeParams.area}}</i><i v-if="compareParams.area">(原:{{compareParams.area}})</i>
          </el-form-item>
          <el-form-item label="地区" class="formItem">
          <i :class="compareParams.region?'active':''">{{editeParams.region}}</i><i v-if="compareParams.region">(原:{{compareParams.region}})</i>
          </el-form-item>
          <el-form-item label="省份/城市" class="formItem">
          <i :class="compareParams.province||compareParams.city?'active':''">{{editeParams.province+'/'+editeParams.city}}</i><i v-if="compareParams.province||compareParams.city">(原:{{compareParams.province+'/'+compareParams.city}})</i>
          </el-form-item>
            <el-form-item label="等级"  class="formItem">
          <i :class="compareParams.area?'active':''">{{editeParams.hospitalLevel}}</i><i  v-if="compareParams.hospitalLevel">(原:{{compareParams.hospitalLevel}})</i>
          </el-form-item>
            <el-form-item label="类型" class="formItem">
          <i :class="compareParams.area?'active':''">{{editeParams.hospitalType}}</i><i v-if="compareParams.hospitalType">(原:{{compareParams.hospitalType}})</i>
          </el-form-item>
        </el-form>
      </div>
  </div>
  <div class="manageInfo">
      <h2 class="title">管理信息</h2>
      <div class="content">
        <div class="tips">
         <span>产品评级</span>  <i class="el-icon-info" style="margin:0 10px"></i>
         <!-- <el-button type="text" style="margin-left:14px">添加产品</el-button> -->
        </div>
        <el-table
        :row-style="rowStyleFn"
        :data='tableData'
        border
        style="width:800px">
          <el-table-column :min-width='item.width' align='center' v-for="(item, index) in columnData" :key="index" :label="item.label" :prop="item.prop">
                <template slot-scope='scope'>
                  <span  style="white-space: nowrap;">
                    <i :class="scope.row['$B'+item.prop]?'activeColor':null">{{scope.row[item.prop]}}</i><i v-if="scope.row['$B'+item.prop]">(原:{{scope.row['$B'+item.prop]}})</i>
                  </span>
                </template>
          </el-table-column>
          <el-table-column>
              <template slot-scope='scope'>
                  <span v-if="Number(scope.row.productStatus)===2">新</span>
                  <span v-if="Number(scope.row.productStatus)===3">删</span>
              </template>
          </el-table-column>
        </el-table>
      </div>
  </div>
  </div>
</div>
</template>

<script>
import {getHospitalDetail,getHospitalDraft} from '@/api/terminalManageApi'
import {onlyKey} from '@/utils/common.js'
import {getDetailById} from '@/api/auditManagementApi'
export default {
data() {
return {
  updateIdList:[],
  editeParams:{
    name:'',
    area:'',
    region:'',
    province:'',
    city:'',
    hospitalLevel:'',
    hospitalType:'',
    auditStatus:'',
    productStatus:'',
    productList:[]
  },
  compareParams:{
    name:null,
    area:null,
    region:null,
    province:null,
    city:null,
    hospitalLevel:null,
    hospitalType:null,
    auditStatus:null,
    productList:[]
  },
  tableData:[],
  compareTableData:[],
  columnData:[{
    label:'产品',
    prop:'product',
      width:'150px'
  },{
    label:'影响力评级',
    prop:'userLevel'
  },{
    label:'影响力评级（系统）',
    prop:'systemLevel',
    width:'120px'
  },{
    label:'业务评级',
    prop:'workLevel'
  },{
    label:'业务评级（系统）',
    prop:'systemWorkLevel',
      width:'120px'
  }]
}
},
created() {
  if(Number(this.$route.params.type) === 1){
    this.editeParams.id = Number(this.$route.params.id)
    getHospitalDetail({id:this.editeParams.id}).then(res => {
      this.reviewFn(res)
    })
  }else if(Number(this.$route.params.type) === 2){
    this.editeParams.id = Number(this.$route.params.id)
    getHospitalDraft({id:this.editeParams.id}).then(res => {
     this.reviewFn(res)
    })
  }else if(Number(this.$route.params.type) === 3){
    getDetailById({id:this.$route.params.id,userId:this.$route.params.userId}).then(res => {
      this.reviewFn(res[0])
         this.reviewFn2(res[1])
          this.compareTableData.forEach(item => {
            let index = this.updateIdList.findIndex(ele => Number(ele.id) === Number(item.id))
            if(index !== -1){
              const page = this.updateIdList[index].i
              this.tableData[page]['$Bproduct'] = this.tableData[page].product === item.product ? null : item.product
              this.tableData[page]['$BuserLevel'] = this.tableData[page].userLevel === item.userLevel ? null : item.userLevel
              this.tableData[page]['$BworkLevel'] = this.tableData[page].workLevel === item.workLevel ? null : item.workLevel
            }
          })
    })
  }
},
mounted() {

},
methods: {
   reviewFn(res){
     let {id,name,area,region,province,city,hospitalLevel,hospitalType,auditStatus} = res
       if(res.productList && res.productList.length){
        this.tableData.splice(0)
        res.productList.forEach((item,index) => {
          let {pname,academicRating,businessRating,productStatus,id} = item
          this.tableData.push({
                key:onlyKey(10),
                id,
                product:pname,
                userLevel:academicRating,
                systemLevel:'',
                workLevel:businessRating,
                systemWorkLevel:'',
                productStatus
              })
          if(Number(item.productStatus) === 1){
              this.updateIdList.push({
                id:item.id,
                i:index
              })
          }
        })
      }
      Object.assign(this.editeParams,{id,name,area,region,province,city,hospitalLevel,auditStatus,hospitalType}) 
  },
   reviewFn2(res){
     let {id,name,area,region,province,city,hospitalLevel,hospitalType,auditStatus} = res
       if(res.productList && res.productList.length){
         this.compareTableData.splice(0)
        res.productList.forEach((item,index) => {
          let {pname,academicRating,businessRating,id} = item
          this.compareTableData.push({
                key:onlyKey(10),
                id,
                product:pname,
                userLevel:academicRating,
                systemLevel:'',
                workLevel:businessRating,
                systemWorkLevel:''
              })
        })
      }
      Object.assign(this.compareParams,{id,name,area,region,province,city,hospitalLevel,auditStatus,hospitalType}) 
  },
  jumpToEdite(){
    this.$router.push({name:'TerminalEdite',params:{id:this.$route.params.id,type:this.$route.params.type}})
  },
  rowStyleFn({row, rowIndex}){
    if(Number(row.productStatus) === 2){
      return {background:'#FFF1E9',color:'#F56C6C'}
    }else if(Number(row.productStatus) === 3){
      return {background:'#DCDFE6',color:'#909399'}
    }else{
      return {}
    }
  }
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
        color: #6D7278;
      }
      .nav{
        font-size: 14px;
        .title{
          color: #909399;
          margin:0 30px;
        }
        .item{
          display: flex;
          flex-direction: column;
          .active{
            color: #F56C6C;
          }
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
        color:#6D7278;
      }
      .formItem{
        width:50%;
        margin:10px 0;
        float:left;
        .active{
           color: #F56C6C;
           padding-right: 10px;
        }
      }
    }
    }
  }
</style>
<style scoped>
.content >>> .el-form-item__label{
    width: 90px;
    text-align: right;
    margin-right: 20px;
  }
  .activeColor{
    color: #F56C6C;
    padding-right:5px;
  }
</style>
