<template>
  <component
    :is="layout"
  />
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LayoutBase from '@/layouts/LayoutBase'
import 'boxicons'

export default {
  name: 'App',
  components: {
    LayoutBase,
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
<style lang="scss">
* {
  @include text_size_m;
  padding: 0;
  margin: 0;
  background: 0;
  border: 0;
  outline: 0;
  list-style: none;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

</style>