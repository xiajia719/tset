<template>
<happy-scroll color="rgba(51,51,51,0.2)" size="5" resize hide-horizontal>
  <div class="wrapper" v-if="$route.path==='/PositionManagement'">
  <SearchModal
  :createFn='createFn'
  :searchFn='searchFn'
  :baseValue='searchConfig'
  />
    <TableCommonModal
    :pageSize='searchParams.pageSize'
    :pageNumber='searchParams.pageNum'
    :totalRecord='totalRecord'
    :handleSizeChange='handleSizeChange'
    :handleCurrentChange='handleCurrentChange'
    :columnData='columnData'
    :tableData='tableData'>
    <template v-slot:currentRow="scope" align="left">
        <!-- <slot name="currentRow" :itemRow='scope.row' :itemProp='item.prop'> -->
          <el-tooltip effect="dark" :content="scope.itemRow.fullName" placement="top-start" v-if="scope.itemProp==='fullName'">
            <div  style="white-space: nowrap;text-overflow:ellipsis;overflow:hidden;">{{scope.itemRow.fullName}}</div>
          </el-tooltip>
          <!-- <el-button  @click="$router.push({name:'PositionView',params:scope.itemRow})" v-else-if="scope.itemProp==='jobsName'" type="text">{{scope.itemRow.jobsName}}</el-button> -->
          <span v-else style="white-space: nowrap;">{{scope.itemRow[scope.itemProp]}}</span>
        <!-- </slot> -->
    </template>
    <template v-slot:edite="scope">
      <el-dropdown trigger="click">
          <el-button
              class="el-dropdown-link"
              type="text"
          >操作</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="padding:0">
            <div style="padding:0 15px " @click="handleEdite(scope.scopeData)">
              编辑
            </div>
           </el-dropdown-item>
          <el-dropdown-item style="padding:0">
            <div style="padding:0 15px " @click="setUseLessFn(scope.scopeData)">{{scope.scopeData.status=='无效'?'有效':'失效'}}</div>
            </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    </TableCommonModal>
  </div>
  <router-view v-else></router-view>
</happy-scroll>
</template>

<script>
import TableCommonModal from "@/components/TableModal/tableCommonModal"
import SearchModal from "@/components/SearchModal"
import {findByPage,updateStatus} from '@/api/positionManage'
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
        jobsName:null,
        jobsCode:null,
        status:0
      },
      totalRecord:0,
      columnData:[
       {
          prop: 'jobsCode',
          label: '编码'
        },
        {
          prop: 'jobsName',
          label: '名称'
        },
        {
          prop: 'fullName',
          label: '所属组织',
          width:'150px'
        },
        {
          prop: 'name',
          label: '销售代表'
        },
        {
          prop: 'status',
          label: '状态'
        }
      ],
      tableData:[], 
      searchConfig:{
        selectValue:0,
        inputValue:'',
        selectOptions:[
          {label:'全部',value:0},
          {label:'有效',value:1},
          {label:'无效',value:2}
        ]
      }
    }
  },
  created() {
    if(this.$route.path === '/PositionManagement'){
      this.onSearch()
    }
  },
  mounted() {

  },
  watch:{
    '$route.path'(val){
      if(val === '/PositionManagement'){
        this.onSearch()
      }
    }
  },
  methods: {
    handleSizeChange(val){
      this.searchParams.pageSize = val
       this.onSearch()
    },
    handleCurrentChange(val){
      this.searchParams.pageNum = val
       this.onSearch()
    },
    handleEdite(row){
       this.$router.push({name:'PositionEdite',params:row})
    },
    createFn(baseValue){
      this.$router.push({name:'PositionCreate'})
    },
    searchFn(){
      this.searchParams.jobsName = this.searchConfig.inputValue
      this.searchParams.status = this.searchConfig.selectValue 
      this.searchParams.pageNum = 1
      this.onSearch()
    },
    setUseLessFn(row){
      // if(row.status === '无效'){
      //   this.$message.warning('岗位已经是失效状态')
      //   return false
      // }
      let {id} = row
      updateStatus({
        id
      }).then(res => {
         this.$message.success('设置成功')
         this.onSearch()
      })
    },
    onSearch(){
      this.searchParams.status = this.searchParams.status || null
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
    padding: 30px 20px;

  }
</style>