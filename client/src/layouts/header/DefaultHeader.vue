<template>
  <header class="p-8 flex-row-between">
    <div class="flex-row">
      <HeaderLogo class="default-header__logo"/>
      <HeaderNavigation />
    </div>
  </header>
</template>
<script>
import HeaderLogo from '@/layouts/header/HeaderLogo'
import HeaderNavigation from '@/layouts/header/HeaderNavigation'
export default {
  name: 'DefaultHeader',
  components: {
    HeaderLogo,
    HeaderNavigation,
  },
}
</script>