<template>
  <nav class="flex-row-between">
    <div class="flex-row flex-gap-16">
      <router-link
        v-for="item in firstList"
        :key="item.value"
        class="text_xl color_primary color_hovered_primary_dark cursor-pointer"
        :to="{ name: item.value }"
      >
        {{ item.name }}
      </router-link>
    </div>
    <div class="flex-row flex-gap-16">
      <router-link
        v-for="item in secondList"
        :key="item.value"
        class="text_xl color_primary color_hovered_primary_dark"
        :to="{ name: item.value }"
      >
        {{ item.name }}
      </router-link>
    </div>
  </nav>
</template>
<script>
const firstList = [
  {
    name: 'Курсы', value: 'courses',
  },
]
const secondList = [
  {
    name: 'Корзина', value: 'cart',
  },
  {
    name: 'Заказы', value: 'orders',
  },
]
export default {
  name: 'HeaderNavigation',
  setup () {
    return {
      firstList,
      secondList,
    }
  }
}
</script>