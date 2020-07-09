<template>
  <el-tabs v-if="$route.path===('/AuditManagement')" v-model="activeName" type="card" @tab-click="handleClick"  class="container">
    <el-tab-pane label="我提交的" name="mySubmit">
    <SearchModal
    :createFn="null"
    :searchFn='onSearch'
    :baseValue='searchConfig'>
      <template v-slot:searchItem>
          <el-select placeholder="搜索终端名称" clearable v-model="searchConfig.inputValue" class="rightBorderRadius leftSelectRadius"  style="width:230px;">
            <el-option v-for="item in listArr[searchConfig.selectValue]" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
      </template>
    </SearchModal>
      <!-- <div class='tools-bar'>
        <el-form :inline="true" :model="submitForm" class="header_form">
          <el-form-item class="header_form_first">
            <el-select v-model="submitForm.b" style="width: 120px;" @change="changeSearch">
              <el-option label="客户名称" value="1"></el-option>
              <el-option label="销售代表" value="2"></el-option>
              <el-option label="产品" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="header_form_last">
            <el-input v-model="submitForm.searchContent" :placeholder="placeholder" style="width: 200px" clearable @clear="onSearch({pageNum:1,pageSize:10})"></el-input>
            <el-button type="primary" @click="onSearch({pageNum:1,pageSize:10})">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button plain icon="el-icon-setting" style="width: 100px" @click="openTableConfig">列表配置</el-button>
          </el-form-item>
        </el-form>
      </div> -->
      <TableModal
        ref='child'
        :showEdite='false'
        :isShowSelectAll='false'
        :totalRecord='totalRecord'
        :pageNum='mySubmitParams.pageNum'
        :pageSize='mySubmitParams.pageSize'
        :onSearch='onSearch'
        :tableData='tableData'
        :columnData='columnData'
        :sortableFnc='sortableFnc'
        :revokeFnc='revokeFnc'
        :revoke='revoke'
        :toApprovalPage='toApprovalPage'
      />
    </el-tab-pane>
    <el-tab-pane label="我审核的" name="myExamine">
    <SearchModal
    :createFn="null"
    :searchFn='onSearchInExamine'
    :baseValue='searchConfig'>
      <template v-slot:searchItem>
          <el-select placeholder="搜索终端名称" clearable v-model="searchConfig.inputValue" class="rightBorderRadius leftSelectRadius"  style="width:230px;">
            <el-option v-for="item in listArr[searchConfig.selectValue]" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
      </template>
    </SearchModal>
      <!-- <div class='tools-bar'>
        <el-form :inline="true" :model="examineForm" class="header_form">
          <el-form-item class="header_form_first">
            <el-select v-model="examineForm.a" style="width: 120px;" @change="changeSearchInExamine">
              <el-option label="客户名称" value="1"></el-option>
              <el-option label="销售代表" value="2"></el-option>
              <el-option label="产品" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="header_form_last">
            <el-input v-model="examineForm.searchContent" :placeholder="placeholderInExamine" style="width: 200px" clearable @clear="onSearchInExamine({pageNum:1,pageSize:10})"></el-input>
            <el-button type="primary" @click="onSearchInExamine({pageNum:1,pageSize:10})">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button plain icon="el-icon-setting" style="width: 100px" @click="openTableConfigInExamine">列表配置</el-button>
          </el-form-item>
        </el-form>
      </div> -->
      <TableModal
        ref='child'
        :showEdite='false'
        :showLast='false'
        :isExaminePage='true'
        :isShowSelectAll='false'
        :totalRecord='totalRecordInExamine'
        :pageNum='myExamineParmas.pageNumInExamine'
        :pageSize='myExamineParmas.pageSizeInExamine'
        :onSearch='onSearchInExamine'
        :tableData='tableDataInExamine'
        :columnData='columnDataInExamine'
        :sortableFnc='sortableFnc'
        :agreeFnc='agreeFnc'
        :refuseFnc='refuseFnc'
        :toApprovalPage='toApprovalPage'
        @agreeExamine='agreeExamine'
        @refuseExamine='refuseExamine'
      />
    </el-tab-pane>
    <el-dialog title="列表配置" :visible.sync="tableConfigDialog" class="tableConfigDialog">
      <el-transfer
        filterable
        :filter-method="filterMethod"
        :titles="['列表字段', '显示字段']"
        filter-placeholder="请输入搜索内容"
        v-model="transferValue"
        :data="transferData">
        <el-button class="transfer-footer" slot="right-footer" size="small" @click="clearCheckColumnList">清除</el-button>
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tableConfigDialog = false">取 消</el-button>
        <el-button type="primary" @click="tableConfigDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="同意" :visible.sync="agreeDialog" class="agreeDialog" width="490px">
      <el-form class="agreeForm">
        <el-form-item label="输入审批意见">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="agreeOpinion"
            autosize
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="agreeDialog = false">取 消</el-button>
        <el-button type="primary" @click="sumitOkOrNoAdvice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="拒绝" :visible.sync="refuseDialog" class="agreeDialog" width="490px">
      <el-form class="agreeForm">
        <el-form-item label="输入审批意见">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="refuseOpinion"
            autosize
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refuseDialog=false">取 消</el-button>
        <el-button type="primary" @click="sumitOkOrNoAdvice">确 定</el-button>
      </span>
    </el-dialog>
  </el-tabs>
  <router-view v-else></router-view>
