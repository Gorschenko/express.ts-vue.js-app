import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage'

import auth from '@/router/modules/auth'

const routes = [
	...auth,
	{
		path: '/',
		name: 'home',
		component: HomePage,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
