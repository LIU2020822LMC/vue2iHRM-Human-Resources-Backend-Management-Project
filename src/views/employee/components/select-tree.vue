<template>
  <el-cascader size="mini" :options="options" :props="props" separator="-" />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index'

export default {
  data() {
    return {
      options: [],
      props: {
        label: 'name',
        value: 'id',
        expandTrigger: 'hover'
      }
    }
  },

  created() {
    this.GetDepartment()
  },

  methods: {
    async GetDepartment() {
      const res = await getDepartment()
      this.options = transListToTreeData(res, 0)
    }
  }
}
</script>
