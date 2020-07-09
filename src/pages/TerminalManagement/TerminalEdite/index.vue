/* eslint-disable vue/valid-v-for */
<template>
<div class="wrapper">
  <div class="baseInfo">
      <h2 class="title">基本信息
        <!-- <i v-if="$route.params.type==1" class="el-icon-time" style="float:right;font-size:14px;color:#888;padding:0 20px">{{auditStatusArr[auditStatus]}}</i> -->
      </h2>
      <div class="content">
         <el-form :model="editeParams" ref="validateForm" :rules="rules" style="overflow:hidden;padding:10px 30px;">
          <el-form-item label="名称" prop='name' style="width:50%;margin:10px 0;float:left;">
            <el-input style="width:270px" v-model="editeParams.name" @blur="onlyNameValidate"></el-input>
          </el-form-item>
          <el-form-item label="大区"  prop='area' style="width:50%;margin:10px 0;float:left;">
            <el-select style="width:270px" v-model="editeParams.area">
                <el-option v-for="item in areaList" :key="item.id" :value="item.id" :label="item.value" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区"  prop='region' style="width:50%;margin:10px 0;float:left;">
            <el-select style="width:270px"  v-model="editeParams.region">
               <el-option v-for="item in regionList" :key="item.id" :value="item.id" :label="item.value" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省份/城市"  prop='city' style="width:50%;margin:10px 0;float:left;">
            <Vdistpicker hide-area :province='editeParams.province' :city='editeParams.city' @province='provinceFn' @city='cityFn'></Vdistpicker>
          </el-form-item>
            <el-form-item label="等级"  prop='hospitalLevel' style="width:50%;margin:10px 0;float:left;">
            <el-select style="width:270px"  v-model="editeParams.hospitalLevel">
               <el-option v-for="item in hospitalLevelList" :key="item.id" :value="item.id" :label="item.value" ></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="类型"  prop='hospitalType' style="width:50%;margin:10px 0;float:left;">
            <el-select style="width:270px" v-model="editeParams.hospitalType">
              <el-option v-for="item in hospitalTypeList" :key="item.id" :value="item.id" :label="item.value" ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
  </div>
  <div class="manageInfo">
      <h2 class="title">管理信息</h2>
      <div class="content">
        <div class="tips">
         <span>产品评级</span> <i class="el-icon-info" ></i>
         <el-button type="text" @click="addProductFn" style="margin-left:14px">添加产品</el-button>
        </div>
        <el-table
        :data='tableData'
        border
        style="width:800px"
        >
          <el-table-column align='center' v-for="(item) in columnData" :key="item.key" :label="item.label" :prop="item.prop">
            <template slot-scope="scope">
                <el-select v-if="item.prop==='product'" remote filterable :remote-method="getProductListFn" v-model="scope.row.product">
                   <el-option v-for="item in productIdList" :key="item.id" :value="item.id" :label="item.name" ></el-option>
                </el-select>
                    <el-select v-else-if="item.prop==='userLevel'" v-model="scope.row.userLevel">
                   <el-option v-for="item in hospitalAcademicRatingList" :key="item.id" :value="item.id" :label="item.value" ></el-option>
                </el-select>
                    <el-select v-else-if="item.prop==='workLevel'" v-model="scope.row.workLevel">
                   <el-option v-for="item in hospitalBusinessRatingList" :key="item.id" :value="item.id" :label="item.value" ></el-option>
                </el-select>
                <span v-else style="white-space: nowrap;">暂无</span>
            </template>
          </el-table-column>
           <el-table-column label="" width="150" align="center">
               <template slot-scope="scope">
                    <el-button
                        type="text"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
               </template>
           </el-table-column>
        </el-table>
        <div style="width:800px;text-align:right;margin:40px 0 140px">
            <el-button @click="$router.replace({name:'TerminalManagement'})">取消</el-button>
            <el-button type="primary" @click="submitPositionFn">提交审核</el-button>
            <el-button type="primary" @click="saveFn">保存</el-button>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import Vdistpicker from 'v-distpicker'
