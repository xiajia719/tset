<template>
 <happy-scroll color="rgba(51,51,51,0.2)" size="5" resize hide-horizontal>
  <div class="wrapper" v-if="$route.path==='/TerminalManagement'">
  <el-tabs v-model="activeName"  type="card">
    <el-tab-pane label="终端信息" name="terminalList"></el-tab-pane>
    <el-tab-pane label="草稿信息" name="draftList"></el-tab-pane>
  </el-tabs>
    <SearchModal
    v-if="activeName==='terminalList'"
    :createFn="activeName==='terminalList'?createFn:null"
    :searchFn='searchFn'
    :baseValue='searchConfig'>
      <template v-slot:searchItem>
          <el-input v-if="searchConfig.selectValue==='city'"  clearable placeholder="搜索终端名称" v-model="searchConfig.inputValue" class="rightBorderRadius leftSelectRadius"  style="width:230px;"></el-input>
          <el-select v-else placeholder="搜索终端名称" v-model="searchConfig.inputValue" class="rightBorderRadius leftSelectRadius"  style="width:230px;">
            <el-option v-for="item in listArr[searchConfig.selectValue]" :key="item.id" :value="item.id" :label="item.value"></el-option>
          </el-select>
      </template>
    </SearchModal>
    <TableCommonModal
    :pageSize='searchParams.pageSize'
    :pageNumber='searchParams.pageNum'
    :totalRecord='totalRecord'
    :handleEdite='handleEdite'
    :handleSizeChange='handleSizeChange'
    :handleCurrentChange='handleCurrentChange'
    :columnData='columnData'
    :tableData='tableData'>
      <template v-slot:currentRow="scope" align="left">
          <el-badge v-if="scope.itemProp=='name'"  :is-dot="scope.itemRow.auditStatus=='审核中'" class="badgeItem">
            <el-tooltip style="padding:0 20px;" effect="dark" :content="scope.itemRow.name" placement="top-start">
              <el-button  @click="jumpToView(scope.itemRow)" type="text" >{{scope.itemRow.name}} </el-button>
            </el-tooltip>
          </el-badge>
          <span v-else style="white-space: nowrap;">{{scope.itemRow[scope.itemProp]}}</span>
      </template>
    </TableCommonModal>
  </div>
  <router-view v-else></router-view>
 </happy-scroll>
</template>

<script>
import TableCommonModal from "@/components/TableModal/tableCommonModal"
import SearchModal from "@/components/SearchModal"
import {findByPage,findByPageDraft,getSysConfigByCode} from "@/api/terminalManageApi"
const codeList = ['hospitalLevel','hospitalType']
// const arrList = ['hospitalLevelList','hospitalTypeList']
export default {
  components:{
    TableCommonModal,
    SearchModal
  },
  data() {
    return {
      searchParams:{
        pageSize:10,
        pageNum:1,
        city:'',
        hospitalLevel:'',
        hospitalType:''
      },
      totalRecord:0,
      activeName:'terminalList',
      columnData:[
       {
          prop: 'name',
          label: '终端',
          width:'120px'
        },
        {
          prop: 'area',
          label: '大区'
        },
        {
          prop: 'region',
          label: '地区'
        },
        {
          prop: 'province',
          label: '省份'
        },
        {
          prop: 'city',
          label: '城市'
        },
        {
          prop: 'hospitalLevel',
          label: '等级'
        }
      ],
      tableData:[], 
      searchConfig:{
        selectValue:'city',
        inputValue:'',
          selectOptions:[
          // {label:'全部',value:0},
          {label:'城市',value:'city'},
          {label:'级别',value:'hospitalLevel'}
          // {label:'类型',value:'hospitalType'}
        ]
      },
      listArr:{
        hospitalLevel:[],
        hospitalType:[]
      }
    }
  },
  created() {
    if(this.$route.path === '/TerminalManagement'){
      this.getSysConfigByCodeFn()
      this.onSearch()
    }
  },
  mounted() {

  },
  watch:{
    activeName(val){
      this.searchParams = {
        pageSize:10,
        pageNum:1,
        city:'',
        hospitalLevel:'',
        hospitalType:''
      }
      if(val === 'draftList'){
        this.onSearch = () => findByPageDraft(this.searchParams).then(res => {
        if(this.columnData.findIndex(item => item.prop == 'auditStatus') === -1){
          this.columnData.push({
            prop:'auditStatus',
            label:'状态'
          })
        }
          this.tableData = res.records
          this.totalRecord = res.total
        })
      }else{
        this.onSearch = () => findByPage(this.searchParams).then(res => {
        if(this.columnData.findIndex(item => item.prop == 'auditStatus') !== -1){
          this.columnData.splice(-1,1)
        }
          this.tableData = res.records
          this.totalRecord = res.total
        })
      }
      this.onSearch()
    },
    'searchConfig.selectValue'(val){
      this.searchConfig.inputValue = ''
      this.searchParams.city = null
      this.searchParams.hospitalLevel = null
      this.searchParams.hospitalType = null
    },
    '$route.path'(val){
      if(val === '/TerminalManagement'){
         this.getSysConfigByCodeFn()
         this.onSearch()
      }
    }
  },
  methods: {
    getSysConfigByCodeFn(){
      getSysConfigByCode({code:codeList.join()}).then(res => {
        this.listArr[codeList[0]] = res.hospitalLevel
        this.listArr[codeList[1]] = res.hospitalType
      })
    },
    jumpToView(item){
      this.$router.push({name:'TerminalView',params:{id:item.id,type:this.activeName == 'terminalList' ? 1 : 2,userId:0}})
    },
    handleSizeChange(val){
      this.searchParams.pageSize = val
      this.onSearch()
    },
    handleCurrentChange(val){
       this.searchParams.pageNum = val
      this.onSearch()
    },
    handleEdite(index,row){
      if(row.auditStatus !== '保存'){
        this.$router.push({name:'TerminalEdite',params:{id:row.id,type:1}})
      }else{
         this.$router.push({name:'TerminalEdite',params:{id:row.id,type:2}})
      }
    },
    createFn(baseValue){
      this.$router.push({name:'TerminalCreate'})
    },
    searchFn(){
       this.searchParams.pageNum = 1
      if(this.searchConfig.selectValue){
        this.searchParams[this.searchConfig.selectValue] = this.searchConfig.inputValue
      }
      this.onSearch()
    },
    onSearch(){
      findByPage(this.searchParams).then(res => {
        this.tableData = res.records
        this.totalRecord = res.total
      })
    }
  }
}
</script>

<style scoped  lang="scss" >
  .wrapper{
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 20px;

  }
</style>
<style scoped>
  .badgeItem>>>.is-dot {
        left: -8px;
        top: 10px;
  }
</style>