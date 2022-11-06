import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/views/MainPage'

const meta = {
  layout: 'default',
}

const routes = [
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
