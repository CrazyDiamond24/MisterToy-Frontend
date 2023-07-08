<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/toy">Toy</RouterLink>
    <RouterLink to="/stats">Stats</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/user">Profile</RouterLink>
    <RouterLink v-if="loggedIn" to="#" @click.prevent="logout"
      >Logout</RouterLink
    >
    <RouterLink v-else to="/LoginSignup">Login</RouterLink>
  </nav>
</template>

<script>
import { userService } from '../services/user.service'
export default {
  name: 'AppNav',
  computed: {
    // loggedIn() {
    //   return this.$store.getters.user
    // },
    loggedIn() {
      return this.$store.getters.user
    },
  },
  methods: {
    async logout() {
      try {
        await userService.logout()

        this.$store.commit('setUser', null)

        this.$router.push('/LoginSignup')
      } catch (err) {
        console.error('Error logging out', err)
      }
    },
  },
}
</script>

<style></style>
