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
          <el-button @click="test">测试接口</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: '',
        password: '',
        isAgree: false
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
  methods: {
    test() {
      Axios({
        // url: 'https://heimahr.itheima.net/api/sys/login',
        // 这个请求最终转变成http://localhost:9580/api/sys/login，由于我们在vue.config.js的设置，
        // 所以http://localhost:9580/api/sys/login会向https://heimahr.itheima.net/api/sys/login发送请求获取数据，这样子就解决了跨域问题
        // 因为我们发送的请求都是http://localhost:9580/这样子的同端口同请求协议同域名，然后vue.config.js的设置帮我们代理，也就是向我们真正的请求地址发送请求获取数据
        url: '/api/sys/login',
        method: 'post',
        data: {
          mobile: '13426719242',
          password: 123456
        }
      })
    },
    onLogin() {
      // 所有校验规则通过之后执行
      // validate()自动检测表单的校验是否全都通过,全通过会返回true，反之返回false
      this.$refs.form.validate((isOK) => {
        if (isOK) {
          this.$store.dispatch('user/login', this.loginForm)
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
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png) no-repeat center / cover;
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
