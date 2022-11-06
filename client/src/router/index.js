import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/views/MainPage'
import auth from '@/router/modules/auth'

const meta = {
  layout: 'default',
}

const routes = [
  ...auth,
  {
    path: '/',
    name: 'main-page',
    component: MainPage,
    meta,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
