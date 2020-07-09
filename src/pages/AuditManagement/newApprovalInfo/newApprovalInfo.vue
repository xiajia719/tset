<template>
  <happy-scroll color="rgba(51,51,51,0.2)" size="5" resize hide-horizontal class="happyScroll">
    <el-container class="wrapper">
      <el-header class="header">
        <div class="header-container">
          <div class="header-title">客户-新建</div>
          <div class="header-info">
            <span class="header-item">审核对象：吴医生</span>
            <span class="header-item">提交人：林代表</span>
            <span class="header-item">提交时间：2020-01-01 12:00:00</span>
            <span class="header-item">当前状态：审核中</span>
          </div>
        </div>
        <div class="btnGroup">
          <el-button plain>返回</el-button>
          <el-button type="primary" @click="agreeDialog = true">同意</el-button>
          <el-button type="primary" @click="refuseDialog = true">拒绝</el-button>
        </div>
      </el-header>
      <el-container>
        <el-main class="main_contanier">
          <div class="main_contanier_title">客户信息</div>
          <div class="main_contanier_info" ref="leftInfo">
            <div class="wrapperArea">
              <div class="wrapperArea-header">
                <span class="verticalLine"></span>
                基本信息
              </div>
              <div class="wrapperArea_info">
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">姓名</span>
                  <span>林客户</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">性别</span>
                  <span>男</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">籍贯</span>
                  <span>黑龙江</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">手机号码</span>
                  <span>18512345678</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">邮箱地址</span>
                  <span>linll@163.com</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">微信/QQ</span>
                  <span>250250250</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">开户行</span>
                  <span>上海银行</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">银行卡号</span>
                  <span>330382199411191888</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">终端机构</span>
                  <span>武汉长江医院</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">科室</span>
                  <span>内分泌科</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">职务</span>
                  <span>-</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">管理床位数</span>
                  <span>10</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">身份证号</span>
                  <span>330382199411191888</span>
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
                  <span>林客户</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">医疗技术专业职称</span>
                  <span>全国学会委员</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">学会职务</span>
                  <span>-</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">执业医师类别</span>
                  <span>-</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">执业范围</span>
                  <span>-</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">是否专家库</span>
                  <span>-</span>
                </span>
                <span class="wrapperArea_item">
                  <span class="wrapperArea_item_label">擅长领域</span>
                  <span>临床</span>
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
                  <span>内分泌，心血管</span>
                </div>
                <div class="wrapperArea_foot_item">
                  <span class="wrapperArea_foot_item_label">备注</span>
                  <span>初次见面，意向客户</span>
                </div>
              </div>
            </div>
          </div>
        </el-main>
        <el-aside class="aside_contanier">
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
        </el-aside>
      </el-container>
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
          <el-button type="primary" @click="agreeDialog = false">确 定</el-button>
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
          <el-button @click="refuseDialog = false">取 消</el-button>
          <el-button type="primary" @click="refuseDialog = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </happy-scroll>
</template>

<script>
import smallTableReadOnly from '@/components/TableModal/smallTableReadOnly'
export default {
  components:{
    smallTableReadOnly
  },
  data() {
    return {
      leftInfoHeight:0,
      tableData: [
        {
          date: '汉利康',
          value1: 'A',
          value2: 'A',
          value3: 'A',
          value4: 'B'
        }
      ],
      // 同意/拒绝弹框
      agreeDialog:false,
      agreeOpinion:"",
      refuseDialog:false,
      refuseOpinion:""
    }
  },
  created() {
    window.addEventListener('resize',this.getleftInfoHieht)
  },
  mounted() {
    this.getleftInfoHieht()
  },
  methods: {
    getleftInfoHieht(){
      this.$nextTick(() => {
        this.leftInfoHeight = this.$refs.leftInfo.offsetHeight + 'px'
      }) 
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
  width: 100%;
  height: 100%;
}
.header{
  position: relative;
  padding: 10px 20px 0px;
  height:70px !important;
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
/* 审核管理 */
.agreeDialog /deep/ .el-form-item__label{
  margin-bottom: 10px;
}
.agreeDialog /deep/ .el-dialog__body{
  padding-top: 20px;
  padding-bottom: 10px;
}
.agreeDialog /deep/ .el-textarea textarea{
  min-height: 125px !important;
}
</style>