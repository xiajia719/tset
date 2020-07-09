<template>
    <div :class="createFn?'search':'noCreate'">
      <el-button type="success" v-if="createFn"  @click="createFn(baseValue)" style="width:84px;height:34px;">新建</el-button>
      <div class="baseSearch">
        <el-select style="width:120px;"  v-model="baseValue.selectValue"  class="rightBorderRadius" >
          <el-option  v-for="item in baseValue.selectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <slot name="searchItem">
          <el-input placeholder="搜索终端名称" v-model="baseValue.inputValue" clearable class="rightBorderRadius leftSelectRadius"  style="width:230px;"></el-input>
        </slot>
        <el-button type="primary"  class="leftBorderRadius" @click="searchFn"  style="width:70px;">搜索</el-button>
      </div>
    </div>
</template>

<script>
export default {
props:{
  baseValue:Object,
  createFn:Function,
  searchFn:Function
}
}
</script>

<style scoped lang='scss'>
    .search{
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
    }
    .noCreate{
      display: flex;
      justify-content: flex-end;
      padding: 10px 0;
    }
</style>
