<template>
  <div class="container">
    <div class="app-container">
      <!-- @click="AddPermission(0,1)这里添加的0表示它的父节点是0，也就是表明这个权限是一级权限 -->
      <el-button type="primary" size="mini" class="btn-add" @click="AddPermission(0, 1)">添加权限</el-button>

      <!-- 放置表格 -->
      <el-table :data="permissionList" row-key="id" default-expand-all>
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column prop="code" label="标识" align="center" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <!-- @click="AddPermission(row.id, 2)这里添加row.id表明它是从属于哪个权限下面的二级权限 -->
            <div class="btn-group">
              <el-button v-if="row.type === 1" size="mini" type="text" @click="AddPermission(row.id, 2)">添加</el-button>
              <el-button size="mini" type="text" @click="editPermission(row.id)">编辑</el-button>
              <el-button size="mini" type="text" @click="deletePermission(row.id)">清除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 放置对话框 -->
      <el-dialog :title="`${title}权限点`" :visible="dialogVisible" width="500px" @close="close">
        <!-- 放置表单 -->
        <el-form ref="perForm" label-width="120px" :model="formData" :rules="rules">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" type="textarea" :rows="5" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="close">取消</el-button>
          </el-col>
        </el-row>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import { transListToTreeData } from '@/utils'
import { getPermissionList, addPermission, updatePermission, deletePermission, detailPermission } from '@/api/permission'

export default {
  name: 'Permission',
  data() {
    return {
      permissionList: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 默认关闭
      },
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' },
          // 判断是否名称重复
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              let res = await getPermissionList()
              // 用formData是否拥有id来判断是编辑模式还是新增模式，有的话就是编辑模式
              if (this.formData.id) {
                // 作用：从已有的权限数据（res）中，排除当前正在编辑的这条数据。
                // 为什么要排除？
                // 因为在编辑时，当前数据的名称和它自己重复是允许的（比如 “不修改名称只改其他字段”），
                // 我们只需要检查 “除了自己之外的其他数据” 是否有重名。
                // 这样就实现了 “新增时不允许和任何已有数据重名，编辑时允许和自己重名但不允许和其他数据重名” 的合理验证规则。
                res = res.filter(item => item.id !== this.formData.id)
              }
              if (res.some(item => item.name === value)) {
                callback(new Error('权限名称已存在'))
              } else {
                callback() // 验证通过
              }
            }
          }
        ],
        code: [
          { required: true, message: '请输入权限标识', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' },
          // 判断是否标识重复
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              let res = await getPermissionList()
              // 用formData是否拥有id来判断是编辑模式还是新增模式，有的话就是编辑模式
              if (this.formData.id) {
                // 作用：从已有的权限数据（res）中，排除当前正在编辑的这条数据。
                // 为什么要排除？
                // 因为在编辑时，当前数据的名称和它自己重复是允许的（比如 “不修改名称只改其他字段”），
                // 我们只需要检查 “除了自己之外的其他数据” 是否有重名。
                // 这样就实现了 “新增时不允许和任何已有数据重名，编辑时允许和自己重名但不允许和其他数据重名” 的合理验证规则。
                res = res.filter(item => item.id !== this.formData.id)
              }
              if (res.some(item => item.code === value)) {
                callback(new Error('权限标识已存在'))
              } else {
                callback() // 验证通过
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  created() {
    this.GetPermissionList()
  },
  methods: {
    async GetPermissionList() {
      const res = await getPermissionList()
      this.permissionList = transListToTreeData(res, 0)
      // console.log(this.permissionList)
    },
    // 添加权限函数
    AddPermission(pid, type) {
      this.formData.pid = pid
      this.formData.type = type
      this.dialogVisible = true
    },

    // 确定提交函数
    onSubmit() {
      this.$refs.perForm.validate(async(isOK) => {
        if (isOK) {
          if (this.formData.id) {
            await updatePermission(this.formData)
            this.GetPermissionList()
            this.$message.success('编辑权限成功')
            this.close()
          } else {
            await addPermission(this.formData)
            this.GetPermissionList()
            this.$message.success('新增权限成功')
            this.close()
          }
        }
      })
    },

    // 对话框关闭函数
    close() {
      // 重置表单
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 默认关闭
      }
      // 清除表单的验证状态（比如清除校验错误提示、重置字段的 touched 状态等）
      this.$refs.perForm.resetFields()
      this.dialogVisible = false
    },

    // 编辑权限函数
    async editPermission(id) {
      this.formData = await detailPermission(id)
      this.dialogVisible = true
    },

    // 删除权限函数
    async deletePermission(id) {
      try {
        await this.$confirm('此操作将永久清除此权限，是否继续？', {
          type: 'warning'
        })
        await deletePermission(id)
        this.GetPermissionList()
        this.$message.success('清除权限成功')
      } catch (err) {
        // this.$message.info('已取消清除')
      }
    }
  }
}
</script>

<style>
.btn-add {
  margin: 10px;
}

.btn-group {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  gap: 8px;
  /* 按钮之间的间距 */
  height: 100%;
  /* 占满单元格高度 */
  justify-content: center;
    /* 水平居中 */
}
</style>
