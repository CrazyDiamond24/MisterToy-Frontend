<template>
  <div class="reviews-container">
    <h2>- Reviews -</h2>
    <ul class="review-list clean-list flex">
      <li v-if="reviews.length > 0" v-for="review in reviews" :key="review._id">
        <p v-if="userId">{{ review.toyId }}:</p>
        <p>{{ review.content }}</p>
        <p v-if="toyId && review.user">By {{ review.user.fullname }}</p>
      </li>
      <li v-else>
        <p>No reviews yet.</p>
      </li>
    </ul>
    <hr />

    <form
      v-if="showReviewForm"
      @submit.prevent="addReview()"
      class="add-review-form"
    >
      <div class="form-item">
        <label for="review-input">Add a review:</label>
        <input
          id="review-input"
          v-model="reviewToEdit.content"
          type="text"
          placeholder="Your opinion matters"
        />
      </div>
      <div class="form-item">
        <button
          type="submit"
          :disabled="reviewToEdit.content.length < 5"
          @click="addReview()"
          class="send-btn"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reviewService } from '../services/review.service'

export default {
  props: ['toyId', 'userId', 'showReviewForm'],
  data() {
    return {
      reviewToEdit: {
        content: '',
      },
    }
  },

  computed: {
    reviews() {
      return this.$store.getters.reviews
    },

    loggedInUser() {
      return this.$store.getters.user
    },
  },
  async created() {
    const filter = this.userId ? { userId: this.userId } : { toyId: this.toyId }
    await this.$store.commit({ type: 'setReviewFilter', filter })
    await this.$store.dispatch({ type: 'loadReviews' })

    // this.$store.dispatch({type: 'loadUsers'})
    // this.$store.dispatch({type: 'loadReviews'})
  },
  methods: {
    async addReview() {
      try {
        this.reviewToEdit.userId = this.loggedInUser._id
        console.log('logged user from add', this.loggedInUser._Id)
        this.reviewToEdit.toyId = this.toyId
        await this.$store.dispatch({
          type: 'addReview',
          review: this.reviewToEdit,
        })
        this.reviewToEdit = { content: '' }
        await this.$store.dispatch({ type: 'loadReviews' })
      } catch (err) {
        console.log('err', err)
        // showErrorMsg('Cannot add review')
      }
    },
  },
}
</script>
