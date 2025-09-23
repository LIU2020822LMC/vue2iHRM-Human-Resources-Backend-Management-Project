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
        <el-select v-model="addForm.managerId" placeholder="请选择负责人" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="addForm.introduce" placeholder="1-100个字符" type="textarea" :rows="5" style="width: 80%;" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button>取消</el-button>
          </el-col>
        </el-row>

      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDept',
  props: {
    showDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addForm: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人名字
        name: '', // 部门名称
        pid: '' // 部门父级部门id
      },
      rules: {
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
        ], // 部门编码
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在1到100个字符', trigger: 'blur' }
        ], // 部门介绍
        managerId: [{ required: true, message: '请选择一个部门负责人', trigger: 'change' }], // 部门负责人名字
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
        ] // 部门名称
      }
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    }
  }
}
</script>
