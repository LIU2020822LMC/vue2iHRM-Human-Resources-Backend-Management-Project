<template>
  <div class="container">
    <div class="app-container">
      <!-- 放置添加角色按钮 -->
      <div class="role-operate">
        <el-button type="primary">添加角色</el-button>
      </div>

      <!-- 放置表格 -->
      <el-table>
        <el-table-column label="角色" width="200" align="center" />
        <el-table-column label="启用" width="200" align="center" />
        <el-table-column label="描述" align="center" />
        <el-table-column label="操作" align="center" />
      </el-table>

      <!-- 放置分页 -->
      <el-row type="flex" justify="end" align="middle">
        <el-column>
          <el-pagination layout="prev, pager, next" />
        </el-column>
      </el-row>

    </div>
  </div>
</template>
<script>
export default {
  name: 'Role'
}
</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
