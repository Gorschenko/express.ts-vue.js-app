<template>
  <section>
    <ul>
      <li
        v-for="(item, i) in cart.items"
        :key="item._id"
        class="flex-row"
      >
        <p class="text_l text_weight_accent mr-16">
          {{ i + 1 }}
        </p>
        <p class="text_m mr-8">{{ item._id.title }}</p>
        <p class="text_m">{{ item.count }}</p>
      </li>
    </ul>
  </section>
</template>
<script>
import { useNotification } from '@kyvg/vue3-notification';
import {
  fetchCart,
} from '@/api/user.api'
import { ref, onMounted } from 'vue'


export default {
  name: 'MainPage',
  components: {
  },
  setup() {
    const { notify}  = useNotification()
    const cart = ref({})

    onMounted(async () => {
      cart.value = await getCartHandler()
    })

    const getCartHandler = async () => {
      try {
        return await fetchCart()
      } catch (e) {
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }

    return {
      cart,
    }
  }
}
</script>
