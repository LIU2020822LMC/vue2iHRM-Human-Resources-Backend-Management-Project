<template>
  <el-cascader :value="value" size="mini" :options="options" :props="props" separator="-" @change="handleChange" />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index'

export default {
  props: {
    // 必须用 value 作为 prop 名，因为这是父子之间双向绑定数据
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      options: [], // 级联组件的options
      props: {
        label: 'name', // 要展示的字段
        value: 'id', // 要存储的字段
        expandTrigger: 'hover' // hover 触发子菜单
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
    },

    // 接受选中的value值
    handleChange(list) {
      // console.log(list)
      if (list.length > 0) {
        // 如果选择了哪一个部门，就向父组件传递list中的最后一个id
        this.$emit('input', list[list.length - 1])
      } else {
        // 没有选择的话，就传递空
        this.$emit('input', null)
      }
    }
  }
}
</script>
