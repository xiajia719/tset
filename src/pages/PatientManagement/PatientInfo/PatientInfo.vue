<template>
  <happy-scroll color="rgba(51,51,51,0.2)" size="5" resize hide-horizontal class="happyScroll">
    <el-container class="wrapper">
      <el-header class="header">
        <div class="header-container">
          <div class="header-container-img">
            <img :src="crmMemberInfoDTO.image" alt="用户头像" v-if="crmMemberInfoDTO.image">
            <img src="@/assets/image/bg_gray.png" alt="用户头像" v-else>
          </div>
          <div class="customerBasicInfo">
            <div class="customerBasicInfo_top">
              <span class="wrapperArea_item_name">{{crmMemberInfoDTO.cname}}</span>
              <span class="wrapperArea_item customerBasicInfo_item">
                <span class="wrapperArea_item_label">销售代表：</span>
                <span>{{crmMemberInfoDTO.userName}}</span>
              </span>
              <span class="wrapperArea_item customerBasicInfo_item">
                <span class="wrapperArea_item_label">客户：</span>
                <span>{{crmMemberInfoDTO.customerName}}</span>
              </span>
              <span class="wrapperArea_item customerBasicInfo_item">
                <span class="wrapperArea_item_label">产品：</span>
                <span>{{crmMemberInfoDTO.productName}}</span>
              </span>
              <span class="wrapperArea_item customerBasicInfo_item">
                <span class="wrapperArea_item_label">代码：</span>
                <span>{{crmMemberInfoDTO.code}}</span>
              </span>
            </div>
            <div class="customerBasicInfo_down">
              <el-button type="primary" plain class="customerBasicInfo_down_btn" @click="addTreatmentDialog = true">添加疗程</el-button>
              <el-button type="primary" plain class="customerBasicInfo_down_btn" @click="toEditPatientPage">编辑</el-button>
              <el-button plain @click="deletePatientFnc">删除</el-button>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-main class="main_contanier">
          <div class="main_contanier_info" ref="rightContanier">
            <div class="wrapperArea">
              <div class="wrapperArea-header">
                <span class="verticalLine"></span>
                基本信息
              </div>
              <div class="wrapperArea_info">
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">代码</span>
                  <span>{{crmMemberInfoDTO.code}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">姓名</span>
                  <span>{{crmMemberInfoDTO.cname}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">性别</span>
                  <span>{{crmMemberInfoDTO.gender == 1 ? '男':'女'}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">年龄</span>
                  <span>{{crmMemberInfoDTO.age}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">手机号码</span>
                  <span>{{crmMemberInfoDTO.phone}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">就诊医生</span>
                  <span>{{crmMemberInfoDTO.customerName}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">产品</span>
                  <span>{{crmMemberInfoDTO.productName}}</span>
                </span>
              </div>
            </div>
            <div class="wrapperArea">
              <div class="wrapperArea-header">
                <span class="verticalLine"></span>
                疗程信息
              </div>
              <div class="patientList" v-if="treatmentList.length">
                <div class="patientItem" v-for="item in treatmentList" :key="item.id">
                  <div class="patientItem-title">
                    {{JSON.parse(item.jsondata).treatment.seq == 0 ? JSON.parse(item.jsondata).treatment.desc:JSON.parse(item.jsondata).treatment.value}}
                  </div>
                  <div class="wrapperArea_info">
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">患者类型</span>
                      <span>{{JSON.parse(item.jsondata).patientType.value}}</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">疾病类型</span>
                      <span>{{JSON.parse(item.jsondata).diseaseType.seq == 0 ? JSON.parse(item.jsondata).diseaseType.desc:JSON.parse(item.jsondata).diseaseType.value}}</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">治疗类型</span>
                      <span>{{JSON.parse(item.jsondata).treatmentType.value}}</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">是否新病人</span>
                      <span>{{JSON.parse(item.jsondata).isNewPatient.value}}</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">是否替换</span>
                      <span>{{JSON.parse(item.jsondata).isReplace.value}}</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">治疗方案</span>
                      <span>{{item.therapyDesc}}</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">治疗支数</span>
                      <span>{{item.therapyCount}}</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">治疗周期</span>
                      <span>{{item.therapyDay}}天</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">用药时间</span>
                      <span>{{item.useTime.substring(0,10)}}</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">治疗状态</span>
                      <span>{{JSON.parse(item.jsondata).treatmentStatus.value}}</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">脱落原因</span>
                      <span>{{JSON.parse(item.jsondata).causeShedding.seq == 0 ? JSON.parse(item.jsondata).causeShedding.desc:JSON.parse(item.jsondata).causeShedding.value}}</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">销售途径</span>
                      <span>{{JSON.parse(item.jsondata).salesChannel.value}}</span>
                    </span>
                    <span class="wrapperArea_item1">
                      <span class="wrapperArea_item_label">备注</span>
                      <span>{{item.reason}}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="noTreatment" v-else>
                暂无疗程
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
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
  </happy-scroll>
</template>

<script>
import {mapState} from 'vuex'
import {
  getConfigByCode,
  getPatientInfo,
  delPatient,
  insertTreatment
} from '@/api/patientApi.js'
export default {
  inject:['reload'],
  components:{
  },
  data() {
    return {
      currentMid:'',
      treatmentList:[],
      crmMemberInfoDTO:{},
      selectOption:{},
      addTreatmentDialog:false,
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
      // 可输入的疗程名称
      treatmentDesc:{},
      // 可输入的疾病类型
      diseaseTypeDesc:{},
      // 可输入的脱落原因
      causeSheddingDesc:{}
    }
  },
  created() {
  },
  computed:{
    ...mapState({
      userId: state => state.permission.account.id,
      deptId: state => state.permission.account.deptId
    })
  },
  mounted() {
    this.currentMid = this.$route.params.mid
    this.getOptions()
    this.getPatientInfo()
  },
  methods: {
    // 添加疗程取消按钮
    // 取消添加疗程
    addTreatmentCancel(formName){
      this.$refs[formName].resetFields();
      this.addTreatmentDialog = false
    },
    getPatientInfo(){
      getPatientInfo(this.currentMid).then((res) => {
        if(res.data.code == 0){
          this.crmMemberInfoDTO = res.data.data.crmMemberInfoDTO
          if(res.data.data.list){
            this.treatmentList = res.data.data.list
          }else{
            this.treatmentList = []
          }
        }else{
          this.$message.error(res.data.message)
        }
      },(error) => {
        this.$message.error(error)
      })
    },
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
              this.reload()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
    // 删除患者
    deletePatientFnc(){
      this.$confirm('删除后将无法恢复，是否确认删除？', '删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delPatient(this.currentMid).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$router.push({name:'PatientManagement'})
        })
      }).catch(() => {})
    },
    // 去编辑页
    toEditPatientPage(){
      this.$router.push({name:'editPatient',params: {mid:this.currentMid}})
    },
    blurText(e){
      e.target.value = e.target.value.replace(/[^\.\d]/g,'')
      e.target.value = e.target.value.replace('.','')
    }
  }
}
</script>

<style scoped>
.happyScroll{
  width: 100%;
  height: 100%;
  margin-top: -10px;
}
.wrapper{
  padding: 20px 20px;
  width: 100%;
  height: 100%;
}
.header{
  position: relative;
  padding: 30px 20px;
  height:125px !important;
  background-color: #fff;
  margin-bottom: 20px;
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
.main_contanier{
  padding: 0px;
}
.main_contanier_info{
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
  margin-bottom: 30px;
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
  height: 35px;
  line-height: 35px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.wrapperArea_item1{
  display: inline-block;
  width: 33%;
  height: 35px;
  line-height: 35px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.wrapperArea_item_label{
  display: inline-block;
  margin-right: 10px;
  min-width: 70px;
  text-align: left;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(144,147,153,1);
}
.smallTable{
  margin-bottom: 20px;
}
.main_contanier_block{
  padding: 15px;
  background: #fff;
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
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.header-container{
  position: relative;
}
.header-container-img{
  width: 64px;
  height: 64px;
  display: inline-block;
}
.header-container-img img{
  width: 64px;
  height: 64px;
  border-radius: 50%;
}
.wrapperArea_item_name{
  margin-right: 20px;
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.customerBasicInfo{
  margin-left: 15px;
  vertical-align: 10px;
  display: inline-block;
}
.customerBasicInfo .customerBasicInfo_item{
  width: auto;
  margin-right: 20px;
}
.customerBasicInfo .customerBasicInfo_item .wrapperArea_item_label{
  text-align: right;
  margin-right: 0px;
}
.customerBasicInfo_down_btn{
  height: 30px;
  margin-right: 10px;
}
.patientItem{
  margin-bottom: 20px;
}
.patientItem-title {
  position: relative;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(25,137,250,1);
  margin-bottom: 10px;
}
.patientItem-title::before{
  position: absolute; 
  left: 80px;
  top: 9px;
  content: '';
  width: calc(100% - 150px);
  height: 0px;
  align-items: center;
  border: 1px dashed #C0C4CC;
}
.noTreatment{
  font-size: 14px;
  font-family: PingFangSC-Regular,PingFang SC;
  font-weight: 400;
  color: rgba(144,147,153,1);
}
/* 添加疗程样式 */
.addTreatmentContainer /deep/ .el-textarea textarea{
  min-height: 80px !important;
  width: 655px;
}
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