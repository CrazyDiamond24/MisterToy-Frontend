import { createStore } from 'vuex'
import { toyService } from '../services/toy.service'
import toyStore from './modules/toy-store.js'
import { userStore } from './modules/user.store.js'
import reviewStore from './modules/review-store.js'

export const store = createStore({
    strict: true,
 state: {
  msg: 'Store Is Running'
 },
 mutations: {},
 actions: {},
 getters: {
  getMsg(state) {
   return state.msg
  }
 },
 modules: {
    toyStore,
    userStore,
    reviewStore
 }
})
