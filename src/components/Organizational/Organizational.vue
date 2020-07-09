<template>
  <el-dialog :title="title" :visible.sync="addMenDialog" @close="onDialogClose()" width="800px" class="addRole" :close-on-click-modal='false' :show-close='false' :append-to-body='appendToBody'>
    <div class="tree_contanier">
      <div class="tree_searchArea">
        <el-input placeholder="搜索成员"  style="width:370px;float:left;" v-model="addRoleMemberDeptContent" clearable @clear="searchRemberInAddViewClear"></el-input>
        <el-button class="searchBtn" type="primary" size="small" style="width:70px;border-radius:0px 4px 4px 0px;float:right;" @click="searchRemberInAddView">搜索</el-button>
      </div>
      <happy-scroll color="rgba(51,51,51,0.2)" size="5" resize hide-horizontal v-if="!isAddSearching" class="happyScroll">
        <el-tree
          lazy
          :load="loadNode"
          class="filter-tree"
          node-key="id"
          :data="treeData"
          :props="defaultProps"
          highlight-current
          :expand-on-click-node="false"
          ref="tree"
          @node-click="handleNodeClick"
        >
          <span class="my-custom" slot-scope="{ node, data }">
            <i class="tree-icon" :class="data.name ? 'el-icon-user-solid':'iconfont'">{{!data.name ? '&#xe620;':''}}</i>
            <span>{{node.label}}</span>
          </span>
        </el-tree>
      </happy-scroll>
      <happy-scroll class="searchShowContent" v-else>
        <div class="searchShowContent_role" v-if="searchMemberList && searchMemberList.length">
          <span class="searchShowContent_title">成员</span>
          <ul class="searchShowContent_list">
            <li class="searchShowContent_item" v-for="( item,index ) in searchMemberList" :key="index" @click="searchResultClick(item)">
              <i class="el-icon-user-solid"></i>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="searchShowContent_class" v-if="searchDeptList && searchDeptList.length">
          <span class="searchShowContent_title">部门</span>
          <ul class="searchShowContent_list">
            <li class="searchShowContent_item" v-for="(item,index) in searchDeptList" :key="index" @click="searchResultClickWithDept(item)">
              <i class="iconfont">&#xe620;</i>
              <span>{{item.deptName}}</span>
            </li>
          </ul>
        </div>
      </happy-scroll>
    </div>
    <div class="checkArea">
      <div class="checkArea_title">
        已选择的成员
      </div>
      <ul class="checkArea_list">
        <li class="checkArea_item" v-for="(item,index) in checkRoleData" :key="index" @click="cancelCheck(item)">
          <i class="checkArea_item_icon" :class=" item.type == 0 ? 'el-icon-user-solid':'iconfont'">{{item.type == 1 ? '&#xe620;':''}}</i>
          <span class="checkArea_item_name">{{item.name}}</span>
          <span class="el-icon-close checkArea_item_cha"></span>
        </li>
      </ul>
    </div>
    <div class="submitBtn">
      <el-button type="primary" class="sureBtn" @click="saveInsertMerberOrDeptToTab">确定</el-button>
      <el-button @click="$emit('closeDialog')" class="cancelBtn">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import {
  getReAllocationUsers
} from '@/api/customerApi.js'
export default {
  name:"orgChild",
  props:{
    // 是否是嵌套dialog
    appendToBody:{
      type: Boolean,
      default: false
    },
    // 是否多选
    isMultipleChoice:{
      type: Boolean,
      default: true
    },
    // 弹框布尔值
    addMenDialog: {
      type: Boolean,
      default: false
    },
    // 初始的已选择角色
    initCheckRoleData: {
      type: Array
    },
    // 弹框title
    title: {
      type: String,
      default: '添加负责人'
    },
    // 可选择部门或人员，0为人员，1为部门，不传默认为12是都可以
    orgRuleType:{
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      addRoleMemberDeptContent:'',
      isAddSearching:false,
      defaultProps: {
        children: 'children',
        label: 'deptName',
        isLeaf:function(data,node){
          if(data.name){
            return true
          }else{
           return false
          }
        }
      },
      // 搜索的成员列表
      searchMemberList:[],
      // 搜索的部门列表
      searchDeptList:[],
      checkRoleData:[],
      treeData:[],
      currentDeptId:''
    }
  },
  created() {

  },
  mounted() {
    
  },
  methods: {
    init(){
      if(this.initCheckRoleData){
        this.checkRoleData = this.initCheckRoleData.map(item => item)
      }else{
        this.checkRoleData = []
      }
      this.addRoleMemberDeptContent = ''
      this.isAddSearching = false
      getReAllocationUsers({deptId:''}).then((res) => {
        this.treeData = res.deptList
      })
    },
    // 关闭添加成员弹窗
    onDialogClose() {
      this.$emit('closeDialog')
    },
    searchRemberInAddViewClear(){
      this.isAddSearching = false
      getReAllocationUsers({deptId:''}).then((res) => {
        this.searchMemberList = []
        this.searchDeptList = []
        this.treeData = res.deptList
      })
    },
    // 添加成员搜索框输入监听
    searchRemberInAddView(){
      if(this.addRoleMemberDeptContent.trim()){
        this.isAddSearching = true
        getReAllocationUsers({deptId:'',name:this.addRoleMemberDeptContent}).then((res) => {
          this.searchMemberList = res.userList
          this.searchDeptList = res.deptList
        })
      }
    },
    // 渲染树结构
    getTreeBookList(resolve){
      getReAllocationUsers({deptId:this.currentDeptId}).then((res) => {
        if(res.deptList){
          this.timeData = [...res.deptList]
        }
        if(res.userList){
          for(let i = 0; i < res.userList.length; i++){
            res.userList[i].deptName = res.userList[i].name
          }
          this.timeData = this.timeData.concat(res.userList)
        }
        resolve(this.timeData)
      })
    },
    loadNode(node, resolve){
      if(node.level === 0){
      }else {
        this.getTreeChild(node.data.id, resolve)
      }
    },
    getTreeChild(id, resolve) {
      this.currentDeptId = id
      this.getTreeBookList(resolve)
      //  这里可以替换成向后台发起的请求修改data,为了演示我用的是写死的数据,获取到data后,resolve出去就好了
    },
    // 树结构被点击时触发
    // 三个参数：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身
    handleNodeClick(data){
      let obj = {}
      obj.name = data.deptName
      obj.id = data.id
      if(data.name){
        if(this.isMultipleChoice){
          let isHave = false
          for (const key in this.checkRoleData) {
            if(obj.id == this.checkRoleData[key].id){
              isHave = true
              return
            }
          }
          if(!isHave) this.checkRoleData.push(obj)
        }else{
          this.checkRoleData = []
          this.checkRoleData.push(obj)
        }
      }
    },
    removeCheckData(obj){
      for(var i = 0; i < this.checkRoleData.length; i++){
        if(obj.name == this.checkRoleData[i].name && obj.id == this.checkRoleData[i].id){
          this.checkRoleData.splice(i, 1)
        }
      }
    },
    // 已选择界面取消选择
    cancelCheck(data){
      // 改变已选择界面的数据
      this.removeCheckData(data)
    },
    // 添加成员界面 搜索结果成员的点击事件
    searchResultClick(data){
      let obj = {}
      obj.name = data.name
      obj.id = data.id
      if(data.name){
        if(this.isMultipleChoice){
          let isHave = false
          for (const key in this.checkRoleData) {
            if(obj.id == this.checkRoleData[key].id){
              isHave = true
              return
            }
          }
          if(!isHave) this.checkRoleData.push(obj)
        }else{
          this.checkRoleData = []
          this.checkRoleData.push(obj)
        }
      }
    },
    // 添加成员界面 搜索结果部门的点击事件
    searchResultClickWithDept(data){
      let obj = {}
      obj.name = data.deptName
      obj.id = data.id
      // 只能选择成员
      if(data.name){
        if(this.isMultipleChoice){
          let isHave = false
          for (const key in this.checkRoleData) {
            if(obj.id == this.checkRoleData[key].id){
              isHave = true
              return
            }
          }
          if(!isHave) this.checkRoleData.push(obj)
        }else{
          this.checkRoleData = []
          this.checkRoleData.push(obj)
        }
      }
    },
    // 保存添加给标签的成员与部门
    saveInsertMerberOrDeptToTab(){
      if(this.checkRoleData.length){
        this.$message({
            message: '添加成功',
            type: 'success'
        })
        this.$emit('saveCheckRoleData',this.checkRoleData)
      }else{
        this.$message({
            message: '请选择至少一个角色',
            type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
.addRole /deep/ .el-dialog{
  height: 78vh;
}
.addRole /deep/ .happyScroll{
  height: 100%;
}
.addRole /deep/ .happy-scroll-container{
  height: 100% !important;
}
.addRole /deep/ .el-dialog__body{
  padding: 0 10px;
  height: 75%;
}
.addRole .tree_contanier{
  display: inline-block;
  width: 450px;
  height: 100%;
  background: #fff;
}
.addRole .my-custom{
  width: 100%;
}
.addRole .my-custom>i{
  margin-right: 5px;
  font-size: 14px;
}
.addRole .my-custom>span{
  font-size: 14px;
}
.addRole .my-custom .chooseItem{
  float: right;
}
.addRole .filter-tree{
  width: 440px;
}
.addRole .tree_searchArea{
  width: 100%;
  padding: 10px 0 10px 10px;
}
.addRole .tree_searchArea /deep/ .el-input input{
  border-radius:4px 0px 0px 4px;
}
.addRole .checkArea{
  position: absolute;
  right: 0px;
  top: 65px;
  width: 325px;
  height: 80%;
  padding-left: 15px;
  border-left: 1px solid #E6E6E6;
  overflow-y: auto;
}
.addRole .checkArea_title{
  width: 100%;
  height:20px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(96,98,102,1);
  line-height:20px;
  margin-bottom: 10px;
}
.addRole .checkArea_list{
  width: 100%;
}
.addRole .checkArea_item{
  position: relative;
  width: 100%;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
.addRole .checkArea_item_icon{
  margin-right: 10px;
  color: #6D7278;
}
.addRole .checkArea_item_name{
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(96,98,102,1);
}
.addRole .checkArea_item_cha{
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 14px;
}
.addRole .submitBtn{
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 61px;
  width: 100%;
  background:rgba(240,246,254,1);
}
.addRole .submitBtn .cancelBtn{
  position: absolute;
  right: 90px;
  top: 15px;
}
.addRole .submitBtn .sureBtn{
  position: absolute;
  right: 20px;
  top: 15px;
}
/* 搜索结果区域 */
.searchShowContent{
  padding: 0 0 0 10px;
}
.searchShowContent>div{
  margin-bottom: 10px;
}
.searchShowContent_title{
  display: block;
  height:20px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(144,147,153,1);
  line-height:20px;
}
.searchShowContent_item{
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
.searchShowContent_item>i{
  margin-right: 5px;
  font-size: 12px;
  color: #6D7278;
}
.searchShowContent_item>span{
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(96,98,102,1);
  line-height:30px;
}
.searchShowContent_item:hover{
  background: #E6F1FC;
}
.searchShowContent_chooseItem{
  float: right;
}
</style>