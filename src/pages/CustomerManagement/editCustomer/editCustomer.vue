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
            <el-input v-model="basicForm.cname" style="width:270px" placeholder="请输入客户姓名" @blur="getHaveSameCustomer"></el-input>
            <span class="sameCustomer" v-if="haveSameCustomer">
              存在同名客户，请
              <el-button type="text" @click="seeSameCustomer">查看</el-button>
              确认
            </span>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="basicForm.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-select v-model="basicForm.nativePlace" placeholder="请选择" style="width:270px" :popper-append-to-body='false'>
              <el-option
                v-for="item in provs"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
            <el-input v-model="basicForm.tel" style="width:270px"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址">
            <el-input v-model="basicForm.email" style="width:270px"></el-input>
          </el-form-item>
          <el-form-item label="微信/QQ">
            <el-input v-model="basicForm.weixin" style="width:270px"></el-input>
          </el-form-item>
          <el-form-item label="开户银行">
            <el-input v-model="basicForm.bank" style="width:270px"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input v-model="basicForm.bankNum" style="width:270px" @blur="checkBankNum"></el-input>
          </el-form-item>
          <el-form-item label="终端机构" prop="hid">
            <el-select v-model="basicForm.hid" placeholder="请选择" style="width:270px" :popper-append-to-body='false'>
              <el-option
                v-for="item in HospitalListOptions"
                :label="item.name"
                :value="item.id + ''"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科室" prop="department">
            <el-select v-model="basicForm.department" placeholder="请选择" style="width:270px" :popper-append-to-body='false'>
              <el-option
                v-for="item in selectOption.department"
                :label="item.value"
                :value="item.id + ''"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务" prop="position">
            <el-input v-model="basicForm.position" style="width:270px" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="管理床位数">
            <el-input v-model="basicForm.manageBeds" style="width:270px" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="basicForm.idCard" style="width:270px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="wrapperArea">
        <div class="wrapperArea-header">
          <span class="verticalLine"></span>
          职称信息
        </div>
        <el-form :model="technicalForm" :rules="technicalRule" ref="technicalForm" class="technicalForm">
          <el-form-item label="职称" prop="postName">
            <el-select v-model="technicalForm.postName" placeholder="请选择" style="width:270px" :popper-append-to-body='false'>
              <el-option
                v-for="item in selectOption.postName"
                :label="item.value"
                :value="item.id + ''"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医疗技术专业职称">
            <el-select v-model="technicalForm.medicalPostName" placeholder="请选择" style="width:270px" :popper-append-to-body='false'>
              <el-option
                v-for="item in selectOption.medicalPostName"
                :label="item.value"
                :value="item.id + ''"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学会职务" prop="institutePost">
            <el-select v-model="technicalForm.institutePost" placeholder="请选择" style="width:270px" :popper-append-to-body='false'>
              <el-option
                v-for="item in selectOption.institutePost"
                :label="item.value"
                :value="item.id + ''"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执业医师类别">
            <el-select v-model="technicalForm.mediPractiType" placeholder="请选择" style="width:270px" :popper-append-to-body='false'>
              <el-option
                v-for="item in selectOption.mediPractiType"
                :label="item.value"
                :value="item.id + ''"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执业范围">
            <el-select v-model="technicalForm.mediPractiRange" multiple placeholder="请选择" style="width:270px" :popper-append-to-body='false'>
              <el-option
                v-for="item in selectOption.mediPractiRange"
                :label="item.value"
                :value="item.id + ''"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否专家库" prop="gender">
            <el-radio-group v-model="technicalForm.isExpertLib">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="擅长领域">
            <el-input v-model="technicalForm.adeptField" style="width:270px" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="wrapperArea">
        <div class="wrapperArea-header last-header">
          <span class="verticalLine"></span>
          管理信息
        </div>
        <div class="wrapperArea-tip">
          <span class="wrapperArea-tip-word">支持产品及评级</span>
          <i class="el-icon-warning wrapperArea-tip-icon"></i>
          <el-button type="text" class="wrapperArea-tip-btn" @click="addProduct">添加产品</el-button>
        </div>
        <smallTable
          class="smallTable"
          :tableData='tableData'
          :businessRatingList='businessRatingList'
          :optionsValue='optionsValue'
          :handleDelete='handleDelete'
        />
        <el-form :model="manageForm" class="manage_form" label-width="80px" ref="manageForm">
          <el-form-item label="产品领域">
            <el-select v-model="manageForm.productField" multiple placeholder="请选择" style="width: 380px;">
              <el-option
                v-for="item in selectOption.productField"
                :label="item.value"
                :value="item.id + ''"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input 
              type="textarea"
              v-model="manageForm.remark"
              :rows="6"
              placeholder="请输入内容"
              autosize
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="foot-btn">
        <el-button @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" @click="onPost">提交审核</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </div>
      <el-dialog title="信息确认" :visible.sync="infoConfirm" class="infoConfirm" width="820px" :close-on-click-modal='false' :show-close='false'>
        <el-tabs type="card" @tab-click="infoConfirmClick" v-if="sameCustomerList.length > 1">
          <el-tab-pane :label="item.cname" v-for="(item,index) in sameCustomerList" :key="index" :value='index'>
            <div class="customerInfo">
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  姓名
                </span>
                <span class="customerInfo-content">
                  {{item.cname}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  微信/QQ
                </span>
                <span class="customerInfo-content">
                  {{item.weixin}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  科室
                </span>
                <span class="customerInfo-content">
                  {{item.department}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  性别
                </span>
                <span class="customerInfo-content">
                  {{item.gender == 1 ? '男':'女'}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  身份证号
                </span>
                <span class="customerInfo-content">
                  {{item.idCard}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  职务
                </span>
                <span class="customerInfo-content">
                  {{item.position}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  籍贯
                </span>
                <span class="customerInfo-content">
                  {{item.nativePlace}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  开户行
                </span>
                <span class="customerInfo-content">
                  {{item.bank}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  管理床位数
                </span>
                <span class="customerInfo-content">
                  {{item.manageBeds}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  手机号码
                </span>
                <span class="customerInfo-content">
                  {{item.tel}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  银行卡号
                </span>
                <span class="customerInfo-content">
                  {{item.bankNum}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  邮箱地址
                </span>
                <span class="customerInfo-content">
                  {{item.email}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  终端
                </span>
                <span class="customerInfo-content">
                  {{item.hospitalName}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  审核状态
                </span>
                <span class="customerInfo-content">
                  {{item.auditStatus}}
                </span>
              </div>
              <div class="customerInfo-item">
                <span class="customerInfo-key">
                  审核状态
                </span>
                <span class="customerInfo-content">
                  {{item.auditStatus}}
                </span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="customerInfo" v-else>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              姓名
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.cname}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              微信/QQ
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.weixin}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              科室
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.department}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              性别
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.gender == 1 ? '男':'女'}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              身份证号
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.idCard}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              职务
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.position}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              籍贯
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.nativePlace}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              开户行
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.bank}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              管理床位数
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.manageBeds}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              手机号码
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.tel}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              银行卡号
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.bankNum}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              邮箱地址
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.email}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              终端
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.hospitalName}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              审核状态
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.auditStatus}}
            </span>
          </div>
          <div class="customerInfo-item">
            <span class="customerInfo-key">
              审核状态
            </span>
            <span class="customerInfo-content">
              {{sameCustomerItem.auditStatus}}
            </span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="infoConfirm = false">取 消</el-button>
          <el-button type="primary" @click="addToMyCustomer">添加为我的客户</el-button>
        </span>
      </el-dialog>
    </div>
  </happy-scroll>
