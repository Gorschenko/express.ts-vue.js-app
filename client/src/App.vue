<template>
  <component
    :is="layout"
  />
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LayoutDefault from '@/layouts/LayoutDefault'

export default {
  name: 'App',
  components: {
    LayoutDefault,
  },
  setup () {
    const route = useRoute();
    const layout = computed(() => 'layout-' + route.meta.layout)
    return {
      layout,
    };
  },
}
</script>