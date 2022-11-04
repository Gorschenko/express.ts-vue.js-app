<template>
  <button
    :class="classes"
  >
    <span>{{ title }}</span>
    <i
      v-if="icon"
      :class="['bx', icon]"
    />
  </button>
</template>
<script>
import { computed } from 'vue'

export default {
  name: 'DefaultButton',
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 's',
    },
    color: {
      type: String,
      default: 'primary',
    },
    form: {
      type: String,
      default: 'rectangular'
    },
  },
  setup (props) {
    const classes = computed(() => [
      'default-button',
      'default-button_' + props.size,
      'default-button_' + props.color,
      'default-button_' + props.form,
    ])
    return {
      classes,
    }
  },
}
</script>
<style lang="scss">
.default-button {
  @include flex-row-centered;
  transition: $tr-primary;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  i {
    font-size: 24px;
  }

  // sizes
  &_m {
    gap: 8px;
    padding: 12px 24px;
    span {
      @include text_size_m;
    }
  }

  &_s {
    gap: 8px;
    padding: 8px 16px;
    span {
      @include text_size_s;
    }
  }

  &_xs {
    gap: 4px;
    padding: 6px 12px;
    span {
      @include text_size_xs
    }
  }

  // colors
  &_primary {
    color: white;
    background: $cl-primary;

    &:hover {
      opacity: 0.8
    }
  }

  &_neutral {
    color: white;
    background: $cl-neutral-100;

    &:hover {
      background: $cl-neutral-200;
    }
  }

  &_success {
    color: $cl-success;
    background: $cl-success-bg;

    &:hover {
      background: $cl-success-hover;
    }
  }

  &_danger {
    color: $cl-danger;
    background: $cl-danger-bg;

    &:hover {
      background: $cl-danger-hover;
    }
  }

  // forms
  &_rectangular {
    border-radius: 4px;
  }

  &_round {
    border-radius: 50%;
  }

}
</style>