</template>

<script>
import smallTable from '@/components/TableModal/smallTable'
import {
  getSysConfigByCodeList,
  getCustomerInfoById,
  getCustomerInfoByName,
  getProductList,
  getHospitalList,
  submitCustomer,
  saveCustomer,
  submitCustomerInDraft,
  saveCustomerInDraft,
  findByIdInDarft
} from '@/api/customerApi.js'
export default {
  components:{
    smallTable
  },
   data() {
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) { //引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    }
    return {
      // 终端的下拉选
      HospitalListOptions:[],
      selectOption:[],
      businessRatingList:[],
      haveSameCustomer:false,
      sameCustomerList:[],
      sameCustomerItem:{},
      infoConfirm:false,
      provs:[
        {label:"北京市",value:"北京市"},
        {label:"天津市",value:"天津市"},
        {label:"河北省",value:"河北省"},
        {label:"山西省",value:"山西省"},
        {label:"内蒙古自治区",value:"内蒙古自治区"},
        {label:"辽宁省",value:"辽宁省"},
        {label:"吉林省",value:"吉林省"},
        {label:"黑龙江省",value:"黑龙江省"},
        {label:"上海市",value:"上海市"},
        {label:"江苏省",value:"江苏省"},
        {label:"浙江省",value:"浙江省"},
        {label:"安徽省",value:"安徽省"},
        {label:"福建省",value:"福建省"},
        {label:"江西省",value:"江西省"},
        {label:"山东省",value:"山东省"},
        {label:"河南省",value:"河南省"},
        {label:"湖北省",value:"湖北省"},
        {label:"湖南省",value:"湖南省"},
        {label:"广东省",value:"广东省"},
        {label:"广西壮族自治区",value:"广西壮族自治区"},
        {label:"海南省",value:"海南省"},
        {label:"重庆市",value:"重庆市"},
        {label:"四川省",value:"四川省"},
        {label:"贵州省",value:"贵州省"},
        {label:"云南省",value:"云南省"},
        {label:"西藏自治区",value:"西藏自治区"},
        {label:"陕西省",value:"陕西省"},
        {label:"甘肃省",value:"甘肃省"},
        {label:"青海省",value:"青海省"},
        {label:"宁夏回族自治区",value:"宁夏回族自治区"},
        {label:"新疆维吾尔自治区",value:"新疆维吾尔自治区"},
        {label:"台湾省",value:"台湾省"},
        {label:"香港特别行政区",value:"香港特别行政区"},
        {label:"澳门特别行政区",value:"澳门特别行政区"}
      ],
      basicForm: {
        cname: '',
        gender: '1',
        nativePlace:'',
        tel:'',
        email:'',
        weixin:'',
        bank:'',
        bankNum:'',
        hid:'',
        department:'',
        position:'',
        manageBeds:'',
        idCard:''
      },
      rules: {
        cname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        tel: [
          { required: true, validator: checkphone, trigger: 'blur' }
        ],
        hid: [
          { required: true, message: '请选择终端', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择科室', trigger: 'change' }
        ],
        position: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ]
      },
      technicalForm:{
        postName:'',
        medicalPostName:'',
        institutePost:'',
        mediPractiType:'',
        mediPractiRange:[],
        isExpertLib:'1',
        adeptField:''
      },
      technicalRule: {
        postName: [
          { required: true, message: '请选择职称', trigger: 'change' }
        ],
        institutePost: [
          { required: true, message: '请选择学会职务', trigger: 'change' }
        ]
      },
      tableData: [
      ],
      optionsValue: [
      ],
      manageForm:{
        productField:[],
        remark:''
      },
      currentCustomerId:'',
      customerInfoType:'',
      currentInfoConfirmIndex:0,
      // 输入的是否是正确的银行卡号
      isRightBankNum:true
    };
  },
  mounted(){
    this.customerInfoType = this.$route.params.type
    this.currentCustomerId = this.$route.params.id
    if(this.customerInfoType == 'info'){
      this.getCustomerInfo()
    }else if(this.customerInfoType == 'darft'){
      this.getCustomerInfoInDarft()
    }
    this.getSysConfigByCodeList()
  },
  methods: {
    //检查手机号
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    // 根据id获取客户详情,拜访信息
    getCustomerInfo(){
      getCustomerInfoById(this.currentCustomerId).then((res) => {
        this.setValueToForm(res)
      })
    },
    // 草稿箱进详情页----根据id获取客户详情,拜访信息
    getCustomerInfoInDarft(){
      findByIdInDarft(this.currentCustomerId).then((res) => {
        this.setValueToForm(res)
      })
    },
    getAllProductOptions(){
      getProductList().then(res => {
        this.productIdList = res.records
      })
    },
    // 根据输入的客户名判断是否有同名客户
    getHaveSameCustomer(e){
      if(e.target.value.trim() != ''){
        getCustomerInfoByName(e.target.value).then((res) => {
          if(res.length){
            this.haveSameCustomer = true
            // 判断是有一个同名客户还是多个
            if(res.length > 1){
              this.sameCustomerList = res
            }else{
              this.sameCustomerList = res
              this.sameCustomerItem = res[0]
            }
          }else{
            this.haveSameCustomer = false
          }
        })
      }
    },
    getSysConfigByCodeList(){
      getSysConfigByCodeList('department,postName,institutePost,medicalPostName,mediPractiType,mediPractiRange,productField,academicRating,customer_business_rating').then((res) => {
        this.selectOption = res
        this.optionsValue = res.academicRating
        this.businessRatingList = res.customer_business_rating
      })
      getHospitalList('').then((res) => {
        this.HospitalListOptions = res.records
      })
    },
    // 添加产品
    addProduct(){
      this.tableData.push(
        {
          pid: '',
          academicRating: '',
          academicRatingSys: '',
          businessRating: '',
          businessRatingSys: ''
        }
      )
    },
    // 删除产品
    handleDelete(index,data){
      this.$confirm('确认删除此产品？', '删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.tableData.splice(index,1)
      }).catch(() => {})
    },
    // 查看同名客户
    seeSameCustomer(){
      this.infoConfirm = true
    },
    infoConfirmClick(tab){
      this.currentInfoConfirmIndex = tab.index * 1
    },
    // 添加为我的客户按钮
    addToMyCustomer(){
      if(this.sameCustomerList.length > 1){
        // 为表单赋值
        this.setValueToForm(this.sameCustomerList[this.currentInfoConfirmIndex])
      }else{
        // 为表单赋值
        this.setValueToForm(this.sameCustomerItem)
      }
      this.infoConfirm = false
    },
    // 为表单赋值
    setValueToForm(data){
      this.basicForm.bank = data.bank + ''
      this.basicForm.tel = data.tel + ''
      this.basicForm.weixin = data.weixin + ''
      this.basicForm.bankNum = data.bankNum + ''
      this.basicForm.cname = data.cname + ''
      this.basicForm.department = data.department ? (data.department + '') : ''
      this.basicForm.email = data.email + ''
      this.basicForm.gender = data.gender + ''
      this.basicForm.hid = data.hid ? (data.hid + '') : ''
      this.basicForm.idCard = data.idCard + ''
      this.basicForm.nativePlace = data.nativePlace + ''
      this.basicForm.position = data.position + ''
      this.basicForm.manageBeds = data.manageBeds + ''
      this.technicalForm.institutePost = data.institutePost + ''
      this.technicalForm.isExpertLib = data.isExpertLib + ''
      this.technicalForm.adeptField = data.adeptField + ''
      this.technicalForm.auditStatus = data.auditStatus + ''
      this.technicalForm.mediPractiRange = data.mediPractiRange ? data.mediPractiRange.split(',') : []
      this.technicalForm.mediPractiType = data.mediPractiType ? (data.mediPractiType + '') : ''
      this.technicalForm.medicalPostName = data.medicalPostName ? (data.medicalPostName + '') : ''
      this.technicalForm.postName = data.postName + ''
      this.manageForm.productField = data.productField ? data.productField.split(',') : []
      this.manageForm.remark = data.remark
      this.tableData = data.productList
    },
    // 提交审核
    onPost(formName) {
      // 先验证基本信息
      let flag = true
      // 先验证基本信息
      this.$refs.basicForm.validate((valid) => {
        if (valid) {
          flag = true
        } else {
          flag = false
          return false
        }
      });
      // 再验证职称信息
      this.$refs.technicalForm.validate((valid) => {
        if (valid) {
          if(!this.isRightBankNum){
            this.$message({
              message: '请输入正确的银行卡号',
              type: 'warning'
            });
            return
          }
          // 验证是否有未填写完整的产品信息
          let isHaveproduct = true
          if(this.tableData.length){
            this.tableData.map(item => {
              if(!item.pid || !item.academicRating || !item.businessRating){
                isHaveproduct = false
              }else{
              }
            })
          }else{
            isHaveproduct = true
          }
          if(!isHaveproduct){
            this.$message({
              message: '请输入完整的产品信息',
              type: 'warning'
            });
            return
          }
          if(flag){
            let parmas = {}
            // 必填字段
            parmas.id = this.currentCustomerId
            parmas.cname = this.basicForm.cname
            parmas.gender = this.basicForm.gender
            parmas.tel = this.basicForm.tel
            parmas.position = this.basicForm.position
            parmas.postName = this.technicalForm.postName
            parmas.institutePost = this.technicalForm.institutePost
            // 非必填字段
            parmas.nativePlace = this.basicForm.nativePlace
            parmas.email = this.basicForm.email
            parmas.weixin = this.basicForm.weixin
            parmas.idCard = this.basicForm.idCard
            parmas.bank = this.basicForm.bank
            parmas.bankNum = this.basicForm.bankNum
            parmas.hid = this.basicForm.hid
            parmas.department = this.basicForm.department
            parmas.manageBeds = this.basicForm.manageBeds
            parmas.medicalPostName = this.technicalForm.medicalPostName
            parmas.mediPractiType = this.technicalForm.mediPractiType
            parmas.mediPractiRange = this.technicalForm.mediPractiRange.join()
            parmas.adeptField = this.technicalForm.adeptField
            parmas.isExpertLib = this.technicalForm.isExpertLib
            parmas.productField = this.manageForm.productField.join()
            parmas.remark = this.manageForm.remark
            if(this.tableData.length){
              parmas.productList = this.tableData.map(item => {
                if(item.id){
                  return {
                    id:item.id,
                    pid:item.pid,
                    academicRating:item.academicRating,
                    businessRating:item.businessRating
                  }
                }else{
                  return {
                    pid:item.pid,
                    academicRating:item.academicRating,
                    businessRating:item.businessRating
                  }
                }
              })
            }else{
              parmas.productList = []
            }
            if(this.customerInfoType == 'info'){
              submitCustomer(parmas).then((res) => {
                this.$message({
                  message: '提交审核成功',
                  type: 'success'
                })
                this.$router.push({name:'CustomerManagement'})
              })
            }else if(this.customerInfoType == 'darft'){
              submitCustomerInDraft(parmas).then((res) => {
                this.$message({
                  message: '提交审核成功',
                  type: 'success'
                })
                this.$router.push({name:'CustomerManagement'})
              })
            }
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 确定
    onSubmit(){
      // 先验证基本信息
      let flag = true
      // 先验证基本信息
      this.$refs.basicForm.validate((valid) => {
        if (valid) {
          flag = true
        } else {
          flag = false
          return false
        }
      });
      // 再验证职称信息
      this.$refs.technicalForm.validate((valid) => {
        if (valid) {
          if(!this.isRightBankNum){
            this.$message({
              message: '请输入正确的银行卡号',
              type: 'warning'
            });
            return
          }
          // 验证是否有未填写完整的产品信息
          let isHaveproduct = true
          if(this.tableData.length){
            this.tableData.map(item => {
              if(!item.pid || !item.academicRating || !item.businessRating){
                isHaveproduct = false
              }else{
              }
            })
          }else{
            isHaveproduct = true
          }
          if(!isHaveproduct){
            this.$message({
              message: '请输入完整的产品信息',
              type: 'warning'
            });
            return
          }
          if(flag){
            let parmas = {}
            // 必填字段
            parmas.id = this.currentCustomerId
            parmas.cname = this.basicForm.cname
            parmas.gender = this.basicForm.gender
            parmas.tel = this.basicForm.tel
            parmas.position = this.basicForm.position
            parmas.postName = this.technicalForm.postName
            parmas.institutePost = this.technicalForm.institutePost
            // 非必填字段
            parmas.nativePlace = this.basicForm.nativePlace
            parmas.email = this.basicForm.email
            parmas.weixin = this.basicForm.weixin
            parmas.idCard = this.basicForm.idCard
            parmas.bank = this.basicForm.bank
            parmas.bankNum = this.basicForm.bankNum
            parmas.hid = this.basicForm.hid
            parmas.department = this.basicForm.department
            parmas.manageBeds = this.basicForm.manageBeds
            parmas.medicalPostName = this.technicalForm.medicalPostName
            parmas.mediPractiType = this.technicalForm.mediPractiType
            parmas.mediPractiRange = this.technicalForm.mediPractiRange.join()
            parmas.adeptField = this.technicalForm.adeptField
            parmas.isExpertLib = this.technicalForm.isExpertLib
            parmas.productField = this.manageForm.productField.join()
            parmas.remark = this.manageForm.remark
            if(this.tableData.length){
              parmas.productList = this.tableData.map(item => {
                if(item.id){
                  return {
                    id:item.id,
                    pid:item.pid,
                    academicRating:item.academicRating,
                    businessRating:item.businessRating
                  }
                }else{
                  return {
                    pid:item.pid,
                    academicRating:item.academicRating,
                    businessRating:item.businessRating
                  }
                }
              })
            }else{
              parmas.productList = []
            }
            if(this.customerInfoType == 'info'){
              saveCustomer(parmas).then((res) => {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.$router.push({name:'CustomerManagement'})
              })
            }else if(this.customerInfoType == 'darft'){
              saveCustomerInDraft(parmas).then((res) => {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.$router.push({name:'CustomerManagement'})
              })
            }
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 银行卡的失焦事件
    checkBankNum(e){
      // 去除所有空格
      const str = e.target.value.replace(/\s*/g,"");
      if(!this.luhnCheck(str)){
        this.isRightBankNum = false
        this.$message({
          message: '请输入正确的银行卡号',
          type: 'warning'
        });
      }else{
        this.isRightBankNum = true
      }
    },
    // 银行卡的校验规则
    luhnCheck(bankno) {
      var lastNum = bankno.substr(bankno.length - 1, 1) //取出最后一位（与luhn进行比较）
      var first15Num = bankno.substr(0, bankno.length - 1) //前15或18位
      var newArr = []
      for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1))
      }
      var arrJiShu = [] //奇数位*2的积 <9
      var arrJiShu2 = [] //奇数位*2的积 >9
      var arrOuShu = [] //偶数位数组
      for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) { //奇数位
          if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
          else arrJiShu2.push(parseInt(newArr[j]) * 2);
        } else{ 
          //偶数位
          arrOuShu.push(newArr[j]); 
        }
      }

      var jishuChild1 = [] //奇数位*2 >9 的分割之后的数组个位数
      var jishuChild2 = [] //奇数位*2 >9 的分割之后的数组十位数
      for (var h = 0; h < arrJiShu2.length; h++) {
          jishuChild1.push(parseInt(arrJiShu2[h]) % 10);
          jishuChild2.push(parseInt(arrJiShu2[h]) / 10);
      }

      var sumJiShu = 0; //奇数位*2 < 9 的数组之和
      var sumOuShu = 0; //偶数位数组之和
      var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
      var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
      var sumTotal = 0;
      for (var m = 0; m < arrJiShu.length; m++) {
          sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
      }

      for (var n = 0; n < arrOuShu.length; n++) {
          sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
      }

      for (var p = 0; p < jishuChild1.length; p++) {
          sumJiShuChild1 = sumJiShuChild1 + parseInt(jishuChild1[p]);
          sumJiShuChild2 = sumJiShuChild2 + parseInt(jishuChild2[p]);
      }
      //计算总和
      sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

      //计算luhn值
      var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
      var luhn = 10 - k;

      if (lastNum == luhn) {
        return true
      } else {
        return false
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
.technicalForm /deep/ .el-form-item{
  display: inline-block;
  width: 45%;
}
.technicalForm /deep/ .el-form-item__label{
  min-width: 80px;
  height: 40px;
  line-height: 40px;
}
.technicalForm /deep/ input{
  height: 40px;
  line-height: 40px;
}
.technicalForm /deep/ .el-radio-group{
  vertical-align: -4px;
}
.smallTable{
  margin-left: 12px;
  margin-bottom: 20px;
}
.manage_form{
  width: 800px;
  box-sizing: border-box;
  padding-left: 12px;
}
.manage_form /deep/ .el-form-item{
  width: 800px;
}
.manage_form /deep/ .el-textarea textarea{
  min-height: 125px !important;
}
.foot-btn{
  width: 220px;
  float: right;
  margin-right: 100px;
}
.sameCustomer{
  margin-left: 5px;
  font-size:12px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(144,147,153,1);
}
/* 弹出框样式 */
.infoConfirm /deep/ .el-dialog__body{
  padding-top: 15px;
}
.customerInfo{
  width: 771px;
  height: 217px;
  border: 1.5px solid #DCDFE6;
}
.customerInfo-item{
  float: left;
  height: 43px;
  overflow: hidden;
}
.customerInfo-key{
  float: left;
  box-sizing: border-box;
  border: 1px solid #DCDFE6;
  padding-left: 10px;
  width: 76px;
  height: 43px;
  line-height: 43px;
  text-align: left;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(144,147,153,1);
  overflow: hidden;
}
.customerInfo-content{
  overflow: hidden;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #DCDFE6;
  padding-left: 10px;
  width: 180px;
  height: 43px;
  line-height: 43px;
  text-align: left;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(0,0,0,1);
}
</style>