<template>
  <router-view v-if="$route.path.match('addPatient') || $route.path.match('PatientInfo') || $route.path.match('editPatient')"></router-view>
  <div v-else class="container">
    <div class='tools-bar'>
      <el-form :inline="true" :model="patientForm" class="header_form">
        <el-form-item>
          <el-select v-model="patientForm.getType" style="width: 270px;" @change="onSearch({pageNum:1,pageSize:10})">
            <el-option label="全部" value="1"></el-option>
            <el-option label="我负责的" value="2"></el-option>
            <el-option label="我的下属负责的" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="header_form_first">
          <el-select v-model="patientForm.searchContentType" style="width: 270px;" @change="changeSearch">
            <el-option label="患者名称" value="1"></el-option>
            <el-option label="销售代表" value="2"></el-option>
            <el-option label="产品" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="header_form_last">
          <el-input v-model="patientForm.searchContent" :placeholder="placeholder" style="width: 200px" clearable @clear="onSearch({pageNum:1,pageSize:10})"></el-input>
          <el-button type="primary" @click="onSearch({pageNum:1,pageSize:10})">搜索</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button plain icon="el-icon-setting" style="width: 100px" @click="openTableConfig">列表配置</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <TableModal
      ref='child'
      :showLast='false'
      :isPatientPage='true'
      :isShowSelectAll='false'
      :totalRecord='totalRecord'
      :pageNum='pageNum'
      :pageSize='pageSize'
      :onSearch='onSearch'
      :tableData='tableData'
      :columnData='columnData'
      :sortableFnc='sortableFnc'
      :addPatient='addPatient'
      :deleteTab='deleteTab'
      :toPatientInfoPage='toPatientInfoPage'
      @editPatient='editPatient'
      @deletePatient='deletePatient'
      @addTreatment='addTreatment'
    />
    <el-dialog title="添加疗程" :visible.sync="addTreatmentDialog" class="addTreatmentContainer" width="805px" :close-on-click-modal='false' :show-close='false'>
      <el-form class="addTreatmentForm" :model="addTreatmentForm" label-width="105px" :rules="addTreatmentRules" ref="treatmentForm">
        <el-form-item label="疗程名称" prop="treatment"  class="lastFormItem">
          <el-select
            v-model="addTreatmentForm.treatment"
            filterable
            allow-create
            default-first-option
            style="width: 270px;"
          >
            <el-option
              v-for="item in selectOption.treatment"
              :label="item.value"
              :value="item"
              :key="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="患者类型" prop="patientType">
          <el-select v-model="addTreatmentForm.patientType" style="width: 270px;">
            <el-option
              v-for="item in selectOption.patientType"
              :label="item.value"
              :value="item"
              :key="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疾病类型" prop="diseaseType">
          <el-select
            v-model="addTreatmentForm.diseaseType"
            filterable
            allow-create
            default-first-option
            style="width: 270px;"
          >
            <el-option
              v-for="item in selectOption.diseaseType"
              :label="item.value"
              :value="item"
              :key="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="治疗类型" prop="treatmentType">
          <el-select v-model="addTreatmentForm.treatmentType" style="width: 270px;">
            <el-option
              v-for="item in selectOption.treatmentType"
              :label="item.value"
              :value="item"
              :key="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新病人" prop="isNewPatient">
          <el-select v-model="addTreatmentForm.isNewPatient" style="width: 270px;">
            <el-option
              v-for="item in selectOption.isNewPatient"
              :label="item.value"
              :value="item"
              :key="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否替换" prop="isReplace">
          <el-select v-model="addTreatmentForm.isReplace" style="width: 270px;">
            <el-option
              v-for="item in selectOption.isReplace"
              :label="item.value"
              :value="item"
              :key="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="治疗方案" prop="therapyDesc">
          <el-input v-model="addTreatmentForm.therapyDesc" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="治疗支数" prop="therapyCount">
          <el-input placeholder="请输入正整数" v-model="addTreatmentForm.therapyCount" style="width:270px" @keyup.native="blurText($event)"></el-input>
        </el-form-item>
        <el-form-item label="治疗周期(天)" prop="therapyDay">
          <el-input placeholder="请输入正整数" v-model="addTreatmentForm.therapyDay" style="width:270px"  @keyup.native="blurText($event)"></el-input>
        </el-form-item>
        <el-form-item label="用药时间" prop="useTime">
          <el-date-picker
            style="width: 270px;"
            v-model="addTreatmentForm.useTime"
            align="center"
            type="date"
            placeholder="请选择"
            prefix-icon='el-icon-time'
            format="yyyy 年 MM 月 dd 日"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="治疗状态" prop="treatmentStatus">
          <el-select v-model="addTreatmentForm.treatmentStatus" style="width: 270px;">
            <el-option
              v-for="item in selectOption.treatmentStatus"
              :label="item.value"
              :value="item"
              :key="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售途径" prop="salesChannel">
          <el-select v-model="addTreatmentForm.salesChannel" style="width: 270px;">
            <el-option
              v-for="item in selectOption.salesChannel"
              :label="item.value"
              :value="item"
              :key="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="脱落原因">
          <el-select
            v-model="addTreatmentForm.causeShedding"
            filterable
            allow-create
            default-first-option
            style="width: 270px;"
          >
            <el-option
              v-for="item in selectOption.causeShedding"
              :label="item.value"
              :value="item"
              :key="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" class="lastFormItem">
          <el-input
            type="textarea"
            :rows="6"
            v-model="addTreatmentForm.reason"
            autosize
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTreatmentCancel('treatmentForm')">取 消</el-button>
        <el-button type="primary" @click="addTreatmentSubmit">确 定</el-button>
      </span>
    </el-dialog>
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
        <el-button type="primary" @click="tableConfigDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableModal from '@/components/TableModal/TableModal'
