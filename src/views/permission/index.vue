<template>
  <div class="container">
    <div class="app-container">
      <el-button type="primary" size="mini" class="btn-add">添加权限</el-button>

      <!-- 放置表格 -->
      <el-table :data="permissionList" row-key="id" default-expand-all>
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column prop="code" label="标识" align="center" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column label="操作" align="center" />
        <el-table-column>
          <template v-slot="{row}">
            <el-button v-if="row.type === 1" size="mini" type="text">添加</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">清除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { transListToTreeData } from '@/utils'
import { getPermissionList } from '@/api/permission'

export default {
  name: 'Permission',
  data() {
    return {
      permissionList: []
    }
  },
  created() {
    this.GetPermissionList()
  },
  methods: {
    async GetPermissionList() {
      const res = await getPermissionList()
      this.permissionList = transListToTreeData(res, 0)
      console.log(this.permissionList)
    }
  }
}
</script>

<style>
.btn-add {
  margin: 10px;
}
</style>
