<template>
  <div class="container">
    <div class="app-container">
      <!-- 放置添加角色按钮 -->
      <div class="role-operate">
        <el-button type="primary" @click="dialogVisible = true">添加角色</el-button>
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

      <!-- 放置弹窗 -->
      <!-- 通过 .sync 修饰符，当子组件内部改变 visible 状态时（比如点击关闭按钮），会自动同步更新父组件的 dialogVisible 变量 -->
      <el-dialog :visible.sync="dialogVisible" title="新增角色" width="500px">
        <el-form  label-width="120px">
          <el-form-item label="角色名称">
            <el-input style="width: 300px;" />
          </el-form-item>
          <el-form-item label="启用">
            <el-switch />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" :row="5" style="width: 300px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
        page: 1, // 当前页
        pagesize: 5, // 每页显示的数据数量
        total: 0 // 总数据量
      },
      dialogVisible: false
    }
  },
  created() {
    this.GetRoleList()
  },
  methods: {
    // 获取角色列表函数
    async GetRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.roleList = rows
      this.pageParams.total = total
    },
    // 当前页的请求函数
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
