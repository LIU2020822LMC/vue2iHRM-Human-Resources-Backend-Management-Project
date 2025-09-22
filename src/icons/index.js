import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon) // 全局注册svg-icon 组件

// 下面三行代码的任务是 把 同级目录的 svg目录下的.svg图片引入到项目中来
const req = require.context('./svg', false, /\.svg$/) // 动导入svg/ 目录下所有svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// 相当于把svg下的所有的svg图片打包到了项目中
//   使用方式：在路由配置中写 icon:'tree'，系统会：查找 src/icons/svg/tree.svg 文件
//   通过SvgIcon组件渲染为 <use xlink:href="#icon-tree" />
