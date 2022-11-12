import { createStore } from 'vuex'
import auth from '@/store/modules/auth.store'

const store = createStore({
  modules: {
    auth,
  },
})

export default store
