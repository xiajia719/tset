<template>
  <happy-scroll color="rgba(51,51,51,0.2)" size="5" resize hide-horizontal class="happyScroll">
    <el-container class="wrapper">
      <el-header class="header">
        <div class="header-container">
          <div class="header-container-img">
            <img src="@/assets/image/bg_gray.png" alt="用户头像">
          </div>
          <div class="customerBasicInfo">
            <div class="customerBasicInfo_top">
              <span class="wrapperArea_item_name">{{customerData.cname}}</span>
              <span class="wrapperArea_item customerBasicInfo_item">
                <span class="wrapperArea_item_label">销售代表：</span>
                <span>{{customerData.behalfName}}</span>
              </span>
              <span class="wrapperArea_item customerBasicInfo_item">
                <span class="wrapperArea_item_label">联系电话：</span>
                <span>{{customerData.tel}}</span>
              </span>
              <span class="wrapperArea_item customerBasicInfo_item">
                <span class="wrapperArea_item_label">终端：</span>
                <span>{{customerData.hospitalName}}</span>
              </span>
            </div>
            <div class="customerBasicInfo_down">
              <!-- 只有审核通过并且不是草稿箱的才可以添加拜访 -->
              <el-button v-if="currentAuditStatus == '审核通过' && customerInfoType == 'info'" type="primary" plain class="customerBasicInfo_down_btn" @click="addVisit()">添加拜访</el-button>
              <el-button v-if="currentAuditStatus == '审核通过' && customerInfoType == 'info'" type="primary" plain class="customerBasicInfo_down_btn" @click="addPatientAction">添加患者</el-button>
              <el-button type="primary" plain class="customerBasicInfo_down_btn" @click="editCustomer">编辑</el-button>
              <el-button v-if="currentAuditStatus == '审核通过' && customerInfoType == 'info' && isDutyDept" type="primary" plain class="customerBasicInfo_down_btn" @click="redistribute">重分配</el-button>
              <!-- <el-button type="primary" plain class="customerBasicInfo_down_btn">加入公海</el-button> -->
            </div>
          </div>
        </div>
        <div class="customerStatus" v-if="customerInfoType == 'info'">
          <span class="customerStatus-word">{{currentAuditStatus}}</span>
          <el-popover
            placement="right-start"
            width="420"
            trigger="hover">
            <div class="examineList">
              <div class="examineStepName">审核流程</div>
              <div class="examineItem" v-for="(item,index) in examineList" :key="index">
                <span class="examine_tagName">{{item.nodeName}}</span>
                <span class="examine_person">{{item.assignee}}</span>
                <span class="examine_result">{{item.audit}}</span>
                <span class="examine_time">{{item.endTime}}</span>
              </div>
            </div>
            <i slot="reference" class="el-icon-time wrapperArea-tip-icon"></i>
          </el-popover>
        </div>
      </el-header>
      <el-container>
        <el-main class="main_contanier">
          <div class="main_contanier_title">客户信息</div>
          <div class="main_contanier_info" ref="rightContanier">
            <div class="wrapperArea">
              <div class="wrapperArea-header">
                <span class="verticalLine"></span>
                基本信息
              </div>
              <div class="wrapperArea_info">
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">姓名</span>
                  <span>{{customerData.cname}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">性别</span>
                  <span>{{customerData.gender == 1 ? '男':'女'}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">籍贯</span>
                  <span>{{customerData.nativePlace}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">手机号码</span>
                  <span>{{customerData.tel}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">邮箱地址</span>
                  <span>{{customerData.email}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">微信/QQ</span>
                  <span>{{customerData.weixin}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">开户行</span>
                  <span>{{customerData.bank}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">银行卡号</span>
                  <span>{{customerData.bankNum}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">终端机构</span>
                  <span>{{customerData.hospitalName}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">科室</span>
                  <span>{{customerData.department}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">职务</span>
                  <span>{{customerData.position}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">管理床位数</span>
                  <span>{{customerData.manageBeds}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">身份证号</span>
                  <span>{{customerData.idCard}}</span>
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
                  <span>{{customerData.postName}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">医疗技术专业职称</span>
                  <span>{{customerData.medicalPostName}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">学会职务</span>
                  <span>{{customerData.institutePost}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">执业医师类别</span>
                  <span>{{customerData.mediPractiType}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">执业范围</span>
                  <span>{{customerData.mediPractiRange}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">是否专家库</span>
                  <span>{{customerData.isExpertLib == 1 ? '是':'否'}}</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">擅长领域</span>
                  <span>{{customerData.adeptField}}</span>
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
              <smallTableReadOnly
                class="smallTable"
                :tableData='tableData'
              />
              <div class="wrapperArea_foot">
                <div class="wrapperArea_foot_item">
                  <span class="wrapperArea_foot_item_label">产品领域</span>
                  <span>{{customerData.productField}}</span>
                </div>
                <div class="wrapperArea_foot_item">
                  <span class="wrapperArea_foot_item_label">备注</span>
                  <span>{{customerData.remark}}</span>
                </div>
              </div>
            </div>
          </div>
        </el-main>
        <el-aside class="aside_contanier">
          <div class="main_contanier_title">拜访信息</div>
          <happy-scroll class="visitInfoList" :style="{height:elHeightValue}" color="rgba(51,51,51,0.2)" size="5" resize hide-horizontal >
            <div class="visitInfoList" v-if="visitList.length">
              <el-card shadow="hover" class="visitInfoItem" v-for="item in visitList" :key="item.id">
                <div class="visitInfoItemTop">
                  <el-tag>{{item.visitWay}}</el-tag>
                  <span class="visitInfoTime">拜访时间：{{item.visitDate}}</span>
                </div>
                <div class="visitInfoRemark">{{item.remark}}</div>
                <div class="visitImgList">
                  <img :src="i" v-for="i in item.urlList" :key="i" class="visitImgItem" @click="openImgView(i)">
                </div>
                <div class="recordMan">
                  <span>
                    记录者：{{item.name}}
                  </span>
                </div>
              </el-card>
            </div>
            <div class="noVisitInfo" v-else>
              暂无拜访信息
            </div>
          </happy-scroll>
        </el-aside>
      </el-container>
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
    </el-container>
  </happy-scroll>
</template>

<script>
import smallTableReadOnly from '@/components/TableModal/smallTableReadOnly'
import Organizational from '@/components/Organizational/Organizational.vue'
import {
  findDetailById,
  getSysConfigByCodeList,
  addCustomerVisit,
  getCustomerVisitList,
  isDutyDept,
  getUsersByCustomerId,
  findDetailByIdInDraft,
  saveReAllocation,
  getProcessInstanceDetail
} from '@/api/customerApi.js'
import {
  moreLetter
} from '@/utils/common.js'
export default {
  components:{
    smallTableReadOnly,
    Organizational
  },
  data() {
    return {
      isDutyDept:false,
      elHeightValue:0,
      tableData: [
      ],
      // ----------------------------------------------添加拜访
      addVisitDialog:false,
      addVisitform:{
        customer:'',
        visitDate:'',
        visitWay:'',
        remark:''
      },
      disabled: false,
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
      // 添加拜访的上传图片
      fileList:[],
      fileListData:[],
      dialogImageUrl: '',
      dialogVisible: false,
      imgDisabled: false,
      // -------------------------------------- 重分配的组织架构
      resetDialog:false,
      resetTableData:[
      ],
      currentResetIndex:'',
      orgTitle:'选择员工',
      checkRoleData:[],
      addMenDialog:false,
      currentCustomerId:'',
      customerInfoType:'',
      currentAuditStatus:'',
      customerData:{},
      visitList:[],
      // 审核流程
      examineList:[
        {},{},{},{},{},{}
      ]
    }
  },
  created() {
    window.addEventListener('resize',this.getRightHeight)
  },
  mounted() {
    this.customerInfoType = this.$route.params.type
    this.currentCustomerId = this.$route.params.id
    this.getRightHeight()
    this.getSysConfigByCodeList()
    this.getIsDutyDept()
    this.getProcessDetail()
    if(this.customerInfoType == 'info'){
      this.getCustomerInfo()
    }else if(this.customerInfoType == 'darft'){
      this.getCustomerInfoInDarft()
    }
  },
  methods: {
    // 获取审核信息
    getProcessDetail(){
      getProcessInstanceDetail({businessKey:this.currentCustomerId}).then((res) => {
        this.examineList = res.reverse()
      })
    },
    // ---------------------------------------------------重分配
    // 点击重分配
    redistribute(){
      getUsersByCustomerId(this.currentCustomerId).then((res) => {
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
    },
    // 去编辑页面
    editCustomer(){
      if(this.customerInfoType == 'info'){
        this.$router.push({name:'editCustomer',params: {type:'info',id:this.currentCustomerId}})
      }else if(this.customerInfoType == 'darft'){
        this.$router.push({name:'editCustomer',params: {type:'darft',id:this.currentCustomerId}})
      }
    },
    // 查询是否为部门负责人
    getIsDutyDept(){
      isDutyDept().then((res) => {
        // this.isDutyDept = true
        this.isDutyDept = res.data
      })
    },
    // 客户列表----根据id获取客户详情,拜访信息
    getCustomerInfo(){
      findDetailById(this.currentCustomerId).then((res) => {
        this.customerData = res
        this.tableData = res.productList
        this.currentAuditStatus = res.auditStatus
      })
      getCustomerVisitList(this.currentCustomerId).then((res) => {
        this.visitList = res
      })
    },
    // 草稿列表----根据id获取客户详情,拜访信息
    getCustomerInfoInDarft(){
      findDetailByIdInDraft(this.currentCustomerId).then((res) => {
        this.customerData = res
        this.tableData = res.productList
        this.currentAuditStatus = res.auditStatus
      })
      getCustomerVisitList(this.currentCustomerId).then((res) => {
        this.visitList = res
      })
    },
    getRightHeight(){
      this.$nextTick(() => {
        this.elHeightValue = this.$refs.rightContanier.offsetHeight + 'px'
      }) 
    },
    // ---------------------------------------------------------添加拜访
    // 操作-添加拜访
    addVisit(){
      this.addVisitDialog = true
      this.currentChoiceCustomerId = this.customerData.id
      // 重置数据
      this.addVisitform.visitDate = ''
      this.addVisitform.visitWay = ''
      this.addVisitform.remark = ''
      this.fileList = []
      this.fileListData = []
      this.addVisitform.customer = this.customerData.cname
    },
    // 操作-添加患者
    addPatientAction(){
      this.$store.dispatch('setCurrentCustomerId',this.currentCustomerId)
      this.$router.push({name:'addPatient'})
    },
    // 取消添加拜访
    addVisitCancel(formName){
      this.$refs[formName].resetFields();
      this.addVisitDialog = false
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
            getCustomerVisitList(this.currentCustomerId).then((res) => {
              this.visitList = res
            })
          })
        } else {
          return false;
        }
      });
    },
    // 获取拜访方式的option
    getSysConfigByCodeList(){
      getSysConfigByCodeList('visitMethod').then((res) => {
        this.visitMethodList = res.visitMethod
      })
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
    // 添加拜访的上传图片
    handleRemove(file) {
      this.fileListData.map((item,index) => {
        if(item.gid == file.response.data[0].gid){
          this.fileListData.splice(index,1)
        }
      })
    },
    // 添加拜访增加图片，可预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 右侧拜访信息图片可点击，点击预览大图
    openImgView(url){
      this.dialogImageUrl = url;
      this.dialogVisible = true;
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
.aside_contanier{
  width: 40% !important;
  padding: 0px 0px 0px 20px;
}
.main_contanier{
  padding: 0px;
}
.main_contanier_title{
  margin-bottom: 15px;
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(0,0,0,1);
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
  height: 35px;
  line-height: 35px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
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
  text-align: left;
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
.customerStatus{
  position: absolute;
  right: 15px;
  top: 15px;
}
.customerStatus-word{
  margin-right: 5px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(109,114,120,1);
}
.visitInfoItemTop{
  margin-bottom: 10px;
}
.visitInfoTime{
  float: right;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(144,147,153,1);
}
.visitInfoRemark{
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.visitInfoList /deep/ .happy-scroll-container{
  height: 100% !important;
  width: 100% !important;
}
.visitInfoList /deep/ .el-card__body{
  padding-bottom: 15px;
}
.visitInfoItem{
  width: 98%;
  margin-bottom: 20px;
}
.noVisitInfo{
  font-size: 14px;
  font-family: PingFangSC-Regular,PingFang SC;
  font-weight: 400;
  color: rgba(144,147,153,1);
}
/* ------------------------------------------------------添加拜访 */
.addVisitForm /deep/ .el-textarea textarea{
  min-height: 125px !important;
}
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
/*------------------------------------------------- 重分配 */
.resetContainer-reset{
  float: right;
}
.visitImgList{
  margin-top: 10px;
}
.visitImgItem{
  width: 64px;
  height: 64px;
  background-size: cover;
  margin-right: 10px;
}
.recordMan{
  margin-top: 10px;
  height: 20px;
}
.recordMan span{
  float: right;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(144,147,153,1);
}
/* 审批流程 */
.examineList{
  width: 100%;
  max-height: 205px;
  padding: 0px 10px 10px;
  overflow-y: auto;
}
.examineStepName{
  margin-left: -10px;
  margin-bottom: 10px;
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color: #000;
}
.examineItem{
  height: 40px;
  line-height: 40px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
}
.examine_tagName{
  margin-right: 10px;
  color:rgba(51,51,51,1);
}
.examine_person{
  margin-right: 10px;
  font-weight:700;
  color:rgba(51,51,51,1);
}
.examine_result{
  color:rgba(25,137,250,1);
}
.examine_time{
  float: right;
  color:rgba(109,114,120,1);
}
/*滚动条样式*/
.examineList::-webkit-scrollbar {/*滚动条整体样式*/
  width:4px;/*高宽分别对应横竖滚动条的尺寸*/
  height:4px;
}
.examineList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius:5px;
  -webkit-box-shadow: inset005pxrgba(0,0,0,0.2);
  background:rgba(0,0,0,0.2);
}
.examineList::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset005pxrgba(0,0,0,0.2);
  border-radius:0;
  background:rgba(0,0,0,0.1);
}
</style>