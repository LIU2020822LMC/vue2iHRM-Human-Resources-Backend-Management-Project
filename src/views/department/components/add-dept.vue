<template>
  <el-dialog :title="showTitle" :visible="showDialogVisible" @close="close">
    <!-- 放置表单 -->
    <el-form ref="addDept" :model="departmentForm" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="departmentForm.name" placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="departmentForm.code" placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <!-- 选择器双向绑定的是el-option中的value，即:value="item.id" -->
        <el-select v-model="departmentForm.managerId" placeholder="请选择负责人" style="width: 80%;">
          <el-option v-for="item in ManagerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="departmentForm.introduce" placeholder="1-100个字符" type="textarea" :rows="5" style="width: 80%;" />
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
import { getDepartment, getManagerList, addDepartment, getDepartmentDetail, updateDepartment } from '@/api/department.js'

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
      departmentForm: {
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
              let res = await getDepartment()
              // 用departmentForm是否拥有id来判断是编辑模式还是新增模式，有的话就是编辑模式
              if (this.departmentForm.id) {
                res = res.filter(item => item.id !== this.departmentForm.id)
              }
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
              let res = await getDepartment()
              // 用departmentForm是否拥有id来判断是编辑模式还是新增模式，有的话就是编辑模式
              if (this.departmentForm.id) {
                res = res.filter(item => item.id !== this.departmentForm.id)
              }
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
  computed: {
    showTitle() {
      return this.departmentForm.id ? '编辑部门' : '新增部门'
    }
  },
  created() {
    this.GetManagerList()
  },
  methods: {

    // 新增部门叉号关闭传递父组件数据事件
    close() {
      // 手动清除表单的数据，即重新置空
      this.departmentForm = {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人名字
        name: '', // 部门名称
        pid: '' // 部门父级部门id
      }

      // 重置表单，只能重置绑定的表单数据，即this.departmentForm
      // resetFields()作用之一：清除表单的验证状态（比如清除校验错误提示、重置字段的 touched 状态等）
      this.$refs.addDept.resetFields()
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
          let msg = '新增'
          // 通过this.departmentForm是否有id来判断是编辑还是新增
          if (this.departmentForm.id) {
            await updateDepartment(this.departmentForm)
            msg = '修改'
          } else {
            await addDepartment({ ...this.departmentForm, pid: this.currentNodeId })
          }
          this.$message.success(`${msg}部门成功`)
          this.$emit('updateDepartment')
          this.close()
        }
      })
    },

    // 获取部门详情
    async GetDepartmentDetail() {
      const res = await getDepartmentDetail(this.currentNodeId)
      this.departmentForm = res
    }
  }
}
</script>
