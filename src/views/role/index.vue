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
            <el-input v-if="row.isEdit" v-model="row.editRow.name" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="启用" width="200" align="center" prop="state">
          <template v-slot="{row}">
            <!-- 编辑状态显示 -->
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
            <!-- 获取每一行的status进行判断 -->
            <span>{{ row.state === 1 ? '已启用' : '未启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center" prop="description">
          <template v-slot="{ row }">
            <!-- 编辑状态显示 -->
            <el-input v-if="row.isEdit" v-model="row.editRow.description" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <!-- 放置操作选项 -->
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <!-- 编辑状态显示 -->
              <el-button type="primary" size="mini" @click="editOKbtn(row)">确定</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text" @click="AssignPermission(row.id)">分配权限</el-button>
              <el-button type="text" @click="EditRole(row)">编辑</el-button>
              <el-popconfirm title="确定删除这个角色吗？" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" type="text" style="margin-left: 10px;">删除</el-button>
              </el-popconfirm>
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
            layout="total,prev, pager, next"
            :total="pageParams.total"
            @current-change="CurrentPageChange"
          />
        </el-column>
      </el-row>

      <!-- 放置新增角色弹窗 -->
      <!-- 通过 .sync 修饰符，当子组件内部改变 visible 状态时（比如点击关闭按钮），会自动同步更新父组件的 dialogVisible 变量 -->
      <el-dialog :visible.sync="dialogVisible" :title="新增角色" width="500px" @close="CancleBtn">
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

      <!-- 放置分配权限弹窗 -->
      <el-dialog :visible.sync="showPermissionDialog" :title="`分配权限--${roleName}`" @close="resetPermissionTree">
        <!-- 放置树形权限数据 -->
        <el-tree
          ref="permissionTree"
          :data="permissionList"
          :props="{ label: 'name', children: 'children' }"
          show-checkbox
          default-expand-all
          node-key="id"
          :default-checked-keys="PermissionIds"
          check-strictly
        />
        <!-- 放置确定与取消按钮 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-column>
            <el-button type="primary" @click="OkPermissionBtn">确定</el-button>
            <!-- el-dialog 的 @close 事件是 “弹窗关闭的最终回调”，无论通过哪种方式关闭弹窗
            （包括：点击取消按钮、点击弹窗右上角关闭图标、点击遮罩层关闭等），都会触发这个事件。因此，
            即使取消按钮没有显式调用 resetPermissionTree，只要它导致了弹窗关闭，就会间接触发 resetPermissionTree，
            从而清空上一个角色的勾选状态。这也是 Element UI 组件设计的便捷性：
            通过 @close 统一处理弹窗关闭后的清理逻辑，无需为每个关闭入口（取消按钮、关闭图标等）单独写重复代码。 -->
            <el-button @click="showPermissionDialog=false">取消</el-button>
          </el-column>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRoleList, addNewRole, updateRole, deleteRole, getRoleDetail, assignRolePermission } from '@/api/role'
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'

export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      // 分配权限时获取的角色名
      roleName: '',
      pageParams: {
        page: 1, // 当前页
        pagesize: 10, // 每页显示的数据数量
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
      },

      showPermissionDialog: false,
      permissionList: [], // 权限列表数据

      CurrentRoleId: null, // 当前分配权限的角色id

      PermissionIds: [] // 当前角色拥有的权限id列表
    }
  },
  created() {
    this.GetRoleList()
    this.GetPermissionList()
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
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
      // console.log(this.roleList)
    },

    // 获取分配权限的权限列表
    async GetPermissionList() {
      const res = transListToTreeData(await getPermissionList(), 0)
      this.permissionList = res
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
          // 重新获取角色列表渲染页面
          this.GetRoleList()
          this.$message.success('新增角色成功')
          this.CancleBtn()
        }
      })
    },

    // 新增角色取消按钮方法
    CancleBtn() {
      // 重置表单
      this.$refs.roleForm.resetFields()
      // 关闭弹窗
      this.dialogVisible = false
    },
    // 编辑角色
    EditRole(row) {
      row.isEdit = true
      // 每次点击编辑都重新获取每一个row的对应数据
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
      console.log(row.editRow)
    },

    // 编辑确定按钮
    async editOKbtn(row) {
      // 检查有没有填写内容
      if (row.editRow.name && row.editRow.description) {
        await updateRole({ ...row.editRow, id: row.id })
        this.$message.success('更新角色成功')
        // 将编辑的内容重新赋值给row对应的属性
        // Object.assign 是 JavaScript 中的一个内置方法，用于对象的合并操作，
        // 它会将一个或多个源对象的可枚举属性复制到目标对象中，并返回合并后的目标对象。
        Object.assign(row, { isEdit: false, ...row.editRow })
      } else {
        this.$message.error('描述与名称不能为空')
      }
    },

    // 删除角色确定按钮方法
    async confirmDel(id) {
      await deleteRole(id)
      // 如果删除的是当前页的最后一个的话就网上翻页，即改变当前页
      if (this.roleList.length === 1 && this.pageParams.page > 1) this.pageParams.page--
      // 重新获取角色列表渲染页面
      this.GetRoleList()
      this.$message.success('删除角色成功')
    },

    // 重置权限树的勾选状态和数据
    resetPermissionTree() {
      this.PermissionIds = [] // 清空勾选数据（保证下次打开时初始值为空）
      // 清空树组件的视图勾选（?. 避免组件未加载时报错，简单又安全）
      // setCheckedKeys 是 Element UI 中 el-tree 组件自带的实例方法（不是属性），
      // 作用是动态设置树形控件中被勾选的节点，可以覆盖当前的勾选状态，包括清空勾选。
      this.$refs.permissionTree?.setCheckedKeys([])
      this.CurrentRoleId = null // 可选：重置当前角色ID，避免残留
    },

    // 分配权限按钮方法
    async AssignPermission(id) {
      this.CurrentRoleId = id
      const { permIds, name } = await getRoleDetail(id)
      this.roleName = name
      this.PermissionIds = permIds
      this.showPermissionDialog = true
    },

    // 分配权限弹窗的确定按钮方法
    async OkPermissionBtn() {
      await assignRolePermission({ id: this.CurrentRoleId, permIds: this.$refs.permissionTree.getCheckedKeys() })
      this.$message.success('分配权限成功')
      this.showPermissionDialog = false
    }
  }
}

</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
