<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input
          style="margin-bottom:10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
        />
        <!-- 树形组件 -->
        <el-tree
          :data="departmentList"
          :props="defaultProps"
          :highlight-current="true"
          default-expand-all
          :expand-on-click-node="false"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button type="primary">添加员工</el-button>
          <el-button>excel导入</el-button>
          <el-button>excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <!-- 分页 -->
      </div>
    </div>
  </div>
</template>
<script>
import { getDepartment } from '@/api/department.js'
import { transListToTreeData } from '@/utils/index.js'

export default {
  name: 'Employee',
  data() {
    return {
      departmentList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.GetDepartment()
  },
  methods: {
    // 获取部门列表数据
    async GetDepartment() {
      const res = await getDepartment()
      // 将部门列表数据进行排列
      this.departmentList = transListToTreeData(res, 0)
    }
  }

}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;

  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }

  .right {
    flex: 1;
    padding: 20px;

    .opeate-tools {
      margin: 10px;
    }

    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display: inline-block;
    }
  }
}
</style>
