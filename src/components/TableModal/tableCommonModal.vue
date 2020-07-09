<template>
<div>
    <slot name='header' :data='slot'>
    </slot>
    <el-table
    ref='tableModal'
      :data="tableData"
      :header-row-style="headerRowStyle"
      @sort-change='sortChangeFn'
      @selection-change="selectChangeEmit"
      style="width: 100%">
       <el-table-column v-if="type" :type="type"></el-table-column>
      <el-table-column
        v-for="item in columnData"
        :key="item.id"
        :sortable='item.sortable'
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width">
         <template slot-scope="scope" align="left">
             <slot name="currentRow" :itemRow='scope.row' :itemProp='item.prop'>
                <span style="white-space: nowrap;">{{scope.row[item.prop]}}</span>
             </slot>
         </template>
      </el-table-column>
       <el-table-column label="" width="150" v-if="showLast">
                <template slot-scope="scope">
                    <slot name="edite" :scopeData='scope.row'>
                    <el-button
                        v-if="handleEdite"
                        type="text"
                        @click="handleEdite(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                        v-if="handleView"
                        type="text"
                        @click="handleView(scope.$index, scope.row)"
                    >查看</el-button>
                    <el-button
                        v-if="handleDelete"
                        type="text"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                     </slot>
                </template>
        </el-table-column>
    </el-table>
    <Pagination
    v-if="handleSizeChange"
     style="margin:20px 0;"
    :handleSizeChange="handleSizeChange"
    :handleCurrentChange="handleCurrentChange"
    :pageSize="pageSize"
    :pageNumber="pageNumber"
    :totalRecord="totalRecord"/>
</div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
    components: {
        Pagination
    },
    data() {
        return {
            slot: {
                name: 'slot'
            }
        }
    },
    methods: {
        selectChangeEmit(data) {
            this.$emit('selectChange', data)
        }
    },
    props: {
        pageSize: Number,
        pageNumber: Number,
        totalRecord: Number,
        handleSizeChange: Function,
        handleCurrentChange: Function,
        handleView: Function,
        headerRowStyle:  {
            type:Function,
            default:() => {}
        },
        handleEdite: Function,
        handleDelete: Function,
        sortChangeFn: {
            type:Function,
            default:() => {}
        },
        columnData: {
            type: Array,
            required: true
        },
        tableData: {
            type: Array,
            required: true
        },
        showLast: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: null
        }
    }
}
</script>

<style scoped lang='less'>

</style>
