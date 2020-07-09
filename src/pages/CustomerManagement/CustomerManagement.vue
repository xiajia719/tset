<template>
  <router-view v-if="$route.path.match('addCustomer') || $route.path.match('customerInfo') || $route.path.match('editCustomer')"></router-view>
  <el-tabs v-else v-model="activeName" type="card" @tab-click="handleClick"  class="container">
    <el-tab-pane label="客户信息" name="customerInfo">
      <div class='tools-bar'>
        <el-form :inline="true" :model="customerForm" class="header_form">
          <el-form-item class="header_form_first">
            <el-select v-model="customerForm.searchContentType" style="width: 120px;" @change="changeSearch">
              <el-option label="客户名称" value="1"></el-option>
              <el-option label="手机号码" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="header_form_last">
            <el-input v-model="customerForm.searchContent" :placeholder="placeholder" style="width: 200px" clearable @clear="onSearch({pageNum:1,pageSize:10})"></el-input>
            <el-button type="primary" @click="onSearch({pageNum:1,pageSize:10})">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button plain icon="el-icon-setting" style="width: 100px" @click="openTableConfig">列表配置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <TableModal
        ref='child'
        :showLast='false'
        :isDutyDept='isDutyDept'
        :isCustomerPage='true'
        :isShowSelectAll='false'
        :totalRecord='totalRecord'
        :pageNum='pageNum'
        :pageSize='pageSize'
        :onSearch='onSearch'
        :tableData='tableData'
        :columnData='columnData'
        :sortableFnc='sortableFnc'
        :addCustomer='addCustomer'
        :redistributeFnc='redistributeFnc'
        :toCustomerInfoPage='toCustomerInfoPage'
        :addOpenSeaFnc='addOpenSeaFnc'
        :isHaveScreenInCustorme='true'
        @screenCustorme='screenCustorme'
        @edit='edit'
        @redistribute='redistribute'
        @addOpenSea='addOpenSea'
        @addVisit='addVisit'
        @addPatientAction='addPatientAction'
      />
    </el-tab-pane>
    <el-tab-pane label="草稿信息" name="draftInfo">
      <div class='tools-bar'>
        <el-form :inline="true" :model="draftForm" class="header_form">
          <!-- <el-form-item class="header_form_first">
            <el-select v-model="draftForm.searchContentType" style="width: 120px;" @change="changeSearchInDraft">
              <el-option label="客户名称" value="1"></el-option>
              <el-option label="销售代表" value="2"></el-option>
              <el-option label="产品" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="header_form_last">
            <el-input v-model="draftForm.searchContent" :placeholder="placeholderInDraft" style="width: 200px" clearable @clear="onSearchInDraft({pageNum:1,pageSize:10})"></el-input>
            <el-button type="primary" @click="onSearchInDraft({pageNum:1,pageSize:10})">搜索</el-button>
          </el-form-item> -->
          <!-- <el-form-item label="状态">
            <el-select v-model="draftForm.auditStatus" @change="onSearchInDraft({pageNum:1,pageSize:10})">
              <el-option label="全部" value=""></el-option>
              <el-option label="保存" value="0"></el-option>
              <el-option label="审核中" value="1"></el-option>
              <el-option label="审核完成" value="2"></el-option>
              <el-option label="审核拒绝" value="3"></el-option>
              <el-option label="撤销" value="4"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button plain icon="el-icon-setting" style="width: 100px" @click="openTableConfigInDraft">列表配置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <TableModal
        ref='child'
        :showEdite='false'
        :isShowSelectAll='false'
        :totalRecord='totalRecordInDraft'
        :pageNum='pageNumInDraft'
        :pageSize='pageSizeInDraft'
        :onSearch='onSearchInDraft'
        :tableData='tableDataInDraft'
        :columnData='columnDataInDraft'
        :sortableFnc='sortableFnc'
        :editInfo='editInfo'
        :toCustomerInfoPage='toCustomerInfoPage'
      />
    </el-tab-pane>
    <el-dialog title="添加拜访" :visible.sync="addVisitDialog" class="addVisitContainer" width="500px" :close-on-click-modal='false' :show-close='false'>
      <el-form class="addVisitForm" :model="addVisitform" label-width="60px" :rules="visitRules" ref="visitForm">
        <el-form-item label="客户">
          <el-input v-model="addVisitform.customer" :disabled="true" style="width:380px"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="visitDate">
          <el-date-picker
            v-model="addVisitform.visitDate"
            value-format='yyyy-MM-dd HH:mm:ss'
            type="datetime"
            placeholder="拜访时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="方式" prop="visitWay">
          <el-select v-model="addVisitform.visitWay" style="width: 120px;">
            <el-option
              v-for="item in visitMethodList"
              :label="item.value"
              :value="item.id"
              :key="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" class="beizhu" prop="remark">
          <el-input
            type="textarea"
            style="width:380px"
            :rows="6"
            placeholder="请输入内容"
            v-model="addVisitform.remark"
            autosize
            maxlength="150"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item class="addVisitImage">
          <span class="addVisitImage_tips">添加图片（最多可添加五张）</span>
          <el-upload
            :limit="5"
            name="files"
            :file-list="fileList"
            action="/api-com-oss/web/common-file/upload-file-web"
            :data='{isOpen:true}'
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-success="uploadFileSuccesss"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisitCancel('visitForm')">取 消</el-button>
        <el-button type="primary" @click="addVisitSubmit('visitForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="重分配" :visible.sync="resetDialog" class="resetContainer" width="490px" :close-on-click-modal='false' :show-close='false'>
      <el-table
        class="tableWrapper"
        border
        :data="resetTableData"
      >
        <el-table-column
          label="原销售代表"
          align='center'
          prop="oldSaler">
          <template slot-scope="scope">
            <span style="color:#909399;">{{scope.row.oldSaler}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="新销售代表"
          align='center'
          prop="newSaler">
          <template slot-scope="scope">
            <span style="fontSize:12px;lineHeight:30px;color:#303133;">{{scope.row.newSaler}}</span>
            <el-button type="text" class="resetContainer-reset" @click="openOrgToReset(scope.$index,scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDialog = false">取 消</el-button>
        <el-button type="primary" @click="resetSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 客户信息的列表配置 -->
    <el-dialog title="列表配置" :visible.sync="tableConfigDialog" class="tableConfigDialog" :close-on-click-modal='false' :show-close='false'>
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
        <el-button type="primary" @click="submitTableConfig">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 草稿箱的列表配置 -->
    <el-dialog title="列表配置" :visible.sync="tableConfigDialogWithDarft" class="tableConfigDialog" :close-on-click-modal='false' :show-close='false'>
      <el-transfer
        filterable
        :filter-method="filterMethod"
        :titles="['列表字段', '显示字段']"
        filter-placeholder="请输入搜索内容"
        v-model="transferValueWithDarft"
        :data="transferData">
        <el-button class="transfer-footer" slot="right-footer" size="small" @click="clearCheckColumnListWithDarft">清除</el-button>
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tableConfigDialogWithDarft = false">取 消</el-button>
        <el-button type="primary" @click="submitTableConfigWithDarft">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
    <Organizational
      ref="orgChild"
      :title='orgTitle'
      :orgRuleType='0'
      :isMultipleChoice='false'
      :addMenDialog='addMenDialog'
      :initCheckRoleData='checkRoleData'
      @closeDialog='closeDialog'
      @saveCheckRoleData='saveCheckRoleData'
    />
  </el-tabs>
</template>

<script>
import TableModal from '@/components/TableModal/TableModal'
import Organizational from '@/components/Organizational/Organizational.vue'
import {
  getCustomerList,
  isDutyDept,
  getUsersByCustomerId,
  getCustomerDraftList,
  addCustomerVisit,
  getSysConfigByCodeList,
  saveReAllocation
} from '@/api/customerApi.js'
import {
  moreLetter
} from '@/utils/common.js'
export default {
  components:{
    TableModal,
    Organizational
  },
  data() {
    const generateData = _ => {
      const data = []
      const columnList = [
        {
          prop: 'code',
          label: '编号',
          disabled:true
        },
        {
          prop: 'cname',
          label: '姓名',
          disabled:true
        },
        {
          prop: 'tel',
          label: '手机号码',
          disabled:true
        },
        {
          prop: 'hospitalName',
          label: '终端',
          disabled:true
        },
        {
          prop: 'department',
          label: '科室',
          disabled:true
        },
        {
          prop: 'position',
          label: '职务',
          disabled:true
        },
        {
          prop: 'postName',
          label: '职称',
          disabled:true
        },
        {
          prop: 'behalfName',
          label: '销售代表',
          disabled:true
        },
        {
          prop: 'gender',
          label: '性别'
        },
        {
          prop: 'nativePlace',
          label: '籍贯'
        },
        {
          prop: 'email',
          label: '邮箱'
        },
        {
          prop: 'weixin',
          label: '微信'
        },
        {
          prop: 'idCard',
          label: '身份证号'
        },
        {
          prop: 'bank',
          label: '开户行'
        },
        {
          prop: 'bankNum',
          label: '银行卡号'
        },
        {
          prop: 'institutePost',
          label: '学会职务'
        },
        {
          prop: 'manageBeds',
          label: '管理床位数'
        },
        {
          prop: 'medicalPostName',
          label: '医疗技术专业职称'
        },
        {
          prop: 'mediPractiType',
          label: '执业医师类别'
        },
        {
          prop: 'adeptField',
          label: '擅长领域'
        },
        {
          prop: 'isExpertLib',
          label: '是否专家库'
        },
        {
          prop: 'auditStatus',
          label: '审核状态'
        }
      ]
      columnList.forEach((item, index) => {
        data.push({
          label: item.label,
          key: item.prop,
          disabled:item.disabled
        })
      })
      return data
    };
    return {
      // 所有数据
      initColmunData:[
        {
          prop: 'code',
          label: '编号'
        },
        {
          prop: 'cname',
          label: '姓名'
        },
        {
          prop: 'tel',
          label: '手机号码'
        },
        {
          prop: 'hospitalName',
          label: '终端'
        },
        {
          prop: 'department',
          label: '科室'
        },
        {
          prop: 'position',
          label: '职务'
        },
        {
          prop: 'postName',
          label: '职称'
        },
        {
          prop: 'behalfName',
          label: '销售代表'
        },
        {
          prop: 'gender',
          label: '性别'
        },
        {
          prop: 'nativePlace',
          label: '籍贯'
        },
        {
          prop: 'email',
          label: '邮箱'
        },
        {
          prop: 'weixin',
          label: '微信'
        },
        {
          prop: 'idCard',
          label: '身份证号'
        },
        {
          prop: 'bank',
          label: '开户行'
        },
        {
          prop: 'bankNum',
          label: '银行卡号'
        },
        {
          prop: 'institutePost',
          label: '学会职务'
        },
        {
          prop: 'manageBeds',
          label: '管理床位数'
        },
        {
          prop: 'medicalPostName',
          label: '医疗技术专业职称'
        },
        {
          prop: 'mediPractiType',
          label: '执业医师类别'
        },
        {
          prop: 'adeptField',
          label: '擅长领域'
        },
        {
          prop: 'isExpertLib',
          label: '是否专家库'
        },
        {
          prop: 'auditStatus',
          label: '审核状态'
        }
      ],
      transferValue: ['code','cname','tel','hospitalName','department','position','postName','behalfName'],
      // -------------------------------------------------------草稿箱的列表配置
      transferValueWithDarft: ['code','cname','tel','hospitalName','department','position','postName','behalfName'],
      tableConfigDialogWithDarft:false,
      // -------------------------------------------------------
      // 拜访方式options
      visitMethodList:[],
      // 拜访的表单验证
      visitRules: {
        visitDate: [
          { required: true, message: '请选择拜访时间', trigger: 'change' }
        ],
        visitWay: [
          { required: true, message: '请选择拜访方式', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请选择治疗周期', trigger: 'blur' }
        ]
      },
      activeName:'customerInfo',
      tableConfigDialog:false,
      transferData: generateData(),
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      // --------------------------------------客户信息Data
      // 添加拜访的上传图片
      fileList:[],
      fileListData:[],
      gidList:'',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      placeholder:'搜索客户名称',
      dataRange:'0',
      customerForm:{
        searchContentType:'1',
        searchContent:""
      },
      tableData:[
      ],
      columnData:[
        {
          prop: 'code',
          label: '编号'
        },
        {
          prop: 'cname',
          label: '姓名'
        },
        {
          prop: 'tel',
          label: '手机号码'
        },
        {
          prop: 'hospitalName',
          label: '终端'
        },
        {
          prop: 'department',
          label: '科室'
        },
        {
          prop: 'position',
          label: '职务'
        },
        {
          prop: 'postName',
          label: '职称'
        },
        {
          prop: 'behalfName',
          label: '销售代表'
        }
      ],
      totalRecord:0,
      pageNum:1,
      pageSize:10,
      addVisitDialog:false,
      addVisitform:{
        customer:'',
        visitDate:'',
        visitWay:'',
        remark:''
      },
      resetDialog:false,
      // --------------------------------------草稿信息Data
      placeholderInDraft:'搜索客户名称',
      draftForm:{
        searchContentType:'1',
        searchContent:"",
        auditStatus:''
      },
      tableDataInDraft:[
      ],
      columnDataInDraft:[
        {
          prop: 'code',
          label: '编号'
        },
        {
          prop: 'cname',
          label: '姓名'
        },
        {
          prop: 'tel',
          label: '手机号码'
        },
        {
          prop: 'hospitalName',
          label: '终端'
        },
        {
          prop: 'department',
          label: '科室'
        },
        {
          prop: 'position',
          label: '职务'
        },
        {
          prop: 'postName',
          label: '职称'
        },
        {
          prop: 'behalfName',
          label: '销售代表'
        }
      ],
      totalRecordInDraft:0,
      pageNumInDraft:1,
      pageSizeInDraft:10,
      // ---------------------------------重分配的组织架构
      resetTableData:[
      ],
      orgTitle:'选择员工',
      checkRoleData:[],
      addMenDialog:false,
      isDutyDept:false,
      currentChoiceCustomerId:'',
      currentResetIndex:''
    }
  },
  mounted() {
    if(this.$route.name == "CustomerManagement"){
      if(this.activeName == 'customerInfo'){
        this.onSearch()
      }else if(this.activeName == 'draftInfo'){
        this.onSearchInDraft()
      }
      this.getIsDutyDept()
      this.getSysConfigByCodeList()
    }
  },
  methods: {
    // -----------------------------------------------------------列表配置方法
    clearCheckColumnList(){
      this.transferValue = ['code','cname','tel','hospitalName','department','position','postName','behalfName']
    },
    // 客户信息的列表配置提交
    submitTableConfig(){
      const _this = this
      let arr = []
      this.transferValue.map(item => {
        this.initColmunData.map(data => {
          if(data.prop == item){
            arr.push(data)
          }
        })
      })
      this.columnData = arr.map(item => {
        return item
      })
      this.tableConfigDialog = false
    },
    // 草稿箱的列表配置提交
    submitTableConfigWithDarft(){
      const _this = this
      let arr = []
      this.transferValueWithDarft.map(item => {
        this.initColmunData.map(data => {
          if(data.prop == item){
            arr.push(data)
          }
        })
      })
      this.columnDataInDraft = arr.map(item => {
        return item
      })
      this.tableConfigDialogWithDarft = false
    },
    // 草稿箱的清空列表配置
    clearCheckColumnListWithDarft(){
      this.transferValueWithDarft = ['code','cname','tel','hospitalName','department','position','postName','behalfName']
    },
    // -----------------------------------------------------------公共方法-------------------------------
    // 获取拜访方式的option
    getSysConfigByCodeList(){
      getSysConfigByCodeList('visitMethod').then((res) => {
        this.visitMethodList = res.visitMethod
      })
    },
    // 查询是否为部门负责人
    getIsDutyDept(){
      isDutyDept().then((res) => {
        // this.isDutyDept = true
        this.isDutyDept = res.data
      })
    },
    handleClick(tab){
      if(tab.name == 'customerInfo'){
        this.onSearch()
      }else if(tab.name == 'draftInfo'){
        this.onSearchInDraft()
      }
    },
    toCustomerInfoPage(data){
      if(this.activeName == 'customerInfo'){
        this.$router.push({name:'customerInfo',params: {type:'info',id:data.id}})
      }else if(this.activeName == 'draftInfo'){
        this.$router.push({name:'customerInfo',params: {type:'darft',id:data.id}})
      }
    },
    // -----------------------------------------------------------草稿信息表格fnc区域---------------------
    onSearchInDraft({ pageNum = this.pageNumInDraft, pageSize = this.pageSizeInDraft } = {}){
      this.pageNumInDraft = pageNum
      this.pageSizeInDraft = pageSize
      let parmas = new FormData()
      parmas.append('pageNum', this.pageNumInDraft)
      parmas.append('pageSize', this.pageSizeInDraft)

      // 判断是否搜索的全部状态
      // if(this.draftForm.auditStatus != ''){
      //   parmas.append('auditStatus', this.draftForm.auditStatus)
      // }

      getCustomerDraftList(parmas).then((res) => {
        this.tableDataInDraft = res.records
        this.totalRecordInDraft = res.total
      })
    },
    // 改变搜索的字段
    changeSearchInDraft(val){
      switch(val) {
        case '1':
          this.placeholderInDraft = '搜索客户名称'
          break
        case '2':
          this.placeholderInDraft = '搜索销售代表'
          break
        case '3':
          this.placeholderInDraft = '搜索产品'
      }
    },
    // 列表配置按钮
    openTableConfigInDraft(){
      this.tableConfigDialogWithDarft = true
    },
    // 操作下编辑按钮
    editInfo(index,data){
      this.$router.push({name:'editCustomer',params: {type:'darft',id:data.id}})
    },
    // -----------------------------------------------------------客户信息表格fnc区域---------------------
    screenCustorme(type){
      this.dataRange = type
      this.onSearch({pageNum:1,pageSize:10})
    },
    // 上传成功
    uploadFileSuccesss(response,file,fileList){
      this.fileListData.push({
        name:response.data[0].filename,
        url:response.data[0].url,
        gid:response.data[0].gid
      })
    },
    handleExceed(files, fileList){
      this.$message.warning('最多上传5张图片个文件');
    },
    // 移除拜访的上传图片
    handleRemove(file) {
      this.fileListData.map((item,index) => {
        if(item.gid == file.response.data[0].gid){
          this.fileListData.splice(index,1)
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSearch({ pageNum = this.pageNum, pageSize = this.pageSize } = {}){
      this.pageNum = pageNum
      this.pageSize = pageSize
      let parmas = new FormData()
      parmas.append('pageNum', this.pageNum)
      parmas.append('pageSize', this.pageSize)
      parmas.append('dataRange', this.dataRange)

      // 判断搜索的是客户名称还是手机号
      if(this.customerForm.searchContentType == 1 && this.customerForm.searchContent.trim() != ''){
        parmas.append('cname', this.customerForm.searchContent)
      }else if(this.customerForm.searchContentType == 2 && this.customerForm.searchContent.trim() != ''){
        parmas.append('tel', this.customerForm.searchContent)
      }

      getCustomerList(parmas).then((res) => {
        this.tableData = res.records
        this.totalRecord = res.total
      })
    },
    // 添加拜访确定按钮
    addVisitSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 请求保存拜访信息
          let parmas = new FormData()
          parmas.append('cid', this.currentChoiceCustomerId)
          parmas.append('visitDate', this.addVisitform.visitDate)
          parmas.append('visitWay', this.addVisitform.visitWay)
          parmas.append('remark', this.addVisitform.remark)
          if(this.fileListData.length){
            const arr = this.fileListData.map(item => {
              return item.gid
            })
            parmas.append('gidList', arr.join())
          }
          addCustomerVisit(parmas).then((res) => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$refs[formName].resetFields();
            this.addVisitDialog = false
            this.onSearch()
          })
        } else {
          return false;
        }
      });
    },
    // 取消添加疗程
    addVisitCancel(formName){
      this.$refs[formName].resetFields();
      this.addVisitDialog = false
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
          this.placeholder = '搜索手机号'
      }
    },
    // 新增客户
    addCustomer(){
      this.$router.push({ name:'addCustomer' })
    },
    // 操作-编辑
    edit({index,data}){
      this.$router.push({name:'editCustomer',params: {type:'info',id:data.id}})
    },
    // 操作-加入公海
    addOpenSea({index,data}){
      this.$confirm('转移到公海后将无法再对该客户进行管理，确定将客户转移到公海？', '加入公海', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        
      }).catch(() => {})
    },
    // 操作-添加拜访
    addVisit({index,data}){
      this.addVisitDialog = true
      this.currentChoiceCustomerId = data.id
      // 重置数据
      this.addVisitform.visitDate = ''
      this.addVisitform.visitWay = ''
      this.addVisitform.remark = ''
      this.fileList = []
      this.fileListData = []
      this.addVisitform.customer = data.cname
    },
    // 操作-添加患者
    addPatientAction({index,data}){
      this.$store.dispatch('setCurrentCustomerId',data.id)
      this.$router.push({name:'addPatient'})
    },
    // 排序
    sortableFnc(){},
    // 顶部的加入公海操作
    addOpenSeaFnc(){
      this.$confirm('转移到公海后将无法再对该客户进行管理，确定将客户转移到公海？', '加入公海', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        
      }).catch(() => {})
    },
    // ---------------------------------------------------------------重分配弹框
    // 顶部的重分配操作
    redistributeFnc(arr){
      this.currentChoiceCustomerId = arr[0].id
      getUsersByCustomerId(arr[0].id).then((res) => {
        this.resetTableData = res.map(item => {
          return {
            oldSaler:item.name,
            oldSalerId:item.userId,
            newSaler:'',
            newSalerId:''
          }
        })
      })
      this.resetDialog = true
    },
    // 操作-重分配
    redistribute({index,data}){
      this.currentChoiceCustomerId = data.id
      getUsersByCustomerId(data.id).then((res) => {
        this.resetTableData = res.map(item => {
          return {
            oldSaler:item.name,
            oldSalerId:item.userId,
            newSaler:'',
            newSalerId:''
          }
        })
      })
      this.resetDialog = true
    },
    // 打开组织架构
    openOrgToReset(index,data){
      if(data.newSaler && data.newSalerId){
        this.checkRoleData.push({
          name:data.newSaler,
          id:data.newSalerId
        })
      }
      this.currentResetIndex = index
      this.$refs.orgChild.init()
      this.addMenDialog = true
    },
    // 组织架构点击取消
    closeDialog(){
      this.checkRoleData = []
      this.addMenDialog = false
    },
    // 组件架构点确认
    saveCheckRoleData(data){
      this.addMenDialog = false
      this.checkRoleData = data.map(item => item)
      this.resetTableData[this.currentResetIndex].newSaler = this.checkRoleData[0].name
      this.resetTableData[this.currentResetIndex].newSalerId = this.checkRoleData[0].id
    },
    // 重新分配确定按钮
    resetSubmit(){
      let isHaveEmpty = false
      let userIds = this.resetTableData.map(item => {
        if(!item.newSalerId){
          isHaveEmpty = true
        }else{
          return item.newSalerId
        }
      })
      const repeatNumber = moreLetter(userIds)
      if(!isHaveEmpty){
        if(repeatNumber > 1){
          this.$message.warning('不能选择重复的人员，请重新选择')
        }else{
          saveReAllocation(this.currentChoiceCustomerId,userIds).then((res) => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.resetDialog = false
          })
        }
      }else{
        this.$message.warning('请选择重分配的人员')
      }
    }
  },
  watch:{
    $route(to,from){
      // 从添加页,编辑页返回的
      if(from.path.match('addCustomer') || from.path.match('editCustomer')){
        this.onSearch({pageNum:1,pageSize:10})
        this.getIsDutyDept()
        this.getSysConfigByCodeList()
      }
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  min-height: 100%;
  background: #fff;
  padding: 30px 20px;
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
.customerForm .header_form{
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
.addVisitForm /deep/ .el-textarea textarea{
  min-height: 125px !important;
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
/* 重分配 */
.resetContainer-reset{
  float: right;
}
/* 添加拜访 */
.addVisitContainer .beizhu{
  margin-bottom: 5px;
}
.addVisitContainer /deep/ .el-upload--picture-card{
  position: relative;
  width: 64px;
  height: 64px;
}
.addVisitContainer /deep/ .el-upload--picture-card i{
  position: absolute;
  display: block;
  width: 28px;
  height: 28px;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
}
.addVisitContainer /deep/ .el-upload-list--picture-card .el-upload-list__item{
  height: 64px;
  width: 64px;
}
.addVisitImage_tips{
  font-size:14px;
  font-family:Helvetica;
  color:rgba(144,147,153,1);
}
.tableConfigDialog /deep/ .el-transfer-panel__list.is-filterable{
  height: 313px;
  overflow: auto;
}
.tableConfigDialog /deep/ .el-transfer-panel__body{
  height: 400px;
}
</style>