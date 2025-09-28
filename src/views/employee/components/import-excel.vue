<template>
  <el-dialog width="500px" title="员工导入" :visible="showExcelDialog" @close="$emit('update:showExcelDialog', false)">
    <el-row type="flex" justify="center">
      <div class="upload-excel">
        <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="uploadChange">
        <div class="drop">
          <i class="el-icon-upload" />
          <el-button type="text" @click="ExportExcelTemplate">下载导入模板</el-button>
          <span>将文件拖到此处或
            <el-button type="text" @click="uploadExcel">点击上传</el-button>
          </span>
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="end">
      <!-- update:props属性名，值 直接修改 .sync修饰符的属性值 -->
      <el-button size="mini" type="primary" @click="$emit('update:showExcelDialog', false)">取消</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import { exportExcelTemplate, uploadEmployeeExcel } from '@/api/employee'
import FileSaver from 'file-saver'

export default {
  props: {
    showExcelDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async ExportExcelTemplate() {
      const res = await exportExcelTemplate()
      FileSaver.saveAs(res, '员工信息表模板.xlsx')
    },

    // 弹出文件选择器
    uploadExcel() {
      this.$refs['excel-upload-input'].click()
    },

    // 接受上传的数据并且传给接口
    async uploadChange(event) {
      const files = event.target.files
      // 大于0说明有文件要上传
      if (files.length > 0) {
        const data = new FormData()
        // file: file类型
        data.append('file', files[0])
        try {
          await uploadEmployeeExcel(data)
          debugger
          // 向父组件传递成功的信息
          this.$emit('updateSuccess')
          this.$emit('update:showExcelDialog', false)
        } finally {
          // 无论失败还是成功都要清空文件选择器
          this.$refs['excel-upload-input'].value = ''
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin: 20px;
  width: 360px;
  height: 180px;
  align-items: center;
  color: #697086;

  .excel-upload-input {
    display: none;
    z-index: -9999;
  }

  .btn-upload,
  .drop {
    border: 1px dashed #dcdfe6;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 160px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .drop {
    line-height: 40px;
    color: #bbb;

    i {
      font-size: 60px;
      display: block;
      color: #c0c4cc;
    }
  }
}
</style>
