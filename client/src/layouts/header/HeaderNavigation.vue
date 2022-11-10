<template>
  <nav class="flex-row-between">
    <div class="flex-row flex-gap-8">
      <router-link
        v-for="item in authList"
        :key="item.value"
        class="text_xl color_primary color_hovered_primary_dark cursor-pointer"
        :to="{ name: item.value }"
      >
        {{ item.name }}
      </router-link>
    </div>
    <div class="flex-row flex-gap-8">
      <router-link
        v-for="item in authList"
        :key="item.value"
        class="text_xl color_primary color_hovered_primary_dark cursor-pointer"
        :to="{ name: item.value }"
      >
        {{ item.name }}
      </router-link>
    </div>
  </nav>
</template>
<script>
const authList = [
  // {
  //   name: 'Профиль', value: 'profile', isAuth: true,
  // },
  // {
  //   name: 'Избранное', value: 'favorite', isAuth: true,
  // },
  // {
  //   name: 'Корзина', value: 'card',
  // },
  {
    name: 'Войти', value: 'sign-in',
  },
  {
    name: 'Регистрация', value: 'sign-up',
  },
]
const mainList = [
  // {
  //   name: 'Каталог', value: 'catalog',
  // },
  // {
  //   name: 'Акции', value: 'offers',
  // },
]
export default {
  name: 'HeaderNavigation',
  setup () {
    return {
      authList,
      mainList,
    }
  }
}
</script>