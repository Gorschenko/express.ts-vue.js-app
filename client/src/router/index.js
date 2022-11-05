import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage'

const meta = {
  layout: 'default',
}

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage,
    meta,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
