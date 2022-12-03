<template>
  <footer class="flex-row-centered flex-gap-4">
    <DefaultButton
      icon="bx-minus"
      form="round"
      color="transparent"
      size="xs"
      @action="$emit('delete-to-cart')"
    />
    <p class="text_l text_accent">{{ counter || 0 }}</p>
    <DefaultButton
      icon="bx-plus"
      form="round"
      color="transparent"
      size="xs"
      @action="$emit('add-to-cart')"
    />
  </footer>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FooterCard',
  emits: ['delete-to-cart', 'add-to-cart'],
  components: {
    DefaultButton,
  },
  props: {
    courseId: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    const store = useStore()
    const counter = computed(() => 
      store.getters['user/user'].cart.items?.find(i => i._id === props.courseId)?.count
    )

    return {
      counter,
    }
  },
}
</script>