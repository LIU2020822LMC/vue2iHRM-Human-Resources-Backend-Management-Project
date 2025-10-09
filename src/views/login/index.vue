<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="form" :rules="loginRules" :model="loginForm">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" show-password />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree" label="用户平台使用协议" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 350px;" @click="onLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        password: '',
        isAgree: process.env.NODE_ENV === 'development'
      },
      loginRules: {
        mobile: [
          {
            // required只能检测 null undefined ""
            required: true,
            message: '请输入手机号',
            trigger: 'blur' },
          {
            // 正则表达式验证手机号
            pattern: /^1[3-9]\d{9}$/,
            message: '请正确输入手机号',
            trigger: 'blur'
          }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }],
        isAgree: [
          {
            // 自定义校验规则
            validator: (rule, value, callback) => {
              value ? callback() : callback(new Error('请勾选用户平台使用协议'))
            }
          }
        ]
      }
    }
  },
  created() {
    if (process.env.NODE_ENV === 'development') {
      // 如果是开发环境的话密码就自动变成itHeiMa@20250919这样子格式的密码填充到表单上，后面八位数字随着日期而变化
      this.loginForm.password = `itHeiMa@${this.getFormattedDate()}`
    }
  },
  methods: {
    // 获取 YYYYMMDD 格式的日期（默认当前时间）(为了获取20250919这样子格式文本拼接密码而创建)
    getFormattedDate(date = new Date()) {
      const year = date.getFullYear() // 获取年份（4位数字）
      const month = String(date.getMonth() + 1).padStart(2, '0') // 月份（0-11，需+1），不足2位补0
      const day = String(date.getDate()).padStart(2, '0') // 日期（1-31），不足2位补0
      return year + month + day // 拼接成 20250919 格式
    },
    onLogin() {
      // 所有校验规则通过之后执行
      // validate()自动检测表单的校验是否全都通过,全通过会返回true，反之返回false
      this.$refs.form.validate(async(isOK) => {
        if (isOK) {
          // 判断Vuex中的user.js里面调用login接口是否成功，如果成功就跳转到主页，加await是为了达到成功才跳转，不成功就不跳转
          await this.$store.dispatch('user/login', this.loginForm)
          // 跳转主页
          this.$router.push('/')
        } else {
          alert('表单校验失败')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;

  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back2.png) no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;

    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center / contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }

    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }

  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;

    .el-card {
      border: none;
      padding: 0;
    }

    h1 {
      padding-left: 20px;
      font-size: 24px;
    }

    .el-input {
      width: 350px;
      height: 44px;

      .el-input__inner {
        background: #f4f5fb;
      }
    }

    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