</template>
<script>
import TableModal from '@/components/TableModal/TableModal'
import SearchModal from "@/components/SearchModal"
import {findMyFlow,findMyTask,deleteProcessInstanceById,taskAudit,graphHistoryProcessInstance,getAuditDropList} from '@/api/auditManagementApi'
export default {
  components:{
    TableModal,
    SearchModal
  },
  created(){
    if(this.$route.path === '/AuditManagement'){
      this.onSearch()
    }
    getAuditDropList().then(res => {
      this.listArr.processDefList = []
      for (const [key, value] of Object.entries(res)) {
          this.listArr.processDefList.push({value:key,label:value})
        }
         this.listArr.processDefList.unshift({
           value:'',
           label:'全部'
         })
    })
  },
  data() {
    const generateData = _ => {
      const data = []
      const columnList = ['姓名', '性别', '邮箱', '是否专家库', '身份证号', '银行卡号', '终端', '科室']
      columnList.forEach((item, index) => {
        data.push({
          label: item,
          key: index
        })
      })
      return data
    }
    return {
      activeName:'mySubmit',
      tableConfigDialog:false,
      transferData: generateData(),
      transferValue: [3,4,5,6,7,8],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      searchConfig:{
         selectValue:'processDefList',
         inputValue:'',
          selectOptions:[
          {label:'审核主题',value:'processDefList'}
        ]
      },
      listArr:{
        processDefList:[]
      },
      // --------------------------------------我提交的Data
      placeholder:'搜索客户名称',
      submitForm:{
        b:'1',
        searchContent:""
      },
      tableData:[],
      columnData:[
           {
          prop: 'auditType',
          label: '审核主题',
          width:'180px'
        },
        {
          prop: 'auditObject',
          label: '审核对象'
        },
        {
          prop: 'applyUser',
          label: '提交人'
        },
        {
          prop: 'commitDate',
          label: '提交时间'
        },
        {
          prop: 'processNode',
          label: '当前审核人'
        },
        {
          prop: 'auditStatus',
          label: '状态'
        }
      ],
      totalRecord:0,
      mySubmitParams:{
        pageNum:1,
        pageSize:10,
        processDefinitionKey:''
      },
      cancelParams:{
        startUserId:null,//申请人ID
        businessKey:null,//业务ID
        deleteCause:null,//撤销意见
        processDefinitionKey:null,//流程定义key
        processInstanceId:null//流程实例ID
      },
      okOrNoParams:{
        startUserId:null,//申请人ID
        taskId:null,//任务id
        businessKey:null,//业务ID
        audit:null,//同意：true，拒绝：false
        auditOpinion:null,//审核意见
        processDefinitionKey:null,//流程定义key
        taskDefinitionKey:null//任务定义key
      },
      // --------------------------------------我审核的Data
      agreeDialog:false,
      agreeOpinion:"",
      refuseDialog:false,
      refuseOpinion:"",
      placeholderInExamine:'搜索客户名称',
      examineForm:{
        a:'1',
        searchContent:""
      },
      tableDataInExamine:[],
      columnDataInExamine:[
        {
          prop: 'auditType',
          label: '审核主题',
          width:'180px'

        },
        {
          prop: 'auditObject',
          label: '审核对象'
        },
        {
          prop: 'applyUser',
          label: '提交人'
        },
        {
          prop: 'commitDate',
          label: '提交时间'
        },
        {
          prop: 'processNode',
          label: '当前审核人'
        },
        {
          prop: 'auditStatus',
          label: '状态'
        }
      ],
      myExamineParmas:{
        pageNumInExamine:1,
        pageSizeInExamine:10,
        processDefinitionKey:''
      },
      totalRecordInExamine:0
    }
  },
  mounted() {
    // window.location.href = '/api-bpm-wf/flow/bpm/graphHistoryProcessInstance?processInstanceId=16e6d416-bcff-11ea-ab82-0242ac110003'
  },
  watch:{
    activeName(val){
      if(val === 'mySubmit'){
        this.onSearch()
      }else{
        this.onSearchInExamine()
      }
    },
    '$route.path'(val){
      if(val === '/AuditManagement'){
         this.onSearch()
      }
    }
  },
  methods: {
    // -----------------------------------------------------------公共方法-------------------------------
    handleClick(tab){
      // console.log(tab)
    },
    clearCheckColumnList(){
      this.transferValue = []
    },
    // -----------------------------------------------------------我提交的表格fnc区域---------------------
    onSearch({ pageNum = this.mySubmitParams.pageNum, pageSize = this.mySubmitParams.pageSize } = {}){
      this.mySubmitParams.pageNum = pageNum
      this.mySubmitParams.pageSize = pageSize
      this.mySubmitParams.processDefinitionKey = this.searchConfig.inputValue
      findMyFlow(this.mySubmitParams).then(res => {
        this.tableData = res.data
        this.totalRecord = res.total
      })
    },
    // 顶部的撤销
    revokeFnc(){
      this.$confirm('撤销后将需要重新提交，是否确认撤销？', '撤销', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        
      }).catch(() => {})
    },
    // 操作区域的撤销
    revoke(index,data){
      if(data.auditStatus !== '审核中'){
          this.$message.warning('只有审核中才可撤销')
        return false 
      }
      this.$confirm('撤销后将需要重新提交，是否确认撤销？', '撤销', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const {
        startUserId,
        businessKey,
        processDefinitionKey,
        processInstanceId} = data
        Object.assign(this.cancelParams,{startUserId,businessKey,processDefinitionKey,processInstanceId})
        deleteProcessInstanceById(this.cancelParams).then(res => {
          this.$message.success('撤销成功')
        })
      }).catch(() => {})
    },
    // 列表配置按钮
    openTableConfig(){
      this.tableConfigDialog = true
    },
    // 切换搜索的字段Select
    changeSearch(val){
      switch(val) {
        case '1':
          this.placeholder = '搜索客户名称'
          break
        case '2':
          this.placeholder = '搜索销售代表'
          break
        case '3':
          this.placeholder = '搜索产品'
      }
    },
    // 排序
    sortableFnc(){},
    // 去审批页面
    toApprovalPage(data){
      if(data.type == 1){
        this.$router.push({name:'newApprovalInfo'})
      }else if(data.type == 2){
        this.$router.push({name:'editApprovalInfo'})
      }
    },
    // -----------------------------------------------------------我创建的表格fnc区域---------------------
    onSearchInExamine({ pageNum = this.myExamineParmas.pageNumInExamine , pageSize = this.myExamineParmas.pageSizeInExamine } = {}){
      this.myExamineParmas.pageNumInExamine = pageNum
      this.myExamineParmas.pageSizeInExamine = pageSize
      const {pageNumInExamine,pageSizeInExamine} = this.myExamineParmas
      findMyTask({pageSize:pageSizeInExamine,pageNum:pageNumInExamine,processDefinitionKey :this.searchConfig.inputValue}).then(res => {
        this.tableDataInExamine = res.data
        this.totalRecordInExamine = res.total
      })
    },
    // 改变搜索的字段
    changeSearchInExamine(val){
      switch(val) {
        case '1':
          this.placeholderInExamine = '搜索客户名称'
          break
        case '2':
          this.placeholderInExamine = '搜索销售代表'
          break
        case '3':
          this.placeholderInExamine = '搜索产品'
      }
    },
    // 列表配置按钮
    openTableConfigInExamine(){
      this.tableConfigDialog = true
    },
    // 顶部的同意按钮FNC
    agreeFnc(){
      this.agreeDialog = true
    },
    // 顶部的拒绝按钮FNC
    refuseFnc(){
      this.refuseDialog = true
    },
    // 操作下同意按钮
    agreeExamine({index,data}){
      this.agreeOpinion = ''
      this.agreeDialog = true
      const {startUserId,taskId,businessKey,processDefinitionKey,taskDefinitionKey,processInstanceId} = data
      Object.assign(this.okOrNoParams,{startUserId,taskId,businessKey,audit:1,processDefinitionKey,taskDefinitionKey,processInstanceId})
    },
    // 操作下拒绝按钮
    refuseExamine({index,data}){
      this.refuseOpinion = ''
      this.refuseDialog = true
      const {startUserId,taskId,businessKey,processDefinitionKey,taskDefinitionKey,processInstanceId} = data
      Object.assign(this.okOrNoParams,{startUserId,taskId,businessKey,audit:0,processDefinitionKey,taskDefinitionKey,processInstanceId})
    },
    sumitOkOrNoAdvice(){
      if(this.refuseDialog){
        this.okOrNoParams.auditOpinion = this.refuseOpinion
        this.refuseDialog = false
        }else if(this.agreeDialog){
        this.okOrNoParams.auditOpinion = this.agreeOpinion
        this.agreeDialog = false
      }
      taskAudit(this.okOrNoParams).then(res => {
         this.$message.success('操作成功')
         this.onSearchInExamine()
      })
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  /* height: 100%; */
  background: #fff;
  padding: 30px 20px;
}
.container /deep/ .el-textarea textarea{
  min-height: 125px !important;
}
.container /deep/ .el-dialog__body{
  padding-top: 20px;
  padding-bottom: 10px;
}
.container /deep/ .el-tabs__header{
  margin: 0 0 30px;
}
.container /deep/ .el-tabs__item{
  font-weight: 700;
  font-size: 14px;
}
.tools-bar{
  float: right;
  height: 36px;
  margin-bottom:20px;
}
.tools-bar button{
  width: 85px;
  height: 36px;
}
.tools-bar /deep/ .el-form-item{
  margin-bottom: 0px;
  margin-right: 20px;
}
.tools-bar /deep/ .el-input__inner{
  height: 36px;
  line-height: 36px;
}
.submitForm .header_form{
  float: right;
}
.header_form_first{
  margin-right: 0 !important;
}
.header_form_first /deep/ input{
  border-right: none;
  border-radius: 4px 0 0 4px;
}
.header_form_last /deep/ input{
  border-radius: 0px 0 0 0px;
  line-height: 33px;
}
.header_form_last /deep/ button{
  width: 70px;
  border-radius: 0px 4px 4px 0px;
}
.tableConfigDialog /deep/ .el-transfer-panel__footer{
  line-height: 40px;
  padding-left: 14px;
}
.tableConfigDialog .transfer-footer{
  line-height: 24px;
  text-align: center;
  width:60px;
  height:24px;
  padding: 0px;
}
.agreeDialog /deep/ .el-form-item__label{
  margin-bottom: 10px;
}
</style>