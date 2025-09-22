<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree :data="depts" :props="defaultProps" default-expand-all>
        <!-- 节点结构 -->
        <template v-slot="{data}">
          <el-row style="width: 100%;height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown>
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script>
import { getDepartment } from '@/api/department'

export default {
  name: 'Department',
  data() {
    return {
      depts: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const res = await getDepartment()
      this.depts = res
      console.log(res)
    }
  }

}
</script>

<style scoped>
  .app-container{
    padding: 30px 140px;
    font-size: 14px;
  }
  .tree-manager{
    width: 50px;
    /*让元素既保持 ** inline 元素的同行特性 **（不独占一行，可与其他元素并排），又具备 ** block 元素的尺寸可控特性 **（可设置宽高、垂直方向的 margin/padding 等）。 */
    /* inline-block 解决了 "既想让元素并排显示，又想精确控制其盒模型" 的需求。 */
    display: inline-block;
    margin-right: 40px;
  }
</style>
