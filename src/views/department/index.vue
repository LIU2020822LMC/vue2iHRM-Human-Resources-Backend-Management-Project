<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree :data="depts" :props="defaultProps" default-expand-all />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Department',
  data() {
    return {
      depts: [
        {
          name: '传智教育',
          children: [
            { name: '总裁办' },
            { name: '行政部' },
            {
              name: '人事部',
              children: [{
                name: '财务核算部'
              },
              {
                name: '税务管理部'
              },
              {
                name: '薪资管理部'
              }]
            }]
        }],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  }
}
</script>

<style scoped>
  .app-container{
    padding: 30px 140px;
    font-size: 14px;
  }
</style>
