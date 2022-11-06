<template>
  <div
    ref="target"
    class="default-dropdown"
  >
    <div
      @click.stop="showDropdown = !showDropdown"
    >
      <slot name="default" />
    </div>
    <div
      v-show="showDropdown"
      
      class="default-dropdown__body"
    >
      <slot name="body" />
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
  name: 'DefaultDropdown',
  setup () {
    const showDropdown = ref(false)
    const target = ref(false)
    const handler = () => {
      showDropdown.value = !showDropdown.value
    }
    const close = () => {
      showDropdown.value = false
    }
    onClickOutside(target, close)

    return {
      handler,
      showDropdown,
      target,
    }
  },
}
</script>
<style lang="scss">
.default-dropdown {
  position: relative;
  display: inline-block;

  &__body {
    position: absolute;
    padding: 8px;
    background: lightgreen;
  }
}
</style>