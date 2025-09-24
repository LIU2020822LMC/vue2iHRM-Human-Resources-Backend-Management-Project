<template>
  <div class="container">
    <div class="app-container">
      <!-- 放置添加角色按钮 -->
      <div class="role-operate">
        <el-button type="primary" @click="dialogVisible = true">添加角色</el-button>
      </div>

      <!-- 放置表格 -->
      <el-table :data="roleList">
        <el-table-column label="角色" width="200" align="center" prop="name">
          <template v-slot="{row}">
            <!-- 编辑状态显示 -->
            <el-input v-if="row.isEdit" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="启用" width="200" align="center" prop="state">
          <template v-slot="{row}">
            <!-- 编辑状态显示 -->
            <el-switch v-if="row.isEdit" active-value="1" inactive-value="0" />
            <!-- 获取每一行的status进行判断 -->
            <span>{{ row.state === 1 ? '已启用' : '未启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center" prop="description">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <!-- 放置操作选项 -->
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <!-- 编辑状态显示 -->
              <el-button type="primary" size="mini" @click="OKbtn">确定</el-button>
              <el-button size="mini" @click="CancleBtn">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text">分配权限</el-button>
              <el-button type="text" @click="EditRole(row)">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
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
      <el-dialog :visible.sync="dialogVisible" title="新增角色" width="500px" @close="CancleBtn">
        <el-form ref="roleForm" label-width="120px" :model="roleForm" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="启用" prop="state">
            <el-switch v-model="roleForm.state" active-value="1" inactive-value="0" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" type="textarea" :row="5" style="width: 300px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="OKbtn">立即创建</el-button>
            <el-button @click="CancleBtn">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRoleList, addNewRole } from '@/api/role'

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
      dialogVisible: false,
      roleForm: {
        name: '',
        description: '',
        state: 0 // 1表示已启用，0表示未启用
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        state: [],
        description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
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
      this.roleList.forEach((item) => {
        // 为每个对象添加属性，下面的写法是响应式的属性
        this.$set(item, 'isEdit', false)
      })
      // console.log(this.roleList)
    },
    // 当前页的请求函数
    CurrentPageChange(currentPage) {
      this.pageParams.page = currentPage
      this.GetRoleList()
    },

    // 立即新增按钮方法
    OKbtn() {
      this.$refs.roleForm.validate(async(isOK) => {
        if (isOK) {
          await addNewRole(this.roleForm)
          this.$message.success('新增角色成功')
          this.CancleBtn()
        }
      })
    },

    // 取消按钮方法
    CancleBtn() {
      // 重置表单
      this.$refs.roleForm.resetFields()
      // 关闭弹窗
      this.dialogVisible = false
    },
    // 编辑角色
    EditRole(row) {
      row.isEdit = true
    }
  }
}

</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