import {mapState} from 'vuex'
import {
  getPatientInfoList,
  delPatient,
  getConfigByCode,
  insertTreatment
} from '@/api/patientApi.js'
export default {
  components:{
    TableModal
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
    };
    return {
      // 后端返回的下拉选框范围
      selectOption:{},
      // 添加疗程弹框
      addTreatmentRules: {
        treatment: [
          { required: true, message: '请选择疗程名称', trigger: 'change' }
        ],
        patientType: [
          { required: true, message: '请选择患者类型', trigger: 'change' }
        ],
        diseaseType: [
          { required: true, message: '请选择疾病类型', trigger: 'change' }
        ],
        treatmentType: [
          { required: true, message: '请选择治疗类型', trigger: 'change' }
        ],
        isNewPatient: [
          { required: true, message: '请选择是否新病人', trigger: 'change' }
        ],
        isReplace: [
          { required: true, message: '请选择是否替换', trigger: 'change' }
        ],
        therapyDesc: [
          { required: true, message: '请输入治疗方案', trigger: 'blur' }
        ],
        therapyCount: [
          { required: true, message: '请输入治疗支数', trigger: 'blur' }
        ],
        therapyDay: [
          { required: true, message: '请选择治疗周期', trigger: 'blur' }
        ],
        useTime: [
          { required: true, message: '请选择用药时间', trigger: 'change' }
        ],
        treatmentStatus: [
          { required: true, message: '请选择治疗状态', trigger: 'change' }
        ],
        salesChannel: [
          { required: true, message: '请选择销售途径', trigger: 'change' }
        ]
      },
      activeName:'customerInfo',
      tableConfigDialog:false,
      transferData: generateData(),
      transferValue: [3,4,5,6,7,8],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      // --------------------------------------客户信息Data
      placeholder:'搜索客户名称',
      patientForm:{
        getType:"1",
        searchContentType:'1',
        searchContent:""
      },
      userName:'',
      productName:'',
      customerName:'',
      memberName:'',
      tableData:[
      ],
      columnData:[
        {
          prop: 'memberCode',
          label: '患者代码'
        },
        {
          prop: 'memberName',
          label: '姓名'
        },
        {
          prop: 'gender',
          label: '性别'
        },
        {
          prop: 'customerName',
          label: '医生名称'
        },
        {
          prop: 'productName',
          label: '产品名称'
        },
        {
          prop: 'jobName',
          label: '岗位名称'
        },
        {
          prop: 'userName',
          label: '销售代表'
        }
      ],
      totalRecord:0,
      pageNum:1,
      pageSize:10,
      addTreatmentDialog:false,
      addTreatmentForm:{
        treatment:'',
        patientType:'',
        diseaseType:'',
        treatmentType:'',
        isNewPatient:'',
        isReplace:'',
        therapyDesc:'',
        therapyCount:'',
        therapyDay:'',
        useTime:'',
        treatmentStatus:'',
        salesChannel:'',
        causeShedding:'',
        reason:''
      },
      // 当前患者id
      currentMid:'',
      // 可输入的疗程名称
      treatmentDesc:{},
      // 可输入的疾病类型
      diseaseTypeDesc:{},
      // 可输入的脱落原因
      causeSheddingDesc:{}
    }
  },
  computed:{
    ...mapState({
      userId: state => state.permission.account.id,
      deptId: state => state.permission.account.deptId
    })
  },
  mounted() {
    if(this.$route.name == 'PatientManagement'){
      this.getOptions()
      this.onSearch()
    }
  },
  watch: {
    $route(to,from){
      // 重置setCurrentCustomerId的客户id，防止进去新增患者页自动选中客户
      this.$store.dispatch('setCurrentCustomerId','')
      if(to.path.match('PatientManagement')){
        // 请求数据的方法
        this.getOptions()
        this.onSearch()
      }
    }
  },
  methods: {
    // -----------------------------------------------------------公共方法-------------------------------
    // 获取下拉选框
    getOptions(){
      getConfigByCode().then((res) => {
        this.selectOption = res.data.data
        // 疗程名称取值
        this.selectOption.treatment.map((item,index) => {
          if(item.seq == 0){
            this.treatmentDesc = this.selectOption.treatment.splice(index,1)[0]
          }
        })
        // 疾病类型取值
        this.selectOption.diseaseType.map((item,index) => {
          if(item.seq == 0){
            this.diseaseTypeDesc = this.selectOption.diseaseType.splice(index,1)[0]
          }
        })
        // 脱落原因取值
        this.selectOption.causeShedding.map((item,index) => {
          if(item.seq == 0){
            this.causeSheddingDesc = this.selectOption.causeShedding.splice(index,1)[0]
          }
        })
      },(error) => {
        console.log(error)
      })
    },
    clearCheckColumnList(){
      this.transferValue = []
    },
    // 取消添加疗程
    addTreatmentCancel(formName){
      this.$refs[formName].resetFields();
      this.addTreatmentDialog = false
    },
    // -----------------------------------------------------------患者信息表格fnc区域---------------------
    onSearch({ pageNum = this.pageNum, pageSize = this.pageSize } = {}){
      this.pageNum = pageNum
      this.pageSize = pageSize
      if(this.patientForm.searchContentType == 1){
        this.memberName = this.patientForm.searchContent
        this.customerName = ''
        this.userName = ''
        this.productName = ''
      }else if(this.patientForm.searchContentType == 2){
        this.memberName = ''
        this.customerName = ''
        this.userName = this.patientForm.searchContent
        this.productName = ''
      }else if(this.patientForm.searchContentType == 3){
        this.memberName = ''
        this.customerName = ''
        this.userName = ''
        this.productName = this.patientForm.searchContent
      }
      getPatientInfoList({
        userId:this.userId,
        getType:this.patientForm.getType,
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        memberName:this.memberName,
        productName:this.productName,
        userName:this.userName,
        customerName:this.customerName,
        deptId:this.deptId
      }).then((res) => {
        this.tableData = res.data.data.list
        this.totalRecord = res.data.data.total
      },(error) => {
        console.log(error)
      })
    },
    // 添加疗程确定按钮
    addTreatmentSubmit(){
      this.$refs.treatmentForm.validate((valid) => {
        if (valid) {
          let jsondata = {
            // 疗程名称 ----------------
            treatment:this.addTreatmentForm.treatment,
            // 患者类型
            patientType:this.addTreatmentForm.patientType,
            // 疾病类型 -----------------------
            diseaseType:this.addTreatmentForm.diseaseType,
            // 治疗类型
            treatmentType:this.addTreatmentForm.treatmentType,
            // 是否新病人
            isNewPatient:this.addTreatmentForm.isNewPatient,
            // 是否替换
            isReplace:this.addTreatmentForm.isReplace,
            // 治疗状态
            treatmentStatus:this.addTreatmentForm.treatmentStatus,
            // 销售途径
            salesChannel:this.addTreatmentForm.salesChannel,
            // 脱落原因
            causeShedding:this.addTreatmentForm.causeShedding
          }
          
          // 判断是否为自己输入的
          if(!this.addTreatmentForm.treatment.value){
            this.treatmentDesc.desc = this.addTreatmentForm.treatment
            jsondata.treatment = this.treatmentDesc
          }

          // 判断是否为自己输入的
          if(!this.addTreatmentForm.diseaseType.value){
            this.diseaseTypeDesc.desc = this.addTreatmentForm.diseaseType
            jsondata.diseaseType = this.diseaseTypeDesc
          }

          // 判断是否为自己输入的
          if(!this.addTreatmentForm.causeShedding.value){
            this.causeSheddingDesc.desc = this.addTreatmentForm.causeShedding
            jsondata.causeShedding = this.causeSheddingDesc
          }
          let parmas = new FormData()
          parmas.append('mid', this.currentMid)
          parmas.append('therapyDesc', this.addTreatmentForm.therapyDesc)
          parmas.append('therapyCount', this.addTreatmentForm.therapyCount)
          parmas.append('therapyDay', this.addTreatmentForm.therapyDay)
          parmas.append('useTime', this.addTreatmentForm.useTime)
          parmas.append('reason', this.addTreatmentForm.reason)
          parmas.append('author', this.userId)
          parmas.append('editor', this.userId)
          parmas.append('jsondata', JSON.stringify(jsondata))
         
          insertTreatment(parmas).then((res) => {
            if(res.data.code == 0){
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.addTreatmentDialog = false
              this.onSearch()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 列表配置按钮
    openTableConfig(){
      this.tableConfigDialog = true
    },
    // 切换搜索的字段Select
    changeSearch(val){
      this.patientForm.searchContent = ''
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
    // 新增患者
    addPatient(arr){
      this.$router.push({name:'addPatient'})
    },
    // 去患者详情页
    toPatientInfoPage(data){
      this.$router.push({name:'PatientInfo',params: {mid:data.mid}})
    },
    // 删除患者
    deleteTab(arr){
      let newArr = []
      arr.map(item => newArr.push(item.mid))
      const ids = newArr.join()
      this.$confirm('删除后将无法恢复，是否确认删除？', '删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delPatient(ids).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.onSearch({pageNum:1, pageSize:10})
        })
      }).catch(() => {})
    },
    // 操作-编辑
    editPatient({index,data}){
      this.$router.push({name:'editPatient',params: {mid:data.mid}})
    },
    // 操作-删除
    deletePatient({index,data}){
      this.$confirm('删除后将无法恢复，是否确认删除？', '删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delPatient(data.mid).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.onSearch({pageNum:1, pageSize:10})
        })
      }).catch(() => {})
    },
    // 操作-添加疗程
    addTreatment({index,data}){
      this.currentMid = data.mid
      // 重置
      this.resetAddTreatment()
      this.addTreatmentDialog = true
    },
    // 重置添加疗程表单
    resetAddTreatment(){
      this.addTreatmentForm.treatment = ''
      this.addTreatmentForm.patientType = ''
      this.addTreatmentForm.diseaseType = ''
      this.addTreatmentForm.treatmentType = ''
      this.addTreatmentForm.isNewPatient = ''
      this.addTreatmentForm.isReplace = ''
      this.addTreatmentForm.therapyDesc = ''
      this.addTreatmentForm.therapyCount = ''
      this.addTreatmentForm.therapyDay = ''
      this.addTreatmentForm.useTime = ''
      this.addTreatmentForm.treatmentStatus = ''
      this.addTreatmentForm.salesChannel = ''
      this.addTreatmentForm.causeShedding = ''
      this.addTreatmentForm.reason = ''
    },
    // 排序
    sortableFnc(){},
    blurText(e){
      e.target.value = e.target.value.replace(/[^\.\d]/g,'')
      e.target.value = e.target.value.replace('.','')
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
.patientForm .header_form{
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
.addTreatmentForm /deep/ .el-textarea textarea{
  min-height: 80px !important;
  width: 655px;
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
/* 添加疗程样式 */
.addTreatmentContainer /deep/ .el-dialog__body{
  display: inline-block;
  padding-left: 10px;
}
.addTreatmentContainer /deep/ .el-form-item{
  display: inline-block;
  width: 50%;
}
.addTreatmentContainer /deep/ .lastFormItem{
  display: block;
  width: auto;
}
</style>