<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <!-- charAt(0)获取字符串的第一个字符 如果用户头像为空取名字的第一个字符作为头像-->
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <span class="name">{{ name }}</span>
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank"
             href="https://github.com/LIU2020822LMC/vue2iHRM-Human-Resources-Backend-Management-Project.git"
          >
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!--prevent阻止默认事件 阻止 <a> 标签的默认跳转行为（包括通过 target="_blank" 在新标签页打开的行为） -->
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!-- native事件修饰符 -->
          <!-- 注册事件的根元素的原生事件 -->
          <!-- 不加 .native 时，@click 监听的是组件自定义 click 事件（组件未触发则无效）。
          加 .native 时，@click.native 监听的是组件根 DOM 元素的原生 click 事件（必然有效，因为根元素是原生 DOM 节点）。 -->
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 放置弹窗 -->
      <!-- sync-可以接受子组件传过来的事件和值 -->
      <!-- :mask="false-关闭遮罩层，页面不再变暗-->
      <el-dialog title="修改密码" :visible.sync="dialogTableVisible" width="500px" center :mask="false" append-to-body @close="CancelBtn">
        <!-- 放置表单 -->
        <el-form ref="passWordForm" label-width="120px" :rules="rules" :model="passWordForm">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="passWordForm.oldPassword" show-password size="small" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="passWordForm.newPassword" show-password size="small" />
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPassWord">
            <el-input v-model="passWordForm.confirmPassWord" show-password size="small" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="OKbtn">确认修改</el-button>
            <el-button size="small" @click="CancelBtn">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updateUserPassword } from '@/api/user.js'

export default {

  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      dialogTableVisible: false,
      passWordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassWord: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { trigger: 'blur',
            validator: (rules, value, callback) => {
              if (this.passWordForm.oldPassword === value) {
                callback(new Error('新旧密码不能一样'))
                return
              }
              callback()
            }
          }
        ],
        confirmPassWord: [
          { required: true, message: '确认新密码不能为空', trigger: 'blur' },
          { trigger: 'blur',
            validator: (rules, value, callback) => {
              if (this.passWordForm.newPassword !== value) {
                callback(new Error('两次输入的密码不一致'))
                return
              }
              callback()
            }
          }
        ]
      }
    }
  },
  computed: {
    // 引入头像与用户名
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    updatePassword() {
      this.dialogTableVisible = true
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    OKbtn() {
      this.$refs.passWordForm.validate(async(isOK) => {
        if (isOK) {
          await updateUserPassword(this.passWordForm)
          this.CancelBtn()
          this.$message.success('修改密码成功')
        }
      })
    },
    CancelBtn() {
      this.$refs.passWordForm.resetFields() // 重置表单
      this.dialogTableVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        // position: relative;
        display: flex;
        align-items: center;

        .name {
          // 用户名称距离右侧距离
          margin-right: 10px;
          font-size: 16px;
        }

        .username {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #04c9be;
          color: #fff;
          border-radius: 50%;
          margin-right: 5px;
        }

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          margin-right: 5px;
          border-radius: 50%;
        }

        .el-icon-setting {
          font-size: 20px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
