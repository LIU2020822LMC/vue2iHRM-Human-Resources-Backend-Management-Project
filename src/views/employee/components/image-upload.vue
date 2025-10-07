<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="uploadImage"
  >
    <!-- (自动上传)action是上传地址 人资项目不需要 人资项目(手动上传)  -->
    <!-- show-file-list不展示列表 -->
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import COS from 'cos-js-sdk-v5'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 检查函数 判断文件的类型还有大小 return  true(继续上传)/false(停止上传)
    beforeAvatarUpload(file) {
      // jpeg png gif bmp

      const isJPG = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5 // 5M

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG PNG GIF BMP 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },

    uploadImage(params) {
      console.log(params.file)
      const cos = new COS({
        // 有下面这些密钥才可以访问对应的云服务存储桶
        // 使用 Vue CLI 要暴露到前端的变量必须以 VUE_APP_ 前缀开头
        SecretId: process.env.VUE_APP_COS_SECRET_ID,
        SecretKey: process.env.VUE_APP_COS_SECRET_KEY
      })
      cos.putObject({
        Bucket: 'test-image-1351398172',
        Region: 'ap-guangzhou',
        Key: `${params.file.name}`,
        StorageClass: 'STANDARD',
        Body: params.file
      }, (err, data) => {
        if (data && data.statusCode === 200) {
          // 将成功返回的Location拼接成地址返回给父组件
          this.$emit('input', 'http://' + data.Location)
          console.log(data)
          this.$message.success('上传成功')
        } else {
          this.$message.error('上传失败: ' + err.message)
        }
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
