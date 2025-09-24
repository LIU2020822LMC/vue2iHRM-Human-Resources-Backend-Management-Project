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
        <el-table-column label="启用" width="200" align="center" prop="state">
          <!-- 获取每一行的status进行判断 -->
          <template v-slot="{row}">
            {{ row.state === 1 ? '已启用' : '未启用' }}
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center" prop="description" />
        <el-table-column label="操作" align="center">
          <!-- 放置操作选项 -->
          <template>
            <el-button type="text">分配权限</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 放置分页 -->
      <el-row type="flex" justify="end" align="middle">
        <el-column>
          <el-pagination
            :page-size="pageParams.pagesize"
            :current-page="pageParams.page"
            layout="prev, pager, next"
            :total="pageParams.total"
            @current-change="CurrentPageChange"
          />
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
      roleList: [],
      pageParams: {
        page: 1,
        pagesize: 5,
        total: 0
      }
    }
  },
  created() {
    this.GetRoleList()
  },
  methods: {
    async GetRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.roleList = rows
      this.pageParams.total = total
    },
    CurrentPageChange(currentPage) {
      this.pageParams.page = currentPage
      this.GetRoleList()
    }
  }
}

</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
