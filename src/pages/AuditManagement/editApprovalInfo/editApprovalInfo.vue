<template>
  <happy-scroll color="rgba(51,51,51,0.2)" size="5" resize hide-horizontal class="happyScroll">
    <el-container class="wrapper">
      <el-header class="header">
        <div class="header-container" style="line-height:60px">
        <div class="header-title">客户信息</div>
        </div>
        <!-- <div class="header-container" style="padding-top:10px">
          <div class="header-title">客户-变更</div> -->
          <!-- <div class="header-info"> -->
            <!-- <span class="header-item">审核对象：{{newData.cname}}</span> -->
            <!-- <span class="header-item">提交人：林代表</span>
            <span class="header-item">提交时间：2020-01-01 12:00:00</span>
            <span class="header-item">当前状态：审核中</span> -->
          <!-- </div> -->
        <!-- </div> -->
        <div class="btnGroup">
          <el-button plain @click="$router.push({name:'AuditManagement'})">返回</el-button>
          <!-- <el-button type="primary" @click="openDialog('1')">同意</el-button>
          <el-button type="primary"  @click="openDialog('2')">拒绝</el-button> -->
        </div>
      </el-header>
      <el-container>
        <el-main class="main_contanier">
          <!-- <div class="main_contanier_title">客户信息</div> -->
          <div class="main_contanier_info" ref="leftInfo">
            <div class="wrapperArea">
              <div class="wrapperArea-header">
                <span class="verticalLine"></span>
                基本信息
              </div>
              <div class="wrapperArea_info">
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">姓名</span>
                  <span :class="oldData.cname ? 'redFont':''">
                    {{newData.cname}}
                    <span class="oldData"  v-if='oldData.cname'>(原: {{oldData.cname}})</span>
                  </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">性别</span>
                     <span :class="oldData.gender  ? 'redFont':''">
                       {{newData.gender}}
                        <span class="oldData"  v-if='oldData.gender'>(原:{{oldData.gender}})</span>
                      </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">籍贯</span>
                    <span :class="oldData.nativePlace ? 'redFont':''">
                      {{newData.nativePlace}}
                      <span class="oldData"  v-if='oldData.nativePlace'>(原:{{oldData.nativePlace}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">手机号码</span>
                    <span :class="oldData.tel ? 'redFont':''">
                      {{newData.tel}}
                      <span class="oldData"  v-if='oldData.tel'>(原:{{oldData.tel}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">邮箱地址</span>
                    <span :class="oldData.email ? 'redFont':''">
                      {{newData.email}}
                      <span class="oldData"  v-if='oldData.email'>(原: {{oldData.email}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">微信/QQ</span>
                    <span :class="oldData.weixin ? 'redFont':''">
                      {{newData.weixin}}
                      <span class="oldData"  v-if='oldData.weixin'>(原:{{oldData.weixin}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">开户行</span>
                   <span :class="oldData.bank ? 'redFont':''">
                      {{newData.bank}}
                      <span class="oldData"  v-if='oldData.bank'>(原: {{oldData.bank}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">银行卡号</span>
                  <span :class="oldData.bankNum ? 'redFont':''">
                    {{newData.bankNum}}
                    <span class="oldData"  v-if='oldData.bankNum'>(原:{{oldData.bankNum}})</span>
                  </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">终端机构</span>
                    <span :class="oldData.hid ? 'redFont':''">
                      {{newData.hid}}
                      <span class="oldData"  v-if='oldData.hid'>(原:{{oldData.hid}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">科室</span>
                    <span :class="oldData.department ? 'redFont':''">
                      {{newData.department}}
                      <span class="oldData"  v-if='oldData.department'>(原:{{oldData.department}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">职务</span>
                    <span :class="oldData.position ? 'redFont':''">
                      {{newData.position}}
                      <span class="oldData"  v-if='oldData.position'>(原:{{oldData.position}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">管理床位数</span>
                    <span :class="oldData.manageBeds ? 'redFont':''">
                      {{newData.manageBeds}}
                      <span class="oldData"  v-if='oldData.manageBeds'>(原:{{oldData.manageBeds}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">身份证号</span>
                     <span :class="oldData.bankNum ? 'redFont':''">
                      {{newData.bankNum}}
                      <span class="oldData"  v-if='oldData.bankNum'>(原:{{oldData.bankNum}})</span>
                    </span>
                </span>
              </div>
            </div>
            <div class="wrapperArea">
              <div class="wrapperArea-header">
                <span class="verticalLine"></span>
                职称信息
              </div>
              <div class="wrapperArea_info">
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">职称</span>
                      <span :class="oldData.postName ? 'redFont':''">
                        {{newData.postName}}
                      <span class="oldData"  v-if='oldData.postName'>(原: {{oldData.postName}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">医疗技术专业职称</span>
                  <span :class="oldData.medicalPostName ? 'redFont':''">
                        {{newData.medicalPostName}}
                      <span class="oldData"  v-if='oldData.medicalPostName'>(原: {{oldData.medicalPostName}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">学会职务</span>
                    <span :class="oldData.institutePost ? 'redFont':''">
                        {{newData.institutePost}}
                      <span class="oldData"  v-if='oldData.institutePost'>(原: {{oldData.institutePost}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">执业医师类别</span>
                  <span :class="oldData.mediPractiType ? 'redFont':''">
                        {{newData.mediPractiType}}
                      <span class="oldData"  v-if='oldData.mediPractiType'>(原:{{oldData.mediPractiType}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">执业范围</span>
                  <span :class="oldData.mediPractiRange ? 'redFont':''">
                        {{newData.mediPractiRange}}
                      <span class="oldData"  v-if='oldData.mediPractiRange'>(原: {{oldData.mediPractiRange}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">是否专家库</span>
                  <span :class="oldData.isExpertLib ? 'redFont':''">
                        {{newData.isExpertLib}}
                      <span class="oldData"  v-if='oldData.isExpertLib'>(原: {{oldData.isExpertLib}})</span>
                    </span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">擅长领域</span>
                  <span :class="oldData.adeptField ? 'redFont':''">
                        {{newData.adeptField}}
                      <span class="oldData"  v-if='oldData.adeptField'>(原: {{oldData.adeptField}})</span>
                    </span>
                </span>
              </div>
            </div>
            <div class="wrapperArea">
              <div class="wrapperArea-header last-header">
                <span class="verticalLine"></span>
                管理信息
              </div>
              <div class="wrapperArea-tip">
                <span class="wrapperArea-tip-word">支持产品及评级</span>
                <i class="el-icon-warning wrapperArea-tip-icon"></i>
              </div>
              <el-table
                :row-style="rowStyleFn"
                :data='tableData'
                border
                style="width:800px">
                  <el-table-column :min-width='item.width' align='center' v-for="(item, index) in columnData" :key="index" :label="item.label" :prop="item.prop">
                        <template slot-scope='scope'>
                          <span  style="white-space: nowrap;">
                            <i :class="scope.row['$B'+item.prop]?'redFont':null">{{scope.row[item.prop]}}</i><i v-if="scope.row['$B'+item.prop]">(原:{{scope.row['$B'+item.prop]}})</i>
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
              <div class="wrapperArea_foot">
                <div class="wrapperArea_foot_item">
                  <span class="wrapperArea_foot_item_label">产品领域</span>
                    <span :class="oldData.productField ? 'redFont':''">
                        {{newData.productField}}
                      <span class="oldData"  v-if='oldData.productField'>(原:{{oldData.productField}})</span>
                    </span>
                </div>
                <div class="wrapperArea_foot_item">
                  <span class="wrapperArea_foot_item_label">备注</span>
                    <span :class="oldData.remark ? 'redFont':''">
                        {{newData.remark}}
                      <span class="oldData"  v-if='oldData.remark'>(原:{{oldData.remark}})</span>
                    </span>
                </div>
              </div>
            </div>
          </div>
        </el-main>
      <!-- <el-aside class="aside_contanier">
          <div class="main_contanier_title">流程信息</div>
          <happy-scroll class="main_contanier_block" :style="{height:leftInfoHeight}" color="rgba(51,51,51,0.2)" size="5" resize hide-horizontal >
            <el-timeline class="main_contanier_approval">
              <el-timeline-item timestamp="SE部门审核" placement="top" color="#C0C4CC">
              </el-timeline-item>
              <el-timeline-item timestamp="地区经理审审核中" placement="top" color="#C0C4CC">
              </el-timeline-item>
              <el-timeline-item timestamp="大区经理审核：同意" placement="top" color="#C0C4CC">
                <el-card class="elCard">
                  <span class="agreeTitle" v-if="false">
                    <i class="el-icon-success"></i>
                    <span>同意</span>
                  </span>
                  <span class="refuseTitle" v-else>
                    <i class="el-icon-error"></i>
                    <span>拒绝</span>
                  </span>
                  <span class="blackColor marginBottom">张抗抗</span>
                  <span class="blackColor position">2020-06-23 11:30</span>
                  <div class="blackColor">同意</div>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="地区经理审批：同意" placement="top" color="#C0C4CC">
                <el-card class="elCard">
                  <span class="agreeTitle" v-if="true">
                    <i class="el-icon-success"></i>
                    <span>同意</span>
                  </span>
                  <span class="refuseTitle" v-else>
                    <i class="el-icon-error"></i>
                    <span>拒绝</span>
                  </span>
                  <span class="blackColor marginBottom">张刘洋</span>
                  <span class="blackColor position">2020-06-23 11:30</span>
                  <div class="blackColor">我是审批意见</div>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="提交：新建" placement="top" color="#C0C4CC">
                <el-card class="elCard">
                  <span class="blackColor marginBottom">林代表</span>
                  <span class="blackColor position">2020-06-23 11:30</span>
                  <div class="blackColor">新建客户</div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </happy-scroll>
        </el-aside>  -->
      </el-container>
    </el-container>
    <el-dialog :title="okOrNoParams.audit?'同意':'拒绝'" :visible.sync="showDialog" class="agreeDialog" width="490px">
      <el-form class="agreeForm">
        <el-form-item label="输入审批意见">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="okOrNoParams.auditOpinion"
            autosize
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog=false">取 消</el-button>
        <el-button type="primary" @click="sumitOkOrNoAdvice">确 定</el-button>
      </span>
    </el-dialog>
  </happy-scroll>
</template>

<script>
import {getCustomerDetailById,taskAudit} from '@/api/auditManagementApi'
import {onlyKey} from "@/utils/common.js"
export default {
  data() {
    return {
      leftInfoHeight:0,
      showDialog:false,
      dialogText:'',
      tableData: [],
      compareTableData:[],
      updateIdList:[],
      okOrNoParams:{
          startUserId:null,//申请人ID
          taskId:null,//任务id
          businessKey:null,//业务ID
          audit:null,//同意：true，拒绝：false
          auditOpinion:null,//审核意见
          processDefinitionKey:null,//流程定义key
          taskDefinitionKey:null//任务定义key
        },
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
        }],
      newData:{
            "id": null,
            "code": null,
            "cname": null,
            "gender": null,
            "nativePlace": null,
            "tel": null,
            "email": null,
            "weixin": null,
            "idCard": null,
            "bank": null,
            "bankNum": null,
            "hid": null,
            "department": null,
            "position": null,
            "manageBeds": null,
            "postName": null,
            "medicalPostName": null,
            "institutePost": null,
            "mediPractiType": null,
            "mediPractiRange": null,
            "adeptField": null,
            "isExpertLib": null,
            "productField": null,
            "remark": null,
            "auditStatus": null,
            "productList": [],
            "hospitalName": null,
            "behalfName": null
      },
      oldData:{
              "id": null,
            "code": null,
            "cname": null,
            "gender": null,
            "nativePlace": null,
            "tel": null,
            "email": null,
            "weixin": null,
            "idCard": null,
            "bank": null,
            "bankNum": null,
            "hid": null,
            "department": null,
            "position": null,
            "manageBeds": null,
            "postName": null,
            "medicalPostName": null,
            "institutePost": null,
            "mediPractiType": null,
            "mediPractiRange": null,
            "adeptField": null,
            "isExpertLib": null,
            "productField": null,
            "remark": null,
            "auditStatus": null,
            "productList": [],
            "hospitalName": null,
            "behalfName": null
      }
    }
  },
  created() {
    this.okOrNoParams.startUserId = this.$route.params.userId
    getCustomerDetailById({id:this.$route.params.id,userId:this.$route.params.userId}).then(res => {
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
  },
  mounted() {
    this.getleftInfoHieht()
    window.addEventListener('resize',this.getleftInfoHieht)
  },
  methods: {
  reviewFn(res){
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
      Object.assign(this.newData,res) 
  },
  reviewFn2(res){
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
      Object.assign(this.oldData,res) 
  },
  getleftInfoHieht(){
    this.$nextTick(() => {
      this.leftInfoHeight = this.$refs.leftInfo.offsetHeight + 'px'
    }) 
  },
  rowStyleFn({row, rowIndex}){
      if(Number(row.productStatus) === 2){
        return {background:'#FFF1E9',color:'#F56C6C'}
      }else if(Number(row.productStatus) === 3){
        return {background:'#DCDFE6',color:'#909399'}
      }else{
        return {}
      }
    },
  sumitOkOrNoAdvice(){
     this.showDialog = false
     if(sessionStorage.getItem('customerParams')){
        const {
        businessKey,
        processDefinitionKey,
        processInstanceId} = JSON.parse(sessionStorage.getItem('customerParams'))
        Object.assign(this.okOrNoParams,{businessKey,processDefinitionKey,processInstanceId})
     }
     taskAudit(this.okOrNoParams).then(res => {
        this.$message.success('操作成功')
        this.push({name:'AuditManagement'})
     })
  },
  openDialog(n){
    this.showDialog = true
    this.okOrNoParams.auditOpinion = ''
    if(n === '1'){
      this.okOrNoParams.audit = true
    }else{
      this.okOrNoParams.audit = false
    }
  }

  }
}
</script>

<style scoped>
.happyScroll{
  width: 100%;
  height: 100%;
}
.wrapper{
  width: 100%;
  height: 100%;
}
.header{
  position: relative;
  height:60px !important;
  background:rgba(242,246,253,1);
}
.header .btnGroup{
  position: absolute;
  right: 20px;
  top: 20px;
}
.header .header-title{
  margin-bottom: 3px;
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(48,49,51,1);
}
.header .header-info .header-item{
  margin-right: 40px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(109,114,120,1);
}
.aside_contanier{
  box-sizing: border-box;
  width: 40% !important;
  padding: 20px 20px 0px 10px;
}
.main_contanier_title{
  margin-bottom: 15px;
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(0,0,0,1);
}
.main_contanier_info{
  box-sizing: border-box;
  padding: 15px 15px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 10px 0px rgba(0,0,0,0.05);
  border-radius:4px;
}
.wrapperArea{
  margin-bottom: 20px;
}
.wrapperArea-header{
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(0,0,0,1);
  margin-bottom: 20px;
}
.verticalLine{
  display: inline-block;
  width: 3px;
  height: 16px;
  vertical-align: -2px;
  background-color: #1989FA;
  margin-right: 2px;
}
.wrapperArea_item{
  display: inline-block;
  width: 50%;
  height: 40px;
  line-height: 40px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.redFont{
  position: relative;
  color: #F56C6C !important;
}
.oldData{
  display: block;
  position: absolute;
  bottom: -20px;
  left: 0px;
  display: inline-block;
  min-width: 150px;
  height: 100%;
  line-height: 12px;
  transform: scale(.9);
  font-size: 12px;
  font-family: PingFangSC-Regular,PingFang SC;
  font-weight: 400;
  color: rgba(144,147,153,1);
}
.wrapperArea_foot_item{
  height: 35px;
  line-height: 35px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.wrapperArea_foot_item_label{
  display: inline-block;
  margin-right: 10px;
  min-width: 60px;
  text-align: right;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(144,147,153,1);
}
.wrapperArea_item_label{
  display: inline-block;
  margin-right: 10px;
  min-width: 70px;
  text-align: right;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(144,147,153,1);
}
.last-header{
  margin-bottom: 15px;
}
.wrapperArea-tip{
  margin-bottom: 10px;
}
.wrapperArea-tip-word{
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(96,98,102,1);
  margin-right: 5px;
}
.wrapperArea-tip-icon{
  color:#C0C4CC;
  margin-right: 5px;
}
.wrapperArea-tip-btn{
  font-size:14px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(25,137,250,1);
}
.smallTable{
  margin-bottom: 20px;
}
.main_contanier_block{
  padding: 15px;
}
.main_contanier_block /deep/ .happy-scroll-container{
  height: 100% !important;
  width: 100% !important;
}
.blackColor{
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.marginBottom{
  display: inline-block;
  margin-bottom: 10px;
}
.elCard{
  position: relative;
}
.position{
  position: absolute;
  right: 20px;
  top: 20px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(144,147,153,1);
}
.main_contanier_approval /deep/ .el-timeline-item__timestamp{
  padding-top: 2px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.agreeTitle{
  font-weight: 700;
  color: #00BF70;
  margin-right: 10px;
  margin-bottom: 10px;
}
.agreeTitle i{
  margin-right: 3px;
}
.refuseTitle{
  font-weight: 700;
  color: #F56C6C;
  margin-right: 10px;
  margin-bottom: 10px;
}
.refuseTitle i{
  margin-right: 3px;
}
.agreeForm /deep/ .el-textarea textarea{
  min-height: 125px !important;
}
</style>