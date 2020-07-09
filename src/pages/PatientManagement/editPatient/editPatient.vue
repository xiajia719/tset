<template>
  <happy-scroll color="rgba(51,51,51,0.2)" size="5" resize hide-horizontal class="happyScroll">
    <div class="wrapper">
      <div class="wrapperArea">
        <div class="wrapperArea-header">
          <span class="verticalLine"></span>
          基本信息
        </div>
        <el-form :model="basicForm" :rules="rules" ref="basicForm" class="basicForm">
          <el-form-item label="姓名" prop="cname">
            <el-input v-model="basicForm.cname" style="width:270px" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="basicForm.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="basicForm.age" style="width:270px" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="basicForm.phone" style="width:270px" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="就诊医生" prop="doctor">
            <el-select
              placeholder="请选择"
              v-model="basicForm.doctor" 
              style="width: 270px;"
              @change='selectWithDoctor'
            >
              <el-option
                v-for="item in myDoctorList"
                :label="item.cname"
                :value="item.id"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品" prop="product">
            <el-select
              :disabled='isHaveChoiceDoctor'
              :placeholder="productPlaceHolder"
              v-model="basicForm.product"
              style="width: 270px;"
            >
              <el-option
                v-for="item in selectOptionWithProduct"
                :label="item.pname"
                :value="item.id"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="wrapperArea">
        <div class="wrapperArea-header">
          <span class="verticalLine"></span>
          疗程信息
        </div>
        <div class="treatmentList" v-if="treatmentData.length">
          <div class="treatmentItem" v-for="(item,index) in treatmentData" :key="index">
            <el-form class="addTreatmentForm" :model="item" label-width="105px" :rules="addTreatmentRules" ref="treatmentForm">
              <el-form-item label="疗程名称" prop="treatment"  class="lastFormItem">
                <el-select
                  v-model="item.treatment"
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
                <el-select v-model="item.patientType" style="width: 270px;">
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
                  v-model="item.diseaseType"
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
                <el-select v-model="item.treatmentType" style="width: 270px;">
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
                <el-select v-model="item.isNewPatient" style="width: 270px;">
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
                <el-select v-model="item.isReplace" style="width: 270px;">
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
                <el-input v-model="item.therapyDesc" style="width:270px"></el-input>
              </el-form-item>
              <el-form-item label="治疗支数" prop="therapyCount">
                <el-input placeholder="请输入正整数" v-model="item.therapyCount" style="width:270px" @keyup.native="blurText($event)"></el-input>
              </el-form-item>
              <el-form-item label="治疗周期(天)" prop="therapyDay">
                <el-input placeholder="请输入正整数" v-model="item.therapyDay" style="width:270px"  @keyup.native="blurText($event)"></el-input>
              </el-form-item>
              <el-form-item label="用药时间" prop="useTime">
                <el-date-picker
                  style="width: 270px;"
                  v-model="item.useTime"
                  align="center"
                  type="date"
                  placeholder="请选择"
                  prefix-icon='el-icon-time'
                  format="yyyy 年 MM 月 dd 日"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="治疗状态" prop="treatmentStatus">
                <el-select v-model="item.treatmentStatus" style="width: 270px;">
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
                <el-select v-model="item.salesChannel" style="width: 270px;">
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
                  v-model="item.causeShedding"
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
                  v-model="item.reason"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-form>
            <i class="el-icon-remove-outline deleteIcon" @click="deleteTreatment(index)"></i>
          </div>
          <el-button type="text" class="treatmentList_btn" @click="addTreatmentFnc">添加疗程</el-button>
        </div>
        <div class="" v-else>
          <el-button type="text" class="treatmentList_btn" @click="addTreatmentFnc">添加疗程</el-button>
        </div>
      </div>
      <div class="foot-btn">
        <el-button @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </div>
  </happy-scroll>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {
  getConfigByCode,
  getPatientInfo,
  getCustomerBindProduct
} from '@/api/patientApi.js'
export default {
  components:{
  },
  inject:['reload'],
  data() {
    return {
      // 后端返回的下拉选框范围
      selectOption:{},
      // 就诊医生/产品
      isHaveChoiceDoctor:true,
      productPlaceHolder:'请选择就诊医生后再进行选择',
      myDoctorList:[],
      selectOptionWithProduct:[],
      treatmentData:[
      ],
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
      basicForm: {
        cname: '',
        gender: '1',
        age:'',
        phone:'',
        doctor:'',
        product:''
      },
      rules: {
        cname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        doctor: [
          { required: true, message: '请选择就诊医生', trigger: 'change' }
        ],
        product: [
          { required: true, message: '请选择产品', trigger: 'change' }
        ]
      },
      currentMid:'',
      // 可输入的疗程名称
      treatmentDesc:{},
      // 可输入的疾病类型
      diseaseTypeDesc:{},
      // 可输入的脱落原因
      causeSheddingDesc:{},
      // 获取到的基本信息
      basicData:{},
      resultArr:[]//接受验证返回结果数组
    };
  },
  mounted(){
    this.currentMid = this.$route.params.mid
    this.getOptions()
    this.getPatientInfo()
  },
  computed:{
    ...mapState({
      userId: state => state.permission.account.id,
      deptId: state => state.permission.account.deptId
    })
  },
  methods: {
    getPatientInfo(){
      getPatientInfo(this.currentMid).then((res) => {
        if(res.data.code == 0){
          this.basicData = res.data.data.crmMemberInfoDTO
          // 获取就诊医生的下拉选
          this.getCustomerBindProduct(this.basicData.userId,'')
          // 让产品可选择，获取产品的id
          this.isHaveChoiceDoctor = false
          this.getCustomerBindProduct('',this.basicData.cid)
          // 设置基本信息的赋值操作
          this.setBasicForm(this.basicData)
          if(res.data.data.list){
            this.treatmentData = res.data.data.list.map((item) => {
              const parseData = JSON.parse(item.jsondata)
              let treatmentData = ''
              let diseaseTypeData = ''
              let causeSheddingData = ''
              if(parseData.treatment.seq == 0){
                treatmentData = parseData.treatment.desc
              }else{
                treatmentData = parseData.treatment
              }
              if(parseData.diseaseType.seq == 0){
                diseaseTypeData = parseData.diseaseType.desc
              }else{
                diseaseTypeData = parseData.diseaseType
              }
              if(parseData.causeShedding.seq == 0){
                causeSheddingData = parseData.causeShedding.desc
              }else{
                causeSheddingData = parseData.causeShedding
              }
              return{
                id:item.id,
                treatment:treatmentData,
                patientType:parseData.patientType,
                diseaseType:diseaseTypeData,
                treatmentType:parseData.treatmentType,
                isNewPatient:parseData.isNewPatient,
                isReplace:parseData.isReplace,
                therapyDesc:item.therapyDesc,
                therapyCount:item.therapyCount,
                therapyDay:item.therapyDay,
                useTime:item.useTime,
                treatmentStatus:parseData.treatmentStatus,
                salesChannel:parseData.salesChannel,
                causeShedding:causeSheddingData,
                reason:item.reason
              }
            })
          }else{
            this.treatmentData = []
          }
        }else{
          this.$message.error(res.data.message)
        }
      },(error) => {
        this.$message.error(error)
      })
    },
    // 基本信息表单赋值
    setBasicForm(data){
      this.basicForm.age = data.age
      this.basicForm.cname = data.cname
      this.basicForm.gender = data.gender + ''
      this.basicForm.phone = data.phone
      this.basicForm.doctor = data.cid
      this.basicForm.product = data.pid
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
    // 获取医生跟产品
    getCustomerBindProduct(userId,customerId){
      getCustomerBindProduct({
        userId:userId,
        customerId:customerId
      }).then((res) => {
        if(userId != ''){
          this.myDoctorList = res.data.data.crmCustomerList
        }else if(customerId != ''){
          this.selectOptionWithProduct = res.data.data.productList
        }
      })
    },
    // 选择就诊医生发生变化
    selectWithDoctor(val){
      if(val){
        this.isHaveChoiceDoctor = false
        this.productPlaceHolder = '请选择'
        this.getCustomerBindProduct('',this.basicForm.doctor)
      }
    },
    //封装验证函数
    checkForm(obj){
      let _self = this
      let result
      obj.validate((valid) => {
        if (valid) {
          result = true
        } else {
          result = false
        }
      })
      _self.resultArr.push(result) //push 得到promise的结果
    },
    // 确定
    onSubmit(){
      // 先重置验证结果数组
      this.resultArr = []
      this.$refs.basicForm.validate((valid) => {
        if (valid) {
          // 有疗程
          if(this.treatmentData.length){
            // 有一个疗程
            if(this.treatmentData.length == 1){
              this.$refs.treatmentForm[0].validate((valid) => {
                if (valid) {
                  let params = {}
                  const crmMemberInfo = {
                    id:this.currentMid,
                    cname:this.basicForm.cname,
                    gender:this.basicForm.gender,
                    age:this.basicForm.age,
                    phone:this.basicForm.phone,
                    code:1, // 要删
                    jobsId:this.basicData.jobsId, 
                    author:this.userId,
                    editor:this.userId,
                    // 产品id
                    pid:this.basicForm.product,
                    // 医生id
                    cid:this.basicForm.doctor
                  }
                  params.crmMemberInfo = crmMemberInfo
                  params.userId = this.userId
                  let list = this.treatmentData.map(item => {
                    let jsondata = {
                      // 疗程名称 ----------------
                      treatment:item.treatment,
                      // 患者类型
                      patientType:item.patientType,
                      // 疾病类型 -----------------------
                      diseaseType:item.diseaseType,
                      // 治疗类型
                      treatmentType:item.treatmentType,
                      // 是否新病人
                      isNewPatient:item.isNewPatient,
                      // 是否替换
                      isReplace:item.isReplace,
                      // 治疗状态
                      treatmentStatus:item.treatmentStatus,
                      // 销售途径
                      salesChannel:item.salesChannel,
                      // 脱落原因
                      causeShedding:item.causeShedding
                    }

                    // 判断是否为自己输入的
                    if(!item.treatment.value){
                      this.treatmentDesc.desc = item.treatment
                      jsondata.treatment = this.treatmentDesc
                    }

                    // 判断是否为自己输入的
                    if(!item.diseaseType.value){
                      this.diseaseTypeDesc.desc = item.diseaseType
                      jsondata.diseaseType = this.diseaseTypeDesc
                    }

                    // 判断是否为自己输入的
                    if(!item.causeShedding.value){
                      this.causeSheddingDesc.desc = item.causeShedding
                      jsondata.causeShedding = this.causeSheddingDesc
                    }

                    return {
                      id:item.id,
                      mid:this.currentMid,
                      // 治疗方案
                      therapyDesc:item.therapyDesc,
                      // 治疗支数
                      therapyCount:item.therapyCount,
                      // 治疗周期
                      therapyDay:item.therapyDay,
                      // 用药时间
                      useTime:item.useTime,
                      // 备注
                      reason:item.reason,
                      author:this.userId,
                      editor:this.userId,
                      jsondata:JSON.stringify(jsondata)
                    }
                  })
                  params.list = list
                  axios.post(`/api-crm-member/crmMemberInfo/update`,params,{
                    headers: {
                      'Content-Type':'application/json'
                    }
                  }).then(res => {
                    this.$message({
                      message: '保存成功',
                      type: 'success'
                    })
                    this.reload()
                  })
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            }else{
              // 有多个疗程
              this.$refs.treatmentForm.forEach(item => { //根据表单的ref校验
                this.checkForm(item)
              })
              let flag = true
              this.resultArr.map(item => {
                if(!item){
                  flag = false
                }
              })
              if(flag){
                let params = {}
                const crmMemberInfo = {
                  id:this.currentMid,
                  cname:this.basicForm.cname,
                  gender:this.basicForm.gender,
                  age:this.basicForm.age,
                  phone:this.basicForm.phone,
                  code:1, // 要删
                  jobsId:this.basicData.jobsId, 
                  author:this.userId,
                  editor:this.userId,
                  // 产品id
                  pid:this.basicForm.product,
                  // 医生id
                  cid:this.basicForm.doctor
                }
                params.crmMemberInfo = crmMemberInfo
                params.userId = this.userId
                let list = this.treatmentData.map(item => {
                  let jsondata = {
                    // 疗程名称 ----------------
                    treatment:item.treatment,
                    // 患者类型
                    patientType:item.patientType,
                    // 疾病类型 -----------------------
                    diseaseType:item.diseaseType,
                    // 治疗类型
                    treatmentType:item.treatmentType,
                    // 是否新病人
                    isNewPatient:item.isNewPatient,
                    // 是否替换
                    isReplace:item.isReplace,
                    // 治疗状态
                    treatmentStatus:item.treatmentStatus,
                    // 销售途径
                    salesChannel:item.salesChannel,
                    // 脱落原因
                    causeShedding:item.causeShedding
                  }

                  // 判断是否为自己输入的
                  if(!item.treatment.value){
                    this.treatmentDesc.desc = item.treatment
                    jsondata.treatment = this.treatmentDesc
                  }

                  // 判断是否为自己输入的
                  if(!item.diseaseType.value){
                    this.diseaseTypeDesc.desc = item.diseaseType
                    jsondata.diseaseType = this.diseaseTypeDesc
                  }

                  // 判断是否为自己输入的
                  if(!item.causeShedding.value){
                    this.causeSheddingDesc.desc = item.causeShedding
                    jsondata.causeShedding = this.causeSheddingDesc
                  }

                  return {
                    id:item.id,
                    mid:this.currentMid,
                    // 治疗方案
                    therapyDesc:item.therapyDesc,
                    // 治疗支数
                    therapyCount:item.therapyCount,
                    // 治疗周期
                    therapyDay:item.therapyDay,
                    // 用药时间
                    useTime:item.useTime,
                    // 备注
                    reason:item.reason,
                    author:this.userId,
                    editor:this.userId,
                    jsondata:JSON.stringify(jsondata)
                  }
                })
                params.list = list
                axios.post(`/api-crm-member/crmMemberInfo/update`,params,{
                  headers: {
                    'Content-Type':'application/json'
                  }
                }).then(res => {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                  this.reload()
                })
              }
            }
          }else{
            // 无疗程，只保存基本信息
            let params = {}
            const crmMemberInfo = {
              id:this.currentMid,
              cname:this.basicForm.cname,
              gender:this.basicForm.gender,
              age:this.basicForm.age,
              phone:this.basicForm.phone,
              code:1, // 要删
              jobsId:this.basicData.jobsId,
              author:this.userId,
              editor:this.userId,
              // 产品id
              pid:this.basicForm.product,
              // 医生id
              cid:this.basicForm.doctor
            }
            params.crmMemberInfo = crmMemberInfo
            params.userId = this.userId
            params.list = []
            axios.post(`/api-crm-member/crmMemberInfo/update`,params,{
              headers: {
                'Content-Type':'application/json'
              }
            }).then(res => {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.reload()
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 删除疗程
    deleteTreatment(index){
      this.$confirm('确认删除此疗程？', '删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.treatmentData.splice(index,1)
      }).catch(() => {})
    },
    blurText(e){
      e.target.value = e.target.value.replace(/[^\.\d]/g,'')
      e.target.value = e.target.value.replace('.','')
    },
    // 添加疗程
    addTreatmentFnc(){
      // 非第一个疗程时，患者类型、疾病类型、治疗类型、是否替换、治疗方案、治疗支数、治疗状态、销售途径默认赋值
      const index = this.treatmentData.length - 1
      let isNewPatientNo = {}
      this.selectOption.isNewPatient.map(item => {
        if(item.value == '否'){
          isNewPatientNo = item
        }
      })
      if(index == -1){
        const treanmentItemData = {
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
        }
        this.treatmentData.push(treanmentItemData)
      }else{
        const treanmentItemData = {
          treatment:'',
          // 患者类型
          patientType:this.treatmentData[index].patientType,
          // 疾病类型
          diseaseType:this.treatmentData[index].diseaseType,
          // 治疗类型
          treatmentType:this.treatmentData[index].treatmentType,
          isNewPatient:isNewPatientNo,
          // 是否替换
          isReplace:this.treatmentData[index].isReplace,
          // 治疗方案
          therapyDesc:this.treatmentData[index].therapyDesc,
          // 治疗支数
          therapyCount:this.treatmentData[index].therapyCount,
          therapyDay:'',
          useTime:'',
          // 治疗状态
          treatmentStatus:this.treatmentData[index].treatmentStatus,
          // 销售途径
          salesChannel:this.treatmentData[index].salesChannel,
          causeShedding:'',
          reason:''
        }
        this.treatmentData.push(treanmentItemData)
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
  background: #fff;
  padding: 20px 20px;
  overflow: auto;
}
.wrapperArea{
  margin-bottom: 30px;
}
.wrapperArea-header{
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(0,0,0,1);
  margin-bottom: 20px;
}
.last-header{
  margin-bottom: 0px;
}
.wrapperArea-tip{
  padding-left: 12px;
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
.verticalLine{
  display: inline-block;
  width: 3px;
  height: 16px;
  vertical-align: -2px;
  background-color: #1989FA;
  margin-right: 2px;
}
.basicForm /deep/ .el-form-item{
  display: inline-block;
  margin-bottom: 10px;
  width: 45%;
}
.basicForm /deep/ .el-form-item__label{
  min-width: 80px;
  height: 40px;
  line-height: 40px;
}
.basicForm /deep/ input{
  height: 40px;
  line-height: 40px;
}
.basicForm /deep/ .el-radio-group{
  vertical-align: -4px;
}
.foot-btn{
  width: 220px;
  float: right;
}
.treatmentForm /deep/ .lastFormItem{
  display: block;
  width: 100%;
}
.treatmentForm /deep/ .el-textarea textarea{
  min-height: 80px !important;
}
.treatmentForm /deep/ .el-form-item{
  display: inline-block;
  width: 50%;
}
.treatmentItem{
  position: relative;
  padding: 20px;
  margin-bottom: 20px;
  width: 859px;
  height: auto;
  border: 1px dashed #C0C4CC;
}
.deleteIcon{
  position: absolute;
  right: -20px;
  top: 0px;
  color: #F56C6C;
}
.addTreatmentForm /deep/ .el-textarea textarea{
  min-height: 80px !important;
  width: 679px;
}
.addTreatmentForm /deep/ .el-form-item{
  display: inline-block;
  width: 50%;
}
.addTreatmentForm /deep/ .lastFormItem{
  display: block;
  width: auto;
}
</style>