<template>
  <footer class="flex-row-between">
    <p>{{ counter || 0 }}</p>
    <div class="flex-row flex-gap-8">
      <DefaultButton
        icon="bx-minus"
        form="round"
        color="transparent"
        size="xs"
        @action="$emit('delete-to-cart')"
      />
      <DefaultButton
        icon="bx-plus"
        form="round"
        color="transparent"
        size="xs"
        @action="$emit('add-to-cart')"
      />
    </div>
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