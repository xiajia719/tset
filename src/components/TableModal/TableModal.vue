<template>
<div>
 <div class="search-bar">
    <el-button v-if='refresh' icon="el-icon-refresh-right" @click="refresh()" style="margin-bottom:10px;">刷新</el-button>
    <div v-if="showEdite" class="fl" style="margin-bottom:20px;">
        <el-select class="screenInCustormeClass" v-if='isHaveScreenInCustorme' v-model="customerFormType" style="width: 140px" @change="$emit('screenCustorme', customerFormType)">
            <el-option label="全部" value="0"></el-option>
            <el-option label="我负责的" value="1"></el-option>
            <el-option label="我的下属负责的" value="2"></el-option>
        </el-select>
        <el-button  v-if="isShowSelectAll" size="mini" @click='selectAll([...tableData])'>全选</el-button>
        <el-button  v-if="addCustomer" type="success" class="addBtn" @click="addCustomer()">新建</el-button>
        <el-button  v-if="addPatient" type="success" class="addBtn" @click="addPatient()">新建</el-button>
        <el-button  v-if="redistributeFnc && isDutyDept" size="mini" @click="redistributeFnc(deleteArr)" :disabled='deleteArr.length != 1'>重分配</el-button>
        <!-- <el-button  v-if="addOpenSeaFnc" size="mini" @click="addOpenSeaFnc(deleteArr)" :disabled='deleteArr.length<1'>加入公海</el-button> -->
        <!-- <el-button  v-if="revokeFnc" size="mini" @click="revokeFnc(deleteArr)" :disabled='deleteArr.length<1'>撤销</el-button>
        <el-button  v-if="agreeFnc" size="mini" @click="agreeFnc(deleteArr)" :disabled='deleteArr.length<1'>同意</el-button>
        <el-button  v-if="refuseFnc" size="mini" @click="refuseFnc(deleteArr)" :disabled='deleteArr.length<1'>拒绝</el-button> -->
        <el-button  v-if="deleteTab" size="mini" @click="deleteTab(deleteArr)" :disabled='deleteArr.length<1'>删除</el-button>
        <el-button  v-if="handleAllDelete" size="mini" @click="handleAllDelete(deleteArr)" :disabled='deleteArr.length<1'>批量删除</el-button>
    </div>
    </div>
    <el-table
        id="table"
        ref="multipleTable"
        :data="tableData"
        :max-height='height'
        @selection-change='selectChange'
        @sort-change='sortableFnc'
        @row-click='rowClickFn'
        highlight-current-row
        style="width: 100%">
        <el-table-column
            v-if="showEdite||type==='expand'"
            :type="type">
        </el-table-column>
        <el-table-column
          v-for="item in columnData"
          :key="item.prop"
          :sortable="item.sortable"
          :prop="item.prop"
          :width="item.width"
          :align="item.align"
          :label="item.label">
            <template slot-scope="scope">
                <el-button v-if="item.prop == 'approvalSubject'" type="text" @click="toApprovalPage(scope.row)">{{scope.row.approvalSubject}}</el-button>
                <span v-else-if="item.prop == 'code' && $route.name == 'CustomerManagement' && scope.row.auditStatus == '审核中'" class="codeArea">
                    <span class="smallIcon"></span>
                    <el-tooltip class="item" effect="dark" content="审核中" placement="top">
                        <span class="smallIcon"></span>
                    </el-tooltip>
                    <span class="codeArea_code">{{scope.row.code}}</span>
                </span>
                <el-tooltip v-else-if="item.prop == 'auditType'"  effect="dark" :content="scope.row.auditType" placement="top-start">
                    <el-button type="text" @click="checkDetailFn(scope.row)">
                            {{scope.row.auditType}}
                    </el-button>
                </el-tooltip>
                <el-tooltip v-else-if="item.prop == 'commitDate'"  effect="dark" :content="scope.row.commitDate" placement="top-start">
                    <span style="white-space: nowrap;">{{scope.row.commitDate}}</span>
                </el-tooltip>
                <el-button v-else-if="item.prop == 'auditType'" type="text" @click="$router.push({name:'TerminalView',params:{id:scope.row.businessKey,userId:scope.row.startUserId,type:3}})">{{scope.row.auditType}}</el-button>
                <span v-else-if="item.prop == 'gender'">{{scope.row.gender == '1' ? '男':scope.row.gender == '2' ? '女':scope.row.gender}}</span>
                <el-button v-else-if="item.prop == 'cname' && $route.name == 'CustomerManagement'" type="text" @click="toCustomerInfoPage(scope.row)">{{scope.row.cname}}</el-button>
                <el-button v-else-if="item.prop == 'memberName'" type="text" @click="toPatientInfoPage(scope.row)">{{scope.row.memberName}}</el-button>
                <span style="white-space: nowrap;" v-else>{{scope.row[item.prop]}}</span>
            </template>
        </el-table-column>
        <el-table-column
          label=""
          width="150"
          v-if="isCustomerPage"
          align='center'>
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="handleCommand" placement='bottom'>
              <el-button type="text" @click="operateFnc(scope.$index, scope.row)">操作</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{type:1,index:scope.$index,data:scope.row}'>编辑</el-dropdown-item>
                <el-dropdown-item :command='{type:2,index:scope.$index,data:scope.row}' v-if="isDutyDept && scope.row.auditStatus == '审核通过'">重分配</el-dropdown-item>
                <!-- <el-dropdown-item :command='{type:3,index:scope.$index,data:scope.row}'>加入公海</el-dropdown-item> -->
                <el-dropdown-item :command='{type:4,index:scope.$index,data:scope.row}'>添加拜访</el-dropdown-item>
                <el-dropdown-item :command='{type:5,index:scope.$index,data:scope.row}' v-if="scope.row.auditStatus == '审核通过'">添加患者</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="150"
          v-if="isPatientPage"
          align='center'>
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="handleCommandInPatient" placement='bottom'>
              <el-button type="text" @click="operateFnc(scope.$index, scope.row)">操作</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{type:1,index:scope.$index,data:scope.row}'>编辑</el-dropdown-item>
                <el-dropdown-item :command='{type:2,index:scope.$index,data:scope.row}'>删除</el-dropdown-item>
                <el-dropdown-item :command='{type:3,index:scope.$index,data:scope.row}'>添加疗程</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="150"
          v-if="isExaminePage"
          align='center'>
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="handleCommandInExamine" placement='bottom'>
              <el-button type="text" @click="operateFnc(scope.$index, scope.row)">操作</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{type:1,index:scope.$index,data:scope.row}'>同意</el-dropdown-item>
                <el-dropdown-item :command='{type:2,index:scope.$index,data:scope.row}'>拒绝</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          v-if="showLast"
          align='center'>
          <template slot-scope="scope">
            <el-button v-if="editInfo" type="text" @click="editInfo(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="revoke" type="text" @click="revoke(scope.$index, scope.row)">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        style="margin-top:20px;"
        :handleSizeChange='handleSizeChange'
        :handleCurrentChange='handleCurrentChange'
        :pageSize='pageSize'
        :pageNum='pageNum'
        :totalRecord='totalRecord'
      />
