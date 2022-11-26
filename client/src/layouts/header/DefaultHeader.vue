<template>
  <header class="flex-row flex-gap-16">
    <HeaderLogo
      class="cursor-pointer"
      @click="$router.push('/')"
    />
    <HeaderNavigation class="flex-grow-1" />
    <HeaderDropdown />
  </header>
</template>
<script>
import HeaderLogo from '@/layouts/header/HeaderLogo'
import HeaderNavigation from '@/layouts/header/HeaderNavigation'
import HeaderDropdown from '@/layouts/header/HeaderDropdown'

export default {
  name: 'DefaultHeader',
  components: {
    HeaderLogo,
    HeaderNavigation,
    HeaderDropdown,
  },
}
</script>