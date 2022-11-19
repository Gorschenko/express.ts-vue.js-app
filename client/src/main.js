import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import Notifications from '@kyvg/vue3-notification'

createApp(App)
  .use(store)
  .use(router)
  .use(Notifications)
  .mount('#app')