import {onlyKey} from "@/utils/common.js"
import {savePosition,isRepeatByName,saveDraftPosition,submitDraftPosition,submitPosition,getSysConfigByCode,getProductList,getPositionDetail,getPositionDetailDraft} from '@/api/terminalManageApi'
const codeList = ['hospital_area','hospital_region','hospitalLevel','hospitalType','hospital_academicRating','hospital_businessRating']
const arrList = ['areaList','regionList','hospitalLevelList','hospitalTypeList','hospitalAcademicRatingList','hospitalBusinessRatingList']

export default {
components:{
  Vdistpicker
},
data() {
return {
  auditStatusArr : ['保存' ,'审核中' ,'审核通过','审核拒绝'],
  editeParams:{
    name:'',
    area:'',
    region:'',
    province:'',
    city:'',
    hospitalLevel:'',
    hospitalType:'',
    productList:[]
  },
  auditStatus:null,
  isUniqName:true,
  areaList:[],
  regionList:[],
  hospitalLevelList:[],
  hospitalTypeList:[],
  productIdList:[],
  hospitalAcademicRatingList:[],
  hospitalBusinessRatingList:[],
  productRemoteParams:{
    pageSize:50,
    pageNum:1,
    name:null
  },
  rules:{
      name:[{required:true,message:'名称不能为空'}],
      area:[{required:true,message:'大区不能为空'}],
      region:[{required:true,message:'地区不能为空'}],
      province:[{required:true,message:'省份不能为空'}],
      city:[{required:true,message:'城市不能为空'}],
      hospitalLevel:[{required:true,message:'等级不能为空'}],
      hospitalType:[{required:true,message:'类型不能为空'}]
  },
  tableData:[{
    key:onlyKey(10),
    id:null,
    product:'',
    userLevel:'',
    systemLevel:'',
    workLevel:'',
    systemWorkLevel:''
  }],
  columnData:[
    {
      label:'产品',
      prop:'product'
    },{
      label:'影响力评级',
      prop:'userLevel'
    },{
      label:'影响力评级（系统）',
      prop:'systemLevel'
    },{
      label:'业务评级',
      prop:'workLevel'
    },{
      label:'业务评级（系统）',
      prop:'systemWorkLevel'
    }
  ]
}
},
created() {
  this.getSysConfigByCodeFn()
   getProductList(this.productRemoteParams).then(res => {
        this.productIdList = res.records
    })
  if(this.$route.params.type == '1'){
    this.editeParams.id = Number(this.$route.params.id)
    getPositionDetail({id:this.editeParams.id}).then(res => {
      this.reviewFn(res)
    })
  }else if(this.$route.params.type == '2'){
    this.editeParams.id = Number(this.$route.params.id)
    getPositionDetailDraft({id:this.editeParams.id}).then(res => {
     this.reviewFn(res)
    })
  }
},
mounted() {

},
methods: {
  getProductListFn(name){
    if(typeof (name) !== 'undefined'){
      this.productRemoteParams.name = name
    }
    if(this.timeId){
      clearTimeout(this.timeId)
    }
    this.timeId = setTimeout(() => {
      getProductList(this.productRemoteParams).then(res => {
        this.productIdList = res.records
      })
    }, 1000);
  },
  handleDelete(index,row){
    this.tableData.splice(index,1)
  },
  reviewFn(res){
     let {id,name,area,region,province,city,hospitalLevel,hospitalType,auditStatus} = res
      // if(this.$route.params.type == '1'){
      //   this.auditStatus = Number(auditStatus)
      // }
       if(res.productList && res.productList.length){
         this.tableData.splice(0)
        res.productList.forEach((item,index) => {
          let {id,pid,academicRating,businessRating} = item
          this.tableData.push({
                key:onlyKey(10),
                id,
                product:pid,
                userLevel:Number(academicRating),
                systemLevel:'',
                workLevel:Number(businessRating),
                systemWorkLevel:''
              })
        })
      }
      Object.assign(this.editeParams,{id,name,area:Number(area),region:Number(region),province,city,hospitalLevel:Number(hospitalLevel),hospitalType:Number(hospitalType)}) 
  },
  saveFn(){
    if(!this.editeParams.province || !this.editeParams.city){
      this.$message.warning('省份/城市为必填')
      return false
    }
    if(!this.isUniqName){
      this.$message.warning('终端名有重复,请更改终端名')
      return false
    }
    if(!this.tableData.length || !this.tableData.every(item => {
        return item.product && item.userLevel && item.workLevel
    })){
       this.$message.warning('产品评级信息不全')
       return false
    }
    this.$refs.validateForm.validate((flag) => {
      if(flag){
         this.setProductListFn()
          this.saveTypeFn()
        }else{
          return false
        }
      })
  },
  saveTypeFn(){
        if(this.$route.params.type == '2'){
          saveDraftPosition(this.editeParams).then(res => {
            this.$message.success('保存成功')
            this.$router.replace({name:'TerminalManagement'})
          })
        }else{
            savePosition(this.editeParams).then(res => {
              this.$message.success('保存成功')
              this.$router.replace({name:'TerminalManagement'})
            })
        }
  },
  submitTypeFn(){
    if(this.$route.params.type == '2'){
        submitDraftPosition(this.editeParams).then(res => {
          this.$message.success('提交成功')
            this.$router.replace({name:'TerminalManagement'})
        })
    }else{
        submitPosition(this.editeParams).then(res => {
          this.$message.success('提交成功')
            this.$router.replace({name:'TerminalManagement'})
        })
    }
  },
  submitPositionFn(){
    if(!this.editeParams.province || !this.editeParams.city){
      this.$message.warning('省份/城市为必填')
      return false
    }
    if(!this.isUniqName){
      this.$message.warning('终端名有重复,请更改终端名')
      return false
    }
    this.$refs.validateForm.validate((flag) => {
      if(flag){
        this.setProductListFn()
       this.submitTypeFn()
      }else{
        return false
      }
    })
  },
  setProductListFn(){
        this.editeParams.productList = this.tableData.map(item => ({
            id:item.id,
            pid:item.product,
            academicRating:item.userLevel,
            businessRating:item.workLevel
          }))
  },
  onlyNameValidate(){
    if(!this.editeParams.name)return false
      isRepeatByName({name:this.editeParams.name}).then(res => {
      if(Number(res) === 0){
        this.isUniqName = true
      }else{
        this.$message.error('此名称已存在')
        this.isUniqName = false
      }
    })
  },
  addProductFn(){
      this.tableData.push({
      key:onlyKey(10),
      id:null,
      product:'',
      userLevel:'',
      systemLevel:'',
      workLevel:'',
      systemWorkLevel:''
    })
  },
  getSysConfigByCodeFn(){
    getSysConfigByCode({code:codeList.join()}).then(res => {
      this.areaList = res.hospital_area
      this.regionList = res.hospital_region
      this.hospitalLevelList = res.hospitalLevel
      this.hospitalTypeList = res.hospitalType
      this.hospitalAcademicRatingList = res.hospital_academicRating
      this.hospitalBusinessRatingList = res.hospital_businessRating
    })
  },
  provinceFn(data){
    this.editeParams.province = data.value
  },
  cityFn(data){
      this.editeParams.city = data.value
  }
}
}
</script>

<style scoped lang='scss'>
  .wrapper{
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
</style>
<style scoped>
  .content >>> .el-form-item__label{
    width: 100px;
    text-align: right;
  }
  .el-form >>> .el-form-item__error{
    margin-left: 100px ;
  }
  .content >>> select{
    height: 32px;
    padding: 0;
  }
</style>
