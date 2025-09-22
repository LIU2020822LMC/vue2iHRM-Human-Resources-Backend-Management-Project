<template>
  <el-dialog title="新增部门" :visible="showDialogVisible" @close="close">
    <!-- 放置表单 -->
    123
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
