<template>
<div class="default-input default-input_s">
  <i
    v-if="icon"
    :class="['bx', icon]"
  />
  <input
    class="default-input__field"
    type="text"
  >
</div>

</template>
<script>
export default {
  name: 'DefaultInput',
  props: {
    size: {
      type: String,
      default: 's',
    },
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss">
.default-input {
  @include flex-row;
  gap: 4px;
  border: $border;
  background: $cl-primary-light;

  i {
    color: $cl-primary-dark;
  }

  &_m {
    padding: 10px 12px;
  }

  &_s {
    padding: 8px 12px;
  }
}
</style>