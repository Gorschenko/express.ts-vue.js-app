<template>
  <header class="flex-row flex-gap-16">
    <HeaderLogo
      class="cursor-pointer"
      @click="$router.push('/')"
    />
    <HeaderNavigation class="flex-grow-1" />
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