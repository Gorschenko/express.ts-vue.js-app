<template>
<div class="layout-default">
  <DefaultHeader class="layout-default__header"/>
  <DefaultSidebar class="layout-default__aside" />
  <main class="layout-default__main">
    <router-view />
  </main>
</div>
</template>
<script>
import DefaultHeader from '@/layouts/header/DefaultHeader'
import DefaultSidebar from '@/layouts/DefaultSidebar'
export default {
  name: 'LayoutDefault',
  components: {
    DefaultHeader,
    DefaultSidebar,
  },
}
</script>
<style lang="scss">
@import '@/layouts/layouts';
</style>