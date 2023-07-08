<template>
  <!-- REVIEWS {{reviews}} -->
  <section v-if="user" class="user-details-container flex column align-center">
    <h2>{{ user.fullname }}</h2>
    <h5> ID: {{ user._id }}</h5>
    <toy-review-list :userId="this.user._id" />
    <router-link to="/toy" class="btn">Back</router-link>
  </section>
</template>


<script>

import toyReviewList from './ToyReviewList.vue'

export default {
  data() {
    return {
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    reviews() {
      return this.$store.getters.reviews
    }
  },
  async created() {
    await this.$store.commit({ type: 'setReviewFilter', filter: { userId: this.user._id } })
    this.$store.dispatch({ type: 'loadReviews' })
  },
  // methods: {
  //   async addMsg() {
  //     if (!this.loggedInUser) return this.errMsg = 'Only logged users can post messages'
  //     await this.$store.dispatch({ type: 'addToyMsg', msg: this.newMsg, toyId: this.user._id })
  //     this.loadToy()
  //   }
  // },
   components: {
     toyReviewList

  }
}
</script>


