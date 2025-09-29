<template>
  <div class="container">
    <div class="app-container">
      <el-button type="primary" size="mini " class="btn-add">添加权限</el-button>

      <!-- 放置表格 -->
      <el-table>
        <el-table-column label="名称" align="center" />
        <el-table-column label="标识" align="center" />
        <el-table-column label="描述" align="center" />
        <el-table-column label="操作" align="center" />
        <el-table-column>
          <el-button type="text">添加</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text">清除</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Permission'
}
</script>

<style>
.btn-add {
  margin: 10px;
}
</style>
