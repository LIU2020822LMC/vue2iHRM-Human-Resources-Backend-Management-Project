<template>
  <div class="container">
    <div class="app-container">
      <!-- 放置添加角色按钮 -->
      <div class="role-operate">
        <el-button type="primary">添加角色</el-button>
      </div>

      <!-- 放置表格 -->
      <el-table :data="roleList">
        <el-table-column label="角色" width="200" align="center" prop="name" />
        <el-table-column label="启用" width="200" align="center" prop="state" />
        <el-table-column label="描述" align="center" prop="description" />
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
import { getRoleList } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      roleList: []
    }
  },
  created() {
    this.GetRoleList()
  },
  methods: {
    async GetRoleList() {
      const { rows } = await getRoleList()
      this.roleList = rows
    }
  }
}

</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
