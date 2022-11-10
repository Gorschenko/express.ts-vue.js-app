import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/views/MainPage'
import auth from '@/router/modules/auth.module'
import store from '@/store/index'

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
  if (!to.meta.middleware) {
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
