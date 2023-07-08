<template>
    <section v-if="currToy" class="toy-details-container">
      <div class="toy-details">
        <div class="toy-image">
        <img :src="currToy.image" alt="Toy image">
      </div>
        <div class="toy-data">
          <h1>{{ currToy.name }}</h1>
          <hr>
          <div class="toy-data-item">
            <h2>Price:</h2>
            <p>{{ currToy.price }}$</p>
          </div>
          <hr>
          <div class="toy-data-item">
            <h2>Status:</h2>
            <p>{{ status }}</p>
          </div>
          <hr>
          <div class="toy-data-item">
            <h2>Created At:</h2>
            <p>{{ currToy.createdAt }}</p>
          </div>
          <hr>
          <div class="toy-data-item">
            <h2>Labels:</h2>
            <p class="labels">{{ labels }}</p>
          </div>
          <hr>
          <div class="toy-data-item">
            <h2>ID:</h2>
            <p>{{ currToy._id }}</p>
          </div>
          <button v-if="loggedInUser" @click="toggleReviewForm">Add Review</button>
        </div>
    <ToyReviewList :showReviewForm="showReviewForm" @toggleReviewForm="toggleReviewForm" :toyId="currToy._id" />
      </div>
    </section>
    <router-link to="/toy" class="btn-back">Back</router-link>
  </template>
<script>
import ToyReviewList from '../components/ToyReviewList.vue'
export default {
  data() {
    return {
      currToy: null,
      showReviewForm: false,
    }
  },
  created() {
    const toyId = this.$route.params.id
    this.$store.dispatch({ type: 'getToyById', toyId })
      .then(toy => {
        this.currToy = toy;
      })
  },
  computed: {
    status() {
      if (this.currToy.inStock) {
        return 'In stock'
      } else {
        return 'Out of stock'
      }
    },
    loggedInUser() {
      return this.$store.getters.user
    },
    createdAt() {
      return new Date(this.currToy.createdAt).toLocaleTimeString("en-US") + '  ' + new Date(this.currToy.createdAt).toLocaleDateString("en-US")
    },
    labels(){
      return this.currToy.labels.join(', ')

    }
  },
  methods: {
    toggleReviewForm() {
      this.showReviewForm = !this.showReviewForm;
    },
  },
  components:{
    ToyReviewList,
  }
}
</script>


<!-- <h2>Reviews:</h2>
<ul class="reviews-list">
  <li v-for="review in currToy.reviews" :key="review">{{review}}</li>
</ul>
</div> -->