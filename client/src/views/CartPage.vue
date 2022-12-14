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
        <p class="text_m mr-8">{{ item._id }}</p>
        <p class="text_m">{{ item.count }}</p>
      </li>
    </ul>
  </section>
</template>
<script>
import { useNotification } from '@kyvg/vue3-notification';
import {
  fetchCart,
} from '@/api/cart.api'
import { useStore } from 'vuex'
import { ref, onMounted, computed } from 'vue'


export default {
  name: 'MainPage',
  components: {
  },
  setup() {
    const { notify}  = useNotification()
    const store = useStore()
    const cart = ref({})
    const user = computed(() => store.getters['user/user'])

    onMounted(async () => {
      cart.value = await getCartHandler()
      console.log(cart.value)
    })

    const getCartHandler = async () => {
      try {
        const response = await fetchCart(user.value.cart._id._id)
        return response[0]
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
