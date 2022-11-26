<template>
  <DefaultDropdown
    body-position="right"
  >
    <template #default>
      <DefaultAvatar
        size="xs"
        :data="{}"
      />
    </template>
    <template #body>
      <ul class="header-dropdown__list">
        <li
          v-for="item in filteredList"
          :key="item.value"
          :class="[
            'header-dropdown__list-item color_hovered',
            'color_hovered_' + (item.isDanger ? 'danger' : 'primary'),
          ]"
          @click="item.func"
        >
          {{ item.name }}
        </li>
      </ul>
    </template>
  </DefaultDropdown>
</template>
<script>
import DefaultDropdown from '@/components/base/DefaultDropdown'
import DefaultAvatar from '@/components/base/DefaultAvatar'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useRoot } from '@/use/root.use'

export default {
  name: 'HeaderDropdown',
    components: {
    DefaultDropdown,
    DefaultAvatar,
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const { logout } = useRoot()
    const isAuthenticated = computed(() => store.getters.isAuthenticated)

    function toRoute (name) {
      router.push({ name })
    }

    const list = [
      {
        name: 'Войти',
        value: 'sign-in',
        isAuthenticated: false,
        func: toRoute.bind(this, 'sign-in')
      },
      {
        name: 'Регистрация',
        value: 'sign-up',
        isAuthenticated: false,
        func: toRoute.bind(this, 'sign-up')
      },
      {
        name: 'Выйти',
        value: 'logout',
        isAuthenticated: true,
        isDanger: true,
        func: logout,
      },
    ]

    const filteredList = computed(() => list.filter(i => i.isAuthenticated === isAuthenticated.value))

    return {
      filteredList,
    };
  },
}
</script>
<style lang="scss">
.header-dropdown {
  &__list {
    width: 200px;
    background: $cl-neutral;
    border-radius: $br-primary;

    &-item {
      text-align: center;
      padding: 8px 0;
      cursor: pointer;
    }
  }
}
</style>