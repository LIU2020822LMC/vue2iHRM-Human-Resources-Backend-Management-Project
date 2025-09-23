<template>
  <el-dialog title="新增部门" :visible="showDialogVisible" @close="close">
    <!-- 放置表单 -->
    <el-form ref="addDept" :model="addForm" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="addForm.name" placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="addForm.code" placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <!-- 选择器双向绑定的是el-option中的value，即:value="item.id" -->
        <el-select v-model="addForm.managerId" placeholder="请选择负责人" style="width: 80%;">
          <el-option v-for="item in ManagerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="addForm.introduce" placeholder="1-100个字符" type="textarea" :rows="5" style="width: 80%;" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="close">取消</el-button>
          </el-col>
        </el-row>

      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartment, getManagerList, addDepartment, getDepartmentDetail } from '@/api/department.js'

export default {
  name: 'AddDept',
  props: {
    showDialogVisible: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      ManagerList: [],
      addForm: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人名字
        name: '', // 部门名称
        pid: '' // 部门父级部门id
      },
      rules: {
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              const res = await getDepartment()
              if (res.some(item => item.code === value)) {
                callback(new Error('部门编码已存在'))
              } else {
                callback() // 验证通过
              }
            }
          }
        ], // 部门编码
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在1到100个字符', trigger: 'blur' }
        ], // 部门介绍
        managerId: [{ required: true, message: '请选择一个部门负责人', trigger: 'change' }], // 部门负责人名字
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              const res = await getDepartment()
              if (res.some(item => item.name === value)) {
                callback(new Error('部门名称已存在'))
              } else {
                callback() // 验证通过
              }
            }
          }
        ] // 部门名称
      }
    }
  },
  created() {
    this.GetManagerList()
  },
  methods: {

    // 新增部门叉号关闭传递父组件数据事件
    close() {
      this.$refs.addDept.resetFields() // 重置表单
      this.$emit('close', false)
    },

    // 获取负责人下拉列表数据
    async GetManagerList() {
      const res = await getManagerList()
      this.ManagerList = res
    },

    // 新增部门确定按钮
    onSubmit() {
      // 判断全部校验是否通过
      this.$refs.addDept.validate(async(isOK) => {
        if (isOK) {
          await addDepartment({ ...this.addForm, pid: this.currentNodeId })
          this.$message.success('新增部门成功')
          this.$emit('updateDepartment')
          this.close()
        }
      })
    },

    // 获取部门详情
    async GetDepartmentDetail() {
      const res = await getDepartmentDetail(this.currentNodeId)
      this.addForm = res
    }
  }
}
</script>
