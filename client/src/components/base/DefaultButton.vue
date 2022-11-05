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
      default: 'neutral',
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
    color: inherit;
  }

  // sizes
  &_m {
    gap: 8px;
    padding: 12px 24px;
    span {
      @include text_m;
      color: inherit;
    }
  }

  &_s {
    gap: 8px;
    padding: 8px 16px;
    span {
      @include text_s;
      color: inherit;
    }
  }

  &_xs {
    gap: 4px;
    padding: 6px 12px;
    span {
      @include text_xs;
      color: inherit;
    }
  }

  // colors
  &_primary {
    color: $cl-neutral;
    background: $cl-primary;

    &:hover {
      background: $cl-primary-dark;
    }
  }

  &_neutral {
    color: $cl-primary;
    background: $cl-neutral;

    &:hover {
      background: $cl-primary-light;
    }
  }

  &_danger {
    color: $cl-neutral;
    background: $cl-danger;
    opacity: $btn-opacity;

    &:hover {
      opacity: 1;
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