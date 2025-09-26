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
          ref="deptTree"
          node-key="id"
          :data="departmentList"
          :props="defaultProps"
          :highlight-current="true"
          default-expand-all
          :expand-on-click-node="false"
          @current-change="SelectNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button type="primary">添加员工</el-button>
          <el-button>excel导入</el-button>
          <el-button>excel导出</el-button>
        </el-row>

        <!-- 表格组件 -->
        <el-table :data="employeeList" style="width: 100%">
          <el-table-column prop="staffPhoto" label="头像" align="center">
            <template v-slot="{row}">
              <!-- 头像 -->
              <el-avatar v-if="row.staffPhoto" :size="30" :src="row.staffPhoto" />
              <!-- 没有头像就用名字显示 -->
              <span v-else class="username">{{ row.username.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" align="center" />
          <el-table-column prop="mobile" label="手机号" align="center" sortable width="100px" />
          <el-table-column prop="workNumber" label="工号" align="center" sortable />
          <el-table-column prop="formOfEmployment" label="聘用形式" align="center">
            <template v-slot="{row}">
              <span v-if="row.formOfEmployment === 1">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" align="center" />
          <el-table-column prop="timeOfEntry" label="入聘时间" align="center" sortable width="120px" />
          <el-table-column label="操作" align="center" width="200px">
            <el-button type="text" size="mini">查看</el-button>
            <el-button type="text" size="mini">角色</el-button>
            <!-- slot="reference"：“slot”（插槽）是 Vue 组件的内容分发机制，reference 通常是某个弹窗 / 下拉组件（如 el-popconfirm 确认弹窗）的 “触发源插槽”—— 意味着这个按钮会作为触发弹窗的 “引用元素”（点击按钮会弹出确认框）。 -->
            <el-popconfirm title="确定删除这个员工信息吗？" style="margin-left: 10px;">
              <el-button slot="reference" type="text" size="mini">删除</el-button>
            </el-popconfirm>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination layout="total,prev, pager, next" :total="1000" />
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { getDepartment } from '@/api/department.js'
import { transListToTreeData } from '@/utils/index.js'
import { getEmployee } from '@/api/employee'

export default {
  name: 'Employee',
  data() {
    return {
      departmentList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },

      // 存储查询参数
      queryParams: {
        departmentId: null
      },

      employeeList: []
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
      this.queryParams.departmentId = this.departmentList[0].id

      // 等前面的执行完了才执行下面的回调函数
      this.$nextTick(() => {
        // 设置当前node-key的指定字段的值以及加载完成后选中第一个节点（因为此时的this.queryParams.departmentId是this.departmentList[0].id）
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
      // console.log(this.queryParams.departmentId)
      this.GetEmployee()
    },
    SelectNode(node) {
      // node参数是树形控件里面的每一个对象数据
      this.queryParams.departmentId = node.id
      // console.log(this.queryParams.departmentId)
      this.GetEmployee()
    },

    // 根据对应参数获取员工列表函数
    async GetEmployee() {
      const res = await getEmployee(this.queryParams)
      const { rows } = res
      this.employeeList = rows
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
