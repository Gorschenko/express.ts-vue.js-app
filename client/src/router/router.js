import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/views/MainPage'
import ProfilePage from '@/views/MainPage'
import OrdersPage from '@/views/OrdersPage'
import CartPage from '@/views/CartPage'

import auth from '@/router/modules/auth.router'
import courses from '@/router/modules/courses.router'
import store from '@/store/store'

const meta = {
  layout: 'default',
}

const routes = [
  ...auth,
  ...courses,

  {
    path: '/',
    name: 'main',
    component: MainPage,
    meta,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta,
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage,
    meta,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
    meta,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

const pipeline = (context, middleware, index) => {
  const nextMiddleware = middleware[index]
  if (!nextMiddleware) {
    return context.next
  }
  return () => {
    const nextPipeline = pipeline(context, middleware, index + 1)
    nextMiddleware({ ...context, nextMiddleware: nextPipeline })
  }
}

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware?.length) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store,
  }

  return middleware[0] ({
    ...context,
    nextMiddleware: pipeline(context, middleware, 1)
  })
})

export default router