</div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
    components: {
        Pagination
    },
    data() {
        return {
            searchData: {
                type: 0
            },
            // 客户管理界面的筛选类型
            customerFormType:'0',
            deleteArr: [],
            curentPageNum: 1,
            curentpageSize: 10
        }
    },
    props: {
        pageSize:{
            type: Number,
            default:10
        },
        pageNum:{
            type: Number,
            default:1
        },
        refresh:{
            type: Function
        },
        // 去审批界面
        toApprovalPage:{
            type: Function
        },
        // 去客户详情页面
        toCustomerInfoPage:{
            type: Function
        },
        // 去患者详情页面
        toPatientInfoPage:{
            type: Function
        },
        // 新建客户
        addCustomer: {
            type: Function
        },
        // 新建客户
        addPatient: {
            type: Function
        },
        // 顶部的重分配fnc
        redistributeFnc:{
            type: Function
        },
        // 顶部的加入公海fnc
        addOpenSeaFnc:{
            type: Function
        },
        // 顶部的撤销fnc
        revokeFnc:{
            type: Function
        },
        // 顶部的同意fnc
        agreeFnc:{
            type: Function
        },
        // 顶部的拒绝fnc
        refuseFnc:{
            type: Function
        },
        // 操作区域的撤销fnc
        revoke:{
            type: Function
        },
        // 全选移除
        handleAllDelete:{
            type: Function
        },
        // 移除
        deleteTab: {
            type: Function
        },
        // 编辑
        editInfo: {
            type: Function
        },
        sortableFnc:{
            type: Function
        },
        rowClickFn: {
            type: Function,
            default: () => {}
        },
        height: {
            type: Number
        },
        totalRecord: {
            type: Number
        },
        tableData: {
            type: Array,
            required: true
        },
        columnData: {
            type: Array,
            required: true
        },
        // 根据是否是部门负责人判断是否显示重分配按钮是否显示全选按钮
        isDutyDept: {
            type: Boolean,
            default: false
        },
        // 是否显示全选按钮
        isShowSelectAll: {
            type: Boolean,
            default: true
        },
        showEdite: {
            type: Boolean,
            default: true
        },
        // 表格后方的操作
        showLast: {
            type: Boolean,
            default: true
        },
        // 是否是客户信息界面的筛选框
        isHaveScreenInCustorme: {
            type: Boolean,
            default: false
        },
        // 是否是客户信息界面，不展示操作
        isCustomerPage: {
            type: Boolean,
            default: false
        },
        // 是否是患者信息界面，不展示操作
        isPatientPage: {
            type: Boolean,
            default: false
        },
        // 是否是审核界面，不展示操作
        isExaminePage: {
            type: Boolean,
            default: false
        },
        onSearch: {
            type: Function
        },
        type: {
            type: String,
            default: 'selection'
        }
    },
    methods: {
        // 客户信息页面的操作
        operateFnc(){},
        // 客户信息页点击操作后的下拉选框
        handleCommand(command){
            switch(command.type) {
                case 1:
                    // 编辑
                    this.$emit('edit', {index:command.index,data:command.data})
                    break
                case 2:
                    // 重分配
                    this.$emit('redistribute', {index:command.index,data:command.data})
                    break
                case 3:
                    // 加入公海
                    this.$emit('addOpenSea', {index:command.index,data:command.data})
                    break
                case 4:
                    // 添加拜访
                    this.$emit('addVisit', {index:command.index,data:command.data})
                    break
                case 5:
                    // 添加患者
                    this.$emit('addPatientAction', {index:command.index,data:command.data})
            }
        },
        // 患者管理页点击操作后的下拉选框
        handleCommandInPatient(command){
            switch(command.type) {
                case 1:
                    // 编辑
                    this.$emit('editPatient', {index:command.index,data:command.data})
                    break
                case 2:
                    // 删除
                    this.$emit('deletePatient', {index:command.index,data:command.data})
                    break
                case 3:
                    // 添加疗程
                    this.$emit('addTreatment', {index:command.index,data:command.data})
            }
        },
        // 审核信息页点击操作后的下拉选框
        handleCommandInExamine(command){
            switch(command.type) {
                case 1:
                    // 同意
                    this.$emit('agreeExamine', {index:command.index,data:command.data})
                    break
                case 2:
                    // 拒绝
                    this.$emit('refuseExamine', {index:command.index,data:command.data})
            }
        },
        // 排序方法
        sortChange(column, prop, order){
            // console.log(column, prop, order,'1111')
        },
        onError() {
            this.$message.error('文件路径粘贴失败')
        },
        handleSizeChange(val) {
            this.curentpageSize = val
            this.onSearch({ pageNum: this.curentPageNum, pageSize: val })
        },
        handleCurrentChange(val) {
            this.curentPageNum = val
            this.onSearch({ pageNum: val, pageSize: this.curentpageSize })
        },
        selectAll(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row)
                })
            } else {
                this.$refs.multipleTable.clearSelection()
            }
        },
        selectChange(val) {
            this.deleteArr = val
        },
        checkDetailFn(row){
            if(row.processDefinitionKey === 'crm_customer_addHospital' || row.processDefinitionKey === 'crm_customer_updateHospital'){
                this.$router.push({name:'approvalPreview',params:{id:row.businessKey,userId:row.startUserId,type:3}})
            }else if(row.processDefinitionKey === 'crm_customer_addCustomer' || row.processDefinitionKey === 'crm_customer_updateCustomer'){
               this.$router.push({name:'editApprovalInfo',params:{id:row.businessKey,userId:row.startUserId}})
               sessionStorage.setItem('customerParams',JSON.stringify(row))
            }else{
                return false
            }
        }
    }
}
</script>

<style scoped>
.fr{
    float:right;
}
.fl{
    float:left;
}
.fl button{
  width: 85px;
  height: 36px;
}
.search-bar{
    overflow: hidden;
}
.el-form-item__content{
    line-height:40px !important;
}
/* 滚动条的宽度 */
.search-bar /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
/* 滚动条的滑块 */
.search-bar /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
}
.titleWrapper{
    width: 100%;
}
.screenInCustormeClass{
    margin-right: 10px;
}
.screenInCustormeClass /deep/ .el-input__inner{
  height: 36px;
  line-height: 36px;
}
.codeArea{
    position: relative;
    display: inline-block;
    width: 100%;
}
.codeArea_code{
    margin-left: 16px;
}
.smallIcon{
    position: absolute;
    left: 0px;
    top: 50%;
    margin-top: -3px;
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #FA6400;
}
</style>
