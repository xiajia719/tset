<template>
  <div class="pagination-bar">
        <el-pagination
          style="margin:20px 0;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 25, 50, 100]"
          :pageSize="pageSize"
          :pager-count="5"
          :current-page.sync="currentNumber"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecord">
        </el-pagination>
      </div>
</template>

<script>
export default {
    props: [
        'handleSizeChange',
        'handleCurrentChange',
        'pageSize',
        'pageNum',
        'totalRecord'
    ],
    computed: {
        currentNumber: {
            get() {
                return this.pageNum
            },
            set() {
                return this.pageNum
            }
        }
    }
}
</script>

<style scoped>

</style>
