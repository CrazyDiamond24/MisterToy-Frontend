import { userService } from '../../services/user.service.js'

export const userStore = {
  state() {
    return {
      user: userService.getLoggedInUser(),
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },

  actions: {
    signup({ commit }, { credentials }) {
      return userService
        .signup(credentials)
        .then(() => {
          console.log('signup')
        })
        .catch((err) => {
          console.error('Cannot signup', err)
          throw err
        })
    },
    login({ commit }, { credentials }) {
      return userService
        .login(credentials)
        .then(() => {
          // commit('setUser', user);
        })
        .catch((err) => {
          console.error('Cannot login', err)
          throw err
        })
    },
  },
  getters: {
    user(state) {
      console.log('inside getters of user store',state.user)
      return state.user
    },
  },
}
