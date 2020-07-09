<template>
<div class="wrapper">
  <div class="baseInfo">
      <h2 class="title">基本信息</h2>
      <div class="content">
         <el-form :model="addParams"  ref="validateForm"  :rules='rules' style="overflow:hidden;padding:10px 30px;">
          <el-form-item label="名称" prop="jobsName" style="width:50%;margin:10px 0;float:left;">
            <el-input style="width:270px"   v-model="addParams.jobsName"></el-input>
          </el-form-item>
          <el-form-item label="所属组织"  prop="deptId"  style="width:50%;margin:10px 0;float:left;">
              <el-select style="width:270px" filterable remote :remote-method='getOrgnizationListFn' v-model="addParams.deptId">
               <el-option  v-for="item in deptList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态"  prop="status" style="width:50%;margin:10px 0;float:left;">
            <el-select style="width:270px" v-model="addParams.status" clearable>
               <el-option  v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工" prop="userId" style="width:50%;margin:10px 0;float:left;">
            <el-select style="width:270px" filterable remote :remote-method='getUserListListFn' v-model="addParams.userId">
               <el-option  v-for="item in userList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="width:800px;text-align:left;margin:40px 0 140px">
            <el-button @click="$router.replace({name:'PositionManagement'})">取消</el-button>
            <el-button type="primary" @click="editeFn" v-if="this.$route.params.id">保存</el-button>
            <el-button type="primary" @click="createFn" v-else>确定</el-button>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import {createPosition,getPositionDetail,editePosition,getOrgnizationList,getUserListList} from "@/api/positionManage"
import axios from "axios"
export default {
data() {
return {
  addParams:{
    jobsName:'',
    deptId:'',
    status:'',
    userId:''
  },
userList:[],
deptList:[],
 rules:{
   jobsName:[{required:true,message:'名称不能为空'}],
   deptId:[{required:true,message:'所属组织不能为空'}],
   status:[{required:true,message:'状态不能为空'}],
   userId:[{required:true,message:'员工不能为空'}]
 },
  selectOptions:[
          {label:'有效',value:'1'},
          {label:'无效',value:'2'}
        ]
  }
},
created() {
  this.getDefaultFetch()
},
mounted() {

},
methods: {
  createFn(){
        this.$refs.validateForm.validate((flag) => {
          if(flag){
            createPosition(this.addParams).then(res => {
              this.$message.success('创建成功')
              this.$router.replace({name:'PositionManagement'})
            })
          }else{
            return false
          }
        })
  },
  editeFn(){
    this.$refs.validateForm.validate((flag) => {
        if(flag){            
          editePosition(this.addParams).then(res => {
              this.$router.replace({name:'PositionManagement'})
          })
          }else{
            return false
          }
    })
  },
  getDefaultFetch(){
    axios.all([getUserListList(),getOrgnizationList()]).then(axios.spread((res1,res2) => {
       this.userList = res1.records.map(item => ({label:item.name,value:Number(item.userId)}))
       this.deptList = res2.records.map(item => ({label:item.deptName,value:Number(item.deptId)}))
         if(this.$route.params.id){
            getPositionDetail({id:this.$route.params.id}).then(res => {
            const {id,jobsName,deptId,status,userId,fullName,name} = res
              this.addParams = {id,jobsName,deptId,status,userId}
              const userIndex = this.userList.findIndex(item => item.value == Number(userId))
              const deptIndex = this.deptList.findIndex(item => item.value == Number(deptId))
              if(userIndex === -1){
                this.userList.unshift({
                  value:Number(userId),
                  label:name
                })
              }
              if(deptIndex === -1){
                this.deptList.unshift({
                  value:Number(deptId),
                  label:fullName
                })
              }
            })
          }
    }))
  },
  getUserListListFn(name = ''){
    clearTimeout(this.timeId)
     this.timeId = setTimeout(() => {
       getUserListList({pageSize:10,pageNum:1,name}).then(res => {
        this.userList = res.records.map(item => ({label:item.name,value:Number(item.userId)}))
      })
    },1000)
  },
   getOrgnizationListFn(deptName = ''){
    clearTimeout(this.timeId2)
     this.timeId2 = setTimeout(() => {
       getOrgnizationList({pageSize:100,pageNum:1,deptName}).then(res => {
          this.deptList = res.records.map(item => ({label:item.deptName,value:Number(item.deptId)}))
      })
    },1000)
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
  .el-form >>> .el-form-item__error{
    margin-left: 80px ;
  }
  .el-form >>> .el-form-item__label{
    width: 80px;
    text-align: right;
  }
</style>
