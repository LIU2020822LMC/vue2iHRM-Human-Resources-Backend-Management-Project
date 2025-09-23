<template>
  <el-dialog title="新增部门" :visible="showDialogVisible" @close="close">
    <!-- 放置表单 -->
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select placeholder="请选择负责人" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input placeholder="1-100个字符" type="textarea" :rows="5" style="width: 80%;" />
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
  methods: {
    close() {
      this.$emit('close', false)
    }
  }
}
</script>
