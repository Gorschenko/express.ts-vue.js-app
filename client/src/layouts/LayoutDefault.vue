<template>
<div class="layout-default">
  <DefaultHeader class="layout-default__header"/>
  <main class="layout-default__main">
    <router-view />
  </main>
</div>
</template>
<script>
import DefaultHeader from '@/layouts/header/DefaultHeader'
export default {
  name: 'LayoutDefault',
  components: {
    DefaultHeader,
  },
}
</script>
<style lang="scss">
@import '@/layouts/layouts';
</style>